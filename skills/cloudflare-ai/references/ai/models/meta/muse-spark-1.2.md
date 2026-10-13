---
description: Muse Spark 1.2 is Meta's agentic and coding model for multi-step tool loops, software engineering assistants, and long-context reasoning.
title: Muse Spark 1.2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.CTzB_ysm.svg)

# Muse Spark 1.2

Text Generation • Meta

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`meta/muse-spark-1.2`

- Third-party

Muse Spark 1.2 is Meta's agentic and coding model for multi-step tool loops, software engineering assistants, and long-context reasoning.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://dev.meta.ai/docs/models) |
| Request formats | Responses |
| Pricing | <ul><li>Input (per 1M tokens)$1.25</li><li>Cached input (per 1M tokens)$0.16</li><li>Output (per 1M tokens)$4.25</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'meta/muse-spark-1.2',
  {
    messages: [
      {
        role: 'user',
        content:
          'I am planning an outdoor dinner in Lisbon tonight. Check the weather and then give me a one-sentence recommendation.',
      },
      {
        role: 'assistant',
        content: null,
        tool_calls: [
          {
            id: 'call_weather_lisbon',
            type: 'function',
            function: { name: 'get_weather', arguments: '{"city":"Lisbon"}' },
          },
        ],
      },
      {
        role: 'tool',
        content: '22 C, partly cloudy, 10 percent chance of rain, light wind',
        tool_call_id: 'call_weather_lisbon',
      },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get the current weather and short-term forecast for a city.',
          parameters: {
            type: 'object',
            properties: { city: { type: 'string', description: 'City name' } },
            required: ['city'],
          },
        },
      },
    ],
    max_completion_tokens: 800,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-spark-1.2",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "I am planning an outdoor dinner in Lisbon tonight. Check the weather and then give me a one-sentence recommendation."
      },
      {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_weather_lisbon",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\":\"Lisbon\"}"
            }
          }
        ]
      },
      {
        "role": "tool",
        "content": "22 C, partly cloudy, 10 percent chance of rain, light wind",
        "tool_call_id": "call_weather_lisbon"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get the current weather and short-term forecast for a city.",
          "parameters": {
            "type": "object",
            "properties": {
              "city": {
                "type": "string",
                "description": "City name"
              }
            },
            "required": [
              "city"
            ]
          }
        }
      }
    ],
    "max_completion_tokens": 800
  }
}'
```

## Examples

<details>

<summary>**Currency Conversion Tool Round Trip** — Complete a currency-conversion tool round trip and report the result with the supplied rate and timestamp.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-1.2',
  {
    messages: [
      {
        role: 'user',
        content:
          'Convert a 125 EUR invoice to USD and tell me whether it exceeds a 130 USD approval threshold.',
      },
      {
        role: 'assistant',
        content: null,
        tool_calls: [
          {
            id: 'call_fx_invoice',
            type: 'function',
            function: { name: 'get_exchange_rate', arguments: '{"base":"EUR","quote":"USD"}' },
          },
        ],
      },
      {
        role: 'tool',
        content: '{"rate":1.09,"as_of":"2026-10-06T12:00:00Z"}',
        tool_call_id: 'call_fx_invoice',
      },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_exchange_rate',
          description: 'Return the current exchange rate between two currencies.',
          parameters: {
            type: 'object',
            properties: { base: { type: 'string' }, quote: { type: 'string' } },
            required: ['base', 'quote'],
          },
        },
      },
    ],
    max_completion_tokens: 1200,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-spark-1.2",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Convert a 125 EUR invoice to USD and tell me whether it exceeds a 130 USD approval threshold."
      },
      {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_fx_invoice",
            "type": "function",
            "function": {
              "name": "get_exchange_rate",
              "arguments": "{\"base\":\"EUR\",\"quote\":\"USD\"}"
            }
          }
        ]
      },
      {
        "role": "tool",
        "content": "{\"rate\":1.09,\"as_of\":\"2026-10-06T12:00:00Z\"}",
        "tool_call_id": "call_fx_invoice"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_exchange_rate",
          "description": "Return the current exchange rate between two currencies.",
          "parameters": {
            "type": "object",
            "properties": {
              "base": {
                "type": "string"
              },
              "quote": {
                "type": "string"
              }
            },
            "required": [
              "base",
              "quote"
            ]
          }
        }
      }
    ],
    "max_completion_tokens": 1200
  }
}'
```

