---
description: View DDoS attack analytics in Security Analytics, Network Analytics, or the GraphQL API.
title: Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/reference/analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can view DDoS analytics in different dashboards, depending on your service and plan:

* The [Security Events dashboard](https://developers.cloudflare.com/waf/analytics/security-events/) provides you with visibility into L7 security events that target your zone, including HTTP DDoS attacks and TCP attacks. The dashboard displays mitigations of HTTP DDoS attacks as HTTP DDoS events. These events are also available via [Cloudflare Logs](https://developers.cloudflare.com/logs/).
* The [Network Analytics dashboard](https://developers.cloudflare.com/analytics/network-analytics/) provides you with visibility into L3/4 traffic and DDoS attacks that target your IP ranges or Spectrum applications.

## Availability

| Service        | Free              | Pro             | Business        | Enterprise        |
| -------------- | ----------------- | --------------- | --------------- | ----------------- |
| WAF/CDN        | Sampled logs only | Security Events | Security Events | Security Events   |
| Spectrum/BYOIP | –                 | –               | –               | Network Analytics |
| Magic Transit  | –                 | –               | –               | Network Analytics |

## Remarks

In some situations, the analytics dashboards will not show you the ID of the DDoS managed rule that handled a packet/request. This means that an internal DDoS rule, which Cloudflare does not currently expose publicly, applied an action to the packet/request. These internal DDoS rules have a very low false positive rate and should always be enabled to protect your properties against DDoS attacks. For the same reason, DDoS rule IDs may also be unavailable in Cloudflare logs and API responses.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/reference/analytics/#page","headline":"DDoS analytics · Cloudflare DDoS Protection docs","description":"View DDoS attack analytics in Security Analytics, Network Analytics, or the GraphQL API.","url":"https://developers.cloudflare.com/ddos-protection/reference/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
```
