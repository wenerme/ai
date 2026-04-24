---
title: Override a managed ruleset
description: Customize the behavior of managed rulesets with overrides.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/managed-rulesets/override-managed-ruleset.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Override a managed ruleset

To customize the behavior of a managed ruleset via API, override the ruleset at deployment. When you override a ruleset you specify changes to be executed on top of the default configuration. These changes take precedence over the ruleset's default behavior.

For example, to test a managed ruleset before enforcing it, consider executing the ruleset with all rules set to `log` instead of their default actions. To do this, override the configured behavior of the managed ruleset at the ruleset level, so that each rule uses the `log` action.

If you are using Terraform, refer to the following pages:

* [WAF Managed Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/#configure-overrides)
* [DDoS managed rulesets configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/ddos-managed-rulesets/)

To define overrides in the Cloudflare dashboard, refer to the following resources:

* [Configure a WAF managed ruleset in the dashboard](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset)
* [Configure HTTP DDoS Attack Protection in the dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/)
* [Configure Network-layer DDoS Attack Protection in the dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/)

## Work with overrides

You can override a ruleset at three levels:

* **Ruleset overrides** apply to all rules in the executed ruleset.
* **Tag overrides** apply to all rules with a specific tag. For example, use a tag override to customize the Cloudflare Managed Ruleset so all rules with the `wordpress` tag are set to _Block_. If multiple tags have overrides and if a given rule has more than one of these tags, the tag overrides order determines the behavior. For rules tagged with multiple overridden tags, the last tag's overrides apply.
* **Rule overrides** apply to specific rules in a managed ruleset, referenced by their Rule ID.

Specific overrides take precedence over more general ones, and rule overrides take precedence over tag overrides, which take precedence over ruleset overrides.

Important

Ruleset overrides and tag overrides apply to both existing and _future_ rules in the managed ruleset. If you want to override existing rules only, you must use rule overrides.

To apply an override for a managed ruleset:

1. Use one of the [update ruleset operations](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) to update your phase entry point ruleset.
2. Specify the `overrides` in the `action_parameters` of the rule that executes your managed ruleset.

```

"action_parameters": {

  "id": "<RULESET_ID>",

  "overrides": {

    // ruleset overrides

    "property-to-modify": "value",

    "property-to-modify": "value",

    // tag overrides

    "categories": [

      {

        "category": "<TAG_NAME>",

        "property-to-modify": "value",

        "property-to-modify": "value"

      }

    ],

    // rule overrides

    "rules": [

      {

        "id": "<RULE_ID>",

        "property-to-modify": "value",

        "property-to-modify": "value"

      }

    ]

  }

}


```

Explain Code

You can override the following rule properties:

* `"action"`
* `"enabled"`

Some managed rulesets may have additional override requirements, or they may allow you to override other rule properties. Check each Cloudflare product’s documentation for details.

Important

It is **not recommended** that you enable all the rules in a managed ruleset at the account level using an override, since this change could affect all the zones in your account. Some rules are disabled by default, since they could eventually affect legitimate traffic, and should not be enabled across zones without previous consideration.

## Examples

### Rule override example

The following `PUT` request adds a rule that executes a managed ruleset in the `http_request_firewall_managed` phase at the zone level, and defines a rule override to enable rule `<RULE_ID>` and set its action to `log`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Response Compression Write`
* `Config Settings Write`
* `Dynamic URL Redirects Write`
* `Cache Settings Write`
* `Custom Errors Write`
* `Origin Write`
* `Managed headers Write`
* `Zone Transform Rules Write`
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Write`
* `Sanitize Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Bot Management Write`
* `Zone WAF Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Write`

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Deploy managed ruleset, enabling a specific rule with log action",

    "rules": [

        {

            "action": "execute",

            "expression": "true",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID>",

                "overrides": {

                    "rules": [

                        {

                            "id": "<RULE_ID>",

                            "enabled": true,

                            "action": "log"

                        }

                    ]

                }

            }

        }

    ]

  }'


```

Explain Code

### Ruleset override example

The following `PUT` request adds a rule that executes a managed ruleset in the `http_request_firewall_managed` phase at the account level, and defines a ruleset override that sets the action to `log` for all (enabled) rules.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`

Update an account entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Deploy managed ruleset for example.com, overriding the rules action to log",

    "rules": [

        {

            "action": "execute",

            "expression": "(cf.zone.name eq \"example.com\") and cf.zone.plan eq \"ENT\"",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID>",

                "overrides": {

                    "action": "log"

                }

            }

        }

    ]

  }'


```

Explain Code

## More resources

For additional examples of configuring overrides via API, refer to [Override examples](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/managed-rulesets/override-managed-ruleset/","name":"Override a managed ruleset"}}]}
```
