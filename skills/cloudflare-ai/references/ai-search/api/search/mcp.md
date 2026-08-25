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

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/api/search/mcp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Model Context Protocol (MCP) endpoint allows AI agents to discover and interact with your AI Search content. This endpoint follows the [MCP specification ↗](https://modelcontextprotocol.io/) and provides tools for querying your indexed content.

## Prerequisites

Enable public endpoints for your AI Search instance:

1. Go to **AI Search** in the Cloudflare dashboard. [Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL.

## Namespace MCP endpoints

You can enable a public endpoint on a single instance or on a whole [namespace](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/). A namespace endpoint serves `/mcp` as well, and searches across the instances you allow in that namespace. Its hostname is prefixed with `ns-`:

```txt
https://ns-<NAMESPACE_ENDPOINT_ID>.search.ai.cloudflare.com/mcp
```

The tools and request format are the same for both. The examples on this page use the instance hostname.

## Available tools

The AI Search MCP endpoint exposes a `search` tool that queries your indexed content.

| Tool   | Description                           |
| ------ | ------------------------------------- |
| search | Finds exactly what you're looking for |

You can customize this in your AI Search instance settings. For more details, refer to [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/).

## Test the MCP endpoint

Send a request to the `/mcp` endpoint with the `Accept: application/json, text/event-stream` header:

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/mcp \
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

## Bring your own domain

You can serve the MCP endpoint from a hostname that you own, such as `https://search.example.com/mcp`, instead of the generated one. The hostname must belong to a zone on the same Cloudflare account. To attach a custom domain:

1. Go to **AI Search** in the Cloudflare dashboard. [Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your instance or namespace.
3. Go to **Public Endpoints** and enable the public endpoint. A custom domain requires an active public endpoint.
4. Go to **Custom Domains** and attach your hostname.

A custom domain routes requests through your own zone, so you can then put [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/) in front of the endpoint. MCP clients authenticate with an Access [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/), sent as `CF-Access-Client-Id` and `CF-Access-Client-Secret` headers, so only the agents you issue tokens to can reach the endpoint. Access only protects the custom hostname, so set `default_domain_enabled` to `false` as well. Otherwise the default `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com` hostname keeps answering unauthenticated requests.

To attach a domain through the API instead, refer to [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/search/mcp/#page","headline":"MCP · Cloudflare AI Search docs","description":"Expose AI Search content to AI agents through the Model Context Protocol (MCP) endpoint.","url":"https://developers.cloudflare.com/ai-search/api/search/mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
