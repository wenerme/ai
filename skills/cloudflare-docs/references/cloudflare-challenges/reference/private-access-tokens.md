---
title: Private Access Tokens (PAT)
description: How Private Access Tokens reduce challenge steps for visitors with valid tokens.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Private Access Tokens (PAT)

When a visitor is presented with a Challenge Page, Cloudflare evaluates various signals - including the presence of a Private Access Token (PAT) - to decide which challenges to issue. If a visitor presents a valid token, certain challenges are not issued, which reduces the number of steps required to pass.

A PAT does not automatically solve a challenge or let a visitor bypass the Challenge Page. The visitor still encounters the Challenge Page regardless of whether they have a valid PAT.

While some challenges require interactivity, most challenges served are invisible to the visitor.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/#page","headline":"Private Access Tokens (PAT) · Cloudflare challenges docs","description":"How Private Access Tokens reduce challenge steps for visitors with valid tokens.","url":"https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/reference/private-access-tokens/","name":"Private Access Tokens (PAT)"}}]}
```
