---
title: DELETE examples
description: Delete filters or rules with DELETE API requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DELETE examples

## Delete multiple filters

This example deletes filters with IDs `{filter_id_1}` and `{filter_id_2}`.

Request

```

curl --request DELETE \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/filters?id={filter_id_1}&id={filter_id_2}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "<FILTER_ID_1>"

    },

    {

      "id": "<FILTER_ID_2>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

## Delete a single filter

This example deletes a single filter with ID `{filter_id}`.

Request

```

curl --request DELETE \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/filters/{filter_id}" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "<FILTER_ID>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/delete/","name":"DELETE examples"}}]}
```
