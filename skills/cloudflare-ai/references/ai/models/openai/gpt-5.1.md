---
description: GPT-5.1 is OpenAI’s incremental improvement over GPT-5, with stronger coding, reasoning, and writing.
title: GPT-5.1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-5.1

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-5.1/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-5.1`

- Third-party
- Zero data retention

GPT-5.1 is OpenAI’s incremental improvement over GPT-5, with stronger coding, reasoning, and writing.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 128,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.25</li><li>Output (per 1M tokens)$10.00</li><li>Cached input (per 1M tokens)$0.125</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-5.1',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.1",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The three classical laws of thermodynamics (often listed as 0th–3rd, but you asked for three) are:

**First Law (Conservation of Energy)**
Energy cannot be created or destroyed, only transformed from one form to another.
Mathematically for a system:
\[
\Delta U = Q - W
\]
where ΔU is change in internal energy, Q is heat added to the system, and W is work done by the system.

**Second Law (Direction of Processes / Entropy)**
The total entropy of an isolated system never decreases; it either increases or, in an ideal reversible process, stays constant.
This implies:
- Heat flows spontaneously from hot to cold, not the reverse.
- No heat engine can be 100% efficient.

**Third Law (Absolute Zero and Entropy)**
As the temperature of a perfect crystalline substance approaches absolute zero (0 K), its entropy approaches a minimum value (often taken as zero).
Consequence: It is impossible, by any finite number of steps, to cool a system all the way to absolute zero.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "The three classical laws of thermodynamics (often listed as 0th–3rd, but you asked for three) are:\n\n**First Law (Conservation of Energy)**  \nEnergy cannot be created or destroyed, only transformed from one form to another.  \nMathematically for a system:  \n\\[\n\\Delta U = Q - W\n\\]  \nwhere ΔU is change in internal energy, Q is heat added to the system, and W is work done by the system.\n\n**Second Law (Direction of Processes / Entropy)**  \nThe total entropy of an isolated system never decreases; it either increases or, in an ideal reversible process, stays constant.  \nThis implies:\n- Heat flows spontaneously from hot to cold, not the reverse.\n- No heat engine can be 100% efficient.\n\n**Third Law (Absolute Zero and Entropy)**  \nAs the temperature of a perfect crystalline substance approaches absolute zero (0 K), its entropy approaches a minimum value (often taken as zero).  \nConsequence: It is impossible, by any finite number of steps, to cool a system all the way to absolute zero.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319793,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMDjkjm2G9LOk72IMGhbyvdpRFX",
  "model": "gpt-5.1-2025-11-13",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 236,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 15,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 251
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5.1',
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
  "model": "openai/gpt-5.1",
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
To read a JSON file in Python, use the built-in `json` module.

### Basic example

```python
import json

# Path to your JSON file
file_path = "data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
print(type(data))  # usually dict or list
```

- `json.load(f)` reads JSON from an open file object.
- The result is usually a Python `dict` (for JSON objects) or `list` (for JSON arrays).

### If you have JSON as a string

```python
import json

json_str = '{"name": "Alice", "age": 30}'
data = json.loads(json_str)  # note the "s" at the end
```

If you show me a sample of your JSON file, I can suggest the exact code to access its fields.
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "To read a JSON file in Python, use the built-in `json` module.\n\n### Basic example\n\n```python\nimport json\n\n# Path to your JSON file\nfile_path = \"data.json\"\n\nwith open(file_path, \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\nprint(type(data))  # usually dict or list\n```\n\n- `json.load(f)` reads JSON from an open file object.\n- The result is usually a Python `dict` (for JSON objects) or `list` (for JSON arrays).\n\n### If you have JSON as a string\n\n```python\nimport json\n\njson_str = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_str)  # note the \"s\" at the end\n```\n\nIf you show me a sample of your JSON file, I can suggest the exact code to access its fields.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319793,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMDAa1J4qoS42vzFJjxeGGOfqiW",
  "model": "gpt-5.1-2025-11-13",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 200,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 30,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 230
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5.1',
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
  "model": "openai/gpt-5.1",
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
Here are two main route options with good stops between San Francisco and Los Angeles. You can mix and match depending on your time.

