---
description: Integrate AI Search into public-facing applications using unauthenticated public endpoints.
title: Public endpoint
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Public endpoint

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/api/search/public-endpoint/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI Search public endpoints allow you to expose AI Search capabilities without requiring authentication. This enables you to integrate AI Search into public-facing applications or share it with external users.

For pre-built search and chat components you can embed on your website using the public endpoints, refer to [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/).

## Prerequisites

Enable public endpoints for your AI Search instance:

1. Go to **AI Search** in the Cloudflare dashboard. [Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL.

For configuration options like rate limiting and CORS, refer to [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/).

## Endpoint hostnames

You can enable a public endpoint on a single instance or on a whole [namespace](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/). A namespace endpoint serves the same three paths and searches across the instances you allow in that namespace, merging the results.

Cloudflare generates the hostname when you enable the endpoint:

| Hostname                                              | Description                                                                                                                                               |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <PUBLIC\_ENDPOINT\_ID>.search.ai.cloudflare.com       | Serves a single instance.                                                                                                                                 |
| ns-<NAMESPACE\_ENDPOINT\_ID>.search.ai.cloudflare.com | Serves a [namespace](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/), searching across several instances. |

The request and response formats are identical for both. The examples on this page use the instance hostname.

## Bring your own domain

You can serve the same endpoints from a hostname that you own, such as `search.example.com`, instead of the generated one:

```txt
https://search.example.com/search
https://search.example.com/chat/completions
https://search.example.com/mcp
```

The hostname must belong to a zone on the same Cloudflare account. To attach a custom domain:

1. Go to **AI Search** in the Cloudflare dashboard. [Go to **AI Search** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your instance or namespace.
3. Go to **Public Endpoints** and enable the public endpoint. A custom domain requires an active public endpoint.
4. Go to **Custom Domains** and attach your hostname.

A custom domain routes requests through your own zone, so you can also put [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/) in front of the endpoint and require callers to authenticate before they reach AI Search. Access only protects the custom hostname, so set `default_domain_enabled` to `false` as well. Otherwise the default `<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com` hostname keeps answering unauthenticated requests.

To attach a domain through the API instead, refer to [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/).

## Chat completions

The `/chat/completions` endpoint searches your data source and generates a response using the model and retrieved context. It uses the same OpenAI-compatible format as the [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/#chat-completions).

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
  }'
```

For the full list of options, refer to the [Chat Completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/).

## Search

The `/search` endpoint returns relevant chunks from your data source without generating a response. It uses the same format as the [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/#search).

```bash
curl https://<PUBLIC_ENDPOINT_ID>.search.ai.cloudflare.com/search \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "How do I configure AI Search?",
        "role": "user"
      }
    ]
  }'
```

For the full list of options, refer to the [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/).

## Next steps

* [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/) \- Add pre-built search and chat components to your website.
* [MCP](https://developers.cloudflare.com/ai-search/api/search/mcp/) \- Connect AI agents using the Model Context Protocol.
* [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) \- Configure rate limiting, CORS, and security settings.
* [Custom domains](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/custom-domains/) \- Serve these endpoints from a hostname that you own.
* [Cloudflare Access](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/cloudflare-access/) \- Require callers to authenticate before they reach these endpoints.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/search/public-endpoint/#page","headline":"Public endpoint · Cloudflare AI Search docs","description":"Integrate AI Search into public-facing applications using unauthenticated public endpoints.","url":"https://developers.cloudflare.com/ai-search/api/search/public-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
