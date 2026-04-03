---
title: Allow traffic from specific countries only
description: This example custom rule blocks requests based on country code using the ip.src.country field, only allowing requests from two countries: United States and Mexico.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/custom-rules/use-cases/allow-traffic-from-specific-countries.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Allow traffic from specific countries only

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests based on country code using the [ip.src.country](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.country/) field, only allowing requests from two countries: United States and Mexico.

* **When incoming requests match**:  
| Field   | Operator  | Value                 |  
| ------- | --------- | --------------------- |  
| Country | is not in | Mexico, United States |  
If you are using the expression editor:  
`(not ip.src.country in {"US" "MX"})`
* **Then take action**: _Block_

## Other resources

* [Use case: Block traffic by geographical location](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-by-geographical-location/)
* [Use case: Block traffic from specific countries](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-traffic-from-specific-countries/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/","name":"Allow traffic from specific countries only"}}]}
```
