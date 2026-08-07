---
description: Expose AI Search instances through public MCP, chat, and search endpoints without authentication.
title: Public endpoint settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Public endpoint settings

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Configure public endpoints to expose your AI Search instance directly to users without requiring authentication. This enables you to share your AI Search functionality with external users, or to integrate it into public-facing applications.

You can enable a public endpoint on a single instance or on a whole [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/), which searches across several instances and merges the results. Everything on this page applies to both. For what is specific to namespaces, such as choosing which instances the endpoint can reach, refer to [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/).

## Available endpoints

An instance or a namespace can expose three public endpoints:

| Endpoint          | Description                                   |
| ----------------- | --------------------------------------------- |
| /mcp              | Model Context Protocol endpoint for AI agents |
| /chat/completions | OpenAI-compatible chat completion endpoint    |
| /search           | Search endpoint that returns relevant chunks  |

For details on how to use these endpoints, refer to [Public endpoint usage](https://developers.cloudflare.com/ai-search/api/search/public-endpoint/).

## Public URL format

Cloudflare generates the hostname when you enable the endpoint. It is not the instance or namespace name.

| Hostname                                              | Serves                                                                                                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| <PUBLIC\_ENDPOINT\_ID>.search.ai.cloudflare.com       | A single instance.                                                                                                                                 |
| ns-<NAMESPACE\_ENDPOINT\_ID>.search.ai.cloudflare.com | A [namespace](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/), searching across several instances. |

For example:

* `https://abc123.search.ai.cloudflare.com/search`
* `https://ns-abc123.search.ai.cloudflare.com/search`

The identifier is generated the first time you enable the endpoint and is never rotated. Disabling the endpoint keeps the identifier, so re-enabling it reuses the same URL.

You can also serve the same endpoints from a hostname that you own, such as `https://search.example.com/search`. Refer to [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/).

## Enabling and disabling public endpoints

You can enable or disable each public endpoint independently:

1. Log in to your Cloudflare account, and go to **AI Search**. [Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance or namespace.
3. Go to **Settings** \> **Public Endpoints**.
4. Toggle on **Public Endpoints** to enable the feature, then toggle each individual endpoint on or off as needed.

Each endpoint has its own configuration panel for granular control.

To enable a namespace endpoint through the API, refer to [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/#enable-a-namespace-public-endpoint).

## Rate limiting

Configure rate limits to control usage across all public endpoints:

| Setting             | Description                               | Default  |
| ------------------- | ----------------------------------------- | -------- |
| Requests per period | Maximum number of requests allowed        | 120      |
| Time period         | Time window for the rate limit            | 1 minute |
| Period type         | Rate limiting technique: fixed or sliding | fixed    |

Rate limits apply across all enabled public endpoints for the AI Search instance.

## CORS configuration

Cross-Origin Resource Sharing (CORS) is enabled by default to support browser-based applications.

The default allowed origins depend on your data source type:

* **Website data sources**: The source domain is automatically added as an allowed origin.
* **Other data sources**: All origins (`*`) are allowed by default.

You can customize allowed origins in the **Public Endpoints** settings by adding specific hostnames to **Authorized hosts**.

Caution

Allowed origins are a browser control, not an access control. They set CORS response headers, which only browsers honor. A request from `curl`, a script, or any non-browser client ignores them. To restrict who can query your content, refer to [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/).

## Tool description

The **Tool Description** field allows you to customize how your AI Search instance is described to MCP clients. The default description is `Finds exactly what you're looking for`. This description helps AI agents understand what content is available, and when to use your search tool. A good tool description should explain what type of content is indexed, and what kinds of questions it can answer.

For example:

```txt
Search the Acme product documentation for information about
installation, configuration, API references, and troubleshooting
guides. Use this tool when users ask questions about how to set up
or use Acme products.
```

## Security considerations

A public endpoint does not require authentication. Anyone who knows the URL can query your indexed content.

To restrict who can query the endpoint, add a [custom domain](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/) and protect it with [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/). Users then authenticate with your identity provider before any request reaches AI Search.

If you keep the endpoint open:

* Only index content that is safe to expose publicly.
* Set a [rate limit](#rate-limiting) to limit abuse.
* Disable the endpoints you do not use, such as `/mcp`.
* Monitor usage through your dashboard analytics.

## Related

### [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/)

Serve a public endpoint from a hostname that you own.

### [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/)

Require users to authenticate before they can query your content.

### [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/)

Search across several instances from a single public endpoint.

### [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/)

Add pre-built search and chat components to your website.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/#page","headline":"Public endpoint settings · Cloudflare AI Search docs","description":"Expose AI Search instances through public MCP, chat, and search endpoints without authentication.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
