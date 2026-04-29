---
title: Turn off Auto Minify via API
description: Learn how to turn off Auto Minify via API in Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Turn off Auto Minify via API

If your site is still using deprecated features for [Auto Minify](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-08-05), turn off Auto Minify via API.

## Before you begin

You will need an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

* _Zone_ \> _Zone Settings_ \> _Edit_
* _Zone_ \> _Zone Settings_ \> _Read_

## (Optional) Check zone status

To check your zone's Auto Minify status, send a `GET` request to the `/zones/{zone_id}/settings/minify` endpoint.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/minify" \

--header "Authorization: Bearer <API_TOKEN>"


```

```

{

  "result": {

    "id": "minify",

    "value": { "css": "off", "html": "off", "js": "off" },

    "modified_on": null,

    "editable": true

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

If any of the values in the highlighted line are `"on"`, then you need to turn them off.

## Turn off Auto Minify using the API

To turn off Auto Minify for your zone, send a `PATCH` request to the `/zones/{zone_id}/settings/minify` endpoint. The value for `success` in the response should be `true`.

Terminal window

```

curl --request PATCH \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/minify" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{ "value": { "css": "off","html": "off","js": "off" } }'


```

```

{

  "result": {

    "id": "minify",

    "value": { "js": "off", "css": "off", "html": "off" },

    "modified_on": "2024-11-15T19:32:20.882640Z",

    "editable": true

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/content/troubleshooting/disable-auto-minify/","name":"Turn off Auto Minify via API"}}]}
```
