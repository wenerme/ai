---
description: xAI's Grok 4.3 model with a 1M-token context window and strong agentic tool calling with minimal hallucinations. Accepts text and image inputs, and supports function calling, structured outputs, and configurable reasoning effort (none, low, medium, high).
title: Grok 4.3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok 4.3

Text Generation • xAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-4.3/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-4.3`

- Third-party
- Zero data retention

xAI's Grok 4.3 model with a 1M-token context window and strong agentic tool calling with minimal hallucinations. Accepts text and image inputs, and supports function calling, structured outputs, and configurable reasoning effort (none, low, medium, high).

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service) |
| More information | [link ↗](https://docs.x.ai/docs/models/grok-4.3) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.25</li><li>Output (per 1M tokens)$2.50</li><li>Cached input (per 1M tokens)$0.20</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-4.3',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.3",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The three main laws of thermodynamics (often called the First, Second, and Third Laws) are fundamental principles describing energy, entropy, and absolute temperature. (A "Zeroth Law" was added later to define thermal equilibrium and temperature, but it is not usually counted among the classic three.)

**First Law (Conservation of Energy)**
Energy cannot be created or destroyed, only converted from one form to another or transferred. For a closed system, the change in internal energy \(\Delta U\) equals heat added to the system \(Q\) minus work done by the system \(W\):
\[
\Delta U = Q - W
\]
(This is essentially a statement of energy conservation.)

**Second Law (Entropy and Direction of Processes)**
The total entropy of an isolated system (or the universe) always increases over time for irreversible processes and remains constant for reversible ones. Heat naturally flows from hotter to colder bodies, and not all heat can be converted into work without losses. Mathematically, for any real process:
\[
\Delta S_{\text{universe}} > 0
\]
(where \(S\) is entropy). This law sets the arrow of time and limits the efficiency of heat engines.

**Third Law (Absolute Zero)**
As the temperature of a perfect crystal approaches absolute zero (0 K or −273.15 °C), its entropy approaches a minimum value (usually taken as zero). This implies that absolute zero is unattainable in a finite number of steps, and it becomes impossible to remove all thermal energy from a system.
\[
\lim_{T \to 0} S = 0 \quad \text{(for a perfect crystal)}
\]

These laws apply to macroscopic systems and form the foundation of classical thermodynamics.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The three main laws of thermodynamics (often called the First, Second, and Third Laws) are fundamental principles describing energy, entropy, and absolute temperature. (A \"Zeroth Law\" was added later to define thermal equilibrium and temperature, but it is not usually counted among the classic three.)\n\n**First Law (Conservation of Energy)**  \nEnergy cannot be created or destroyed, only converted from one form to another or transferred. For a closed system, the change in internal energy \\(\\Delta U\\) equals heat added to the system \\(Q\\) minus work done by the system \\(W\\):  \n\\[\n\\Delta U = Q - W\n\\]  \n(This is essentially a statement of energy conservation.)\n\n**Second Law (Entropy and Direction of Processes)**  \nThe total entropy of an isolated system (or the universe) always increases over time for irreversible processes and remains constant for reversible ones. Heat naturally flows from hotter to colder bodies, and not all heat can be converted into work without losses. Mathematically, for any real process:  \n\\[\n\\Delta S_{\\text{universe}} > 0\n\\]  \n(where \\(S\\) is entropy). This law sets the arrow of time and limits the efficiency of heat engines.\n\n**Third Law (Absolute Zero)**  \nAs the temperature of a perfect crystal approaches absolute zero (0 K or −273.15 °C), its entropy approaches a minimum value (usually taken as zero). This implies that absolute zero is unattainable in a finite number of steps, and it becomes impossible to remove all thermal energy from a system.  \n\\[\n\\lim_{T \\to 0} S = 0 \\quad \\text{(for a perfect crystal)}\n\\]\n\nThese laws apply to macroscopic systems and form the foundation of classical thermodynamics.",
        "reasoning_content": "The user is asking for the three laws of thermodynamics. There are actually four laws, including the zeroth law, but commonly people refer to the first, second, and third laws. I should be accurate.\n\n...",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1778620601,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "aa6188e7-7a27-9a26-ae62-4254a81c52a4",
  "model": "grok-4.3",
  "object": "chat.completion",
  "system_fingerprint": "fp_655c34cb90f68992",
  "usage": {
    "completion_tokens": 351,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 328,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 17356000,
    "num_sources_used": 0,
    "prompt_tokens": 138,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 128,
      "image_tokens": 0,
      "text_tokens": 138
    },
    "total_tokens": 817
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.3',
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
  "model": "xai/grok-4.3",
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
To read a JSON file in Python, use the built-in `json` module. Here's the standard way:

```python
import json

