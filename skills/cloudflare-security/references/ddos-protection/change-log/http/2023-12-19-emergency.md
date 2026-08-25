---
description: HTTP DDoS managed ruleset rule changes for this release.
title: 2023-12-19 - Emergency
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# 2023-12-19 - Emergency

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/change-log/http/2023-12-19-emergency/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                             |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | ----------------------------------------------------------------- |
| ...1fc1e601 | HTTP requests with unusual HTTP headers or URI path (signature #31). | block           | block         | Add more characteristics to the unusual HTTP headers or URI path. |
| ...22807318 | HTTP requests from known botnets.                                    | log             | ddos\_dynamic | Extend the rule to catch more attacks.                            |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Change the rule to catch more attacks.                            |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-12-19-emergency/#page","headline":"2023-12-19 - Emergency · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-12-19-emergency/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
