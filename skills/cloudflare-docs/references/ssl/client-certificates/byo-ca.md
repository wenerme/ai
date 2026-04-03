---
title: Bring your own CA for mTLS
description: Cloudflare mTLS now supports client certificates that have not been issued by Cloudflare CA. Learn how you can bring your own CA and use it with Cloudflare mTLS.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/client-certificates/byo-ca.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bring your own CA for mTLS

This page explains how you can manage client certificates that have not been issued by Cloudflare CA. For a broader overview, refer to the [mTLS at Cloudflare learning path](https://developers.cloudflare.com/learning-paths/mtls/concepts/).

Bring your own CA (BYOCA) is especially useful if you already have mTLS implemented and [client certificates are already installed](https://developers.cloudflare.com/ssl/client-certificates/#how-it-works) on devices.

## Availability

* Currently, you can only manage your uploaded CA via API, and the hostname associations are **not** reflected on the [dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates/).
* This process is only available on Enterprise accounts.
* Each Enterprise account can upload up to five CAs. This quota does not apply to CAs uploaded through [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/).

## CA certificate requirements

When you upload your CA, Cloudflare validates the certificate according to certain requirements.

* The CA certificate can be from a publicly trusted CA or self-signed.
* In the certificate `Basic Constraints`, the attribute `CA` must be set to `TRUE`.
* The certificate must use one of the signature algorithms listed below:  
Allowed signature algorithms  
`x509.SHA1WithRSA`  
`x509.SHA256WithRSA`  
`x509.SHA384WithRSA`  
`x509.SHA512WithRSA`  
`x509.ECDSAWithSHA1`  
`x509.ECDSAWithSHA256`  
`x509.ECDSAWithSHA384`  
`x509.ECDSAWithSHA512`

Note

Uploading the CA private key is only required if you wish to use [Zero Trust's block page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/). For more context on how mTLS works, refer to our [Learning Center ↗](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/).

## Set up mTLS with your CA

1. Use the [Upload mTLS certificate endpoint](https://developers.cloudflare.com/api/resources/mtls%5Fcertificates/methods/create/) to upload the CA root certificate.
* `ca` boolean required  
   * Set to `true` to indicate that the certificate is a CA certificate.
* `certificates` string required  
   * Insert content from the `.pem` file associated with the CA certificate, formatted as a single string with `\n` replacing the line breaks.
* `name` string optional  
   * Indicate a unique name for your CA certificate.
1. Take note of the certificate ID (`id`) that is returned in the API response.
2. Use the [Replace Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/) to enable mTLS in each hostname that should use the CA for mTLS validation. Use the following parameters:
* `hostnames` array required  
   * List the hostnames that will be using the CA for client certificate validation.  
   Warning  
   Submitting an empty array will remove all hostnames associations.
* `mtls_certificate_id` string required  
   * Indicate the certificate ID obtained from the previous step.  
   Warning  
   If no `mtls_certificate_id` is provided, the action will be performed against a Cloudflare Managed CA.
1. (Optional) Since this process is API-only, and hostnames that use your uploaded CA certificate **are not** listed on the dashboard, you can make a [GET request](#list-ca-hostname-associations) to confirm the CA hostname associations.
2. Create a custom rule to enforce client certificate validation. You can do this [via the dashboard](https://developers.cloudflare.com/api-shield/security/mtls/configure/) or [via API](https://developers.cloudflare.com/waf/custom-rules/create-api/).

```

  "expression": "(http.host in {\"<HOSTNAME_1>\" \"<HOSTNAME_2>\"} and not cf.tls_client_auth.cert_verified)",

  "action": "block"


```

Note

When using CNAME, enforce mTLS on the specific hostname where it should be checked. It is not enough to have it set on the CNAME target.

### Multiple CAs for one hostname

There can be multiple CAs (Cloudflare-managed or BYOCA) associated with the same hostname. For BYOCA certificates, the most recently deployed certificate will be prioritized.

If you wish to remove the association from the Cloudflare-managed certificate and only use your BYOCA certificate(s):

* [ Dashboard ](#tab-panel-6527)
* [ API ](#tab-panel-6528)

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. On the **Hosts** section of the **Client Certificates** card, select **Edit**.
3. Select the cross next to the hostname you want to remove. The list of hostname associations will be updated.
4. Select **Save** to confirm.

1. [List the hostname associations](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/get/) **without** the `mtls_certificate_id` parameter.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

List Hostname Associations

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

1. Copy the `hostnames` array returned by the API and update it, removing the hostname that should no longer use the Cloudflare-managed CA.
2. Use the [Replace Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/) **without** the `mtls_certificate_id` parameter to perform the action against the Cloudflare-managed CA. For `hostnames` use the list from the previous step.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Replace Hostname Associations

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "hostnames": [

        "<UPDATED_HOSTNAME_ASSOCIATIONS>"

    ]

  }'


```

## Delete an uploaded CA

If you want to remove a CA that you have previously uploaded, you must first remove any hostname associations that it has.

1. Make a request to the [Replace Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/), with an empty array for `hostnames` and specifying your CA certificate ID in `mtls_certificate_id`:

```

  "hostnames": [],

  "mtls_certificate_id": "<CERTIFICATE_ID>"


```

1. Use the [Delete mTLS certificate endpoint](https://developers.cloudflare.com/api/resources/mtls%5Fcertificates/methods/delete/) to delete the certificate.

## List CA hostname associations

You can also use the [API](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/get/) to list the hostname associations. Make sure you include the query parameter `mtls_certificate_id`, where `mtls_certificate_id` is the certificate ID of the uploaded CA (step 2 above).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

List Hostname Associations

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations?mtls_certificate_id=ID_FROM_STEP_2" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/byo-ca/","name":"Bring your own CA for mTLS"}}]}
```
