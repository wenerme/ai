---
title: Potential ISP blocking of Cloudflare IP addresses
description: Cloudflare cannot guarantee that your assigned IP addresses are not blocked by any country or Internet service provider (ISP). When Cloudflare proxies your zone, it assigns an IP address to the zone from a shared pool in the Cloudflare network. Cloudflare does not offer dedicated or exclusive IP addresses for users on Free, Pro, or Business plans, nor does Cloudflare rotate assigned IP addresses upon request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Potential ISP blocking of Cloudflare IP addresses

Cloudflare cannot guarantee that your assigned IP addresses are not blocked by any country or Internet service provider (ISP). When Cloudflare proxies your zone, it assigns an IP address to the zone from a shared pool in the Cloudflare network. Cloudflare does not offer dedicated or exclusive IP addresses for users on Free, Pro, or Business plans, nor does Cloudflare rotate assigned IP addresses upon request.

When an ISP blocks your website, you should expect that:

* This is not due to a misconfiguration of your Cloudflare settings.
* You may see a drop in traffic in your [Cloudflare Analytics](https://developers.cloudflare.com/analytics/).
* As these actions are taken at the ISP level, Cloudflare does not have the ability to restore Internet connectivity for impacted users.

Enterprise users can lease [static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/) or get their own IPs advertised using [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/). For more information, contact the [Cloudflare Sales team ↗](https://www.cloudflare.com/plans/enterprise/contact/).

It is important to note that an ISP-level block is distinct from other types of website blocking. For example, website owners may enforce certain restrictions (based upon IP, ASN, country, or other factors such as rate limiting) that will return [1XXX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/) in the HTML body of the response. Website owners configure these blocks, so issues need to be addressed directly with the website owner. For more information on website blocking, refer to the [Web Application Firewall FAQ](https://developers.cloudflare.com/waf/troubleshooting/faq/#why-have-i-been-blocked).

For information on individual users being challenged when visiting Cloudflare-protected websites, refer to [Challenges on Cloudflare-protected sites](https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/#challenges-on-cloudflare-protected-sites).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/general-troubleshooting/","name":"General Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/general-troubleshooting/potential-isp-blocking/","name":"Potential ISP blocking of Cloudflare IP addresses"}}]}
```
