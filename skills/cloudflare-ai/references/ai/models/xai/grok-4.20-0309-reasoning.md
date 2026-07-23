---
description: xAI's Grok 4.20 reasoning model. Uses extended thinking to work through complex problems, returning a reasoning trace alongside the final answer.
title: Grok 4.20 Reasoning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok 4.20 Reasoning

Text Generation • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-4.20-0309-reasoning/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-4.20-0309-reasoning`

* Third-party

xAI's Grok 4.20 reasoning model. Uses extended thinking to work through complex problems, returning a reasoning trace alongside the final answer.

| Model Info                                                                 |                                                                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 2,000,000 tokens                                                                                                               |
| Terms and License                                                          | [link ↗](https://x.ai/legal/terms-of-service)                                                                                  |
| More information                                                           | [link ↗](https://x.ai/)                                                                                                        |
| Request formats                                                            | Chat Completions                                                                                                               |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-4.20-0309-reasoning) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-reasoning',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-4.20-0309-reasoning",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

**The Three Laws of Thermodynamics** (in plain language):

### 1. First Law (Conservation of Energy)
**Energy cannot be created or destroyed — only converted from one form to another.**

- In equation form: **ΔU = Q − W**
  - ΔU = change in the system’s internal energy
  - Q = heat added to the system
  - W = work done *by* the system

This is basically the law of conservation of energy applied to thermodynamic systems. If you add heat to a gas, that energy has to go somewhere — it can increase the gas’s temperature (internal energy) or be used to push a piston (work).

### 2. Second Law (Entropy and Directionality)
**The entropy (disorder) of an isolated system always increases over time.**

Key implications:
- Heat flows spontaneously from hot to cold, never the reverse.
- It is impossible to build a perfectly efficient heat engine (some energy is always “wasted” as heat).
- Processes have a natural direction; time has an arrow.

Popular statement: “You can’t even break even.” Every real process increases the total entropy of the universe.

### 3. Third Law (Absolute Zero)
**As the temperature of a system approaches absolute zero (0 K or −273.15 °C), its entropy approaches a minimum value (often zero for a perfect crystal).**

Key consequences:
- It is impossible to reach absolute zero in a finite number of steps.
- Many materials exhibit strange quantum behaviors near 0 K (superconductivity, superfluidity, etc.).

---

### Bonus: The Zeroth Law (The “Temperature Law”)
Although not one of the original three, it’s so fundamental it was named *after* them:

**If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.**

This is what allows us to define temperature and use thermometers.

Would you like a more technical/deep-dive version of any of these laws?

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "**The Three Laws of Thermodynamics** (in plain language):\n\n### 1. First Law (Conservation of Energy)\n**Energy cannot be created or destroyed — only converted from one form to another.**\n\n- In equation form: **ΔU = Q − W**\n  - ΔU = change in the system’s internal energy\n  - Q = heat added to the system\n  - W = work done *by* the system\n\nThis is basically the law of conservation of energy applied to thermodynamic systems. If you add heat to a gas, that energy has to go somewhere — it can increase the gas’s temperature (internal energy) or be used to push a piston (work).\n\n### 2. Second Law (Entropy and Directionality)\n**The entropy (disorder) of an isolated system always increases over time.**\n\nKey implications:\n- Heat flows spontaneously from hot to cold, never the reverse.\n- It is impossible to build a perfectly efficient heat engine (some energy is always “wasted” as heat).\n- Processes have a natural direction; time has an arrow.\n\nPopular statement: “You can’t even break even.” Every real process increases the total entropy of the universe.\n\n### 3. Third Law (Absolute Zero)\n**As the temperature of a system approaches absolute zero (0 K or −273.15 °C), its entropy approaches a minimum value (often zero for a perfect crystal).**\n\nKey consequences:\n- It is impossible to reach absolute zero in a finite number of steps.\n- Many materials exhibit strange quantum behaviors near 0 K (superconductivity, superfluidity, etc.).\n\n---\n\n### Bonus: The Zeroth Law (The “Temperature Law”)\nAlthough not one of the original three, it’s so fundamental it was named *after* them:\n\n**If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.**\n\nThis is what allows us to define temperature and use thermometers.\n\nWould you like a more technical/deep-dive version of any of these laws?",
        "reasoning_content": "The question is: \"What are the three laws of thermodynamics?\"\nI know the three laws of thermodynamics are key principles in physics that govern energy, heat, and work in systems. The first law is about conservation of energy, stating that energy can't be created or destroyed, only transformed.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675707,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "7725e484-a7ee-ce42-45e7-89022b16e9ac",
  "model": "grok-4.20-0309-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_7be90dd558",
  "usage": {
    "completion_tokens": 411,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 382,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 20803000,
    "num_sources_used": 0,
    "prompt_tokens": 132,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 132
    },
    "total_tokens": 925
  }
}
```

