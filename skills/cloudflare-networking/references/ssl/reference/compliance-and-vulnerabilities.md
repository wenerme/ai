---
description: PCI compliance status and TLS vulnerability mitigations.
title: PCI compliance and vulnerabilities mitigation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

#  PCI compliance and vulnerabilities mitigation

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Both [TLS 1.0 and TLS 1.1](https://developers.cloudflare.com/ssl/reference/protocols/) are insufficient for protecting information due to known vulnerabilities. Specifically for Cloudflare customers, the primary impact of PCI is that TLS 1.0 and TLS 1.1 are insufficient to secure payment card related traffic.

PCI standards recommend using TLS 1.2 or higher. Refer to [Compliance standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/) for a list of recommended cipher suites.

Cloudflare also [implements mitigations against known vulnerabilities](#known-vulnerabilities-mitigations) for TLS 1.0 and 1.1.

## Set Minimum TLS Version to 1.2

To configure your Cloudflare domain to only allow connections using TLS 1.2 or newer protocols:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[ Go to **Edge Certificates** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Minimum TLS Version**, select **TLS 1.2** or higher.

Refer to [Minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) for more information about this setting and other setup options.

## Known vulnerabilities mitigations

There are several mitigations Cloudflare performs against known vulnerabilities for TLS versions prior to 1.2\. For example, Cloudflare does not support:

* Header compression in TLS
* Header compression in SPDY 3.1
* RC4
* SSL 3.0
* Renegotiation with clients
* DHE ciphersuites
* Export-grade ciphers

Cloudflare mitigations protect against several attacks:

* CRIME
* BREACH
* POODLE
* RC4 Cryptographic Weaknesses
* SSL Renegotiation Attack
* Protocol Downgrade Attacks
* FREAK
* LogJam
* 3DES is disabled entirely for TLS 1.1 and 1.2 and Cloudflare implements mitigations for TLS 1.0

Cloudflare provides additional mitigations for:

* Heartbleed
* Lucky Thirteen
* CCS injection vulnerability

Cloudflare has patched all servers against these vulnerabilities. Also, the [Cloudflare Web Application Firewall](https://developers.cloudflare.com/waf/) has managed rules that mitigate several of these vulnerabilities including Heartbleed and ShellShock.

### Return of Bleichenbacher's Oracle Threat (ROBOT)

Security scans that note the presence of ROBOT while on Cloudflare are a false positive. Cloudflare checks padding in real time and swaps to a random session key if the padding is incorrect.

### Sweet32 (CVE-2016-2183)

A vulnerability in the use of the Triple DES (3DES) encryption algorithm in the Transport Layer Security (TLS) protocol. Sweet32 is currently a proof of concept attack, there are no known examples of this in the wild. Cloudflare has manually mitigated the vulnerability for TLS 1.0 in the following manner:

* The attacker must collect 32GB of data from a single TLS session.
* Cloudflare forces new TLS 1.0 session keys on the affected 3DES cipher well before 32GB of data is collected.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/#page","headline":"PCI compliance and vulnerabilities mitigation · Cloudflare SSL/TLS docs","description":"PCI compliance status and TLS vulnerability mitigations.","url":"https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
