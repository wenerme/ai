---
title: Manage miscategorization reports
description: Submit domain miscategorization reports using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage miscategorization reports

This guide will show you how to manage miscategorization of reports. To complete this guide, you will need to generate an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

1. Create an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) if you do not have one already.
2. Choose **Custom Token**.
3. Name the token, and grant permissions.
4. Send a `POST` request to the miscategorization [API endpoint ↗](https://developers.cloudflare.com/api/resources/intel/subresources/miscategorizations/methods/create/). You can find an example below:

Example of a POST request to miscategorization API

```

export URL="https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/miscategorization"

curl -X POST "$URL" \

     -H "Authorization: Bearer $TOKEN" \

     -H "Content-Type:application/json" \

--data '{

  "content_adds": [

  ],

  "content_removes": [

  ],

  "indicator_type": "domain",

  "ip": null,

  "security_adds": [

    115

  ],

  "security_removes": [

  ],

  "url": "cloudflare.com"

}'


```

Explain Code

You should receive a response with the value `"success": true`:

```

{

  "result": "",

  "success": true,

  "errors": [],

  "messages": []

}


```

Once you send the request, the Cloudflare Support team will receive it and will be able to take action.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/intel-apis/","name":"Threat Intelligence APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/security-center/intel-apis/manage-miscategorization-reports/","name":"Manage miscategorization reports"}}]}
```
