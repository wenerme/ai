---
description: Learn how to create a token to perform actions using the Cloudflare API.
title: Create API token
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Create API token

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Prerequisite

Before you begin, [find your zone and account IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

1. Determine if you want a user token or an [Account API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/). Use Account API tokens if you prefer service tokens that are not associated with users and your [desired API endpoints are compatible](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#compatibility-matrix).
2. From the [Cloudflare dashboard ↗](https://dash.cloudflare.com/profile/api-tokens/), go to **My Profile** \> **API Tokens** for user tokens. For Account Tokens, go to **Manage Account** \> **API Tokens**.
3. Select **Create Token**.
4. Select a template from the available [API token templates](https://developers.cloudflare.com/fundamentals/api/reference/template/) or create a custom token. The following example uses the **Edit zone DNS** template.
5. Add or edit the token name to describe why or how the token is used. Templates are prefilled with a token name and permissions.
![Token template overview screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1677,height=1328,format=webp/_astro/template-customize.Bt5BDoKm.png)
6. Modify the token's permissions. After selecting a permissions group (_Account_, _User_, or _Zone_), choose what level of access to grant the token. Most groups offer `Edit` or `Read` options. `Edit` is full CRUDL (create, read, update, delete, list) access, while `Read` is the read permission and list where appropriate. Refer to the [available token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) for more information.
7. Select which resources the token is authorized to access. For example, granting `Zone DNS Read` access to a zone `example.com` will allow the token to read DNS records only for that specific zone. Any other zone will return an error for DNS record reads operations. Any other operation on that zone will also return an error.
8. (Optional) Restrict how a token is used in the **Client IP Address Filtering** and **TTL (time to live)** fields.
9. Select **Continue to summary**.
10. Review the token summary. Select **Edit token** to make adjustments. You can also edit a token after creation.
![Token summary screen displaying the resources and permissions selected](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1202,height=884,format=webp/_astro/token-summary.BFSJoL8C.png)
1. Select **Create Token** to generate the token's secret.
2. Copy the secret to a secure place.

Warning

The token secret is **only shown once**. Do not store the secret in plaintext where others can access it. Anyone with this token can perform the authorized actions against the resources that the token has access to.

![Token creation completion screen displaying your API token and the curl command to test your token](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1204,height=940,format=webp/_astro/token-complete.Dg4S1W72.png)

The token secret page also includes an example command to test the token. Use the `/user/tokens/verify` endpoint to fetch the current status of the given token.

```bash
curl "https://api.cloudflare.com/client/v4/user/tokens/verify" \
--header "Authorization: Bearer <API_TOKEN>"
```

The result:

```json
{
	"result": {
		"id": "100bf38cc8393103870917dd535e0628",
		"status": "active"
	},
	"success": true,
	"errors": [],
	"messages": [
		{
			"code": 10000,
			"message": "This API Token is valid and active",
			"type": null
		}
	]
}
```

New API tokens use the `cfut_` prefixed [scannable format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which allows credential scanning tools to detect leaked tokens.

With this you have successfully created an API token and can start working with the Cloudflare API. After creating your first API token, you can create additional API tokens [via the API](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/get-started/create-token/#page","headline":"Create API token · Cloudflare Fundamentals docs","description":"Learn how to create a token to perform actions using the Cloudflare API.","url":"https://developers.cloudflare.com/fundamentals/api/get-started/create-token/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
