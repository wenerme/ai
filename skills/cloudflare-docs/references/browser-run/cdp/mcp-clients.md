---
title: Using with MCP clients (CDP)
description: Configure AI coding agents to control Browser Run sessions through the Model Context Protocol (MCP) using the chrome-devtools-mcp package.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-run/cdp/mcp-clients.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Using with MCP clients (CDP)

You can use the CDP endpoints with AI coding agents through the [Model Context Protocol (MCP) ↗](https://modelcontextprotocol.io/). The [chrome-devtools-mcp ↗](https://github.com/ChromeDevTools/chrome-devtools-mcp) package provides an MCP server that allows AI assistants to control and inspect browser sessions.

Before you begin, make sure you [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission. For more information, refer to [Quick Actions — Before you begin](https://developers.cloudflare.com/browser-run/quick-actions/#before-you-begin).

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that enables AI assistants to interact with external tools and services. By configuring an MCP client with Browser Run, your AI coding agent can perform browser automation tasks like navigating to pages, taking screenshots, running performance audits, and debugging JavaScript.

## Prerequisites

* Node.js v20.19 or newer
* An MCP-compatible AI client (for example, Claude Desktop, Claude Code, Cursor, OpenCode)
* A Browser Run API token with `Browser Rendering - Edit` permissions

## Configure your MCP client

Add the following configuration to your MCP client settings file (the exact location depends on your client):

### Claude Desktop and Claude Code

Add to `claude_desktop_config.json` (Claude Desktop) or `~/.claude.json` (Claude Code):

```

{

  "mcpServers": {

    "browser-rendering": {

      "command": "npx",

      "args": [

        "-y",

        "chrome-devtools-mcp@latest",

        "--wsEndpoint=wss://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/browser-rendering/devtools/browser?keep_alive=600000",

        "--wsHeaders={\"Authorization\":\"Bearer <API_TOKEN>\"}"

      ]

    }

  }

}


```

Explain Code

### OpenCode

Add to `.opencode.jsonc`:

```

{

  "mcp": {

    "browser-rendering": {

      "type": "local",

      "command": [

        "npx",

        "-y",

        "chrome-devtools-mcp@latest",

        "--wsEndpoint=wss://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/browser-rendering/devtools/browser?keep_alive=600000",

        "--wsHeaders={\"Authorization\":\"Bearer <API_TOKEN>\"}"

      ],

      "enabled": true

    }

  }

}


```

Explain Code

### Cursor

Add to `~/.cursor/mcp.json`:

```

{

  "mcpServers": {

    "browser-rendering": {

      "command": "npx",

      "args": [

        "-y",

        "chrome-devtools-mcp@latest",

        "--wsEndpoint=wss://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/browser-rendering/devtools/browser?keep_alive=600000",

        "--wsHeaders={\"Authorization\":\"Bearer <API_TOKEN>\"}"

      ]

    }

  }

}


```

Explain Code

Replace `ACCOUNT_ID` with your Cloudflare account ID and `API_TOKEN` with your Browser Run API token. You can obtain these from your Cloudflare dashboard.

For other MCP clients, refer to the [chrome-devtools-mcp documentation ↗](https://github.com/ChromeDevTools/chrome-devtools-mcp/tree/main?tab=readme-ov-file#mcp-client-configuration).

## Example usage

After configuring the MCP client, you can ask your AI agent to perform browser tasks:

```

Navigate to https://example.com and take a screenshot of the homepage


```

```

Check the console messages on the current page for any errors


```

```

Run a Lighthouse audit on https://developers.cloudflare.com


```

## How it works

The MCP server connects to Browser Run via WebSocket using the CDP protocol:

1. **WebSocket endpoint** \- The `--wsEndpoint` URL connects to the Browser Run service
2. **Authentication** \- The `--wsHeaders` parameter includes your API token for authentication
3. **Keep-alive** \- The `keep_alive` query parameter (in milliseconds) specifies how long the session stays active
4. **MCP protocol** \- The server translates MCP tool calls into CDP commands

Session management

The `--wsEndpoint` parameter creates a new browser session automatically when the MCP server starts. The session remains active for the duration specified in `keep_alive` (in the examples above, 10 minutes). The MCP server will use this session for all browser operations until it is restarted.

## Additional resources

* [chrome-devtools-mcp repository ↗](https://github.com/ChromeDevTools/chrome-devtools-mcp) \- Official MCP server for Chrome DevTools
* [Model Context Protocol documentation ↗](https://modelcontextprotocol.io/) \- Learn more about MCP
* [Claude Desktop MCP setup ↗](https://modelcontextprotocol.io/docs/develop/connect-local-servers) \- Configure MCP servers in Claude Desktop
* [Claude Code MCP setup ↗](https://docs.anthropic.com/en/docs/claude-code/mcp) \- Configure MCP servers in Claude Code
* [Cursor MCP setup ↗](https://cursor.com/docs/mcp) \- Configure MCP servers in Cursor
* [OpenCode MCP setup ↗](https://opencode.ai/docs/mcp-servers/) \- Configure MCP servers in OpenCode

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/cdp/","name":"Chrome DevTools Protocol (CDP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/cdp/mcp-clients/","name":"Using with MCP clients (CDP)"}}]}
```
