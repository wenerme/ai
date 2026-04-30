---
title: Create Bulk Redirects via API
description: Learn how to create Bulk Redirects using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create Bulk Redirects via API

To create Bulk Redirects via API, you must:

1. Create a Bulk Redirect List via API.
2. Add items (URL redirects) to the list created in step 1.
3. Create a Bulk Redirect Rule via API, which enables the list created in step 1.

Note

Bulk Redirects require that the incoming traffic for the hostname referenced in visitors' requests is [proxied by Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).

## 1\. Create a Bulk Redirect List via API

Use the [Create a list](https://developers.cloudflare.com/api/resources/rules/subresources/lists/methods/create/) operation to create a new Bulk Redirect List. The list `kind` must be `redirect`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account Filter Lists Edit`

Create a list

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "my_redirect_list",

    "description": "My redirect list.",

    "kind": "redirect"

  }'


```

```

{

  "result": {

    "id": "f848b6ccb07647749411f504d6f88794",

    "name": "my_redirect_list",

    "description": "My redirect list.",

    "kind": "redirect",

    "num_items": 0,

    "num_referencing_filters": 0,

    "created_on": "2021-10-28T09:11:42Z",

    "modified_on": "2021-10-28T09:11:42Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Take note of the list ID — you will need it in the next step.

For more information on list operations, refer to the [Lists API](https://developers.cloudflare.com/waf/tools/lists/lists-api/) documentation.

## 2\. Add items to the list

Use the [Create list items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/create/) operation to add URL redirect items to the list. Enter the list ID from the previous step in the endpoint URL:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account Filter Lists Edit`

Create list items

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/f848b6ccb07647749411f504d6f88794/items" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '[

    {

        "redirect": {

            "source_url": "example.com/blog/",

            "target_url": "https://example.com/blog/latest"

        }

    },

    {

        "redirect": {

            "source_url": "example.net/",

            "target_url": "https://example.net/under-construction.html",

            "status_code": 307

        }

    }

  ]'


```

```

{

  "result": {

    "operation_id": "92558f8b296d4dbe9d0419e0e53f6622"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

This is an asynchronous operation. The response will contain an `operation_id` which you will use to check if the operation completed successfully using the [Get bulk operation status](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/bulk%5Foperations/methods/get/) operation:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account Filter Lists Edit`
* `Account Filter Lists Read`

Get bulk operation status

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/bulk_operations/92558f8b296d4dbe9d0419e0e53f6622" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Once the operation has completed successfully, the response will be similar to the following:

Response

```

{

  "result": {

    "id": "92558f8b296d4dbe9d0419e0e53f6622",

    "status": "completed",

    "completed": "2021-10-28T09:15:42Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## 3\. Create a Bulk Redirect Rule via API

Since Bulk Redirect Lists are essentially containers of URL redirects, you have to enable the URL redirects in the list by creating a Bulk Redirect Rule.

Add Bulk Redirect Rules to the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_request_redirect` phase at the account level. Refer to the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) documentation for more information on [creating a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create/) and supplying a list of rules for the ruleset.

A Bulk Redirect Rule must have:

* `action` set to `redirect`
* An `action_parameters` object with additional configuration settings — refer to [Bulk Redirects API JSON objects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/json-objects/#bulk-redirect-rule) for details.

The following request of the [Create an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation creates a phase entry point ruleset for the `http_request_redirect` phase at the account level, and defines a single redirect rule. Use this operation if you have not created a phase entry point ruleset for the `http_request_redirect` phase yet.

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

    "name": "My redirect ruleset",

    "kind": "root",

    "phase": "http_request_redirect",

    "rules": [

        {

            "ref": "enable_my_redirect_list",

            "expression": "http.request.full_uri in $my_redirect_list",

            "description": "Bulk Redirect rule.",

            "action": "redirect",

            "action_parameters": {

                "from_list": {

                    "name": "my_redirect_list",

                    "key": "http.request.full_uri"

                }

            }

        }

    ]

  }'


```

```

{

  "result": {

    "id": "528f4f03bf0da53a29907199625867be",

    "name": "My redirect ruleset",

    "kind": "root",

    "version": "1",

    "rules": [

      {

        "ref": "enable_my_redirect_list",

        "id": "8da312df846b4258a05bcd454ea943be",

        "version": "1",

        "expression": "http.request.full_uri in $my_redirect_list",

        "description": "Bulk Redirect rule.",

        "action": "redirect",

        "action_parameters": {

          "from_list": {

            "name": "my_redirect_list",

            "key": "http.request.full_uri"

          }

        },

        "last_updated": "2021-10-28T09:20:42Z"

      }

    ],

    "last_updated": "2021-10-28T09:20:42Z",

    "phase": "http_request_redirect"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

If there is already a phase entry point ruleset for the `http_request_redirect` phase, use the [Update an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation instead, like in the following example:

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

Update an account ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "My redirect ruleset",

    "kind": "root",

    "phase": "http_request_redirect",

    "rules": [

        {

            "ref": "eval_redirects_list_1",

            "expression": "http.request.full_uri in $my_redirect_list_1",

            "description": "Bulk Redirect rule 1",

            "action": "redirect",

            "action_parameters": {

                "from_list": {

                    "name": "my_redirect_list_1",

                    "key": "http.request.full_uri"

                }

            }

        },

        {

            "ref": "eval_redirects_list_2",

            "expression": "http.request.full_uri in $my_redirect_list_2",

            "description": "Bulk Redirect rule 2",

            "action": "redirect",

            "action_parameters": {

                "from_list": {

                    "name": "my_redirect_list_2",

                    "key": "http.request.full_uri"

                }

            }

        }

    ]

  }'


```

```

{

  "result": {

    "id": "67013aa153df4e5fbda92f92bc979331",

    "name": "default",

    "description": "",

    "kind": "root",

    "version": "2",

    "rules": [

      {

        "ref": "eval_redirects_list_1",

        "id": "8be62ab2ef9a4a41af30c24ff8e73e41",

        "version": "1",

        "action": "redirect",

        "action_parameters": {

          "from_list": {

            "name": "my_redirect_list_1",

            "key": "http.request.full_uri"

          }

        },

        "expression": "http.request.full_uri in $my_redirect_list_1",

        "description": "Bulk Redirect rule 1",

        "last_updated": "2021-12-03T15:38:51.658387Z",

        "ref": "8be62ab2ef9a4a41af30c24ff8e73e41",

        "enabled": true

      },

      {

        "ref": "eval_redirects_list_2",

        "id": "97e38797fb2b4b22a4919800f1318a5c",

        "version": "1",

        "action": "redirect",

        "action_parameters": {

          "from_list": {

            "name": "my_redirect_list_2",

            "key": "http.request.full_uri"

          }

        },

        "expression": "http.request.full_uri in $my_redirect_list_2",

        "description": "Bulk Redirect rule 2",

        "last_updated": "2021-12-03T15:38:51.658387Z",

        "ref": "97e38797fb2b4b22a4919800f1318a5c",

        "enabled": true

      }

    ],

    "last_updated": "2021-12-03T15:38:51.658387Z",

    "phase": "http_request_redirect"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

---

## Required API token permissions

The API token used in API requests to manage Bulk Redirects objects (lists, list items, and rules) must have at least the following [permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/):

* [ Dashboard ](#tab-panel-7427)
* [ API ](#tab-panel-7428)

* _Account_ \> _Bulk URL Redirects_ \> _Edit_
* _Account_ \> _Account Filter Lists_ \> _Edit_

* Mass URL Redirects Write
* Account Rule Lists Write

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/bulk-redirects/","name":"Bulk Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/bulk-redirects/create-api/","name":"Create Bulk Redirects via API"}}]}
```