---

## 1. Scenic Coastal Route (Highway 1 / Pacific Coast Highway)

Best if you have at least 1.5–2 days and want views and small towns.

### Between SF and Monterey / Carmel
- **Half Moon Bay**
  - Quick stop: Harbor, coastal bluffs, coffee on Main St.
- **Pescadero**
  - Tiny town, great sandwiches and baked goods at Arcangeli Grocery.
  - Pigeon Point Lighthouse viewpoint nearby.

### Monterey & Carmel-by-the-Sea
- **Monterey**
  - Cannery Row & Old Fisherman’s Wharf (touristy but atmospheric).
  - Monterey Bay Aquarium (needs 2–3 hours minimum).
- **17-Mile Drive** (between Pacific Grove & Carmel)
  - Paid scenic drive with coastal lookouts, Lone Cypress, golf course views.
- **Carmel-by-the-Sea**
  - Walkable village, art galleries, Carmel Beach at sunset.

### Big Sur Area (spectacular coastline)
Plan extra time between Carmel and Ragged Point.

- **Bixby Creek Bridge**
  - Iconic photo stop; small turnouts on either side.
- **Pfeiffer Beach**
  - Known for purple-ish sand and rock arch (watch for narrow access road).
- **Julia Pfeiffer Burns State Park / McWay Falls**
  - Short walk to a viewpoint of a waterfall onto the beach.
- **Nepenthe**
  - Restaurant with incredible views; good for a snack or drink.
- **Ragged Point**
  - Scenic overlook, café, restrooms; last dramatic cliff views heading south.

### San Simeon to Pismo Beach
- **Hearst Castle (San Simeon)**
  - Mansion tours on a hill with ocean views (reserve ahead if possible).
- **Elephant Seal Vista Point (Piedras Blancas)**
  - Large colony of elephant seals right off the road.
- **Cambria**
  - Cute town, Moonstone Beach boardwalk, wine tasting.
- **Morro Bay**
  - Harbor town with Morro Rock; good lunch spot on the water.
- **Pismo Beach**
  - Classic beach town; pier, dunes, clam chowder (e.g., Splash Café).

### Central Coast to LA
- **San Luis Obispo (SLO)**
  - Lively college town; great for dinner or an overnight.
- **Solvang**
  - Danish-style village with bakeries and windmills.
- **Santa Barbara**
  - Beachfront, Stearns Wharf, State Street shops and restaurants.
- **Malibu**
  - Coastal pullouts, Zuma Beach, Malibu Pier (cafés, views).
- Continue along PCH into **Santa Monica** and **LA**.

---

## 2. Faster Inland Route (US-101 or I-5)

Best if you want to get there quicker but still have a couple of interesting stops.

### Via US-101 (balanced speed + scenery)
- **Gilroy** – Outlet shopping; garlic-themed everything.
- **Paso Robles** – Wine country; nice downtown square and tasting rooms.
- Then connect back to the coast near **San Luis Obispo** and follow the SLO → Santa Barbara → Malibu stops above.

### Via I-5 (fastest, most direct)
More utilitarian, but:

- **Harris Ranch (Coalinga)** – Big steakhouse, hotel, and rest stop.
- **Tejon Pass / Fort Tejon** – Mountain views as you cross into SoCal.

---

## Quick Templates Depending on Time

- **1 long day, some scenery:**
  SF → Monterey lunch → Bixby Bridge / McWay Falls stops → San Simeon seals → SLO dinner → LA.

- **2 days, overnight on Central Coast:**
  Day 1: SF → Half Moon Bay → Monterey → Big Sur sights → overnight in Cambria or SLO.
  Day 2: SLO → Pismo → Santa Barbara (lunch / explore) → Malibu → LA.

If you tell me:
- which month you’re going,
- how many days you have,
- whether you care more about food, hikes, beaches, or towns,

