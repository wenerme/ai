---
title: Create a rule via API
description: Create cache rules using the Rulesets API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Create a rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create a cache rule via API. To configure Cloudflare’s API refer to the [API documentation](https://developers.cloudflare.com/fundamentals/api/get-started/).

## Basic rule settings

When creating a cache rule via API, make sure you:

* Set the rule action to `set_cache_settings`.
* Define the parameters in the `action_parameters` field according to the [settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/) you wish to override for matching requests.
* Deploy the rule to the `http_request_cache_settings` phase entry point ruleset.

## Procedure

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) method to obtain the list of rules already present in the `http_request_cache_settings` phase entry point ruleset.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:  
   * kind: `zone`  
   * phase: `http_request_cache_settings`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add a cache rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.
4. (Optional) To update an existing cache rule, use the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. For an example, refer to the section below.

## Example requests

These examples are setting all the Cache Rules of a zone to a single rule, since using these examples directly will cause any existing rules to be deleted.

Example: Cache everything for example.com

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "(http.host eq \"example.com\")",

            "description": "cache everything for example.com",

            "action": "set_cache_settings",

            "action_parameters": {

                "cache": true

            }

        }

    ]

  }'


```

Explain Code

Example: Extend read timeout for Android clients

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "(http.user_agent contains \"Android\")",

            "description": "extend read timeout for android clients",

            "action": "set_cache_settings",

            "action_parameters": {

                "cache": true,

                "read_timeout": 300

            }

        }

    ]

  }'


```

Explain Code

Example: Disable Cache Reserve for frequently updated assets

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "(starts_with(http.request.uri, \"/feed/\"))",

            "description": "disable cache reserve for frequently updated assets",

            "action": "set_cache_settings",

            "action_parameters": {

                "cache": true,

                "cache_reserve": {

                    "enabled": false

                }

            }

        }

    ]

  }'


```

Explain Code

Example: Turn off default cache TTLs

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "(http.host eq \"example.com\")",

            "description": "turn off default cache ttls",

            "action": "set_cache_settings",

            "action_parameters": {

                "cache": true,

                "edge_ttl": {

                    "mode": "bypass_by_default"

                }

            }

        }

    ]

  }'


```

Explain Code

Example: Update the position of an existing rule

Update a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "expression": "(http.host eq \"example.com\")",

    "description": "cache everything for example.com",

    "action": "set_cache_settings",

    "action_parameters": {

        "cache": true

    },

    "enabled": true,

    "position": {

        "before": "da5e8e506c8e7877fe06cdf4c41add54"

    }

  }'


```

Explain Code

## Required API token permissions

The API token used in API requests to manage Cache Rules must have the following permissions:

* _Zone_ \> _Cache Rules_ \> _Edit_
* _Account Rulesets_ \> _Edit_
* _Account Filter Lists_ \> _Edit_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/create-api/","name":"Create a rule via API"}}]}
```
