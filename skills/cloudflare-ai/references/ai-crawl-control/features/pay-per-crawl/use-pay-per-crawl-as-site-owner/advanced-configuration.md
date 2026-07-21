---
description: Configure advanced Pay Per Crawl settings.
title: Advanced configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

#  Advanced configuration

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Disable Pay Per Crawl by URI pattern

You may want to offer free access to certain pages while charging for others:

* Allow free access to **homepages, category pages, or navigation** to help crawlers discover paid content.
* Exclude functional pages like **login, search, or API endpoints** that don't contain chargeable content.
* Start with Pay Per Crawl on **a small section of your site** before expanding.
* Offer free access to **promotional or archived content** while charging for premium articles.

To get started, use [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) to exclude specific URI patterns from charging.

1. Go to **Rules** \> **Overview** in the Cloudflare dashboard.
[ Go to **Overview** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Configuration Rule**.
3. **When incoming requests match**: Set your URI pattern.

  * Field: `URI Full`
  * Operator: `wildcard`
  * Value: `https://*example.com/public/*`
4. Select **Disable Pay Per Crawl** \> **Add**
5. Select **Deploy**.

**Example patterns:**

* Free homepage: `URI Full` equals `https://example.com/`
* Free directory: `URI Full` wildcard `https://*example.com/public/*`

Note

Some paths are always free to crawl. These paths are: `/robots.txt`, `/sitemap.xml`, `/security.txt`, `/.well-known/security.txt`, `/crawlers.json`

## Additional resources

* [Configuration Rules documentation](https://developers.cloudflare.com/rules/configuration-rules/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/#page","headline":"Advanced configuration · Cloudflare AI Crawl Control docs","description":"Configure advanced Pay Per Crawl settings.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