```
125 EUR = **~136.25 USD** at the current rate of 1 EUR = 1.09 USD (as of 2026-10-06T12:00:00Z).

Calculation: 125 * 1.09 = 136.25

**Yes, it exceeds the 130 USD approval threshold** by approximately 6.25 USD and would require approval.
```

```json
{
  "id": "resp_6ac7b04ba509d24598194b61",
  "object": "response",
  "created_at": 1791471690,
  "model": "muse-spark-1.2",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6ac7b04ba509d24598194b61:rs_f4b0a6f3-023e-4c06-a3e4-10004d9ca24d",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_7d979f31-94ee-4666-b03e-a5e4a0c61fcc",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "125 EUR = **~136.25 USD** at the current rate of 1 EUR = 1.09 USD (as of 2026-10-06T12:00:00Z).\n\nCalculation: 125 * 1.09 = 136.25\n\n**Yes, it exceeds the 130 USD approval threshold** by approximately 6.25 USD and would require approval.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 679,
    "output_tokens": 362,
    "total_tokens": 1041,
    "input_tokens_details": {
      "cached_tokens": 113
    },
    "output_tokens_details": {
      "reasoning_tokens": 271
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "auto",
  "reasoning": {
    "effort": "high"
  },
  "background": false,
  "tools": [
    {
      "type": "function",
      "name": "get_exchange_rate",
      "description": "Return the current exchange rate between two currencies.",
      "parameters": {
        "properties": {
          "base": {
            "type": "string"
          },
          "quote": {
            "type": "string"
          }
        },
        "required": [
          "base",
          "quote"
        ],
        "type": "object"
      }
    }
  ],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1791471691,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 1200
}
```

</details>

<details>

<summary>**Meeting Action Register** — Extract decisions, owners, and follow-up dates from an unstructured project meeting transcript.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-1.2',
  {
    messages: [
      {
        role: 'system',
        content:
          'You are a precise project coordinator. Do not invent owners or dates. Mark missing information as unassigned or unspecified.',
      },
      {
        role: 'user',
        content:
          "Extract a concise action register from this transcript:\n\nMaya: We will ship the billing retry change after the staging soak.\nJon: I can own the dashboard, but I need the final event names from Priya.\nPriya: I will send those by Thursday.\nMaya: Let's review staging results Friday morning; if error rate stays below 0.5%, release Monday.\nJon: I will also add a rollback link to the runbook.\n\nReturn a table with action, owner, due date, and dependency, followed by the release criteria.",
      },
    ],
    max_completion_tokens: 1600,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-spark-1.2",
  "input": {
    "messages": [
      {
        "role": "system",
        "content": "You are a precise project coordinator. Do not invent owners or dates. Mark missing information as unassigned or unspecified."
      },
      {
        "role": "user",
        "content": "Extract a concise action register from this transcript:\n\nMaya: We will ship the billing retry change after the staging soak.\nJon: I can own the dashboard, but I need the final event names from Priya.\nPriya: I will send those by Thursday.\nMaya: Let'\''s review staging results Friday morning; if error rate stays below 0.5%, release Monday.\nJon: I will also add a rollback link to the runbook.\n\nReturn a table with action, owner, due date, and dependency, followed by the release criteria."
      }
    ],
    "max_completion_tokens": 1600
  }
}'
```

```
Based on transcript only - no assumptions made:

| Action | Owner | Due Date | Dependency |
| :--- | :--- | :--- | :--- |
| Ship billing retry change | Unassigned | Unspecified | Staging soak completion |
| Own/build dashboard | Jon | Unspecified | Final event names from Priya |
| Send final event names | Priya | Thursday | Unspecified |
| Review staging results | Unassigned (proposed by Maya) | Friday morning | Staging results available |
| Add rollback link to runbook | Jon | Unspecified | Unspecified |

