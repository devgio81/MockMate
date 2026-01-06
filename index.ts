#!/usr/bin/env node
/**
 * MockMate MCP Server
 * 
 * Ein Model Context Protocol Server für das Erstellen von Mock-APIs.
 * Ermöglicht KI-Assistenten das schnelle Erstellen von JSON Mock-Endpoints.
 * 
 * Installation in KI-Editoren:
 * 
 * Claude Desktop (claude_desktop_config.json):
 * {
 *   "mcpServers": {
 *     "mockmate": {
 *       "command": "npx",
 *       "args": ["tsx", "/path/to/mockmate-mcp/index.ts"],
 *       "env": {
 *         "MOCKMATE_API_KEY": "your-api-key-here"
 *       }
 *     }
 *   }
 * }
 * 
 * Cursor/VSCode (.cursor/mcp.json oder .vscode/mcp.json):
 * {
 *   "servers": {
 *     "mockmate": {
 *       "command": "npx",
 *       "args": ["tsx", "/path/to/mockmate-mcp/index.ts"],
 *       "env": {
 *         "MOCKMATE_API_KEY": "your-api-key-here"
 *       }
 *     }
 *   }
 * }
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

// Configuration
const MOCKMATE_API_URL = process.env.MOCKMATE_API_URL || "https://n8n.tomczak.dev/webhook/mcp-action";
const MOCKMATE_API_KEY = process.env.MOCKMATE_API_KEY || "";

if (!MOCKMATE_API_KEY) {
  console.error("Error: MOCKMATE_API_KEY environment variable is required");
  console.error("Get your API key at: https://tomczak.io/dashboard/api-keys");
  process.exit(1);
}

// Tool definitions
const tools: Tool[] = [
  {
    name: "create_mock",
    description: "Create a new mock API endpoint with custom JSON data. The mock will be accessible via a unique public URL for 7 days. Perfect for frontend development, testing, and prototyping.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "URL-friendly name for the mock (e.g., 'users', 'products', 'orders'). Will be appended to create a unique URL."
        },
        data: {
          type: "object",
          description: "The JSON data that will be returned when the mock endpoint is called. Can be any valid JSON structure."
        }
      },
      required: ["slug", "data"]
    }
  },
  {
    name: "list_mocks",
    description: "List all your active mock API endpoints. Shows URLs, IDs, and expiration dates.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "delete_mock",
    description: "Delete a mock API endpoint. The endpoint will no longer be accessible after deletion.",
    inputSchema: {
      type: "object",
      properties: {
        public_id: {
          type: "string",
          description: "The public ID of the mock to delete (shown when listing mocks)"
        }
      },
      required: ["public_id"]
    }
  },
  {
    name: "get_mock_url",
    description: "Get the public URL for a mock API endpoint. Use this to get the full URL for a specific mock.",
    inputSchema: {
      type: "object",
      properties: {
        public_id: {
          type: "string",
          description: "The public ID of the mock"
        }
      },
      required: ["public_id"]
    }
  }
];

// API call helper
async function callMockMateAPI(toolName: string, args: Record<string, unknown>): Promise<string> {
  try {
    const response = await fetch(MOCKMATE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MOCKMATE_API_KEY}`
      },
      body: JSON.stringify({
        name: toolName,
        arguments: args
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    
    // Extract text from MCP response format
    if (result.content && Array.isArray(result.content)) {
      return result.content
        .filter((c: { type: string }) => c.type === "text")
        .map((c: { text: string }) => c.text)
        .join("\n");
    }
    
    return JSON.stringify(result, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`MockMate API error: ${error.message}`);
    }
    throw error;
  }
}

// Create MCP server
const server = new Server(
  {
    name: "mockmate-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Validate tool exists
    const tool = tools.find(t => t.name === name);
    if (!tool) {
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${name}. Available tools: ${tools.map(t => t.name).join(", ")}`
          }
        ],
        isError: true
      };
    }

    // Call the MockMate API
    const result = await callMockMateAPI(name, args as Record<string, unknown>);

    return {
      content: [
        {
          type: "text",
          text: result
        }
      ]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MockMate MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
