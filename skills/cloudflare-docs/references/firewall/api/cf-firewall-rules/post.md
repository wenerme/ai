---
title: POST example
description: This example creates several firewall rules using a single API call.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-firewall-rules/post.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# POST example

This example creates several firewall rules using a single API call.

Note

To create a firewall rule you need a [filter](https://developers.cloudflare.com/firewall/api/cf-filters/what-is-a-filter/) identifier (`id`). If you have not created a filter yet, refer to the [Cloudflare Filters API documentation](https://developers.cloudflare.com/firewall/api/cf-filters/).

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '[

  {

    "filter": {

      "id": "<FILTER_ID_1>"

    },

    "action": "allow",

    "description": "Do not challenge login from office"

  },

  {

    "filter": {

      "id": "<FILTER_ID_2>"

    },

    "action": "challenge",

    "description": "Challenge login"

  },

  {

    "filter": {

      "id": "<FILTER_ID_3>"

    },

    "action": "js_challenge",

    "description": "Non-interactive challenge site"

  },

  {

    "filter": {

      "id": "<FILTER_ID_4>"

    },

    "action": "allow",

    "description": "Allow API traffic without challenge"

  }

]'


```

Explain Code

Response

```

{

  "result": [

    {

      "id": "<RULE_ID_1>",

      "paused": false,

      "description": "Do not challenge login from office",

      "action": "allow",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_1>",

        "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

        "paused": false,

        "description": "Login from office"

      }

    },

    {

      "id": "<RULE_ID_2>",

      "paused": false,

      "description": "Challenge login",

      "action": "challenge",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_2>",

        "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

        "paused": false,

        "description": "Login"

      }

    },

    {

      "id": "<RULE_ID_3>",

      "paused": false,

      "description": "Non-interactive challenge site",

      "action": "js_challenge",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_3>",

        "expression": "not http.request.uri.path matches \"^/api/.*$\"",

        "paused": false,

        "description": "not /api"

      }

    },

    {

      "id": "<RULE_ID_4>",

      "paused": false,

      "description": "Allow API traffic without challenge",

      "action": "allow",

      "priority": null,

      "filter": {

        "id": "<FILTER_ID_4>",

        "expression": "http.request.uri.path matches \"^/api/.*$\"",

        "paused": false,

        "description": "/api"

      }

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-firewall-rules/","name":"Firewall Rules API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-firewall-rules/post/","name":"POST example"}}]}
```