## Examples

**With System Message** — Using a system message to set context

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-reasoning',
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
  "model": "xai/grok-4.20-0309-reasoning",
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

**Best way to read a JSON file in Python:**

### Method 1: Using `json.load()` (Recommended)

```python
import json
from pathlib import Path

# Method A: Using pathlib (modern and clean)
def read_json(file_path: str | Path):
    path = Path(file_path)
    with path.open('r', encoding='utf-8') as file:
        return json.load(file)

# Usage
data = read_json('data.json')
print(data)
```

### Method 2: Simple version (most common)

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

print(data)
```

---

### Complete Example

```python
import json
from pathlib import Path
from typing import Any

def load_json(file_path: str | Path) -> dict | list:
    """Safely load a JSON file."""
    try:
        path = Path(file_path)
        with path.open('r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return {}
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{file_path}': {e}")
        return {}
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {}

# Usage
data = load_json('config.json')

# Access the data
if isinstance(data, dict):
    print(data.get('name'))
    print(data.get('settings', {}))
```

---

### Key Points:

- **`json.load()`** → reads from a **file object**
- **`json.loads()`** → reads from a **string** (note the 's')
- Always specify `encoding='utf-8'` to avoid encoding issues
- Use `pathlib.Path` for better path handling (recommended in modern Python)

---

### Bonus: One-liner (for quick scripts)

```python
import json
data = json.loads(Path('data.json').read_text(encoding='utf-8'))
```

Would you like me to also show how to:
- Read JSON from a URL?
- Handle very large JSON files?
- Write JSON files?
- Use `pydantic` or `dataclasses` with JSON?

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "**Best way to read a JSON file in Python:**\n\n### Method 1: Using `json.load()` (Recommended)\n\n```python\nimport json\nfrom pathlib import Path\n\n# Method A: Using pathlib (modern and clean)\ndef read_json(file_path: str | Path):\n    path = Path(file_path)\n    with path.open('r', encoding='utf-8') as file:\n        return json.load(file)\n\n# Usage\ndata = read_json('data.json')\nprint(data)\n```\n\n### Method 2: Simple version (most common)\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n---\n\n### Complete Example\n\n```python\nimport json\nfrom pathlib import Path\nfrom typing import Any\n\ndef load_json(file_path: str | Path) -> dict | list:\n    \"\"\"Safely load a JSON file.\"\"\"\n    try:\n        path = Path(file_path)\n        with path.open('r', encoding='utf-8') as file:\n            return json.load(file)\n    except FileNotFoundError:\n        print(f\"Error: File '{file_path}' not found.\")\n        return {}\n    except json.JSONDecodeError as e:\n        print(f\"Error: Invalid JSON in '{file_path}': {e}\")\n        return {}\n    except Exception as e:\n        print(f\"Unexpected error: {e}\")\n        return {}\n\n# Usage\ndata = load_json('config.json')\n\n# Access the data\nif isinstance(data, dict):\n    print(data.get('name'))\n    print(data.get('settings', {}))\n```\n\n---\n\n### Key Points:\n\n- **`json.load()`** → reads from a **file object**\n- **`json.loads()`** → reads from a **string** (note the 's')\n- Always specify `encoding='utf-8'` to avoid encoding issues\n- Use `pathlib.Path` for better path handling (recommended in modern Python)\n\n---\n\n### Bonus: One-liner (for quick scripts)\n\n```python\nimport json\ndata = json.loads(Path('data.json').read_text(encoding='utf-8'))\n```\n\nWould you like me to also show how to:\n- Read JSON from a URL?\n- Handle very large JSON files?\n- Write JSON files?\n- Use `pydantic` or `dataclasses` with JSON?",
        "reasoning_content": "The question is: \"How do I read a JSON file in Python?\"\nI know the best way to read a JSON file in Python is by using the built-in json module. It's straightforward and doesn't require any external libraries.\n\nFirst, I import the json module at the top of my script.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675713,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "8b99bc1a-af46-f751-30ff-23354230beba",
  "model": "grok-4.20-0309-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_7be90dd558",
  "usage": {
    "completion_tokens": 486,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 362,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 22365500,
    "num_sources_used": 0,
    "prompt_tokens": 147,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 147
    },
    "total_tokens": 995
  }
}
```

**Multi-turn Conversation** — Continuing a conversation with context

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-reasoning',
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
  "model": "xai/grok-4.20-0309-reasoning",
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

**Here are some excellent stops on the San Francisco to Los Angeles drive**, ordered from north to south. I’m assuming you’re taking the **scenic Pacific Coast Highway (Highway 1)** route, which is far more enjoyable than the fast I-5 inland route. The full coastal drive is roughly 450–500 miles and works best as a **2–3 day trip**.

### Top Recommended Stops (North to South)

**1. Half Moon Bay (45–60 min from SF)**
- Cute coastal town with dramatic cliffs and beaches.
- Great for a quick breakfast/coffee stop or a short hike at coastal bluffs.
- *Pro tip:* Try the bakery at **Half Moon Bay Coffee Company**.

**2. Santa Cruz (1.5–2 hours from SF)**
- Classic California beach town with a historic boardwalk, surfing culture, and redwood forests nearby.
- Excellent for lunch (strong seafood scene) or a quick ride on the Giant Dipper roller coaster.
- If you like nature, detour to **Henry Cowell Redwoods** for a short walk among giant trees.

**3. Monterey & Carmel-by-the-Sea (2–2.5 hours from SF)**
- **Monterey**: World-class **Monterey Bay Aquarium**, Cannery Row, and fresh seafood.
- **Carmel**: Storybook village with beautiful beaches, art galleries, and the famous **17-Mile Drive** (pebble beach, cypress trees, multi-million dollar homes).
- Many people spend their first night here.

**4. Big Sur (3–4 hours from SF)**
- The **highlight** of the entire drive.
- Must-sees:
  - **Bixby Bridge** (iconic photo stop)
  - **McWay Falls** (waterfall that lands directly on the beach)
  - **Pfeiffer Beach** (purple sand, keyhole rock formations)
  - **Julia Pfeiffer Burns State Park** (great short hikes)
- Stop for lunch at **Nepenthe** (iconic cliffside restaurant with insane views).
- *Note:* Cell service is spotty here — plan accordingly.

**5. Hearst Castle (San Simeon) (~5–6 hours from SF)**
- The extravagant mansion built by William Randolph Hearst.
- Guided tours are impressive if you have 2+ hours. Even just stopping at the visitor center for views is worthwhile.

**6. Cambria or Morro Bay**
- Relaxed coastal towns perfect for an overnight or dinner.
- **Moonstone Beach** in Cambria is lovely for a sunset walk.
- Morro Bay has the famous giant volcanic rock “Morro Rock.”

**7. Pismo Beach / Avila Beach (~7–8 hours from SF)**
- Classic beach town with good restaurants and fewer crowds than Big Sur.
- Great midway overnight spot before the final push to LA.

**8. Santa Barbara (9–10 hours from SF)**
- The “American Riviera.” Spanish architecture, beautiful beaches, excellent wine country nearby.
- Walk **State Street**, visit the historic **Mission**, or grab seafood at the harbor.
- Many people spend their second night here.

**9. Malibu (closer to LA)**
- Stop at **El Matador State Beach** or **Point Dume** for dramatic cliffs and ocean views before hitting the LA traffic.

---

### Quick Itinerary Suggestions

- **2-Day Trip**: SF → Big Sur/Cambria (overnight) → Santa Barbara → LA
- **3-Day Trip**: SF → Monterey/Carmel (night 1) → Big Sur/Cambria (night 2) → Santa Barbara → LA

Would you like me to:
- Customize this based on your interests (hiking, food, photography, wine, history, etc.)?
- Suggest specific restaurants or hikes?
- Recommend places to stay?
- Give you a Google Maps-ready list or estimated driving times?

Just tell me how many days you have and what kind of vibe you’re going for!

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "**Here are some excellent stops on the San Francisco to Los Angeles drive**, ordered from north to south. I’m assuming you’re taking the **scenic Pacific Coast Highway (Highway 1)** route, which is far more enjoyable than the fast I-5 inland route. The full coastal drive is roughly 450–500 miles and works best as a **2–3 day trip**.\n\n### Top Recommended Stops (North to South)\n\n**1. Half Moon Bay (45–60 min from SF)**  \n- Cute coastal town with dramatic cliffs and beaches.  \n- Great for a quick breakfast/coffee stop or a short hike at coastal bluffs.  \n- *Pro tip:* Try the bakery at **Half Moon Bay Coffee Company**.\n\n**2. Santa Cruz (1.5–2 hours from SF)**  \n- Classic California beach town with a historic boardwalk, surfing culture, and redwood forests nearby.  \n- Excellent for lunch (strong seafood scene) or a quick ride on the Giant Dipper roller coaster.  \n- If you like nature, detour to **Henry Cowell Redwoods** for a short walk among giant trees.\n\n**3. Monterey & Carmel-by-the-Sea (2–2.5 hours from SF)**  \n- **Monterey**: World-class **Monterey Bay Aquarium**, Cannery Row, and fresh seafood.  \n- **Carmel**: Storybook village with beautiful beaches, art galleries, and the famous **17-Mile Drive** (pebble beach, cypress trees, multi-million dollar homes).  \n- Many people spend their first night here.\n\n**4. Big Sur (3–4 hours from SF)**  \n- The **highlight** of the entire drive.  \n- Must-sees:  \n  - **Bixby Bridge** (iconic photo stop)  \n  - **McWay Falls** (waterfall that lands directly on the beach)  \n  - **Pfeiffer Beach** (purple sand, keyhole rock formations)  \n  - **Julia Pfeiffer Burns State Park** (great short hikes)  \n- Stop for lunch at **Nepenthe** (iconic cliffside restaurant with insane views).  \n- *Note:* Cell service is spotty here — plan accordingly.\n\n**5. Hearst Castle (San Simeon) (~5–6 hours from SF)**  \n- The extravagant mansion built by William Randolph Hearst.  \n- Guided tours are impressive if you have 2+ hours. Even just stopping at the visitor center for views is worthwhile.\n\n**6. Cambria or Morro Bay**  \n- Relaxed coastal towns perfect for an overnight or dinner.  \n- **Moonstone Beach** in Cambria is lovely for a sunset walk.  \n- Morro Bay has the famous giant volcanic rock “Morro Rock.”\n\n**7. Pismo Beach / Avila Beach (~7–8 hours from SF)**  \n- Classic beach town with good restaurants and fewer crowds than Big Sur.  \n- Great midway overnight spot before the final push to LA.\n\n**8. Santa Barbara (9–10 hours from SF)**  \n- The “American Riviera.” Spanish architecture, beautiful beaches, excellent wine country nearby.  \n- Walk **State Street**, visit the historic **Mission**, or grab seafood at the harbor.  \n- Many people spend their second night here.\n\n**9. Malibu (closer to LA)**  \n- Stop at **El Matador State Beach** or **Point Dume** for dramatic cliffs and ocean views before hitting the LA traffic.\n\n---\n\n### Quick Itinerary Suggestions\n\n- **2-Day Trip**: SF → Big Sur/Cambria (overnight) → Santa Barbara → LA  \n- **3-Day Trip**: SF → Monterey/Carmel (night 1) → Big Sur/Cambria (night 2) → Santa Barbara → LA\n\nWould you like me to:\n- Customize this based on your interests (hiking, food, photography, wine, history, etc.)?\n- Suggest specific restaurants or hikes?\n- Recommend places to stay?\n- Give you a Google Maps-ready list or estimated driving times?\n\nJust tell me how many days you have and what kind of vibe you’re going for!",
        "reasoning_content": "The user is asking for good places to stop on a road trip from San Francisco to Los Angeles. This follows from the previous conversation where I offered scenic routes or interesting stops.\nI think the user is asking about good places to stop on a road trip from San Francisco to Los Angeles, based on the previous conversation. For a scenic drive, I'd recommend taking the Pacific Coast Highway (Highway 1) instead of the faster I-5 route.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675715,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "e4c41820-dfa8-44ff-6cdf-284caf943a9f",
  "model": "grok-4.20-0309-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_7be90dd558",
  "usage": {
    "completion_tokens": 848,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 438,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 33878000,
    "num_sources_used": 0,
    "prompt_tokens": 192,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 192
    },
    "total_tokens": 1478
  }
}
```

