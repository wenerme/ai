---
title: Set WordPress rules to Block
description: Deploy the Cloudflare Managed Ruleset with WordPress rules set to Block.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ WordPress ](https://developers.cloudflare.com/search/?tags=WordPress) 

# Set WordPress rules to Block

Follow the steps below to create a rule that executes a managed ruleset and defines an override for rules with a specific tag.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2. [Configure a tag override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that sets a specified action for all rules with a given tag.

## Zone-level example

This example uses the [Update a zone entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to perform the following two steps in a single `PUT` request:

* Set the list of rules in the `http_request_firewall_managed` phase entry point ruleset to a single rule that executes the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/).
* Override rules with the `wordpress` tag to set the action to `block`. All other rules use the default action provided by the ruleset issuer.

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

    "rules": [

        {

            "action": "execute",

            "expression": "true",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID>",

                "overrides": {

                    "categories": [

                        {

                            "category": "wordpress",

                            "action": "block"

                        }

                    ]

                }

            }

        }

    ]

  }'


```

## Account-level example

This example uses the [Update an account entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to perform the following two steps in a single `PUT` request:

* Set the list of rules in the `http_request_firewall_managed` phase entry point ruleset to a single rule that executes the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) for the zone `example.com`.
* Override rules with the `wordpress` tag to set the action to `block`. All other rules use the default action provided by the ruleset issuer.

Note

At the account level, the rule expression of an `execute` rule must end with `and cf.zone.plan eq "ENT"` so that it only applies to zones on an Enterprise plan.

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

    "rules": [

        {

            "action": "execute",

            "expression": "cf.zone.name eq \"example.com\" and cf.zone.plan eq \"ENT\"",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID>",

                "overrides": {

                    "categories": [

                        {

                            "category": "wordpress",

                            "action": "block"

                        }

                    ]

                }

            }

        }

    ]

  }'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/managed-rulesets/override-examples/","name":"Override examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-wordpress-block/","name":"Set WordPress rules to Block"}}]}
```
