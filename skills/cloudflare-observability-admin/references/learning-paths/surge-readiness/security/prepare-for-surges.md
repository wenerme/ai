---
description: Reduce server strain during traffic surges.
title: Prepare for surges and mitigate DDoS attacks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Prepare for surges and mitigate DDoS attacks

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/surge-readiness/security/prepare-for-surges/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Reduce server strain

Utilize Cloudflare's [caching](https://developers.cloudflare.com/cache/) to enhance load times and reduce server strain. Also, features like the [Waiting Room](https://developers.cloudflare.com/waiting-room) and [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/) can be used to effectively manage excess demand and ensure a stable user experience.

## Unlimited DDoS Protection

Cloudflare's Advanced [DDoS protection](https://developers.cloudflare.com/ddos-protection/) is always on for Enterprise customers and is used to mitigate DDoS attacks of all forms and sizes including those that target UDP and ICMP protocols, as well as SYN/ACK, DNS amplification, SMURF, and Layer 7 attacks.

## Browser Integrity Check

[Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) looks for requests with HTTP headers commonly used by spammers, bots, and crawlers such as requests with a missing or non-standard user agent. If a threat is found, Cloudflare will present a challenge page before allowing access. This may affect your API and can be selectively disabled using [Page Rules](https://developers.cloudflare.com/rules/page-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/prepare-for-surges/#page","headline":"Prepare for surges and mitigate DDoS attacks · Cloudflare Learning Paths","description":"Reduce server strain during traffic surges.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/prepare-for-surges/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
