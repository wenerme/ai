---
title: Redirect visitors to a new page URL
description: Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Redirect visitors to a new page URL

Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/#page","headline":"Redirect visitors to a new page URL · Cloudflare Rules docs","description":"Create a redirect rule to redirect visitors from /contact-us/ to the page's new path /contacts/.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-new-url/","name":"Redirect visitors to a new page URL"}}]}
```
