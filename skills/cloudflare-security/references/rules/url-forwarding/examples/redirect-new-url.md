---
description: Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.
title: Redirect visitors to a new page URL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Redirect visitors to a new page URL

Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This example static redirect for zone `example.com` will redirect visitors requesting the `/contact-us/` page to the new page URL `/contacts/`.

**When incoming requests match**

* **Field:** _URI Path_
* **Operator:** _equals_
* **Value:** `/contact-us/`

If you are using the Expression Editor, enter the following expression:
`http.request.uri.path eq "/contact-us/"`

**Then**

* **Type:** _Static_
* **URL:** `/contacts/`
* **Status code:** _301_
* **Preserve query string:** Enabled

For example, the redirect rule would perform the following redirects:

| Request URL                      | Target URL                     | Status code |
| -------------------------------- | ------------------------------ | ----------- |
| example.com/contact-us/          | example.com/contacts/          | 301         |
| example.com/contact-us/?state=TX | example.com/contacts/?state=TX | 301         |
| example.com/team/                | (unchanged)                    | n/a         |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/#page","headline":"Redirect visitors to a new page URL · Cloudflare Rules docs","description":"Create a redirect rule to redirect visitors from /contact-us/ to the page's new path /contacts/.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
