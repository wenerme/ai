---
title: AI Crawl Control with Transform Rules
description: Add licensing headers to crawler responses using Transform Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# AI Crawl Control with Transform Rules

Use [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) to add `Link` headers to crawler responses — even when those crawlers are blocked. This lets you communicate terms of use or [RSL ↗](https://rslstandard.org/) license information.

## Example: Add licensing terms to blocked responses

**Expression:**

```

(cf.bot_management.verified_bot and http.response.code eq 403)


```

**Header modification:**

* **Operation:** Set static
* **Header name:** `Link`
* **Value:** `<https://example.com/ai-licensing-terms>; rel="license"; type="text/html"`

For more details, refer to [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/","name":"AI Crawl Control with Transform Rules"}}]}
```
