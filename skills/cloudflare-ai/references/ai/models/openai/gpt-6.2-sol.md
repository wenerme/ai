---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: OpenAI's go-to model for everyday work, from coding to powering agents at scale. GPT-6.2 Sol offers capable reasoning and tool use across common workflows.
title: GPT-6.2 Sol
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-6.2 Sol

Text Generation • OpenAI

Model ID

`openai/gpt-6.2-sol` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party
- Zero data retention

OpenAI's go-to model for everyday work, from coding to powering agents at scale. GPT-6.2 Sol offers capable reasoning and tool use across common workflows.

| Model Info | |
| --- | --- |
| Context Window [↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,050,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/models/gpt-6.2-sol) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Short-context input (per 1M)$2.00</li><li>Short-context cached input (per 1M)$0.10</li><li>Short-context cache write (per 1M)$2.50</li><li>Short-context output (per 1M)$10.00</li><li>Long-context input (per 1M)$3.00</li><li>Long-context cached input (per 1M)$0.15</li><li>Long-context cache write (per 1M)$3.75</li><li>Long-context output (per 1M)$15.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-6.2-sol',
  {
    input:
      'A service targets 99.95% monthly availability and has been down for 28 minutes in a 30-day month. How much of its monthly error budget remains? Show the calculation briefly.',
    max_output_tokens: 512,
    reasoning: { effort: 'medium' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6.2-sol",
  "input": "A service targets 99.95% monthly availability and has been down for 28 minutes in a 30-day month. How much of its monthly error budget remains? Show the calculation briefly.",
  "max_output_tokens": 512,
  "reasoning": {
    "effort": "medium"
  }
}'
```

```
**None remains.** The service exceeded its monthly error budget by **6.4 minutes**.

A 30-day month has \(30 \times 24 \times 60 = 43{,}200\) minutes. At 99.95% availability, the allowed downtime is \(43{,}200 \times 0.0005 = 21.6\) minutes. After 28 minutes of downtime, the balance is \(21.6 - 28 = -6.4\) minutes.
```

```json
{
  "id": "resp_00ac53ff7cffe7e7006afca0171f6487d19f407c194c650a46",
  "object": "response",
  "created_at": 1794940951,
  "status": "completed",
  "access_programs": {
    "cyber": "standard"
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1794940953,
  "error": null,
  "frequency_penalty": 0,
  "image": {
    "context_compression": "disabled"
  },
  "incomplete_details": null,
  "input_transformations": [],
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-6.2-sol",
  "moderation": null,
  "output": [
    {
      "id": "msg_00ac53ff7cffe7e7006afca017d06487d1b035b9bd43b719cd",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "**None remains.** The service exceeded its monthly error budget by **6.4 minutes**.\n\nA 30-day month has \\(30 \\times 24 \\times 60 = 43{,}200\\) minutes. At 99.95% availability, the allowed downtime is \\(43{,}200 \\times 0.0005 = 21.6\\) minutes. After 28 minutes of downtime, the balance is \\(21.6 - 28 = -6.4\\) minutes."
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "context": "all_turns",
    "effort": "medium",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tool_usage": {
    "image_gen": {
      "input_tokens": 0,
      "input_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "total_tokens": 0
    },
    "web_search": {
      "num_requests": 0
    }
  },
  "tools": [],
  "top_logprobs": 0,
  "top_p": 1,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 45,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cache_write_tokens_details": {
        "ttl_12h_tokens": 0,
        "ttl_30m_tokens": 0
      },
      "cached_tokens": 0
    },
    "output_tokens": 111,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 156
  },
  "user": null,
  "metadata": {}
}
```

## Examples

<details>

<summary>**Web Search (RunV2)** — Search for current guidance and summarize the key points</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-6.2-sol',
  {
    input:
      'Search for current recommendations for writing reliable retry logic in distributed services. Summarize three practical recommendations with sources.',
    max_output_tokens: 512,
    tools: [{ type: 'web_search_preview' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6.2-sol",
  "input": "Search for current recommendations for writing reliable retry logic in distributed services. Summarize three practical recommendations with sources.",
  "max_output_tokens": 512,
  "tools": [
    {
      "type": "web_search_preview"
    }
  ]
}'
```

