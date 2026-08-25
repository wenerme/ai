---
description: Advertise and withdraw IP prefixes on demand through the API or dashboard.
title: Dynamic advertisement
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

# Dynamic advertisement

Last updated Apr 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Dynamic advertisement allows you to control when Cloudflare announces your IP prefixes via BGP. When a prefix is advertised, Cloudflare announces it to the Internet so that traffic destined for those IPs can be routed to Cloudflare. When a prefix is withdrawn, Cloudflare stops announcing it — traffic will then follow whatever other BGP routes exist for that prefix.

You can advertise and withdraw prefixes on demand using the [Cloudflare API](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#via-the-api) or the [IP Prefixes page](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#via-the-cloudflare-dashboard) in the Cloudflare dashboard. Enabling advertisement typically takes two to seven minutes, and disabling advertisement takes approximately 15 minutes.

When using the API, you can authorize the call with your email and API key or create a service token for this purpose. A successful API response indicates the service registered the request.

Both the API and the Cloudflare dashboard support [prefix delegations](https://developers.cloudflare.com/byoip/concepts/prefix-delegations/), which allow other Cloudflare accounts to interact with your prefix. The effect of a delegation is service-specific.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/#page","headline":"Dynamic advertisement · Cloudflare BYOIP docs","description":"Advertise and withdraw IP prefixes on demand through the API or dashboard.","url":"https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
