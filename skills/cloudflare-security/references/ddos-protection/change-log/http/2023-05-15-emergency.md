---
description: HTTP DDoS managed ruleset rule changes for this release.
title: 2023-05-15 - Emergency
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# 2023-05-15 - Emergency

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/change-log/http/2023-05-15-emergency/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                        |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | ------------------------------------------------------------ |
| ...1fc1e601 | HTTP requests with unusual HTTP headers or URI path (signature #31). | N/A             | block         |                                                              |
| ...863134d5 | HTTP requests from known bad user agents.                            | block           | block         | Widen detection scope.                                       |
| ...bb3cefd0 | HTTP requests with unusual HTTP headers or URI path (signature #53). | N/A             | block         |                                                              |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Extend the rule to catch attacks across multiple subdomains. |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Expand the filter to catch more attacks.                     |
| ...f2494447 | HTTP requests attempting to bypass the cache.                        | ddos\_dynamic   | ddos\_dynamic | Make rule more accurate when blocking attacks.               |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-05-15-emergency/#page","headline":"2023-05-15 - Emergency · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-05-15-emergency/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
