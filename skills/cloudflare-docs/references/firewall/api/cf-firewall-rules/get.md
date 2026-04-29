---
title: GET examples
description: Retrieve filters or rules with GET API requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GET examples

## Get all rules

This example returns all the firewall rules in the zone with ID `{zone_id}`.

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "<RULE_ID_1>",

      "paused": false,

      "description": "allow API traffic without challenge",

      "action": "allow",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_1>",

        "expression": "http.request.uri.path matches \"^/api/.*$\"",

        "paused": false,

        "description": "/api"

      }

    },

    {

      "id": "<RULE_ID_2>",

      "paused": false,

      "description": "do not challenge login from office",

      "action": "allow",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_2>",

        "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

        "paused": false,

        "description": "Login from office"

      }

    },

    {

      "id": "<RULE_ID_3>",

      "paused": false,

      "description": "challenge login",

      "action": "challenge",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_3>",

        "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

        "paused": false,

        "description": "Login"

      }

    },

    {

      "id": "<RULE_ID_4>",

      "paused": false,

      "description": "Non-interactive challenge site",

      "action": "js_challenge",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_4>",

        "expression": "not http.request.uri.path matches \"^/api/.*$\"",

        "paused": false,

        "description": "not /api"

      }

    }

  ],

  "success": true,

  "errors": [],

  "messages": [],

  "result_info": {

    "page": 1,

    "per_page": 25,

    "count": 4,

    "total_count": 4,

    "total_pages": 1

  }

}


```

Explain Code

## Get rule by ID

This example returns the firewall rule with ID `{rule_id}`.

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules/{rule_id}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": {

    "id": "<RULE_ID>",

    "paused": false,

    "description": "do not challenge login from office",

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-firewall-rules/","name":"Firewall Rules API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-firewall-rules/get/","name":"GET examples"}}]}
```
