---
description: Claude Sonnet 5.5 offers the best combination of speed and intelligence, with adaptive thinking for coding, tool use, reasoning, and long-horizon work.
title: Claude Sonnet 5.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Sonnet 5.5

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-sonnet-5.5`

- Third-party

Claude Sonnet 5.5 offers the best combination of speed and intelligence, with adaptive thinking for coding, tool use, reasoning, and long-horizon work.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://platform.claude.com/docs/en/models/sonnet-5-5/overview) |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$2.00</li><li>Cached input (per 1M tokens)$0.20</li><li>Cache creation (per 1M tokens)$2.50</li><li>Output (per 1M tokens)$10.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'Explain why database indexes improve lookup performance.', role: 'user' }],
    system: 'You are a concise database engineering tutor. Include one concrete example.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "Explain why database indexes improve lookup performance.",
      "role": "user"
    }
  ],
  "system": "You are a concise database engineering tutor. Include one concrete example."
}'
```

````
**Core idea:** An index is a separate, sorted data structure (usually a B-tree) that lets the database find rows without scanning the entire table.

**Without an index:** To find a row, the database does a *full table scan*, checking every row. Cost grows linearly: O(n).

**With an index:** The database navigates a balanced tree. Each step eliminates a large fraction of the remaining data, so lookup cost is O(log n). Because B-tree nodes hold hundreds of keys, even huge tables are typically only 3–4 levels deep, meaning just a few disk/page reads.

**Analogy:** It's like a book's index. Instead of reading every page to find "photosynthesis," you look it up alphabetically and jump straight to the page.

**Concrete example**

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(100)
);
-- Assume 10 million rows

SELECT * FROM users WHERE email = 'ana@example.com';
```

- **No index on `email`:** The database reads all 10,000,000 rows to find matches. This may take seconds.
- **After indexing:**
  ```sql
  CREATE INDEX idx_users_email ON users(email);
  ```
  The database traverses the B-tree on `email` (~3–4 page reads), finds a pointer to the matching row, and fetches it directly. This typically takes milliseconds.

You can verify this with `EXPLAIN`: you'll see a `Seq Scan` / `type: ALL` before, and an `Index Scan` / `type: ref` after.

**Why it works, in short**
1. Keys are stored **sorted**, enabling binary-search-like navigation.
2. The tree is **shallow and wide**, minimizing expensive disk I/O.
3. Leaf entries **point directly** to the row location.

**Tradeoffs:** Indexes consume extra storage and slow down `INSERT`/`UPDATE`/`DELETE`, since the index must be kept in sync. Index columns you frequently filter, join, or sort on, not everything.
````

```json
{
  "model": "claude-sonnet-5-5",
  "id": "msg_011CfWPzXNFbhjzHxLnrjPAs",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "**Core idea:** An index is a separate, sorted data structure (usually a B-tree) that lets the database find rows without scanning the entire table.\n\n**Without an index:** To find a row, the database does a *full table scan*, checking every row. Cost grows linearly: O(n).\n\n**With an index:** The database navigates a balanced tree. Each step eliminates a large fraction of the remaining data, so lookup cost is O(log n). Because B-tree nodes hold hundreds of keys, even huge tables are typically only 3–4 levels deep, meaning just a few disk/page reads.\n\n**Analogy:** It's like a book's index. Instead of reading every page to find \"photosynthesis,\" you look it up alphabetically and jump straight to the page.\n\n**Concrete example**\n\n```sql\nCREATE TABLE users (\n  id INT PRIMARY KEY,\n  email VARCHAR(255),\n  name VARCHAR(100)\n);\n-- Assume 10 million rows\n\nSELECT * FROM users WHERE email = 'ana@example.com';\n```\n\n- **No index on `email`:** The database reads all 10,000,000 rows to find matches. This may take seconds.\n- **After indexing:**\n  ```sql\n  CREATE INDEX idx_users_email ON users(email);\n  ```\n  The database traverses the B-tree on `email` (~3–4 page reads), finds a pointer to the matching row, and fetches it directly. This typically takes milliseconds.\n\nYou can verify this with `EXPLAIN`: you'll see a `Seq Scan` / `type: ALL` before, and an `Index Scan` / `type: ref` after.\n\n**Why it works, in short**\n1. Keys are stored **sorted**, enabling binary-search-like navigation.\n2. The tree is **shallow and wide**, minimizing expensive disk I/O.\n3. Leaf entries **point directly** to the row location.\n\n**Tradeoffs:** Indexes consume extra storage and slow down `INSERT`/`UPDATE`/`DELETE`, since the index must be kept in sync. Index columns you frequently filter, join, or sort on, not everything."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 46,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 705,
    "output_tokens_details": {
      "thinking_tokens": 0
    },
    "service_tier": "standard",
    "inference_geo": "global"
  },
  "diagnostics": null
}
```

## Examples

<details>

<summary>**Adaptive Reasoning** — Use adaptive thinking with high effort for a multi-step reasoning task.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5.5',
  {
    max_tokens: 2048,
    messages: [
      {
        content:
          'A service processes 120 jobs per minute. Each retry adds 15% more work, and 8% of jobs retry once. What is the expected number of jobs processed per minute including retries? Show the calculation.',
        role: 'user',
      },
    ],
    output_config: { effort: 'high' },
    thinking: { type: 'adaptive' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5.5",
  "max_tokens": 2048,
  "messages": [
    {
      "content": "A service processes 120 jobs per minute. Each retry adds 15% more work, and 8% of jobs retry once. What is the expected number of jobs processed per minute including retries? Show the calculation.",
      "role": "user"
    }
  ],
  "output_config": {
    "effort": "high"
  },
  "thinking": {
    "type": "adaptive"
  }
}'
```

