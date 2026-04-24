---
title: Update a rule in a ruleset
description: Update a specific rule in a ruleset using the API.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/rulesets-api/update-rule.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Update a rule in a ruleset

Applies one or more changes to an existing rule in a ruleset at the account or zone level.

Use one of the following API endpoints:

* [Update an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/edit/)  
`PATCH /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}`
* [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/edit/)  
`PATCH /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}`

You can update the definition of the rule, changing its fields, or change the order of the rule in the ruleset. Invoking this method creates a new version of the ruleset.

## Update the definition of a rule

To update the definition of a rule, include the new rule definition in the request body. You must include all the rule fields that you want to be part of the new rule definition, even if you are not changing their values.

The response will include the complete ruleset after updating the rule.

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

Update an account ruleset rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/rules/$RULE_ID_1" \

  --request PATCH \

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

    "name": "Custom Ruleset 1",

    "description": "My first custom ruleset",

    "kind": "custom",

    "version": "11",

    "rules": [

      {

        "id": "<RULE_ID_1>",

        "version": "2",

        "action": "js_challenge",

        "expression": "(ip.src.country in {\"GB\" \"FR\"} and cf.bot_management.score < 20 and not cf.bot_management.verified_bot)",

        "description": "challenge GB and FR based on bot score",

        "last_updated": "2023-03-22T12:54:58.144683Z",

        "ref": "<RULE_REF_1>",

        "enabled": true

      },

      {

        "id": "<RULE_ID_2>",

        "version": "1",

        "action": "challenge",

        "expression": "not http.request.uri.path matches \"^/api/.*$\"",

        "last_updated": "2022-11-23T11:36:24.192361Z",

        "ref": "<RULE_REF_2>",

        "enabled": true

      }

    ],

    "last_updated": "2023-03-22T12:54:58.144683Z",

    "phase": "http_request_firewall_custom"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Change the order of a rule in a ruleset

To reorder a rule in a list of ruleset rules, include a `position` object in the request, containing one of the following:

* `"before": "<RULE_ID>"` — Places the rule before rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the first rule in the ruleset.
* `"after": "<RULE_ID>"` — Places the rule after rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the last rule in the ruleset.
* `"index": <POSITION_NUMBER>` — Places the rule in the exact position specified by the integer number `<POSITION_NUMBER>`. Position numbers start with `1`. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten). For example, when you place a rule in position n using `index`, existing rules with index n, n+1, n+2, and so on, are shifted one position — their new position will be n+1, n+2, n+3, and so forth. If the index is out of range, the method returns a `400` HTTP status code.

Important

You can only use one of the `before`, `after`, and `index` fields at a time.

Reorder a rule without changing its definition by including only the `position` object in the `PATCH` request body. You can also update a rule definition and reorder it in the same `PATCH` request by including both the `rule` object and the `position` object.

### Examples

The following examples build upon the following (abbreviated) ruleset:

```

{

  "rules": [

    { "id": "<RULE_ID_1>" },

    { "id": "<RULE_ID_2>" },

    { "id": "<RULE_ID_3>" },

    { "id": "<RULE_ID_4>" }

  ]

}


```

#### Example 1

The following request with the `position` object places rule `$RULE_ID_2` as the first rule:

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

Update a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID_2" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "position": {

        "before": ""

    }

  }'


```

In this case, the new rule order would be:

`<RULE_ID_2>`, `<RULE_ID_1>`, `<RULE_ID_3>`, `<RULE_ID_4>`

#### Example 2

The following request with the `position` object places rule `$RULE_ID_2` after rule 3:

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

Update a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID_2" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "position": {

        "after": "<RULE_ID_3>"

    }

  }'


```

In this case, the new rule order would be:

`<RULE_ID_1>`, `<RULE_ID_3>`, `<RULE_ID_2>`, `<RULE_ID_4>`

#### Example 3

The following request with the `position` object places rule `$RULE_ID_1` in position 3, becoming the third rule in the ruleset:

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

Update a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID_1" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "position": {

        "index": 3

    }

  }'


```

In this case, the new rule order would be:

`<RULE_ID_2>`, `<RULE_ID_3>`, `<RULE_ID_1>`, `<RULE_ID_4>`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/update-rule/","name":"Update a rule in a ruleset"}}]}
```
