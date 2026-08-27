---
description: Limits for concurrent Dynamic Worker requests.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dynamic-workers/platform/limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare limits the number of distinct Dynamic Workers with in-flight requests. Multiple in-flight requests to the same Dynamic Worker count as one toward this limit.

| Context                                                              | Concurrent Dynamic Workers |
| -------------------------------------------------------------------- | -------------------------- |
| Worker request                                                       | 4                          |
| [Durable Object](https://developers.cloudflare.com/durable-objects/) | 10 (previously 4)          |

In a Worker, each request has its own input/output (I/O) context. Each request can therefore have up to four distinct Dynamic Workers with in-flight requests.

A Durable Object shares one I/O context across all concurrent requests to the same object. Those requests can collectively have up to ten distinct Dynamic Workers with in-flight requests. To set lower CPU time or subrequest limits, refer to [Custom resource limits](https://developers.cloudflare.com/dynamic-workers/usage/limits/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/platform/limits/#page","headline":"Limits · Cloudflare Dynamic Workers docs","description":"Limits for concurrent Dynamic Worker requests.","url":"https://developers.cloudflare.com/dynamic-workers/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
