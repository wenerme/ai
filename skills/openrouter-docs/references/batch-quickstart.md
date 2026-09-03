> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch API Quickstart

> Submit and retrieve asynchronous batches of inference requests

The Batch API lets you submit many inference requests together and retrieve the results asynchronously. It's useful for work that doesn't need an immediate response, and it uses a 24-hour completion window so you can process requests without managing each call yourself.

The Batch API supports several OpenRouter API shapes, including chat completions, Responses, and Anthropic Messages. You submit requests as an inline JSON `requests` array. You don't upload a JSONL file; OpenRouter handles JSONL persistence internally.

<Note>
  Batch results are available asynchronously. A successful submission returns `202 Accepted` with `status: "validating"`. That means OpenRouter persisted the batch and queued it for validation; it doesn't mean every request has completed.
</Note>

***

## Limitations

The Batch API is currently text-only. On `/v1/chat/completions`, `/v1/responses`, and `/v1/messages`, validation rejects any request that carries image, audio, video, or file content parts. That includes the Responses `input_image` and `input_file` parts and the Anthropic `image` and `document` blocks. On `/v1/chat/completions`, validation also rejects requests that ask for non-text output through `modalities`, `audio`, or `image_config`. For embeddings, `input` must be strings or token arrays.

Send multimodal requests to the sync API instead.

***

## Pricing

Batch requests are typically billed at 50% of the model's standard per-token pricing, mirroring the batch discounts offered by [OpenAI](https://developers.openai.com/api/docs/guides/batch) and [Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing). For a completed batch, `usage.cost` reports the amount OpenRouter charges. For BYOK-routed batches, that's only the OpenRouter BYOK fee, since the provider bills you directly for inference.

<Note>
  Non-token pricing components aren't uniformly discounted. Web-search calls bill at standard rates, and prompt-caching rates vary by model. The pricing shown on each model's page is the source of truth.
</Note>

***

## BYOK

If you have a [provider key](/docs/guides/overview/auth/byok) configured, batches route through it automatically, the same as sync requests: the provider bills you directly for inference and OpenRouter charges only the BYOK fee (see Pricing above). Completed batches report `usage.is_byok: true`.

