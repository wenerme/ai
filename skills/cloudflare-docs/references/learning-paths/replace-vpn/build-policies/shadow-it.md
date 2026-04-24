---
title: Shadow IT discovery
description: Discover unapproved applications with Shadow IT.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/replace-vpn/build-policies/shadow-it.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Shadow IT discovery

[Shadow IT ↗](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/) refers to the unsanctioned use of software, hardware, or other systems and services within an organization, often without the knowledge of that organization's information technology (IT) department.

After you have built your initial set of application policies and have users using Cloudflare Zero Trust as a replacement for your VPN, review your [Shadow IT discovery report](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/#private-network-origins) to determine what kind of services are seeing the most traffic on your network. In almost all cases, businesses very quickly find unknown, usually widely accessed resources. As you find new (and sometimes surprising) services within that list, modify your Gateway policies to allow or block these services.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/build-policies/","name":"Build secure access policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/build-policies/shadow-it/","name":"Shadow IT discovery"}}]}
```
