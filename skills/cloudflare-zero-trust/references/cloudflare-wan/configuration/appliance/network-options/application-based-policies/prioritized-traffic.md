---
description: Prioritized traffic allows you to define which applications are processed first by Cloudflare One Appliance.
title: Prioritized traffic
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

#  Prioritized traffic

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Prioritized traffic allows you to define which applications Cloudflare One Appliance (formerly Magic WAN Connector) should process first. Applications not in the list will be queued behind prioritized traffic.

Similarly to breakout traffic, prioritized traffic also works via DNS requests inspection.

Caution

 Prioritized traffic will not work for applications that use DNS-over-HTTPS.

## Add an application to your account

Before you can add or remove Prioritized traffic applications to your Cloudflare One Appliance, you need to create an account-level list with the applications that you want to configure. Currently, adding to or modifying this list is only possible via API, through the [managed\_app\_id](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/create/) endpoint.

To add applications to your account:

Send a `POST` request to add new apps to your account.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Magic WAN Write`
* `Magic Transit Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"managed_app_id": "<APP_ID>",
		"name": "<APP_NAME>",
		"type": "<APP_TYPE>"
	}'
```

```json
{
	"result": {
		"account_app_id": "eb09v665c0784618a3e4ba9809258fd4",
		"name": "<APP_NAME>",
		"type": "<APP_TYPE>",
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
[ Go to **Connectors** ↗ ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
1. Select the Cloudflare One Appliance you want to configure > **Edit**.
2. Select **Traffic Steering**.
3. In **Prioritized traffic**, select **Assign application traffic**.
4. Select one or more applications that should bypass Cloudflare filtering from the list. You can also use the search box.
1. Select **Save**.

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

### Delete an application from Cloudflare One Appliance

1. Go to the **Connectors** page.
[ Go to **Connectors** ↗ ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
1. Select the Appliance you want to configure > **Edit**.
2. Select **Traffic Steering**.
3. In **Prioritized traffic**, find the application you want to delete > select the **three dots** next to it > **Remove application traffic**.
4. (Optional) If you have several pages of applications, you can use the search box to quickly find the application you are looking for.

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/#page","headline":"Prioritized traffic · Cloudflare WAN docs","description":"Prioritized traffic allows you to define which applications are processed first by Cloudflare One Appliance.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
