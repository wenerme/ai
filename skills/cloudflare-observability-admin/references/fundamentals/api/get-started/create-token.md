---
description: Learn how to create a token to perform actions using the Cloudflare API.
title: Create API token
image: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/og.png?v=814107889d79f2df
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Create API token

Last updated Nov 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Prerequisite

Before you begin, [find your zone and account IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

1. Determine if you want a user token or an [Account API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/). Use Account API tokens if you prefer service tokens that are not associated with users and your [desired API endpoints are compatible](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#compatibility-matrix).
2. From the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/profile/api-tokens/), go to **My Profile** > **API Tokens** for user tokens. For Account Tokens, go to **Manage Account** > **API Tokens**.
3. Select **Create Token**.
4. Add a token name to describe why or how the token is used.
5. Select a template from the available [API token templates](https://developers.cloudflare.com/fundamentals/api/reference/template/) or start from scratch. Templates include policies with predefined permissions. The following example uses the **Edit zone DNS** template.![Token template overview screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2953,height=1955,format=webp/_astro/template-customize.BZQKf5iV.png)
6. Create a policy to organize the token's permissions. Select a policy type (*Account*, *User*, or *Zone*), then select resource rules within the policy to specify which resources the permissions apply to, such as specific accounts or zones.
7. Choose the permissions to grant within the policy. Most permissions offer `Edit` or `Read` access. `Edit` is full CRUDL (create, read, update, delete, list) access, while `Read` is the read permission and list where appropriate. For example, `Zone DNS Read` for `example.com` allows the token to read DNS records only for that zone. Refer to the [available token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) for more information.
8. (Optional) Restrict how a token is used in the **Token expiration** and **Client IP Address Filtering** fields.
9. Select **Continue to summary**.
10. Review the token summary. Select **Back** to make adjustments. You can also edit a token after creation.

![Token summary screen displaying the resources and permissions selected](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2953,height=1949,format=webp/_astro/token-summary.B2YcuQmd.png)

11. Select **Create Token** to generate the token's secret.
12. Copy the secret to a secure place.

Warning

The token secret is **only shown once**. Do not store the secret in plaintext where others can access it. Anyone with this token can perform the authorized actions against the resources that the token has access to.

![Token creation completion screen displaying your API token and the curl command to test your token](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2953,height=1955,format=webp/_astro/token-complete.ethtDojh.png)

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/get-started/create-token/#page","headline":"Create API token","description":"Learn how to create a token to perform actions using the Cloudflare API.","url":"https://developers.cloudflare.com/fundamentals/api/get-started/create-token/","inLanguage":"en","image":"https://developers.cloudflare.com/fundamentals/api/get-started/create-token/og.png?v=814107889d79f2df","dateModified":"2026-11-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
