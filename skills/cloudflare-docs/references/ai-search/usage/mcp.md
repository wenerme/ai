---
title: MCP
description: The Model Context Protocol (MCP) endpoint allows AI agents to discover and interact with your AI Search content. This endpoint follows the MCP specification and provides tools for querying your indexed content.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/usage/mcp.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# MCP

The Model Context Protocol (MCP) endpoint allows AI agents to discover and interact with your AI Search content. This endpoint follows the [MCP specification ↗](https://modelcontextprotocol.io/) and provides tools for querying your indexed content.

## Prerequisites

Enable public endpoints for your AI Search instance:

1. Go to **AI Search** in the Cloudflare dashboard.[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL.

## Available tools

The AI Search MCP endpoint exposes a `search` tool that queries your indexed content.

| Tool   | Description                           |
| ------ | ------------------------------------- |
| search | Finds exactly what you're looking for |

You can customize this in your AI Search instance settings. For more details, refer to [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/public-endpoint/).

## Test the MCP endpoint

Send a request to the `/mcp` endpoint with the `Accept: application/json, text/event-stream` header:

Terminal window

```

curl https://<INSTANCE_ID>.search.ai.cloudflare.com/mcp \

  -H "Content-Type: application/json" \

  -H "Accept: application/json, text/event-stream" \

  -d '{

    "jsonrpc": "2.0",

    "id": 1,

    "method": "tools/call",

    "params": {

      "name": "search",

      "arguments": {

        "query": "How do I configure AI Search?"

      }

    }

  }'


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/usage/","name":"Search API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/usage/mcp/","name":"MCP"}}]}
```