**Creative Writing** — Longer completion for creative output

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-reasoning',
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
  "model": "xai/grok-4.20-0309-reasoning",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ]
}'
```

**The Bone Key**

Detective Lena Voss had seen every kind of horror a city could offer, but the silence in apartment 4C unsettled her more than the blood. The victim, Dr. Elias Marrow, lay curled on the kitchen floor like a dropped marionette, throat opened with surgical precision. No defensive wounds. No signs of forced entry. Just the copper stink of blood and the faint smell of ozone, as if lightning had struck indoors.

She was about to call it in when her flashlight caught something clenched in the dead man’s left hand.

Lena crouched, gloved fingers prying open stiffening knuckles. Nestled against the palm was a small key carved from what looked like yellowed bone. Its bow was shaped like a human vertebra. The bit was far too intricate for any normal lock—almost organic, like the inside of an ear.

She turned it toward the light and felt her stomach tighten.

The key was warm.

Not room temperature. *Body* temperature. And as she watched, a thin crimson line—fresh blood—rose through the bone like ink through a straw, tracing a pattern that hadn’t been there a second earlier.

A map.

Lena’s pulse thudded in her ears. She had cleared the apartment herself twenty minutes ago. The key had not been in the victim’s hand then.

Something behind her exhaled, soft as a secret.

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "**The Bone Key**\n\nDetective Lena Voss had seen every kind of horror a city could offer, but the silence in apartment 4C unsettled her more than the blood. The victim, Dr. Elias Marrow, lay curled on the kitchen floor like a dropped marionette, throat opened with surgical precision. No defensive wounds. No signs of forced entry. Just the copper stink of blood and the faint smell of ozone, as if lightning had struck indoors.\n\nShe was about to call it in when her flashlight caught something clenched in the dead man’s left hand.\n\nLena crouched, gloved fingers prying open stiffening knuckles. Nestled against the palm was a small key carved from what looked like yellowed bone. Its bow was shaped like a human vertebra. The bit was far too intricate for any normal lock—almost organic, like the inside of an ear.\n\nShe turned it toward the light and felt her stomach tighten.\n\nThe key was warm.\n\nNot room temperature. *Body* temperature. And as she watched, a thin crimson line—fresh blood—rose through the bone like ink through a straw, tracing a pattern that hadn’t been there a second earlier.\n\nA map.\n\nLena’s pulse thudded in her ears. She had cleared the apartment herself twenty minutes ago. The key had not been in the victim’s hand then.\n\nSomething behind her exhaled, soft as a secret.",
        "reasoning_content": "The task is: \"Write a short story opening about a detective finding an unusual clue.\"\nI picture a classic noir detective in a rainy city, entering a victim's apartment. He's gruff, experienced, cigarette in hand. The room smells of death and cigar smoke. He searches for clues among the chaos—overturned furniture, spilled whiskey—but finds nothing обыденное. Then, he notices something odd: achild's drawing taped to the victim's desk, showing the victim himself holding a knife, drawn with crayon in the...\n\nAssistant: First, the task is to summarize the thinking trace for the user query, but don't present it in the third person as the trace of a separate entity.\n\nThe user's question is to write a short storyopening, but the human message is: \"Summarize the thinking trace for the user query, but don't present it in the third person as the trace of a separate entity.\" And then it provides [User's Question] and [Internal Reasoning].",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777675721,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "128cbe29-1523-9f42-ba87-c5225670e653",
  "model": "grok-4.20-0309-reasoning",
  "object": "chat.completion",
  "system_fingerprint": "fp_7be90dd558",
  "usage": {
    "completion_tokens": 279,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 984,
      "rejected_prediction_tokens": 0
    },
    "cost_in_usd_ticks": 32615500,
    "num_sources_used": 0,
    "prompt_tokens": 137,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 64,
      "image_tokens": 0,
      "text_tokens": 137
    },
    "total_tokens": 1400
  }
}
```

