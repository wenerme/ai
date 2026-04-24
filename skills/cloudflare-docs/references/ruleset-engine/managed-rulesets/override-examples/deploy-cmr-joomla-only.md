---
title: Enable only Joomla rules
description: Deploy the Cloudflare Managed Ruleset with only Joomla rules enabled.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-joomla-only.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Enable only Joomla rules

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to configure the execution of a managed ruleset and override its behavior. By default, enabled rules perform the actions defined by the managed ruleset issuer. This example uses overrides to ensure that only rules with a specific tag are enabled.

Follow the steps below to configure the execution of a managed ruleset with two overrides for enabling only the rules tagged with `joomla`.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2. [Configure a ruleset override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that disables all rules in the managed ruleset.
3. Configure a tag override that enables only the rules with a given tag.

Tag overrides take precedence over ruleset overrides. Only the rules with the specified tag are enabled, and all other rules are disabled.

## Example 1

This example deploys the Cloudflare Managed Ruleset to a phase with only Joomla rules enabled. The `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

Example: Enable only Joomla rules using category overrides at the zone level

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

                    "categories": [

                        {

                            "category": "joomla",

                            "action": "block",

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

* `"id": "<MANAGED_RULESET_ID>"` adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for the specified zone (`$ZONE_ID`).
* `"enabled": false` defines an override at the ruleset level that disables all rules in the managed ruleset.
* `"categories": [{"category": "joomla", "action": "block", "enabled": true}]` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

Example: Enable only Joomla rules using category overrides at the account level

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

                    "categories": [

                        {

                            "category": "joomla",

                            "action": "block",

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

* `"id": "<MANAGED_RULESET_ID>"` adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for `example.com`.
* `"enabled": false` defines an override at the ruleset level that disables all rules in the managed ruleset.
* `"categories": [{"category": "joomla", "action": "block", "enabled": true}]` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

You can add more than one category override to a rule.

## Example 2

This example adds two overrides to the rule that executes a managed ruleset (`<MANAGED_RULESET_ID>`) in the `http_request_firewall_managed` phase. Note that the `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

Example: Add more than one category override at the zone level

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

                    "categories": [

                        {

                            "category": "joomla",

                            "action": "log",

                            "enabled": true

                        },

                        {

                            "category": "wordpress",

                            "enabled": false

                        }

                    ]

                }

            }

        }

    ]

  }'


```

Explain Code

Example: Add more than one category override at the account level

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

                    "categories": [

                        {

                            "category": "joomla",

                            "action": "log",

                            "enabled": true

                        },

                        {

                            "category": "wordpress",

                            "enabled": false

                        }

                    ]

                }

            }

        }

    ]

  }'


```

Explain Code

The order of the overrides in the ruleset determines if rules in the deployed managed ruleset are enabled or disabled. Overrides placed later in the list take precedence over earlier overrides.

Consider four rules from the managed ruleset in the code above that have different combinations of `category` tags. The following table shows the status of the rules after the overrides.

| Rule in managed ruleset | Tags                   | Rule status after overrides |
| ----------------------- | ---------------------- | --------------------------- |
| ManagedRule1            | drupal, dos            | Disabled                    |
| ManagedRule2            | drupal, dos, joomla    | Enabled                     |
| ManagedRule3            | dos, joomla, wordpress | Disabled                    |
| ManagedRule4            | drupal, wordpress      | Disabled                    |
| ManagedRule5            | (no tags)              | Disabled                    |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/managed-rulesets/override-examples/","name":"Override examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-joomla-only/","name":"Enable only Joomla rules"}}]}
```
