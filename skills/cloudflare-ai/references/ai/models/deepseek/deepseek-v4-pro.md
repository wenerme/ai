---
description: DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.
title: DeepSeek V4 Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

d

# DeepSeek V4 Pro

Text Generation • deepseek

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`deepseek/deepseek-v4-pro`

- Third-party

DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 131,072 tokens |
| More information | [link ↗](https://api-docs.deepseek.com) |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.74</li><li>Output (per 1M tokens)$3.48</li><li>Cached input (per 1M tokens)$0.145</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'deepseek/deepseek-v4-pro',
  {
    messages: [{ content: 'What is the capital of France?', role: 'user' }],
    model: 'deepseek/deepseek-v4-pro',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "deepseek/deepseek-v4-pro",
  "messages": [
    {
      "content": "What is the capital of France?",
      "role": "user"
    }
  ]
}'
```

```
The capital of France is **Paris**.
```

```json
{
  "id": "chatcmpl-3a08845344c942108c3ab7b29112f012",
  "object": "chat.completion",
  "created": 1781047641,
  "model": "deepseek/deepseek-v4-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is **Paris**.",
        "reasoning_content": "We need to answer the question: \"What is the capital of France?\" This is straightforward. The capital of France is Paris. I should answer concisely."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 11,
    "completion_tokens": 43,
    "total_tokens": 54,
    "prompt_tokens_details": {
      "cached_tokens": 0
    }
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'deepseek/deepseek-v4-pro',
  {
    messages: [
      { content: 'You are a helpful coding assistant specializing in Python.', role: 'system' },
      { content: 'How do I read a JSON file in Python?', role: 'user' },
    ],
    model: 'deepseek/deepseek-v4-pro',
    temperature: 0.3,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "deepseek/deepseek-v4-pro",
  "messages": [
    {
      "content": "You are a helpful coding assistant specializing in Python.",
      "role": "system"
    },
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "temperature": 0.3
}'
```

````
To read a JSON file in Python, you use the built-in `json` module. The most common approach is `json.load()` which reads directly from a file object.

### Basic example
```python
import json

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(data)
```

### Key points
- **`json.load(file)`** – parses JSON from a file-like object.
- **`json.loads(string)`** – parses JSON from a string (useful if you already have JSON data in memory).
- Always open the file in read mode (`'r'`) and specify the correct encoding (usually `'utf-8'`).
- The result is a Python dictionary (if the JSON is an object) or a list (if it’s an array).

### Handling errors
Wrap the loading in a `try`/`except` to catch malformed JSON or file issues:
```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

### Reading from a string
If you already have a JSON string:
```python
json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)
```

That’s it! Let me know if you need help with writing JSON or more advanced usage.
````

```json
{
  "id": "chatcmpl-1aecff3044dc4e349362b9237f0e63b4",
  "object": "chat.completion",
  "created": 1781047642,
  "model": "deepseek/deepseek-v4-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "To read a JSON file in Python, you use the built-in `json` module. The most common approach is `json.load()` which reads directly from a file object.\n\n### Basic example\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as f:\n    data = json.load(f)\n\nprint(data)\n```\n\n### Key points\n- **`json.load(file)`** – parses JSON from a file-like object.\n- **`json.loads(string)`** – parses JSON from a string (useful if you already have JSON data in memory).\n- Always open the file in read mode (`'r'`) and specify the correct encoding (usually `'utf-8'`).\n- The result is a Python dictionary (if the JSON is an object) or a list (if it’s an array).\n\n### Handling errors\nWrap the loading in a `try`/`except` to catch malformed JSON or file issues:\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n### Reading from a string\nIf you already have a JSON string:\n```python\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n```\n\nThat’s it! Let me know if you need help with writing JSON or more advanced usage.",
        "reasoning_content": "We need to provide a clear, concise answer on how to read a JSON file in Python. The user likely wants to know the standard method using the `json` module. We'll explain opening the file, using `json.load()` for file objects, and `json.loads()` for strings. Also mention error handling, encoding, and maybe a simple example. Keep it friendly and informative."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 413,
    "total_tokens": 437,
    "prompt_tokens_details": {
      "cached_tokens": 0
    }
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'deepseek/deepseek-v4-pro',
  {
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    model: 'deepseek/deepseek-v4-pro',
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "deepseek/deepseek-v4-pro",
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
Recursion is a programming technique where a function calls itself to solve a smaller version of the same problem. Each recursive call works on a simpler input, and there’s always a **base case** that stops the recursion, preventing an infinite loop.

### The Two Essential Parts
1. **Base case** – the simplest scenario that can be answered directly (no more recursive calls).
2. **Recursive case** – the function calls itself with a smaller/simpler argument, moving toward the base case.

### Simple Example: Factorial
The factorial of a non-negative integer `n` (written `n!`) is the product of all positive integers up to `n`.
Definition:
- `0! = 1` (base case)
- `n! = n × (n−1)!` for `n > 0` (recursive case)

#### Python implementation
```python
def factorial(n):
    if n == 0:          # base case
        return 1
    else:               # recursive case
        return n * factorial(n - 1)
```

#### How it works step-by-step for `factorial(3)`
```
factorial(3)
  → 3 * factorial(2)           # waiting for factorial(2)
        → 2 * factorial(1)     # waiting for factorial(1)
              → 1 * factorial(0)
                    → 0 == 0? → return 1   # base case reached
              → 1 * 1 = 1
        → 2 * 1 = 2
  → 3 * 2 = 6
```
The calls "stack up" until the base case is hit, then they resolve in reverse order, multiplying as they go.

### Key Takeaways
- Recursion breaks a problem into self-similar subproblems.
- Every recursive function needs a stopping condition (base case).
- Without a base case, you get infinite recursion (eventually a stack overflow).
- It’s especially natural for problems with a recursive structure (trees, sorting, divide-and-conquer, etc.).
````

```json
[
  {
    "id": "chatcmpl-cf0a764075534f728f55b99dacf898ba",
    "object": "chat.completion.chunk",
    "created": 1781047647,
    "model": "accounts/fireworks/models/deepseek-v4-pro",
    "choices": [
      {
        "index": 0,
        "delta": {
          "role": "assistant"
        },
        "finish_reason": null,
        "raw_output": null
      }
    ],
    "usage": null
  },
  {
    "id": "chatcmpl-cf0a764075534f728f55b99dacf898ba",
    "object": "chat.completion.chunk",
    "created": 1781047647,
    "model": "accounts/fireworks/models/deepseek-v4-pro",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": "We"
        },
        "finish_reason": null,
        "raw_output": null
      }
    ],
    "usage": null
  },
  "... 606 more chunks omitted ...",
  {
    "id": "chatcmpl-cf0a764075534f728f55b99dacf898ba",
    "object": "chat.completion.chunk",
    "created": 1781047647,
    "model": "accounts/fireworks/models/deepseek-v4-pro",
    "choices": [],
    "usage": {
      "prompt_tokens": 14,
      "total_tokens": 622,
      "completion_tokens": 608,
      "prompt_tokens_details": {
        "cached_tokens": 0
      }
    }
  }
]
```

</details>

## Parameters

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

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/#page","headline":"DeepSeek V4 Pro","description":"DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.","url":"https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
