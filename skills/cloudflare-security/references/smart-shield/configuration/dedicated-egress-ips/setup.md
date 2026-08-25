---
description: Configure Dedicated CDN Egress IPs using the Cloudflare API.
title: Setup
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Setup

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/setup/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use the [Edit Zone Settings API endpoint](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) to set up Dedicated CDN Egress IPs (formerly known as Aegis). If you are not familiar with how Cloudflare API works, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/api/).

Enterprise-only

Dedicated CDN Egress IPs (DCEI) are currently available to Enterprise customers. Contact your account team to request access.

## Requirements

* The Dedicated CDN Egress IPs (DCEI) zone setting is only available within Cloudflare accounts that own leased IPs, or accounts to which a [BYOIP prefix](https://developers.cloudflare.com/byoip/) has been delegated. If you wish to use Dedicated CDN Egress IPs for zones that do not meet this criteria, contact your account team.
* Each dedicated egress pool can consist of either IPs from a [BYOIP prefix](https://developers.cloudflare.com/byoip/) or Cloudflare-leased IPs. A single dedicated egress pool cannot contain both BYOIPs and leased IPs. Also, a single BYOIP prefix can be used for either CDN ingress or CDN egress, but not both.

Caution

You must allowlist the IP addresses from this pool in your infrastructure before linking it to a zone. If you skip this step, traffic will not reach your origin, causing errors.

## Turn on DCEI for a zone

1. Contact your account team to get the ID for your dedicated egress pool.
2. Make a `PATCH` request to the [Edit Zone Setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) endpoint:
* Specify `aegis` as the setting ID in the URL.
* In the request body, set `enabled` to `true` and use the ID from the previous step as the `pool_id` value.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"id": "aegis",
		"value": {
				"enabled": true,
				"pool_id": "<EGRESS_POOL_ID>"
		}
	}'
```

## Check DCEI status for a zone

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`
* `Zone Settings Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Turn off DCEI for a zone

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"id": "aegis",
		"value": {
				"enabled": false
		}
	}'
```

## Check your IPs

You can find your leased dedicated IPs for CDN egress on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

If you are using BYOIP, refer to **BYOIP prefixes** instead.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/setup/#page","headline":"Set up Dedicated CDN Egress IPs · Cloudflare Smart Shield docs","description":"Configure Dedicated CDN Egress IPs using the Cloudflare API.","url":"https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
```
