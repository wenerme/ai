---
description: OpenAI's flagship GPT model for complex tasks with a million-token context window.
title: GPT-4.1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-4.1

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-4.1/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-4.1`

- Third-party
- Zero data retention

OpenAI's flagship GPT model for complex tasks with a million-token context window.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,047,576 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/index/gpt-4-1/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$2.00</li><li>Output (per 1M tokens)$8.00</li><li>Cached input (per 1M tokens)$0.50</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-4.1',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4.1",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
Certainly! The **three laws of thermodynamics** are fundamental principles describing how energy moves and changes in physical systems:

---

**1. First Law of Thermodynamics (Law of Energy Conservation):**
*Energy cannot be created or destroyed, only converted from one form to another.*

- In other words, the total energy of an isolated system is constant.
- Mathematically:
  ΔU = Q − W
  Where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system.

---

**2. Second Law of Thermodynamics (Law of Entropy):**
*The entropy of an isolated system always increases over time, or remains constant in ideal cases; it never decreases.*

- This law explains why certain processes are irreversible, and why heat flows from hotter to colder bodies naturally.
- It also means that energy transformations are never 100% efficient; some energy is always dispersed as heat.

---

**3. Third Law of Thermodynamics:**
*As temperature approaches absolute zero (0 K), the entropy of a perfect crystal approaches zero.*

- This suggests it is impossible to reach absolute zero in any finite number of steps.
- At absolute zero, a perfectly ordered crystal would have only one microstate (minimum entropy).

---

**Summary Table:**

| Law        | Main Statement                                             |
|------------|-----------------------------------------------------------|
| First      | Energy is conserved                                       |
| Second     | Entropy increases or remains constant                     |
| Third      | Entropy approaches zero as temperature approaches 0 K     |
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "Certainly! The **three laws of thermodynamics** are fundamental principles describing how energy moves and changes in physical systems:\n\n---\n\n**1. First Law of Thermodynamics (Law of Energy Conservation):**  \n*Energy cannot be created or destroyed, only converted from one form to another.*\n\n- In other words, the total energy of an isolated system is constant.\n- Mathematically:  \n  ΔU = Q − W  \n  Where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system.\n\n---\n\n**2. Second Law of Thermodynamics (Law of Entropy):**  \n*The entropy of an isolated system always increases over time, or remains constant in ideal cases; it never decreases.*\n\n- This law explains why certain processes are irreversible, and why heat flows from hotter to colder bodies naturally.\n- It also means that energy transformations are never 100% efficient; some energy is always dispersed as heat.\n\n---\n\n**3. Third Law of Thermodynamics:**  \n*As temperature approaches absolute zero (0 K), the entropy of a perfect crystal approaches zero.*\n\n- This suggests it is impossible to reach absolute zero in any finite number of steps.\n- At absolute zero, a perfectly ordered crystal would have only one microstate (minimum entropy).\n\n---\n\n**Summary Table:**\n\n| Law        | Main Statement                                             |\n|------------|-----------------------------------------------------------|\n| First      | Energy is conserved                                       |\n| Second     | Entropy increases or remains constant                     |\n| Third      | Entropy approaches zero as temperature approaches 0 K     |",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470813,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnUz3cM4bgGfNijU6O2Bjr5zBIE8",
  "model": "gpt-4.1-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_464203d4c6",
  "usage": {
    "completion_tokens": 319,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 16,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 335
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1',
  {
    messages: [
      { content: 'You are a helpful coding assistant specializing in Python.', role: 'system' },
      { content: 'How do I read a JSON file in Python?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4.1",
  "messages": [
    {
      "content": "You are a helpful coding assistant specializing in Python.",
      "role": "system"
    },
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ]
}'
```

````
To read a JSON file in Python, you can use the built-in `json` module. Here’s a simple step-by-step example:

### 1. Import the `json` module

```python
import json
```

### 2. Open and read the JSON file

Assuming your JSON file is named `data.json`:

```python
with open('data.json', 'r') as file:
    data = json.load(file)
```

