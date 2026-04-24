---
title: Change the destination port
description: Create an origin rule to change the destination port.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/origin-rules/examples/change-port.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Change the destination port

Create an origin rule to change the destination port.

The following origin rule overrides the destination port to `8081` for all requests where the URI path starts with `/team/calendar/`.

* [ Dashboard ](#tab-panel-8454)
* [ API ](#tab-panel-8455)

Text in Expression Editor:

```

starts_with(http.request.uri.path, "/team/calendar/")


```

Value after **Destination Port** \> **Rewrite to**:

```

8081


```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/origin-rules/examples/","name":"Origin Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/origin-rules/examples/change-port/","name":"Change the destination port"}}]}
```