Google Vertex uses a bucket in your GCP project for provider input and output. The primary setup is frictionless: omit `bucket` and let OpenRouter create a private, location-compatible bucket on the first batch. You can optionally provide an existing bucket instead. See [Google Vertex API keys](/docs/guides/overview/auth/byok#google-vertex-api-keys) for permissions and storage behavior.

***

## Submit a batch

Submit a batch with:

```text title="Endpoint" lines theme={null}
POST https://openrouter.ai/api/beta/batches
```

The request body has three required top-level fields:

| Field      | Description                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint` | The API shape used by every request in the batch. Choose `/v1/chat/completions`, `/v1/responses`, `/v1/messages`, or `/v1/embeddings`.                  |
| `model`    | An OpenRouter model slug, such as `openai/gpt-4o`. This batch-level model is applied to every request.                                                  |
| `requests` | A non-empty array of `{ custom_id, body }` items. `custom_id` must be unique within the batch, and `body` follows the shape of the selected `endpoint`. |

<Warning>
  Serialize `endpoint` and `model` before `requests` in the JSON body. The API stream-parses the request so it can accept very large `requests` arrays without buffering, and it returns a `400` if `requests` appears first. Every example on this page already uses this order.
</Warning>

The batch-level `model` applies to every request. A request body can omit `model` to inherit the batch-level value. If a request body sets its own `model`, it must match the batch-level `model` or the submission is rejected.

On Google models, every request in a batch must ask for the same `response_format`. Either all requests omit it, all use `json_object`, or all use `json_schema` with the same schema. Google's batch service derives one output schema for the whole batch, so requests that disagree fail there. Validation fails a mismatched batch and names the first request that conflicts, so send one batch per `response_format` and per schema.

<CodeGroup>
  ```python title="Python" lines theme={null}
  import json
  import requests

  response = requests.post(
    url="https://openrouter.ai/api/beta/batches",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "endpoint": "/v1/chat/completions",
      "model": "openai/gpt-4o",
      "requests": [
        {
          "custom_id": "req-0001",
          "body": {
            "messages": [
              {
                "role": "user",
                "content": "Summarize OpenRouter in one sentence."
              }
            ]
          }
        }
      ]
    })
  )

  print(response.json())
  ```

  ```typescript title="TypeScript (fetch)" lines theme={null}
  const response = await fetch('https://openrouter.ai/api/beta/batches', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: '/v1/chat/completions',
      model: 'openai/gpt-4o',
      requests: [
        {
          custom_id: 'req-0001',
          body: {
            messages: [
              {
                role: 'user',
                content: 'Summarize OpenRouter in one sentence.',
              },
            ],
          },
        },
      ],
    }),
  });

  console.log(await response.json());
  ```

  ```shell title="Shell" lines theme={null}
  curl https://openrouter.ai/api/beta/batches \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -d '{
    "endpoint": "/v1/chat/completions",
    "model": "openai/gpt-4o",
    "requests": [
      {
        "custom_id": "req-0001",
        "body": {
          "messages": [
            {
              "role": "user",
              "content": "Summarize OpenRouter in one sentence."
            }
          ]
        }
      }
    ]
  }'
  ```
</CodeGroup>

The response is a batch object with an ID you can use to check progress:

```json title="202 Accepted" lines theme={null}
{
  "id": "batch_123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "model": "openai/gpt-4o",
  "completion_window": "24h",
  "status": "validating",
  "created_at": 1782097200,
  "finalized_at": null,
  "request_counts": {
    "total": 1,
    "completed": 0,
    "failed": 0
  },
  "usage": null,
  "results": null,
  "error": null
}
```

The only supported completion window is `24h`.

***

## List your batches

List the batches in the workspace of the authenticating API key with:

```shell title="Shell" lines theme={null}
curl 'https://openrouter.ai/api/beta/batches?limit=2&status=completed&status=failed' \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

Batches are scoped to the workspace, not the key: every API key in the same workspace sees the same list, including batches submitted with other keys. Batches are returned newest first. List items contain metadata only and always set `results` to `null`; retrieve an individual batch by ID when you need its results.

```json title="Batch list" lines theme={null}
{
  "object": "list",
  "data": [
    {
      "id": "batch_9f2c1e",
      "object": "batch",
      "endpoint": "/v1/chat/completions",
      "model": "openai/gpt-4o",
      "completion_window": "24h",
      "status": "completed",
      "created_at": 1787836000,
      "finalized_at": 1787837000,
      "request_counts": { "total": 100, "completed": 100, "failed": 0 },
      "usage": { "prompt_tokens": 51200, "completion_tokens": 20480, "total_tokens": 71680 },
      "results": null,
      "error": null
    }
  ],
  "first_id": "batch_9f2c1e",
  "last_id": "batch_9f2c1e",
  "has_more": true
}
```

All query parameters are optional:

| Parameter        | Description                                                                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`          | Number of batches to return, from 1 to 100. Defaults to 20.                                                                                                                                                                                     |
| `after`          | Continue strictly after this batch ID. Pass the previous page's `last_id`.                                                                                                                                                                      |
| `status`         | Include a public status. Repeat the parameter to include more than one of `validating`, `in_progress`, `completed`, `failed`, `expired`, or `cancelled`. The transient `finalizing` and `cancelling` statuses are not accepted as list filters. |
| `created_after`  | Include batches created strictly after a Unix timestamp in seconds or an ISO-8601 date or datetime.                                                                                                                                             |
| `created_before` | Include batches created strictly before a Unix timestamp in seconds or an ISO-8601 date or datetime.                                                                                                                                            |

When `has_more` is `true`, request the next page with `after`. Pagination does not use offsets or a `before` parameter.

```shell title="Next page" lines theme={null}
curl 'https://openrouter.ai/api/beta/batches?limit=2&after=batch_9f2c1e' \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

