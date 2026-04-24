---
title: DNSSEC
description: Sign your zone with DNSSEC for DNS security.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/application-security/default-traffic-security/dnssec.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# DNSSEC

DNS Security Extensions (DNSSEC) adds an extra layer of authentication to DNS, ensuring requests are not routed to a spoofed domain.

For additional background on DNSSEC, visit the [Cloudflare Learning Center ↗](https://www.cloudflare.com/learning/dns/dns-security/).

When you [enable DNSSEC](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/dnssec/), Cloudflare signs your zone, publishes your public signing keys, and generates your **DS** record.

Note:

Cloudflare automatically adds **DS** records for domains using Cloudflare Registrar or those using `.ch` and `.cz` top-level domains.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/default-traffic-security/","name":"Default traffic security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/default-traffic-security/dnssec/","name":"DNSSEC"}}]}
```
