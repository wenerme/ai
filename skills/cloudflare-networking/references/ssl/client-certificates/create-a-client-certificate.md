---
description: Generate a client certificate using the dashboard or API.
title: Create a client certificate
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a client certificate

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/client-certificates/create-a-client-certificate/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use Cloudflare's public key infrastructure (PKI) to create client certificates issued from a Cloudflare-managed CA. You can then complete your mTLS configuration, as explained in [How mTLS works](https://developers.cloudflare.com/ssl/client-certificates/#how-it-works).

Cloudflare-issued or BYOCA

The following process only refers to certificates issued from the Cloudflare-managed CA. To bring your own CA, refer to [BYOCA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/) instead. Only available to Enterprise accounts.

## Quota and limits

By default, each zone allows up to **100 active client certificates** issued by the Cloudflare-managed CA. Only active certificates count toward this limit — revoking a certificate frees its slot immediately.

| Plan                         | Default limit    | Increase available    |
| ---------------------------- | ---------------- | --------------------- |
| Free, Pro, Business          | 100 per zone     | No                    |
| Enterprise (with API Shield) | 100,000 per zone | Yes, via account team |

If you reach the limit, the API returns error `1445` with the message `Hit maximum certificate allocation: 100 certificates per zone are allowed`. To request an increase, contact your account team. Increases require an Enterprise plan with API Shield.

High-churn workloads

If your use case involves short-lived or frequently rotated certificates — for example, one certificate per ephemeral device or session — the 100-certificate default can fill up quickly.

Revoke certificates immediately when a device or session ends — revoking frees the quota slot right away. If you need to issue a large volume of certificates, use [BYOCA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/) instead. With BYOCA, Cloudflare stores only your CA certificate, not individual issued certificates, so there is no per-certificate inventory limit.

To create a client certificate on the Cloudflare dashboard:

1. Go to the **Client Certificates** page.
[Go to **Client Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select **Add Certificate**. The Cloudflare-managed CA is the default **Certificate Authority**.
3. Fill in the required fields. You can choose one of the following options:
* Generate a private key and Certificate Signing Request (CSR) with Cloudflare.
* Use your own private key and CSR. This option allows you to also [label client certificates](https://developers.cloudflare.com/ssl/client-certificates/label-client-certificate/).
Example OpenSSL command
To generate and use your own CSR, you can run a command like the following:
```sh
openssl req -new -newkey rsa:2048 -nodes -keyout client1.key -out client1.csr -subj '/C=GB/ST=London/L=London/O=Organization/CN=CommonName'
```
1. Select a value for **Certificate Validity**, and choose **Continue**.
2. Make sure to copy the certificate and private key as they will no longer be displayed after creation.
3. (Optional) Specify hostnames where you wish to [enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/).
When associating hostnames via this form, they should be in fully qualified domain name (FQDN) format and correspond to a hostname that exists in the zone you are in. For example, if you are in zone `example.com`, you can specify `host.example.com` but not `host.example.net`.
4. Select **Save** to confirm.

## Next steps

After creating the client certificate, make sure it is installed on the client devices and [enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/) for each hostname that should require a certificate from clients.

Refer to our [mTLS at Cloudflare learning path](https://developers.cloudflare.com/learning-paths/mtls/concepts/) for further context.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/create-a-client-certificate/#page","headline":"Create a client certificate · Cloudflare SSL/TLS docs","description":"Generate a client certificate using the dashboard or API.","url":"https://developers.cloudflare.com/ssl/client-certificates/create-a-client-certificate/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
```
