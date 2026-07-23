---
description: xAI's Grok 4.20 non-reasoning model. Skips the thinking trace for fast, single-pass responses while keeping the same training as the reasoning variant.
title: Grok 4.20 Non-Reasoning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok 4.20 Non-Reasoning

Text Generation • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-4.20-0309-non-reasoning/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-4.20-0309-non-reasoning`

* Third-party

xAI's Grok 4.20 non-reasoning model. Skips the thinking trace for fast, single-pass responses while keeping the same training as the reasoning variant.

| Model Info                                                                 |                                                                                                                                    |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 2,000,000 tokens                                                                                                                   |
| Terms and License                                                          | [link ↗](https://x.ai/legal/terms-of-service)                                                                                      |
| More information                                                           | [link ↗](https://x.ai/)                                                                                                            |
| Request formats                                                            | Chat Completions                                                                                                                   |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-4.20-0309-non-reasoning) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-non-reasoning',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.20-0309-non-reasoning",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

**The Three Laws of Thermodynamics** (in their most common, concise form):

### **Zeroth Law of Thermodynamics** (often called the "zeroth" because it logically precedes the others)
> If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.

This is the basis for the concept of **temperature** — it allows us to define a universal temperature scale.

### **First Law of Thermodynamics**
> Energy cannot be created or destroyed, only converted from one form to another.

Mathematically:
**ΔU = Q − W**
(where ΔU is the change in internal energy, Q is heat added to the system, and W is work done *by* the system)

This is essentially the **law of conservation of energy** applied to thermodynamic systems.

### **Second Law of Thermodynamics**
> The entropy of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat flows spontaneously from hot to cold, never the reverse.

Common statements:
- "The entropy of the universe tends to a maximum."
- "It is impossible to construct a heat engine that is 100% efficient."

This law introduces the concept of **irreversibility** and the **arrow of time**.

---

### Bonus: The **Third Law of Thermodynamics** (Nernst Heat Theorem)
> As the temperature of a system approaches absolute zero (0 K), the entropy of a perfect crystal approaches a minimum (usually zero).

This implies it's impossible to reach absolute zero in a finite number of steps.

---

**Summary (popular phrasing):**
1. **Zeroth**: Temperature exists.
2. **First**: You can't win (energy is conserved).
3. **Second**: You can't break even (entropy always increases).
4. **Third**: You can't even quit the game (absolute zero is unreachable).

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "**The Three Laws of Thermodynamics** (in their most common, concise form):\n\n### **Zeroth Law of Thermodynamics** (often called the \"zeroth\" because it logically precedes the others)\n> If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.\n\nThis is the basis for the concept of **temperature** — it allows us to define a universal temperature scale.\n\n### **First Law of Thermodynamics**\n> Energy cannot be created or destroyed, only converted from one form to another.\n\nMathematically:  \n**ΔU = Q − W**  \n(where ΔU is the change in internal energy, Q is heat added to the system, and W is work done *by* the system)\n\nThis is essentially the **law of conservation of energy** applied to thermodynamic systems.\n\n### **Second Law of Thermodynamics**\n> The entropy of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat flows spontaneously from hot to cold, never the reverse.\n\nCommon statements:\n- \"The entropy of the universe tends to a maximum.\"\n- \"It is impossible to construct a heat engine that is 100% efficient.\"\n\nThis law introduces the concept of **irreversibility** and the **arrow of time**.\n\n---\n\n### Bonus: The **Third Law of Thermodynamics** (Nernst Heat Theorem)\n> As the temperature of a system approaches absolute zero (0 K), the entropy of a perfect crystal approaches a minimum (usually zero).\n\nThis implies it's impossible to reach absolute zero in a finite number of steps.\n\n---\n\n**Summary (popular phrasing):**\n1. **Zeroth**: Temperature exists.\n2. **First**: You can't win (energy is conserved).\n3. **Second**: You can't break even (entropy always increases).\n4. **Third**: You can't even quit the game (absolute zero is unreachable).",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675694,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "ad22f976-34a4-e1f2-5d44-2c6b9c2fb9e5",
  "model": "grok-4.20-0309-non-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_bdeb03b7cd",
  "usage": {
    "completion_tokens": 378,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 10403000,
    "num_sources_used": 0,
    "prompt_tokens": 130,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 130
    },
    "total_tokens": 508
  }
}
```

## Examples

