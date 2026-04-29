---
title: Enable only selected rules
description: Deploy a managed ruleset with only selected rules enabled.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable only selected rules

Use a ruleset override and a rule override in a phase entry point ruleset to execute only selected rules in a managed ruleset.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2. [Configure a ruleset override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that disables all rules in the managed ruleset.
3. [Configure a rule override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) to set an action for the rules you want to execute.

## Zone-level example

The following `PUT` request uses the [Update a zone entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to define a configuration that executes only two rules from a managed ruleset in the `http_request_firewall_managed` phase.

In this example:

* `"id": "<MANAGED_RULESET_ID>"` defines the managed ruleset to execute for requests in the specified zone (`$ZONE_ID`).
* `"enabled": false` defines an override at the ruleset level to disable all rules in the managed ruleset.
* `"rules": [{"id": "<RULE_ID_1>", "action": "block", "enabled": true}, {"id": "<RULE_ID_2>", "action": "log", "enabled": true}]` defines a list of overrides at the rule level to enable two individual rules.

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

                    "enabled": false,

                    "rules": [

                        {

                            "id": "<RULE_ID_1>",

                            "action": "block",

                            "enabled": true

                        },

                        {

                            "id": "<RULE_ID_2>",

                            "action": "log",

                            "enabled": true

                        }

                    ]

                }

            }

        }

    ]

  }'


```

Explain Code

## Account-level example

The following `PUT` request uses the [Update an account entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to define a configuration that executes only two rules from a managed ruleset in the `http_request_firewall_managed` phase.

In this example:

* `"id": "<MANAGED_RULESET_ID>"` defines the managed ruleset to execute for requests addressed to `example.com`.
* `"enabled": false` defines an override at the ruleset level to disable all rules in the managed ruleset.
* `"rules": [{"id": "<RULE_ID_1>", "action": "block", "enabled": true}, {"id": "<RULE_ID_2>", "action": "log", "enabled": true}]` defines a list of overrides at the rule level to enable two individual rules.

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

                    "enabled": false,

                    "rules": [

                        {

                            "id": "<RULE_ID_1>",

                            "action": "block",

                            "enabled": true

                        },

                        {

                            "id": "<RULE_ID_2>",

                            "action": "log",

                            "enabled": true

                        }

                    ]

                }

            }

        }

    ]

  }'


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/managed-rulesets/override-examples/","name":"Override examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/managed-rulesets/override-examples/enable-selected-rules/","name":"Enable only selected rules"}}]}
```
