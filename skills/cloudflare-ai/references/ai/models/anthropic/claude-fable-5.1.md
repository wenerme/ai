---
description: Claude Fable 5.1 is Anthropic's next model in the Fable family, with improvements in agentic coding, long-running agentic workflows, knowledge work, front-end and visual code generation, and finance and analysis tasks. It supports adaptive thinking and a 1M token context window.
title: Claude Fable 5.1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Fable 5.1

Text Generation • Anthropic

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.1/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-fable-5.1`

* Third-party

Claude Fable 5.1 is Anthropic's next model in the Fable family, with improvements in agentic coding, long-running agentic workflows, knowledge work, front-end and visual code generation, and finance and analysis tasks. It supports adaptive thinking and a 1M token context window.

| Model Info                                                                          |                                                                                                                              |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens                                                                                                             |
| Terms and License                                                                   | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                   |
| More information                                                                    | [link ↗](https://platform.claude.com/docs/en/about-claude/models/overview)                                                   |
| Request formats                                                                     | Anthropic Messages                                                                                                           |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-fable-5.1) |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5.1',
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
  "model": "anthropic/claude-fable-5.1",
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

Use the built-in `json` module:

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

**What this does:**
- `open(...)` opens the file; the `with` block closes it automatically.
- `json.load(f)` parses the file contents into Python objects:
  - JSON object `{}` → `dict`
  - JSON array `[]` → `list`
  - strings → `str`, numbers → `int`/`float`, `true`/`false` → `True`/`False`, `null` → `None`

**Example:** if `data.json` contains

```json
{"name": "Alice", "age": 30, "tags": ["admin", "user"]}
```

then:

```python
print(data["name"])     # Alice
print(data["tags"][0])  # admin
```

**Related tips:**
- If you already have JSON as a string (not a file), use `json.loads(text)` instead.
- To handle a missing or malformed file gracefully:

```python
import json

try:
    with open("data.json", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

- To write JSON back out: `json.dump(data, f, indent=2)`.

```json
{
  "id": "msg_011CedBpeQJCnJHy2SvhfpSH",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Use the built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\n**What this does:**\n- `open(...)` opens the file; the `with` block closes it automatically.\n- `json.load(f)` parses the file contents into Python objects:\n  - JSON object `{}` → `dict`\n  - JSON array `[]` → `list`\n  - strings → `str`, numbers → `int`/`float`, `true`/`false` → `True`/`False`, `null` → `None`\n\n**Example:** if `data.json` contains\n\n```json\n{\"name\": \"Alice\", \"age\": 30, \"tags\": [\"admin\", \"user\"]}\n```\n\nthen:\n\n```python\nprint(data[\"name\"])     # Alice\nprint(data[\"tags\"][0])  # admin\n```\n\n**Related tips:**\n- If you already have JSON as a string (not a file), use `json.loads(text)` instead.\n- To handle a missing or malformed file gracefully:\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", encoding=\"utf-8\") as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n- To write JSON back out: `json.dump(data, f, indent=2)`."
    }
  ],
  "model": "claude-fable-5-1",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 40,
    "output_tokens": 451
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Multi-turn Conversation** — Continue a conversation with prior assistant context

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5.1',
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
  "model": "anthropic/claude-fable-5.1",
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

Great choice! Your stops depend on which route you take, so here are the two main options:

**Highway 1 / Pacific Coast Highway (scenic, ~10-12 hours with stops, best over 2 days)**

