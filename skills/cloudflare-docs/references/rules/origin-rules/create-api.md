---
title: Create an origin rule via API
description: Create origin rules using the Rulesets API.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/origin-rules/create-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Create an origin rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create origin rules via API.

## Basic rule settings

When creating an origin rule via API, make sure you:

* Set the rule action to `route`.
* Define the [parameters](https://developers.cloudflare.com/rules/origin-rules/parameters/) in the `action_parameters` field according to the type of origin override.
* Deploy the rule to the `http_request_origin` phase at the zone level.

## Procedure

Follow this workflow to create an origin rule for a given zone via API:

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to check if there is already a ruleset for the `http_request_origin` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:  
   * **kind**: `zone`  
   * **phase**: `http_request_origin`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add an origin rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.

Make sure your API token has the [required permissions](#required-api-token-permissions) to perform the API operations.

## Example requests

Example: Add a rule that overrides the `Host` header of incoming requests and the resolved DNS record

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single origin rule — overriding the `Host` header of incoming requests and the resolved DNS record — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "hr_app_overrides",

            "expression": "starts_with(http.request.uri.path, \"/hr-app/\")",

            "description": "Origin rule for the company HR application",

            "action": "route",

            "action_parameters": {

                "host_header": "hr-server.example.com",

                "origin": {

                    "host": "hr-server.example.com"

                }

            }

        }

    ]

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Origin Rules ruleset",

    "description": "Zone-level ruleset that will execute origin rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "hr_app_overrides",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "route",

        "action_parameters": {

          "host_header": "hr-server.example.com",

          "origin": {

            "host": "hr-server.example.com"

          }

        },

        "expression": "starts_with(http.request.uri.path, \"/hr-app/\")",

        "description": "Origin rule for the company HR application",

        "last_updated": "2022-06-03T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2022-06-03T14:42:04.219025Z",

    "phase": "http_request_origin"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Example: Add a rule that overrides the port of incoming requests

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single origin rule — overriding the port of incoming requests — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "calendar_app_change_port",

            "expression": "starts_with(http.request.uri.path, \"/team/calendar/\")",

            "description": "Origin rule for the team calendar application",

            "action": "route",

            "action_parameters": {

                "origin": {

                    "port": 8081

                }

            }

        }

    ]

  }'


```

Explain Code

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Origin Rules ruleset",

    "description": "Zone-level ruleset that will execute origin rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "calendar_app_change_port",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "route",

        "action_parameters": {

          "origin": {

            "port": 8081

          }

        },

        "expression": "starts_with(http.request.uri.path, \"/team/calendar/\")",

        "description": "Origin rule for the team calendar application",

        "last_updated": "2022-06-03T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2022-06-03T14:42:04.219025Z",

    "phase": "http_request_origin"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Example: Add a rule that overrides the SNI value of incoming requests

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single origin rule — overriding the SNI value of incoming requests addressed at `admin.example.com` — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation.

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

            "ref": "override_sni_for_admin",

            "expression": "http.host eq \"admin.example.com\"",

            "description": "SNI Override for the admin area",

            "action": "route",

            "action_parameters": {

                "sni": {

                    "value": "sni.example.com"

                }

            }

        }

    ]

  }'


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

---

## Required API token permissions

The API token used in API requests to manage origin rules must have at least the following permission:

* _Zone_ \> _Origin Rules_ \> _Edit_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/origin-rules/create-api/","name":"Create an origin rule via API"}}]}
```
