---
description: Expose your indexed content as a search tool for any MCP client or agent using the built-in MCP endpoint.
title: Connect your AI Search to an MCP client
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your AI Search to an MCP client

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/how-to/connect-mcp-client/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Every AI Search instance can expose a built-in [Model Context Protocol (MCP) ↗](https://modelcontextprotocol.io/) endpoint. The endpoint provides a `search` tool over your indexed content, so any MCP client or agent, such as an AI assistant or IDE, can search your knowledge base without any code.

This guide creates an AI Search instance that indexes a documentation site, then exposes it as a search tool that any MCP client can call.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

To index a website, you also need a domain [onboarded to your Cloudflare account](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/). Otherwise, you can upload your own files to [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/).

## 1\. Create an AI Search instance

If you already have an instance with indexed content, skip to [step 2](#2-enable-the-mcp-endpoint).

Create an instance with the [Wrangler CLI](https://developers.cloudflare.com/ai-search/wrangler-commands/). This example indexes a documentation site, using the Cloudflare Developer Docs at `developers.cloudflare.com`, so an assistant can answer questions from it. Connect the site as a [website data source](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) so AI Search crawls and indexes it automatically:

```sh
npx wrangler ai-search create docs-search --type web-crawler --source developers.cloudflare.com
```

Replace `developers.cloudflare.com` with a domain you have [onboarded to your Cloudflare account](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/), since you can only crawl sites you own. To index content without crawling a site, run `npx wrangler ai-search create docs-search --type builtin` and upload files to [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) instead.

Check indexing progress:

```sh
npx wrangler ai-search stats docs-search
```

Once indexing completes, your instance has content to expose over MCP.

## 2\. Enable the MCP endpoint

Your instance's public endpoint serves the MCP endpoint.

1. Go to **AI Search** in the Cloudflare dashboard.
[Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your `docs-search` instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**, then turn on the **MCP** endpoint.
5. Copy the endpoint host. Your MCP URL is that host followed by `/mcp`:
```txt
https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/mcp
```

## 3\. Describe your search tool

An MCP client reads a tool's description to decide when to call it. Under **Settings** \> **Public Endpoint**, set the **Tool Description** to explain what your content covers and the questions it answers. For example:

```txt
Search the Cloudflare Developer Documentation for product concepts,
configuration, and API references. Use this when users ask how to build
or configure Cloudflare products.
```

A specific description helps agents call your search tool at the right time. Refer to [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) for the full configuration.

## 4\. Connect your MCP client

Add the MCP URL to your client as a remote MCP server. Many clients use an `mcpServers` configuration like the following:

```json
{
	"mcpServers": {
		"ai-search": {
			"url": "https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/mcp"
		}
	}
}
```

The exact configuration depends on your client. Some clients require a transport field on the server entry, such as `"type": "http"` for a remote HTTP server, so refer to your MCP client's documentation for how to add a remote server. Once connected, the client can call the `search` tool to retrieve relevant content from your instance.

To test the endpoint directly or build your own client, refer to [MCP](https://developers.cloudflare.com/ai-search/api/search/mcp/) for the request format.

## Security considerations

The public endpoint does not require authentication, so anyone with the URL can query your indexed content.

To require authentication, add a [custom domain](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/) and protect it with [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/). MCP clients then authenticate with an Access [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) sent as request headers.

If you keep the endpoint open:

* Only index content that is safe to expose publicly.
* Enable rate limiting under **Settings** \> **Public Endpoint**.
* Restrict allowed origins under **Authorized hosts**. This only affects browser clients.

Refer to [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) for details.

## Next steps

### [MCP endpoint reference](https://developers.cloudflare.com/ai-search/api/search/mcp/)

The MCP endpoint tools and request format.

### [Public endpoint settings](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/)

Rate limiting, CORS, and tool description.

### [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/)

Require MCP clients to authenticate before they can search.

### [AI Search as an agent tool](https://developers.cloudflare.com/agents/tools/ai-search/)

Query AI Search in code from a Cloudflare Agent.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/connect-mcp-client/#page","headline":"Connect your AI Search to an MCP client · Cloudflare AI Search docs","description":"Expose your indexed content as a search tool for any MCP client or agent using the built-in MCP endpoint.","url":"https://developers.cloudflare.com/ai-search/how-to/connect-mcp-client/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
