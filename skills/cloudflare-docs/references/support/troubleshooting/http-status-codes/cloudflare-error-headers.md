---
title: Cloudflare error diagnostic headers
description: Reference for the cf-error-type and cf-error-origin response headers present on Cloudflare-generated error pages.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

# Cloudflare error diagnostic headers

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-error-headers/","name":"Cloudflare error diagnostic headers"}}]}
```
