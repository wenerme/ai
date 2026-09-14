---
description: DDoS attack types covered by Cloudflare managed rulesets at layers 3, 4, and 7.
title: Attack coverage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Attack coverage

Last updated Apr 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The [DDoS Attack Protection managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/) provide protection against a variety of DDoS attacks

 across L3/4 (layers 3/4) and L7 of the OSI model. Cloudflare constantly updates these managed rulesets to improve the attack coverage, increase the mitigation consistency, cover new and emerging threats, and ensure cost-efficient mitigations.

[Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/), [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/), and [Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) are available to Magic Transit customers. Advanced TCP Protection provides additional protection against sophisticated TCP-based DDoS attacks. Advanced DNS Protections protects against sophisticated and fully randomized DNS attacks. Programmable Flow Protection mitigates UDP-based attacks by executing a customer-defined program.

As a general guideline, various Cloudflare products operate on different open systems interconnection (OSI) layers and you are protected up to the layer on which your service operates. You can customize the DDoS settings on the layer in which you onboarded. For example, since the CDN/WAF service is a Layer 7 (HTTP/HTTPS) service, Cloudflare provides protection from DDoS attacks on L7 downwards, including L3/4 attacks.

Note

For Magic Transit customers, Cloudflare provides some L7 protection with a L3 service (like the Advanced DNS Protection system that is available for Magic Transit customers. DNS is considered a L7 protocol).

The following table includes a sample of covered attack vectors:

| OSI Layer | Ruleset / Feature | Example of covered DDoS attack vectors |
| --- | --- | --- |
| L3/4 | [Network-layer DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/) | ACK floods<br>BitTorrent reflection attack<br>Carpet Bombing attacks<br>CHARGEN reflection attacks<br>DNS amplification attack<br>DNS Garbage Flood<br>DNS NXDOMAIN flood<br>DNS Query flood<br>DTLS amplification attacks<br>ESP flood<br>GRE floods<br>ICMP flood attack<br>Jenkins amplification attacks<br>Lantronix reflection attacks<br>mDNS DDoS attacks<br>Memcached amplification attacks<br>Mirai and Mirai-variant L3/4 attacks<br>MSSQL reflection attacks<br>NetBios DDoS attacks<br>Out of state TCP attacks<br>Protocol violation attacks<br>QUIC flood attack<br>Quote of the Day (QOTD) reflection attacks<br>RST flood<br>SIP attacks<br>SNMP flood attack<br>SPSS reflection attacks<br>SSDP reflection attacks<br>SYN floods<br>SYN-ACK reflection attack<br>TeamSpeak 3 floods<br>Ubiquity reflection attacks<br>UDP flood attack<br>VxWorks DDoS attacks<br><br>For more DNS protection options, refer to [Getting additional DNS protection](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/#getting-additional-dns-protection). |
| L3/4 | [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) <sup>[1](#user-content-fn-1)</sup> | Fully randomized and spoofed ACK floods, SYN floods, SYN-ACK reflection attacks, and other sophisticated TCP-based DDoS attacks |
| L7 (DNS) | [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) <sup>[1](#user-content-fn-1)</sup> | Sophisticated and fully randomized DNS attacks, including Water Torture attacks, Random-prefix attacks, and DNS laundering attacks. |
| L7 (HTTP/S) | [HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/) | Cache busting attacks<br>Carpet Bombing attacks<br>HTTP Continuation flood<br>HTTP flood attack<br>HTTP/2 MadeYouReset<br>HTTP/2 Rapid Reset<br>HULK attack<br>Known DDoS botnets<br>LOIC attack<br>Mirai and Mirai-variant HTTP attacks<br>Slowloris attack<br>TLS/SSL exhaustion attacks<br>TLS/SSL negotiation attacks<br>WordPress pingback attack<br> |

## Footnotes

1. Available to Magic Transit customers. [↩](#user-content-fnref-1) [↩<sup>2</sup>](#user-content-fnref-1-2)

## Getting additional DNS protection

The Network-layer DDoS Attack Protection managed ruleset provides protection against some types of DNS attacks.

Magic Transit customers have access to [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) Beta. Other customers might consider the following options:

- Use Cloudflare as your authoritative DNS provider ([primary DNS](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [secondary DNS](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/)).
- If you are running your own nameservers, use [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/) to get additional protection against DNS attacks like random prefix attacks.

## Email-based attacks

DDoS Protection covers web and network protocols, including TCP, UDP, DNS, and HTTP/S. It does not cover email protocols such as SMTP, IMAP, or POP3.

For protection against email-borne threats such as phishing and malware, refer to [Email Security](https://developers.cloudflare.com/email-security/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/about/attack-coverage/#page","headline":"DDoS attack coverage · Cloudflare DDoS Protection docs","description":"DDoS attack types covered by Cloudflare managed rulesets at layers 3, 4, and 7.","url":"https://developers.cloudflare.com/ddos-protection/about/attack-coverage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
