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

## Get all filters

This example returns all filters in zone with ID `{zone_id}`.

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/filters" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "<FILTER_ID_1>",

      "paused": false,

      "description": "Login from office",

      "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"

    },

    {

      "id": "<FILTER_ID_2>",

      "paused": false,

      "description": "Login",

      "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"

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

      "description": "/api",

      "expression": "http.request.uri.path matches \"^/api/.*$\""

    },

    {

      "id": "<FILTER_ID_5>",

      "paused": false,

      "expression": "ip.src eq 93.184.216.0"

    }

  ],

  "success": true,

  "errors": [],

  "messages": [],

  "result_info": {

    "page": 1,

    "per_page": 25,

    "count": 5,

    "total_count": 5,

    "total_pages": 1

  }

}


```

Explain Code

## Get by filter ID

This example returns the filter with ID `{filter_id}`.

Request

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/filters/{filter_id}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": {

    "id": "<FILTER_ID>",

    "paused": false,

    "description": "Login from office",

    "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/get/","name":"GET examples"}}]}
```
