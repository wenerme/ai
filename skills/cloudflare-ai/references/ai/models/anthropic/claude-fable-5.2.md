---
description: Claude Fable 5.2 is built for demanding reasoning and long-horizon agentic work, with adaptive thinking, a 1M token context window, and up to 128K output tokens.
title: Claude Fable 5.2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Fable 5.2

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`anthropic/claude-fable-5.2` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party
- Zero data retention

Claude Fable 5.2 is built for demanding reasoning and long-horizon agentic work, with adaptive thinking, a 1M token context window, and up to 128K output tokens.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://platform.claude.com/docs/en/models/fable-5-2/overview) |
| Zero data retention | Yes |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$8.00</li><li>Cached input (per 1M tokens)$0.20</li><li>Cache creation (per 1M tokens)$10.00</li><li>Output (per 1M tokens)$40.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5.2',
  {
    max_tokens: 1024,
    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],
    system: 'You are a helpful coding assistant specializing in Python.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-fable-5.2",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "system": "You are a helpful coding assistant specializing in Python."
}'
```

````
Use the built-in `json` module:

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

`json.load()` parses the file into Python objects: JSON objects become `dict`s, arrays become `list`s, and strings, numbers, booleans, and `null` become `str`, `int`/`float`, `bool`, and `None`.

**Accessing the data**

```python
# Given: {"name": "Alice", "skills": ["Python", "SQL"]}
print(data["name"])        # Alice
print(data["skills"][0])   # Python
```

**Handling common errors**

```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

**Tips**

- Use `json.load(f)` for a file object and `json.loads(s)` for a string.
- To write JSON back to a file, use `json.dump(data, f, indent=2)`.
- If your file has one JSON object per line (JSON Lines, `.jsonl`), parse it line by line:

  ```python
  with open("data.jsonl", encoding="utf-8") as f:
      records = [json.loads(line) for line in f]
  ```
````

```json
{
  "model": "claude-fable-5-2",
  "id": "msg_011CgsuBy7YD3SdLFBeFswvH",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAQSrwUKEAgTGAI4AUIIdGhpbmtpbmcSDKSIJLl+xWkT9SHrMxoMG4TBjLreVuPOFLKpIjCmvEYg45oRWbtnwo7Cl4w2BAnhnuajXGMmXrEtS0oZqlgNyoiMoDdPeNnC0XlLKyQqzARe2l67RwLuKchg1RsCy5Src7C+V+Tz52I2UkHz3vbKNDxC5KgEkj7V7X7golGAUf6Tcx0gUBLbyQiqJBuyWLqcKieM/QfcWaMoNbJ4VtS5sXZiD3pAl2EPkJh4e/E4Yppq4O/MjMlKlTg5lxwWJ4bpDP1qyMFbmAQM7EfDByWKaRZap+1lPYm7f7JKLtTZM+5Q+b/LNWAF1d5UkaQPbX485JjiQNX2GNqxGoAg/IAypOjp3U5FQP9OIj+HGXtQOIArV/eBqrQUgQu6En0ecOFxAv6kIHM0MSaLb3V3cLmBqAPCzf4+PEYqYUrO9wZ75nxvl6QZConTpPW+llA8v2181t7mpkMT6Z5Gspj6r50jNMDqwj0IASz/38cpBcvao5ao7C2QoK3aDuJBXsilfIeZzhmj0NTstS4Y2B3VhkzVuWrbJIosJ7dnfCCuAQUbha3VS2DZ43Hmv4tvMZ2Sx/1vGLZ1Wou7QhmWXsOWj9ncLfir3FGT0NuQy+AqLLW/lZzzjvoOcj29LpRSUwg8rmFNak2ljC66IbmD8fBmuk58BVzDiYJU/uj9796ApVZ8Azk2JXd0uSEMyFJXpUxuetqkV8+gm6Hn0oVvuml+YYCpSci7GxTpf8hY5d22vgepSx2Nhx+icIbdXzOPjdLpgoai1i/vMRZ9iXwjed//0ExsQlpV/6e4h+OtiT7XZTBo3IaRfDOYQnIHB1q4VUtSBk0YJPtqiI3h8D62dJ/1Qw7D8RFBfQjgyp1JaSVMTlH+Jf98Zki8LA4oiSEnO+cYAQ=="
    },
    {
      "type": "text",
      "text": "Use the built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\n`json.load()` parses the file into Python objects: JSON objects become `dict`s, arrays become `list`s, and strings, numbers, booleans, and `null` become `str`, `int`/`float`, `bool`, and `None`.\n\n**Accessing the data**\n\n```python\n# Given: {\"name\": \"Alice\", \"skills\": [\"Python\", \"SQL\"]}\nprint(data[\"name\"])        # Alice\nprint(data[\"skills\"][0])   # Python\n```\n\n**Handling common errors**\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n**Tips**\n\n- Use `json.load(f)` for a file object and `json.loads(s)` for a string.\n- To write JSON back to a file, use `json.dump(data, f, indent=2)`.\n- If your file has one JSON object per line (JSON Lines, `.jsonl`), parse it line by line:\n\n  ```python\n  with open(\"data.jsonl\", encoding=\"utf-8\") as f:\n      records = [json.loads(line) for line in f]\n  ```"
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 40,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 491,
    "output_tokens_details": {
      "thinking_tokens": 24
    },
    "service_tier": "standard",
    "inference_geo": "global",
    "speed": "standard"
  },
  "diagnostics": null
}
```

## Examples

<details>

<summary>**Multi-turn Conversation** — Continue a conversation with prior assistant context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5.2',
  {
    max_tokens: 1024,
    messages: [
      {
        content: 'I need help planning a road trip from San Francisco to Los Angeles.',
        role: 'user',
      },
      {
        content:
          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
        role: 'assistant',
      },
      { content: 'Yes, what are some good places to stop?', role: 'user' },
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
  "model": "anthropic/claude-fable-5.2",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "I need help planning a road trip from San Francisco to Los Angeles.",
      "role": "user"
    },
    {
      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
      "role": "assistant"
    },
    {
      "content": "Yes, what are some good places to stop?",
      "role": "user"
    }
  ]
}'
```

