---
description: Create, list, update, and delete AI Search namespaces over HTTP using the Namespaces REST API.
title: REST API
image: https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/og.png?v=2130d71799ac2da7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# REST API

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the AI Search REST API to manage [namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/) over HTTP.

## Authentication

All requests require an API token with **AI Search:Edit** and **AI Search:Run** permissions.

1. In the Cloudflare dashboard, go to **My Profile** > **API Tokens**. [Go to **API Tokens** ↗](https://dash.cloudflare.com/profile/api-tokens)
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Enter a **Token name**, for example `AI Search Manager`.
5. Under **Permissions**, add two permissions:
   - **Account** > **AI Search:Edit**
   - **Account** > **AI Search:Run**
6. Select **Continue to summary**, then select **Create Token**.
7. Copy and save the token value. This is your `API_TOKEN`.

Include the token in the `Authorization` header for all requests:

```txt
Authorization: Bearer <API_TOKEN>
```

## API paths

| Path | Description |
| --- | --- |
| `/accounts/{account_id}/ai-search/namespaces` | Lists and creates namespaces |
| `/accounts/{account_id}/ai-search/namespaces/{name}` | Operates on a single namespace |

For the full specification, refer to the [Namespace API reference](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/).

## Operations

| Operation | Method | Description |
| --- | --- | --- |
| [Create](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/create/) | `POST` | Create a namespace |
| [List](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/list/) | `GET` | List namespaces |
| [Get](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/read/) | `GET` | Get a namespace by name |
| [Update](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/update/) | `PUT` | Update the description or public endpoint |
| [Delete](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/delete/) | `DELETE` | Delete an empty namespace |
| [Move instance](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/methods/move/) | `PATCH` | Move an instance to a different namespace |

To search across several instances in a namespace, refer to [Multi-Instance Search](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/search/) and [Multi-Instance Chat Completions](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/methods/chat_completions/) in the API reference.

## Fields

Use these fields in the request body when you create or update a namespace.

| Field | Type | Create | Update | Description |
| --- | --- | --- | --- | --- |
| `name` | string | Required | - | The namespace name. Use 1 to 28 lowercase letters, digits, and hyphens. The name must start and end with a letter or digit. You cannot rename a namespace. |
| `description` | string | Optional | Optional | A description of up to 256 characters. Set it to `null` to clear it. |
| `public_endpoint_params` | object | Optional | Optional | The namespace public endpoint configuration. Refer to [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/). |

On update, fields you omit keep their current value. Set `public_endpoint_params` to `null` to remove the public endpoint configuration.

You cannot change the description of the `default` namespace. You can configure its public endpoint.

## Examples

### Create a namespace

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "support",
    "description": "Customer support content"
  }'
```

An account can have up to 100 namespaces. Creating more returns error `7062` (`max_namespaces_reached`).

### List namespaces

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces?per_page=50" \
  -H "Authorization: Bearer <API_TOKEN>"
```

| Query parameter | Description |
| --- | --- |
| `page` | The page number to return. Defaults to `1`. |
| `per_page` | The number of namespaces per page. Defaults to `20`. Maximum `100`. |
| `search` | Return namespaces whose name or description contains this string. Case-insensitive. |

### Update a namespace

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/support" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Support articles and FAQs"
  }'
```

### Delete a namespace

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/support" \
  -H "Authorization: Bearer <API_TOKEN>"
```

A namespace must be empty before you delete it. If it still contains instances, the request returns error `7066` (`namespace_not_empty`). Move or delete the instances first. Instances that are still being deleted do not block the request.

You cannot delete the `default` namespace. The request returns error `7065` (`cannot_modify_default_namespace`).

### Move an instance

Move an instance to another namespace with a `PATCH` request on the instance in its current namespace:

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/docs" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "new_namespace": "support"
  }'
```

The target namespace cannot already contain an instance with the same name.

## Errors

For namespace error codes, refer to [API error codes](https://developers.cloudflare.com/ai-search/troubleshooting/api-error-codes/#namespaces).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/#page","headline":"REST API","description":"Create, list, update, and delete AI Search namespaces over HTTP using the Namespaces REST API.","url":"https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/og.png?v=2130d71799ac2da7","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
