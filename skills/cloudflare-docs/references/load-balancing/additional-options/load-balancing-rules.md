---
title: Custom load balancing rules
description: Customize load balancing behavior with custom rules.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/additional-options/load-balancing-rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Custom load balancing rules

Custom load balancing rules let you customize the behavior of your load balancer based on the characteristics of a request.

For example, you can use URL-based routing, or create a rule that selects a pool based on the URI path of an HTTP request.

## How custom rules work

As with [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), each load balancing custom rule is a combination of two elements: an [expression](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/) and an [action](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/actions/). Expressions define the criteria for an HTTP request to trigger an action. The action tells Cloudflare how to handle the request.

You can [create Load Balancing rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/create-rules/) whenever you create or edit a load balancer in **Load Balancing**.

When building expressions for Load Balancing rules, refer to [Supported fields and operators](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/) for definitions and usage.

## Availability

By default, non-Enterprise customers have **one** Load Balancing rule **per load balancer hostname**. For more rules, upgrade to [Enterprise ↗](https://www.cloudflare.com/enterprise/).

## Limitations

At the moment, you cannot use Load Balancing rules with [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/about/load-balancer/).

Custom load balancing rules are incompatible with [Geo steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/). As a result, any custom rule applied to Geo-steered load balancers will not function as expected.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/additional-options/","name":"Additional configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/additional-options/load-balancing-rules/","name":"Custom load balancing rules"}}]}
```