**With System Message** — Using a system message to set context

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-non-reasoning',
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
  "model": "xai/grok-4.20-0309-non-reasoning",
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

**Reading a JSON file in Python** is very straightforward using the built-in `json` module.

### 1. Basic Method (Recommended)

```python
import json
from pathlib import Path

# Method 1: Using pathlib (modern and clean)
def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

# Usage
data = read_json_file('data.json')
print(data)
```

### 2. Most Common Patterns

```python
import json

# Option 1: Using pathlib (Recommended)
data = json.loads(Path('data.json').read_text(encoding='utf-8'))

# Option 2: Traditional way
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Option 3: One-liner
data = json.load(open('data.json', encoding='utf-8'))
```

### 3. Complete Example with Error Handling

```python
import json
from pathlib import Path
from typing import Any

def read_json(file_path: str | Path) -> Any:
    """Safely read a JSON file with proper error handling."""
    try:
        path = Path(file_path)
        with open(path, 'r', encoding='utf-8') as file:
            return json.load(file)

    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{file_path}': {e}")
        return None
    except Exception as e:
        print(f"Unexpected error reading '{file_path}': {e}")
        return None


# Usage examples:
data = read_json('config.json')
data = read_json(Path('data/settings.json'))

# Access the data
if data:
    print(data.get('name'))
    print(data['users'][0]['email'])
```

### Key Points:

- Use `json.load()` when reading from a **file object**
- Use `json.loads()` when reading from a **string**
- Always specify `encoding='utf-8'` (best practice)
- Use `pathlib.Path` for modern Python code
- Always handle potential `JSONDecodeError` and `FileNotFoundError`

