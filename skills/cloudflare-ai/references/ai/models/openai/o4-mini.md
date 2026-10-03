---
description: OpenAI's fast, lightweight reasoning model optimized for multi-step problem solving at lower cost.
title: o4-mini
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# o4-mini

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/o4-mini/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/o4-mini`

- Third-party
- Zero data retention

OpenAI's fast, lightweight reasoning model optimized for multi-step problem solving at lower cost.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 200,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.10</li><li>Output (per 1M tokens)$4.40</li><li>Cached input (per 1M tokens)$0.275</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/o4-mini',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/o4-mini",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
Here are the three (classical) laws of thermodynamics:

1. First Law (Conservation of Energy)
     – Statement: Energy can neither be created nor destroyed, only converted from one form to another.
     – Formulation: ΔU = Q – W
      • ΔU is the change in internal energy of the system
      • Q is heat added to the system
      • W is work done by the system

2. Second Law (Entropy Increase)
     – Statement: In any spontaneous process, the total entropy of an isolated system never decreases; it increases for irreversible processes and remains constant for reversible ones.
     – Key consequences:
      • Heat cannot spontaneously flow from cold to hot (Clausius statement)
      • No heat engine can be 100% efficient (Kelvin–Planck statement)

3. Third Law (Unattainability of Absolute Zero)
     – Statement: As the temperature of a perfect crystalline substance approaches absolute zero (0 K), its entropy approaches a constant minimum (often taken as zero).
     – Consequence: It is impossible to reach absolute zero in a finite number of steps.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Here are the three (classical) laws of thermodynamics:\n\n1. First Law (Conservation of Energy)  \n     – Statement: Energy can neither be created nor destroyed, only converted from one form to another.  \n     – Formulation: ΔU = Q – W  \n      • ΔU is the change in internal energy of the system  \n      • Q is heat added to the system  \n      • W is work done by the system  \n\n2. Second Law (Entropy Increase)  \n     – Statement: In any spontaneous process, the total entropy of an isolated system never decreases; it increases for irreversible processes and remains constant for reversible ones.  \n     – Key consequences:  \n      • Heat cannot spontaneously flow from cold to hot (Clausius statement)  \n      • No heat engine can be 100% efficient (Kelvin–Planck statement)  \n\n3. Third Law (Unattainability of Absolute Zero)  \n     – Statement: As the temperature of a perfect crystalline substance approaches absolute zero (0 K), its entropy approaches a constant minimum (often taken as zero).  \n     – Consequence: It is impossible to reach absolute zero in a finite number of steps.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470984,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnXkjut2BEk7At18pcFMPV5TOSoc",
  "model": "o4-mini-2025-04-16",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 505,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 192,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 15,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 520
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/o4-mini',
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
  "model": "openai/o4-mini",
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
Here’s the most common way, using Python’s built-in json module:

```python
import json

# 1. Open the file
with open("data.json", "r", encoding="utf-8") as f:
    # 2. Parse the JSON into a Python object (dict or list)
    data = json.load(f)

# 3. Now `data` is a normal Python dict/list
print(data)
print(type(data))      # e.g. <class 'dict'>
print(data["someKey"]) # access fields as usual
```

Explanation:

 1. `open(..., "r", encoding="utf-8")` opens in read-mode.
 2. `json.load(f)` reads the entire file and deserializes it to a Python object.
 3. You can now work with it like any dict or list.

If you already have a JSON string in memory, use `json.loads()`:

```python
import json

json_str = '{"name": "Alice", "age": 30}'
data = json.loads(json_str)
```

Error handling example:

```python
import json