# Open and read the JSON file
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

print(data)  # data is now a Python dict or list
```

### Key Points

- **`json.load()`** reads from a file object (as shown above).
- Use the `with` statement to automatically close the file.
- Add `encoding='utf-8'` for safety with non-ASCII characters.
- If you have JSON as a string instead of a file, use `json.loads()`:

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)
```

### Handling Errors

```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError:
    print("Invalid JSON format.")
```

This is the recommended approach for most use cases.
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "To read a JSON file in Python, use the built-in `json` module. Here's the standard way:\n\n```python\nimport json\n\n# Open and read the JSON file\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n\nprint(data)  # data is now a Python dict or list\n```\n\n### Key Points\n\n- **`json.load()`** reads from a file object (as shown above).\n- Use the `with` statement to automatically close the file.\n- Add `encoding='utf-8'` for safety with non-ASCII characters.\n- If you have JSON as a string instead of a file, use `json.loads()`:\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n```\n\n### Handling Errors\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format.\")\n```\n\nThis is the recommended approach for most use cases.",
        "reasoning_content": "The question is: \"How do I read a JSON file in Python?\"\n",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1778620601,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "e70ffa7f-a9fa-96d3-ab78-ee0696700ef2",
  "model": "grok-4.3",
  "object": "chat.completion",
  "system_fingerprint": "fp_655c34cb90f68992",
  "usage": {
    "completion_tokens": 249,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 249,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 13018500,
    "num_sources_used": 0,
    "prompt_tokens": 153,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 128,
      "image_tokens": 0,
      "text_tokens": 153
    },
    "total_tokens": 651
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.3',
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
  "model": "xai/grok-4.3",
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
Here are some excellent stops along the scenic Pacific Coast Highway (Hwy 1) route from San Francisco to Los Angeles, which is far more enjoyable than the faster I-5 inland drive. This path is about 450 miles and takes 8–10 hours of driving time, so plan for 1–2 days with breaks. I've focused on a mix of nature, food, and landmarks, spaced out roughly every 1–2 hours:

### Early Stops (First 2–3 hours from SF)
- **Monterey/Carmel**: Stop for the Monterey Bay Aquarium (world-class marine life exhibits) or a walk along Cannery Row. Nearby, 17-Mile Drive offers stunning coastal views and Pebble Beach golf scenery. Great for lunch—try fresh seafood.
- **Big Sur**: Iconic cliffs, redwoods, and ocean vistas. Pull over at Bixby Creek Bridge for photos or hike in Julia Pfeiffer Burns State Park (McWay Falls is a highlight). Limited services, so gas up beforehand.

### Mid-Trip Stops (Around 4–6 hours in)
- **San Simeon/Hearst Castle**: Tour the opulent Hearst Castle (book ahead) with its pools, gardens, and art collection. Nearby, elephant seal rookeries at Piedras Blancas are free to view from the roadside—amazing wildlife.
- **Morro Bay or Cambria**: Relaxed beach towns. Morro Rock is a volcanic landmark perfect for kayaking or a quick hike. Cambria has cute shops and Moonstone Beach for tidepooling.

### Later Stops (Last 2–3 hours to LA)
- **San Luis Obispo or Pismo Beach**: SLO for a charming downtown with the historic mission and bubblegum alley. Pismo for classic California beach vibes, sand dunes, and clam chowder.
- **Santa Barbara**: "American Riviera" with beautiful beaches, the Spanish-style courthouse for panoramic views, and State Street for shopping/dining. Ideal for an overnight if you're splitting the trip.

