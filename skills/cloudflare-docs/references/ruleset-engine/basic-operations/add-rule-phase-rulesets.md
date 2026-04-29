---
title: Add rules to phase entry point rulesets
description: Add rules to phase entry point rulesets using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add rules to phase entry point rulesets

A [phase entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) contains an ordered list of rules that run in that phase. A rule in an entry point ruleset can execute a different ruleset. You can have entry point rulesets for each phase at the account level and at the zone level.

To add one or more rules to a phase entry point ruleset, use one of the [ruleset update operations](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) of the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/). When you add a rule to an entry point ruleset, the entry point ruleset is created automatically if it does not exist. This API method requires that you include in the request all rules you want to keep in the ruleset, or else they will be removed.

If you are adding a single rule to a ruleset, consider using one of the [rule creation operations](https://developers.cloudflare.com/ruleset-engine/rulesets-api/add-rule/) instead. In this case, the request only includes the definition of the new rule.

Creating an entry point ruleset

Instead of relying on the automatic creation of an entry point ruleset, you can also create this ruleset explicitly using one of the [ruleset creation operations](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create/).

## Example: Set the rules of a phase entry point ruleset at the zone level

The following example sets the rules of a phase entry point ruleset at the zone level for the `http_request_firewall_managed` phase using the [Update a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/update/) operation.

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

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID_1>"

            },

            "expression": "true"

        },

        {

            "action": "execute",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID_2>"

            },

            "expression": "true"

        }

    ]

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Default",

    "description": "",

    "kind": "zone",

    "version": "1",

    "rules": [

      {

        "id": "<RULE_ID_1>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID_1>"

        },

        "last_updated": "2021-06-17T15:42:37.917815Z"

      },

      {

        "id": "<RULE_ID_2>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID_2>"

        },

        "last_updated": "2021-06-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2021-06-17T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Example: Add a single rule to a phase entry point ruleset at the zone level

The following example adds a single rule to a phase entry point ruleset (with ID `$RULESET_ID`) at the zone level using the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation.

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

Create a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "execute",

    "action_parameters": {

        "id": "<MANAGED_RULESET_ID>"

    },

    "expression": "true"

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point ruleset",

    "description": "",

    "kind": "root",

    "version": "2",

    "rules": [

      {

        "id": "<EXISTING_RULE_ID>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<ANOTHER_MANAGED_RULESET_ID>"

        },

        "last_updated": "2021-03-17T15:42:37.917815Z"

      },

      {

        "id": "<NEW_RULE_ID>",

        "version": "1",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>"

        },

        "last_updated": "2021-06-30T15:42:37.917815Z"

      }

    ],

    "last_updated": "2021-06-30T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/basic-operations/","name":"Basic API operations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/basic-operations/add-rule-phase-rulesets/","name":"Add rules to phase entry point rulesets"}}]}
```
