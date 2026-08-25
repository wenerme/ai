---
description: Set a time period during which visitors do not have to solve repeat challenges.
title: Challenge Passage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Challenge Passage

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When a visitor solves a [Cloudflare Challenge](https://developers.cloudflare.com/cloudflare-challenges/) \- as part of a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) or [IP Access rule](https://developers.cloudflare.com/waf/tools/ip-access-rules/) \- you can set the **Challenge Passage** to prevent them from having to solve future Challenges for a specified period of time.

### How it works

When a visitor successfully solves a challenge, Cloudflare sets a [cf\_clearance cookie](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/#additional-cookies-used-by-the-challenge-platform) in their browser. This cookie specifies the duration your website is accessible to that visitor.

When that visitor tries to access other parts of your website, Cloudflare evaluates the cookie before presenting another challenge. If the cookie is still valid, no challenges will be shown.

When Cloudflare evaluates a `cf_clearance` cookie, a few extra minutes are included to account for clock skew. For XmlHTTP requests, an extra hour is added to the validation time to prevent breaking XmlHTTP requests for pages that set short lifetimes.

### Customize the Challenge Passage

By default, the `cf_clearance` cookie has a lifetime of 30 minutes. Cloudflare recommends a setting between 15 and 45 minutes.

To update the Challenge Passage (and the value of the `cf_clearance` cookie):

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Go to **Challenge passage**.
3. Select the edit icon to set a timeout duration.

### Limitations

The Challenge Passage does not apply to rate limiting rules.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/#page","headline":"Challenge Passage · Cloudflare challenges docs","description":"Set a time period during which visitors do not have to solve repeat challenges.","url":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
