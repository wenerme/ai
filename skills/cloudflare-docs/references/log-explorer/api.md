---
title: Log Explorer API
description: Query and configure Log Explorer via the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/log-explorer/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Log Explorer API

Configuration and Log searches are also available via a public API.

## Authentication

Authentication with the API can be done via an API token or API key with an email. Refer to [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) for further instructions.

For detailed information on permissions required for each Log Explorer feature, refer to the [Permissions](https://developers.cloudflare.com/log-explorer/#permissions) section.

## Query data

Log Explorer includes a SQL API for submitting queries.

For example, to find an HTTP request with a specific [Ray ID](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/), use the following SQL query:

Terminal window

```

curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/explorer/query/sql \

--header "Authorization: Bearer <API_TOKEN>" \

--url-query query="SELECT clientRequestScheme, clientRequestHost, clientRequestMethod, edgeResponseStatus, clientRequestUserAgent FROM http_requests WHERE RayID = '806c30a3cec56817' LIMIT 1"


```

This command returns the following HTTP request details:

```

{

  "result": [

    {

      "clientrequestscheme": "https",

      "clientrequesthost": "example.com",

      "clientrequestmethod": "GET",

      "clientrequestuseragent": "curl/7.88.1",

      "edgeresponsestatus": 200

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

As another example, you could find Cloudflare Access requests with selected columns from a specific timeframe by performing the following SQL query:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/logs/explorer/query/sql \

--header "Authorization: Bearer <API_TOKEN>" \

--url-query query="SELECT CreatedAt, AppDomain, AppUUID, Action, Allowed, Country, RayID, Email, IPAddress, UserUID FROM access_requests WHERE Date >= '2025-02-06' AND Date <= '2025-02-06' AND CreatedAt >= '2025-02-06T12:28:39Z' AND CreatedAt <= '2025-02-06T12:58:39Z'"


```

This command returns the following request details:

```

{

  "result": [

    {

      "createdat": "2025-01-14T18:17:55Z",

      "appdomain": "example.com",

      "appuuid": "a66b4ab0-ccdf-4d60-a6d0-54a59a827d92",

      "action": "login",

      "allowed": true,

      "country": "us",

      "rayid": "90fbb07c0b316957",

      "email": "user@example.com",

      "ipaddress": "1.2.3.4",

      "useruid": "52859e81-711e-4de0-8b31-283336060e79"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}},{"@type":"ListItem","position":3,"item":{"@id":"/log-explorer/api/","name":"Log Explorer API"}}]}
```
