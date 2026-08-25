---
description: Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.
title: Redirect visitors to a new page URL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect visitors to a new page URL

Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/#page","headline":"Redirect visitors to a new page URL · Cloudflare Rules docs","description":"Create a redirect rule to redirect visitors from /contact-us/ to the page's new path /contacts/.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
