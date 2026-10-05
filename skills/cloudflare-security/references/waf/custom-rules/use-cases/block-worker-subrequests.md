---
description: Block or restrict Worker subrequests from other Cloudflare zones.
title: Block Worker subrequests from other zones
image: https://developers.cloudflare.com/waf/custom-rules/use-cases/block-worker-subrequests/og.png?v=5caf44ada9087388
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Block Worker subrequests from other zones

Last updated Oct 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-worker-subrequests/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The [`cf.worker.upstream_zone`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream_zone/) field identifies the zone that spawned a [Workers subrequest](https://developers.cloudflare.com/workers/platform/limits/#subrequests). You can use this field in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) to mitigate unwanted Worker traffic.

Caution

Do not use the [`CF-Worker`](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-worker) request header in WAF rules. The header is added after rule evaluation, so it is not available when WAF rules run. Use the `cf.worker.upstream_zone` field instead, which holds the same value.

### Block subrequests from a specific zone

- **When incoming requests match**:

  If you are using the expression editor:
  `(cf.worker.upstream_zone eq "example.com")`
- **Then take action**: *Block*

### Block all Worker subrequests except from your own zone

- **When incoming requests match**:

  If you are using the expression editor:
  `(not cf.worker.upstream_zone in {"" "your-zone.com"})`
- **Then take action**: *Block*

The empty string matches requests that did not come from a Worker, so this expression only blocks subrequests from other zones. Direct visitor traffic is not affected.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-worker-subrequests/#page","headline":"Block Worker subrequests from other zones","description":"Block or restrict Worker subrequests from other Cloudflare zones.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-worker-subrequests/","inLanguage":"en","image":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-worker-subrequests/og.png?v=5caf44ada9087388","dateModified":"2026-10-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
