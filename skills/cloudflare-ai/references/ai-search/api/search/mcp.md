---
description: Expose AI Search content to AI agents through the Model Context Protocol (MCP) endpoint.
title: MCP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/api/search/mcp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Model Context Protocol (MCP) endpoint allows AI agents to discover and interact with your AI Search content. This endpoint follows the [MCP specification ↗](https://modelcontextprotocol.io/) and provides tools for querying your indexed content.

## Prerequisites

Enable public endpoints for your AI Search instance:

1. Go to **AI Search** in the Cloudflare dashboard. [Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL.

## Available tools

The AI Search MCP endpoint exposes a `search` tool that queries your indexed content.

| Tool   | Description                           |
| ------ | ------------------------------------- |
| search | Finds exactly what you're looking for |

You can customize this in your AI Search instance settings. For more details, refer to [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/).

## Test the MCP endpoint

Send a request to the `/mcp` endpoint with the `Accept: application/json, text/event-stream` header:

```bash
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/search/mcp/#page","headline":"MCP · Cloudflare AI Search docs","description":"Expose AI Search content to AI agents through the Model Context Protocol (MCP) endpoint.","url":"https://developers.cloudflare.com/ai-search/api/search/mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