I can turn this into a specific, timed itinerary with suggested departure times and where to stay.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Here are two main route options with good stops between San Francisco and Los Angeles. You can mix and match depending on your time.\n\n---\n\n## 1. Scenic Coastal Route (Highway 1 / Pacific Coast Highway)\n\nBest if you have at least 1.5–2 days and want views and small towns.\n\n### Between SF and Monterey / Carmel\n- **Half Moon Bay**  \n  - Quick stop: Harbor, coastal bluffs, coffee on Main St.\n- **Pescadero**  \n  - Tiny town, great sandwiches and baked goods at Arcangeli Grocery.\n  - Pigeon Point Lighthouse viewpoint nearby.\n\n### Monterey & Carmel-by-the-Sea\n- **Monterey**  \n  - Cannery Row & Old Fisherman’s Wharf (touristy but atmospheric).  \n  - Monterey Bay Aquarium (needs 2–3 hours minimum).\n- **17-Mile Drive** (between Pacific Grove & Carmel)  \n  - Paid scenic drive with coastal lookouts, Lone Cypress, golf course views.\n- **Carmel-by-the-Sea**  \n  - Walkable village, art galleries, Carmel Beach at sunset.\n\n### Big Sur Area (spectacular coastline)\nPlan extra time between Carmel and Ragged Point.\n\n- **Bixby Creek Bridge**  \n  - Iconic photo stop; small turnouts on either side.\n- **Pfeiffer Beach**  \n  - Known for purple-ish sand and rock arch (watch for narrow access road).\n- **Julia Pfeiffer Burns State Park / McWay Falls**  \n  - Short walk to a viewpoint of a waterfall onto the beach.\n- **Nepenthe**  \n  - Restaurant with incredible views; good for a snack or drink.\n- **Ragged Point**  \n  - Scenic overlook, café, restrooms; last dramatic cliff views heading south.\n\n### San Simeon to Pismo Beach\n- **Hearst Castle (San Simeon)**  \n  - Mansion tours on a hill with ocean views (reserve ahead if possible).\n- **Elephant Seal Vista Point (Piedras Blancas)**  \n  - Large colony of elephant seals right off the road.\n- **Cambria**  \n  - Cute town, Moonstone Beach boardwalk, wine tasting.\n- **Morro Bay**  \n  - Harbor town with Morro Rock; good lunch spot on the water.\n- **Pismo Beach**  \n  - Classic beach town; pier, dunes, clam chowder (e.g., Splash Café).\n\n### Central Coast to LA\n- **San Luis Obispo (SLO)**  \n  - Lively college town; great for dinner or an overnight.\n- **Solvang**  \n  - Danish-style village with bakeries and windmills.\n- **Santa Barbara**  \n  - Beachfront, Stearns Wharf, State Street shops and restaurants.\n- **Malibu**  \n  - Coastal pullouts, Zuma Beach, Malibu Pier (cafés, views).\n- Continue along PCH into **Santa Monica** and **LA**.\n\n---\n\n## 2. Faster Inland Route (US-101 or I-5)\n\nBest if you want to get there quicker but still have a couple of interesting stops.\n\n### Via US-101 (balanced speed + scenery)\n- **Gilroy** – Outlet shopping; garlic-themed everything.  \n- **Paso Robles** – Wine country; nice downtown square and tasting rooms.  \n- Then connect back to the coast near **San Luis Obispo** and follow the SLO → Santa Barbara → Malibu stops above.\n\n### Via I-5 (fastest, most direct)\nMore utilitarian, but:\n\n- **Harris Ranch (Coalinga)** – Big steakhouse, hotel, and rest stop.  \n- **Tejon Pass / Fort Tejon** – Mountain views as you cross into SoCal.\n\n---\n\n## Quick Templates Depending on Time\n\n- **1 long day, some scenery:**  \n  SF → Monterey lunch → Bixby Bridge / McWay Falls stops → San Simeon seals → SLO dinner → LA.\n\n- **2 days, overnight on Central Coast:**  \n  Day 1: SF → Half Moon Bay → Monterey → Big Sur sights → overnight in Cambria or SLO.  \n  Day 2: SLO → Pismo → Santa Barbara (lunch / explore) → Malibu → LA.\n\nIf you tell me:\n- which month you’re going,\n- how many days you have,\n- whether you care more about food, hikes, beaches, or towns,\n\nI can turn this into a specific, timed itinerary with suggested departure times and where to stay.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319796,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMGeXlDsasqazbxN8E8725SP8Co",
  "model": "gpt-5.1-2025-11-13",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 945,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 76,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 1021
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5.1',
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
  "model": "openai/gpt-5.1",
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
The rain had turned Ashford Lane into a smear of reflections—red tail-lights, yellow windows, blue police strobes bleeding into the black river of asphalt. Detective Mara Leland hunched her shoulders against the weather and ducked under the sagging strip of crime-scene tape, the plastic snapping against her coat like impatient fingers.

