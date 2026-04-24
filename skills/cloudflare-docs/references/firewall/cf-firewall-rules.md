---
title: About
description: Cloudflare Firewall Rules is a flexible and intuitive framework for filtering HTTP requests. It gives you fine-grained control over which requests reach your applications, proactively inspecting incoming site traffic and automatically responding to threats.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/cf-firewall-rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# About

Cloudflare Firewall Rules is a flexible and intuitive framework for filtering HTTP requests. It gives you fine-grained control over which requests reach your applications, proactively inspecting incoming site traffic and automatically responding to threats.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

In a firewall rule you define an [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that tells Cloudflare what to look for in a request, and specify the appropriate [action](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/) to take when those conditions are met. Expressions can reference [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) \- groups of IP addresses that you can reference collectively by name.

To write firewall rule expressions, use the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/), a powerful expression language inspired in the Wireshark Display Filter language.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/cf-firewall-rules/","name":"About"}}]}
```
