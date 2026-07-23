---
description: Learn how to create custom hostnames.
title: Create custom hostnames
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Create custom hostnames

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

There are several required steps before a custom hostname can become active. For more details, refer to our [Get started guide](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).

Zone name restriction

Do not configure a custom hostname which matches the zone name. For example, if your SaaS zone is `example.com`, do not create a custom hostname named `example.com`.

To create a custom hostname:

1. In the Cloudflare dashboard, go to the **Custom Hostnames** page.
[Go to **Custom Hostnames** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames)
2. Select **Add Custom Hostname**.
3. Add your customer's hostname `app.customer.com` and set the relevant options, including:

  * Select the [minimum TLS version](https://developers.cloudflare.com/ssl/reference/protocols/).
  * Select the [validation method](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/).
  * Define a [custom origin server](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/).
  * Enterprise customers can also select the [certificate authority (CA)](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), [upload a custom certificate](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/uploading-certificates/), or enable wildcard, which adds a `*.<custom-hostname>` SAN to the custom hostname certificate. For more details, refer to [Hostname priority](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/#hostname-priority) and [Plans](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).
4. Select **Add Custom Hostname**.

Default behavior

When you create a custom hostname:

* If you issue a custom hostname certificate with wildcards enabled, you cannot customize TLS settings for these wildcard hostnames.
* If you do not specify the **Minimum TLS Version**, it defaults to the zone's Minimum TLS Version. You can still [edit this setting](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#minimum-tls-version) after creation.

1. To create a custom hostname using the API, use the [Create Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/) endpoint.

  * Only Enterprise customers can use the `certificate_authority` parameter to specify a CA, the `custom_certificate`/`custom_cert_bundle` to upload a custom certificate, or `wildcard` to create a wildcard certificate. Refer to [Plans](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).
  * You can leave the `certificate_authority` parameter empty to set it to "default CA". With this option, Cloudflare checks the CAA records before requesting the certificates, which helps ensure the certificates can be issued from the CA.
2. For the newly created custom hostname, the `POST` response may not return the DCV validation token `validation_records`. It is recommended to make a second [GET command](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/list/) (with a delay) to retrieve these details.

The response contains the complete definition of the new custom hostname.

Default behavior

When you create a custom hostname:

* If you issue a custom hostname certificate with wildcards enabled, you cannot customize TLS settings for these wildcard hostnames.
* If you do not specify the **Minimum TLS Version**, it defaults to the zone's Minimum TLS Version. You can still [edit this setting](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#minimum-tls-version) after creation.

For each custom hostname, Cloudflare issues two certificates bundled in chains that maximize browser compatibility (unless you [upload custom certificates](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/uploading-certificates/)).

The primary certificate uses a `P-256` key, is `SHA-2/ECDSA` signed, and will be presented to browsers that support elliptic curve cryptography (ECC). The secondary or fallback certificate uses an `RSA 2048-bit` key, is `SHA-2/RSA` signed, and will be presented to browsers that do not support ECC.

## Hostnames over 64 characters

The Common Name (CN) restriction establishes a limit of 64 characters ([RFC 5280 ↗](https://www.rfc-editor.org/rfc/rfc5280.html)). If you have a hostname that exceeds this length, you can set `cloudflare_branding` to `true` when creating your custom hostnames [via API](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/).

```txt

"ssl": {
    "cloudflare_branding": true
  }
```

Cloudflare branding means that `sni.cloudflaressl.com` will be added as the certificate Common Name (CN) and the long hostname will be included as a part of the Subject Alternative Name (SAN).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/#page","headline":"Create custom hostnames · Cloudflare for Platforms docs","description":"Learn how to create custom hostnames.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