### 3. Now `data` is a Python object (usually a `dict` or `list`)
You can use `data` just like any other Python dictionary or list.

### Full Example

Assume `data.json` contains:
```json
{
  "name": "Alice",
  "age": 30,
  "city": "Wonderland"
}
```

Python code:
```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data["name"])  # Output: Alice
print(data["age"])   # Output: 30
```

---

**Recap:**
- Use `import json`.
- Use `with open(filename) as f: data = json.load(f)`
- Now, `data` contains your JSON data as Python objects!
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "To read a JSON file in Python, you can use the built-in `json` module. Here’s a simple step-by-step example:\n\n### 1. Import the `json` module\n\n```python\nimport json\n```\n\n### 2. Open and read the JSON file\n\nAssuming your JSON file is named `data.json`:\n\n```python\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n```\n\n### 3. Now `data` is a Python object (usually a `dict` or `list`)  \nYou can use `data` just like any other Python dictionary or list.\n\n### Full Example\n\nAssume `data.json` contains:\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"city\": \"Wonderland\"\n}\n```\n\nPython code:\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data[\"name\"])  # Output: Alice\nprint(data[\"age\"])   # Output: 30\n```\n\n---\n\n**Recap:**  \n- Use `import json`.\n- Use `with open(filename) as f: data = json.load(f)`\n- Now, `data` contains your JSON data as Python objects!",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470814,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnV0JChfu6u4m6dzXKPW2Rb0MofH",
  "model": "gpt-4.1-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_7e40a569fc",
  "usage": {
    "completion_tokens": 268,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 31,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 299
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1',
  {
    max_completion_tokens: 8192,
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4.1",
  "max_completion_tokens": 8192,
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
Great! There are two main routes between San Francisco and Los Angeles:

**1. The Scenic Pacific Coast Highway (Highway 1):**
This is the most beautiful (and slower) option, hugging the coastline with stunning ocean views. Key stops along this route include:

- **Half Moon Bay:** Charming coastal town, great for beaches and breakfast.
- **Santa Cruz:** Fun boardwalk, surf spots, and natural bridges.
- **Monterey:** Monterey Bay Aquarium, Cannery Row, 17-Mile Drive.
- **Carmel-by-the-Sea:** Picturesque town, great art galleries, boutiques, and beaches.
- **Big Sur:** Breathtaking cliffs, Bixby Creek Bridge, McWay Falls, and several state parks for hiking (like Julia Pfeiffer Burns State Park).
- **Hearst Castle (San Simeon):** Grand historic estate you can tour.
- **Cambria & Morro Bay:** Cute small towns, Morro Rock, great seafood.
- **San Luis Obispo:** Lively downtown, Madonna Inn for quirky photos, Mission San Luis Obispo.
- **Pismo Beach:** Famous for its dunes and clam chowder.
- **Santa Barbara:** Gorgeous beaches, Spanish architecture, great lunch stop, wine tasting.
- **Malibu:** Beautiful beaches and coastal views just before you reach LA.

*Tip: This route is best enjoyed over 2-3 days, but you can do portions if you’re on a tighter schedule.*

---

**2. The Fast Inland Route (Highway 101 or I-5):**
Quicker, but less scenic. For quick but worthwhile stops:

- **Gilroy:** Garlic capital, outlet shopping.
- **Paso Robles:** Renowned wineries and adorable downtown.
- **Santa Barbara:** As above, worth a detour if you take Hwy 101.

If you’re on **I-5**, main stops are limited—Harris Ranch is a classic spot for a meal (and cattle viewing), but scenery is mostly farmland.

---

**Let me know:**
- Do you have 1 day or several for the drive?
- What are your interests (scenery, food, wine, beaches, hiking)?
- Traveling solo, as a couple, or with family/kids?

With a bit more info, I can tailor a perfect list for you!
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "Great! There are two main routes between San Francisco and Los Angeles:\n\n**1. The Scenic Pacific Coast Highway (Highway 1):**  \nThis is the most beautiful (and slower) option, hugging the coastline with stunning ocean views. Key stops along this route include:\n\n- **Half Moon Bay:** Charming coastal town, great for beaches and breakfast.\n- **Santa Cruz:** Fun boardwalk, surf spots, and natural bridges.\n- **Monterey:** Monterey Bay Aquarium, Cannery Row, 17-Mile Drive.\n- **Carmel-by-the-Sea:** Picturesque town, great art galleries, boutiques, and beaches.\n- **Big Sur:** Breathtaking cliffs, Bixby Creek Bridge, McWay Falls, and several state parks for hiking (like Julia Pfeiffer Burns State Park).\n- **Hearst Castle (San Simeon):** Grand historic estate you can tour.\n- **Cambria & Morro Bay:** Cute small towns, Morro Rock, great seafood.\n- **San Luis Obispo:** Lively downtown, Madonna Inn for quirky photos, Mission San Luis Obispo.\n- **Pismo Beach:** Famous for its dunes and clam chowder.\n- **Santa Barbara:** Gorgeous beaches, Spanish architecture, great lunch stop, wine tasting.\n- **Malibu:** Beautiful beaches and coastal views just before you reach LA.\n\n*Tip: This route is best enjoyed over 2-3 days, but you can do portions if you’re on a tighter schedule.*\n\n---\n\n**2. The Fast Inland Route (Highway 101 or I-5):**  \nQuicker, but less scenic. For quick but worthwhile stops:\n\n- **Gilroy:** Garlic capital, outlet shopping.\n- **Paso Robles:** Renowned wineries and adorable downtown.\n- **Santa Barbara:** As above, worth a detour if you take Hwy 101.\n\nIf you’re on **I-5**, main stops are limited—Harris Ranch is a classic spot for a meal (and cattle viewing), but scenery is mostly farmland.\n\n---\n\n**Let me know:**\n- Do you have 1 day or several for the drive?\n- What are your interests (scenery, food, wine, beaches, hiking)?\n- Traveling solo, as a couple, or with family/kids?\n\nWith a bit more info, I can tailor a perfect list for you!",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470817,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnV37uMPRNbZz6wc0f1dEO7gTp17",
  "model": "gpt-4.1-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_3fcf29cddc",
  "usage": {
    "completion_tokens": 481,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 75,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 556
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1',
  {
    max_completion_tokens: 8192,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4.1",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ]
}'
```

```
Detective Lila Maren knelt beside the wrought-iron fence, her breath misting in the pale dawn light. The alley was quiet, save for the distant hum of the city waking. She scanned the scuffed cobblestones, expecting the usual—a cigarette butt, perhaps, or a scrap of torn fabric. Instead, nestled in a shallow puddle, she found a single red chess pawn, oddly pristine amid the grime.

Lila lifted it with gloved fingers, turning it over as she studied its glossy sheen. No markings. No blood. Just a chess piece, out of place and glinting like a secret. She frowned, recalling the message scrawled on the victim’s mirror upstairs: “Checkmate.” The game, it seemed, was just beginning.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "Detective Lila Maren knelt beside the wrought-iron fence, her breath misting in the pale dawn light. The alley was quiet, save for the distant hum of the city waking. She scanned the scuffed cobblestones, expecting the usual—a cigarette butt, perhaps, or a scrap of torn fabric. Instead, nestled in a shallow puddle, she found a single red chess pawn, oddly pristine amid the grime.\n\nLila lifted it with gloved fingers, turning it over as she studied its glossy sheen. No markings. No blood. Just a chess piece, out of place and glinting like a secret. She frowned, recalling the message scrawled on the victim’s mirror upstairs: “Checkmate.” The game, it seemed, was just beginning.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470819,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnV5b5ltpItctts03EY2jcCCWLEe",
  "model": "gpt-4.1-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_7a56a8eabf",
  "usage": {
    "completion_tokens": 159,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 20,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 179
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1',
  {
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
    stream_options: { include_usage: true },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4.1",
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true,
  "stream_options": {
    "include_usage": true
  }
}'
```

````
**Recursion** is a programming technique where a function calls itself to solve a problem. Each time the function calls itself, it breaks the problem down into smaller subproblems. For recursion to stop, a **base case** (or termination condition) is required.

**Simple Example: Calculating Factorial**

The **factorial** of a non-negative integer `n` (written as `n!`) is the product of all positive integers less than or equal to `n`.

**Mathematically:**
- `n! = n × (n-1) × (n-2) × ... × 1`
- By definition, `0! = 1`

**Recursive Definition:**
- If `n == 0`, then `factorial(n) = 1`   (base case)
- If `n > 0`, then `factorial(n) = n × factorial(n-1)`  (recursive case)

**Code Example in Python:**
```python
def factorial(n):
    if n == 0:         # Base case
        return 1
    else:
        return n * factorial(n - 1)   # Recursive call
```

**How it works:**
To compute `factorial(4)`:
- `factorial(4)` returns `4 * factorial(3)`
- `factorial(3)` returns `3 * factorial(2)`
- `factorial(2)` returns `2 * factorial(1)`
- `factorial(1)` returns `1 * factorial(0)`
- `factorial(0)` returns `1` (base case)

So,
- `factorial(1)` = 1 × 1 = 1
- `factorial(2)` = 2 × 1 = 2
- `factorial(3)` = 3 × 2 = 6
- `factorial(4)` = 4 × 6 = 24

**In summary:**
Recursion is when a function calls itself, and the problem gets divided into smaller parts until reaching a simple, solvable case (the base case).
````

```json
[
  {
    "choices": [
      {
        "delta": {
          "content": "",
          "refusal": null,
          "role": "assistant"
        },
        "finish_reason": null,
        "index": 0,
        "logprobs": null
      }
    ],
    "created": 1776470822,
    "id": "chatcmpl-DVnV8rG1ILDUR9r3HsKDVd4dbGH0A",
    "model": "gpt-4.1-2025-04-14",
    "obfuscation": "nqlUcqwR28bhP",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_51f6d1255b",
    "usage": null
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "finish_reason": null,
        "index": 0,
        "logprobs": null
      }
    ],
    "created": 1776470822,
    "id": "chatcmpl-DVnV8rG1ILDUR9r3HsKDVd4dbGH0A",
    "model": "gpt-4.1-2025-04-14",
    "obfuscation": "F8I8qrGpbmKbK",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_51f6d1255b",
    "usage": null
  },
  "... 440 more chunks omitted ...",
  {
    "choices": [],
    "created": 1776470822,
    "id": "chatcmpl-DVnV8rG1ILDUR9r3HsKDVd4dbGH0A",
    "model": "gpt-4.1-2025-04-14",
    "obfuscation": "qHFF5gBP2hPp",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_51f6d1255b",
    "usage": {
      "completion_tokens": 440,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 0,
        "rejected_prediction_tokens": 0
      },
      "prompt_tokens": 17,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 0
      },
      "total_tokens": 457
    }
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting the model use OpenAI's built-in web search tool to answer with current information</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1',
  {
    input: 'What were the top news stories about Cloudflare this week? Summarise in three bullets.',
    max_output_tokens: 4096,
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
  "model": "openai/gpt-4.1",
  "input": "What were the top news stories about Cloudflare this week? Summarise in three bullets.",
  "max_output_tokens": 4096,
  "tools": [
    {
      "type": "web_search_preview"
    }
  ]
}'
```

```
Here are the top news stories about Cloudflare this week:

- **Launch of New Partner Initiative for AI and SASE Adoption**: Cloudflare introduced the Cloudflare One Design Partner designation and an AI-powered toolkit to accelerate the adoption of artificial intelligence (AI) and secure access service edge (SASE) architectures. This initiative aims to help organizations modernize legacy security infrastructures and overcome challenges like configuration risks and lengthy deployment times. ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai))

