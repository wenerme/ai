---
description: Read records from a K2 stream through a subscription, and acknowledge them after processing.
title: Consume records
image: https://developers.cloudflare.com/k2/features/consume/og.png?v=347ebe1831d9d50f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/k2/llms.txt
> Use this file to discover all available pages before exploring further.

# Consume records

Last updated Oct 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/k2/features/consume/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Consumers read records from a K2 stream through a [subscription](https://developers.cloudflare.com/k2/concepts/#subscriptions), which tracks which records have been processed. Each subscription on a stream reads independently, meaning multiple applications can read the same records.

To consume records:

1. [Create a subscription](#create-a-subscription) on the stream.
2. [Request a batch](#request-a-batch) of records. K2 leases the batch to your consumer.
3. Process the records, then [acknowledge the batch](#acknowledge-a-batch). If processing takes longer than the lease, [extend the lease](#extend-a-lease).
4. Repeat from step 2.

K2 delivers records at least once. Your consumer can receive the same record more than once. For details, refer to [Delivery guarantees](https://developers.cloudflare.com/k2/reference/delivery-guarantees/).

## Before you begin

All consumer requests use the stream endpoint, `https://<STREAM_ID>.k2.cloudflarestorage.com`, and require an API token with the `K2 Consume` permission in the account that owns the stream.

The examples on this page use the following shell variables:

```sh
export K2_ENDPOINT=https://<STREAM_ID>.k2.cloudflarestorage.com
export CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN>
```

After you [create a subscription](#create-a-subscription), export its ID. After you [request a batch](#request-a-batch), export the `batch_id` from the response:

```sh
export SUBSCRIPTION_ID=<SUBSCRIPTION_ID>
export BATCH_ID=<BATCH_ID>
```

## Create a subscription

```sh
curl "$K2_ENDPOINT/subscriptions" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "orders-ingestion",
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

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | 1 to 128 letters, numbers, underscores, or hyphens. Must be unique within the stream. Not case-sensitive. |
| `start_at.type` | string | Yes | Where the subscription starts reading. `earliest` starts at the oldest retained record. `latest` starts after the newest record in the stream. |

Subscriptions are immutable once created.

If you create a subscription with the same name and settings as an existing one, K2 returns the existing subscription ID. If the name matches but the settings differ, K2 returns a `422` error.

### Manage subscriptions

| Action | Request |
| --- | --- |
| List subscriptions | `GET /subscriptions` |
| Find a subscription by name | `GET /subscriptions?name=<SUBSCRIPTION_NAME>` |
| Get a subscription | `GET /subscriptions/<SUBSCRIPTION_ID>` |
| Delete a subscription | `DELETE /subscriptions/<SUBSCRIPTION_ID>` |

List requests return an array of subscriptions, oldest first. A request with `name` returns an array with at most one subscription.

A get request returns a single subscription:

```json
{
	"result": {
		"id": "e2f747f8bccf453eb2767496779cd135",
		"name": "orders-processor",
		"start_at": { "type": "earliest" },
		"created_at": "2026-09-23T12:00:00.000Z",
		"modified_at": "2026-09-23T12:00:00.000Z"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

A stream can have up to 100 subscriptions. If you create a subscription on a stream that already has 100, K2 returns a `422` error with code `10219`. Delete an existing subscription to create a new one.

## Request a batch

Send a `POST` request to `/subscriptions/<SUBSCRIPTION_ID>/consume`:

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

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `worker_id` | string | Yes | An identifier for your consumer, 1 to 256 characters. Use a different value for each concurrent consumer. |
| `max_records` | integer | Yes | The maximum number of records to return, from `1` to `10000`. |

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
			}
		]
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

| Field | Description |
| --- | --- |
| `batch_id` | The ID of the leased batch. Use it to acknowledge the batch. |
| `leased_until_ms` | When the lease expires, in milliseconds since the Unix epoch. |
| `records[].timestamp_ms` | When K2 received the record, in milliseconds since the Unix epoch. |
| `records[].content` | The record payload, as standard base64. |
| `records[].headers` | The record headers. Omitted if the record was produced without any headers. |

`max_records` is a ceiling for the number of records that will be returned, but a batch may contain fewer records. This does not necessarily imply that there are no more records available.

### No records available

If there are no new records, the response contains an empty batch:

```json
{
	"result": { "batch_id": null, "leased_until_ms": null, "records": [] },
	"success": true,
	"errors": [],
	"messages": []
}
```

Wait before you send another request. Use a backoff interval to avoid polling continuously.

## Leases

When K2 returns a batch, it leases the batch to the `worker_id` that requested it. The lease lasts five minutes.

- Each `worker_id` can hold one lease at a time.
- K2 never leases the same records to two workers at the same time.
- A subscription can have up to 128 active leases at a time. If every lease is in use, K2 returns a `429` error with code `10216`.
- K2 does not guarantee the order in which records are processed across workers that share a subscription.

If a worker requests a batch while it already holds a lease, K2 returns the same batch and records again, and refreshes the lease. K2 ignores `max_records` when it returns the same batch. Use this to recover a batch if your consumer loses the response, for example after a network error.

If a lease expires before the batch is acknowledged, K2 delivers the records again to the next worker that requests a batch.

## Acknowledge a batch

After you process a batch, acknowledge it. This marks the records as processed and releases the lease, so the worker can request the next batch.

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

Acknowledge the batch before `leased_until_ms`. If the lease has expired and K2 has already delivered the records in a new batch, the acknowledgement has no effect.

Acknowledging the same batch more than once is safe. K2 returns a success response for batches that are unknown or already acknowledged.

## Extend a lease

If your consumer needs more than five minutes to process a batch, extend the lease before it expires:

```sh
curl "$K2_ENDPOINT/subscriptions/$SUBSCRIPTION_ID/batches/$BATCH_ID/extend" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{ "worker_id": "worker-1" }'
```

```json
{
	"result": { "leased_until_ms": 1790165400000 },
	"success": true,
	"errors": [],
	"messages": []
}
```

A successful extension sets the lease to expire five minutes after the request. It never shortens a lease.

Unlike ack and nack, the `worker_id` must match the worker that holds the lease. If the lease has expired, has been released, or the batch has been acknowledged or delivered to another worker, K2 returns a `409` error with code `10218`. Retrying the same request cannot succeed. Stop processing the batch and request a new batch. K2 delivers the records again with a new `batch_id`.

## Release a batch

If your consumer cannot process a batch, send a negative acknowledgement (nack) to release it immediately instead of waiting for the lease to expire:

```sh
curl "$K2_ENDPOINT/subscriptions/$SUBSCRIPTION_ID/batches/$BATCH_ID/nack" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{ "worker_id": "worker-1" }'
```

```json
{ "result": {}, "success": true, "errors": [], "messages": [] }
```

K2 delivers the released records again in the next batch requested by any worker, with a new `batch_id`. The subscription does not move past the records until that new batch is acknowledged.

## Handle errors

Subscription and consume errors use the Cloudflare API format, with an `errors` array:

```json
{
	"result": null,
	"success": false,
	"errors": [
		{
			"code": 10216,
			"message": "All parallel read slots for this subscription are in use, please retry"
		}
	],
	"messages": []
}
```

This is different from the format of [produce errors](https://developers.cloudflare.com/k2/features/produce/#handle-errors).

Retry requests that fail with codes `10211`, `10214`, `10216`, or `10217` after a backoff interval. Do not retry other errors without changing the request.

<details>

<summary>

Subscription and consume error codes

</summary>

| Code | HTTP status | Description |
| --- | --- | --- |
| <code>10200</code> | <code>404</code> | The stream does not exist. |
| <code>10201</code> | <code>422</code> | A subscription with this name exists with different settings. |
| <code>10204</code> | <code>400</code> | The request is invalid. For example, the JSON is malformed or a field is out of range. |
| <code>10205</code> | <code>415</code> | The <code>Content-Type</code> header is not <code>application/json</code>. |
| <code>10208</code> | <code>401</code> | The request has no <code>Authorization</code> header. |
| <code>10209</code> | <code>401</code> | The <code>Authorization</code> header is malformed or the API token is invalid. |
| <code>10210</code> | <code>403</code> | The API token does not have permission to consume from this stream. |
| <code>10211</code> | <code>503</code> | K2 is temporarily unavailable. Retry the request. |
| <code>10213</code> | <code>500</code> | An internal error occurred. |
| <code>10214</code> | <code>503</code> | K2 could not read records from storage. Retry the request. |
| <code>10215</code> | <code>404</code> | The subscription does not exist. |
| <code>10216</code> | <code>429</code> | The maximum number of concurrent consumers has been exceeded for this subscription. Retry after a lease is acknowledged, released, or expires. |
| <code>10217</code> | <code>409</code> | K2 is still reading a batch for this <code>worker_id</code> from an earlier request. Retry the request to receive the batch. |
| <code>10218</code> | <code>409</code> | The lease is no longer held by this worker. Do not retry. Request a new batch instead. |
| <code>10219</code> | <code>422</code> | The stream already has the maximum of 100 subscriptions. |

</details>

## Next steps

- Review consumer limits in [Limits](https://developers.cloudflare.com/k2/platform/limits/#subscriptions-and-consuming-records).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/k2/features/consume/#page","headline":"Consume records","description":"Read records from a K2 stream through a subscription, and acknowledge them after processing.","url":"https://developers.cloudflare.com/k2/features/consume/","inLanguage":"en","image":"https://developers.cloudflare.com/k2/features/consume/og.png?v=347ebe1831d9d50f","dateModified":"2026-10-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
