---
title: Create a URL rewrite rule via API
description: Use the Rulesets API to create URL Rewrite Rules via API. Refer to the Rules examples gallery for common use cases.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/url-rewrite/create-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a URL rewrite rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create URL Rewrite Rules via API. Refer to the [Rules examples gallery](https://developers.cloudflare.com/rules/transform/examples/?operation=Rewrite+URL) for common use cases.

If you are using Terraform, refer to [Transform Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/#create-a-url-rewrite-rule).

## Basic rule settings

When creating a URL rewrite rule via API, make sure you:

* Set the rule action to `rewrite`.
* Define the [URL rewrite parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/parameters/#api-information) in the `action_parameters` field according to the type of URL rewrite (static or dynamic).
* Deploy the rule to the `http_request_transform` phase at the zone level.

## Procedure

Follow this workflow to create a URL rewrite rule for a given zone via API:

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to check if there is already a ruleset for the `http_request_transform` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:  
   * **kind**: `zone`  
   * **phase**: `http_request_transform`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add a URL rewrite rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.

Make sure your API token has the [required permissions](#required-api-token-permissions) to perform the API operations.

## Example requests

Example: Add a rule that performs a static URL rewrite

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single URL rewrite rule — performing a static rewrite of the URI path — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "rewrite_eu_to_emea",

            "expression": "(http.request.uri.query contains \"eu\")",

            "description": "My first static URL rewrite rule",

            "action": "rewrite",

            "action_parameters": {

                "uri": {

                    "path": {

                        "value": "/emea.html"

                    }

                }

            }

        }

    ]

  }'


```

```

{

  "result": {

    "ref": "rewrite_eu_to_emea",

    "id": "<RULESET_ID>",

    "name": "Zone-level Transform Ruleset",

    "description": "Zone-level ruleset that will execute Transform Rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "rewrite",

        "action_parameters": {

          "uri": {

            "path": {

              "value": "/emea.html"

            }

          }

        },

        "expression": "(http.request.uri.query contains \"eu\")",

        "description": "My first static URL rewrite rule",

        "last_updated": "2021-04-14T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2021-04-14T14:42:04.219025Z",

    "phase": "http_request_transform"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Example: Add a rule that performs a dynamic URL rewrite

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single URL rewrite rule — performing a dynamic rewrite of the URI path — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

            "ref": "rewrite_2012_to_archive",

            "expression": "starts_with(http.request.uri.path, \"/news/2012/\")",

            "description": "My first dynamic URL rewrite rule",

            "action": "rewrite",

            "action_parameters": {

                "uri": {

                    "path": {

                        "expression": "concat(\"/archive\", http.request.uri.path)"

                    }

                }

            }

        }

    ]

  }'


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone-level Transform Ruleset",

    "description": "Zone-level ruleset that will execute Transform Rules.",

    "kind": "zone",

    "version": "2",

    "rules": [

      {

        "ref": "rewrite_2012_to_archive",

        "id": "<RULE_ID>",

        "version": "1",

        "action": "rewrite",

        "action_parameters": {

          "uri": {

            "path": {

              "expression": "concat(\"/archive\", http.request.uri.path)"

            }

          }

        },

        "expression": "starts_with(http.request.uri.path, \"/news/2012/\")",

        "description": "My first dynamic URL rewrite rule",

        "last_updated": "2021-04-14T14:42:04.219025Z",

        "ref": "<RULE_REF>"

      }

    ],

    "last_updated": "2021-04-14T14:42:04.219025Z",

    "phase": "http_request_transform"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

---

## Required API token permissions

The API token used in API requests to manage URL Rewrite Rules must have at least the following permissions:

* _Account_ \> _Transform Rules_ \> _Edit_
* _Account_ \> _Account Rulesets_ \> _Read_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/url-rewrite/","name":"URL Rewrite Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/url-rewrite/create-api/","name":"Create a URL rewrite rule via API"}}]}
```
