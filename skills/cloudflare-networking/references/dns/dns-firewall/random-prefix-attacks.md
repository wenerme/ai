---
description: Block random prefix DNS queries that target your upstream authoritative nameservers.
title: Random prefix attack mitigation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Random prefix attack mitigation

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Random prefix attacks are when someone sends a lot of traffic to subdomains that are highly unlikely to exist (`12345.example.com`, `abcdefg.example.com`), but are still associated with your main domain (`example.com`).

Usually, a DNS query to each random subdomain (or prefix) is not repeated, so it cannot be cached by resolvers or any other proxies and always reaches the authoritative nameservers. Rate limiting or blocking queries based on source IP can introduce a high amount of false positives, since random prefix attacks commonly are conducted via public resolvers. This makes these attacks particularly effective and hard to mitigate.

As part of [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/), Cloudflare can protect your upstream authoritative nameservers from these attacks by blocking DNS queries that are determined to be part of an attack and thus preventing them from reaching your authoritative nameservers, where they could cause harm by overloading resources. This protection is an opt-in feature because of the potential for false positives.

## Resources

* [Background information](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/)
* [Setup](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/)

## Limitations

To reduce the impact of false positives, Cloudflare does not block entire [public suffixes ↗](https://publicsuffix.org/) (such as `com`). However, it can block domains directly under them (such as `example.com`).

In addition, the default setting for the automatic mitigation ensures that it will only be deployed if upstream authoritative nameservers are determined to be unresponsive (and likely overloaded by an attack). This means that, as long as your authoritative nameservers can handle the traffic during a random prefix attack, Cloudflare will not actively block queries in order to avoid false positives. This setting is called `"only_when_upstream_unhealthy"` and is always true if not explicitly disabled during [Setup](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/).

Because Cloudflare does not know which domains and subdomains exist as DNS records on an upstream nameserver, this feature takes a best effort approach by blocking DNS queries to affected subdomains in order to allow upstream nameservers to keep responding to DNS queries to unaffected subdomains.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/#page","headline":"Random prefix attack mitigation · Cloudflare DNS docs","description":"Block random prefix DNS queries that target your upstream authoritative nameservers.","url":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
