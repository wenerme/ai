---
description: HTTP DDoS managed ruleset rule changes for this release.
title: 2024-01-26 - Emergency
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# 2024-01-26 - Emergency

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/change-log/http/2024-01-26-emergency/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

| Rule ID     | Description                                                          | Previous Action    | New Action         | Notes                                                              |
| ----------- | -------------------------------------------------------------------- | ------------------ | ------------------ | ------------------------------------------------------------------ |
| ...3ad719cd | HTTP requests from known botnet (signature #79).                     | N/A                | ddos\_dynamic      |                                                                    |
| ...61bc58d5 | HTTP requests with unusual HTTP headers or URI path (signature #55). | managed\_challenge | managed\_challenge | Expanded the scope of the rule to catch attacks more consistently. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2024-01-26-emergency/#page","headline":"2024-01-26 - Emergency · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2024-01-26-emergency/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
