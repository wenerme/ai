---
description: Anchor traffic to consistent source IPs.
title: Source IP anchoring
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Source IP anchoring

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/source-ip-anchoring/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Source IP anchoring has become increasingly common recently as businesses begin to shift more traffic out of their office perimeter but still rely on their corporate IPs as a primary source of truth for trusted egress. Cloudflare understands the relevance of this model. Because subsequent backhauling and often single-threaded points of failure are inherent to static IP egress, Cloudflare offers several similar concepts that can help organizations transition from static IP egress to source IP anchoring. You can maintain your existing services, such as SaaS apps, while applying more granular and accurate control over access and data security.

The next section discusses best practices for migrating from managing backhauled user traffic in the context of IP allowlisting to delivering consistent security practices and IP consistency without sacrificing performance.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/source-ip-anchoring/#page","headline":"Source IP anchoring · Cloudflare Learning Paths","description":"Anchor traffic to consistent source IPs.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/source-ip-anchoring/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