Would you like to see how to also **write** JSON files or work with specific JSON structures (like configurations, lists of objects, etc.)?

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "**Reading a JSON file in Python** is very straightforward using the built-in `json` module.\n\n### 1. Basic Method (Recommended)\n\n```python\nimport json\nfrom pathlib import Path\n\n# Method 1: Using pathlib (modern and clean)\ndef read_json_file(file_path):\n    with open(file_path, 'r', encoding='utf-8') as file:\n        data = json.load(file)\n    return data\n\n# Usage\ndata = read_json_file('data.json')\nprint(data)\n```\n\n### 2. Most Common Patterns\n\n```python\nimport json\n\n# Option 1: Using pathlib (Recommended)\ndata = json.loads(Path('data.json').read_text(encoding='utf-8'))\n\n# Option 2: Traditional way\nwith open('data.json', 'r', encoding='utf-8') as f:\n    data = json.load(f)\n\n# Option 3: One-liner\ndata = json.load(open('data.json', encoding='utf-8'))\n```\n\n### 3. Complete Example with Error Handling\n\n```python\nimport json\nfrom pathlib import Path\nfrom typing import Any\n\ndef read_json(file_path: str | Path) -> Any:\n    \"\"\"Safely read a JSON file with proper error handling.\"\"\"\n    try:\n        path = Path(file_path)\n        with open(path, 'r', encoding='utf-8') as file:\n            return json.load(file)\n            \n    except FileNotFoundError:\n        print(f\"Error: File '{file_path}' not found.\")\n        return None\n    except json.JSONDecodeError as e:\n        print(f\"Error: Invalid JSON in '{file_path}': {e}\")\n        return None\n    except Exception as e:\n        print(f\"Unexpected error reading '{file_path}': {e}\")\n        return None\n\n\n# Usage examples:\ndata = read_json('config.json')\ndata = read_json(Path('data/settings.json'))\n\n# Access the data\nif data:\n    print(data.get('name'))\n    print(data['users'][0]['email'])\n```\n\n### Key Points:\n\n- Use `json.load()` when reading from a **file object**\n- Use `json.loads()` when reading from a **string**\n- Always specify `encoding='utf-8'` (best practice)\n- Use `pathlib.Path` for modern Python code\n- Always handle potential `JSONDecodeError` and `FileNotFoundError`\n\nWould you like to see how to also **write** JSON files or work with specific JSON structures (like configurations, lists of objects, etc.)?",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675694,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "90c95869-a6c3-9a03-95d1-32f6a41a14ca",
  "model": "grok-4.20-0309-non-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_bdeb03b7cd",
  "usage": {
    "completion_tokens": 521,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 14165500,
    "num_sources_used": 0,
    "prompt_tokens": 145,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 145
    },
    "total_tokens": 666
  }
}
```

**Multi-turn Conversation** — Continuing a conversation with context

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-non-reasoning',
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
  "model": "xai/grok-4.20-0309-non-reasoning",
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

Here are some excellent stops along (or just off) the main routes from San Francisco to Los Angeles. I’ve grouped them roughly in north-to-south order so you can slot them into your itinerary easily.

### Classic Coastal Route (Highway 1 / Pacific Coast Highway)
This is the most scenic option and the one most people picture when they say “road trip from SF to LA.”

1. **Half Moon Bay** (≈ 30 min south of SF)
   - Cute coastal town with beaches, tide pools, and the famous “Pumpkin Festival” in October. Great for a quick coffee or beach walk.

2. **Pescadero & Año Nuevo State Park** (≈ 1 hr from SF)
   - Stop at **Duarte’s Tavern** for artichoke soup and pie. Año Nuevo has elephant seals (best Dec–March).

3. **Santa Cruz** (≈ 1.5 hrs from SF)
   - Beach Boardwalk, redwood hikes in Henry Cowell Redwoods, or the famous surf at Pleasure Point. Good food scene.

4. **Monterey & Pacific Grove** (≈ 2 hrs from SF)
   - Cannery Row, Monterey Bay Aquarium (book ahead), 17-Mile Drive, and the monarch butterfly sanctuary in Pacific Grove (Oct–Feb).

5. **Big Sur** (≈ 3–4 hrs from SF – the heart of the drive)
   - **Bixby Bridge** photo stop
   - **Point Sur Lighthouse** (tours available)
   - **Julia Pfeiffer Burns State Park** – McWay Falls (waterfall onto the beach)
   - **Pfeiffer Beach** – purple sand and keyhole rock
   - **Nepenthe** or **Big Sur Bakery** for lunch with a view
   - **Ventana Big Sur** or **Post Ranch Inn** if you want an upscale overnight.

6. **Cambria / Hearst Castle** (≈ 5–6 hrs from SF)
   - Tour the famous Hearst Castle (reservations required).
   - Moonstone Beach boardwalk for sunset.

7. **San Luis Obispo (SLO)** (≈ 6.5 hrs from SF)
   - Bubblegum Alley, great farm-to-table food, and a lively downtown.

8. **Pismo Beach**
   - Classic California beach town with sand dunes you can drive on (ATV tours available).

9. **Solvang** (short detour)
   - Danish-themed village with windmills, bakeries, and Æbleskiver pancakes. Fun for 1–2 hours.

10. **Santa Barbara** (≈ 8–9 hrs from SF if you linger)
    - “American Riviera.” State Street for shopping, Mission Santa Barbara, beaches, and wine tasting in the Funk Zone.

11. **Malibu** (final stretch before LA)
    - Point Dume, El Matador Beach, or a sunset dinner at Malibu Pier.

### Inland / Faster Route Highlights (I-5 corridor)
If you’re short on time but still want stops:

- **Gilroy** – “Garlic Capital of the World” (garlic ice cream if you’re brave).
- **Pacheco Pass** → **San Luis Reservoir** for dramatic views.
- **Harris Ranch** – iconic Central Valley steakhouse stop.
- **Bakersfield** – for Basque food or country-music vibes.
- **Tejon Pass / Magic Mountain** – quick amusement-park option.

### Suggested Itineraries

**Scenic 2-Day Trip (most popular)**
Day 1: SF → Big Sur (overnight in Big Sur or Cambria)
Day 2: Big Sur → Santa Barbara → LA

**3-Day Leisure Trip**
Day 1: SF → Monterey / Carmel (overnight)
Day 2: Monterey → Cambria / Hearst Castle → SLO (overnight)
Day 3: SLO → Santa Barbara → Malibu → LA

Would you like me to:
- Build a day-by-day itinerary with driving times and restaurant recommendations?
- Focus on specific interests (hiking, food, photography, wine, budget, luxury, etc.)?
- Include where to stay or current road conditions / permit info for Big Sur?

Just let me know your preferences (how many days, budget level, must-see activities, etc.) and I’ll tailor it further!

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Here are some excellent stops along (or just off) the main routes from San Francisco to Los Angeles. I’ve grouped them roughly in north-to-south order so you can slot them into your itinerary easily.\n\n### Classic Coastal Route (Highway 1 / Pacific Coast Highway)\nThis is the most scenic option and the one most people picture when they say “road trip from SF to LA.”\n\n1. **Half Moon Bay** (≈ 30 min south of SF)  \n   - Cute coastal town with beaches, tide pools, and the famous “Pumpkin Festival” in October. Great for a quick coffee or beach walk.\n\n2. **Pescadero & Año Nuevo State Park** (≈ 1 hr from SF)  \n   - Stop at **Duarte’s Tavern** for artichoke soup and pie. Año Nuevo has elephant seals (best Dec–March).\n\n3. **Santa Cruz** (≈ 1.5 hrs from SF)  \n   - Beach Boardwalk, redwood hikes in Henry Cowell Redwoods, or the famous surf at Pleasure Point. Good food scene.\n\n4. **Monterey & Pacific Grove** (≈ 2 hrs from SF)  \n   - Cannery Row, Monterey Bay Aquarium (book ahead), 17-Mile Drive, and the monarch butterfly sanctuary in Pacific Grove (Oct–Feb).\n\n5. **Big Sur** (≈ 3–4 hrs from SF – the heart of the drive)  \n   - **Bixby Bridge** photo stop  \n   - **Point Sur Lighthouse** (tours available)  \n   - **Julia Pfeiffer Burns State Park** – McWay Falls (waterfall onto the beach)  \n   - **Pfeiffer Beach** – purple sand and keyhole rock  \n   - **Nepenthe** or **Big Sur Bakery** for lunch with a view  \n   - **Ventana Big Sur** or **Post Ranch Inn** if you want an upscale overnight.\n\n6. **Cambria / Hearst Castle** (≈ 5–6 hrs from SF)  \n   - Tour the famous Hearst Castle (reservations required).  \n   - Moonstone Beach boardwalk for sunset.\n\n7. **San Luis Obispo (SLO)** (≈ 6.5 hrs from SF)  \n   - Bubblegum Alley, great farm-to-table food, and a lively downtown.\n\n8. **Pismo Beach**  \n   - Classic California beach town with sand dunes you can drive on (ATV tours available).\n\n9. **Solvang** (short detour)  \n   - Danish-themed village with windmills, bakeries, and Æbleskiver pancakes. Fun for 1–2 hours.\n\n10. **Santa Barbara** (≈ 8–9 hrs from SF if you linger)  \n    - “American Riviera.” State Street for shopping, Mission Santa Barbara, beaches, and wine tasting in the Funk Zone.\n\n11. **Malibu** (final stretch before LA)  \n    - Point Dume, El Matador Beach, or a sunset dinner at Malibu Pier.\n\n### Inland / Faster Route Highlights (I-5 corridor)\nIf you’re short on time but still want stops:\n\n- **Gilroy** – “Garlic Capital of the World” (garlic ice cream if you’re brave).\n- **Pacheco Pass** → **San Luis Reservoir** for dramatic views.\n- **Harris Ranch** – iconic Central Valley steakhouse stop.\n- **Bakersfield** – for Basque food or country-music vibes.\n- **Tejon Pass / Magic Mountain** – quick amusement-park option.\n\n### Suggested Itineraries\n\n**Scenic 2-Day Trip (most popular)**  \nDay 1: SF → Big Sur (overnight in Big Sur or Cambria)  \nDay 2: Big Sur → Santa Barbara → LA\n\n**3-Day Leisure Trip**  \nDay 1: SF → Monterey / Carmel (overnight)  \nDay 2: Monterey → Cambria / Hearst Castle → SLO (overnight)  \nDay 3: SLO → Santa Barbara → Malibu → LA\n\nWould you like me to:\n- Build a day-by-day itinerary with driving times and restaurant recommendations?\n- Focus on specific interests (hiking, food, photography, wine, budget, luxury, etc.)?\n- Include where to stay or current road conditions / permit info for Big Sur?\n\nJust let me know your preferences (how many days, budget level, must-see activities, etc.) and I’ll tailor it further!",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675700,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "4eb7a1aa-c8a6-9b80-96e0-b49fe3efbb1d",
  "model": "grok-4.20-0309-non-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_bdeb03b7cd",
  "usage": {
    "completion_tokens": 915,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 24578000,
    "num_sources_used": 0,
    "prompt_tokens": 190,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 190
    },
    "total_tokens": 1105
  }
}
```

