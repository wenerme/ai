---
title: Update custom rules for customers or partners
description: You may want to adjust your custom rules to increase access by customers or partners.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/custom-rules/use-cases/update-rules-customers-partners.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Update custom rules for customers or partners

You may want to adjust your [custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) to increase access by customers or partners.

Potential examples include:

* Removing rate limiting for an API
* Sharing brand assets and marketing materials

Warning

The example custom rules in this page can bypass Cloudflare's security features and are generally not recommended. Use with caution.

## Use ASN in custom rules

If a customer or partner is large enough, you could set up a custom rule based on an [autonomous system number (ASN) ↗](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/).

### Allow traffic by ASN

This example uses:

* The [ip.src.asnum](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.asnum/) field to specify the general region.
* The [cf.bot\_management.score](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.score/) field to ensure partner traffic does not come from bots.

Example custom rule:

* **When incoming requests match**:  
| Field     | Operator     | Value | Logic |  
| --------- | ------------ | ----- | ----- |  
| AS Num    | equals       | 64496 | And   |  
| Bot Score | greater than | 30    |       |  
If you are using the expression editor:  
`(ip.src.asnum eq 64496 and cf.bot_management.score gt 30)`
* **Then take action**: _Skip:_  
   * _All remaining custom rules_

Note

Access to [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) requires a Cloudflare Enterprise plan with Bot Management.

### Adjust rules by ASN

This example custom rule uses:

* The [ip.src.asnum](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.asnum/) field to specify the general region.
* The [cf.bot\_management.score](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.score/) field to check if the request comes from a human.

If a request meets these criteria, the custom rule will skip [User Agent Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/) rules.

* **When incoming requests match**:  
| Field     | Operator     | Value | Logic |  
| --------- | ------------ | ----- | ----- |  
| AS Num    | equals       | 64496 | And   |  
| Bot Score | greater than | 50    |       |  
If you are using the expression editor:  
`(ip.src.asnum eq 64496 and cf.bot_management.score gt 50)`
* **Then take action**: _Skip:_  
   * _User Agent Blocking_

## Use IP addresses in custom rules

For smaller organizations, you could set up custom rules based on IP addresses.

### Allow traffic by IP address

This example:

* Specifies the source IP address and the host.
* Uses the [cf.bot\_management.score](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.score/) field to ensure requests are not high-risk traffic.

Example custom rule:

* **When incoming requests match**:  
| Field             | Operator     | Value       | Logic |  
| ----------------- | ------------ | ----------- | ----- |  
| IP Source Address | equals       | 203.0.113.1 | And   |  
| Hostname          | equals       | example.com | And   |  
| Bot Score         | greater than | 30          |       |  
If you are using the expression editor:  
`(ip.src eq 203.0.113.1 and http.host eq "example.com" and cf.bot_management.score gt 30)`
* **Then take action**: _Skip:_  
   * _All remaining custom rules_

### Adjust rules by IP address

This example custom rule specifies the source IP address and the host.

If a request meets these criteria, the custom rule will skip [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **When incoming requests match**:  
| Field             | Operator | Value       | Logic |  
| ----------------- | -------- | ----------- | ----- |  
| IP Source Address | equals   | 203.0.113.1 | And   |  
| Hostname          | equals   | example.com |       |  
If you are using the expression editor:  
`(ip.src eq 203.0.113.1 and http.host eq "example.com")`
* **Then take action**: _Skip:_  
   * _All remaining custom rules_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/update-rules-customers-partners/","name":"Update custom rules for customers or partners"}}]}
```
