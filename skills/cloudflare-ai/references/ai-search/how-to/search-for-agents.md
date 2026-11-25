---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Make your website searchable by AI agents with automatic indexing, a discoverable search endpoint, and configurable AI Search defaults.
title: Search for Agents
image: https://developers.cloudflare.com/ai-search/how-to/search-for-agents/og.png?v=7ff626ce2435c656
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Search for Agents

Available on all plans

Search for Agents makes your website searchable by AI agents. Turn it on for your domain to create an AI Search instance, index your content, and expose a search endpoint at `https://example.com/.well-known/search`.

Cloudflare advertises the endpoint on your pages so agents can discover it automatically. The endpoint returns relevant content in Markdown, not an AI-generated answer. Agents can use that content with their own models and conversations.

You can use Search for Agents alongside [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/). Markdown for Agents converts individual pages to Markdown on request, while Search for Agents retrieves relevant content from your site's index.

Search for Agents is available in beta on all plans. Usage is subject to [AI Search pricing and plan limits](https://developers.cloudflare.com/ai-search/platform/limits-pricing/), including content ingestion, index storage, and queries.

Read the [Search for Agents blog post ↗︎](https://blog.cloudflare.com/search-for-agents) for more information.

## Turn on Search for Agents

Your domain must be [onboarded to your Cloudflare account](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/). Only index content that you intend to make publicly searchable. Requests to the search endpoint remain subject to your AI Crawl Control and Web Application Firewall (WAF) configurations.

1. In the Cloudflare dashboard, select your domain and go to **Overview**. [Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/)
2. Under **Quick Actions**, turn on **Search for Agents**.![Search for Agents toggle turned on in the Cloudflare dashboard, with a Beta badge and a link to feature documentation.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=958,height=244,format=webp/_astro/search-for-agents.CkMydMyZ.png)
3. Review the [default settings](#default-settings) and pricing notice, then confirm.
4. Wait for AI Search to crawl and index your content before running a search.

Search for Agents creates an instance named `search-for-agents-<ZONE_ID>` in the `default` namespace. The instance uses `https://<YOUR_DOMAIN>` as its website data source. It uses the **Discover** parse type to find pages through sitemaps and links, without requiring a sitemap. For crawl behavior and controls, refer to [Discover](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/#discover).

You can open the instance from your domain's **Overview** page or from **AI Search** in your account.

## Default settings

When you turn on Search for Agents, you accept its suggested configuration. You can change configurable settings at any time in your AI Search instance's **Settings** tab. Some settings, including the embedding model and data source, are fixed at creation time. Refer to [Configuration](https://developers.cloudflare.com/ai-search/configuration/) for which settings you can change.

Search for Agents explicitly selects **Discover** crawling and **hybrid search**. Other settings inherit the AI Search defaults.

### Crawl and index

New Search for Agents instances use these crawl and indexing settings:

| Setting | Default |
| --- | --- |
| [Parse type](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/) | `discover`, using both sitemaps and links |
| [Crawl page limit](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/#page-limit-and-depth) | 100,000 pages, subject to instance limits |
| Crawl depth | Five link hops from the source URL |
| [Crawl cache age](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/#cache-age) | 24 hours |
| [Include subdomains](https://developers.cloudflare.com/ai-search/configuration/data-source/website/parse-types/#subdomains) | Off |
| [Sync interval](https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/#sync-interval) | 24 hours |
| [Search mode](https://developers.cloudflare.com/ai-search/concepts/search-modes/) | Hybrid: vector and keyword search |
| [Embedding model](https://developers.cloudflare.com/ai-search/configuration/models/) | `@cf/qwen/qwen3-embedding-0.6b` |
| [Chunk size](https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/) | 1,024 tokens |
| Chunk overlap | 10% |

### Retrieval and cache

New Search for Agents instances use these retrieval and cache settings:

| Setting | Default |
| --- | --- |
| [Fusion method](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/) | Reciprocal Rank Fusion (RRF) |
| [Maximum results](https://developers.cloudflare.com/ai-search/configuration/retrieval/result-controls/) | 10 chunks |
| Match threshold | `0.4` |
| [Query rewriting](https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/) | Off |
| [Reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/) | Off |
| [Similarity cache](https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/) | On |
| Cache threshold | Strong (`close_enough`) |
| Cache duration | 48 hours |

The `/.well-known/search` endpoint retrieves content without generating an answer. Generation model settings apply when you use the instance through a [chat completions API](https://developers.cloudflare.com/ai-search/api/search/rest-api/#chat-completions), not through Search for Agents.

## Discover the search endpoint

Cloudflare adds search metadata to the `<head>` of HTML responses:

```html
<meta
	name="agent:instructions"
	content="Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
/>
<meta
	name="agent:endpoint"
	content="https://example.com/.well-known/search?q={query}"
/>
<meta name="agent:method" content="GET" />
<meta
	name="agent:documentation"
	content="https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
/>
```

If you also turn on [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/), requests with `Accept: text/markdown` receive the same discovery information in YAML front matter:

```yaml
---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://example.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
---
```

Agents can read this metadata and query your site instead of crawling individual pages.

## Search your content

Replace `example.com` with your domain. You can search with keywords or natural-language questions.

### GET requests

Send the search text in the `q` query parameter:

```sh
curl --get "https://example.com/.well-known/search" \
  --data-urlencode "q=How do I verify webhook signatures?"
```

The response contains retrieved content in Markdown, including source references and relevance scores.

### QUERY requests

The endpoint also supports the HTTP `QUERY` method. Send UTF-8 search text in a plain-text body:

```sh
curl -X QUERY "https://example.com/.well-known/search" \
  --header "Content-Type: text/plain" \
  --data "How do I verify webhook signatures?"
```

Alternatively, send a JSON object with a `q` field:

```sh
curl -X QUERY "https://example.com/.well-known/search" \
  --header "Content-Type: application/json" \
  --data '{"q":"How do I verify webhook signatures?"}'
```

Both methods return retrieved content, not a generated answer.

## Use your instance elsewhere

The instance created by Search for Agents is also a standard AI Search instance. You can use it through a [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/), turn on [public REST and MCP endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/), or [embed search and chat components](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/embed-search-snippets/) for human visitors.

Additional public endpoints are separate from `/.well-known/search`. You do not need to turn them on to use Search for Agents.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/search-for-agents/#page","headline":"Search for Agents","description":"Make your website searchable by AI agents with automatic indexing, a discoverable search endpoint, and configurable AI Search defaults.","url":"https://developers.cloudflare.com/ai-search/how-to/search-for-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/how-to/search-for-agents/og.png?v=7ff626ce2435c656","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