For human-readable date filters, use an ISO-8601 value such as `2026-08-20` or `2026-08-20T00:00:00Z`. Unix seconds use the same unit as the integer timestamps returned in batch objects:

```shell title="Creation-time range" lines theme={null}
curl 'https://openrouter.ai/api/beta/batches?created_after=1787184000&created_before=1787837000' \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

`created_after` must be earlier than `created_before` when both are present.

<Note>
  Batch objects expose `created_at` in whole seconds, while creation-time filtering retains subsecond precision. A batch created later within the same displayed second can still match `created_after=<created_at>`. Use the `after` cursor, not timestamps, when paginating without gaps or overlaps.
</Note>

***

## Poll for results

Use the batch ID to retrieve the current status:

```text title="Endpoint" lines theme={null}
GET https://openrouter.ai/api/beta/batches/:id
```

For example:

```shell title="Shell" lines theme={null}
curl https://openrouter.ai/api/beta/batches/batch_123 \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

The status normally progresses through:

```text title="Status progression" lines theme={null}
validating → in_progress → finalizing → completed
```

Other possible statuses are `failed`, `expired`, `cancelling`, and `cancelled`. The terminal statuses are `completed`, `failed`, `expired`, and `cancelled`. Poll until the batch reaches a terminal status.

`request_counts` contains the total number of requests and the number that completed or failed:

```json title="request_counts" lines theme={null}
{
  "total": 100,
  "completed": 98,
  "failed": 2
}
```

When a batch is in progress, or has failed, expired, or been cancelled, `results` is `null`. When a batch completes, `results` is returned inline as an array in the same response. There is no separate results-download endpoint.

Each result maps back to an input using `custom_id`. Exactly one of `response` or `error` is populated for each result:

```json title="Result item" lines theme={null}
{
  "id": "batch_req_123",
  "custom_id": "req-0001",
  "response": {
    "status_code": 200,
    "request_id": "request_123",
    "body": {
      "id": "gen-batch-1782097200-a1b2c3d4e5f6a7b8c9d0",
      "object": "chat.completion",
      "created": 1782097200,
      "model": "openai/gpt-4o",
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "OpenRouter provides one API for many AI models."
          },
          "finish_reason": "stop"
        }
      ]
    }
  },
  "error": null
}
```

A completed batch response looks like this:

```json title="Completed batch" lines theme={null}
{
  "id": "batch_123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "model": "openai/gpt-4o",
  "completion_window": "24h",
  "status": "completed",
  "created_at": 1782097200,
  "finalized_at": 1782100800,
  "request_counts": {
    "total": 1,
    "completed": 1,
    "failed": 0
  },
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 40,
    "total_tokens": 60,
    "cost": 0.000225,
    "is_byok": false
  },
  "results": [
    {
      "id": "batch_req_123",
      "custom_id": "req-0001",
      "response": {
        "status_code": 200,
        "request_id": "request_123",
        "body": {
          "id": "gen-batch-1782097200-a1b2c3d4e5f6a7b8c9d0",
          "object": "chat.completion",
          "created": 1782097200,
          "model": "openai/gpt-4o",
          "choices": [
            {
              "index": 0,
              "message": {
                "role": "assistant",
                "content": "OpenRouter provides one API for many AI models."
              },
              "finish_reason": "stop"
            }
          ]
        }
      },
      "error": null
    }
  ],
  "error": null
}
```

***

## Reporting issues

Each completed result's `response.body.id` is that request's OpenRouter generation ID (for example `gen-batch-...`). To flag a bad generation, copy that ID and submit it through [Report Feedback](/docs/guides/overview/report-feedback) using the **By generation ID** flow.

