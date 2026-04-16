---
title: Configure sequence mitigation via the API
description: Build and configure sequence mitigation rules using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/security/sequence-mitigation/api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Configure sequence mitigation via the API

Configuring sequence mitigation via the API consists of building a rule object by choosing the sequence and setting the type of rule and its action.

Example of a rule object

```

{

    "id": "d4909253-390f-4956-89fd-92a5b0cd86d8",

    "title": "<RULE_TITLE>",

    "kind": "allow",

    "action": "block",

    "sequence": [

     "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",

     "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"

    ],

    "priority": 0,

    "last_updated": "2023-07-24T12:06:51.796286Z",

    "created_at": "2023-07-24T12:06:51.796286Z"

}


```

Explain Code

This rule enforces that a request to endpoint `0d9bf70c-92e1-4bb3-9411-34a3bcc59003` must come before a request to endpoint `b704ab4d-5be0-46e0-9875-b2b3d1ab42f9`.

Otherwise, the request to endpoint `b704ab4d-5be0-46e0-9875-b2b3d1ab42f9` is blocked.

### Fields

| Field name    | Description                                                                                                                                                                                                                                           | Possible Values                                                | Example                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| id            | An opaque identifier that identifies a rule.                                                                                                                                                                                                          | A UUID                                                         | "d4909253-390f-4956-89fd-92a5b0cd86d8"                                             |
| title         | A string that helps to identify the rule.                                                                                                                                                                                                             | A value between 1 and 50 characters                            | "Allow checkout sequence"                                                          |
| kind          | Defines the semantics of this rule. Block rules have a negative security model and allow to explicitly deny a sequence. Allow rules have a positive security model and deny everything but the configured sequence.                                   | block, allow                                                   | "block"                                                                            |
| action        | What firewall action should we do when the rule matches.                                                                                                                                                                                              | block,log                                                      | "log"                                                                              |
| sequence      | Denotes the operations (from Endpoint Management) that make up the sequence for this rule. We currently only support sequences of length two. The first operation will be the starting endpoint and the second operation will be the ending endpoint. | An array with two valid operation IDs from Endpoint Management | \["0d9bf70c-92e1-4bb3-9411-34a3bcc59003", "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"\] |
| priority      | Denotes the precedence of this rule in relation to all other rules. Rules with a higher priority value are evaluated before those with a lower value. If two rules have the same priority, they are evaluated in the order in which they were added.  | A valid integer                                                | 10                                                                                 |
| last\_updated | When this rule was last changed.                                                                                                                                                                                                                      | A date string                                                  | 2023-05-02T12:06:51.796286Z                                                        |
| created\_at   | When this rule was created.                                                                                                                                                                                                                           | A date string                                                  | 2023-05-02T12:06:51.796286Z                                                        |

You can find an endpoint's operation ID by exporting the schema in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/#export-a-schema) or via the [API](https://developers.cloudflare.com/api/resources/api%5Fgateway/subresources/operations/methods/list/).

### List sequence rules

Use the `GET` command to list rules.

cURL command

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules"


```

### Add a single sequence rule

Use the `POST` command to create a single rule.

This adds a single rule to all existing rules. Priority can be used to place the rule between, before, or after another rule.

The response will reflect the rule that has been written with its ID. In case something is not right with the rule, an appropriate error message with a `json` path pointing towards the issue will be provided.

Example using cURL

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules/rules" \

--header "Content-Type: application/json" \

--data '{

  "title": "string",

  "kind": "block",

  "action": "block",

  "sequence": [

    "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",

    "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"

  ],

  "priority": 0

}'


```

Explain Code

### Add multiple sequence rules

Use the `PUT` command to set up new rules in bulk.

This will overwrite any existing rules and replace them with the rules specified in the body. Setting an empty array for the rules removes all rules.

The response will reflect the rules that have been written with their IDs in case something is not right with the rules, an appropriate error message with a `json` path pointing towards the issue will be provided.

Example using cURL

```

curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules" \

--header "Content-Type: application/json" \

--data '{

  "rules": [

    {

      "title": "<RULE_TITLE>",

      "kind": "block",

      "action": "block",

      "sequence": [

        "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",

        "b704ab4d-5be0-46e0-9875-b2b3d1ab42f9"

      ],

      "priority": 0

    }

  ]

}'


```

Explain Code

### Delete a rule

Use the `DELETE` command with its rule ID to delete a rule.

cURL command

```

curl --request DELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/seqrules/rules/d4909253-390f-4956-89fd-92a5b0cd86d8"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/sequence-mitigation/","name":"Sequence mitigation"}},{"@type":"ListItem","position":5,"item":{"@id":"/api-shield/security/sequence-mitigation/api/","name":"Configure sequence mitigation via the API"}}]}
```