```
**Assumptions:** 120 jobs/min is the base load. 8% of jobs are retried exactly once. Each retry costs 15% more work than the original run, so it counts as 1.15 job-equivalents.

**Calculation**

1. Jobs retried per minute: 120 × 0.08 = 9.6
2. Work from retries: 9.6 × 1.15 = 11.04 job-equivalents
3. Total: 120 + 11.04 = **131.04 job-equivalents per minute**

That is about 9.2% more load than the base 120.

**Alternative reading:** If you only want the number of executions and each retry counts as one ordinary job, the total is 120 + 9.6 = **129.6 jobs per minute**. The 15% extra work then doesn't enter the count.

The first figure (131.04) is the better estimate of capacity needed, since it reflects the heavier cost of retries.
```

```json
{
  "model": "claude-sonnet-5-5",
  "id": "msg_011CfWPzyhH6mWkQYYXi8zC5",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "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"
    },
    {
      "type": "text",
      "text": "**Assumptions:** 120 jobs/min is the base load. 8% of jobs are retried exactly once. Each retry costs 15% more work than the original run, so it counts as 1.15 job-equivalents.\n\n**Calculation**\n\n1. Jobs retried per minute: 120 × 0.08 = 9.6\n2. Work from retries: 9.6 × 1.15 = 11.04 job-equivalents\n3. Total: 120 + 11.04 = **131.04 job-equivalents per minute**\n\nThat is about 9.2% more load than the base 120.\n\n**Alternative reading:** If you only want the number of executions and each retry counts as one ordinary job, the total is 120 + 9.6 = **129.6 jobs per minute**. The 15% extra work then doesn't enter the count.\n\nThe first figure (131.04) is the better estimate of capacity needed, since it reflects the heavier cost of retries."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 72,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 667,
    "output_tokens_details": {
      "thinking_tokens": 368
    },
    "service_tier": "standard",
    "inference_geo": "global"
  },
  "diagnostics": null
}
```

</details>

<details>

<summary>**Tool Use** — Ask the model to select and call a tool when it needs structured external information.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'What is the weather in San Francisco right now?', role: 'user' }],
    tools: [
      {
        description: 'Get the current weather for a city.',
        input_schema: {
          properties: { city: { type: 'string' } },
          required: ['city'],
          type: 'object',
        },
        name: 'get_weather',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What is the weather in San Francisco right now?",
      "role": "user"
    }
  ],
  "tools": [
    {
      "description": "Get the current weather for a city.",
      "input_schema": {
        "properties": {
          "city": {
            "type": "string"
          }
        },
        "required": [
          "city"
        ],
        "type": "object"
      },
      "name": "get_weather"
    }
  ]
}'
```

</details>

<details>

<summary>**Streaming Checklist** — Enable streaming for incremental response delivery.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-5.5',
  {
    max_tokens: 1024,
    messages: [
      { content: 'Write a short three-step checklist for reviewing a pull request.', role: 'user' },
    ],
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-5.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "Write a short three-step checklist for reviewing a pull request.",
      "role": "user"
    }
  ],
  "stream": true
}'
```

```
# Pull Request Review Checklist

1. **Understand the intent**
   - Read the PR description and linked issue.
   - Confirm the change solves the stated problem and stays within scope.

2. **Review the code**
   - Check for correctness, edge cases, and potential bugs.
   - Look for clarity, consistency with existing conventions, and unnecessary complexity.
   - Watch for security, performance, or backward-compatibility concerns.

3. **Verify quality and give feedback**
   - Confirm tests exist, are meaningful, and pass in CI.
   - Check that docs or comments are updated where needed.
   - Leave clear, constructive comments, distinguishing blocking issues from optional suggestions, then approve or request changes.
```

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-sonnet-5-5",
      "id": "msg_011CfWQ1TEzRFYuStMzD8Fi7",
      "type": "message",
      "role": "assistant",
      "content": [],
      "container": null,
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 28,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 8,
        "service_tier": "standard",
        "inference_geo": "global"
      },
      "diagnostics": null
    }
  },
  {
    "type": "content_block_start",
    "index": 0,
    "content_block": {
      "type": "text",
      "text": ""
    }
  },
  "... 53 more chunks omitted ...",
  {
    "type": "message_stop"
  }
]
```

</details>

## Parameters

▶messages\[]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

stream

`boolean`

▶metadata{}

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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/#page","headline":"Claude Sonnet 5.5","description":"Claude Sonnet 5.5 offers the best combination of speed and intelligence, with adaptive thinking for coding, tool use, reasoning, and long-horizon work.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-5.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