try:
    with open("data.json", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print("Invalid JSON:", e)
else:
    # success
    print(data)
```

Alternative with pathlib:

```python
from pathlib import Path
import json

text = Path("data.json").read_text(encoding="utf-8")
data = json.loads(text)
```

That’s all you need to read JSON files in Python!
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Here’s the most common way, using Python’s built-in json module:\n\n```python\nimport json\n\n# 1. Open the file\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    # 2. Parse the JSON into a Python object (dict or list)\n    data = json.load(f)\n\n# 3. Now `data` is a normal Python dict/list\nprint(data)\nprint(type(data))      # e.g. <class 'dict'>\nprint(data[\"someKey\"]) # access fields as usual\n```\n\nExplanation:\n\n 1. `open(..., \"r\", encoding=\"utf-8\")` opens in read-mode.\n 2. `json.load(f)` reads the entire file and deserializes it to a Python object.\n 3. You can now work with it like any dict or list.\n\nIf you already have a JSON string in memory, use `json.loads()`:\n\n```python\nimport json\n\njson_str = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_str)\n```\n\nError handling example:\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", encoding=\"utf-8\") as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError as e:\n    print(\"Invalid JSON:\", e)\nelse:\n    # success\n    print(data)\n```\n\nAlternative with pathlib:\n\n```python\nfrom pathlib import Path\nimport json\n\ntext = Path(\"data.json\").read_text(encoding=\"utf-8\")\ndata = json.loads(text)\n```\n\nThat’s all you need to read JSON files in Python!",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470984,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnXkrglfCO4sLEI5BodnMzerw1Ev",
  "model": "o4-mini-2025-04-16",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 499,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 128,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 30,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 529
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/o4-mini',
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
  "model": "openai/o4-mini",
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
Here are two popular ways to make the trip—with suggested stops—so you can pick the one that best fits your interests and schedule.

1. Coastal Highway (CA-1 / Pacific Coast Highway)
   Total driving time: ~8–10 hours (no major traffic), 450 miles
   Recommended pace: 2–3 days

   • Half Moon Bay (30 mi / 45 min from SF)
     – Stroll the beaches, grab coffee or seafood at the harbor.
     – Quick dune hike at Poplar Beach or Fitzgerald Marine Reserve.

   • Santa Cruz (50 mi / 1 hr from Half Moon Bay)
     – Santa Cruz Beach Boardwalk for rides & arcade.
     – Downtown Pacific Avenue for shops and local brews.

   • Capitola (5 mi / 10 min from Santa Cruz)
     – Colorful seaside village with boutique shops and cafés.
     – Great spot for sunset on Capitola Beach.

   • Monterey & Carmel (45 mi / 1 hr from Capitola)
     – Monterey Bay Aquarium, Cannery Row, coastal bike path.
     – Carmel-by-the-Sea: fairy-tale cottages, art galleries, Carmel Mission.
     – 17-Mile Drive (pebbled beaches, peacocks, iconic Lone Cypress).

   • Big Sur (30 mi / 1 hr from Carmel)
     – Bixby Creek Bridge photo-op.
     – Pfeiffer Beach (purple sand) and McWay Falls at Julia Pfeiffer Burns State Park.
     – Ragged Point for coastal vistas and snacks.
     Overnight option: Big Sur Lodge or camping.

   • San Simeon & Cambria (45 mi / 1 hr from Big Sur)
     – Hearst Castle tour.
     – Elephant Seal Vista Point just north of San Simeon.
     – Cambria’s Moonstone Beach Boardwalk and quaint Main Street.

   • Morro Bay (25 mi / 35 min from Cambria)
     – Morro Rock, waterfront restaurants, kayaking and bird-watching.

   • San Luis Obispo (30 mi / 35 min from Morro Bay)
     – Mission San Luis Obispo de Tolosa.
     – Bubblegum Alley and bustling Higuera Street for dinner or a brew.
     Overnight option: downtown SLO.

   • Pismo Beach & Solvang (option)
     – Pismo: pier, ATV dunes at nearby Oceano Dunes.
     – Solvang: Danish-style village and bakeries (20 mi inland from Pismo).

   • Santa Barbara (100 mi / 2 hrs from SLO)
     – State Street shopping, Stearns Wharf, Mission Santa Barbara.
     – Wine tasting in the nearby Funk Zone or Santa Ynez Valley.

   • Malibu & Santa Monica (90 mi / 1½–2 hrs from SB)
     – Malibu’s Zuma Beach or Point Dume.
     – Santa Monica Pier, Third Street Promenade.

   • Los Angeles (20 mi / 30 min from Santa Monica)
     – Welcome to LA!

2. Faster Inland Route (I-5)
   Total driving time: ~6 hrs, 380 miles
   Good if you’re pressed for time;  fewer scenic overlooks but easier mileage.

   Key stops along I-5:
   • Gilroy (40 mi / 45 min from SF) – Home of the Garlic Festival; farm stands.
   • Kettleman City (160 mi / 2½ hrs from Gilroy) – Bravo Farms for ice cream and picnic.
   • Harris Ranch (80 mi / 1 hr from Kettleman) – Large steakhouse, deli and wine shop.
   • Grapevine / Tejon Pass (65 mi / 1 hr from Harris) – Decent rest-stop restaurants and views as you descend into Southern California.
   • Valencia / Santa Clarita (30 mi / 30 min from Grapevine) – Valencia Town Center for shops.
   • Los Angeles (35 mi / 40 min from Valencia)

—
Tips:
• Plan fuel and rest stops in Big Sur — services are sparse.
• Book lodging early if traveling weekends or holidays (Big Sur, SLO, Santa Barbara are popular).
• Allow extra time for traffic, especially near Malibu, Santa Barbara, and LA.

Enjoy your trip! Let me know if you need more detail on any stop or lodging suggestions.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Here are two popular ways to make the trip—with suggested stops—so you can pick the one that best fits your interests and schedule.  \n\n1. Coastal Highway (CA-1 / Pacific Coast Highway)  \n   Total driving time: ~8–10 hours (no major traffic), 450 miles  \n   Recommended pace: 2–3 days  \n\n   • Half Moon Bay (30 mi / 45 min from SF)  \n     – Stroll the beaches, grab coffee or seafood at the harbor.  \n     – Quick dune hike at Poplar Beach or Fitzgerald Marine Reserve.  \n\n   • Santa Cruz (50 mi / 1 hr from Half Moon Bay)  \n     – Santa Cruz Beach Boardwalk for rides & arcade.  \n     – Downtown Pacific Avenue for shops and local brews.  \n\n   • Capitola (5 mi / 10 min from Santa Cruz)  \n     – Colorful seaside village with boutique shops and cafés.  \n     – Great spot for sunset on Capitola Beach.  \n\n   • Monterey & Carmel (45 mi / 1 hr from Capitola)  \n     – Monterey Bay Aquarium, Cannery Row, coastal bike path.  \n     – Carmel-by-the-Sea: fairy-tale cottages, art galleries, Carmel Mission.  \n     – 17-Mile Drive (pebbled beaches, peacocks, iconic Lone Cypress).  \n\n   • Big Sur (30 mi / 1 hr from Carmel)  \n     – Bixby Creek Bridge photo-op.  \n     – Pfeiffer Beach (purple sand) and McWay Falls at Julia Pfeiffer Burns State Park.  \n     – Ragged Point for coastal vistas and snacks.  \n     Overnight option: Big Sur Lodge or camping.  \n\n   • San Simeon & Cambria (45 mi / 1 hr from Big Sur)  \n     – Hearst Castle tour.  \n     – Elephant Seal Vista Point just north of San Simeon.  \n     – Cambria’s Moonstone Beach Boardwalk and quaint Main Street.  \n\n   • Morro Bay (25 mi / 35 min from Cambria)  \n     – Morro Rock, waterfront restaurants, kayaking and bird-watching.  \n\n   • San Luis Obispo (30 mi / 35 min from Morro Bay)  \n     – Mission San Luis Obispo de Tolosa.  \n     – Bubblegum Alley and bustling Higuera Street for dinner or a brew.  \n     Overnight option: downtown SLO.  \n\n   • Pismo Beach & Solvang (option)  \n     – Pismo: pier, ATV dunes at nearby Oceano Dunes.  \n     – Solvang: Danish-style village and bakeries (20 mi inland from Pismo).  \n\n   • Santa Barbara (100 mi / 2 hrs from SLO)  \n     – State Street shopping, Stearns Wharf, Mission Santa Barbara.  \n     – Wine tasting in the nearby Funk Zone or Santa Ynez Valley.  \n\n   • Malibu & Santa Monica (90 mi / 1½–2 hrs from SB)  \n     – Malibu’s Zuma Beach or Point Dume.  \n     – Santa Monica Pier, Third Street Promenade.  \n\n   • Los Angeles (20 mi / 30 min from Santa Monica)  \n     – Welcome to LA!  \n\n2. Faster Inland Route (I-5)  \n   Total driving time: ~6 hrs, 380 miles  \n   Good if you’re pressed for time;  fewer scenic overlooks but easier mileage.  \n\n   Key stops along I-5:  \n   • Gilroy (40 mi / 45 min from SF) – Home of the Garlic Festival; farm stands.  \n   • Kettleman City (160 mi / 2½ hrs from Gilroy) – Bravo Farms for ice cream and picnic.  \n   • Harris Ranch (80 mi / 1 hr from Kettleman) – Large steakhouse, deli and wine shop.  \n   • Grapevine / Tejon Pass (65 mi / 1 hr from Harris) – Decent rest-stop restaurants and views as you descend into Southern California.  \n   • Valencia / Santa Clarita (30 mi / 30 min from Grapevine) – Valencia Town Center for shops.  \n   • Los Angeles (35 mi / 40 min from Valencia)  \n\n—  \nTips:  \n• Plan fuel and rest stops in Big Sur — services are sparse.  \n• Book lodging early if traveling weekends or holidays (Big Sur, SLO, Santa Barbara are popular).  \n• Allow extra time for traffic, especially near Malibu, Santa Barbara, and LA.  \n\nEnjoy your trip! Let me know if you need more detail on any stop or lodging suggestions.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470989,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnXph5iAItZ049bKX3IMVRStv3NL",
  "model": "o4-mini-2025-04-16",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 1331,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 320,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 76,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 1407
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/o4-mini',
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
  "model": "openai/o4-mini",
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
Detective Mara Ellington crouched in the alley’s muted glow, rain dripping from her brimmed hat. The city’s midnight hush was deafening, broken only by distant sirens and the scurry of rats. She’d come to inspect the scene of a daring daylight burglary at the old Currier estate, expecting shattered glass and empty safes. Instead, on the damp cobblestones, she found a single porcelain doll’s head—its cheek chipped, one glass eye staring blankly at the moon.

Heat prickled her neck. No burglar would leave such a thing behind. She reached for it, careful of the spider-web crack snaking from its temple. The doll’s painted lips were twisted into an unnatural grin, and tucked beneath its chin was a scrap of yellowed paper, edges singed. Mara unfolded it, breath catching as she read the single word scrawled in crimson ink: “Found.”
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Detective Mara Ellington crouched in the alley’s muted glow, rain dripping from her brimmed hat. The city’s midnight hush was deafening, broken only by distant sirens and the scurry of rats. She’d come to inspect the scene of a daring daylight burglary at the old Currier estate, expecting shattered glass and empty safes. Instead, on the damp cobblestones, she found a single porcelain doll’s head—its cheek chipped, one glass eye staring blankly at the moon. \n\nHeat prickled her neck. No burglar would leave such a thing behind. She reached for it, careful of the spider-web crack snaking from its temple. The doll’s painted lips were twisted into an unnatural grin, and tucked beneath its chin was a scrap of yellowed paper, edges singed. Mara unfolded it, breath catching as she read the single word scrawled in crimson ink: “Found.”",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1776470989,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DVnXpXvTKSGQ5iGgAj5ky00Ve4KC2",
  "model": "o4-mini-2025-04-16",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 269,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 64,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 19,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 288
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/o4-mini',
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
  "model": "openai/o4-mini",
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
Recursion is a technique where a function (or routine) calls itself in order to break a problem down into smaller, more manageable pieces. Every recursive solution has two essential parts:

1. Base Case
    – A condition under which the function returns a result directly, without making any further recursive calls.
2. Recursive Case
    – The part of the function that calls itself with a smaller or simpler input, moving the overall problem toward the base case.

Simple Example: Computing Factorial

The factorial of a non-negative integer n (written n!) is the product of all positive integers up to n.
  – 0! is defined as 1 (this will be our base case).
  – For n > 0, n! = n × (n – 1)!

Here’s how you could write it in Python:

```
def factorial(n):
    # Base case
    if n == 0:
        return 1
    # Recursive case
    else:
        return n * factorial(n - 1)
```

How it works for factorial(4):
 1. factorial(4)
    → 4 * factorial(3)
 2. factorial(3)
    → 3 * factorial(2)
 3. factorial(2)
    → 2 * factorial(1)
 4. factorial(1)
    → 1 * factorial(0)
 5. factorial(0)
    → 1   (base case reached)

Then the calls “unwind”:
  – factorial(1) returns 1 × 1 = 1
  – factorial(2) returns 2 × 1 = 2
  – factorial(3) returns 3 × 2 = 6
  – factorial(4) returns 4 × 6 = 24

Key points to remember:
- Always define a clear base case, or the recursion will never stop.
- Each recursive call should make progress toward that base case (e.g. decreasing n by 1).
- Recursion is especially handy for problems that naturally split into similar subproblems (tree traversals, divide-and-conquer algorithms, combinatorial searches, etc.).
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
        "index": 0
      }
    ],
    "created": 1776470992,
    "id": "chatcmpl-DVnXsdpE8VJOrtvNaSXE4EEPhwEuq",
    "model": "o4-mini-2025-04-16",
    "obfuscation": "3Y9X9fW8",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": null
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Rec"
        },
        "finish_reason": null,
        "index": 0
      }
    ],
    "created": 1776470992,
    "id": "chatcmpl-DVnXsdpE8VJOrtvNaSXE4EEPhwEuq",
    "model": "o4-mini-2025-04-16",
    "obfuscation": "bNp9XsA",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": null
  },
  "... 470 more chunks omitted ...",
  {
    "choices": [],
    "created": 1776470992,
    "id": "chatcmpl-DVnXsdpE8VJOrtvNaSXE4EEPhwEuq",
    "model": "o4-mini-2025-04-16",
    "obfuscation": "EcvXn",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": {
      "completion_tokens": 680,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 192,
        "rejected_prediction_tokens": 0
      },
      "prompt_tokens": 16,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 0
      },
      "total_tokens": 696
    }
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting the model use OpenAI's built-in web search tool to answer with current information</summary>



