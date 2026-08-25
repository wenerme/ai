---
description: Roll back per-hostname Authenticated Origin Pulls to zone-level settings.
title: Roll back per-hostname AOP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Roll back per-hostname AOP

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you need to disable or remove your [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) Authenticated Origin Pulls configuration, follow these steps.

Note

[Global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/), and [per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) are three independent configurations. Enabling or disabling one does not affect the others.

1. Use a [PUT request](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostnames/methods/update/) to disable Authenticated Origin Pulls on the hostname.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `SSL and Certificates Write`
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"config": [
				{
						"enabled": false,
						"cert_id": "<CERT_ID>",
						"hostname": "<YOUR_HOSTNAME>"
				}
		]
	}'
```
2. (Optional) Use a [GET request](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/list/) to obtain a list of the client certificate IDs. You will need the ID of the certificate you want to remove for the following step.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `SSL and Certificates Write`
  * `SSL and Certificates Read`
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames/certificates" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
3. Use the [Delete hostname client certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/delete/) endpoint to remove the certificate you had uploaded.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `SSL and Certificates Write`
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames/certificates/$CERTIFICATE_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/#page","headline":"Roll back per-hostname AOP · Cloudflare SSL/TLS docs","description":"Roll back per-hostname Authenticated Origin Pulls to zone-level settings.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
