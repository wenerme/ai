---
title: Pre-validation
description: Verify domain ownership before customer traffic begins proxying through Cloudflare.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pre-validation

Pre-validation methods help verify domain ownership before your customer's traffic is proxying through Cloudflare.

## Use when

Use pre-validation methods when your customers cannot tolerate any downtime, which often occurs with production domains.

The downside is that these methods require an additional setup step for your customers. Especially if you already need them to add something to their domain for [certificate validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/), pre-validation might make their onboarding more complicated.

If your customers can tolerate a bit of downtime and you want their setup to be simpler, review our [real-time validation methods](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/).

## How to

### TXT records

TXT validation is when your customer adds a `TXT` record to their authoritative DNS to verify domain ownership.

Note

If your customer cannot update their authoritative DNS, you could also use [HTTP validation](#http-tokens).

To set up `TXT` validation:

1. When you [create a custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/), save the `ownership_verification` information.  
```  
{  
"result": [  
    {  
    "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",  
    "hostname": "app.example.com",  
    // ...  
    "status": "pending",  
    "verification_errors": ["custom hostname does not CNAME to this zone."],  
    "ownership_verification": {  
        "type": "txt",  
        "name": "_cf-custom-hostname.app.example.com",  
        "value": "0e2d5a7f-1548-4f27-8c05-b577cb14f4ec"  
    },  
    "created_at": "2020-03-04T19:04:02.705068Z"  
    }  
]  
}  
```
2. Have your customer add a `TXT` record with that `name` and `value` at their authoritative DNS provider.
3. After a few minutes, you will see the hostname status become **Active** in the UI.
4. Once you activate the custom hostname, your customer can remove the `TXT` record.

### HTTP tokens

HTTP validation is when you or your customer places an HTTP token on their origin server to verify domain ownership.

To set up HTTP validation:

When you [create a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/) using the API, Cloudflare provides an HTTP `ownership_verification` record in the response.

To get and use the `ownership_verification` record:

1. Make an API call to [create a Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/).
2. In the response, copy the `http_url` and `http_body` from the `ownership_verification_http` object:  
Example response (truncated)  
```  
{  
  "result": [  
    {  
      "id": "24c8c68e-bec2-49b6-868e-f06373780630",  
      "hostname": "app.example.com",  
      // ...  
      "ownership_verification_http": {  
          "http_url": "http://app.example.com/.well-known/cf-custom-hostname-challenge/24c8c68e-bec2-49b6-868e-f06373780630",  
          "http_body": "48b409f6-c886-406b-8cbc-0fbf59983555"  
      },  
      "created_at": "2020-03-04T20:06:04.117122Z"  
    }  
  ]  
}  
```
3. Have your customer place the `http_url` and `http_body` on their origin web server.  
Example response (truncated)  
```  
location "/.well-known/cf-custom-hostname-challenge/24c8c68e-bec2-49b6-868e-f06373780630" {  
    return 200 "48b409f6-c886-406b-8cbc-0fbf59983555\n";  
}  
```  
Cloudflare will access this token by sending `GET` requests to the `http_url` using `User-Agent: Cloudflare Custom Hostname Verification`.  
Note  
If you can serve these tokens on behalf of your customers, you can simplify their overall setup.
4. After a few minutes, you will see the hostname status become **Active** in the UI.
5. Once the hostname is active, your customer can remove the token from their origin server.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/","name":"Hostname validation"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/","name":"Pre-validation"}}]}
```