- **Half Moon Bay** – Quaint coastal town with good seafood and beaches
- **Santa Cruz** – Beach Boardwalk, surfing culture, and redwoods nearby
- **Monterey** – World-class aquarium, Cannery Row, and Fisherman's Wharf
- **17-Mile Drive / Pebble Beach** – Iconic coastline with the Lone Cypress (small toll)
- **Carmel-by-the-Sea** – Charming village with galleries and Carmel Beach
- **Big Sur** – The highlight: Bixby Bridge, McWay Falls, Pfeiffer Beach (purple sand), and Nepenthe restaurant for lunch with a view
- **Hearst Castle (San Simeon)** – Fascinating mansion tour; the elephant seals at Piedras Blancas nearby are a fun free stop
- **Cambria / Morro Bay** – Morro Rock and a laid-back harbor town
- **San Luis Obispo** – Great downtown, Bubblegum Alley, and the quirky Madonna Inn
- **Pismo Beach** – Classic beach town, good for a break
- **Solvang** – A Danish-themed village with pastries and wine tasting
- **Santa Barbara** – Beautiful Spanish architecture, State Street, and the waterfront
- **Malibu** – Beaches and a final scenic stretch into LA

**US-101 (faster, ~6-7 hours)**

- **Gilroy** – Garlic capital, outlet shopping
- **Paso Robles** – Excellent wine country, less crowded than Napa
- **San Luis Obispo, Solvang, and Santa Barbara** are also on this route

**I-5 (fastest, ~6 hours, but not scenic)**

- **Harris Ranch** – The classic stop for a steak dinner
- **Casa de Fruta** – Roadside attraction with snacks and a small train

**Tips:**
- Check Caltrans for Highway 1 road closures—Big Sur sections sometimes close due to landslides
- If doing Highway 1, consider an overnight in Monterey/Carmel, Big Sur, or Cambria
- Fill up on gas before Big Sur; it's expensive and sparse there

Would you like help building a day-by-day itinerary based on how much time you have?

