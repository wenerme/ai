---
description: Create egress policies for IP consistency.
title: Use egress policies to deliver consistent egress IPs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Use egress policies to deliver consistent egress IPs

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/egress-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Only available on Enterprise plans.

Egress policies allow you to determine whether your organization's traffic egresses via the default Cloudflare IP or via a [dedicated egress IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/) assigned to your account.

To create a new egress policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Egress policies**.
2. Select **Add a policy**.
3. Name the policy.
4. Build a logical expression that defines the traffic you want to control egress for. For example, you can add a policy to configure all traffic destined for a third-party network to use a static source IP:

| Policy name                 | Selector       | Operator | Value          | Egress method                   |
| --------------------------- | -------------- | -------- | -------------- | ------------------------------- |
| Access third-party provider | Destination IP | is       | 198.51.100.158 | Dedicated Cloudflare egress IPs |

| Primary IPv4 address | IPv6 address  |
| -------------------- | ------------- |
| 203.0.113.88         | 2001:db8::/32 |
5. Select **Create policy**.

For more information, refer to [Egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/egress-policies/#page","headline":"Use egress policies to deliver consistent egress IPs · Cloudflare Learning Paths","description":"Create egress policies for IP consistency.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/egress-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
