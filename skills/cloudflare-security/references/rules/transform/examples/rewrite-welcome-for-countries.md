---
description: Create two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.
title: Rewrite page path for visitors in specific countries
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Rewrite page path for visitors in specific countries

Create two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/rewrite-welcome-for-countries/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To have a welcome page in two languages, create two URL rewrite rules with a static rewrite of the path component:

**URL rewrite rule #1**

Text in **Expression Editor**:

```txt
http.request.uri.path == "/welcome.html" && ip.src.country == "GB"
```

Text after **Path** \> **Rewrite to** \> _Static_:

```txt
/welcome-gb.html
```

**URL rewrite rule #2**

Text in **Expression Editor**:

```txt
http.request.uri.path == "/welcome.html" && ip.src.country == "PT"
```

Text after **Path** \> **Rewrite to** \> _Static_:

```txt
/welcome-pt.html
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-welcome-for-countries/#page","headline":"Rewrite page path for visitors in specific countries · Cloudflare Rules docs","description":"Create two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-welcome-for-countries/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
```
