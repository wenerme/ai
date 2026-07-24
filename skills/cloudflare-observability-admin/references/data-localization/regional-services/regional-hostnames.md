---
description: Regionalize proxied hostnames by assigning a region through the dashboard or Regional Hostnames API.
title: Regional Hostnames
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Regional Hostnames

Last updated Jul 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/regional-services/regional-hostnames/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Interested customers need to contact their account team to enable DNS Regionalisation.

Regional Hostnames are the most common way to use [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/): you assign a region to a proxied hostname, and Cloudflare steers traffic for that hostname — using its shared anycast IP addresses — to in-region data centers for TLS termination and processing. For other ways to regionalize traffic, refer to [Ways to use Regional Services](https://developers.cloudflare.com/data-localization/regional-services/#ways-to-use-regional-services).

Regional Hostnames support [managed regions](https://developers.cloudflare.com/data-localization/region-support/#region-types). If you need a custom region, use [Regionalized Spectrum Applications](https://developers.cloudflare.com/data-localization/regional-services/spectrum-applications/) or [Regionalized IP Bindings](https://developers.cloudflare.com/data-localization/regional-services/ip-bindings/) instead.

You can configure Regional Hostnames through the dashboard or via API.

## Configure Regional Services in the dashboard

To use Regional Services, you need to first create a DNS record in the dashboard:

1. In the Cloudflare dashboard, go to the **Records** page.
[Go to **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Follow these steps to [create a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).
3. From the **Region** dropdown, select the region you would like to use on your domain. This value will be applied to all DNS records on the same hostname. This means that if you have two DNS records of the same hostname and change the region for one of them, both records will have the same region.

Note

Some regions may not appear on the dropdown because newly announced regions mentioned in the [blog post ↗](https://blog.cloudflare.com/expanding-regional-services-configuration-flexibility-for-customers) are subject to approval by Cloudflare's internal team. For more information and entitlement reach out to your account team.

Refer to the table on [Available regions and product support](https://developers.cloudflare.com/data-localization/region-support/) for the complete list of available regions, their definitions and product support

## Configure Regional Services via API

You can also use Regional Services via API.

Users with the Super Administrator, Administrator, or Domain Administrator roles can edit Regional Services configurations. The Domain Administrator Read Only role does not currently include read access to Regional Services configurations. Use the **DNS: Read/Write** API permission for the `/addressing/` endpoints to read or write Regional Services configurations.

These are some examples of API requests.

List all the available regions

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `DNS Read`
* `DNS Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/regional_hostnames/regions" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"result": [
		{
			"key": "ca",
			"label": "Canada"
		},
		{
			"key": "eu",
			"label": "Europe"
		}
	],
	"messages": []
}
```

Create a new regional hostname entry

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `DNS Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"hostname": "ca.regional.ipam.rocks",
		"region_key": "ca"
	}'
```

```json
{
	"success": true,
	"errors": [],
	"result": {
		"hostname": "ca.regional.ipam.rocks",
		"region_key": "ca",
		"created_on": "2023-01-13T23:59:45.276558Z"
	},
	"messages": []
}
```

List all regional hostnames for a zone or get a specific one

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `DNS Read`
* `DNS Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"result": [
		{
			"hostname": "ca.regional.ipam.rocks",
			"region_key": "ca",
			"created_on": "2023-01-14T00:47:57.060267Z"
		}
	],
	"messages": []
}
```

List all regional hostnames for a specific zone

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `DNS Read`
* `DNS Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"result": {
		"hostname": "ca.regional.ipam.rocks",
		"region_key": "ca",
		"created_on": "2023-01-13T23:59:45.276558Z"
	},
	"messages": []
}
```

Patch the region for a specific hostname

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `DNS Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"region_key": "eu"
	}'
```

```json
{
	"success": true,
	"errors": [],
	"result": {
		"hostname": "ca.regional.ipam.rocks",
		"region_key": "eu",
		"created_on": "2023-01-13T23:59:45.276558Z"
	},
	"messages": []
}
```

Delete the region configuration

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `DNS Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"result": null,
	"messages": []
}
```

## Verify regional map for Zero Trust

To verify that your regional map is being applied correctly, check the `IngressColoName` field in your [Zero Trust Network Session logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/#ingresscoloname). This field shows the name of the Cloudflare data center where traffic ingressed. Since regionalization is applied upstream from Gateway, the ingress data center will be located within your configured regional map, confirming that traffic is being processed in the correct region.

## Terraform support

You can also configure Regional Services using Terraform. For more details, refer to the [cloudflare\_regional\_hostname resource ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/regional%5Fhostname) in the Terraform documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/regional-services/regional-hostnames/#page","headline":"Regional Hostnames · Cloudflare Data Localization Suite docs","description":"Regionalize proxied hostnames by assigning a region through the dashboard or Regional Hostnames API.","url":"https://developers.cloudflare.com/data-localization/regional-services/regional-hostnames/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
```