**Creative Writing** — Longer completion for creative output

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-non-reasoning',
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
  "model": "xai/grok-4.20-0309-non-reasoning",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ]
}'
```

The rain-slicked alley behind the old theater smelled of rotting velvet and gunpowder. Detective Elias Crowe knelt beside the body, his flashlight beam cutting through the downpour, and paused.

There, clutched in the dead man’s rigid fingers, was a single playing card: the Queen of Hearts. That wasn’t unusual in itself. What stopped Crowe cold was that the card was warm, almost hot, as though it had just come off a printing press. And when he turned it over, the back wasn’t patterned with the usual bicycles or fleurs-de-lis.

It was a tiny, perfectly detailed photograph of the crime scene itself, taken from an angle that should have been impossible—directly above the body, as if the card had been watching the murder happen.

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The rain-slicked alley behind the old theater smelled of rotting velvet and gunpowder. Detective Elias Crowe knelt beside the body, his flashlight beam cutting through the downpour, and paused.\n\nThere, clutched in the dead man’s rigid fingers, was a single playing card: the Queen of Hearts. That wasn’t unusual in itself. What stopped Crowe cold was that the card was warm, almost hot, as though it had just come off a printing press. And when he turned it over, the back wasn’t patterned with the usual bicycles or fleurs-de-lis.\n\nIt was a tiny, perfectly detailed photograph of the crime scene itself, taken from an angle that should have been impossible—directly above the body, as if the card had been watching the murder happen.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675700,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "ffb95915-83b7-ac06-34d9-f031b0056ab1",
  "model": "grok-4.20-0309-non-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_bdeb03b7cd",
  "usage": {
    "completion_tokens": 154,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 4865500,
    "num_sources_used": 0,
    "prompt_tokens": 135,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 135
    },
    "total_tokens": 289
  }
}
```

