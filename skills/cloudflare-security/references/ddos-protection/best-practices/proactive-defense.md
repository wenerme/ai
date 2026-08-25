---
description: Strengthen your application against DDoS attacks before they happen.
title: Proactive DDoS defense
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Proactive DDoS defense

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare's network automatically mitigates large [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/), but these attacks can still affect your application.

## All customers

All customers should perform the following steps to better secure their application:

1. Make sure all [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/) are set to default settings (_High_ sensitivity level and mitigation actions) for optimal DDoS activation.
2. Deploy [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to enforce a combined positive and negative security model. Reduce the traffic allowed to your website based on your known usage.
3. Make sure your origin is not exposed to the public Internet, meaning that access is only possible from [Cloudflare IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/). As an extra security precaution, we recommend contacting your hosting provider and requesting new origin server IPs if they have been targeted directly in the past.
4. If you have [Managed IP Lists](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists) or [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/), consider using these in WAF custom rules.
5. Enable [caching](https://developers.cloudflare.com/cache/) as much as possible to reduce the strain on your origin servers, and when using [Workers](https://developers.cloudflare.com/workers/), avoid overwhelming your origin server with more subrequests than necessary.
To help counter attack randomization, Cloudflare recommends to update your cache settings to exclude the query string as a cache key. When the query string is excluded as a cache key, Cloudflare's cache will take in unmitigated attack requests instead of forwarding them to the origin. The cache can be a useful mechanism as part of a multilayered security posture.

## Enterprise customers

In addition to the steps for all customers, Cloudflare Enterprise customers subscribed to the Advanced DDoS Protection service should consider enabling [Adaptive DDoS Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/), which mitigates attacks more intelligently based on your unique traffic patterns.

## Magic Transit customers

In addition to the steps for all customers, Cloudflare Magic Transit customers should ensure that the [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/), [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/), and [Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) are enabled and that their configurations are optimized.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/#page","headline":"Proactive DDoS defense · Cloudflare DDoS Protection docs","description":"Strengthen your application against DDoS attacks before they happen.","url":"https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching"]}
```
