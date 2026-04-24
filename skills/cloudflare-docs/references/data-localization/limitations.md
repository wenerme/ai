---
title: Limitations
description: Caveats and limitations when deploying Data Localization Suite features.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/limitations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Limitations

There are some caveats and limitations when deploying Data Localization Suite features.

Cloudflare is working hard to improve this offering and fill the gaps. If you have a specific feature request, please contact your [Account Team](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Key Management

When using Geo Key Manager or Keyless SSL, some caveats may apply.

The remote procedure call from the server to the key server can add latency to the handshake, slowing down connection establishment. The additional latency cost corresponds to the round-trip time from the server to the key server, which can be as much as a second if the key server is on the other side of the world. Luckily, this latency cost only applies to the first time you connect to a server. Once the handshake is complete, the key server is not involved. Furthermore, if you reconnect to a site you do not have to pay the latency cost either because resuming a connection with TLS Session Resumption does not require the private key. Hence, latency is only added for the initial connection.

Learn more about how it works in our [blog post ↗](https://blog.cloudflare.com/geo-key-manager-how-it-works/).

## Regional Services

When using Regional Services, some caveats and limitations may apply.

For product-specific caveats, refer to [Cloudflare product compatibility](https://developers.cloudflare.com/data-localization/compatibility/) page.

The following features and protocols are not supported by Regional Services and might not work on regionalized hostnames:

* [ICMP ↗](https://www.cloudflare.com/learning/ddos/glossary/internet-control-message-protocol-icmp/)
* [Encrypted Client Hello (ECH)](https://developers.cloudflare.com/ssl/edge-certificates/ech/)
* [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)
* [Onion Routing (Tor)](https://developers.cloudflare.com/network/onion-routing/)

Since Regional Services leverages Spectrum in the background, [Spectrum limitations](https://developers.cloudflare.com/spectrum/reference/limitations/) apply.

Regional Services does not apply to [Subrequests](https://developers.cloudflare.com/workers/platform/limits/#subrequests). Regional Services operates on your hostname's IPs. We recommend using [DNSSEC](https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/dnssec/) and/or [DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) to ensure that DNS responses are secure and correct.

## Customer Metadata Boundary

There are certain limitations and caveats when using Customer Metadata Boundary.

Specifically most of the Zone Analytics & Logs UI Tabs will be showing up as empty, when configuring Customer Metadata Boundary to EU only. It is recommended to use the UI [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) instead, or the [HTTP request](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) logs via [Logpush](https://developers.cloudflare.com/logs/logpush/).

To configure Customer Metadata Boundary to EU only, you must disable Log Retention for all zones within your account. Log Retention is a legacy feature of [Logpull](https://developers.cloudflare.com/logs/logpull/).

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
