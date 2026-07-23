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

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`deepseek/deepseek-v4-pro`

* Third-party

DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.

| Model Info                                                                 |                                                                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 131,072 tokens                                                                                                             |
| More information                                                           | [link ↗](https://api-docs.deepseek.com)                                                                                    |
| Request formats                                                            | Chat Completions                                                                                                           |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/deepseek/deepseek-v4-pro) |

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

The capital of France is **Paris**.

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

**With System Message** — Using a system message to set context

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

**Streaming Response** — Enable streaming for real-time output

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
  {
    "id": "chatcmpl-cf0a764075534f728f55b99dacf898ba",
    "object": "chat.completion.chunk",
    "created": 1781047647,
    "model": "accounts/fireworks/models/deepseek-v4-pro",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": " need"
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
          "reasoning_content": " to"
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
          "reasoning_content": " explain"
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
          "reasoning_content": " recursion"
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
          "reasoning_content": " with"
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
          "reasoning_content": " a"
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
          "reasoning_content": " simple"
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
          "reasoning_content": " example"
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
          "reasoning_content": "."
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
          "reasoning_content": " The"
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
          "reasoning_content": " user"
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
          "reasoning_content": " asked"
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
          "reasoning_content": ":"
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
          "reasoning_content": " \""
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
          "reasoning_content": "Explain"
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
          "reasoning_content": " the"
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
          "reasoning_content": " concept"
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
          "reasoning_content": " of"
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
          "reasoning_content": " recursion"
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
          "reasoning_content": " with"
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
          "reasoning_content": " a"
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
          "reasoning_content": " simple"
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
          "reasoning_content": " example"
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
          "reasoning_content": ".\""
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
          "reasoning_content": " So"
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
          "reasoning_content": " I"
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
          "reasoning_content": " should"
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
          "reasoning_content": " provide"
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
          "reasoning_content": " a"
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
          "reasoning_content": " clear"
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
          "reasoning_content": " explanation"
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
          "reasoning_content": " of"
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
          "reasoning_content": " recursion"
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
          "reasoning_content": ","
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
          "reasoning_content": " maybe"
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
          "reasoning_content": " using"
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
          "reasoning_content": " factorial"
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
          "reasoning_content": " or"
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
          "reasoning_content": " Fibonacci"
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
          "reasoning_content": ","
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
          "reasoning_content": " but"
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
          "reasoning_content": " a"
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
          "reasoning_content": " simple"
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
          "reasoning_content": " example"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": "'ll"
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
          "reasoning_content": " define"
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
          "reasoning_content": " recursion"
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
          "reasoning_content": " as"
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
          "reasoning_content": " a"
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
          "reasoning_content": " function"
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
          "reasoning_content": " calling"
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
          "reasoning_content": " itself"
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
          "reasoning_content": " to"
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
          "reasoning_content": " solve"
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
          "reasoning_content": " smaller"
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
          "reasoning_content": " instances"
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
          "reasoning_content": " of"
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
          "reasoning_content": " the"
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
          "reasoning_content": " same"
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
          "reasoning_content": " problem"
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
          "reasoning_content": " until"
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
          "reasoning_content": " a"
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
          "reasoning_content": " base"
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
          "reasoning_content": " case"
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
          "reasoning_content": " is"
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
          "reasoning_content": " reached"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": " can"
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
          "reasoning_content": " use"
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
          "reasoning_content": " factorial"
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
          "reasoning_content": ":"
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
          "reasoning_content": " n"
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
          "reasoning_content": "!"
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
          "reasoning_content": " ="
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
          "reasoning_content": " n"
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
          "reasoning_content": " *"
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
          "reasoning_content": " ("
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
          "reasoning_content": "n"
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
          "reasoning_content": "-"
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
          "reasoning_content": "1"
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
          "reasoning_content": ")!"
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
          "reasoning_content": " with"
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
          "reasoning_content": " base"
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
          "reasoning_content": " case"
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
          "reasoning_content": " "
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
          "reasoning_content": "0"
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
          "reasoning_content": "!"
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
          "reasoning_content": " ="
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
          "reasoning_content": " "
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
          "reasoning_content": "1"
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
          "reasoning_content": "."
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
          "reasoning_content": " Or"
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
          "reasoning_content": " maybe"
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
          "reasoning_content": " count"
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
          "reasoning_content": "down"
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
          "reasoning_content": ","
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
          "reasoning_content": " or"
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
          "reasoning_content": " tree"
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
          "reasoning_content": " traversal"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": "'ll"
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
          "reasoning_content": " use"
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
          "reasoning_content": " factorial"
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
          "reasoning_content": " as"
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
          "reasoning_content": " a"
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
          "reasoning_content": " classic"
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
          "reasoning_content": " simple"
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
          "reasoning_content": " example"
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
          "reasoning_content": " in"
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
          "reasoning_content": " programming"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": "'ll"
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
          "reasoning_content": " illustrate"
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
          "reasoning_content": " with"
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
          "reasoning_content": " pseud"
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
          "reasoning_content": "ocode"
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
          "reasoning_content": " or"
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
          "reasoning_content": " Python"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": "'ll"
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
          "reasoning_content": " break"
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
          "reasoning_content": " down"
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
          "reasoning_content": " the"
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
          "reasoning_content": " call"
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
          "reasoning_content": " stack"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": "'ll"
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
          "reasoning_content": " explain"
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
          "reasoning_content": " base"
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
          "reasoning_content": " case"
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
          "reasoning_content": " and"
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
          "reasoning_content": " recursive"
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
          "reasoning_content": " case"
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
          "reasoning_content": "."
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
          "reasoning_content": " I"
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
          "reasoning_content": "'ll"
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
          "reasoning_content": " show"
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
          "reasoning_content": " step"
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
          "reasoning_content": "-by"
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
          "reasoning_content": "-step"
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
          "reasoning_content": " execution"
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
          "reasoning_content": " for"
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
          "reasoning_content": " factorial"
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
          "reasoning_content": "("
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
          "reasoning_content": "3"
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
          "reasoning_content": ")."
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
          "reasoning_content": " The"
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
          "reasoning_content": " answer"
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
          "reasoning_content": " should"
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
          "reasoning_content": " be"
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
          "reasoning_content": " instructive"
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
          "reasoning_content": ","
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
          "reasoning_content": " concise"
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
          "reasoning_content": ","
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
          "reasoning_content": " and"
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
          "reasoning_content": " cover"
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
          "reasoning_content": " the"
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
          "reasoning_content": " concept"
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
          "reasoning_content": "."
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
          "content": "Rec"
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
          "content": "ursion"
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
          "content": " is"
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
          "content": " a"
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
          "content": " programming"
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
          "content": " technique"
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
          "content": " where"
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
          "content": " a"
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
          "content": " function"
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
          "content": " calls"
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
          "content": " itself"
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
          "content": " to"
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
          "content": " solve"
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
          "content": " a"
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
          "content": " smaller"
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
          "content": " version"
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
          "content": " of"
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
          "content": " the"
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
          "content": " same"
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
          "content": " problem"
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
          "content": "."
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
          "content": " Each"
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
          "content": " recursive"
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
          "content": " call"
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
          "content": " works"
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
          "content": " on"
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
          "content": " a"
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
          "content": " simpler"
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
          "content": " input"
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
          "content": ","
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
          "content": " and"
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
          "content": " there"
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
          "content": "’"
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
          "content": "s"
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
          "content": " always"
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
          "content": " a"
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
          "content": " **"
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
          "content": "base"
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
          "content": " case"
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
          "content": "**"
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
          "content": " that"
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
          "content": " stops"
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
          "content": " the"
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
          "content": " recursion"
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
          "content": ","
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
          "content": " preventing"
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
          "content": " an"
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
          "content": " infinite"
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
          "content": " loop"
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
          "content": ".\n\n"
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
          "content": "###"
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
          "content": " The"
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
          "content": " Two"
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
          "content": " Essential"
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
          "content": " Parts"
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
          "content": "\n"
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
          "content": "1"
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
          "content": "."
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
          "content": " **"
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
          "content": "Base"
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
          "content": " case"
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
          "content": "**"
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
          "content": " –"
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
          "content": " the"
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
          "content": " simplest"
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
          "content": " scenario"
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
          "content": " that"
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
          "content": " can"
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
          "content": " be"
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
          "content": " answered"
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
          "content": " directly"
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
          "content": " ("
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
          "content": "no"
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
          "content": " more"
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
          "content": " recursive"
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
          "content": " calls"
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
          "content": ").\n"
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
          "content": "2"
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
          "content": "."
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
          "content": " **"
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
          "content": "Rec"
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
          "content": "ursive"
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
          "content": " case"
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
          "content": "**"
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
          "content": " –"
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
          "content": " the"
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
          "content": " function"
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
          "content": " calls"
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
          "content": " itself"
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
          "content": " with"
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
          "content": " a"
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
          "content": " smaller"
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
          "content": "/s"
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
          "content": "impl"
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
          "content": "er"
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
          "content": " argument"
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
          "content": ","
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
          "content": " moving"
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
          "content": " toward"
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
          "content": " the"
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
          "content": " base"
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
          "content": " case"
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
          "content": ".\n\n"
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
          "content": "###"
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
          "content": " Simple"
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
          "content": " Example"
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
          "content": ":"
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
          "content": " Fact"
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
          "content": "orial"
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
          "content": "\n"
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
          "content": "The"
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
          "content": " factorial"
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
          "content": " of"
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
          "content": " a"
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
          "content": " non"
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
          "content": "-negative"
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
          "content": " integer"
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
          "content": " `"
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
          "content": "n"
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
          "content": "`"
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
          "content": " ("
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
          "content": "written"
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
          "content": " `"
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
          "content": "n"
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
          "content": "!"
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
          "content": "`)"
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
          "content": " is"
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
          "content": " the"
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
          "content": " product"
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
          "content": " of"
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
          "content": " all"
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
          "content": " positive"
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
          "content": " integers"
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
          "content": " up"
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
          "content": " to"
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
          "content": " `"
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
          "content": "n"
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
          "content": "`."
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
          "content": "  \n"
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
          "content": "Definition"
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
          "content": ":"
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
          "content": "  \n"
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
          "content": "-"
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
          "content": " `"
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
          "content": "0"
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
          "content": "!"
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
          "content": " ="
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
          "content": " "
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
          "content": "1"
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
          "content": "`"
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
          "content": " ("
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
          "content": "base"
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
          "content": " case"
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
          "content": ")"
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
          "content": "  \n"
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
          "content": "-"
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
          "content": " `"
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
          "content": "n"
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
          "content": "!"
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
          "content": " ="
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
          "content": " n"
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
          "content": " ×"
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
          "content": " ("
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
          "content": "n"
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
          "content": "−"
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
          "content": "1"
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
          "content": ")!"
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
          "content": "`"
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
          "content": " for"
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
          "content": " `"
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
          "content": "n"
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
          "content": " >"
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
          "content": " "
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
          "content": "0"
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
          "content": "`"
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
          "content": " ("
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
          "content": "rec"
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
          "content": "ursive"
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
          "content": " case"
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
          "content": ")\n\n"
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
          "content": "####"
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
          "content": " Python"
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
          "content": " implementation"
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
          "content": "\n"
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
          "content": "```"
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
          "content": "python"
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
          "content": "\n"
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
          "content": "def"
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
          "content": " factorial"
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
          "content": "(n"
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
          "content": "):\n"
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
          "content": "   "
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
          "content": " if"
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
          "content": " n"
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
          "content": " =="
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
          "content": " "
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
          "content": "0"
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
          "content": ":"
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
          "content": "         "
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
          "content": " #"
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
          "content": " base"
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
          "content": " case"
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
          "content": "\n"
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
          "content": "       "
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
          "content": " return"
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
          "content": " "
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
          "content": "1"
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
          "content": "\n"
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
          "content": "   "
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
          "content": " else"
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
          "content": ":"
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
          "content": "              "
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
          "content": " #"
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
          "content": " recursive"
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
          "content": " case"
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
          "content": "\n"
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
          "content": "       "
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
          "content": " return"
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
          "content": " n"
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
          "content": " *"
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
          "content": " factorial"
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
          "content": "(n"
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
          "content": " -"
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
          "content": " "
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
          "content": "1"
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
          "content": ")\n"
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
          "content": "```\n\n"
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
          "content": "####"
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
          "content": " How"
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
          "content": " it"
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
          "content": " works"
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
          "content": " step"
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
          "content": "-by"
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
          "content": "-step"
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
          "content": " for"
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
          "content": " `"
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
          "content": "fact"
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
          "content": "orial"
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
          "content": "("
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
          "content": "3"
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
          "content": ")"
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
          "content": "`\n"
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
          "content": "```\n"
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
          "content": "fact"
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
          "content": "orial"
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
          "content": "("
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
          "content": "3"
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
          "content": ")\n"
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
          "content": " "
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
          "content": " →"
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
          "content": " "
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
          "content": "3"
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
          "content": " *"
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
          "content": " factorial"
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
          "content": "("
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
          "content": "2"
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
          "content": ")"
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
          "content": "          "
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
          "content": " #"
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
          "content": " waiting"
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
          "content": " for"
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
          "content": " factorial"
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
          "content": "("
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
          "content": "2"
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
          "content": ")\n"
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
          "content": "       "
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
          "content": " →"
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
          "content": " "
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
          "content": "2"
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
          "content": " *"
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
          "content": " factorial"
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
          "content": "("
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
          "content": "1"
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
          "content": ")"
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
          "content": "    "
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
          "content": " #"
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
          "content": " waiting"
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
          "content": " for"
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
          "content": " factorial"
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
          "content": "("
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
          "content": "1"
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
          "content": ")\n"
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
          "content": "             "
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
          "content": " →"
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
          "content": " "
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
          "content": "1"
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
          "content": " *"
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
          "content": " factorial"
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
          "content": "("
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
          "content": "0"
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
          "content": ")\n"
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
          "content": "                   "
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
          "content": " →"
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
          "content": " "
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
          "content": "0"
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
          "content": " =="
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
          "content": " "
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
          "content": "0"
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
          "content": "?"
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
          "content": " →"
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
          "content": " return"
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
          "content": " "
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
          "content": "1"
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
          "content": "  "
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
          "content": " #"
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
          "content": " base"
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
          "content": " case"
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
          "content": " reached"
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
          "content": "\n"
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
          "content": "             "
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
          "content": " →"
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
          "content": " "
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
          "content": "1"
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
          "content": " *"
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
          "content": " "
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
          "content": "1"
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
          "content": " ="
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
          "content": " "
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
          "content": "1"
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
          "content": "\n"
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
          "content": "       "
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
          "content": " →"
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
          "content": " "
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
          "content": "2"
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
          "content": " *"
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
          "content": " "
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
          "content": "1"
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
          "content": " ="
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
          "content": " "
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
          "content": "2"
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
          "content": "\n"
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
          "content": " "
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
          "content": " →"
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
          "content": " "
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
          "content": "3"
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
          "content": " *"
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
          "content": " "
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
          "content": "2"
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
          "content": " ="
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
          "content": " "
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
          "content": "6"
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
          "content": "\n"
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
          "content": "```\n"
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
          "content": "The"
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
          "content": " calls"
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
          "content": " \""
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
          "content": "stack"
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
          "content": " up"
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
          "content": "\""
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
          "content": " until"
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
          "content": " the"
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
          "content": " base"
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
          "content": " case"
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
          "content": " is"
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
          "content": " hit"
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
          "content": ","
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
          "content": " then"
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
          "content": " they"
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
          "content": " resolve"
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
          "content": " in"
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
          "content": " reverse"
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
          "content": " order"
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
          "content": ","
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
          "content": " multiplying"
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
          "content": " as"
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
          "content": " they"
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
          "content": " go"
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
          "content": ".\n\n"
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
          "content": "###"
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
          "content": " Key"
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
          "content": " Takeaways"
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
          "content": "\n"
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
          "content": "-"
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
          "content": " Rec"
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
          "content": "ursion"
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
          "content": " breaks"
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
          "content": " a"
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
          "content": " problem"
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
          "content": " into"
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
          "content": " self"
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
          "content": "-s"
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
          "content": "imilar"
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
          "content": " sub"
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
          "content": "problems"
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
          "content": ".\n"
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
          "content": "-"
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
          "content": " Every"
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
          "content": " recursive"
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
          "content": " function"
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
          "content": " needs"
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
          "content": " a"
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
          "content": " stopping"
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
          "content": " condition"
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
          "content": " ("
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
          "content": "base"
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
          "content": " case"
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
          "content": ").\n"
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
          "content": "-"
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
          "content": " Without"
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
          "content": " a"
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
          "content": " base"
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
          "content": " case"
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
          "content": ","
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
          "content": " you"
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
          "content": " get"
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
          "content": " infinite"
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
          "content": " recursion"
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
          "content": " ("
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
          "content": "event"
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
          "content": "ually"
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
          "content": " a"
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
          "content": " stack"
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
          "content": " overflow"
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
          "content": ").\n"
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
          "content": "-"
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
          "content": " It"
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
          "content": "’"
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
          "content": "s"
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
          "content": " especially"
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
          "content": " natural"
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
          "content": " for"
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
          "content": " problems"
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
          "content": " with"
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
          "content": " a"
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
          "content": " recursive"
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
          "content": " structure"
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
          "content": " ("
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
          "content": "t"
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
          "content": "rees"
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
          "content": ","
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
          "content": " sorting"
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
          "content": ","
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
          "content": " divide"
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
          "content": "-and"
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
          "content": "-con"
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
          "content": "quer"
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
          "content": ","
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
          "content": " etc"
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
          "content": ".)."
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
        "delta": {},
        "finish_reason": "stop",
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

## Parameters

▶messages\[\]

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

`number`minimum: \-2maximum: 2

presence\_penalty

`number`minimum: \-2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[\]

`array`

tool\_choice

``

response\_format

``

▶modalities\[\]

`array`

▶audio{}

`object`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[\]

`array`

▶usage{}

`object`

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/#page","headline":"DeepSeek V4 Pro (deepseek) · Cloudflare AI docs · Cloudflare AI docs","description":"DeepSeek V4 Pro is a high-capability reasoning model from DeepSeek, served via Fireworks infrastructure for production-grade inference.","url":"https://developers.cloudflare.com/ai/models/deepseek/deepseek-v4-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
