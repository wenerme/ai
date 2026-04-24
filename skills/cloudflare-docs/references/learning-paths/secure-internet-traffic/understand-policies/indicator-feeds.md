---
title: Use indicator feeds to improve security policies
description: Enhance policies with threat indicator feeds.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-internet-traffic/understand-policies/indicator-feeds.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Use indicator feeds to improve security policies

When building DNS, network, or HTTP policies to block malicious activity for your organization, you can use external indicator feeds supplied by Cloudflare and other third-party providers.

## Subscribe to indicator feeds

Cloudflare threat intelligence data consists of a data exchange between providers and subscribers.

A provider is an organization that has a set of data that they are interested in sharing with other Cloudflare organizations. Any organization can be a provider. Examples of current providers are Government Cyber Defense groups.

Subscribers can be any Cloudflare customer that wants to secure their environment further by creating rules based on provider datasets. Subscribers must be authorized by a provider. Authorization is granted using the [Grant permission to indicator feed endpoint](https://developers.cloudflare.com/api/resources/intel/subresources/indicator%5Ffeeds/subresources/permissions/methods/create/).

To subscribe to an indicator feed, contact your account team. For more information, refer to [Custom Indicator Feeds](https://developers.cloudflare.com/security-center/indicator-feeds/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/understand-policies/","name":"Understand and streamline policy creation"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/understand-policies/indicator-feeds/","name":"Use indicator feeds to improve security policies"}}]}
```
