---
title: Upload via URL
description: Upload an image to Cloudflare Images by providing a source URL instead of a file.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Upload via URL

Before you upload an image, check the list of [supported formats and dimensions](https://developers.cloudflare.com/images/get-started/limits) to confirm your image will be accepted.

You can use the Images API to use a URL of an image instead of uploading the data.

Make a `POST` request using the example below as reference. Keep in mind that the `--form 'file=<FILE>'` and `--form 'url=<URL>'` fields are mutually exclusive.

Note

The `metadata` included in the request is never shared with end-users.

Terminal window

```

curl --request POST \

https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1 \

--header "Authorization: Bearer <API_TOKEN>" \

--form 'url=https://[user:password@]example.com/<PATH_TO_IMAGE>' \

--form 'metadata={"key":"value"}' \

--form 'requireSignedURLs=false'


```

After successfully uploading the image, you will receive a response similar to the example below.

```

{

  "result": {

    "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",

    "filename": "image.jpeg",

    "metadata": {

      "key": "value"

    },

    "uploaded": "2022-01-31T16:39:28.458Z",

    "requireSignedURLs": false,

    "variants": [

      "https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/public",

      "https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/thumbnail"

    ]

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

If your origin server returns an error while fetching the images, the API response will return a 4xx error.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/upload-images/","name":"Upload images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/upload-images/upload-url/","name":"Upload via URL"}}]}
```