<Note>
  Generation-level feedback is available for the `/v1/chat/completions`, `/v1/responses`, and `/v1/messages` skins. You can also share feedback or report issues in our [Discord](https://discord.gg/openrouter).
</Note>

***

## Use different API shapes

Set the top-level `endpoint` to choose the request shape used by every `body` in the batch. Supported shapes:

* Chat completions: `/v1/chat/completions`
* Responses: `/v1/responses`
* Anthropic Messages: `/v1/messages`

For example, an Anthropic Messages batch uses `/v1/messages` and puts the Messages-shaped request in each item's `body`:

```json title="Anthropic Messages batch" lines theme={null}
{
  "endpoint": "/v1/messages",
  "model": "anthropic/claude-3.5-sonnet",
  "requests": [
    {
      "custom_id": "req-1",
      "body": {
        "max_tokens": 32,
        "messages": [
          {
            "role": "user",
            "content": "Say hello."
          }
        ]
      }
    }
  ]
}
```

All requests in one batch use the same top-level `endpoint`. To mix API shapes, submit separate batches.

***

## Embeddings

Embeddings are rolling out on providers that support them.

Set the top-level `endpoint` to `/v1/embeddings` and put the embeddings request in each item's `body`. Each `body` takes an `input` (a string, an array of strings, a token array, or an array of token arrays). Multimodal inputs, `input_type`, and `provider` preferences are not supported on the Batch API. Use the sync API for those.

An `input` can be a single string or an array of strings. When it is an array, that request embeds every string in one call:

```json title="Embeddings batch" lines theme={null}
{
  "endpoint": "/v1/embeddings",
  "model": "openai/text-embedding-3-small",
  "requests": [
    {
      "custom_id": "emb-0001",
      "body": {
        "input": [
          "The quick brown fox jumped over the lazy dog.",
          "Pack my box with five dozen liquor jugs."
        ]
      }
    },
    {
      "custom_id": "emb-0002",
      "body": {
        "input": "The quick brown fox jumped over the lazy dog."
      }
    }
  ]
}
```

Poll for results the same way as any other batch (`GET https://openrouter.ai/api/beta/batches/:id`). These items are the entries of the completed batch object's `results` array (shown in full above); each carries the standard embeddings response in its `body`, and there is one result item per `custom_id`. A request whose `input` is an array of strings returns one embedding object per string in `data` (ordered by `index`); a single-string request returns exactly one:

```json title="Embeddings results" lines theme={null}
[
  {
    "id": "batch_req_emb_1",
    "custom_id": "emb-0001",
    "response": {
      "status_code": 200,
      "request_id": "request_456",
      "body": {
        "object": "list",
        "data": [
          {
            "object": "embedding",
            "embedding": [0.0023064255, -0.009327292, 0.015797347],
            "index": 0
          },
          {
            "object": "embedding",
            "embedding": [-0.012282, 0.0034567, -0.0089123],
            "index": 1
          }
        ],
        "model": "openai/text-embedding-3-small",
        "usage": {
          "prompt_tokens": 18,
          "total_tokens": 18
        }
      }
    },
    "error": null
  },
  {
    "id": "batch_req_emb_2",
    "custom_id": "emb-0002",
    "response": {
      "status_code": 200,
      "request_id": "request_789",
      "body": {
        "object": "list",
        "data": [
          {
            "object": "embedding",
            "embedding": [0.0023064255, -0.009327292, 0.015797347],
            "index": 0
          }
        ],
        "model": "openai/text-embedding-3-small",
        "usage": {
          "prompt_tokens": 8,
          "total_tokens": 8
        }
      }
    },
    "error": null
  }
]
```

<Note>
  OpenRouter stores batch inputs and results as JSONL artifacts in Google Cloud Storage and deletes them 30 days after creation, matching the upstream batch retention window. Download any results you need before the 30-day window elapses.
</Note>
