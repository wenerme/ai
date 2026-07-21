---
description: Understand ISP blocking of shared Cloudflare IPs.
title: Potential ISP blocking of Cloudflare IP addresses
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Potential ISP blocking of Cloudflare IP addresses

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare cannot guarantee that your assigned IP addresses are not blocked by any country or Internet service provider (ISP). When Cloudflare proxies your zone, it assigns an IP address to the zone from a shared pool in the Cloudflare network. Cloudflare does not offer dedicated or exclusive IP addresses for users on Free, Pro, or Business plans, nor does Cloudflare rotate assigned IP addresses upon request.

When an ISP blocks your website, you should expect that:

* This is not due to a misconfiguration of your Cloudflare settings.
* You may see a drop in traffic in your [Cloudflare Analytics](https://developers.cloudflare.com/analytics/).
* As these actions are taken at the ISP level, Cloudflare does not have the ability to restore Internet connectivity for impacted users.

Enterprise users can lease [static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/) or get their own IPs advertised using [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/). For more information, contact the [Cloudflare Sales team ↗](https://www.cloudflare.com/plans/enterprise/contact/).

It is important to note that an ISP-level block is distinct from other types of website blocking. For example, website owners may enforce certain restrictions (based upon IP, ASN, country, or other factors such as rate limiting) that will return [1XXX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/) in the HTML body of the response. Website owners configure these blocks, so issues need to be addressed directly with the website owner. For more information on website blocking, refer to the [Web Application Firewall FAQ](https://developers.cloudflare.com/waf/troubleshooting/faq/#why-have-i-been-blocked).

For information on individual users being challenged when visiting Cloudflare-protected websites, refer to [Challenges on Cloudflare-protected sites](https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/#challenges-on-cloudflare-protected-sites).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/#page","headline":"Potential ISP blocking of Cloudflare IP addresses · Cloudflare Support docs","description":"Understand ISP blocking of shared Cloudflare IPs.","url":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
