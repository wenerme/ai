---
description: Examples of the impact of different URL normalization settings in the URLs of incoming requests.
title: URL normalization examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# URL normalization examples

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/normalization/examples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following table shows how different [URL normalization settings](https://developers.cloudflare.com/rules/normalization/settings/) affect request URLs before they pass to other Cloudflare features and to the origin server:

| Incoming URL                | Normalization type | Normalize incoming URLs | Normalize URLs to origin | URL at Cloudflare's network  | URL passed to origin server  |
| --------------------------- | ------------------ | ----------------------- | ------------------------ | ---------------------------- | ---------------------------- |
| www.example.com/hello       | (any)              | _Off_                   | _Off_                    | www.example.com/hello        | www.example.com/hello        |
| www.example.com/hello       | (any)              | _On_                    | _Off_                    | www.example.com/hello        | www.example.com/hello        |
| www.example.com/hello       | (any)              | _On_                    | _On_                     | www.example.com/hello        | www.example.com/hello        |
| example.com/%68ello         | (any)              | _Off_                   | _Off_                    | example.com/%68ello          | example.com/%68ello          |
| example.com/%68ello         | (any)              | _On_                    | _Off_                    | example.com/hello            | example.com/%68ello          |
| example.com/%68ello         | (any)              | _On_                    | _On_                     | example.com/hello            | example.com/hello            |
| example.com/%68ello//pa\\th | _RFC-3986_         | _Off_                   | _Off_                    | example.com/%68ello//pa\\th  | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _RFC-3986_         | _On_                    | _Off_                    | example.com/hello//pa%5Cth   | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _RFC-3986_         | _On_                    | _On_                     | example.com/hello//pa%5Cth   | example.com/hello//pa%5Cth   |
| example.com/%68ello//pa\\th | _Cloudflare_       | _Off_                   | _Off_                    | example.com/%68ello//pa\\th  | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _Cloudflare_       | _On_                    | _Off_                    | example.com/hello/pa/th      | example.com/%68ello//pa\\th  |
| example.com/%68ello//pa\\th | _Cloudflare_       | _On_                    | _On_                     | example.com/hello/pa/th      | example.com/hello/pa/th      |
| example.com/hello//../path  | _RFC-3986_         | _On_                    | _On_                     | example.com/hello/path       | example.com/hello/path       |
| example.com/hello//../path  | _Cloudflare_       | _On_                    | _On_                     | example.com/path             | example.com/path             |
| example.com/hello/\\../path | _RFC-3986_         | _On_                    | _On_                     | example.com/hello/%5C../path | example.com/hello/%5C../path |
| example.com/hello/\\../path | _Cloudflare_       | _On_                    | _On_                     | example.com/path             | example.com/path             |

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/normalization/examples/#page","headline":"URL normalization examples · Cloudflare Rules docs","description":"Examples of the impact of different URL normalization settings in the URLs of incoming requests.","url":"https://developers.cloudflare.com/rules/normalization/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