The alley smelled of wet cardboard and old grease. Uniforms stood around in the practiced way of people trying not to look curious: hands tucked, mouths tight, eyes everywhere. The body lay where it had dropped beside the overflowing dumpster, face turned toward the brick wall as if listening to it.

“Male, mid-thirties,” the medical examiner said, barely glancing up as Mara approached. “Blunt force trauma, back of the head. Wallet’s missing. So is his phone.” He nodded toward the glistening puddles. “If there was anything else on him, the rain’s not doing us favors.”

Mara crouched, the cold water seeping through the knees of her slacks. The victim’s suit was inexpensive but clean, his tie knotted with deliberate care. No wedding ring. The bruise at the base of his skull was already swelling beneath the wet shine of his hair.

Robbery gone bad, the scene wanted her to think. It almost worked.

Then she saw his hand.

His right fist was clenched tight, the knuckles scraped, as if he’d hit something before he went down—or tried to hold on to it. Mara waited for the tech to finish with his photos, then slid on a fresh pair of gloves.

“Let’s see what you didn’t want to give up,” she murmured.

She pried his fingers open, one by stiffening one. It took effort; the chill had already started to set the muscles. Inside his palm, slick with rainwater and blood, lay a small paper rectangle, folded twice, the edges softened but the center still stiff.

Not a photograph. Not cash. Not a receipt.

A library card.

The laminate was cracked down one side, the blue logo of the Ashford Public Library almost worn away. The name typed beneath it, though, was unmistakable.

“Is that his?” one of the uniforms asked.

Mara shook her head slowly. “No.”

The card was ten years expired.

And it had her own name on it.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "The rain had turned Ashford Lane into a smear of reflections—red tail-lights, yellow windows, blue police strobes bleeding into the black river of asphalt. Detective Mara Leland hunched her shoulders against the weather and ducked under the sagging strip of crime-scene tape, the plastic snapping against her coat like impatient fingers.\n\nThe alley smelled of wet cardboard and old grease. Uniforms stood around in the practiced way of people trying not to look curious: hands tucked, mouths tight, eyes everywhere. The body lay where it had dropped beside the overflowing dumpster, face turned toward the brick wall as if listening to it.\n\n“Male, mid-thirties,” the medical examiner said, barely glancing up as Mara approached. “Blunt force trauma, back of the head. Wallet’s missing. So is his phone.” He nodded toward the glistening puddles. “If there was anything else on him, the rain’s not doing us favors.”\n\nMara crouched, the cold water seeping through the knees of her slacks. The victim’s suit was inexpensive but clean, his tie knotted with deliberate care. No wedding ring. The bruise at the base of his skull was already swelling beneath the wet shine of his hair.\n\nRobbery gone bad, the scene wanted her to think. It almost worked.\n\nThen she saw his hand.\n\nHis right fist was clenched tight, the knuckles scraped, as if he’d hit something before he went down—or tried to hold on to it. Mara waited for the tech to finish with his photos, then slid on a fresh pair of gloves.\n\n“Let’s see what you didn’t want to give up,” she murmured.\n\nShe pried his fingers open, one by stiffening one. It took effort; the chill had already started to set the muscles. Inside his palm, slick with rainwater and blood, lay a small paper rectangle, folded twice, the edges softened but the center still stiff.\n\nNot a photograph. Not cash. Not a receipt.\n\nA library card.\n\nThe laminate was cracked down one side, the blue logo of the Ashford Public Library almost worn away. The name typed beneath it, though, was unmistakable.\n\n“Is that his?” one of the uniforms asked.\n\nMara shook her head slowly. “No.”\n\nThe card was ten years expired.\n\nAnd it had her own name on it.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319796,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMG1m127ZSVVIdInH24b5KfjU9n",
  "model": "gpt-5.1-2025-11-13",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 493,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 19,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 512
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5.1',
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
  "model": "openai/gpt-5.1",
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
Recursion is when a function solves a problem by calling **itself**, each time working on a **smaller or simpler** version of the original problem, until it reaches a **base case** where it stops.

