---
description: Understand ISP blocking of shared Cloudflare IPs.
title: Potential ISP blocking of Cloudflare IP addresses
image: https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/og.png?v=81888809258c940e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Potential ISP blocking of Cloudflare IP addresses

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare cannot guarantee that your assigned IP addresses are not blocked by any country or Internet service provider (ISP). When Cloudflare proxies your zone, it assigns an IP address to the zone from a shared pool in the Cloudflare network. Cloudflare does not offer dedicated or exclusive IP addresses for users on Free, Pro, or Business plans, nor does Cloudflare rotate assigned IP addresses upon request.

When an ISP blocks your website, you should expect that:

- This is not due to a misconfiguration of your Cloudflare settings.
- You may see a drop in traffic in your [Cloudflare Analytics](https://developers.cloudflare.com/analytics/).
- As these actions are taken at the ISP level, Cloudflare does not have the ability to restore Internet connectivity for impacted users.

Enterprise users can lease [static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/) or get their own IPs advertised using [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/). For more information, contact the [Cloudflare Sales team ↗︎](https://www.cloudflare.com/plans/enterprise/contact/).

It is important to note that an ISP-level block is distinct from other types of website blocking. For example, website owners may enforce certain restrictions (based upon IP, ASN, country, or other factors such as rate limiting) that will return [`1XXX` errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/) in the HTML body of the response. Website owners configure these blocks, so issues need to be addressed directly with the website owner. For more information on website blocking, refer to the [Web Application Firewall FAQ](https://developers.cloudflare.com/waf/troubleshooting/faq/#why-have-i-been-blocked).

For information on individual users being challenged when visiting Cloudflare-protected websites, refer to [Challenges on Cloudflare-protected sites](https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/#challenges-on-cloudflare-protected-sites).

## Identify filtering of specific Cloudflare IP prefixes

Instead of blocking a website completely, an ISP may filter traffic to specific Cloudflare IP prefixes. Requests sent to the affected IP addresses never reach Cloudflare, while requests sent to other Cloudflare IP addresses continue to work.

Signs of prefix-level filtering include:

- Requests sent to some of the IP addresses assigned to your zone time out, while requests sent to other addresses in the same range succeed.
- A [traceroute](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#perform-a-traceroute) or [MTR](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#perform-a-mtr) to a failing IP address stops inside the ISP network before it reaches Cloudflare.
- The same website loads from a different network, such as a mobile connection.
- The failed requests return no `cf-ray` response header. A Cloudflare error page confirms that a request reached Cloudflare. A connection timeout means the request did not.

To confirm which IP addresses are affected, test each address that your domain resolves to:

1. List the IP addresses that your domain resolves to:

```sh
dig +short www.example.com
```

2. Test each IP address directly. Replace `203.0.113.34` with one of the addresses from the previous step:

```sh
curl -svo /dev/null https://www.example.com/ --connect-to ::203.0.113.34
```

3. Compare the results with the same tests run from a different network.

For more information about traceroute, MTR, and other diagnostic tools, refer to [Gathering information for troubleshooting sites](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/).

If requests reach Cloudflare but are served by a distant data center, refer to [Cloudflare traffic not being sent to the geographically closest data center](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/).

## Information to provide your ISP

The filter runs on the ISP network, so the ISP is the only party that can remove it. When you contact your ISP, include:

- The IP addresses that are failing, with the dates and times of the failures
- Traceroute and MTR output for those IP addresses, showing where packets stop
- The Cloudflare IP ranges that the addresses belong to, from [Cloudflare's published IP ranges ↗︎](https://www.cloudflare.com/ips/)
- A request for the ISP to verify that its routers are not filtering or blackholing those prefixes

## What Cloudflare cannot do

Cloudflare cannot remove an ISP's filters or reassign the anycast IP addresses of your zone. For dedicated address options available to Enterprise users, refer to [static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/) or [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/#page","headline":"Potential ISP blocking of Cloudflare IP addresses","description":"Understand ISP blocking of shared Cloudflare IPs.","url":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/","inLanguage":"en","image":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/og.png?v=81888809258c940e","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
