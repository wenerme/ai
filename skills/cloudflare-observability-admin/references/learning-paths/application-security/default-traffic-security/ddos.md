---
description: Understand automatic DDoS attack mitigation.
title: DDoS Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# DDoS Protection

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/ddos/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare automatically detects and mitigates DDoS attacks using its [Autonomous Edge](https://developers.cloudflare.com/ddos-protection/about/components/#autonomous-edge), which is always-on. `Advanced` protections are reserved for Magic Transit customers.

| OSI Layer | Ruleset / Feature | Example of covered DDoS attack vectors |
| --- | --- | --- |
| L3/4 | [Network-layer DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/) | ACK floods<br>BitTorrent reflection attack<br>Carpet Bombing attacks<br>CHARGEN reflection attacks<br>DNS amplification attack<br>DNS Garbage Flood<br>DNS NXDOMAIN flood<br>DNS Query flood<br>DTLS amplification attacks<br>ESP flood<br>GRE floods<br>ICMP flood attack<br>Jenkins amplification attacks<br>Lantronix reflection attacks<br>mDNS DDoS attacks<br>Memcached amplification attacks<br>Mirai and Mirai-variant L3/4 attacks<br>MSSQL reflection attacks<br>NetBios DDoS attacks<br>Out of state TCP attacks<br>Protocol violation attacks<br>QUIC flood attack<br>Quote of the Day (QOTD) reflection attacks<br>RST flood<br>SIP attacks<br>SNMP flood attack<br>SPSS reflection attacks<br>SSDP reflection attacks<br>SYN floods<br>SYN-ACK reflection attack<br>TeamSpeak 3 floods<br>Ubiquity reflection attacks<br>UDP flood attack<br>VxWorks DDoS attacks<br><br>For more DNS protection options, refer to [Getting additional DNS protection](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/#getting-additional-dns-protection). |
| L3/4 | [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) <sup>[1](#user-content-fn-1)</sup> | Fully randomized and spoofed ACK floods, SYN floods, SYN-ACK reflection attacks, and other sophisticated TCP-based DDoS attacks |
| L7 (DNS) | [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) <sup>[1](#user-content-fn-1)</sup> | Sophisticated and fully randomized DNS attacks, including Water Torture attacks, Random-prefix attacks, and DNS laundering attacks. |
| L7 (HTTP/S) | [HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/) | Cache busting attacks<br>Carpet Bombing attacks<br>HTTP Continuation flood<br>HTTP flood attack<br>HTTP/2 MadeYouReset<br>HTTP/2 Rapid Reset<br>HULK attack<br>Known DDoS botnets<br>LOIC attack<br>Mirai and Mirai-variant HTTP attacks<br>Slowloris attack<br>TLS/SSL exhaustion attacks<br>TLS/SSL negotiation attacks<br>WordPress pingback attack<br> |

## Footnotes

1. Available to Magic Transit customers. [↩](#user-content-fnref-1) [↩<sup>2</sup>](#user-content-fnref-1-2)

Refer to the learning path [Prevent DDoS attacks](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/) to dive deeper into this subject.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/ddos/#page","headline":"DDoS Protection · Cloudflare Learning Paths","description":"Understand automatic DDoS attack mitigation.","url":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/ddos/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