Two key ideas:
1. **Base case** – when to stop.
2. **Recursive step** – how the function calls itself with a simpler input.

### Simple example: Factorial

The factorial of a number `n` (written `n!`) is:
- `5! = 5 × 4 × 3 × 2 × 1 = 120`
- `1! = 1`
- By definition, `0! = 1`

We can define factorial recursively:
- Base case:
  If `n = 0`, return `1`.
- Recursive step:
  If `n > 0`, return `n × factorial(n - 1)`.

In (pseudo)code:

```python
def factorial(n):
    if n == 0:          # base case
        return 1
    else:               # recursive step
        return n * factorial(n - 1)
```

How `factorial(3)` works:
- `factorial(3)`
  = `3 * factorial(2)`
- `factorial(2)`
  = `2 * factorial(1)`
- `factorial(1)`
  = `1 * factorial(0)`
- `factorial(0)`
  = `1`  (base case)

Now substitute back:
- `factorial(1) = 1 * 1 = 1`
- `factorial(2) = 2 * 1 = 2`
- `factorial(3) = 3 * 2 = 6`

That chain of a function calling itself with smaller inputs is recursion.
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
    "created": 1777319805,
    "id": "chatcmpl-DZMMPsL6Uzmm6d7HUyXvVCrMVjr9E",
    "model": "gpt-5.1-2025-11-13",
    "obfuscation": "NplkcVf5",
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
    "created": 1777319805,
    "id": "chatcmpl-DZMMPsL6Uzmm6d7HUyXvVCrMVjr9E",
    "model": "gpt-5.1-2025-11-13",
    "obfuscation": "QL5wyvK",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": null
  },
  "... 384 more chunks omitted ...",
  {
    "choices": [],
    "created": 1777319805,
    "id": "chatcmpl-DZMMPsL6Uzmm6d7HUyXvVCrMVjr9E",
    "model": "gpt-5.1-2025-11-13",
    "obfuscation": "PuXlssc",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": null,
    "usage": {
      "completion_tokens": 393,
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
      "total_tokens": 409
    }
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting the model use OpenAI's built-in web search tool to answer with current information</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-5.1',
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
  "model": "openai/gpt-5.1",
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
Here are the three main Cloudflare storylines that dominated coverage over roughly the past week (June 16–22, 2026):

- **Ongoing reaction to the VoidZero acquisition (June 4):** Analysts and developers are still digesting Cloudflare’s purchase of AI security startup VoidZero, with coverage focusing on how the deal strengthens Cloudflare’s AI-native security and edge platform strategy and its competition with hyperscalers in AI infrastructure. ([cloudflare.com](https://www.cloudflare.com/press/?utm_source=openai))

- **Cloudflare’s role in recent/ongoing Internet reliability discussions:** In light of major Cloudflare outages over the last year, technical blogs and communities continue to scrutinize Cloudflare’s status communications and resilience; a fresh Reddit discussion this week debated timestamp handling and transparency on Cloudflare’s status page during a recent network-impacting incident linked to a major US fiber cut. ([reddit.com](https://www.reddit.com/r/sysadmin/comments/1ucmhpy/cloudflares_outage_and_the_ethics_of_fudging/?utm_source=openai))

- **Continued build‑out of Cloudflare’s AI/agent platform stack:** Coverage from developer press highlights Cloudflare’s recent completion of a six‑layer “agent infrastructure” stack—especially the rebuilt Browser Run service on its Containers platform—framing Cloudflare as a key infrastructure provider for AI agents and automation workloads. ([infoq.com](https://www.infoq.com/news/2026/05/cloudflare-agent-platform-stack/?utm_source=openai))
```

```json
{
  "id": "resp_0f23d628b8934486016a3995086314819bbe0601a8ca62d55b",
  "object": "response",
  "created_at": 1782158600,
  "model": "gpt-5.1-2025-11-13",
  "output": [
    {
      "id": "ws_0f23d628b8934486016a399508e1ac819ba2a6f8c5c5eafc3e",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare news past 7 days"
        ],
        "query": "Cloudflare news past 7 days"
      }
    },
    {
      "id": "msg_0f23d628b8934486016a39950a3540819b9680a2736261c217",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [
            {
              "type": "url_citation",
              "end_index": 519,
              "start_index": 448,
              "title": "Press Overview | Cloudflare",
              "url": "https://www.cloudflare.com/press/?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1075,
              "start_index": 945,
              "title": "Cloudflare's outage and the ethics of fudging status page timestamps",
              "url": "https://www.reddit.com/r/sysadmin/comments/1ucmhpy/cloudflares_outage_and_the_ethics_of_fudging/?utm_source=openai"
            },
            {
              "type": "url_citation",
              "end_index": 1524,
              "start_index": 1424,
              "title": "Cloudflare Completes Its Agent Infrastructure Stack with Browser Run Rebuild and Six-Layer Platform - InfoQ",
              "url": "https://www.infoq.com/news/2026/05/cloudflare-agent-platform-stack/?utm_source=openai"
            }
          ],
          "logprobs": [],
          "text": "Here are the three main Cloudflare storylines that dominated coverage over roughly the past week (June 16–22, 2026):\n\n- **Ongoing reaction to the VoidZero acquisition (June 4):** Analysts and developers are still digesting Cloudflare’s purchase of AI security startup VoidZero, with coverage focusing on how the deal strengthens Cloudflare’s AI-native security and edge platform strategy and its competition with hyperscalers in AI infrastructure. ([cloudflare.com](https://www.cloudflare.com/press/?utm_source=openai))  \n\n- **Cloudflare’s role in recent/ongoing Internet reliability discussions:** In light of major Cloudflare outages over the last year, technical blogs and communities continue to scrutinize Cloudflare’s status communications and resilience; a fresh Reddit discussion this week debated timestamp handling and transparency on Cloudflare’s status page during a recent network-impacting incident linked to a major US fiber cut. ([reddit.com](https://www.reddit.com/r/sysadmin/comments/1ucmhpy/cloudflares_outage_and_the_ethics_of_fudging/?utm_source=openai))  \n\n- **Continued build‑out of Cloudflare’s AI/agent platform stack:** Coverage from developer press highlights Cloudflare’s recent completion of a six‑layer “agent infrastructure” stack—especially the rebuilt Browser Run service on its Containers platform—framing Cloudflare as a key infrastructure provider for AI agents and automation workloads. ([infoq.com](https://www.infoq.com/news/2026/05/cloudflare-agent-platform-stack/?utm_source=openai))"
        }
      ],
      "role": "assistant"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 10740,
    "output_tokens": 336,
    "total_tokens": 11076,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 32
    }
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1782158605,
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
    "effort": "none",
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-5.1/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-5.1/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-5.1/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-5.1/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5.1/#page","headline":"GPT-5.1","description":"GPT-5.1 is OpenAI’s incremental improvement over GPT-5, with stronger coding, reasoning, and writing.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5.1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
