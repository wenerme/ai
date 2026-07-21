---
description: Configure Customer Metadata Boundary to select the region for your logs and analytics.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

#  Get started

Last updated Jul 1, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/data-localization/metadata-boundary/get-started/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can configure the Customer Metadata Boundary to select the region where your logs and analytics are stored. This setting controls where Cloudflare stores traffic metadata that could identify your end users. You can configure it via API or the dashboard.

Currently, this can only be applied at the account-level. If you only want the Metadata Boundary to be applied on a portion of zones beneath the same account, you will have to [move the rest of zones to a new account](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/).

## Configure Customer Metadata Boundary in the dashboard

To configure Customer Metadata Boundary in the dashboard:

1. In the Cloudflare dashboard, go to the **Settings** page.
[ Go to **Configurations** ↗ ](https://dash.cloudflare.com/?to=/:account/configurations)
2. In **Customer Metadata Boundary**, select the region you want to use: `eu` or `us`. Selecting `Global` applies no metadata boundary — the default — meaning Customer Logs may be stored in Cloudflare's core data centers globally.

## Configure Customer Metadata Boundary via API

You can also configure Customer Metadata Boundary via API.

Currently, only SuperAdmins and Admin roles can edit DLS configurations. Use the **Account-level Logs:Read/Write** API permissions for the `/logs/control/cmb` endpoint to read/write Customer Metadata Boundary configurations.

These are some examples of API requests.

Get current regions

Here is an example request using cURL to get current regions (if any):

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Logs Write`
* `Logs Read`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Setting regions

Here is an example request using cURL to set regions:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Logs Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"regions": "eu",
		"allow_out_of_region_access": false
	}'
```

This will overwrite any previous regions. Change will be in effect after several minutes.

Delete regions

Here is an example request using cURL to delete regions:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Logs Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## View or change settings

To view or change your Customer Metadata Boundary setting:

1. In the Cloudflare dashboard, go to the **Settings** page.
[ Go to **Configurations** ↗ ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **Preferences**.
3. Locate the **Customer Metadata Boundary** section.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/metadata-boundary/get-started/#page","headline":"Get started · Cloudflare Data Localization Suite docs","description":"Configure Customer Metadata Boundary to select the region for your logs and analytics.","url":"https://developers.cloudflare.com/data-localization/metadata-boundary/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
```
