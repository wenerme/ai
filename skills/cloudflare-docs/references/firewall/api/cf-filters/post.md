---
title: POST example
description: This example creates several filters using a single API call.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-filters/post.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# POST example

This example creates several filters using a single API call.

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/filters" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '[

  {

    "expression": "ip.src eq 93.184.216.0"

  },

  {

    "expression": "http.request.uri.path matches \"^/api/.*$\"",

    "description": "/api"

  },

  {

    "expression": "not http.request.uri.path matches \"^/api/.*$\"",

    "description": "not /api"

  },

  {

    "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

    "description": "Login"

  },

  {

    "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",

    "description": "Login from office"

  }

]'


```

Response

```

{

  "result": [

    {

      "id": "<FILTER_ID_1>",

      "paused": false,

      "expression": "ip.src eq 93.184.216.0"

    },

    {

      "id": "<FILTER_ID_2>",

      "paused": false,

      "description": "/api",

      "expression": "http.request.uri.path matches \"^/api/.*$\""

    },

    {

      "id": "<FILTER_ID_3>",

      "paused": false,

      "description": "not /api",

      "expression": "not http.request.uri.path matches \"^/api/.*$\""

    },

    {

      "id": "<FILTER_ID_4>",

      "paused": false,

      "description": "Login",

      "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"

    },

    {

      "id": "<FILTER_ID_5>",

      "paused": false,

      "description": "Login from office",

      "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/post/","name":"POST example"}}]}
```
