---
description: Create, update, duplicate, and delete secrets using the dashboard, API, or Wrangler.
title: How to
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt
> Use this file to discover all available pages before exploring further.

# How to

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the sections below to learn about common actions you might want to take when managing your data in Secrets Store.

You must have a [Super Administrator or Secrets Store Admin role](https://developers.cloudflare.com/secrets-store/access-control/) within your Cloudflare account.

## Manage via Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line interface (CLI) that allows you to manage [Cloudflare Workers](https://developers.cloudflare.com/workers/) projects. Refer to [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-secret) for guidance on how to use it with Secrets Store.

## Create a secret

1. In the Cloudflare dashboard, go to the **Secrets Store** page.
[Go to **Secrets Store** ↗](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Select **Create secret**.
3. Fill in the required fields. Note that, once the secret is saved, the secret value will no longer be available for viewing.
4. (Optional) Select **Add additional secret** to create more than one secret at a time.
5. Select **Save** to confirm.

Note

A secret `name` cannot contain spaces. Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Secrets Store Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets" \
	--request POST \
	--header "X-Auth-Email: $CLOUDFLARE_EMAIL" \
	--header "X-Auth-Key: $CLOUDFLARE_API_KEY" \
	--json '[
		{
				"name": "<MY_SECRET_NAME>",
				"value": "<SECRET_VALUE>",
				"scopes": [
						"workers"
				],
				"comment": ""
		},
		{
				"name": "<MY_SECRET_NAME_2>",
				"value": "<SECRET_VALUE>",
				"scopes": [
						"workers"
				],
				"comment": ""
		}
	]'
```

## Duplicate a secret

Duplicate a secret to keep the same secret value but change name, scope, or comments.

1. In the Cloudflare dashboard, go to the **Secrets Store** page.
[Go to **Secrets Store** ↗](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Search for the secret you would like to duplicate within the existing secrets list.
3. Select the three dots next to the secret and choose **Duplicate**.
4. Edit the **Secret name**, **Permission scope**, or **Comment**, according to your needs.
5. Select **Save** to confirm.

Note

A secret `name` cannot contain spaces. Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

```bash
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID/duplicate \
--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
--header "Content-Type: application/json" \
--data '{
    "name":"<NEW_DUPLICATE_NAME>",
    "scopes":["workers"],
    "comment":""
}'
```

## Edit a secret

Edit a secret to replace an existing value with a new one.

Caution

This action will cause the replacement in all services using the secret.

You can also edit the secret **Permission scope** and **Comment**.

1. In the Cloudflare dashboard, go to the **Secrets Store** page.
[Go to **Secrets Store** ↗](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Search for the secret you would like to edit within the existing secrets list.
3. Select the three dots next to the secret and choose **Edit**.
4. Edit the available fields according to your needs and select **Save** to confirm.

Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

```bash
curl --request PATCH \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID \
--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
--header "Content-Type: application/json" \
--data '{
    "comment":"<NEW_COMMENT>",
    "value":"<NEW_SECRET_VALUE>",
    "scopes":["workers"]
}'
```

## Delete a secret

Caution

Before deleting a secret, make sure it is not deployed in your [Workers applications ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/) or [AI gateways ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway).

1. In the Cloudflare dashboard, go to the **Secrets Store** page.
[Go to **Secrets Store** ↗](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Search for the secret you would like to delete within the existing secrets list.
3. Select the three dots next to the secret and choose **Delete**.
4. Type in the secret name and select **Delete** to confirm.

Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Secrets Store Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID" \
	--request DELETE \
	--header "X-Auth-Email: $CLOUDFLARE_EMAIL" \
	--header "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#page","headline":"How to · Cloudflare Secrets Store docs","description":"Create, update, duplicate, and delete secrets using the dashboard, API, or Wrangler.","url":"https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
