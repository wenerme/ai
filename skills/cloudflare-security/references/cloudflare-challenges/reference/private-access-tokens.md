---
description: How Private Access Tokens reduce challenge steps for visitors with valid tokens.
title: Private Access Tokens (PAT)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Private Access Tokens (PAT)

Last updated Jun 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When a visitor is presented with a Challenge Page, Cloudflare evaluates various signals - including the presence of a Private Access Token (PAT) - to decide which challenges to issue. If a visitor presents a valid token, certain challenges are not issued, which reduces the number of steps required to pass.

A PAT does not automatically solve a challenge or let a visitor bypass the Challenge Page. The visitor still encounters the Challenge Page regardless of whether they have a valid PAT.

While some challenges require interactivity, most challenges served are invisible to the visitor.

## Expected 401 responses

While loading a Challenge Page, the visitor's browser may attempt to retrieve a Private Access Token by issuing a request to a `/cdn-cgi/challenge-platform/.../pat/...` path. When the visitor's device, browser, or network environment cannot provide a token — for example, on unsupported platforms, in some managed or enterprise environments, or when connected through certain VPNs — this request returns an HTTP `401` response.

This `401` is expected and does **not** mean the visitor is blocked. The Private Access Token flow is an optimization used to reduce challenge steps. When a token is unavailable, Cloudflare falls back to a standard challenge and the visitor continues through the Challenge Page as usual.

If you are inspecting network requests in your browser's developer tools and notice a `401` on a `/cdn-cgi/challenge-platform/.../pat/...` request, you can safely disregard it. It is part of normal challenge processing and is not the cause of a block.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/#page","headline":"Private Access Tokens (PAT) · Cloudflare challenges docs","description":"How Private Access Tokens reduce challenge steps for visitors with valid tokens.","url":"https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
