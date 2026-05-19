---
title: Change the HTTP Host header and DNS record
description: Create an origin rule to change the HTTP `Host` header and the resolved DNS record.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Change the HTTP Host header and DNS record

Create an origin rule to change the HTTP `Host` header and DNS record.

The following origin rule overrides the HTTP `Host` header to `hr-server.example.com` for all requests with a URI path starting with `/hr-app/`. It also overrides the DNS record to the same hostname.

The `Host` header override only updates the header value; the DNS record override will handle the rerouting of incoming requests. For more information on these overrides, refer to [Origin Rules settings](https://developers.cloudflare.com/rules/origin-rules/features/).

* [ Dashboard ](#tab-panel-7826)
* [ API ](#tab-panel-7827)

Expression when using the Expression Builder:

| Field    | Operator    | Value    |
| -------- | ----------- | -------- |
| URI Path | starts with | /hr-app/ |

Expression when using the Expression Editor:

```

(starts_with(http.request.uri.path, "/hr-app/"))


```

Value after **Host Header** \> **Rewrite to**:

```

hr-server.example.com


```

Value after **DNS Record** \> **Override to**:

```

hr-server.example.com


```

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

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/origin-rules/examples/","name":"Origin Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/origin-rules/examples/change-http-host-header/","name":"Change the HTTP Host header and DNS record"}}]}
```
