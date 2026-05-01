---
title: Limitations
description: Caveats and limitations when deploying Data Localization Suite features.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limitations

There are some caveats and limitations when deploying Data Localization Suite features.

Cloudflare is working hard to improve this offering and fill the gaps. If you have a specific feature request, please contact your [Account Team](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Key Management

When using Geo Key Manager or Keyless SSL (a service where your private key stays on your own infrastructure), some caveats may apply.

When a visitor first connects to your site, Cloudflare must complete a TLS handshake (the initial negotiation that establishes an encrypted connection). If the data center handling the connection does not hold your private key, it must contact a key server in an authorized region. This extra step adds latency corresponding to the round-trip time between the two locations, which can be as much as a second if the key server is on the other side of the world. Once the handshake is complete, the key server is not involved. Furthermore, if the visitor reconnects within the TLS Session Resumption window (a mechanism that reuses previous connection parameters), the private key is not required. Hence, latency is only added for the initial connection establishment.

Learn more about how it works in our [blog post ↗](https://blog.cloudflare.com/geo-key-manager-how-it-works/).

## Regional Services

When using Regional Services, some caveats and limitations may apply.

For product-specific caveats, refer to [Cloudflare product compatibility](https://developers.cloudflare.com/data-localization/compatibility/) page.

The following features and protocols are not supported by Regional Services and will not work on regionalized hostnames:

* [ICMP ↗](https://www.cloudflare.com/learning/ddos/glossary/internet-control-message-protocol-icmp/) — Internet Control Message Protocol, used for network diagnostics like `ping`
* [Encrypted Client Hello (ECH)](https://developers.cloudflare.com/ssl/edge-certificates/ech/) — a privacy feature that encrypts the initial part of a TLS connection
* [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) — origin-to-origin, a Cloudflare for SaaS setup
* [Onion Routing (Tor)](https://developers.cloudflare.com/network/onion-routing/)

Since Regional Services leverages Spectrum (Cloudflare's Layer 4 proxy service) in the background, [Spectrum limitations](https://developers.cloudflare.com/spectrum/reference/limitations/) apply.

Regional Services does not apply to [subrequests](https://developers.cloudflare.com/workers/platform/limits/#subrequests) (secondary HTTP requests that your Cloudflare Workers make to other services). Regional Services operates on your hostname's IPs. We recommend using [DNSSEC](https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/dnssec/) (which cryptographically signs DNS records to prevent tampering) and/or [DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) (which encrypts DNS queries) to ensure that DNS responses are secure and correct.

## Customer Metadata Boundary

There are certain limitations and caveats when using Customer Metadata Boundary.

When you configure Customer Metadata Boundary to EU, most of the analytics and logging sections in the Cloudflare dashboard will show no data. To view your data, use [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) (which respects CMB) or set up [Logpush](https://developers.cloudflare.com/logs/logpush/) to export [HTTP request](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) logs to a storage destination you control.

To configure Customer Metadata Boundary to EU, you must disable Log Retention for all zones within your account. Log Retention is a legacy feature of [Logpull](https://developers.cloudflare.com/logs/logpull/) (an older API for downloading logs, now superseded by Logpush).

For product-specific caveats, refer to [Cloudflare product compatibility](https://developers.cloudflare.com/data-localization/compatibility/) page.

### Data unavailability

If you encounter a message on the dashboard indicating that your data is unavailable due to your account's Metadata Boundary configuration, this is because you are trying to access data that is not stored in your region (that is, you are in the US and trying to access data that is only stored in the EU, or vice versa). If you receive this error message while being in the region where your data is stored, there are two potential reasons why you might get this message:

* Your account has Customer Metadata Boundary (CMB) enabled, and your request is being directed to an incorrect region. For example, if you are in the EU and CMB is configured to store your data in the US.
* If you are trying to access your data from the correct region, such as being in the EU with CMB configured to save your data in the EU, the issue may be caused by network congestion. Typically, this problem resolves within a few minutes.

### Dashboard UI Analytics

In some cases, when using Customer Metadata Boundary set to the EU, some Dashboard UI Analytics might show up empty.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/limitations/","name":"Limitations"}}]}
```
