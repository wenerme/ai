---
title: PUT examples
description: This example updates several firewall rules using a single API call.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-firewall-rules/put.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# PUT examples

## Update multiple rules

This example updates several firewall rules using a single API call.

You can include up to 25 rules in the JSON object array (`-d` flag) to update as a batch. The batch is handled as a transaction.

Request

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '[

  {

    "id": "<RULE_ID>",

    "paused": false,

    "description": "Challenge site",

    "action": "challenge",

    "priority": null,

    "filter": {

      "id": "<FILTER_ID>",

      "expression": "not http.request.uri.path matches \"^/api/.*$\"",

      "paused": false,

      "description": "not /api"

    }

  }

]'


```

Explain Code

Note

`PUT` does not update the filter specified. It only looks at the filter ID (`<FILTER_ID>`) to update the rule with a new filter.

To update the filter, use the [Filters API](https://developers.cloudflare.com/firewall/api/cf-filters/).

Response

```

{

  "result": [

    {

      "id": "<RULE_ID>",

      "paused": false,

      "description": "Challenge site",

      "action": "challenge",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID>",

        "expression": "not http.request.uri.path matches \"^/api/.*$\"",

        "paused": false,

        "description": "not /api"

      }

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Update a single rule

This example updates the firewall rule with ID `{rule_id}`.

You must include the following fields in the request body:

* `id`
* `action`
* `filter.id`

All other fields are optional.

Request

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules/{rule_id}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "id": "<RULE_ID>",

  "paused": false,

  "description": "Do not challenge login from office IPv6",

  "action": "allow",

  "priority": null,

  "filter": {

    "id": "<FILTER_ID>",

    "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

    "paused": false,

    "description": "Login from office"

  }

}'


```

Explain Code

Response

```

{

  "result": {

    "id": "<RULE_ID>",

    "paused": false,

    "description": "Do not challenge login from office IPv6",

    "action": "allow",

    "priority": null,

    "filter": {

      "id": "<FILTER_ID>",

      "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

      "paused": false,

      "description": "Login from office"

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

Note

`PUT` overwrites fields that are not explicitly passed in the request.

For example, if the request omits `description`, any previously existing `description` value will be erased.

To preserve existing values, issue a `GET` request and based on the response, determine which fields (and respective values) to include in your `PUT` request.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-firewall-rules/","name":"Firewall Rules API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-firewall-rules/put/","name":"PUT examples"}}]}
```
