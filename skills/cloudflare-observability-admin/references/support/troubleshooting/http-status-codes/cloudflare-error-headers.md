---
description: Reference for the cf-error-type and cf-error-origin response headers present on Cloudflare-generated error pages.
title: Cloudflare error diagnostic headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Cloudflare error diagnostic headers

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-error-headers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

When Cloudflare generates an error page (as opposed to forwarding an error from your origin server), the response includes two diagnostic headers:

* **`cf-error-type`**: Identifies the error category. Common values:
  * `1000` — DNS resolution failure (A record points to a Cloudflare IP)
  * `1016` — Origin DNS error (CNAME target does not resolve)
  * `1101` — Worker threw an unhandled exception
  * `1102` — Worker exceeded resource limits (CPU or memory)
  * `52x` — Origin connectivity error (521, 522, 523, 524, 525, 526)
* **`cf-error-origin`**: Identifies which Cloudflare system generated the error.

These headers are present **only on Cloudflare-generated error pages**, not on errors forwarded from your origin server.

## How to capture these headers

Reproduce the error and inspect response headers using one of:

* `curl -v https://example.com` — look for `cf-error-type` in the response headers
* Browser DevTools: select **Network** \> select the failing request > **Headers**
* Export a HAR file and inspect the response headers

## Using cf-error-type for diagnosis

| cf-error-type prefix | Origin              | Next step                                              |
| -------------------- | ------------------- | ------------------------------------------------------ |
| 1xxx                 | DNS / routing layer | Check DNS records; verify no Cloudflare IP in A record |
| 1101 / 1102          | Workers runtime     | Check wrangler tail for the exception                  |
| 52x                  | Origin connectivity | Check origin server is up and reachable                |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-error-headers/#page","headline":"Cloudflare error diagnostic headers · Cloudflare Support docs","description":"Reference for the cf-error-type and cf-error-origin response headers present on Cloudflare-generated error pages.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-error-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