**Streaming Response** — Enable streaming for real-time output

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-non-reasoning',
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
  "model": "xai/grok-4.20-0309-non-reasoning",
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

**Recursion** is a programming concept where a function **calls itself** to solve a smaller version of the same problem.

It's like solving a big problem by repeatedly breaking it down into smaller, identical problems until you reach a simple case that can be solved directly.

---

### Simple Example: Factorial

The **factorial** of a number `n` (written as `n!`) is:
- `5! = 5 × 4 × 3 × 2 × 1 = 120`

We can define factorial recursively:

### Recursive Definition:
- `factorial(n) = n × factorial(n-1)`    ← recursive case
- `factorial(0) = 1`                     ← **base case** (stops the recursion)

---

### Code Example (Python):

```python
def factorial(n):
    # Base case: stop recursion
    if n == 0 or n == 1:
        return 1
    # Recursive case: call itself with a smaller number
    else:
        return n * factorial(n - 1)


# Test it
print(factorial(5))   # Output: 120
```

---

### How it works step by step:

When you call `factorial(5)`:

```
factorial(5) = 5 × factorial(4)
             = 5 × (4 × factorial(3))
             = 5 × (4 × (3 × factorial(2)))
             = 5 × (4 × (3 × (2 × factorial(1))))
             = 5 × (4 × (3 × (2 × 1)))     ← base case reached
             = 120
```

Each recursive call creates a new "layer" until it hits the base case, then it starts returning values back up the chain.

---

### Key Parts of Recursion:
1. **Base Case** – The simplest case that can be solved directly (stops infinite recursion).
2. **Recursive Case** – The function calls itself with a simpler/smaller input.

---

Would you like me to also show a visual example using a stack or another common recursive example like counting down or summing numbers?

