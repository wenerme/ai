---
title: Control domain access
description: Manage domain access with IP rules.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/surge-readiness/security/control-domain-access.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Control domain access

[IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) specify an action based on the origin of your user across a single domain or all of the domains in your account.

IP Access Rules can be applied based on:

* IPv4 address or range: Specified in CIDR notation as `/16` or `/24`
* IPv6 address or range: Specified in CIDR notation as `/32`, `/48`, `/64`
* ASN
* Country or the Tor network

Note

We recommend locking down your origin with an Access Control List (ACL) which only allows [Cloudflare IPs ↗](http://www.cloudflare.com/ips).

Actions:

* Block: Ensures that an IP address will never be allowed to access your site.
* Non-Interactive Challenge: Visitors will be shown a non-interactive challenge before allowed access.
* Interactive Challenge: Visitors will be shown an interactive challenge before allowed access.
* Allowlist: Ensures that an IP address will never be blocked from accessing your site. This supersedes any Cloudflare security profile.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/control-domain-access/","name":"Control domain access"}}]}
```
