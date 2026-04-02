---
title: Deploy rulesets
description: Use the Rulesets API to deploy a ruleset. To deploy a ruleset, add a rule with &#34;action&#34;: &#34;execute&#34; to a phase entry point ruleset, specifying the ruleset ID to execute as an action parameter. Use a separate rule for each ruleset you want to deploy.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/basic-operations/deploy-rulesets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Deploy rulesets

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to deploy a ruleset. To deploy a ruleset, add a rule with `"action": "execute"` to a [phase entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset), specifying the ruleset ID to execute as an action parameter. Use a separate rule for each ruleset you want to deploy.

A rule that executes a ruleset consists of:

* The ID of the ruleset you want to execute, included in `action_parameters.id`.
* An expression.
* The `execute` action.

The rules in the ruleset execute when a request satisfies the expression.

Note

To apply a rule to every request in a phase at the zone level, set the rule expression to `true`.

## Example

The following example deploys the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) (with ID ...376e9aee ) to the `http_request_firewall_managed` phase of a given zone (`$ZONE_ID`) by adding a rule that executes the managed ruleset.

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

                "id": "efb7b8c949ac4650a09736fc376e9aee"

            },

            "expression": "true",

            "description": "Execute Cloudflare Managed Ruleset on my zone ruleset"

        }

    ]

  }'


```

```

{

  "result": {

    "id": "<ZONE_PHASE_RULESET_ID>",

    "name": "Zone-level Ruleset 1",

    "description": "",

    "kind": "zone",

    "version": "latest",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "execute",

        "action_parameters": {

          "id": "efb7b8c949ac4650a09736fc376e9aee",

          "version": "3"

        },

        "expression": "true",

        "description": "Execute Cloudflare Managed Ruleset on my zone ruleset",

        "last_updated": "2021-03-18T18:08:14.003361Z",

        "ref": "<RULE_REF>",

        "enabled": true

      }

    ],

    "last_updated": "2021-03-18T18:08:14.003361Z",

    "phase": "http_request_firewall_managed"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Warning

This API request replaces any existing rules in the `http_request_firewall_managed` phase entry point ruleset with a single rule.

## Related resources

For more examples of deploying rulesets, refer to the following pages:

* [Deploy a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset/)
* [Managed ruleset override examples](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/).
* [Deploy a custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/deploy-custom-ruleset/)

Refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/) and [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) for more information.

For more information on the available API endpoints for editing and deploying rulesets, refer to [Update or deploy a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/basic-operations/","name":"Basic API operations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/basic-operations/deploy-rulesets/","name":"Deploy rulesets"}}]}
```
