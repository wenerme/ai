---
description: Upload and manage certificates for Authenticated Origin Pulls.
title: Manage certificates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage certificates

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the following sections to learn how to manage certificates used with [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) and [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) Authenticated Origin Pulls. [Global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/) uses a Cloudflare-provided certificate and does not require certificate management.

---

## Expired certificates

Cloudflare does not delete client certificates upon expiration unless you send a delete request to the Cloudflare API for the relevant certificate ([Delete a zone-level certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/delete/) or [Delete a hostname-level certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/delete/)). If your origin only accepts a valid client certificate, it will drop requests when the certificate expires.

Make sure you have [notifications](https://developers.cloudflare.com/notifications/notification-available/#ssltls) set up to get alerts 30 days and 14 days before an AOP certificate expires.

---

## Use specialized certificates

To apply different client certificates simultaneously at the zone and hostname level, you can combine zone-level and per-hostname custom certificates.

First, set up [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) using your certificate. Then, upload specialized certificates for [individual hostnames](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/). Per-hostname certificates take precedence over zone-level certificates for the specified hostname.

---

## Replace a certificate without downtime via API

No automatic removal

Cloudflare does not delete client certificates upon expiration unless you send a delete request to the Cloudflare API for the relevant certificate ([Delete a zone-level certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/delete/) or [Delete a hostname-level certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/delete/)).

### Per-hostname

1. [Upload the new certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/create/).
2. [List your certificates](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/list/) and note the ID for the certificate you uploaded.
3. [Enable Authenticated Origin Pulls for the specific hostname](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostnames/methods/update/), using the ID obtained in step 2 to specify the certificate you want to use:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>SSL and Certificates Write</code>

</details>

*Enable or Disable a Hostname for Client Authenticationbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"config": [
				{
						"enabled": true,
						"hostname": "<HOSTNAME>",
						"cert_id": "<CERT_ID>"
				}
		]
	}'
```

Note

If you keep both certificates, the API will state `active` for both but the most recently deployed certificate will be the one enabled and used.

### Zone-level

1. [Upload the new certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/create/).
2. [Check whether new certificate is Active](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/get/).
3. Once certificate is active, [delete the previous certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/delete/).

Note

If you keep both certificates, the API will state `active` for both but the most recently deployed certificate will be the one enabled and used.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/#page","headline":"Manage AOP certificates · Cloudflare SSL/TLS docs","description":"Upload and manage certificates for Authenticated Origin Pulls.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