**Release Criteria:**
Error rate stays below 0.5% during staging soak, to be reviewed Friday morning. If criteria is met, release Monday.
```

```json
{
  "id": "resp_6ac7b05469fb209135cc4a09",
  "object": "response",
  "created_at": 1791471700,
  "model": "muse-spark-1.2",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6ac7b05469fb209135cc4a09:rs_ab4bc0f0-3e37-48bf-92b6-2ddb16697c16",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_1062dd18-3e14-4f69-ad99-c9e552a4698c",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Based on transcript only - no assumptions made:\n\n| Action | Owner | Due Date | Dependency |\n| :--- | :--- | :--- | :--- |\n| Ship billing retry change | Unassigned | Unspecified | Staging soak completion |\n| Own/build dashboard | Jon | Unspecified | Final event names from Priya |\n| Send final event names | Priya | Thursday | Unspecified |\n| Review staging results | Unassigned (proposed by Maya) | Friday morning | Staging results available |\n| Add rollback link to runbook | Jon | Unspecified | Unspecified |\n\n**Release Criteria:**\nError rate stays below 0.5% during staging soak, to be reviewed Friday morning. If criteria is met, release Monday.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 158,
    "output_tokens": 2323,
    "total_tokens": 2481,
    "input_tokens_details": {
      "cached_tokens": 113
    },
    "output_tokens_details": {
      "reasoning_tokens": 2168
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "auto",
  "reasoning": {
    "effort": "high"
  },
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1791471700,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 4096
}
```

</details>

<details>

<summary>**Event Processing Trade-offs** — Explain a distributed-systems trade-off to an engineering team and recommend an approach for the stated workload.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-1.2',
  {
    messages: [
      {
        role: 'user',
        content:
          'We need to process 50,000 events per second, preserve per-customer ordering, tolerate consumer restarts, and replay events for up to seven days. Compare partitioned logs with a task queue in a decision table covering ordering, throughput, retries, replay, and operations. Then recommend one approach and name its main failure mode. Keep it under 600 words.',
      },
    ],
    max_completion_tokens: 1800,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-spark-1.2",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "We need to process 50,000 events per second, preserve per-customer ordering, tolerate consumer restarts, and replay events for up to seven days. Compare partitioned logs with a task queue in a decision table covering ordering, throughput, retries, replay, and operations. Then recommend one approach and name its main failure mode. Keep it under 600 words."
      }
    ],
    "max_completion_tokens": 1800
  }
}'
```

```
For 50k events/sec with strict ordering + replay, **Partitioned Log** is the correct pattern.

### Decision Table: Partitioned Log vs Task Queue

| Criteria | Partitioned Log `Kafka / Redpanda / Kinesis` | Task Queue `SQS / RabbitMQ / Celery / Sidekiq` |
| :--- | :--- | :--- |
| **Ordering** | **Strong per-key ordering.** Partition key = `customer_id` guarantees all events for one customer go to one ordered partition. Total order not guaranteed, but per-customer order is. | **Weak / No ordering.** Most queues provide best-effort FIFO per-queue, but scaling with multiple consumers breaks ordering. Requires one queue per customer to guarantee order - not feasible. |
| **Throughput** | **High & Horizontally Scalable.** 50k/sec is easily handled by adding partitions and brokers. Sequential disk I/O. Consumers scale with partition count. | **Limited by broker/acknowledgement overhead.** High throughput requires many queues/workers. Contention on central broker, prefetch limits and per-message ACKs reduce throughput at 50k/sec. |
| **Retries** | **At-least-once, consumer-managed.** Offset not committed until processed. On restart, consumer resumes from last committed offset. Requires idempotent consumer + Dead Letter Topic for poison pills to avoid blocking partition. | **Built-in ACK/NACK & retries.** Failed job NACKs and is retried/requeued automatically. Easy per-message retry with visibility timeout / backoff. Risk of duplicate execution if worker crashes after processing but before ACK. |
| **Replay** | **Native, for retention window.** Log is durable and immutable. Any consumer can rewind offset and replay last 7 days by configuration `retention.ms=7 days`. Ideal for new consumers, debugging, and reprocessing. | **No replay.** Once ACKed, message is deleted. Requires separate archival DB to rebuild history. Cannot replay 7 days without custom infrastructure. |
| **Operations** | **Higher operational cost.** Must manage brokers, partitions, replication, consumer rebalancing, schema registry, and monitor consumer lag. Partition count is hard to change and hot customers create skew. | **Lower operational cost.** Fully managed services `SQS` are simple. No partitions/rebalancing to manage. Monitoring is queue depth. |

### Recommendation: Partitioned Log

A Task Queue cannot meet two core requirements: per-customer ordering at scale and 7-day replay. It is designed for *distribution of work*, not *ordered event history*.

A Partitioned Log is designed for this exact workload. Partition by `customer_id` to preserve ordering, scale consumers via a consumer group `1 consumer per partition`, set retention to 7 days, and use committed offsets to tolerate restarts.

### Main Failure Mode to Design For

**Head-of-Line Blocking & Hot Partitions.**

Because ordering is strict per-partition, a single poison pill event or a high-volume customer will block all subsequent events for every other customer mapped to that same partition. The consumer cannot skip the failed event without violating order.

**Mitigation required:** 1) Idempotent consumers for at-least-once restarts, 2) Dead-letter topic with non-blocking retry to park poison pills after N attempts, and 3) Watch for partition skew - split hot customers with virtual partitions or salting if one customer dominates throughput, otherwise lag will grow unbounded.
```

```json
{
  "id": "resp_6ac7b061a100161e1ff649a1",
  "object": "response",
  "created_at": 1791471713,
  "model": "muse-spark-1.2",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6ac7b061a100161e1ff649a1:rs_60a314bf-06b8-48e8-a780-22fd4ffef97f",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_18082550-8bb3-4b52-a537-4673ef8152ab",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "For 50k events/sec with strict ordering + replay, **Partitioned Log** is the correct pattern.\n\n### Decision Table: Partitioned Log vs Task Queue\n\n| Criteria | Partitioned Log `Kafka / Redpanda / Kinesis` | Task Queue `SQS / RabbitMQ / Celery / Sidekiq` |\n| :--- | :--- | :--- |\n| **Ordering** | **Strong per-key ordering.** Partition key = `customer_id` guarantees all events for one customer go to one ordered partition. Total order not guaranteed, but per-customer order is. | **Weak / No ordering.** Most queues provide best-effort FIFO per-queue, but scaling with multiple consumers breaks ordering. Requires one queue per customer to guarantee order - not feasible. |\n| **Throughput** | **High & Horizontally Scalable.** 50k/sec is easily handled by adding partitions and brokers. Sequential disk I/O. Consumers scale with partition count. | **Limited by broker/acknowledgement overhead.** High throughput requires many queues/workers. Contention on central broker, prefetch limits and per-message ACKs reduce throughput at 50k/sec. |\n| **Retries** | **At-least-once, consumer-managed.** Offset not committed until processed. On restart, consumer resumes from last committed offset. Requires idempotent consumer + Dead Letter Topic for poison pills to avoid blocking partition. | **Built-in ACK/NACK & retries.** Failed job NACKs and is retried/requeued automatically. Easy per-message retry with visibility timeout / backoff. Risk of duplicate execution if worker crashes after processing but before ACK. |\n| **Replay** | **Native, for retention window.** Log is durable and immutable. Any consumer can rewind offset and replay last 7 days by configuration `retention.ms=7 days`. Ideal for new consumers, debugging, and reprocessing. | **No replay.** Once ACKed, message is deleted. Requires separate archival DB to rebuild history. Cannot replay 7 days without custom infrastructure. |\n| **Operations** | **Higher operational cost.** Must manage brokers, partitions, replication, consumer rebalancing, schema registry, and monitor consumer lag. Partition count is hard to change and hot customers create skew. | **Lower operational cost.** Fully managed services `SQS` are simple. No partitions/rebalancing to manage. Monitoring is queue depth. |\n\n### Recommendation: Partitioned Log\n\nA Task Queue cannot meet two core requirements: per-customer ordering at scale and 7-day replay. It is designed for *distribution of work*, not *ordered event history*.\n\nA Partitioned Log is designed for this exact workload. Partition by `customer_id` to preserve ordering, scale consumers via a consumer group `1 consumer per partition`, set retention to 7 days, and use committed offsets to tolerate restarts.\n\n### Main Failure Mode to Design For\n\n**Head-of-Line Blocking & Hot Partitions.**\n\nBecause ordering is strict per-partition, a single poison pill event or a high-volume customer will block all subsequent events for every other customer mapped to that same partition. The consumer cannot skip the failed event without violating order.\n\n**Mitigation required:** 1) Idempotent consumers for at-least-once restarts, 2) Dead-letter topic with non-blocking retry to park poison pills after N attempts, and 3) Watch for partition skew - split hot customers with virtual partitions or salting if one customer dominates throughput, otherwise lag will grow unbounded.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 80,
    "output_tokens": 1386,
    "total_tokens": 1466,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 667
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "auto",
  "reasoning": {
    "effort": "high"
  },
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1791471713,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 4096
}
```

</details>

<details>

<summary>**Web Search Grounding** — Use Meta's Responses API web search grounding to answer a current-events question with citations.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-spark-1.2',
  {
    input: 'What is the latest major technology news today? Cite the sources.',
    tools: [{ type: 'web_search' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-spark-1.2",
  "input": {
    "input": "What is the latest major technology news today? Cite the sources.",
    "tools": [{"type": "web_search"}]
  }
}'
```

```
I'll gather today's biggest tech headlines for you — searching the latest coverage now.
```

```json
{
  "id": "resp_6ac7b061a0901a5463764dc7",
  "object": "response",
  "created_at": 1791471713,
  "model": "muse-spark-1.2",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6ac7b061a0901a5463764dc7:rs_2c2099d2-8863-470a-8810-2ddf2fff9d3e",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "rs_cb639230-45c1-4b26-a436-faaf8ab36206",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "I'll gather today's biggest tech headlines for you — searching the latest coverage now.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "phase": "commentary",
      "status": "completed"
    },
    {
      "type": "web_search_call",
      "id": "ws_call_1490572f-13ac-4577-ba12-f6f4907064ee",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "major technology news today October 8 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_4744e507-abd8-4bb6-b4a3-5fb5c178ceb4",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "tech news headlines October 8 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_40146bf5-4464-4d1e-9427-31493db38718",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "breaking technology news October 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_f37bd93c-4f72-4728-9b31-afd646c47129",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "\"October 8, 2026\" technology"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_ecaabafc-bbeb-4527-963d-865fb5de9357",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.archynetys.com/trend/2026-10-08/samsung-forecasts-record-third-quarter-profit-of-80-billion-on-the-back-of-ai"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_7fdbfebc-908c-4add-96eb-742232c1accf",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.archynetys.com/trend/2026-10-07/microsoft-surface-and-windows-event-2026-all-the-announcements-and-analysis"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_38245068-43bb-4a86-baa8-0731d239533e",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://techstartups.com/2026/10/08/startup-funding-news-today-october-8-2026-manus-universal-quantum-mecka-verso-more/"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_bd19abc4-53ab-49a7-bb7f-b42a6f7ebaeb",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "technology news today AI chip"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_db54ecc1-ee6a-4f22-83f8-5ba42c60606b",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "latest technology news Reuters AP October 8 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_581890ae-b3e4-4e91-81d1-a41b60a5d869",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "The Verge tech news today October 8 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_1d4fa484-1ac1-4e9a-a7ed-d7559ff906de",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "Samsung profit record AI demand October 8 2026"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_c3f9d6b5-5943-423a-9b36-43ddf5ed8b21",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.lapost.com/content/samsung-q3-profit-jumps-783-as-ai-memory-boom-lifts-chip-earnings"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_f630d925-7941-4b83-bec4-baaf78ab778e",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://harpianews.com/ai-chip-growth-pushes-samsung-earnings-to-file-80bn/"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_42a04b68-1ce3-4369-a913-124d609dba29",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "http://dailyiq.me/stock/ORCL"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_9737abf0-ee83-4855-90ad-7b7bf7fd5cd6",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://aiagentstore.ai/ai-agent-news/today"
      }
    },
    {
      "type": "web_search_call",
      "id": "ws_call_99bdfd45-639e-467e-bd33-279755796cf7",
      "status": "completed",
      "action": {
        "type": "search",
        "query": "Wi-Fi 8 routers ASUS TP-Link October 2026"
      }
    },
    {
      "type": "reasoning",
      "id": "rs_6ac7b061a0901a5463764dc7:rs_4a9e895b-ecc8-41ec-9083-205c72d5dcc4",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_bd35a465-b38f-472b-bf73-f82c3256caaf",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Latest Major Technology News - Today, October 8, 2026:\n\n**1. Samsung forecasts record Q3 profit on AI memory boom**\n* Samsung Electronics on Thursday projected its quarterly profit would top 100 trillion won, a world first for a technology company, estimating a nearly nine-fold jump in third-quarter earnings as booming demand for AI chips drove strong memory sales.\n* The company projects a $80 billion Q3 profit as AI‑driven chip demand spikes, setting a new industry benchmark, published October 8, 2026 12:38 UTC.\n* Details: Samsung Electronics says it expects a nine-fold surge in its quarterly earnings contrast with a year earlier, pushed by surging demand for memory chips utilized in artificial intelligence (AI) information centres, with operating profit for the three months to the end of September to soar to 107.4tn won ($80bn), slightly ahead of an LSEG SmartEstimate of 106.1 trillion won. Related coverage notes it as Samsung flags $80 billion profit on AI boom, highest quarterly for any tech company and that Samsung’s Q3 2026 profit jumps 782% to $80 billion on AI chip demand. The forecast marks Samsung's fourth straight quarter of record operating profit, driven by AI‑optimized memory chips, described as an AI chip boom.\n\n**2. Microsoft Surface and Windows Event 2026**\n* Microsoft Surface and Windows Event 2026: All the Announcements and Analysis Live From San Francisco — published October 8, 2026 06:46 UTC.\n* Primary Driver: Microsoft unveils MacBook Pro competitor at Windows and Surface event.\n* Microsoft has announced a MacBook Pro competitor, a new line of laptops designed to challenge Apple's dominance in the premium laptop market, with coverage from The Verge explaining that Microsoft built its new laptop with a focus on performance and portability, featuring a custom-designed processor and a sleek, aluminum design.\n\n**3. Oracle - AI chip financing and other tech developments**\n* On Oct 8, Oracle was reported to be negotiating with Apollo and Goldman Sachs to finance a large purchase of AI chips through a lease‑structured vehicle, a move designed to avoid adding to its bond debt amid concerns over rising leverage.\n* Oracle entered negotiations with Apollo and Goldman Sachs to finance a substantial purchase of AI chips through a lease‑structured vehicle, reflecting a broader trend of pursuing private debt arrangements worth tens of billions to fund AI hardware acquisitions.\n\n**4. Venture Funding - AI Agents, Quantum and Robotics dominate Oct 8**\n* Startup funding over the past 24 hours has been dominated by a remarkable comeback in the AI agent market, alongside
... response truncated ...
```

</details>

## Parameters

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/#page","headline":"Muse Spark 1.2","description":"Muse Spark 1.2 is Meta's agentic and coding model for multi-step tool loops, software engineering assistants, and long-context reasoning.","url":"https://developers.cloudflare.com/ai/models/meta/muse-spark-1.2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
