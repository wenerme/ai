---
title: Manage miscategorization reports
description: This guide will show you how to manage miscategorization of reports. To complete this guide, you will need to generate an API token.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security-center/intel-apis/manage-miscategorization-reports.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

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
