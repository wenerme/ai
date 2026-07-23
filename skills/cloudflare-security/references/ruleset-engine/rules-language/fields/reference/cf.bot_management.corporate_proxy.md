---
description: Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.
title: cf.bot_management.corporate_proxy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.bot\_management.corporate\_proxy

`cf.bot_management.corporate_proxy` `Boolean`

Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.

Requires a Cloudflare Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Example usage:

```txt
not cf.bot_management.verified_bot
and not cf.bot_management.static_resource
and not cf.bot_management.corporate_proxy
and cf.bot_management.score lt 30
```

Categories:
* Request
* Bots

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.corporate_proxy/#page","headline":"cf.bot_management.corporate_proxy · Cloudflare Ruleset Engine docs","description":"Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.corporate_proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
