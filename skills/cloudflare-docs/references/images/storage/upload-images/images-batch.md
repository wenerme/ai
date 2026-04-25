---
title: Upload via batch API
description: Use the Cloudflare Images batch API to make sequential requests while bypassing global API rate limits.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Upload via batch API

The Images batch API lets you make several requests in sequence while bypassing Cloudflare’s global API rate limits.

To use the Images batch API, you will need to obtain a batch token and use the token to make several requests. The requests authorized by this batch token are made to a separate endpoint and do not count toward the global API rate limits. Each token is subject to a rate limit of 200 requests per second. You can use multiple tokens if you require higher throughput to the Cloudflare Images API.

To obtain a token, you can use the new `images/v1/batch_token` endpoint as shown in the example below.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/batch_token" \

--header "Authorization: Bearer <API_TOKEN>"


# Response:

{

  "result": {

    "token": "<BATCH_TOKEN>",

    "expiresAt": "2023-08-09T15:33:56.273411222Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

After getting your token, use it to make requests for:

* [Upload an image](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/create/) \- `POST /images/v1`
* [Delete an image](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/delete/) \- `DELETE /images/v1/{identifier}`
* [Image details](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/get/) \- `GET /images/v1/{identifier}`
* [Update image](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/edit/) \- `PATCH /images/v1/{identifier}`
* [List images V2](https://developers.cloudflare.com/api/resources/images/subresources/v2/methods/list/) \- `GET /images/v2`
* [Direct upload V2](https://developers.cloudflare.com/api/resources/images/subresources/v2/subresources/direct%5Fuploads/methods/create/) \- `POST /images/v2/direct_upload`

These options use a different host and a different path with the same method, request, and response bodies.

Request for list images V2 against api.cloudflare.com

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v2" \

--header "Authorization: Bearer <API_TOKEN>"


```

Example request using a batch token

```

curl "https://batch.imagedelivery.net/images/v1" \

--header "Authorization: Bearer <BATCH_TOKEN>"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/upload-images/","name":"Upload images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/upload-images/images-batch/","name":"Upload via batch API"}}]}
```
