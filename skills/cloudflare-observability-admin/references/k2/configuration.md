---
description: Create, update, and delete K2 streams, and configure their inputs, authentication, CORS, and retention.
title: Configuration
image: https://developers.cloudflare.com/k2/configuration/og.png?v=b5ec4eb7360749ac
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/k2/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/k2/configuration/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

K2 streams can be created, updated, and deleted with the REST API.

To create, update, or delete streams, your API token needs the `K2 Config Write` permission. To get or list streams, it needs the `K2 Config Read` permission.

## Stream settings

| Setting | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | string | Yes | None | 1 to 128 letters, numbers, or underscores. Must be unique in your account. Not case-sensitive. |
| `retention_seconds` | integer | No | `604800` | How long K2 retains records, from `3600` (one hour) to `2592000` (30 days). |
| `http` | object | Yes | None | Configures the HTTP input. Refer to [HTTP input](#http-input). |
| `worker_binding` | object | No | `{ enabled: true }` | Configures the Workers binding input. Refer to [Workers binding input](#workers-binding-input). |

At least one of `http` or `worker_binding` must be enabled.

You cannot rename a stream after you create it.

### Inputs

An input is a way for producers to write records to a stream. K2 supports two inputs:

- **HTTP:** Producers send records to the stream's `/produce` endpoint.
- **Workers binding:** A Worker sends records through a binding.

### HTTP input

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | boolean | Yes | Enables the `/produce` endpoint. |
| `authentication` | boolean | No | Requires an API token with the `K2 Produce` permission to produce. If omitted or `false`, anyone with the stream endpoint can produce. |
| `cors.origins` | array of strings | No | Origins allowed to produce from a browser. Refer to [CORS](#cors). |

Caution

If you do not set `authentication` to `true`, the `/produce` endpoint is public. Anyone who knows the stream ID can write records to the stream.

#### Authentication

When `authentication` is `true`, producers using the HTTP API must send an API token in the `Authorization: Bearer <TOKEN>` header. The token must have permission to produce to K2 streams (`K2 Produce`) in the account that owns the stream.

#### CORS

Configure `cors.origins` to allow browsers to produce records from a web page. Each entry must be one of the following:

- An `http://` or `https://` origin, such as `https://example.com`. Origins cannot include a path, query string, fragment, or credentials.
- `*`, to allow any origin. If you use `*`, it must be the only entry.

You can configure up to five origins. Each origin must be unique.

### Workers binding input

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | boolean | Yes | Allows Workers to produce to the stream with a binding. |

If you omit `worker_binding` when you create a stream, the Workers binding input is enabled.

### Retention

`retention_seconds` sets how long K2 retains records after it receives them. The value must be between `3600` (one hour) and `2592000` (30 days). The default is `604800` (seven days).

K2 deletes expired records in the background. Records can remain readable for some time after their retention period ends, so do not rely on retention to remove data at an exact time.

## Update a stream

To change a stream's settings, send a `PATCH` request with the settings to change. You can update `retention_seconds`, `http`, and `worker_binding`. Include at least one of these fields.

```sh
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/k2/streams/$STREAM_ID" \
  --request PATCH \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "retention_seconds": 86400,
    "worker_binding": { "enabled": false }
  }'
```

The response contains the updated stream:

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"id": "241fa65b438a4d539a19371f58bfdae0",
		"name": "orders",
		"retention_seconds": 86400,
		"endpoint": "https://241fa65b438a4d539a19371f58bfdae0.k2.cloudflarestorage.com",
		"http": {
			"enabled": true,
			"authentication": true
		},
		"worker_binding": {
			"enabled": false
		},
		"created_at": "2026-09-24T21:19:19.246Z",
		"modified_at": "2026-09-29T14:25:54.712Z"
	}
}
```

When you update an input, the new object replaces the existing one. For example, to add a CORS origin to the HTTP input, send the complete `http` object, including `enabled` and `authentication`. To disable an input, set it to `{ "enabled": false }`. You cannot disable both inputs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/k2/configuration/#page","headline":"Configuration","description":"Create, update, and delete K2 streams, and configure their inputs, authentication, CORS, and retention.","url":"https://developers.cloudflare.com/k2/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/k2/configuration/og.png?v=b5ec4eb7360749ac","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
