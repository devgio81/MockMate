# MockMate MCP Server

Ein Model Context Protocol (MCP) Server für das Erstellen von Mock-APIs direkt aus deinem KI-Editor.

## Features

- 🚀 **create_mock** - Erstelle Mock-Endpoints mit beliebigen JSON-Daten
- 📋 **list_mocks** - Liste alle aktiven Mocks auf
- 🗑️ **delete_mock** - Lösche Mocks
- 🔗 **get_mock_url** - Hole die öffentliche URL eines Mocks

## Installation

### 1. Dependencies installieren

```bash
cd mockmate-mcp
npm install
```

### 2. API-Key holen

1. Gehe zu [tomczak.io/dashboard/api-keys](https://tomczak.io/dashboard/api-keys)
2. Erstelle einen neuen API-Key
3. Kopiere den Key für die Konfiguration

### 3. Editor konfigurieren

#### Claude Desktop

Bearbeite `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mockmate": {
      "command": "npx",
      "args": ["tsx", "/PFAD/ZU/mockmate-mcp/index.ts"],
      "env": {
        "MOCKMATE_API_KEY": "dein-api-key-hier"
      }
    }
  }
}
```

#### Cursor

Erstelle `.cursor/mcp.json` im Projektverzeichnis:

```json
{
  "servers": {
    "mockmate": {
      "command": "npx",
      "args": ["tsx", "/PFAD/ZU/mockmate-mcp/index.ts"],
      "env": {
        "MOCKMATE_API_KEY": "dein-api-key-hier"
      }
    }
  }
}
```

#### VS Code (GitHub Copilot)

Erstelle `.vscode/mcp.json` im Projektverzeichnis:

```json
{
  "servers": {
    "mockmate": {
      "command": "npx",
      "args": ["tsx", "/PFAD/ZU/mockmate-mcp/index.ts"],
      "env": {
        "MOCKMATE_API_KEY": "dein-api-key-hier"
      }
    }
  }
}
```

## Verwendung

Nach der Konfiguration kannst du in deinem KI-Editor einfach fragen:

> "Erstelle mir einen Mock für eine User-API mit 5 Beispiel-Usern"

> "Zeige mir alle meine aktiven Mocks"

> "Lösche den Mock mit ID abc123"

## Beispiel

```
User: Erstelle einen Mock für Produkte

AI: Ich erstelle einen Mock-Endpoint für Produkte...

✅ Mock erstellt!
URL: https://n8n.tomczak.dev/webhook/mock/products-a1b2c3
Gültig bis: 13.01.2026
```

## Umgebungsvariablen

| Variable | Beschreibung | Standard |
|----------|--------------|----------|
| `MOCKMATE_API_KEY` | Dein API-Key (erforderlich) | - |
| `MOCKMATE_API_URL` | Backend-URL (optional) | `https://n8n.tomczak.dev/webhook/mcp-action` |

## Entwicklung

```bash
# Server lokal testen
npm run dev

# TypeScript kompilieren
npm run build
```

## Lizenz

MIT © Martin Tomczak
