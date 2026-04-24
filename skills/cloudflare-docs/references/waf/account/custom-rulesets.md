---
title: Custom rulesets (account level)
description: Create custom rulesets at the account level and deploy them to multiple zones.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/account/custom-rulesets/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Custom rulesets (account level)

Note

Custom rulesets at the account level require an Enterprise plan.

Custom rulesets are collections of custom rules that you can deploy at the account or [zone level](https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/).

Like [custom rules](https://developers.cloudflare.com/waf/custom-rules/) at the zone level, custom rulesets allow you to control incoming traffic by filtering requests.

Account-level custom rulesets allow you to define a set of custom rules once and apply them across multiple Enterprise zones in your account. Instead of configuring each zone individually, you create a ruleset at the account level and use expressions to control which zones and traffic it applies to.

At the zone level, all customers can create and deploy custom rulesets. Custom rulesets at the account level require an Enterprise plan. For more details, refer to [Availability](https://developers.cloudflare.com/waf/custom-rules/#availability).

## Next steps

Refer to the following pages for more information on working with custom rulesets:

* [Work with custom rulesets in the dashboard](https://developers.cloudflare.com/waf/account/custom-rulesets/create-dashboard/)
* [Work with custom rulesets using the API](https://developers.cloudflare.com/waf/account/custom-rulesets/create-api/)

For Terraform examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/#create-and-deploy-a-custom-ruleset).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/account/","name":"Account-level WAF configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/account/custom-rulesets/","name":"Custom rulesets (account level)"}}]}
```