**Streaming Response** — Enable streaming for real-time output

```ts
const response = await env.AI.run(
  'xai/grok-4.20-0309-reasoning',
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
  "model": "xai/grok-4.20-0309-reasoning",
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

**Recursion** is a problem-solving technique where a function **calls itself** to solve smaller versions of the same problem.

It works like this:
- You break a big problem down into smaller, similar problems.
- You keep doing this until you reach a problem so small that you can solve it directly (this is called the **base case**).
- Then you combine the results as the function calls "unwind."

### Simple Example: Factorial

The **factorial** of a number `n` (written as `n!`) is the product of all positive integers from `n` down to 1.

**Mathematical definition:**
- 5! = 5 × 4 × 3 × 2 × 1 = 120

**Recursive definition:**
- `factorial(n) = n × factorial(n-1)`
- `factorial(0) = 1` (this is the **base case** — the stopping point)

### How it works step by step:

```python
def factorial(n):
    if n == 0:           # Base case
        return 1
    else:
        return n * factorial(n - 1)   # Recursive call
```

**Calling `factorial(5)`:**

```
factorial(5)
   → 5 * factorial(4)
         → 4 * factorial(3)
               → 3 * factorial(2)
                     → 2 * factorial(1)
                           → 1 * factorial(0)
                                 → 1  (base case reached)