```ts
const response = await env.AI.run(
  'openai/o4-mini',
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
  "model": "openai/o4-mini",
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
- On June 18, Cloudflare unveiled a new “Cloudflare One Design Partner” designation within its PowerUP Partner Program and introduced an AI-powered toolkit to streamline migrations to its Cloudflare One platform, helping organizations modernize legacy security architectures and accelerate adoption of secure access service edge (SASE) solutions; the initial cohort includes partners such as Arctiq, Consortium, CMT, Presidio, and The Missing Link ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai))

- On June 17, Cloudflare strengthened its AI agent ecosystem by open-sourcing Flue 1.0 Beta—an extensible framework for deploying production-grade AI agents—and expanding its Agents SDK with durable execution primitives, making it easier for developers to build, run, and maintain long-running AI-driven workflows on the edge ([spyingbee.com](https://spyingbee.com/updates/cloudflare/2026-06))

- Between June 16 and June 22, Cloudflare investigated and resolved a dashboard bug that caused paid invoices to appear as unpaid for customers; the issue, which affected payments made since June 11, was fully remediated by June 22 following identification of the root cause and deployment of a fix ([cloudflarestatus.com](https://www.cloudflarestatus.com/))
```

```json
{
  "id": "resp_0f41967bfc550c15016a399cbfa0ac819b80994a339b9c1547",
  "object": "response",
  "created_at": 1782160575,
  "model": "o4-mini-2025-04-16",
  "output": [
    {
      "id": "rs_0f41967bfc550c15016a399cc07a14819ba4e5122ca57d8119",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0f41967bfc550c15016a399cc2d864819bb451de59ff6791f5",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare news June 2026"
        ],
        "query": "Cloudflare news June 2026"
      }
    },
    {
      "id": "rs_0f41967bfc550c15016a399cc41770819b81de6f54fba4e7d8",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0f41967bfc550c15016a399cc57694819b89c557cbcb3db307",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare June 15 2026 press release Cloudflare Jun 2026",
          "site:cloudflare.com June 2026 Cloudflare news June 15 Jun 21"
        ],
        "query": "Cloudflare June 15 2026 press release Cloudflare Jun 2026"
      }
    },
    {
      "id": "rs_0f41967bfc550c15016a399cc7885c819b9c95fdeffec9914e",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0f41967bfc550c15016a399cc8b4f8819bb841eb34accab156",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare outage June 2026 Cloudflare service degraded"
        ],
        "query": "Cloudflare outage June 2026 Cloudflare service degraded"
      }
    },
    {
      "id": "rs_0f41967bfc550c15016a399ccc3b8c819ba4eb3d2bd8ece5f9",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0f41967bfc550c15016a399ccd17a4819bb264ac00b2e3351e",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Immerse Seattle Cloudflare June 18 2026"
        ],
        "query": "Immerse Seattle Cloudflare June 18 2026"
      }
    },
    {
      "id": "rs_0f41967bfc550c15016a399ccfab90819ba3ec10fb21ec44bb",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0f41967bfc550c15016a399cd1b3c8819b9d9e53b2bce8a04f",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.cloudflarestatus.com/"
      }
    },
    {
      "id": "rs_0f41967bfc550c15016a399cd2aeec819b9ff03483519c6a50",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0f41967bfc550c15016a399cd51788819bb3b37aaed05a1246",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://spyingbee.com/updates/cloudflare/2026-06"
      }
    },
    {
      "id": "rs_0f41967bfc550c15016a399cd66aa8819ba3f7172a1f2d2d5b",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "msg_0f41967bfc550c15016a399cdebf8c819ba14e3d49fcd5ec12",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [
            {
              "type": "url_citation",
              "end_index": 612,
              "start_index": 448,
              "title": "Cloudflare launches new partner initiative to support AI and SASE adoption",
              "url": "https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1009,
              "start_index": 942,
              "title": "Cloudflare: 153 product updates in June 2026 | Spyingbee",
              "url": "https://spyingbee.com/updates/cloudflare/2026-06"
            },
            {
              "type": "url_citation",
              "end_index": 1371,
              "start_index": 1312,
              "title": "Cloudflare Status",
              "url": "https://www.cloudflarestatus.com/"
            }
          ],
          "logprobs": [],
          "text": "- On June 18, Cloudflare unveiled a new “Cloudflare One Design Partner” designation within its PowerUP Partner Program and introduced an AI-powered toolkit to streamline migrations to its Cloudflare One platform, helping organizations modernize legacy security architectures and accelerate adoption of secure access service edge (SASE) solutions; the initial cohort includes partners such as Arctiq, Consortium, CMT, Presidio, and The Missing Link ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/cloudflare-launches-new-partner-initiative-to-support-ai-and-sase-adoption?utm_source=openai))  \n\n- On June 17, Cloudflare strengthened its AI agent ecosystem by open-sourcing Flue 1.0 Beta—an extensible framework for deploying production-grade AI agents—and expanding its Agents SDK with durable execution primitives, making it easier for developers to build, run, and maintain long-running AI-driven workflows on the edge ([spyingbee.com](https://spyingbee.com/updates/cloudflare/2026-06))  \n\n- Between June 16 and June 22, Cloudflare investigated and resolved a dashboard bug that caused paid invoices to appear as unpaid for customers; the issue, which affected payments made since June 11, was fully remediated by June 22 following identification of the root cause and deployment of a fix ([cloudflarestatus.com](https://www.cloudflarestatus.com/))"
        }
      ],
      "role": "assistant"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 29004,
    "output_tokens": 3661,
    "total_tokens": 32665,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 3200
    }
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1782160608,
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
    "context": "current_turn",
    "effort": "medium",
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/o4-mini/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/o4-mini/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/o4-mini/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/o4-mini/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/o4-mini/#page","headline":"o4-mini","description":"OpenAI's fast, lightweight reasoning model optimized for multi-step problem solving at lower cost.","url":"https://developers.cloudflare.com/ai/models/openai/o4-mini/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
