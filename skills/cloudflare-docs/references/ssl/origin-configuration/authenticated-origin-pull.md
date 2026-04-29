---
title: Authenticated Origin Pulls (mTLS)
description: Authenticated Origin Pulls helps ensure requests to your origin server come from the Cloudflare network.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ mTLS ](https://developers.cloudflare.com/search/?tags=mTLS) 

# Authenticated Origin Pulls (mTLS)

Authenticated Origin Pulls (AOP) helps ensure requests to your origin server come from the Cloudflare network, which provides an additional layer of security on top of [Full](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.

Check your encryption mode

Authenticated Origin Pulls does not apply when your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.

This authentication becomes particularly important with the [Cloudflare Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/). Together with the WAF, you can make sure that **all traffic** is evaluated before receiving a response from your origin server.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Configuration levels

There are three independent AOP configurations. Each has its own certificate and enablement setting. All of them require that you also set up your origin server - refer to each of the specific guides to learn more.

* [Global](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/): Uses a Cloudflare-provided certificate that is shared across all Cloudflare accounts. Applies to all proxied traffic on the zone. This is the simplest setup but only guarantees that a request is coming from the Cloudflare network.
* [Zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/): Uses a certificate that you upload. Applies to all proxied traffic on the zone. Provides stricter security because the certificate is exclusive to your account. Zone-level certificates take precedence over global certificates.
* [Per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/): Uses a certificate that you upload, applied to specific hostnames. Per-hostname certificates take precedence over zone-level and global certificates for the specified hostname.

Note

[Global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/), and [per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) are three independent configurations. Enabling or disabling one does not affect the others.

## Aspects to consider

If you need to guarantee that requests come from your specific Cloudflare account (not just from the Cloudflare network), set up [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) or [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP with your own certificate. You should also consider [additional security measures for your origin](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/).

Using a custom certificate is required if you need your domain to be [FIPS ↗](https://en.wikipedia.org/wiki/Federal%5FInformation%5FProcessing%5FStandards) compliant.

## Related topics

* [SSL/TLS Encryption Modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}}]}
```