```
Current guidance from AWS, Google Cloud, and Microsoft Azure points to three practical rules:

1. **Retry only transient failures, and only when repeating the operation is safe.** Use the dependency’s documented retryable errors: throttling and temporary unavailability are common candidates; invalid requests and permission errors generally aren’t. A timeout doesn’t mean a write failed—it may have succeeded before the response was lost. For operations with side effects, reuse the same idempotency key across attempts if the server supports deduplication; otherwise, don’t retry blindly. ([docs.cloud.google.com](https://docs.cloud.google.com/storage/docs/retry-strategy?utm_source=openai))
2. **Use capped exponential backoff with jitter.** Increase the delay between attempts up to a cap, and randomize the wait so clients that fail together don’t retry together. If the server sends `Retry-After`, wait at least that long; if the wait won’t fit within the caller’s deadline, skip the retry. ([builder.aws.com](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter))
3. **Put retries in one layer and limit their total load.** Check whether your SDK or proxy already retries before adding an application-level loop. Set a per-attempt timeout, a maximum attempt count, and an end-to-end deadline. For busy dependencies, also use a shared retry budget across requests so that many individually reasonable retries don’t collectively overwhelm a struggling service. ([builder.aws.com](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter))
```

```json
{
  "id": "resp_05cee98713911bd5006afca019937887d189b33fa97bead4c2",
  "object": "response",
  "created_at": 1794940953,
  "status": "completed",
  "access_programs": {
    "cyber": "standard"
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1794940963,
  "error": null,
  "frequency_penalty": 0,
  "image": {
    "context_compression": "disabled"
  },
  "incomplete_details": null,
  "input_transformations": [],
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-6.2-sol",
  "moderation": null,
  "output": [
    {
      "id": "ws_05cee98713911bd5006afca01a4e9087d1aba020bd152966af",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "AWS Builders Library timeouts retries backoff jitter idempotency retries single layer token bucket",
          "Google Cloud retry strategy exponential backoff jitter idempotency retry 429 503 distributed services",
          "Microsoft Azure architecture retry pattern retry budget transient failures Retry-After cloud design patterns"
        ],
        "query": "AWS Builders Library timeouts retries backoff jitter idempotency retries single layer token bucket"
      }
    },
    {
      "id": "ws_05cee98713911bd5006afca01ded4887d187a265914d6073c0",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/"
      }
    },
    {
      "id": "msg_05cee98713911bd5006afca01f622c87d1afdc5cfbe6c93a90",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [
            {
              "type": "url_citation",
              "end_index": 693,
              "start_index": 591,
              "title": "Retry strategy  |  Cloud Storage  |  Google Cloud Documentation",
              "url": "https://docs.cloud.google.com/storage/docs/retry-strategy?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1118,
              "start_index": 997,
              "title": "Timeouts, retries, and backoff with jitter | AWS Builder Center",
              "url": "https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter"
            },
            {
              "type": "url_citation",
              "end_index": 1635,
              "start_index": 1514,
              "title": "Timeouts, retries, and backoff with jitter | AWS Builder Center",
              "url": "https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter"
            }
          ],
          "logprobs": [],
          "text": "Current guidance from AWS, Google Cloud, and Microsoft Azure points to three practical rules:\n\n1. **Retry only transient failures, and only when repeating the operation is safe.** Use the dependency’s documented retryable errors: throttling and temporary unavailability are common candidates; invalid requests and permission errors generally aren’t. A timeout doesn’t mean a write failed—it may have succeeded before the response was lost. For operations with side effects, reuse the same idempotency key across attempts if the server supports deduplication; otherwise, don’t retry blindly. ([docs.cloud.google.com](https://docs.cloud.google.com/storage/docs/retry-strategy?utm_source=openai))\n2. **Use capped exponential backoff with jitter.** Increase the delay between attempts up to a cap, and randomize the wait so clients that fail together don’t retry together. If the server sends `Retry-After`, wait at least that long; if the wait won’t fit within the caller’s deadline, skip the retry. ([builder.aws.com](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter))\n3. **Put retries in one layer and limit their total load.** Check whether your SDK or proxy already retries before adding an application-level loop. Set a per-attempt timeout, a maximum attempt count, and an end-to-end deadline. For busy dependencies, also use a shared retry budget across requests so that many individually reasonable retries don’t collectively overwhelm a struggling service. ([builder.aws.com](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter))"
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "context": "all_turns",
    "effort": "medium",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tool_usage": {
    "image_gen": {
      "input_tokens": 0,
      "input_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "total_tokens": 0
    },
    "web_search": {
      "num_requests": 1
    }
  },
  "tools": [
    {
      "type": "web_search_preview",
      "search_content_types": [
        "text"
      ],
      "search_context_size": "medium",
      "user_location": {
        "type": "approximate",
        "city": null,
        "country": "US",
        "region": null,
        "timezone": null
      }
    }
  ],
  "top_logprobs": 0,
  "top_p": 1,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 14968,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cache_write_tokens_details": {
        "ttl_12h_tokens": 0,
        "ttl_30m_tokens": 0
      },
      "cached_tokens": 4461
    },
    "output_tokens": 510,
    "output_tokens_details": {
      "reasoning_tokens": 165
    },
    "total_tokens": 15478
  },
  "user": null,
  "metadata": {}
}
```

