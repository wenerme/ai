---
title: TXT
description: Validate domain ownership with a TXT DNS record for certificate issuance.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TXT

TXT record validation requires the creation of a TXT record in the hostname's authoritative DNS.

  
## When to use

Generally, you should use TXT-based DCV when you cannot use [HTTP validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/) or [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

### Non-wildcard custom hostnames

If your custom hostname does not include a wildcard, Cloudflare will always and automatically attempt to complete DCV through [HTTP validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-automatic), even if you have selected **TXT** for your validation method.

This HTTP validation should succeed as long as your customer is pointing to your custom hostname and they do not have any [CAA records](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/#certificate-authority-authorization-caa-records) blocking your chosen certificate authority.

### Wildcard custom hostnames

To validate a certificate on a wildcard custom hostname, you should either set up [Delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/) or [TXT-based DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).

Cloudflare recommends Delegated DCV as it is much simpler for you and your customers.

If you choose TXT-based DCV, Cloudflare requires two TXT DCV tokens - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew.

These two tokens are required because Let’s Encrypt and Google Trust Services follow the [ACME Protocol ↗](https://datatracker.ietf.org/doc/html/rfc8555), which requires one DCV token to be placed for every hostname on the certificate.

This means that - if you choose to use wildcard custom hostnames - you will need a way to share these DCV tokens with your customer.

---

### 1\. Get TXT tokens

Once you [create a new hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/) and choose this validation method, your tokens will be ready after a few seconds.

These tokens can be fetched through the API or the dashboard when the certificates are in a [pending validation](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#new-certificates) state during custom hostname creation or during certificate renewals.

* [ API ](#tab-panel-4537)
* [ Dashboard ](#tab-panel-4538)

You can access these tokens using the API with the [GET custom hostnames endpoint](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/list/).

For example, here are two tokens highlighted in the API response for a **wildcard** custom hostname.

Response

```

{

  "result": [

    {

      "id": "<HOSTNAME_ID>",

      "hostname": "<HOSTNAME>",

      "ssl": {

        "id": "<CERTIFICATE_ID>",

        "type": "dv",

        "method": "txt",

        "status": "pending_validation",

        "validation_records": [

          {

            "status": "pending",

            "txt_name": "_acme-challenge.<HOSTNAME>",

            "txt_value": "gESljTB8fBT1mIuoEASU0qcK-oTd46baarnU_ZGjJIY"

          },

          {

            "status": "pending",

            "txt_name": "_acme-challenge.<HOSTNAME>",

            "txt_value": "Pd8ViwX8KuA78kLbQHGmdEh4tQSpHBRxiNuJOYStEC0"

          }

        ],

        "settings": {

          "min_tls_version": "1.0"

        },

        "bundle_method": "ubiquitous",

        "wildcard": true,

        "certificate_authority": "google"

      },

      "status": "pending",

      "ownership_verification": {

        "type": "txt",

        "name": "_cf-custom-hostname.<HOSTNAME>",

        "value": "ac4a9a9d-5469-44cb-9d76-cea7541c9ff8"

      },

      "ownership_verification_http": {

        "http_url": "http://<HOSTNAME>/.well-known/cf-custom-hostname-challenge/fabdf93c-a4ce-4075-9f3f-c553a5f93bed",

        "http_body": "ac4a9a9d-5469-44cb-9d76-cea7541c9ff8"

      },

      "created_at": "2022-10-06T19:35:33.143257Z"

    }

  ]

}


```

1. In the Cloudflare dashboard, go to the **Custom Hostnames** page.  
[ Go to **Custom Hostnames** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames)
2. Select a hostname.
3. Copy the values for **Certificate validation TXT name** and **Certificate validation TXT value**.

If you had previously created a **wildcard** custom hostname, you would need to copy the values for two different validation TXT records.

### 2\. Share with your customer

You will then need to share these TXT tokens with your customers.

### 3\. Add DNS records (customer)

Your customers should place these at their authoritative DNS provider under the `"_acme-challenge"` DNS label. Once these TXT records are in place, validation and certificate issuance will automatically complete.

Note

These tokens are different than the hostname validation tokens.

If you would like to request an immediate recheck, [rather than wait for the next retry](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/), send a [PATCH request](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) with the same values as your initial `POST` request.

### 4\. (Optional) Fetch new tokens

Your DCV tokens expire after a [certain amount of time](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/reference/token-validity-periods/), depending on your certificate authority.

This means that, if your customers take too long to place their tokens at their authoritative DNS provider, you may need to [get new tokens](#1-get-txt-tokens) and re-share them with your customer.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/","name":"Certificate management"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/","name":"Issue and validate certificates"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/","name":"Validate"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/","name":"TXT"}}]}
```