- **Completion of Agent Infrastructure Stack with Browser Run Rebuild**: Cloudflare completed its agent infrastructure stack by rebuilding Browser Run on its own Containers platform. This upgrade delivers higher concurrency, faster response times, and support for WebGL and WebMCP, enhancing the performance and scalability of AI agents. ([infoq.com](https://www.infoq.com/news/2026/05/cloudflare-agent-platform-stack/?utm_source=openai))

- **Workforce Reduction Amid AI Adoption**: Cloudflare announced plans to reduce its global workforce by about 20%, cutting more than 1,100 jobs. This restructuring is part of the company's shift towards an AI-first operating model, reflecting the rapid adoption of AI tools and the resulting changes in operational processes. ([business-standard.com](https://www.business-standard.com/technology/tech-news/cloudflare-to-cut-about-20-workforce-as-ai-adoption-reshapes-operations-126050800117_1.html?utm_source=openai))
```

```json
{
  "id": "resp_0fdf05943aa0606d016a398f3d52b48198b359c259da57fcf2",
  "object": "response",
  "created_at": 1782157117,
  "model": "gpt-4.1-2025-04-14",
  "output": [
    {
      "id": "ws_0fdf05943aa0606d016a398f3db07c8198a82f9fb39e0ca765",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare top news stories this week"
        ],
        "query": "Cloudflare top news stories this week"
      }
    },
    {
      "id": "msg_0fdf05943aa0606d016a398f3f38808198be80ca5b78103aaf",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [
            {
              "type": "url_citation",
              "end_index": 658,
              "start_index": 494,
              "title": "Cloudflare launches new partner initiative to support AI and SASE adoption",
              "url": "https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1098,
              "start_index": 998,
              "title": "Cloudflare Completes Its Agent Infrastructure Stack with Browser Run Rebuild and Six-Layer Platform - InfoQ",
              "url": "https://www.infoq.com/news/2026/05/cloudflare-agent-platform-stack/?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1618,
              "start_index": 1427,
              "title": "Cloudflare to cut about 20% workforce as AI adoption reshapes operations | Tech News - Business Standard",
              "url": "https://www.business-standard.com/technology/tech-news/cloudflare-to-cut-about-20-workforce-as-ai-adoption-reshapes-operations-126050800117_1.html?utm_source=openai"
            }
          ],
          "logprobs": [],
          "text": "Here are the top news stories about Cloudflare this week:\n\n- **Launch of New Partner Initiative for AI and SASE Adoption**: Cloudflare introduced the Cloudflare One Design Partner designation and an AI-powered toolkit to accelerate the adoption of artificial intelligence (AI) and secure access service edge (SASE) architectures. This initiative aims to help organizations modernize legacy security infrastructures and overcome challenges like configuration risks and lengthy deployment times. ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai))\n\n- **Completion of Agent Infrastructure Stack with Browser Run Rebuild**: Cloudflare completed its agent infrastructure stack by rebuilding Browser Run on its own Containers platform. This upgrade delivers higher concurrency, faster response times, and support for WebGL and WebMCP, enhancing the performance and scalability of AI agents. ([infoq.com](https://www.infoq.com/news/2026/05/cloudflare-agent-platform-stack/?utm_source=openai))\n\n- **Workforce Reduction Amid AI Adoption**: Cloudflare announced plans to reduce its global workforce by about 20%, cutting more than 1,100 jobs. This restructuring is part of the company's shift towards an AI-first operating model, reflecting the rapid adoption of AI tools and the resulting changes in operational processes. ([business-standard.com](https://www.business-standard.com/technology/tech-news/cloudflare-to-cut-about-20-workforce-as-ai-adoption-reshapes-operations-126050800117_1.html?utm_source=openai)) "
        }
      ],
      "role": "assistant"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 320,
    "output_tokens": 343,
    "total_tokens": 663,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 0
    }
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1782157123,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 4096,
  "max_tool_calls": null,
  "moderation": null,
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "in_memory",
  "reasoning": {
    "context": null,
    "effort": null,
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": false,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
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
  "user": null,
  "metadata": {},
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

Schema variant

ResponsesChat Completions

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

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4.1/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4.1/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4.1/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4.1/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-4.1/#page","headline":"GPT-4.1","description":"OpenAI's flagship GPT model for complex tasks with a million-token context window.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-4.1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
