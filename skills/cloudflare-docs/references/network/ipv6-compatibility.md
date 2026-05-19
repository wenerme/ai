---
title: IPv6 compatibility
description: Configure IPv6 compatibility for your Cloudflare domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/network/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IPv6 compatibility

Cloudflare enables IPv6 on all domains without requiring additional configuration or hardware (as long as your host provides IPv6 support).

When IPv6 compatibility is turned on, Cloudflare auto generates [AAAA DNS records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) to allow IPv6 clients to connect. On the other hand, when IPv6 compatibility is turned off, Cloudflare does not automatically generate and advertise `AAAA` DNS for the zone. Client software will determine whether to use IPv4 or IPv6 to connect to a hostname that supports both methods.

For [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/) that have both an IPv6 and IPv4 origin address, Cloudflare will prefer the IPv4 address when connecting to your origin server.

## Availability

| Free          | Pro | Business | Enterprise |     |
| ------------- | --- | -------- | ---------- | --- |
| Availability  | Yes | Yes      | Yes        | Yes |
| Can customize | No  | No       | No         | Yes |

## Enable IPv6 compatibility

By default, IPv6 compatibility is turned on for your domain and will apply to all domains and subdomains covered by [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/).

Note

If you have signed up for Cloudflare through a [Cloudflare hosting partner ↗](http://www.cloudflare.com/hosting-partners) or by use [partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), IPv6 compatibility does not apply to your apex domain.

## Disable IPv6 compatibility

If your origin web server only understands IPv4 formatted IP addresses, non-Enterprise customers should [configure Pseudo IPv4](https://developers.cloudflare.com/network/pseudo-ipv4/).

Alternatively, customers with an Enterprise account can turn off Cloudflare's IPv6 compatibility.

Note

To allow IPv6-only clients to connect to IPv4-only origin web servers, keep IPv6 compatibility enabled and configure [Pseudo IPv4](https://developers.cloudflare.com/network/pseudo-ipv4/).

* [ Dashboard ](#tab-panel-7220)
* [ API ](#tab-panel-7221)

To turn off IPv6 compatibility in the dashboard:

1. In the Cloudflare dashboard, go to the **Network** page.  
[ Go to **Network** ](https://dash.cloudflare.com/?to=/:account/:zone/network)
2. Turn off **IPv6 Compatibility**.

To turn off IPv6 compatibility using the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ipv6` as the setting name in the URI path, and the `value` parameter set to `"off"`.

Note

Even when IPv6 is turned off, domains may still receive IPv6 traffic (for example, via the Tor network). To completely turn off all IPv6 traffic:

* Turn off [**Onion Routing**](https://developers.cloudflare.com/network/onion-routing/).
* Use a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to block `0:0:0:0:0:0:0:0/0` using the condition `ip.src in {::/0}`.
* Add `and cf.worker.upstream_zone == ""` to the rule above to avoid blocking Workers subrequests. Workers subrequests use IPv6 addresses, and this condition checks that the request does not come from a Worker script. For more information, refer to the [cf.worker.upstream\_zone](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream%5Fzone/) field documentation.

---

## Troubleshoot an IPv6 network issue

Provide the following information to [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) if you experience issues with IPv6 connectivity:

* A [traceroute](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#perform-a-traceroute) that demonstrates the IPv6 connection issues.
* The [Cloudflare data center serving your request](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#identify-the-cloudflare-data-center-serving-your-request) when the IPv6 issues occur.
* Confirmation of whether [disabling IPv6 Compatibility](#disable-ipv6-compatibility) resolves the issue.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network/","name":"Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/network/ipv6-compatibility/","name":"IPv6 compatibility"}}]}
```