```

Now it starts returning back up:
- `1 * 1 = 1`
- `2 * 1 = 2`
- `3 * 2 = 6`
- `4 * 6 = 24`
- `5 * 24 = 120`

**Final result:** `120`

### Analogy

Think of recursion like a **stack of Russian nesting dolls**. You keep opening smaller and smaller dolls until you reach the tiniest one (base case). Then you put them all back together, multiplying the results as you go back up.

Recursion is elegant for problems that have a naturally recursive structure (tree traversals, directory/file searching, certain mathematical sequences), but it can be less efficient than loops for very large problems due to the memory cost of all those function calls.

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
    "created": 1777679686,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679686,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " is"
        },
        "index": 0
      }
    ],
    "created": 1777679686,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": ":"
        },
        "index": 0
      }
    ],
    "created": 1777679686,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " \""
        },
        "index": 0
      }
    ],
    "created": 1777679686,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": "Explain"
        },
        "index": 0
      }
    ],
    "created": 1777679686,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " the"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " concept"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " of"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " recursion"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " with"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " a"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " simple"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": " example"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": ".\"\n"
        },
        "index": 0
      }
    ],
    "created": 1777679687,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": "I think of recursion as a function that calls itself to tackle a problem by breaking it down into smaller, similar problems, until it hits a stopping point called the base case."
        },
        "index": 0
      }
    ],
    "created": 1777679690,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "reasoning_content": "\n\nFor a simple example, let's take calculating the factorial of a number."
        },
        "index": 0
      }
    ],
    "created": 1777679690,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "-solving"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " technique"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " versions"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "It"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " this"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " You"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " break"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " similar"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ".\n"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " You"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " keep"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " doing"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " this"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " so"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " small"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "this"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " called"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Then"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " combine"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " results"
        },
        "index": 0
      }
    ],
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679692,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "un"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "wind"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ".\"\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " product"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " all"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " positive"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " integers"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " from"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Mathematical"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " definition"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":**\n"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " definition"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":**\n"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")`\n"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "this"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " —"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " stopping"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " point"
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "          "
        },
        "index": 0
      }
    ],
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679693,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Calling"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":**\n\n"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " →"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "        "
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " →"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "              "
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " →"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " →"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "                          "
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " →"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "                                "
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " →"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Now"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`\n"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`\n"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "6"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`\n"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "6"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "24"
        },
        "index": 0
      }
    ],
    "created": 1777679694,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "`\n"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "24"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Final"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " result"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ":**"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Anal"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "ogy"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Think"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "stack"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Russian"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " nesting"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " dolls"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "**."
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " You"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " keep"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " opening"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " and"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " dolls"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " tini"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "est"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " one"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": ")."
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " Then"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " put"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " them"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " all"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " together"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " multiplying"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " results"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " go"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " elegant"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " for"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " have"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " naturally"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " structure"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "tree"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " travers"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "als"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " directory"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "/file"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " searching"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " certain"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " mathematical"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " sequences"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": "),"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " but"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " less"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " efficient"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " than"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " loops"
        },
        "index": 0
      }
    ],
    "created": 1777679695,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " for"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " very"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " large"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " due"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " memory"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " cost"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " all"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {
          "content": " those"
        },
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
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
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [
      {
        "delta": {},
        "finish_reason": "stop",
        "index": 0
      }
    ],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558"
  },
  {
    "choices": [],
    "created": 1777679696,
    "id": "2ebb8312-bff9-925c-b8b7-9d04886cea8e",
    "model": "grok-4.20-0309-reasoning",
    "object": "chat.completion.chunk",
    "system_fingerprint": "fp_7be90dd558",
    "usage": {
      "completion_tokens": 478,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 477,
        "rejected_prediction_tokens": 0
      },
      "cost_in_usd_ticks": 24878000,
      "num_sources_used": 0,
      "prompt_tokens": 134,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 64,
        "image_tokens": 0,
        "text_tokens": 134
      },
      "total_tokens": 1089
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-4.20-0309-reasoning/#page","headline":"Grok 4.20 Reasoning (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok 4.20 reasoning model. Uses extended thinking to work through complex problems, returning a reasoning trace alongside the final answer.","url":"https://developers.cloudflare.com/ai/models/xai/grok-4.20-0309-reasoning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
