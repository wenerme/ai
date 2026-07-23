---
description: Create a redirect rule to redirect all website visitors from the United Kingdom to a different domain, maintaining the current functionality in the same paths.
title: Redirect requests from one country to a domain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect requests from one country to a domain

Create a redirect rule to redirect all website visitors from the United Kingdom to a different domain, maintaining the current functionality in the same paths.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-country/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this example, all website visitors from the United Kingdom will be redirected to a different domain, but maintaining current functionality in the same paths.

1. Create a Bulk Redirect List named `uk_redirect_list` with the following URL redirect:

  * **Source URL**: `https://example.com/`
  * **Target URL**: `https://example.co.uk/`
  * **Subpath matching**: Enabled
  * **Preserve query string**: Enabled
2. Create a Bulk Redirect Rule that enables the previous Bulk Redirect List and set the rule expression to the following:
```txt
ip.src.country == "GB" and http.request.full_uri in $uk_redirect_list
```

This configuration will perform the following redirects for UK visitors:

| Request URL                             | URL after redirect                        |
| --------------------------------------- | ----------------------------------------- |
| https://example.com/                    | https://example.co.uk/                    |
| https://example.com/my/path/to/page.htm | https://example.co.uk/my/path/to/page.htm |
| https://example.com/search?q=term       | https://example.co.uk/search?q=term       |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-country/#page","headline":"Redirect requests from one country to a domain · Cloudflare Rules docs","description":"Create a redirect rule to redirect all website visitors from the United Kingdom to a different domain, maintaining the current functionality in the same paths.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-country/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects","Geolocation"]}
```
