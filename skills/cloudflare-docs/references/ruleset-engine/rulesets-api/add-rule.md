---
title: Add a rule to a ruleset
description: Adds a single rule to an existing ruleset. Use this endpoint to add a rule without having to include all the existing ruleset rules in the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/rulesets-api/add-rule.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Add a rule to a ruleset

Adds a single rule to an existing ruleset. Use this endpoint to add a rule without having to include all the existing ruleset rules in the request.

Use one of the following API endpoints:

* [Create an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/)  
`POST /accounts/{account_id}/rulesets/{ruleset_id}/rules`
* [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/)  
`POST /zones/{zone_id}/rulesets/{ruleset_id}/rules`

Include the rule definition in the request body.

By default, the rule will be added to the end of the existing list of rules in the ruleset. To define a specific position for the rule, include a `position` object in the request body according to the guidelines in [Change the order of a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/#change-the-order-of-a-rule-in-a-ruleset).

Invoking this method creates a new version of the ruleset.

## Example

The following `POST` request adds a rule to ruleset `$RULESET_ID` of zone `$ZONE_ID`. The ruleset ID was previously obtained using the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation, and corresponds to the entry point ruleset for the `http_request_firewall_custom` phase.

The response will include the complete ruleset after adding the rule.

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

    "action": "js_challenge",

    "expression": "(ip.src.country in {\"GB\" \"FR\"} and cf.bot_management.score < 20 and not cf.bot_management.verified_bot)",

    "description": "challenge GB and FR based on bot score"

  }'


```

```

{

  "result": {

    "id": "<RULESET_ID>",

    "name": "Zone Ruleset 1",

    "description": "My phase entry point ruleset at the zone level",

    "kind": "zone",

    "version": "11",

    "rules": [

      {

        "id": "<RULE_ID_1>",

        "version": "1",

        "action": "challenge",

        "expression": "not http.request.uri.path matches \"^/api/.*$\"",

        "last_updated": "2023-11-23T11:36:24.192361Z",

        "ref": "<RULE_REF_1>",

        "enabled": true

      },

      {

        "id": "<NEW_RULE_ID>",

        "version": "1",

        "action": "js_challenge",

        "expression": "(ip.src.country in {\"GB\" \"FR\"} and cf.bot_management.score < 20 and not cf.bot_management.verified_bot)",

        "description": "challenge GB and FR based on bot score",

        "last_updated": "2024-06-22T12:35:58.144683Z",

        "ref": "<NEW_RULE_REF>",

        "enabled": true

      }

    ],

    "last_updated": "2024-06-22T12:35:58.144683Z",

    "phase": "http_request_firewall_custom"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Define the rule position in the ruleset

To define the position of the new rule in the ruleset, include a `position` object in the request, containing one of the following:

* `"before": "<RULE_ID>"` — Places the rule before rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the first rule in the ruleset.
* `"after": "<RULE_ID>"` — Places the rule after rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the last rule in the ruleset.
* `"index": <POSITION_NUMBER>` — Places the rule in the exact position specified by the integer number `<POSITION_NUMBER>`. Position numbers start with `1`. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten). For example, when you place a rule in position n using `index`, existing rules with index n, n+1, n+2, and so on, are shifted one position — their new position will be n+1, n+2, n+3, and so forth. If the index is out of range, the method returns a `400` HTTP status code.

Important

You can only use one of the `before`, `after`, and `index` fields at a time.

For examples of using a `position` object, refer to [Update a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/#examples).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/add-rule/","name":"Add a rule to a ruleset"}}]}
```
