---
description: Bind a BYOIP prefix to a region so traffic to those IP addresses is processed in-region.
title: Regionalized IP Bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Regionalized IP Bindings

Last updated Jul 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/regional-services/ip-bindings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Regionalized IP Bindings requires the Regional Services and Regional Services for BYOIP entitlements. Contact your account team to enable them.

Regionalized IP Bindings let you regionalize traffic at the IP layer for prefixes you bring to Cloudflare through [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/). You bind a CIDR from one of your prefixes to a region, and Cloudflare processes traffic destined for those IP addresses only within the data centers in that region.

This complements the other ways to use [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/): where [Regional Hostnames](https://developers.cloudflare.com/data-localization/regional-services/regional-hostnames/) regionalize traffic by hostname, Regionalized IP Bindings regionalize traffic by IP prefix — ideal for address-map deployments and any service you address by IP rather than hostname. Because bindings are managed entirely through the API, you can regionalize broad configurations yourself once your entitlements are enabled, without per-zone setup from your account team.

## How it works

A prefix binding maps a CIDR (within a BYOIP prefix you own) to a [region key](#list-available-regions) (for example, `us` or `eu`). After Cloudflare provisions the binding, traffic to addresses in that CIDR terminates TLS and is processed only inside the configured region, following the same in-region processing model described in [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/).

Bindings are managed through the Data Localization Suite API under `/accounts/{account_id}/dls/`.

## Choose which CIDR to bind

A binding covers a range of addresses within a prefix, not just a single address — you do **not** need to create one binding per IP address. The `cidr` you bind must:

* Fall within the prefix identified by `prefix_id`.
* Be **more specific than the prefix itself** — a sub-range within it. For example, within a `/24` prefix you can bind any range from a `/25` down to a single address (a `/32` for IPv4, or a `/128` for IPv6). Binding the entire prefix (the full `/24`) is rejected with a [conflict error](#handle-a-conflict-error), because the whole prefix range is already in use once Cloudflare advertises it.

How you choose the CIDR depends on how you want to split the prefix across regions:

* **One region for the whole prefix** — cover the prefix with sub-ranges that all point to the same region. For example, bind both `203.0.113.0/25` and `203.0.113.128/25` to `eu` to regionalize every address in a `/24`.
* **Different regions for different addresses** — bind each range to the region you want (for example, `203.0.113.0/25` to `eu` and `203.0.113.128/25` to `us`). Cloudflare applies the most specific binding that matches a given address, so a narrower binding takes precedence over a broader one that overlaps it.

Each CIDR can have only one binding. If you try to create a second binding for a CIDR that is already bound, the API returns a [conflict error](#handle-a-conflict-error). To change the region for an existing binding, [update it](#update-the-region-for-a-binding) instead of creating a new one.

## Prerequisites

Before you create a binding, make sure that:

* Your account has both the **Regional Services** and **Regional Services for BYOIP** entitlements enabled. Contact your account team to enable them.
* You have [onboarded a BYOIP prefix](https://developers.cloudflare.com/byoip/) to Cloudflare and know its prefix ID.
* The region you want to use exists for your account. Refer to [List available regions](#list-available-regions).
* Your [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) has the required permissions. Refer to [Required API token permissions](#required-api-token-permissions).

## Required API token permissions

These endpoints are authorized at the account level. The permissions you need depend on the operation:

| Operation                                        | Required token permissions                  |
| ------------------------------------------------ | ------------------------------------------- |
| List regions, get a region, list or get bindings | **DLS: Read**                               |
| Create, update, or delete a prefix binding       | **DLS: Write** _and_ **IP Prefixes: Write** |

Write operations require **IP Prefixes: Write** in addition to **DLS: Write** because the binding is created against a BYOIP prefix that you own in [Addressing](https://developers.cloudflare.com/byoip/) — Cloudflare verifies that you have permission to modify that prefix. A token with only **DLS: Write** can read regions and bindings but will be rejected when it tries to create or change a binding.

The **Super Administrator** and **Administrator** roles include all of these permissions. A custom role works as long as it includes the permission groups above.

## List available regions

Each binding references a region by its `region_key` (for example, `us` or `eu`). List the regions available to your account to find a valid key.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regions" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": [
		{
			"id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
			"name": "Europe",
			"region_key": "eu",
			"created_on": "2026-01-13T23:59:45.276558Z",
			"modified_on": "2026-01-13T23:59:45.276558Z",
			"version": 1,
			"version_created_on": "2026-01-13T23:59:45.276558Z"
		}
	],
	"result_info": {
		"count": 1,
		"per_page": 25,
		"cursor": ""
	}
}
```

Use the `type` query parameter (`managed` or `custom`) to filter the results by [region type](https://developers.cloudflare.com/data-localization/region-support/#region-types). Results are paginated — pass the `cursor` value from a response to fetch the next page.

Get a single region

Retrieve a region by its `region_key` or ID.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regions/eu" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Create a prefix binding

Bind a CIDR from one of your BYOIP prefixes to a region. The `cidr` must fall within the prefix identified by `prefix_id` and be [more specific than the prefix itself](#choose-which-cidr-to-bind).

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regional_services/prefix_bindings" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"prefix_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
		"cidr": "203.0.113.0/25",
		"region_key": "eu"
	}'
```

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"id": "f0e1d2c3-b4a5-6789-0abc-def123456789",
		"prefix_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
		"cidr": "203.0.113.0/25",
		"region_key": "eu"
	}
}
```

Note

After you create or change a binding, it can take a few hours for the change to propagate across Cloudflare's network before traffic is regionalized at the edge.

Connectivity to these addresses is not interrupted while the binding propagates — existing traffic continues to be served. However, a binding must finish propagating and become **active** before you can add its addresses to an [address map](https://developers.cloudflare.com/byoip/address-maps/) (including creating a new address map that contains them). Until the binding is active, those operations are rejected.

For this reason, create the binding **first** and allow it to finish propagating before you configure address maps for the affected addresses.

### Handle a conflict error

Because [each CIDR can have only one binding](#choose-which-cidr-to-bind), a create request for a CIDR that is already bound fails with an HTTP `409` conflict:

```json
{
	"result": null,
	"success": false,
	"errors": [
		{
			"code": 1108,
			"message": "conflict: binding already exists for CIDR 203.0.113.0/24"
		}
	],
	"messages": []
}
```

You get this error in two cases:

* **You tried to bind the entire prefix.** The full prefix range (for example, the whole `/24`) is already in use once Cloudflare advertises your prefix, so it cannot be bound to a region directly. Bind a more specific range within the prefix instead — a `/25` down to a single `/32` — and cover the prefix with several sub-ranges if you need to regionalize all of its addresses.
* **The CIDR is already bound.** A binding for that exact range already exists, for example from an earlier request that succeeded.

To resolve it:

* [List your existing bindings](#list-prefix-bindings) to see what is already configured.
* To move an existing binding to a different region, [update it](#update-the-region-for-a-binding) rather than creating a new one.
* To bind a different range, choose a CIDR that is not already bound. To replace an existing binding with a different CIDR, [delete it](#delete-a-binding) first, then create the new one.

## List prefix bindings

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regional_services/prefix_bindings" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": [
		{
			"id": "f0e1d2c3-b4a5-6789-0abc-def123456789",
			"prefix_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
			"cidr": "203.0.113.0/25",
			"region_key": "eu"
		}
	],
	"result_info": {
		"count": 1,
		"per_page": 25,
		"cursor": ""
	}
}
```

Get a single binding

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regional_services/prefix_bindings/%7Bbinding_id%7D" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Update the region for a binding

Change the region a binding points to. Only the `region_key` can be updated. To change the CIDR, delete the binding and create a new one.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regional_services/prefix_bindings/%7Bbinding_id%7D" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"region_key": "us"
	}'
```

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"id": "f0e1d2c3-b4a5-6789-0abc-def123456789",
		"prefix_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
		"cidr": "203.0.113.0/25",
		"region_key": "us"
	}
}
```

## Delete a binding

Remove a binding to stop regionalizing traffic for its CIDR.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/dls/regional_services/prefix_bindings/%7Bbinding_id%7D" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": null
}
```

## Related resources

* [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) — overview and in-region processing model.
* [Available regions and product support](https://developers.cloudflare.com/data-localization/region-support/) — the full list of regions and their definitions.
* [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/) — onboard your own IP prefixes to Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/regional-services/ip-bindings/#page","headline":"Regionalized IP Bindings · Cloudflare Data Localization Suite docs","description":"Bind a BYOIP prefix to a region so traffic to those IP addresses is processed in-region.","url":"https://developers.cloudflare.com/data-localization/regional-services/ip-bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
