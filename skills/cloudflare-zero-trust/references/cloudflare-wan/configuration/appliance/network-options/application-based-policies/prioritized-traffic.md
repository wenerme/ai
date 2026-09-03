---
description: Prioritized traffic allows you to define which applications are processed first by Cloudflare One Appliance.
title: Prioritized traffic
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Prioritized traffic

Last updated Sep 2, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Prioritized traffic allows you to define which applications Cloudflare One Appliance (formerly Magic WAN Connector) should process first. Applications not in the list will be queued behind prioritized traffic.

Similarly to breakout traffic, prioritized traffic also works via DNS requests inspection.

Caution

Prioritized traffic will not work for applications that use DNS-over-HTTPS.

## Add an application to your account

Before you can add or remove Prioritized traffic applications to your Cloudflare One Appliance, you need an account-level list with the applications that you want to configure. This list contains two kinds of applications:

* **Cloudflare-managed applications** — Cloudflare's built-in catalog of recognized applications. These already exist in your account and do not need to be created. Select them directly when assigning application traffic.
* **Custom applications** — applications you define by **hostname**, **IP subnet**, and/or **source subnet**. You can create, edit, and delete custom applications directly from the dashboard or through the [Create an account app](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/create/) endpoint.

### Create, edit, or delete a custom application

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to configure > **Edit**.
3. Select **Traffic Steering**.
4. In **Prioritized traffic**, select **Assign application traffic**.
5. In **Custom applications**, select **Add** to create a new custom application, and enter:
  * **Name** — a display name for the application.
  * **Category** — an optional group label, such as `Productivity` or `Video conferencing`.
  * At least one of **Hostnames**, **IP subnets**, or **Source subnets** — the traffic that identifies this application. Hostnames must be valid FQDNs (for example `auth.example.com`). IP subnets and source subnets must be valid IPv4 CIDRs (for example `10.0.0.0/24`). A single address needs a `/32` suffix. IPv6 is not yet supported.
6. Select **Add application**.
7. To change or remove an existing custom application, select the **three dots** next to it in the **Custom applications** table, then **Edit** or **Delete**.

Send a `POST` request to create a custom application in your account. The following example uses all three optional match criteria:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Magic WAN Write`
* `Magic Transit Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Example application",
		"type": "Productivity",
		"hostnames": [
				"auth.example.com"
		],
		"ip_subnets": [
				"192.0.2.0/24"
		],
		"source_subnets": [
				"10.0.0.0/24"
		]
	}'
```

```json
{
	"result": {
		"account_app_id": "eb09v665c0784618a3e4ba9809258fd4",
		"name": "Example application",
		"type": "Productivity",
		"hostnames": ["auth.example.com"],
		"ip_subnets": ["192.0.2.0/24"],
		"source_subnets": ["10.0.0.0/24"]
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

You can now add this new app to the Prioritized traffic list in your Cloudflare One Appliance.

### Add an application to Cloudflare One Appliance

You need to configure Prioritized traffic applications for each of your existing sites, as this is a per-site configuration.

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to configure > **Edit**.
3. Select **Traffic Steering**.
4. In **Prioritized traffic**, select **Assign application traffic**.
5. Select one or more applications that should be processed first, from either **Custom applications** or **Cloudflare-managed applications**. You can also use the search box, or select **Add** to define a new custom application without leaving this panel — refer to [Create, edit, or delete a custom application](#create-edit-or-delete-a-custom-application).
6. Select **Save**.

The traffic for the application you chose is now processed first by Connector.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

1. Send a `GET` [request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/list/) to list the applications associated with an account.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Magic WAN Write`
  * `Magic WAN Read`
  * `Magic Transit Read`
  * `Magic Transit Write`
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
	{
		"result": [
			{
				"managed_app_id": "<APP_ID>",
				"name": "<APP_NAME>",
				"type": "File Sharing",
				"hostnames": [
					"<app_name.com>",
					"<app-name.info>"
				]
			}
		]
	}
```
Take note of the `"managed_app_id"` value for any application you want to add.
2. Send a `POST` request to add new apps to the Prioritized traffic policy.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Magic WAN Write`
  * `Magic Transit Write`
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"managed_app_id": "<MANAGED_APP_ID>",
		"breakout": true
	}'
```
```json
{
	"result": {
		"account_app_id": "<APP_ID>",
		"name": "<APP_NAME>",
		"type": "<BREAKOUT_OR_PRIORITY>"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Custom applications defined with **Source subnets** can also be marked as prioritized this way. Refer to [Breakout by source](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/#breakout-by-source) for the full set of source-based match criteria.

### Delete an application from Cloudflare One Appliance

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Appliance you want to configure > **Edit**.
3. Select **Traffic Steering**.
4. In **Prioritized traffic**, find the application you want to delete > select the **three dots** next to it > **Remove application traffic**.
5. (Optional) If you have several pages of applications, you can use the search box to quickly find the application you are looking for.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

You need to delete Prioritized traffic applications for each of your existing sites, as this is a per-site configuration.

1. Send a [GET request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/list/) to list the applications associated with a site.
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `Magic WAN Write`
  * `Magic WAN Read`
  * `Magic Transit Read`
  * `Magic Transit Write`
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
	{
		"result": [
			{
				"id": "<APP_ID>",
				"site_id": "<SITE_ID>",
				"managed_app_id": "<APP_NAME>",
				"breakout": true
			}
		]
	}
```
Take note of the `"id"` value for the application that you want to delete.
2. Send a `DELETE` request to delete an application from the Prioritized traffic policy.
```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/magic/sites/%7Bsite_id%7D/app_configs/%7Bid%7D" \
	--request DELETE
```
```json
{
		"result": {
				"id": "<APP_ID>",
				"site_id": "<SITE_ID>",
				"managed_app_id": "<APP_NAME>",
				"breakout": true
		},
		"success": true,
		"errors": [],
		"messages": []
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/#page","headline":"Prioritized traffic · Cloudflare WAN docs","description":"Prioritized traffic allows you to define which applications are processed first by Cloudflare One Appliance.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
