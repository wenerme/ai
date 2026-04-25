---
title: Create a ruleset
description: Create a new ruleset using the Rulesets API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Create a ruleset

Creates a ruleset of a given kind in the specified phase. Allows you to create phase entry point rulesets.

Use one of the following API endpoints:

* [Create an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/)  
`POST /accounts/{account_id}/rulesets`
* [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/)  
`POST /zones/{zone_id}/rulesets`

## Parameters

A `POST` request to create a ruleset supports the following parameters in the request body:

* `name` ` String `  
   * A human-readable name for the ruleset.  
   * The name is immutable. You cannot change it over the lifetime of the ruleset.
* `description` ` String ` Optional  
   * Optional description for the ruleset.  
   * You can change the description over the lifetime of the ruleset.
* `kind` ` String `  
   * The kind of ruleset the JSON object represents.  
   * Allowed values:  
         * `custom`: Creates a custom ruleset  
         * `root`: Creates a phase [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) at the account level  
         * `zone`: Creates a phase entry point ruleset at the zone level
* `phase` ` String `  
   * The name of the [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) where the ruleset will be created.  
   * Check the [phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) or the specific Cloudflare product documentation for more information on the phases where you can create rulesets for that product.
* `rules` ` Array<Rule> ` Optional  
   * A list of [rules](https://developers.cloudflare.com/ruleset-engine/rulesets-api/json-object/#rule-object-structure-and-properties) to include in the ruleset.

For additional details on these parameters, refer to [JSON objects](https://developers.cloudflare.com/ruleset-engine/rulesets-api/json-object/).

## Example - Create a custom ruleset

The following `POST` request creates a custom ruleset in the `http_request_firewall_custom` phase at the account level containing a single rule.

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

Create an account ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Example custom ruleset",

    "kind": "custom",

    "description": "Example ruleset description",

    "rules": [

        {

            "action": "log",

            "expression": "cf.zone.name eq \"example.com\""

        }

    ],

    "phase": "http_request_firewall_custom"

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Example custom ruleset",

    "description": "Example ruleset description",

    "kind": "custom",

    "version": "1",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "log",

        "expression": "cf.zone.name eq \"example.com\"",

        "last_updated": "2025-03-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2025-03-17T15:42:37.917815Z",

    "phase": "http_request_firewall_custom"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Example - Create a zone-level phase entry point ruleset

The following `POST` request creates a zone-level phase entry point ruleset at the `http_request_firewall_managed` phase with a single rule that executes a managed ruleset.

Note

You do not have to use this method to create a phase entry point ruleset. Cloudflare automatically creates the entry point ruleset when you add a rule to it, if it does not exist. Refer to [Add rules to phase entry point rulesets](https://developers.cloudflare.com/ruleset-engine/basic-operations/add-rule-phase-rulesets/) for more information.

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

Create a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Zone-level phase entry point",

    "kind": "zone",

    "description": "This ruleset executes a managed ruleset.",

    "rules": [

        {

            "action": "execute",

            "expression": "true",

            "action_parameters": {

                "id": "<MANAGED_RULESET_ID>"

            }

        }

    ],

    "phase": "http_request_firewall_managed"

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level phase entry point",

    "description": "This ruleset executes a managed ruleset.",

    "kind": "zone",

    "version": "1",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

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

## Example - Create an account-level phase entry point ruleset

The following `POST` request creates an account-level phase entry point ruleset for the `http_ratelimit` phase with a single rule that executes a rate limiting ruleset for all Enterprise zones in the account.

Note

You do not have to use this method to create a phase entry point ruleset. Cloudflare automatically creates the entry point ruleset when you add a rule to it, if it does not exist. Refer to [Add rules to phase entry point rulesets](https://developers.cloudflare.com/ruleset-engine/basic-operations/add-rule-phase-rulesets/) for more information.

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

Create an account ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Account-level phase entry point",

    "kind": "root",

    "description": "This ruleset executes a rate limiting ruleset.",

    "rules": [

        {

            "action": "execute",

            "expression": "(cf.zone.plan eq \"ENT\")",

            "action_parameters": {

                "id": "<RATE_LIMITING_RULESET_ID>"

            }

        }

    ],

    "phase": "http_ratelimit"

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Account-level phase entry point",

    "description": "This ruleset executes a rate limiting ruleset.",

    "kind": "root",

    "version": "1",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "execute",

        "expression": "(cf.zone.plan eq \"ENT\")",

        "action_parameters": {

          "id": "<RATE_LIMITING_RULESET_ID>"

        },

        "last_updated": "2024-09-17T15:42:37.917815Z"

      }

    ],

    "last_updated": "2024-09-17T15:42:37.917815Z",

    "phase": "http_ratelimit"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Warning

You can only apply rate limiting rulesets to incoming traffic of zones on an Enterprise plan. To enforce this requirement, you must include `cf.zone.plan eq "ENT"` in the expression of the `execute` rule deploying the rate limiting ruleset.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/create/","name":"Create a ruleset"}}]}
```