```json
{
  "id": "msg_011CedBqDdZMZFGUp1yQHKL2",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAQShAUKEAgRGAI4AUIIdGhpbmtpbmcSDIPYwphr/ruEkQm5GRoMi2EZKjsehazJ6il4IjB4hJSu75aNtzCRDW20p3aRVBEl75/aOV5i2an6izSSmbWjhFYvkCSKKvsu6DNM1cwqoQQ0QHB3yemi+cxK105ZiZr2sbYwafT0INKT3HAAvkp8y+Q7o0ro7AZj+6UIUfu9tedn1MFxcGXrh+D8zA9tUXMELTqT4pELiY76hDhkFcCopOoUOCedyQotgDHna+WOdUVKV8BgJaLrvnCYchIHSb0HnWesjzp4GvrOkw3rxfIOl16/W1DTJ638aSYk9ozUMdKxNdyS3OcSvlN7jWiZMOzF6pZ11LTrXOQKy+xWk6Z9TnZ2PoSgBvK2r4xR49xsh+beq0Tq6iYvwUYYMbEOu0xb4t2qHCYJ+80fmyQwxUXdL4fCv0DNuakFX4fzRBOfELrgTDz2LiYm1J2B3Au2KPK/Yet+Qr6KO0G4FOCS5zlGpe9WSVgYzSu/gXm7O1CIrsV6Vfxtq7pv5S/+CL4rwTGJUunzdl8qozMlaJ7uD4kEuK1AMaJ4bcLGxiYDZ1p22pdhtsSGvO1BTb/hPn8PPQfIkEDq8UmRTxCJ+XnfJNAeOeOwB+S9CESoBN85U7yBiPXwvhpgG5uqT1dz9URyMFQHSHbrqoGT3gcilcsYUxzAwA17H5Fvhs1p0/6J0ek21fK/9+3YuryKWHhvM1XFA0uOwZu0xhmatkmLSrmnxEITpP4xHH1OZ2SQUURWn9vjoNLiTAySVKFl26+4nvGcZqDExckEPcBqoU6w7vgFg8nEcHlhs+aSw5S4cNFD5wRizh/iDaZ9+wbkXw5qC/sQ8AtYThgB"
    },
    {
      "type": "text",
      "text": "Great choice! Your stops depend on which route you take, so here are the two main options:\n\n**Highway 1 / Pacific Coast Highway (scenic, ~10-12 hours with stops, best over 2 days)**\n\n- **Half Moon Bay** – Quaint coastal town with good seafood and beaches\n- **Santa Cruz** – Beach Boardwalk, surfing culture, and redwoods nearby\n- **Monterey** – World-class aquarium, Cannery Row, and Fisherman's Wharf\n- **17-Mile Drive / Pebble Beach** – Iconic coastline with the Lone Cypress (small toll)\n- **Carmel-by-the-Sea** – Charming village with galleries and Carmel Beach\n- **Big Sur** – The highlight: Bixby Bridge, McWay Falls, Pfeiffer Beach (purple sand), and Nepenthe restaurant for lunch with a view\n- **Hearst Castle (San Simeon)** – Fascinating mansion tour; the elephant seals at Piedras Blancas nearby are a fun free stop\n- **Cambria / Morro Bay** – Morro Rock and a laid-back harbor town\n- **San Luis Obispo** – Great downtown, Bubblegum Alley, and the quirky Madonna Inn\n- **Pismo Beach** – Classic beach town, good for a break\n- **Solvang** – A Danish-themed village with pastries and wine tasting\n- **Santa Barbara** – Beautiful Spanish architecture, State Street, and the waterfront\n- **Malibu** – Beaches and a final scenic stretch into LA\n\n**US-101 (faster, ~6-7 hours)**\n\n- **Gilroy** – Garlic capital, outlet shopping\n- **Paso Robles** – Excellent wine country, less crowded than Napa\n- **San Luis Obispo, Solvang, and Santa Barbara** are also on this route\n\n**I-5 (fastest, ~6 hours, but not scenic)**\n\n- **Harris Ranch** – The classic stop for a steak dinner\n- **Casa de Fruta** – Roadside attraction with snacks and a small train\n\n**Tips:**\n- Check Caltrans for Highway 1 road closures—Big Sur sections sometimes close due to landslides\n- If doing Highway 1, consider an overnight in Monterey/Carmel, Big Sur, or Cambria\n- Fill up on gas before Big Sur; it's expensive and sparse there\n\nWould you like help building a day-by-day itinerary based on how much time you have?"
    }
  ],
  "model": "claude-fable-5-1",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 105,
    "output_tokens": 930
  },
  "stop_sequence": null,
  "stop_details": null,
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Streaming Response** — Stream a response for real-time output

```ts
const response = await env.AI.run(
  'anthropic/claude-fable-5.1',
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
  "model": "anthropic/claude-fable-5.1",
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

**Recursion** is a technique where a function solves a problem by calling itself on a smaller version of that same problem, until it reaches a simple case it can answer directly.

Every recursive function needs two parts:

1. **Base case** – the simplest input, where the answer is known immediately and no further calls are made. This is what stops the recursion.
2. **Recursive case** – the function calls itself with a "smaller" input, moving toward the base case.

## Example: Factorial

The factorial of *n* (written *n!*) is *n × (n−1) × (n−2) × ... × 1*. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.

Notice that 5! is just 5 × 4!. And 4! is 4 × 3!. This "defined in terms of itself" pattern is what makes it recursive.

```python
def factorial(n):
    if n == 1:                    # base case
        return 1
    return n * factorial(n - 1)   # recursive case
```

Tracing `factorial(4)`:

```
factorial(4)
= 4 * factorial(3)
= 4 * (3 * factorial(2))
= 4 * (3 * (2 * factorial(1)))
= 4 * (3 * (2 * 1))      ← base case reached
= 4 * (3 * 2)
= 4 * 6
= 24
```

The calls "stack up" until the base case is hit, then the results unwind back to the original call.

## A real-world analogy

Imagine you're in a long line and want to know your position. You ask the person in front of you, "What's your position?" They don't know either, so they ask the person in front of *them*. This continues until it reaches the person at the front, who says "I'm #1" (base case). Each person then adds 1 to the answer they receive and passes it back, until the number reaches you.

## Key things to remember

- **Without a base case**, the function calls itself forever (in practice, until the program crashes with a stack overflow).
- Each recursive call must make progress toward the base case.
- Recursion is especially natural for problems with self-similar structure: traversing trees, exploring directories, parsing nested expressions, or algorithms like merge sort and binary search.

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-fable-5-1",
      "id": "msg_011CedBrJsMHVisMiwBi3NSy",
      "type": "message",
      "role": "assistant",
      "content": [],
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
        "output_tokens": 1,
        "service_tier": "standard",
        "inference_geo": "global"
      }
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
  {
    "type": "ping"
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "**"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "Recursion** is a technique where a function solves a problem by calling itself on a smaller version of that same problem, until it reaches a simple case it can answer directly.\n\nEvery recursive function needs two par"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "ts:\n\n1. **Base case** – the simplest input, where the answer is known immediately and no further calls are made. This is what stops the recursion.\n2. **Recursive case** – the function"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " calls itself with a \"smaller\" input, moving toward the base case.\n\n## Example: Factorial\n\nThe factorial of *n* (written *n!*) is *n × (n−"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "1) × (n−2) × ... × 1*. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.\n\nNotice that 5! is just 5 × 4!. And 4! is 4 × 3!. This"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " \"defined in terms of itself\" pattern is what makes it recursive.\n\n```python\ndef factorial(n):\n    if n == 1:                    # base case\n        return 1\n    return n * factorial(n - "
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "1)   # recursive case\n```\n\nTracing `factorial(4)`:\n\n```\nfactorial(4)\n= 4 * factorial(3)\n= 4 * (3 * factorial(2))\n= 4 * (3 * (2 * factorial(1)))"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "\n= 4 * (3 * (2 * 1))      ← base case reached\n= 4 * (3 * 2)\n= 4 * 6\n= 24\n```\n\nThe calls \"stack up\" until the base case is hit, then the results unwind back to"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " the original call.\n\n## A real-world analogy\n\nImagine you're in a long line and want to know your position. You ask the person in front of you, \"What"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "'s your position?\" They don't know either, so they ask the person in front of *them*. This continues until it reaches the person at the front, who says \"I'm #1\" (base case). Each"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": " person then adds 1 to the answer they receive and passes it back, until the number reaches you.\n\n## Key things to remember\n\n- **"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "Without a base case**, the function calls itself forever (in practice, until the program crashes with a stack overflow).\n- Each recursive call must make progress toward the base case.\n- Recursion is especially natural for problems with self"
    }
  },
  {
    "type": "content_block_delta",
    "index": 0,
    "delta": {
      "type": "text_delta",
      "text": "-similar structure: traversing trees, exploring directories, parsing nested expressions, or algorithms like merge sort and binary search."
    }
  },
  {
    "type": "content_block_stop",
    "index": 0
  },
  {
    "type": "message_delta",
    "delta": {
      "stop_reason": "end_turn",
      "stop_sequence": null,
      "stop_details": null
    },
    "usage": {
      "input_tokens": 24,
      "cache_creation_input_tokens": 0,
      "cache_read_input_tokens": 0,
      "output_tokens": 718,
      "output_tokens_details": {
        "thinking_tokens": 0
      }
    }
  },
  {
    "type": "message_stop"
  }
]
```

## Parameters

▶messages\[\]

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

▶content\[\]

`array`

model

`string`

stop\_reason

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.1/#page","headline":"Claude Fable 5.1 (Anthropic) · Cloudflare AI docs · Cloudflare AI docs","description":"Claude Fable 5.1 is Anthropic's next model in the Fable family, with improvements in agentic coding, long-running agentic workflows, knowledge work, front-end and visual code generation, and finance and analysis tasks. It supports adaptive thinking and a 1M token context window.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5.1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