### Tips
- **Route note**: Stick to Hwy 1 for scenery (it's slower but worth it); parts can close due to weather/landslides, so check Caltrans updates.
- **Food/essentials**: Pack snacks, as services thin out in Big Sur. Stops like Nepenthe in Big Sur offer cliffside dining.
- **Customization**: If you prefer nature, wine tasting (e.g., near Paso Robles), or family-friendly spots, let me know your interests, group size, or how many days you have—I can refine this or suggest an itinerary with hotels!
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Here are some excellent stops along the scenic Pacific Coast Highway (Hwy 1) route from San Francisco to Los Angeles, which is far more enjoyable than the faster I-5 inland drive. This path is about 450 miles and takes 8–10 hours of driving time, so plan for 1–2 days with breaks. I've focused on a mix of nature, food, and landmarks, spaced out roughly every 1–2 hours:\n\n### Early Stops (First 2–3 hours from SF)\n- **Monterey/Carmel**: Stop for the Monterey Bay Aquarium (world-class marine life exhibits) or a walk along Cannery Row. Nearby, 17-Mile Drive offers stunning coastal views and Pebble Beach golf scenery. Great for lunch—try fresh seafood.\n- **Big Sur**: Iconic cliffs, redwoods, and ocean vistas. Pull over at Bixby Creek Bridge for photos or hike in Julia Pfeiffer Burns State Park (McWay Falls is a highlight). Limited services, so gas up beforehand.\n\n### Mid-Trip Stops (Around 4–6 hours in)\n- **San Simeon/Hearst Castle**: Tour the opulent Hearst Castle (book ahead) with its pools, gardens, and art collection. Nearby, elephant seal rookeries at Piedras Blancas are free to view from the roadside—amazing wildlife.\n- **Morro Bay or Cambria**: Relaxed beach towns. Morro Rock is a volcanic landmark perfect for kayaking or a quick hike. Cambria has cute shops and Moonstone Beach for tidepooling.\n\n### Later Stops (Last 2–3 hours to LA)\n- **San Luis Obispo or Pismo Beach**: SLO for a charming downtown with the historic mission and bubblegum alley. Pismo for classic California beach vibes, sand dunes, and clam chowder.\n- **Santa Barbara**: \"American Riviera\" with beautiful beaches, the Spanish-style courthouse for panoramic views, and State Street for shopping/dining. Ideal for an overnight if you're splitting the trip.\n\n### Tips\n- **Route note**: Stick to Hwy 1 for scenery (it's slower but worth it); parts can close due to weather/landslides, so check Caltrans updates.\n- **Food/essentials**: Pack snacks, as services thin out in Big Sur. Stops like Nepenthe in Big Sur offer cliffside dining.\n- **Customization**: If you prefer nature, wine tasting (e.g., near Paso Robles), or family-friendly spots, let me know your interests, group size, or how many days you have—I can refine this or suggest an itinerary with hotels!",
        "reasoning_content": "The user is asking for good places to stop on a road trip from San Francisco to Los Angeles. This is a continuation from previous messages.\nI think the best stops on a road trip from San Francisco to Los Angeles are along the Pacific Coast Highway (Highway 1) for the most scenic views.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1778620642,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "7bf6afe6-09d9-97e0-b3b1-569b9da2b6b5",
  "model": "grok-4.3",
  "object": "chat.completion",
  "system_fingerprint": "fp_655c34cb90f68992",
  "usage": {
    "completion_tokens": 532,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 458,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 25881000,
    "num_sources_used": 0,
    "prompt_tokens": 198,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 128,
      "image_tokens": 0,
      "text_tokens": 198
    },
    "total_tokens": 1188
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.3',
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
  "model": "xai/grok-4.3",
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
Detective Mara Ellison crouched in the rain-slicked alley behind the shuttered theater, her gloved fingers brushing aside a crumpled playbill. The victim—a reclusive playwright—lay a few feet away, but it was the clue that stopped her cold: a single, flawless chess pawn carved from what looked like human bone, its base etched with the playwright’s own initials in a script too precise for any hurried killer. A faint scent of stage grease clung to it, and when she tilted it toward the streetlight, tiny notches along its side formed a pattern that looked suspiciously like Morse code.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Detective Mara Ellison crouched in the rain-slicked alley behind the shuttered theater, her gloved fingers brushing aside a crumpled playbill. The victim—a reclusive playwright—lay a few feet away, but it was the clue that stopped her cold: a single, flawless chess pawn carved from what looked like human bone, its base etched with the playwright’s own initials in a script too precise for any hurried killer. A faint scent of stage grease clung to it, and when she tilted it toward the streetlight, tiny notches along its side formed a pattern that looked suspiciously like Morse code.",
        "reasoning_content": "The user asked: \"Write a short story opening about a detective finding an unusual clue.\"\nI need to write a short story opening about a detective finding an unusual clue. I'll start by setting the scene with the detective in a dimly lit office or at a crime scene. Then, I'll introduce the clue in a surprising way to make it unusual.\n\nFor the clue, I'll go with something like a message written in a language that's not recognized, or a symbol that doesn't belong.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1778620620,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "e5192068-96c5-9603-b29c-33f9da53ec02",
  "model": "grok-4.3",
  "object": "chat.completion",
  "system_fingerprint": "fp_655c34cb90f68992",
  "usage": {
    "completion_tokens": 120,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 575,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 17818500,
    "num_sources_used": 0,
    "prompt_tokens": 143,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 128,
      "image_tokens": 0,
      "text_tokens": 143
    },
    "total_tokens": 838
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'xai/grok-4.3',
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
  "model": "xai/grok-4.3",
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
**Recursion** is a programming technique where a function solves a problem by calling *itself* with a smaller or simpler version of the original problem. It keeps breaking the problem down until it reaches a simple case that can be solved directly (called the **base case**).
### Simple Example: Factorial
The factorial of a number *n* (written as *n!*) is the product of all positive integers from 1 to *n*. For example:
- 5! = 5 × 4 × 3 × 2 × 1 = 120
Mathematically, we can define it recursively as:
- **Base case**: 0! = 1 or 1! = 1
- **Recursive case**: n! = n × (n-1)!
Here's how this looks in Python:
```python
def factorial(n):
 if n == 0 or n == 1: # Base case
 return 1
 else:
 return n * factorial(n - 1) # Recursive call
```
### How it works (step-by-step for `factorial(5)`)
1. `factorial(5)` → returns `5 * factorial(4)`
2. `factorial(4)` → returns `4 * factorial(3)`
3. `factorial(3)` → returns `3 * factorial(2)`
4. `factorial(2)` → returns `2 * factorial(1)`
5. `factorial(1)` → hits the **base case** and returns `1`
The results then "unwind" back up:
- `2 * 1 = 2`
- `3 * 2 = 6`
- `4 * 6 = 24`
- `5 * 24 = 120`
So `factorial(5)` returns **120**.
### Key Points
- **Base case** is crucial — without it, the function would call itself forever (causing a stack overflow).
- Recursion uses the **call stack** to keep track of each function call.
- While elegant for some problems (like tree traversals or divide-and-conquer algorithms), recursion can be less efficient than iteration for simple tasks due to the overhead of function calls.
````

```json
[
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": "The",
          "role": "assistant"
        },
        "index": 0
      }
    ],
    "created": 1778620632,
    "id": "853a0f04-bc0e-525a-cdb9-e035f1d365fa",
    "model": "grok-4.3",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_655c34cb90f68992"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " question"
        },
        "index": 0
      }
    ],
    "created": 1778620632,
    "id": "853a0f04-bc0e-525a-cdb9-e035f1d365fa",
    "model": "grok-4.3",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_655c34cb90f68992"
  },
  "... 471 more chunks omitted ...",
  {
    "choices": [],
    "created": 1778620641,
    "id": "853a0f04-bc0e-525a-cdb9-e035f1d365fa",
    "model": "grok-4.3",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_655c34cb90f68992",
    "usage": {
      "completion_tokens": 455,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 358,
        "rejected_prediction_tokens": 0
      },
      "cost_in_usd_ticks": 20731000,
      "num_sources_used": 0,
      "prompt_tokens": 140,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 128,
        "image_tokens": 0,
        "text_tokens": 140
      },
      "total_tokens": 953
    }
  }
]
```

</details>

## Parameters

▶messages\[]

`array`requiredminItems: 1maxItems: 500

deferred

`boolean`

frequency\_penalty

`number | null`

logprobs

`boolean`

max\_completion\_tokens

`integer | null`

max\_tokens

`integer | null`

n

`integer | null`

parallel\_tool\_calls

`boolean`

presence\_penalty

`number | null`

reasoning\_effort

`string | null`enum: none, low, medium, high

▶response\_format

`one of`

▶search\_parameters{}

`object`

seed

`integer | null`

stop

`array | null`

stream

`boolean`

▶stream\_options{}

`object`

temperature

`number | null`

▶tool\_choice

`one of`

tools

`array | null`

top\_logprobs

`integer | null`

top\_p

`number | null`

user

`string`

▶web\_search\_options{}

`object`

id

`string`

object

`string`const: chat.completion

created

`number`

model

`string`

▶choices\[]

`array`

citations

`array | null`

output\_files

`array | null`

system\_fingerprint

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/xai/grok-4.3/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/xai/grok-4.3/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/xai/grok-4.3/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/xai/grok-4.3/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-4.3/#page","headline":"Grok 4.3","description":"xAI's Grok 4.3 model with a 1M-token context window and strong agentic tool calling with minimal hallucinations. Accepts text and image inputs, and supports function calling, structured outputs, and configurable reasoning effort (none, low, medium, high).","url":"https://developers.cloudflare.com/ai/models/xai/grok-4.3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