```json
[
  {
    "choices": [
      {
        "delta": {
          "content": "**",
          "role": "assistant"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Recursion"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " is"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " programming"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " concept"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " where"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " function"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " **"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "calls"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " itself"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " to"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " solve"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " smaller"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " version"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " of"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " the"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " same"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " problem"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ".\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "It's"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " like"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " solving"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " big"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " problem"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " by"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " repeatedly"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " breaking"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " it"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " down"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " into"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " smaller"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ","
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " identical"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " problems"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " until"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " you"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " reach"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " simple"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " that"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " can"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " be"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " solved"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " directly"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ".\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "---\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "###"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Simple"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Example"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Factor"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ial"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "The"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " **"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "factor"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ial"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " of"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " number"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " `"
        },
        "index": 0
      }
    ],
    "created": 1777679681,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "written"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " as"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " `"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "!"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`)"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " is"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "-"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " `"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "!"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "4"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "3"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "2"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "120"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "We"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " can"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " define"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursively"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "###"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Recursive"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Definition"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "-"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " `"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "factor"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ial"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "(n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "(n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "-"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")`"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "   "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ←"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursive"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "-"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " `"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "factor"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ial"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "0"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "                    "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ←"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " **"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "base"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "stops"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " the"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursion"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "---\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "###"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Code"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Example"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Python"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "):\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "```"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "python"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "def"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "(n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "):\n"
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "   "
        },
        "index": 0
      }
    ],
    "created": 1777679682,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " #"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Base"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " stop"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursion"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "   "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " if"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " =="
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "0"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " or"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " =="
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "       "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " return"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "   "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " #"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Recursive"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " call"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " itself"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " with"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " smaller"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " number"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "   "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " else"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "       "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " return"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " *"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "(n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " -"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")\n\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "#"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Test"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " it"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "print"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "(f"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "actorial"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "))"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "  "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " #"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Output"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "120"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "```\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "---\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "###"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " How"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " it"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " works"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " step"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " by"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " step"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "When"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " you"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " call"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " `"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "factor"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ial"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")`"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "```\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "factor"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ial"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "4"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "            "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "4"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "3"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "))\n"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "            "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679683,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "4"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "3"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "2"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")))\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "            "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "4"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "3"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "2"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " factorial"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "))))\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "            "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "5"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "4"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "3"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "2"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ×"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")))"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "    "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ←"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " base"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " reached"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "            "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ="
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " "
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "120"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "```\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Each"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursive"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " call"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " creates"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " new"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " \""
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "layer"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "\""
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " until"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " it"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " hits"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " the"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " base"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ","
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " then"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " it"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " starts"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " returning"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " values"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " back"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " up"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " the"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " chain"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ".\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "---\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "###"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Key"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Parts"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " of"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Rec"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ursion"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":\n"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "1"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "."
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " **"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Base"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Case"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " –"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " The"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " simplest"
        },
        "index": 0
      }
    ],
    "created": 1777679684,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " case"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " that"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " can"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " be"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " solved"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " directly"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " ("
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "stops"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " infinite"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursion"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ").\n"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "2"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "."
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " **"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Recursive"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Case"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " –"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " The"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " function"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " calls"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " itself"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " with"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " simpler"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "/small"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "er"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " input"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ".\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "---\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Would"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " you"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " like"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " me"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " to"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " also"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " show"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " visual"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " example"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " using"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " stack"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " or"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " another"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " common"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " recursive"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " example"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " like"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " counting"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " down"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " or"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " summing"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " numbers"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "?"
        },
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [
      {
        "delta": {},
        "finish_reason": "stop",
        "index": 0
      }
    ],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd"
  },
  {
    "choices": [],
    "created": 1777679685,
    "id": "f987889c-ee9b-97a6-9c83-c687c444bbfb",
    "model": "grok-4.20-0309-non-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_bdeb03b7cd",
    "usage": {
      "completion_tokens": 441,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 0,
        "rejected_prediction_tokens": 0
      },
      "cost_in_usd_ticks": 12003000,
      "num_sources_used": 0,
      "prompt_tokens": 132,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 64,
        "image_tokens": 0,
        "text_tokens": 132
      },
      "total_tokens": 573
    }
  }
]
```

## Parameters

▶messages\[\]

`array`requiredminItems: 1maxItems: 500

deferred

`boolean | null`

frequency\_penalty

`number | null`

logprobs

`boolean | null`

max\_completion\_tokens

`integer | null`

max\_tokens

`integer | null`

n

`integer | null`

parallel\_tool\_calls

`boolean | null`

presence\_penalty

`number | null`

reasoning\_effort

`string | null`

▶response\_format

`one of`

▶search\_parameters{}

`object`

seed

`integer | null`

stop

`array | null`

stream

`boolean | null`

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

`string | null`

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

▶choices\[\]

`array`

citations

`array | null`

output\_files

`array | null`

system\_fingerprint

`string | null`

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-4.20-0309-non-reasoning/#page","headline":"Grok 4.20 Non-Reasoning (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok 4.20 non-reasoning model. Skips the thinking trace for fast, single-pass responses while keeping the same training as the reasoning variant.","url":"https://developers.cloudflare.com/ai/models/xai/grok-4.20-0309-non-reasoning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
