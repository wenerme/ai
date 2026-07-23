---
description: Cloudflare Worker templates for AI Crawl Control integrations.
title: Worker templates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Worker templates

Last updated Jun 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/reference/worker-templates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use [AI Crawl Control analytics](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/) to identify which crawlers are accessing your site, then deploy Worker templates to customize how you handle that traffic.

## x402 Payment-Gated Proxy

The x402-proxy template implements payment-gated access using the [x402 protocol ↗](https://www.x402.org/) — an open payment standard built around HTTP 402 (Payment Required). Use it to monetize crawler access, paywall specific routes, or charge bots while letting humans through free.

For setup instructions and Bot Management integration examples, see the [template on GitHub ↗](https://github.com/cloudflare/templates/tree/main/x402-proxy-template).

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/x402-proxy-template)

## Related

* [Bot reference](https://developers.cloudflare.com/ai-crawl-control/reference/bots/) — Detection IDs and user agents for common crawlers
* [Cloudflare Workers](https://developers.cloudflare.com/workers/) — Build and deploy serverless applications
* [Workers templates ↗](https://github.com/cloudflare/templates) — More templates on GitHub
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/) — Native Cloudflare integration for monetizing crawler access
* [x402 payments](https://developers.cloudflare.com/agents/tools/payments/x402/) — Gate resources, charge for MCP tools, add payments to coding agents

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/reference/worker-templates/#page","headline":"Worker templates · Cloudflare AI Crawl Control docs","description":"Cloudflare Worker templates for AI Crawl Control integrations.","url":"https://developers.cloudflare.com/ai-crawl-control/reference/worker-templates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
