---
description: Create a K2 stream, produce records over HTTP, and consume them through a subscription.
title: Get started
image: https://developers.cloudflare.com/k2/get-started/og.png?v=62dce78adb6d0329
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/k2/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/k2/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide walks you through the process of creating a K2 stream, writing records to it, and consuming through a subscription.

By the end of this guide, you will have:

- Created a stream with the Cloudflare API.
- Produced a batch of records to the stream over HTTP.
- Created a subscription that tracks your read position.
- Consumed a batch of records and acknowledged it.

## Prerequisites

1. Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages) and subscribe to the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/). K2 is not available on the Workers Free plan.
2. Find your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Install [`curl` ↗︎](https://curl.se/) and [`jq` ↗︎](https://jqlang.org/).

## How K2 works

A K2 **stream** is a durable, append-only log of records. Each **record** contains a binary `content` payload and optional string `headers`.

Producers append records to a stream in batches. Each batch is written atomically: either every record in the batch is stored, or none are.

Consumers read from a stream through a **subscription**. A subscription tracks a position in the stream. Multiple subscriptions on the same stream read independently of each other.

When a consumer reads from a subscription, K2 leases a batch of records to that consumer. The consumer acknowledges the batch after it processes the records. If the consumer does not acknowledge the batch before the lease expires, K2 delivers the records again. This gives you at-least-once delivery.

## 1. Create an API token

You need an API token to create streams and to read from them.

1. In the Cloudflare dashboard, go to the **Account API tokens** page. [Go to **Account API tokens** ↗](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Select **Create Token** > **Create Custom Token**.
3. Enter a name for your token, for example `k2-get-started`.
4. Under **Permissions**, add the **K2 Config Write**, **K2 Produce**, and **K2 Consume** permissions for your account. K2 Config Write allows you to create and delete streams.
5. Select **Continue to summary** > **Create Token**.
6. Copy the token value. You cannot view it again after you leave the page.

Export your account ID and API token as shell variables. The commands in this guide use these variables.

```sh
export ACCOUNT_ID=<YOUR_ACCOUNT_ID>
export CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN>
```

## 2. Create a stream

Create a stream named `orders`. This request enables the HTTP endpoint and requires an API token to produce records to it.

```sh
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/k2/streams" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "orders",
    "http": {
      "enabled": true,
      "authentication": true
    }
  }'
```

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": {
		"id": "241fa65b438a4d539a19371f58bfdae0",
		"name": "orders",
		"retention_seconds": 604800,
		"endpoint": "https://241fa65b438a4d539a19371f58bfdae0.k2.cloudflarestorage.com",
		"http": {
			"enabled": true,
			"authentication": true
		},
		"worker_binding": {
			"enabled": true
		},
		"created_at": "2026-09-24T21:19:19.246Z",
		"modified_at": "2026-09-24T21:19:19.246Z"
	}
}
```

The response includes:

- `id`: The stream ID. You use it to build the stream endpoint.
- `endpoint`: The base URL for producing and consuming records.
- `retention_seconds`: How long K2 keeps records. The default is seven days ( `604800` seconds).

Export the stream ID and endpoint as shell variables:

```sh
export STREAM_ID=<STREAM_ID>
export K2_ENDPOINT=https://$STREAM_ID.k2.cloudflarestorage.com
```

<details>

<summary>

Stream configuration options

</summary>

| Field | Required | Description |
| --- | --- | --- |
| <code>name</code> | Yes | 1 to 128 letters, numbers, or underscores. Must be unique in your account. Names are not case-sensitive. |
| <code>http.enabled</code> | Yes | Enables the HTTP <code>/produce</code> endpoint. |
| <code>http.authentication</code> | No | Requires an API token to produce over HTTP. If you omit this field, anyone with the endpoint URL can produce. |
| <code>http.cors.origins</code> | No | Up to five origins allowed to produce from a browser, or <code>["*"]</code> to allow any origin. |
| <code>worker_binding.enabled</code> | No | Allows a Worker to produce through a binding. Defaults to <code>true</code>. |
| <code>retention_seconds</code> | No | Record retention, from <code>3600</code> (one hour) to <code>2592000</code> (30 days). Defaults to <code>604800</code> (seven days). |

At least one of <code>http</code> or <code>worker_binding</code> must be enabled.

</details>

## 3. Produce records

Send a batch of two records to the `/produce` endpoint of your stream. Record `content` must be standard base64. In this example, each record contains a base64-encoded JSON order event.

```sh
curl "$K2_ENDPOINT/produce" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "records": [
      {
        "content": "eyJvcmRlcl9pZCI6MTAwMSwic3RhdHVzIjoiY3JlYXRlZCJ9",
        "headers": { "event-type": "order.created" }
      },
      {
        "content": "eyJvcmRlcl9pZCI6MTAwMiwic3RhdHVzIjoiY3JlYXRlZCJ9",
        "headers": { "event-type": "order.created" }
      }
    ]
  }'
