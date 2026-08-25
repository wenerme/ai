---
description: Set the minimum TLS version for connections to your domain.
title: Minimum TLS Version
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Minimum TLS Version

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Minimum TLS Version only allows HTTPS connections from visitors that support the selected TLS protocol version or newer.

For example, if TLS 1.1 is selected, visitors attempting to connect using TLS 1.0 will be rejected. Visitors attempting to connect using TLS 1.1, 1.2, or 1.3 ([if enabled](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/)) will be allowed to connect.

Note

If you are looking to restrict cipher suites, refer to [Customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/). For guidance on which TLS version to use, refer to [TLS protocols](https://developers.cloudflare.com/ssl/reference/protocols/).

## Availability

|              | Free                                                                                                                                | Pro                                                                                                                                 | Business                                                                                                                            | Enterprise                                                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Availability | Yes                                                                                                                                 | Yes                                                                                                                                 | Yes                                                                                                                                 | Yes                                                                                                                                 |
| Per-hostname | Included with [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) | Included with [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) | Included with [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) | Included with [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) |

It is not possible to configure minimum TLS version for [Cloudflare Pages](https://developers.cloudflare.com/pages/) hostnames.

## How to disable TLS 1.0

You can disable TLS 1.0 by choosing a higher minimum TLS version.

All users can apply this configuration to all hostnames in their zones following the steps under [zone-level](#zone-level).

If you have an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/#advanced-certificate-manager) subscription, you also have the option to disable TLS 1.0 (or other versions) with a [per-hostname](#per-hostname) setup.

## Setup

Caution

The Minimum TLS version that you set up following these steps does not apply to [R2](https://developers.cloudflare.com/r2/) custom domains. To control the TLS version for R2 custom domains, refer to the [custom domains documentation](https://developers.cloudflare.com/r2/buckets/public-buckets/#minimum-tls-version).

### Zone-level

To manage the TLS version applied to your whole zone when proxied through Cloudflare:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Minimum TLS Version**, select an option.

Use the [Edit zone setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) endpoint with `min_tls_version` as the setting name in the URI path, and specify your preferred minimum version in the `value` field.

In the following example, the minimum TLS version for the zone will be set to `1.2`. Replace the zone ID and API token placeholders with your information, and adjust the `value` field with your chosen TLS version.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/min_tls_version" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"id": "min_tls_version",
		"value": "1.2"
	}'
```

### Per-hostname

[Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) users also have the option to specify minimum TLS versions per specific hostnames in their Cloudflare zone.

This is currently only available via the API:

* Use the [Edit TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/update/) endpoint to specify different values for `min_tls_version`.
* Use the [Delete TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/delete/) endpoint to clear previously defined `min_tls_version` setting.

Cloudflare uses the [hostname priority logic](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/) to determine which setting to apply.

In the following example, the minimum TLS version for a specific hostname will be set to `1.2`. Replace the zone ID, hostname, and authentication placeholders with your information, and adjust the `value` field with your chosen TLS version.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hostnames/settings/min_tls_version/$HOSTNAME" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"value": "1.2"
	}'
```

### Cloudflare for SaaS

If you are a SaaS provider looking to configure minimum TLS version for your custom hostnames, refer to the Cloudflare for SaaS [TLS management](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#minimum-tls-version).

## Test supported TLS versions

To test supported TLS versions, attempt a request to your website or application while specifying a TLS version.

For example, to test TLS 1.1, use the `curl` command below. Replace `www.example.com` with your Cloudflare domain and hostname.

```sh
curl https://www.example.com -svo /dev/null --tls-max 1.1
```

If the TLS version you are testing is blocked by Cloudflare, the TLS handshake is not completed and returns an error:

`* error:1400442E:SSL routines:CONNECT_CR_SRVR_HELLO:tlsv1 alert`

Note

Local VPN or a device security client may prevent insecure connections using legacy protocols like TLS 1.0\. Make sure to disable such network or security client before running the test on your device.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/#page","headline":"Minimum TLS Version · Cloudflare SSL/TLS docs","description":"Set the minimum TLS version for connections to your domain.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