```
The best stops depend on which route you take.

**Highway 1 along the coast (9-10 hours of driving, best split over two days)**

This is the scenic route. From north to south:

- **Santa Cruz**: a classic beach boardwalk and a good first coffee stop.
- **Monterey and Carmel**: the Monterey Bay Aquarium, Cannery Row, and Carmel's walkable village and beach.
- **Big Sur**: the highlight of the drive, with Bixby Bridge, McWay Falls, and Pfeiffer Beach.
- **San Simeon**: Hearst Castle tours (book ahead) and the elephant seal rookery, which is free and right off the highway.
- **Morro Bay and San Luis Obispo**: good places to stay overnight, with solid food in downtown SLO.
- **Santa Barbara**: the Spanish mission, State Street, and the waterfront.
- **Malibu**: a last beach stop before LA, such as El Matador or Zuma.

Check Caltrans road conditions before you go, because the Big Sur stretch of Highway 1 sometimes closes for landslides.

**US-101 (about 7 hours)**

This is a middle ground. It skips Big Sur but still passes through San Luis
```

```json
{
  "model": "claude-fable-5-2",
  "id": "msg_011CgsuCQmtMxj7JPEhCLZZq",
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
      "text": "The best stops depend on which route you take.\n\n**Highway 1 along the coast (9-10 hours of driving, best split over two days)**\n\nThis is the scenic route. From north to south:\n\n- **Santa Cruz**: a classic beach boardwalk and a good first coffee stop.\n- **Monterey and Carmel**: the Monterey Bay Aquarium, Cannery Row, and Carmel's walkable village and beach.\n- **Big Sur**: the highlight of the drive, with Bixby Bridge, McWay Falls, and Pfeiffer Beach.\n- **San Simeon**: Hearst Castle tours (book ahead) and the elephant seal rookery, which is free and right off the highway.\n- **Morro Bay and San Luis Obispo**: good places to stay overnight, with solid food in downtown SLO.\n- **Santa Barbara**: the Spanish mission, State Street, and the waterfront.\n- **Malibu**: a last beach stop before LA, such as El Matador or Zuma.\n\nCheck Caltrans road conditions before you go, because the Big Sur stretch of Highway 1 sometimes closes for landslides.\n\n**US-101 (about 7 hours)**\n\nThis is a middle ground. It skips Big Sur but still passes through San Luis"
    }
  ],
  "container": null,
  "stop_reason": "max_tokens",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 105,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 1024,
    "output_tokens_details": {
      "thinking_tokens": 604
    },
    "service_tier": "standard",
    "inference_geo": "global",
    "speed": "standard"
  },
  "diagnostics": null
}
```

</details>

<details>

<summary>**Streaming Response** — Stream a response for real-time output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5.2',
  {
    max_tokens: 1024,
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
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
  "model": "anthropic/claude-fable-5.2",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true
}'
```

````
Recursion is when a function solves a problem by calling itself on a smaller version of the same problem, until the problem is small enough to answer directly.

Every recursive function needs two parts:

1. **Base case:** a simple input that it answers directly, without calling itself. This stops the recursion.
2. **Recursive case:** the function calls itself with an input that moves closer to the base case.

## Example: factorial

The factorial of a number `n` (written `n!`) is the product of all whole numbers from 1 to `n`. For example, `4! = 4 × 3 × 2 × 1 = 24`.

Notice that `4! = 4 × 3!`, and `3! = 3 × 2!`, and so on. The problem contains a smaller copy of itself, which makes it a natural fit for recursion:

```python
def factorial(n):
    if n <= 1:          # base case
        return 1
    return n * factorial(n - 1)   # recursive case
```

## What happens when you call `factorial(4)`

Each call waits for the one below it to finish:

```
factorial(4)
= 4 * factorial(3)
= 4 * (3 * factorial(2))
= 4 * (3 * (2 * factorial(1)))
= 4 * (3 * (2 * 1))     ← base case reached, now the results multiply back up
= 4 * (3 * 2)
= 4 * 6
= 24
```

Without the base case, the function would call itself forever (in practice, until the program crashes with a stack overflow error).
````

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-fable-5-2",
      "id": "msg_011CgsuDKd7HCjnpqvQic3mi",
      "type": "message",
      "role": "assistant",
      "content": [],
      "container": null,
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 24,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 6,
        "service_tier": "standard",
        "inference_geo": "global",
        "speed": "standard"
      },
      "diagnostics": null
    }
  },
  {
    "type": "content_block_start",
    "index": 0,
    "content_block": {
      "type": "thinking",
      "thinking": "",
      "signature": ""
    }
  },
  "... 85 more chunks omitted ...",
  {
    "type": "message_stop"
  }
]
```

</details>

## Parameters

Schema variant

MessagesChat CompletionsResponses

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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/#page","headline":"Claude Fable 5.2","description":"Claude Fable 5.2 is built for demanding reasoning and long-horizon agentic work, with adaptive thinking, a 1M token context window, and up to 128K output tokens.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
