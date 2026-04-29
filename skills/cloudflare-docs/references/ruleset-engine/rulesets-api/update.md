---
title: Update or deploy a ruleset
description: Update an existing ruleset or deploy it to a phase using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update or deploy a ruleset

Use one of the following API endpoints to update a ruleset:

* [Update an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/)  
`PUT /accounts/{account_id}/rulesets/{ruleset_id}`
* [Update an account entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/update/)  
`PUT /accounts/{account_id}/rulesets/phases/{phase_name}/entrypoint`
* [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/)  
`PUT /zones/{zone_id}/rulesets/{ruleset_id}`
* [Update a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/update/)  
`PUT /zones/{zone_id}/rulesets/phases/{phase_name}/entrypoint`

When updating a ruleset, you can update:

* The basic properties of a ruleset (currently only the description)
* The list of rules in a ruleset

You cannot update the name of the ruleset or its type. Do not include these fields in the `data` field of your `PUT` request.

To deploy a ruleset, add a rule with `"action": "execute"` to the list of rules of an [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset). Refer to [Deploy a ruleset](#example---deploy-a-ruleset) for an example.

Risk of replacing all rules

The update operations described in this page (`PUT` requests) replace the entire list of rules in the ruleset. If you omit existing rules from the request body, those rules will be removed. Always include every rule you want to keep in the `rules` array.

To add a single rule without replacing the entire list of rules in the ruleset, use one of the `POST` requests described in [Add a rule to a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/add-rule/) instead.

## Example - Set the rules of a ruleset

The following `PUT` request defines the list of rules of a ruleset, setting it to a single rule. You must include all the rules you want to associate with the ruleset in every request.

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

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "action": "execute",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID>"

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

    "name": "Zone-level phase entry point ruleset",

    "description": "This ruleset executes a managed ruleset.",

    "kind": "zone",

    "version": "4",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "2",

        "action": "execute",

        "expression": "true",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>"

        },

        "last_updated": "2025-03-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2025-03-17T15:42:37.917815Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Example - Deploy a ruleset

To deploy a ruleset, create a rule with `"action": "execute"` that executes the ruleset, and add the ruleset ID to the `action_parameters` field in the `id` parameter.

The following `PUT` request deploys a managed ruleset to the `http_request_firewall_managed` phase of a zone (`$ZONE_ID`).

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

                "id": "<MANAGED_RULESET_ID>"

            },

            "expression": "true",

            "description": "Execute Cloudflare Managed Ruleset on my phase entry point ruleset"

        }

    ]

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point ruleset",

    "description": "",

    "kind": "zone",

    "version": "4",

    "rules": [

      {

        "id": "<RULE_ID_1>",

        "version": "1",

        "action": "execute",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>",

          "version": "latest"

        },

        "expression": "true",

        "description": "Execute Cloudflare Managed Ruleset on my phase entry point ruleset",

        "last_updated": "2025-03-21T11:02:08.769537Z",

        "ref": "<RULE_REF_1>",

        "enabled": true

      }

    ],

    "last_updated": "2025-03-21T11:02:08.769537Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

For more information on deploying rulesets, refer to [Deploy rulesets](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/).

## Example - Update ruleset description

The following `PUT` request updates the description of an existing ruleset or phase entry point.

The response will include the complete ruleset definition, including all the rules.

Note

You cannot update the description or the rules in a managed ruleset. You can only [define overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) to customize the ruleset behavior.

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

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "My updated phase entry point ruleset"

  }'


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone entry point",

    "description": "My updated phase entry point ruleset",

    "kind": "zone",

    "version": "4",

    "rules": [

      // (...)

    ],

    "last_updated": "2025-03-30T10:49:11.006109Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/update/","name":"Update or deploy a ruleset"}}]}
```
