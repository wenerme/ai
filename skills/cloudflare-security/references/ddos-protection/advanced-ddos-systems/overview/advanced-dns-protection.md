---
description: Protect against sophisticated DNS-based DDoS attacks with traffic profiling and adaptive mitigation.
title: Advanced DNS Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced DNS Protection

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare's Advanced DNS Protection, powered by [flowtrackd ↗](https://blog.cloudflare.com/announcing-flowtrackd/), provides stateful protection against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as [random prefix attacks](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/).

Note

Advanced TCP and DNS Protection systems are automatically enabled in `Monitor` mode with the default thresholds for new Magic Transit customers and their [authorized prefixes](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

Magic Transit customers can also enable the Advanced DDoS systems when the prefixes are ready, change the sensitivity level, or adjust the thresholds by contacting their account team.

## How it works

Cloudflare's Advanced DNS Protection works by first learning your traffic patterns and forming a baseline of the type of DNS queries you normally receive. Later, the system will be able to distinguish between legitimate and malicious queries, protecting your DNS infrastructure without impacting legitimate traffic.

Currently, the protection system only analyzes DNS over UDP (it does not include DNS over TCP).

The [Network Analytics dashboard](https://developers.cloudflare.com/analytics/network-analytics/) will display system-specific analytics for Advanced DNS Protection in the **DNS protection** tab, including the queried domains and record types.

---

## Setup

[Create a rule](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-rule/#create-an-advanced-dns-protection-rule) to enable Advanced DNS Protection.

---

## Data collection

Cloudflare collects DNS-related data such as query type (for example, `A` record) and the queried domains. For details, refer to [Data collection](https://developers.cloudflare.com/analytics/network-analytics/reference/data-collection/).

Caution

Currently, to disable this data collection you must remove your prefixes either in the Cloudflare dashboard or through the [Delete a prefix](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/#prefix-operations) API operation. However, this procedure will remove the prefixes from both Advanced DNS Protection and [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/).

---

## Troubleshooting

### No data about Advanced DNS Protection in Network Analytics

If you cannot find any data related to Advanced DNS Protection in the **DNS Protection** tab of Network Analytics, it could be because one of these reasons:

* You did not [add your prefixes](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix/) to Advanced L3/4 DDoS Protection.
* Accounts that existed before January 2025 were not automatically provisioned. If you onboarded before January 2025, Advanced DNS Protection may not have been enabled for your account.
* You do not have any DNS over UDP traffic.

---

## Related products

Advanced DNS Protection can protect you against volumetric DNS DDoS attacks. To perform DNS caching, proxying, and configuration, use the [Cloudflare DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/).

Currently, Advanced DNS Protection is not available for DNS Firewall.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/#page","headline":"Cloudflare Advanced DNS Protection · Cloudflare DDoS Protection docs","description":"Protect against sophisticated DNS-based DDoS attacks with traffic profiling and adaptive mitigation.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