</details>

<details>

<summary>**Chat Completions Coding (RunV2)** — Generate a concise code example through Chat Completions</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-6.2-sol',
  {
    messages: [
      {
        role: 'user',
        content:
          'Write a TypeScript function that groups an array of strings by their first letter. Include a short example of the output.',
      },
    ],
    max_completion_tokens: 512,
    reasoning_effort: 'low',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-6.2-sol",
  "messages": [
    {
      "role": "user",
      "content": "Write a TypeScript function that groups an array of strings by their first letter. Include a short example of the output."
    }
  ],
  "max_completion_tokens": 512,
  "reasoning_effort": "low"
}'
```

````
```typescript
function groupByFirstLetter(words: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};

  for (const word of words) {
    if (word.length === 0) continue;

    const firstLetter = word.charAt(0).toLowerCase();
    (groups[firstLetter] ??= []).push(word);
  }

  return groups;
}

console.log(groupByFirstLetter(["Apple", "banana", "apricot", "Blueberry"]));
// { a: ["Apple", "apricot"], b: ["banana", "Blueberry"] }
```

The function groups words case-insensitively, preserves their original spelling and order within each group, and skips empty strings.
````

```json
{
  "id": "resp_0a6cf3e0bc5c5614006afca024307087d19792161b4e6d5e81",
  "object": "response",
  "created_at": 1794940964,
  "status": "completed",
  "access_programs": {
    "cyber": "standard"
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1794940966,
  "error": null,
  "frequency_penalty": 0,
  "image": {
    "context_compression": "disabled"
  },
  "incomplete_details": null,
  "input_transformations": [],
  "instructions": null,
  "max_output_tokens": 512,
  "max_tool_calls": null,
  "model": "gpt-6.2-sol",
  "moderation": null,
  "output": [
    {
      "id": "msg_0a6cf3e0bc5c5614006afca024e86887d186008e2b0cb15f3b",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "```typescript\nfunction groupByFirstLetter(words: string[]): Record<string, string[]> {\n  const groups: Record<string, string[]> = {};\n\n  for (const word of words) {\n    if (word.length === 0) continue;\n\n    const firstLetter = word.charAt(0).toLowerCase();\n    (groups[firstLetter] ??= []).push(word);\n  }\n\n  return groups;\n}\n\nconsole.log(groupByFirstLetter([\"Apple\", \"banana\", \"apricot\", \"Blueberry\"]));\n// { a: [\"Apple\", \"apricot\"], b: [\"banana\", \"Blueberry\"] }\n```\n\nThe function groups words case-insensitively, preserves their original spelling and order within each group, and skips empty strings."
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "context": "all_turns",
    "effort": "low",
    "mode": "standard",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tool_usage": {
    "image_gen": {
      "input_tokens": 0,
      "input_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "output_tokens": 0,
      "output_tokens_details": {
        "image_tokens": 0,
        "text_tokens": 0
      },
      "total_tokens": 0
    },
    "web_search": {
      "num_requests": 0
    }
  },
  "tools": [],
  "top_logprobs": 0,
  "top_p": 1,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 30,
    "input_tokens_details": {
      "cache_write_tokens": 0,
      "cache_write_tokens_details": {
        "ttl_12h_tokens": 0,
        "ttl_30m_tokens": 0
      },
      "cached_tokens": 0
    },
    "output_tokens": 157,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 187
  },
  "user": null,
  "metadata": {}
}
```

</details>

## Parameters

Schema variant

ResponsesChat CompletionsMessages

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

▶messages\[]

`array`required

temperature

`number`minimum: 0maximum: 2

max\_tokens

`number`exclusiveMinimum: 0

max\_completion\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

frequency\_penalty

`number`minimum: -2maximum: 2

presence\_penalty

`number`minimum: -2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[]

`array`

tool\_choice

response\_format

▶modalities\[]

`array`

▶audio{}

`object`

reasoning\_effort

`string`Optional reasoning control; availability and accepted values are model-dependent.

▶messages\[]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

▶system

`one of`

temperature

`number`minimum: 0maximum: 1

top\_p

`number`minimum: 0maximum: 1

top\_k

`number`exclusiveMinimum: 0

stream

`boolean`

▶metadata{}

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

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[]

`array`

▶usage{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[]

`array`

model

`string`

stop\_reason

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6.2-sol/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6.2-sol/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-6.2-sol/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-6.2-sol/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-6.2-sol/#page","headline":"GPT-6.2 Sol","description":"OpenAI's go-to model for everyday work, from coding to powering agents at scale. GPT-6.2 Sol offers capable reasoning and tool use across common workflows.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-6.2-sol/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
