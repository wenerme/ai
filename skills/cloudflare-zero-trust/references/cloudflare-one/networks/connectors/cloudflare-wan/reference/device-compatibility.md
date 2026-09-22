---
description: Reference information for Device compatibility in Zero Trust networking.
title: Device compatibility
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Device compatibility

Last updated Aug 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/device-compatibility/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare WAN (formerly Magic WAN) is compatible with any device that supports IPsec with the [supported configuration parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/gre-ipsec-tunnels/#supported-configuration-parameters) or supports GRE.

The matrix below includes example devices and links to the integration guides.

| Appliance | GRE tunnel | IPsec tunnel |
| --- | --- | --- |
| [Aruba EdgeConnect](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aruba-edgeconnect/) | ✅ | ✅ |
| Cisco ASA | Compatibility on roadmap | Specifications compatible<sup>[1](#user-content-fn-1)</sup> |
| [Cisco IOS XE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/cisco-ios-xe/) | ✅ | ✅ |
| [Cisco Meraki MX (static routing)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/cisco-meraki-static/) | - | ✅ |
| [Cisco SD-WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/viptela/) | ✅ | ✅ |
| [Fortinet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/fortinet/) | Specifications compatible<sup>[1](#user-content-fn-1)</sup> | ✅ |
| [Furukawa Electric FITELnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/fitelnet/) | - | ✅ |
| [HPE Juniper Networking SRX Series Firewalls](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/juniper/) | Specifications compatible<sup>[1](#user-content-fn-1)</sup> | ✅ |
| [Palo Alto Networks Next-Generation Firewall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/palo-alto/) | Specifications compatible<sup>[1](#user-content-fn-1)</sup> | ✅ |
| [pfSense](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/pfsense/) | ✅ | ✅ |
| Prisma SD-WAN (Palo Alto) | Specifications compatible<sup>[1](#user-content-fn-1)</sup> | Specifications compatible<sup>[1](#user-content-fn-1)</sup> |
| Riverbed | Specifications compatible<sup>[1](#user-content-fn-1)</sup> | Specifications compatible<sup>[1](#user-content-fn-1)</sup> |
| [SonicWall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sonicwall/) | - | ✅ |
| [Sophos Firewall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/sophos-firewall/) | ✅ | ✅ |
| [strongSwan](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/strongswan/) | - | ✅ |
| [Ubiquiti](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/ubiquiti/) | - | ✅ |
| [Velocloud](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/velocloud/) | - | ✅ |
| Versa | Specifications compatible<sup>[1](#user-content-fn-1)</sup> | Compatibility on roadmap |
| [VyOS](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/vyos/) | ✅ | ✅ |
| [Yamaha RTX Router](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/yamaha/) | - | ✅ |

| VPN | GRE tunnel | IPsec tunnel |
| --- | --- | --- |
| [Alibaba Cloud VPN Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/alibaba-cloud/) | - | ✅ |
| [Amazon AWS Transit Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/aws/) | - | ✅ |
| [Azure VPN Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/azure/) | - | ✅ |
| [GCP Cloud VPN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/google/) | - | ✅ |
| [Oracle Cloud](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/oracle/) | - | ✅ |

## Footnotes

1. Specifications compatible per vendor documentation [↩](#user-content-fnref-1) [↩<sup>2</sup>](#user-content-fnref-1-2) [↩<sup>3</sup>](#user-content-fnref-1-3) [↩<sup>4</sup>](#user-content-fnref-1-4) [↩<sup>5</sup>](#user-content-fnref-1-5) [↩<sup>6</sup>](#user-content-fnref-1-6) [↩<sup>7</sup>](#user-content-fnref-1-7) [↩<sup>8</sup>](#user-content-fnref-1-8) [↩<sup>9</sup>](#user-content-fnref-1-9)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/device-compatibility/#page","headline":"Device compatibility","description":"Reference information for Device compatibility in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/device-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPsec"]}
```
