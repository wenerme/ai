---
description: HTTP DDoS managed ruleset rule changes for this release.
title: 2024-02-06 - Emergency
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# 2024-02-06 - Emergency

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/change-log/http/2024-02-06-emergency/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                           |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | --------------------------------------------------------------- |
| ...1fc1e601 | HTTP requests with unusual HTTP headers or URI path (signature #31). | block           | block         | Modify characteristics of the unusual HTTP headers or URI path. |
| ...3a679c52 | Requests coming from known bad sources.                              | N/A             | ddos\_dynamic |                                                                 |
| ...3ad719cd | HTTP requests from known botnet (signature #79).                     | ddos\_dynamic   | ddos\_dynamic | Expand the scope of the rule to match more attacks.             |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2024-02-06-emergency/#page","headline":"2024-02-06 - Emergency · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2024-02-06-emergency/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