```

```json
{ "success": true }
```

A `success: true` response means K2 stored every record in the batch.

To encode your own payloads, pipe them through `base64`:

```sh
printf '%s' '{"order_id":1001,"status":"created"}' | base64
```

Note

If a produce request fails, the response includes an `error` object with a `retryable` field. Only retry the request when `retryable` is `true`. K2 does not deduplicate records, so a retried batch can be stored more than once.

## 4. Create a subscription

A subscription tracks which records a consumer has processed. Create a subscription named `orders-processor` that starts from the earliest record in the stream.

```sh
curl "$K2_ENDPOINT/subscriptions" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "orders-processor",
    "start_at": { "type": "earliest" }
  }'
```

```json
{
	"result": { "id": "e2f747f8bccf453eb2767496779cd135" },
	"success": true,
	"errors": [],
	"messages": []
}
```

The request body contains:

- `name`: 1 to 128 letters, numbers, underscores, or hyphens. Must be unique within the stream.
- `start_at.type`: `earliest` reads from the oldest retained record. `latest` skips records that exist when you create the subscription.

Creating a subscription with the same name and settings returns the existing subscription ID, so the request is safe to retry.

Export the subscription ID as a shell variable:

```sh
export SUBSCRIPTION_ID=<SUBSCRIPTION_ID>
```

## 5. Consume records

Request a batch of up to 100 records. The `worker_id` identifies your consumer. Each worker can hold one lease at a time.

```sh
curl "$K2_ENDPOINT/subscriptions/$SUBSCRIPTION_ID/consume" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "worker_id": "worker-1",
    "max_records": 100
  }'
```

```json
{
	"result": {
		"batch_id": "4f1c2a9e8b7d4c6f9a0e1d2c3b4a5968",
		"leased_until_ms": 1790165100000,
		"records": [
			{
				"timestamp_ms": 1790164800000,
				"content": "eyJvcmRlcl9pZCI6MTAwMSwic3RhdHVzIjoiY3JlYXRlZCJ9",
				"headers": { "event-type": "order.created" }
			},
			{
				"timestamp_ms": 1790164800000,
				"content": "eyJvcmRlcl9pZCI6MTAwMiwic3RhdHVzIjoiY3JlYXRlZCJ9",
				"headers": { "event-type": "order.created" }
			}
		]
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

The response contains:

- `batch_id`: The ID of the leased batch. You need it to acknowledge the batch.
- `leased_until_ms`: When the lease expires, in milliseconds since the Unix epoch. The lease lasts five minutes.
- `records`: The records in the batch. `timestamp_ms` is the time K2 received the record, in milliseconds since the Unix epoch. `content` is base64.

To decode the record contents, pipe the response through `jq`:

```sh
curl --silent "$K2_ENDPOINT/subscriptions/$SUBSCRIPTION_ID/consume" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"worker_id": "worker-1", "max_records": 100}' \
  | jq -r '.result.records[].content | @base64d'
```

```txt
{"order_id":1001,"status":"created"}
{"order_id":1002,"status":"created"}
```

Because `worker-1` still holds its lease, this second request returns the same batch and refreshes the lease. Use this behavior to recover a batch if your consumer loses a response.

If there are no records to read, the response contains an empty `records` array and `batch_id` is `null`. Wait before you poll again.

Export the batch ID from the response as a shell variable:

```sh
export BATCH_ID=<BATCH_ID>
```

## 6. Acknowledge the batch

After you process the records, acknowledge the batch. This advances the subscription past these records and releases the lease so the worker can read the next batch.

```sh
curl "$K2_ENDPOINT/subscriptions/$SUBSCRIPTION_ID/batches/$BATCH_ID/ack" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{ "worker_id": "worker-1" }'
```

```json
{ "result": {}, "success": true, "errors": [], "messages": [] }
```

If processing fails, send the same request to `/nack` instead of `/ack`. K2 releases the lease without advancing the subscription, and delivers the records again.

Run the consume request from step 5 again. Because you acknowledged the first batch, the response contains no records.

## 7. Clean up

Delete the subscription:

```sh
curl "$K2_ENDPOINT/subscriptions/$SUBSCRIPTION_ID" \
  --request DELETE \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"result": { "id": "e2f747f8bccf453eb2767496779cd135" },
	"success": true,
	"errors": [],
	"messages": []
}
```

Delete the stream and all of its records:

```sh
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/k2/streams/$STREAM_ID" \
  --request DELETE \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{ "success": true, "errors": [], "messages": [], "result": {} }
```

## Next steps

### [Limits](https://developers.cloudflare.com/k2/platform/limits/)

Review record size, batch size, and subscription limits.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/k2/get-started/#page","headline":"Get started","description":"Create a K2 stream, produce records over HTTP, and consume them through a subscription.","url":"https://developers.cloudflare.com/k2/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/k2/get-started/og.png?v=62dce78adb6d0329","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
