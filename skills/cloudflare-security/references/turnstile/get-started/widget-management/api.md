---
description: Create and manage Turnstile widgets using the Cloudflare API.
title: Create and manage widgets using Cloudflare API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

#  Create and manage widgets using Cloudflare API

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/turnstile/get-started/widget-management/api/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use the [Cloudflare API](https://developers.cloudflare.com/api/resources/turnstile/) for programmatic widget management and automation.

## Prerequisites

Before you begin, you must have:

* A Cloudflare API token with `Account:Turnstile:Edit` permissions
* An account ID found in your Cloudflare dashboard

### Create a widget via the API

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Turnstile Sites Write`
* `Account Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"domains": [
				"example.com"
		],
		"mode": "managed",
		"name": "My Example Turnstile Widget"
	}'
```

### Manage widgets via the API

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Turnstile Sites Write`
* `Turnstile Sites Read`
* `Account Settings Write`
* `Account Settings Read`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Turnstile Sites Write`
* `Turnstile Sites Read`
* `Account Settings Write`
* `Account Settings Read`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Turnstile Sites Write`
* `Account Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"domains": [
				"203.0.113.1",
				"cloudflare.com",
				"blog.example.com"
		],
		"mode": "invisible",
		"name": "blog.cloudflare.com login form",
		"clearance_level": "interactive"
	}'
```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Turnstile Sites Write`
* `Account Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY/rotate_secret" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"invalidate_immediately": false
	}'
```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Turnstile Sites Write`
* `Account Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/get-started/widget-management/api/#page","headline":"Create and manage widgets using Cloudflare API · Cloudflare Turnstile docs","description":"Create and manage Turnstile widgets using the Cloudflare API.","url":"https://developers.cloudflare.com/turnstile/get-started/widget-management/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
```
