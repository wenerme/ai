---
title: Create a response header transform rule via API
description: Create response header modification rules using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a response header transform rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create Response Header Transform Rules via API. Refer to the [Rules examples gallery](https://developers.cloudflare.com/rules/transform/examples/?operation=Response+modification) for common use cases.

If you are using Terraform, refer to [Transform Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/#create-a-response-header-transform-rule).

## Basic rule settings

When creating a response header transform rule via API, make sure you:

* Set the rule action to `rewrite`.
* Define the [header modification parameters](https://developers.cloudflare.com/rules/transform/request-header-modification/reference/parameters/) in the `action_parameters` field according to the operation to perform (set, add, or remove header).
* Deploy the rule to the `http_response_headers_transform` phase at the zone level.

## Procedure

Follow this workflow to create a response header transform rule for a given zone via API:

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to check if there is already a ruleset for the `http_response_headers_transform` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:  
   * **kind**: `zone`  
   * **phase**: `http_response_headers_transform`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add a response header transform rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.

Make sure your API token has the [required permissions](#required-api-token-permissions) to perform the API operations.

## Example requests

Example: Set an HTTP response header to a static value

The following example configures the rules of an existing phase ruleset (`$RULESET_ID`) to a single response header transform rule — setting an HTTP response header to a static value — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "set_resp_header_source",

            "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

            "description": "My first response header transform rule",

            "action": "rewrite",

            "action_parameters": {

                "headers": {

                    "X-Source": {

                        "operation": "set",

                        "value": "Cloudflare"

                    }

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

    "name": "Zone-level Response Headers Transform Ruleset",

    "description": "Zone-level ruleset that will execute Response Header Transform Rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "set_resp_header_source",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "rewrite",

        "action_parameters": {

          "headers": {

            "X-Source": {

              "operation": "set",

              "value": "Cloudflare"

            }

          }

        },

        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

        "description": "My first response header transform rule",

        "last_updated": "2021-04-14T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2021-04-14T14:42:04.219025Z",

    "phase": "http_response_headers_transform"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Example: Set an HTTP response header to a dynamic value

The following example configures the rules of an existing phase ruleset (`$RULESET_ID`) to a single response header transform rule — setting an HTTP response header to a dynamic value — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "set_resp_header_bot_score",

            "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

            "description": "My first response header transform rule",

            "action": "rewrite",

            "action_parameters": {

                "headers": {

                    "X-Bot-Score": {

                        "operation": "set",

                        "expression": "to_string(cf.bot_management.score)"

                    }

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

    "name": "Zone-level Response Headers Transform Ruleset",

    "description": "Zone-level ruleset that will execute Response Header Transform Rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "set_resp_header_bot_score",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "rewrite",

        "action_parameters": {

          "headers": {

            "X-Bot-Score": {

              "operation": "set",

              "expression": "to_string(cf.bot_management.score)"

            }

          }

        },

        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

        "description": "My first response header transform rule",

        "last_updated": "2021-04-14T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2021-04-14T14:42:04.219025Z",

    "phase": "http_response_headers_transform"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Example: Add a `set-cookie` HTTP response header with a static value

The following example configures the rules of an existing phase ruleset (`$RULESET_ID`) to a single response header transform rule — adding a `set-cookie` HTTP response header with a static value — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. By configuring the rule with the `add` operation you will keep any existing `set-cookie` headers that may already exist in the response. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "add_resp_header_set_mycookie",

            "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

            "description": "My first response header transform rule",

            "action": "rewrite",

            "action_parameters": {

                "headers": {

                    "set-cookie": {

                        "operation": "add",

                        "value": "mycookie=custom_value"

                    }

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

    "name": "Zone-level Response Headers Transform Ruleset",

    "description": "Zone-level ruleset that will execute Response Header Transform Rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "add_resp_header_set_mycookie",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "rewrite",

        "action_parameters": {

          "headers": {

            "set-cookie": {

              "operation": "add",

              "value": "mycookie=custom_value"

            }

          }

        },

        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

        "description": "My first response header transform rule",

        "last_updated": "2021-04-14T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2021-04-14T14:42:04.219025Z",

    "phase": "http_response_headers_transform"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Example: Remove an HTTP response header

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single response header transform rule — removing an HTTP response header — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "remove_resp_header_cf_connecting_ip",

            "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

            "description": "My first response header transform rule",

            "action": "rewrite",

            "action_parameters": {

                "headers": {

                    "cf-connecting-ip": {

                        "operation": "remove"

                    }

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

    "name": "Zone-level Response Headers Transform Ruleset",

    "description": "Zone-level ruleset that will execute Response Header Transform Rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "remove_resp_header_cf_connecting_ip",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "rewrite",

        "action_parameters": {

          "headers": {

            "cf-connecting-ip": {

              "operation": "remove"

            }

          }

        },

        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",

        "description": "My first response header transform rule",

        "last_updated": "2021-04-14T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2021-04-14T14:42:04.219025Z",

    "phase": "http_response_headers_transform"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

---

## Required API token permissions

The API token used in API requests to manage Response Header Transform Rules must have at least the following permissions:

* _Transform Rules_ \> _Edit_
* _Account Rulesets_ \> _Read_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/response-header-modification/","name":"Response Header Transform Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/response-header-modification/create-api/","name":"Create a response header transform rule via API"}}]}
```
