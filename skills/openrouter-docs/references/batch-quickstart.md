> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch API Quickstart

> Submit and retrieve asynchronous batches of inference requests

The Batch API lets you submit many inference requests together and retrieve the results asynchronously. It's useful for work that doesn't need an immediate response, and it uses a 24-hour completion window so you can process requests without managing each call yourself.

The Batch API supports several OpenRouter API shapes, including chat completions, Responses, and Anthropic Messages. You submit requests as an inline JSON `requests` array. You don't upload a JSONL file; OpenRouter handles JSONL persistence internally.

<Note>
  Batch results are available asynchronously. A successful submission returns `202 Accepted` with `status: "validating"`, which means the request was persisted and queued for validation, not that every request has completed.
</Note>

***

## Limitations

The Batch API is currently text-only. On `/v1/chat/completions`, `/v1/responses`, and `/v1/messages`, a request carrying image, audio, video, or file content parts is rejected during validation, including the Responses `input_image` and `input_file` parts and the Anthropic `image` and `document` blocks. On `/v1/chat/completions`, asking for non-text output through `modalities`, `audio`, or `image_config` is rejected as well. For embeddings, `input` must be strings or token arrays.

Send multimodal requests to the sync API instead.

***

## Pricing

Batch requests are typically billed at 50% of the model's standard per-token pricing, mirroring the batch discounts offered by [OpenAI](https://developers.openai.com/api/docs/guides/batch) and [Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing). For a completed batch, `usage.cost` reports the amount OpenRouter charges; for BYOK-routed batches, this is only the OpenRouter BYOK fee because provider inference is billed directly by the provider.

<Note>
  Non-token pricing components are not uniformly discounted; for example, web-search calls bill at standard rates and prompt-caching rates vary by model, so the pricing shown on each model's page is the source of truth.
</Note>

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
  Batch inputs and results are stored as JSONL artifacts in Google Cloud Storage and automatically deleted 30 days after creation, matching the upstream batch retention window. Download any results you need before the 30-day retention window elapses.
</Note>
