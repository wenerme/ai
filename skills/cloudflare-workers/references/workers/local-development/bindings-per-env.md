---
description: Supported bindings per development mode
title: Supported bindings per development mode
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported bindings per development mode

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/local-development/bindings-per-env/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Local development

**Local simulations**: During local development, your Worker code always executes locally and bindings connect to locally simulated resources [by default](https://developers.cloudflare.com/workers/local-development/#remote-bindings). This is supported in [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

**Remote binding connections:**: Allows you to connect to remote resources on a [per-binding basis](https://developers.cloudflare.com/workers/local-development/#remote-bindings). This is supported in [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

| Binding                                 | Local simulations | Remote binding connections |
| --------------------------------------- | ----------------- | -------------------------- |
| **AI**                                  | ❌                 | ✅                          |
| **Assets**                              | ✅                 | ❌                          |
| **Analytics Engine**                    | ✅                 | ❌                          |
| **Browser Run**                         | ✅                 | ✅                          |
| **D1**                                  | ✅                 | ✅                          |
| **Durable Objects**                     | ✅                 | ❌ [1](#user-content-fn-1)  |
| **Containers**                          | ✅                 | ❌                          |
| **Email Bindings**                      | ✅                 | ✅                          |
| **Hyperdrive**                          | ✅                 | ❌                          |
| **Images**                              | ✅                 | ✅                          |
| **KV**                                  | ✅                 | ✅                          |
| **Media Transformations**               | ❌                 | ✅                          |
| **mTLS**                                | ❌                 | ✅                          |
| **Queues**                              | ✅                 | ✅                          |
| **R2**                                  | ✅                 | ✅                          |
| **Rate Limiting**                       | ✅                 | ❌                          |
| **Service Bindings (multiple Workers)** | ✅                 | ✅                          |
| **Vectorize**                           | ❌                 | ✅                          |
| **Workflows**                           | ✅                 | ❌                          |

## Remote development

During remote development, all of your Worker code is uploaded and executed on Cloudflare's infrastructure, and bindings always connect to remote resources. **We recommend using local development with remote binding connections instead** for faster iteration and debugging.

Supported only in [wrangler dev --remote](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) \- there is **no Vite plugin equivalent**.

| Binding                                 | Remote development |
| --------------------------------------- | ------------------ |
| **AI**                                  | ✅                  |
| **Assets**                              | ✅                  |
| **Analytics Engine**                    | ✅                  |
| **Browser Run**                         | ✅                  |
| **D1**                                  | ✅                  |
| **Durable Objects**                     | ✅                  |
| **Containers**                          | ❌                  |
| **Email Bindings**                      | ✅                  |
| **Hyperdrive**                          | ✅                  |
| **Images**                              | ✅                  |
| **KV**                                  | ✅                  |
| **Media Transformations**               | ✅                  |
| **mTLS**                                | ✅                  |
| **Queues**                              | ❌                  |
| **R2**                                  | ✅                  |
| **Rate Limiting**                       | ✅                  |
| **Service Bindings (multiple Workers)** | ✅                  |
| **Vectorize**                           | ✅                  |
| **Workflows**                           | ❌                  |

## Footnotes

1. Refer to [Using remote resources with Durable Objects and Workflows](https://developers.cloudflare.com/workers/local-development/#using-remote-resources-with-durable-objects-and-workflows) for recommended workarounds. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/local-development/bindings-per-env/#page","headline":"Supported bindings per development mode · Cloudflare Workers docs","description":"Supported bindings per development mode","url":"https://developers.cloudflare.com/workers/local-development/bindings-per-env/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
