#!/usr/bin/env node

/**
 * MCP Client für n8n MockMate Server
 * Verbindet Cline/Cursor mit dem n8n Workflow via stdio
 */

const readline = require('readline');
const { spawn } = require('child_process');

// 1. URL aus den Argumenten holen
const n8nUrl = process.argv[2];

if (!n8nUrl) {
  console.error(JSON.stringify({
    jsonrpc: '2.0',
    error: {
      code: -32602,
      message: 'Usage: node index.js <n8n-webhook-url>'
    }
  }));
  process.exit(1);
}

// Debug-Modus (optional)
const DEBUG = process.env.DEBUG === 'true';

function debug(message) {
  if (DEBUG) {
    console.error(`[DEBUG] ${message}`);
  }
}

// Interface für stdin/stdout (MCP Protokoll)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

debug(`MCP Client started, n8n URL: ${n8nUrl}`);

// Verarbeite eingehende MCP-Requests
rl.on('line', (line) => {
  if (!line.trim()) {
    debug('Empty line received, skipping');
    return;
  }

  debug(`Received: ${line}`);

  try {
    // Parse JSON-RPC Request
    const request = JSON.parse(line);
    debug(`Parsed request method: ${request.method}`);

    // Sende Request an n8n via curl
    const curl = spawn('curl', [
      '-s',                              // Silent
      '-X', 'POST',                      // POST Request
      n8nUrl,                            // n8n Webhook URL
      '-H', 'Content-Type: application/json',
      '--data-binary', '@-',             // Liest von stdin
      '--max-time', '30',                // 30 Sekunden Timeout
      '--connect-timeout', '10'          // 10 Sekunden Connection Timeout
    ]);

    // Request-Body an curl senden
    curl.stdin.write(line);
    curl.stdin.end();

    let responseData = '';
    let errorData = '';

    // Response von curl sammeln
    curl.stdout.on('data', (data) => {
      responseData += data.toString();
    });

    // Fehler sammeln
    curl.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    // Wenn curl fertig ist
    curl.on('close', (code) => {
      if (code !== 0) {
        debug(`Curl exited with code ${code}`);
        debug(`Curl stderr: ${errorData}`);
        
        // Fehler-Response zurück an Cline
        const errorResponse = {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32000,
            message: `Failed to connect to n8n: ${errorData || 'Connection failed'}`
          }
        };
        console.log(JSON.stringify(errorResponse));
        return;
      }

      debug(`Response received: ${responseData}`);

      // Response zurück an Cline/Cursor
      try {
        // Validiere dass es JSON ist
        JSON.parse(responseData);
        console.log(responseData);
      } catch (e) {
        debug(`Invalid JSON response: ${e.message}`);
        
        // Fallback: Sende Error
        const errorResponse = {
          jsonrpc: '2.0',
          id: request.id,
          error: {
            code: -32603,
            message: `Invalid response from n8n: ${responseData.substring(0, 100)}`
          }
        };
        console.log(JSON.stringify(errorResponse));
      }
    });

  } catch (error) {
    debug(`Error processing request: ${error.message}`);
    
    // Fehler-Response
    const errorResponse = {
      jsonrpc: '2.0',
      error: {
        code: -32700,
        message: `Parse error: ${error.message}`
      }
    };
    console.log(JSON.stringify(errorResponse));
  }
});

// Handle process termination
rl.on('close', () => {
  debug('MCP Client closing');
  process.exit(0);
});

// Handle errors
process.on('uncaughtException', (error) => {
  debug(`Uncaught exception: ${error.message}`);
  console.error(JSON.stringify({
    jsonrpc: '2.0',
    error: {
      code: -32603,
      message: `Internal error: ${error.message}`
    }
  }));
  process.exit(1);
});

debug('MCP Client ready, waiting for requests...');