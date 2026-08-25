---
description: Block user agents and restrict zone access.
title: Block user agents and lock zones
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Block user agents and lock zones

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/surge-readiness/security/block-agents-lock-zones/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[User Agent (UA) Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/) rules match against specific User-Agent request headers sent by the browser or application accessing your site. UA rules are applied against the entire domain, and after a rule is triggered, you can decide which action to take against the visitor.

Actions:

* Block: Ensures that an IP address will never be allowed to access your site
* Interactive Challenge: Visitors will be shown an interactive challenge before allowed access
* Non-Interactive Challenge: Visitors will be shown a non-interactive challenge before allowed access

## Zone Lockdown

[Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/) rules allow you to define paths and only allow specific, trusted IPs to those paths. Any requests to those paths from non-whitelisted IPs will be automatically blocked with an 1106 HTTP code. This ability is particularly useful for locking down administrative or staging portions of your application.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/block-agents-lock-zones/#page","headline":"Block user agents and lock zones · Cloudflare Learning Paths","description":"Block user agents and restrict zone access.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/block-agents-lock-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
