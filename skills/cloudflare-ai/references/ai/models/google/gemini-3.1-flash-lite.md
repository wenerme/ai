---
description: Google's lightest and most cost-efficient Gemini model for high-throughput tasks.
title: Gemini 3.1 Flash Lite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 3.1 Flash Lite

Text Generation • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-lite/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-3.1-flash-lite`

* Third-party
* Zero data retention

Google's lightest and most cost-efficient Gemini model for high-throughput tasks.

| Model Info                                                                          |                                                                                                                                |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens                                                                                                               |
| Terms and License                                                                   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                               |
| More information                                                                    | [link ↗](https://deepmind.google/technologies/gemini/)                                                                         |
| Zero data retention                                                                 | Yes                                                                                                                            |
| Request formats                                                                     | Chat Completions                                                                                                               |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.1-flash-lite) |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-lite',
  { contents: [{ parts: [{ text: 'What are the three laws of thermodynamics?' }], role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.1-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "What are the three laws of thermodynamics?"
          }
        ],
        "role": "user"
      }
    ]
  }
}'
```

The three laws of thermodynamics (along with the "zeroth" law, which is foundational) describe how energy moves, transforms, and behaves in physical systems.

Here is a breakdown of the laws:

### 0. The Zeroth Law (The Law of Equilibrium)
Before the first three were established, scientists realized there needed to be a rule about temperature.
*   **The Law:** If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.
*   **What it means:** This is the scientific basis for the thermometer. It allows us to define "temperature" as a measurable property.

---

### 1. The First Law (The Law of Conservation of Energy)
*   **The Law:** Energy cannot be created or destroyed in an isolated system; it can only be transferred or converted from one form to another.
*   **What it means:** The total amount of energy in the universe is constant. If you put energy into a system (as heat or work), it must either increase the system's internal energy or be released as work. You cannot get more energy out of a system than you put into it (this rules out "perpetual motion machines of the first kind").

---

### 2. The Second Law (The Law of Entropy)
*   **The Law:** The total entropy (disorder) of an isolated system can never decrease over time; it can only remain constant or increase.
*   **What it means:** Heat always flows naturally from a hotter object to a colder object, never the other way around unless external work is performed. Because energy spreads out and becomes less "useful" (it degrades into heat), no process is 100% efficient. This law provides an "arrow of time," explaining why things break down rather than spontaneously putting themselves back together.

---

### 3. The Third Law (The Law of Absolute Zero)
*   **The Law:** As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.
*   **What it means:** It is impossible to reach absolute zero through any finite number of processes. At absolute zero, all atomic motion stops, and the system reaches its state of minimum possible energy and perfect order.

***

### Summary for easy memory:
*   **Zeroth Law:** You have to play by the rules (there is such a thing as temperature).
*   **First Law:** You can't win (you can't create energy).
*   **Second Law:** You can't break even (you always lose some energy to entropy).
*   **Third Law:** You can't get out of the game (you can't reach absolute zero).

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "The three laws of thermodynamics (along with the \"zeroth\" law, which is foundational) describe how energy moves, transforms, and behaves in physical systems.\n\nHere is a breakdown of the laws:\n\n### 0. The Zeroth Law (The Law of Equilibrium)\nBefore the first three were established, scientists realized there needed to be a rule about temperature.\n*   **The Law:** If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.\n*   **What it means:** This is the scientific basis for the thermometer. It allows us to define \"temperature\" as a measurable property.\n\n---\n\n### 1. The First Law (The Law of Conservation of Energy)\n*   **The Law:** Energy cannot be created or destroyed in an isolated system; it can only be transferred or converted from one form to another.\n*   **What it means:** The total amount of energy in the universe is constant. If you put energy into a system (as heat or work), it must either increase the system's internal energy or be released as work. You cannot get more energy out of a system than you put into it (this rules out \"perpetual motion machines of the first kind\").\n\n---\n\n### 2. The Second Law (The Law of Entropy)\n*   **The Law:** The total entropy (disorder) of an isolated system can never decrease over time; it can only remain constant or increase.\n*   **What it means:** Heat always flows naturally from a hotter object to a colder object, never the other way around unless external work is performed. Because energy spreads out and becomes less \"useful\" (it degrades into heat), no process is 100% efficient. This law provides an \"arrow of time,\" explaining why things break down rather than spontaneously putting themselves back together.\n\n---\n\n### 3. The Third Law (The Law of Absolute Zero)\n*   **The Law:** As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.\n*   **What it means:** It is impossible to reach absolute zero through any finite number of processes. At absolute zero, all atomic motion stops, and the system reaches its state of minimum possible energy and perfect order.\n\n***\n\n### Summary for easy memory:\n*   **Zeroth Law:** You have to play by the rules (there is such a thing as temperature).\n*   **First Law:** You can't win (you can't create energy).\n*   **Second Law:** You can't break even (you always lose some energy to entropy).\n*   **Third Law:** You can't get out of the game (you can't reach absolute zero).",
            "thoughtSignature": "AY89a19nds/5ZNrEilIoIIOsW4vmEKmo5R0rba/I6ZZTI9ml+6YrCI65LXveEZ/d/f0="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 8,
    "candidatesTokenCount": 579,
    "totalTokenCount": 587,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 8
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 579
      }
    ]
  },
  "modelVersion": "gemini-3.1-flash-lite",
  "createTime": "2026-07-21T16:29:03.710695Z",
  "responseId": "T55faqewK4Wq8sYPycj20Q0",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**With System Instruction** — Using a system instruction to set context

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-lite',
  {
    contents: [{ parts: [{ text: 'How do I read a JSON file in Python?' }], role: 'user' }],
    generationConfig: { temperature: 0.3 },
    systemInstruction: {
      parts: [{ text: 'You are a helpful coding assistant specializing in Python.' }],
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.1-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "How do I read a JSON file in Python?"
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "temperature": 0.3
    },
    "systemInstruction": {
      "parts": [
        {
          "text": "You are a helpful coding assistant specializing in Python."
        }
      ]
    }
  }
}'
```

To read a JSON file in Python, you use the built-in `json` module.

Here is the standard way to do it:

### The Basic Approach
```python
import json

# Open the file and load the data
with open('data.json', 'r') as file:
    data = json.load(file)

# Now 'data' is a Python dictionary or list
print(data)
```

### Breakdown of the code:
1.  **`import json`**: Imports Python's built-in library for handling JSON.
2.  **`with open(...)`**: This is a "context manager." It is the best practice because it ensures the file is automatically closed after you are done reading it, even if an error occurs.
3.  **`json.load(file)`**: This function parses the file content and converts it into the corresponding Python object (e.g., a JSON object becomes a `dict`, and a JSON array becomes a `list`).

---

### Handling Common Scenarios

#### 1. What if the file is empty or malformed?
If the file is not valid JSON, `json.load()` will raise a `json.JSONDecodeError`. You can handle this with a `try-except` block:

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except json.JSONDecodeError:
    print("The file contains invalid JSON.")
except FileNotFoundError:
    print("The file was not found.")
```

#### 2. Reading a JSON string instead of a file
If you have the JSON data as a **string** (not a file), use `json.loads()` (the 's' stands for "string"):

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data["name"]) # Output: Alice
```

### Summary: Which one to use?
*   Use **`json.load(file_object)`** when reading from an actual **file** on your disk.
*   Use **`json.loads(string)`** when reading from a **string** variable.

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "To read a JSON file in Python, you use the built-in `json` module.\n\nHere is the standard way to do it:\n\n### The Basic Approach\n```python\nimport json\n\n# Open the file and load the data\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary or list\nprint(data)\n```\n\n### Breakdown of the code:\n1.  **`import json`**: Imports Python's built-in library for handling JSON.\n2.  **`with open(...)`**: This is a \"context manager.\" It is the best practice because it ensures the file is automatically closed after you are done reading it, even if an error occurs.\n3.  **`json.load(file)`**: This function parses the file content and converts it into the corresponding Python object (e.g., a JSON object becomes a `dict`, and a JSON array becomes a `list`).\n\n---\n\n### Handling Common Scenarios\n\n#### 1. What if the file is empty or malformed?\nIf the file is not valid JSON, `json.load()` will raise a `json.JSONDecodeError`. You can handle this with a `try-except` block:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\n```\n\n#### 2. Reading a JSON string instead of a file\nIf you have the JSON data as a **string** (not a file), use `json.loads()` (the 's' stands for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data[\"name\"]) # Output: Alice\n```\n\n### Summary: Which one to use?\n*   Use **`json.load(file_object)`** when reading from an actual **file** on your disk.\n*   Use **`json.loads(string)`** when reading from a **string** variable.",
            "thoughtSignature": "AY89a1/+8Xbo6oiWplrPfjrfXblH509xYguBbs/SHNqslfm3tKk50KPOszVUx9++ro8="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 20,
    "candidatesTokenCount": 496,
    "totalTokenCount": 516,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 20
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 496
      }
    ]
  },
  "modelVersion": "gemini-3.1-flash-lite",
  "createTime": "2026-07-21T16:29:06.645326Z",
  "responseId": "Up5fas6xJ9jY8sYPgtSd8Ag",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Multi-turn Conversation** — Continuing a conversation with context

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-lite',
  {
    contents: [
      {
        parts: [{ text: 'I need help planning a road trip from San Francisco to Los Angeles.' }],
        role: 'user',
      },
      {
        parts: [
          {
            text: "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
          },
        ],
        role: 'model',
      },
      { parts: [{ text: 'Yes, what are some good places to stop?' }], role: 'user' },
    ],
    generationConfig: { maxOutputTokens: 2048 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.1-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "I need help planning a road trip from San Francisco to Los Angeles."
          }
        ],
        "role": "user"
      },
      {
        "parts": [
          {
            "text": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"
          }
        ],
        "role": "model"
      },
      {
        "parts": [
          {
            "text": "Yes, what are some good places to stop?"
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 2048
    }
  }
}'
```

To give you the best recommendations, it helps to know which route you plan to take. There are two primary ways to drive from San Francisco to LA:

### 1. The Scenic Route: Highway 1 (Pacific Coast Highway)
This is the "bucket list" drive. It takes **8–10+ hours of pure driving time**, so it’s best done over 2–3 days. If you have the time, this is the way to go.

*   **Santa Cruz:** A classic surf town with a vintage boardwalk and amusement park.
*   **Monterey & Carmel-by-the-Sea:** Visit the famous Monterey Bay Aquarium, then drive the **17-Mile Drive** into the fairytale-like village of Carmel.
*   **Big Sur:** The crown jewel of the trip. Stop at **Bixby Creek Bridge** for photos and **Pfeiffer Big Sur State Park** for redwoods.
    *   *Note: Check Caltrans for road closures, as landslides occasionally affect parts of Highway 1.*
*   **Hearst Castle (San Simeon):** A stunning, opulent estate built by William Randolph Hearst. Be sure to stop at the nearby **Elephant Seal Vista Point** to see hundreds of seals lounging on the beach.
*   **San Luis Obispo & Pismo Beach:** Great spots for a lunch break. If you like wine, detour slightly inland to the **Paso Robles** wine region.
*   **Santa Barbara:** Known as the "American Riviera," it has beautiful Spanish architecture, great seafood on the pier, and excellent shopping.

---

### 2. The Efficient Route: I-5
If you need to get to LA quickly (5–6 hours), you’ll take I-5. It is mostly farmland and not particularly scenic, but there are a few interesting pit stops:

*   **Harris Ranch (Coalinga):** A famous halfway point. It’s a massive cattle ranch and steakhouse. You’ll smell it before you see it, but it’s a quintessential California road trip stop for a burger.
*   **Tejon Outlets:** Located near the bottom of the Grapevine (the mountain pass into LA), it’s a good place to stretch your legs and do some shopping before hitting the LA traffic.
*   **Valencia/Magic Mountain:** If you’re a thrill-seeker, Six Flags Magic Mountain is right off the freeway just as you enter the LA area.

---

### A "Hybrid" Option (The Best of Both Worlds)
If you want some scenery without committing to the full winding coastal road, do this:
1.  Take **US-101 South** out of San Francisco.
2.  Stop in **San Luis Obispo**.
3.  Cut over to the coast to drive through **Santa Barbara** and **Malibu** as you enter Los Angeles. This avoids the slowest parts of the central coast while still giving you that beautiful Pacific ocean view for the final leg of the trip.

**A few tips for your trip:**
*   **Traffic:** Try to time your arrival into Los Angeles to avoid rush hour (7–10 AM or 3–7 PM). If you hit the LA freeway system during those times, your trip could easily double in length.
*   **Direction:** Driving North-to-South (SF to LA) is actually better for the scenic route because you are in the lane closest to the ocean, making it easier to pull over into lookout points.

**Do you have a specific number of days in mind for the trip, or are you looking for a particular vibe (e.g., foodie spots, nature, or shopping)?**

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "To give you the best recommendations, it helps to know which route you plan to take. There are two primary ways to drive from San Francisco to LA:\n\n### 1. The Scenic Route: Highway 1 (Pacific Coast Highway)\nThis is the \"bucket list\" drive. It takes **8–10+ hours of pure driving time**, so it’s best done over 2–3 days. If you have the time, this is the way to go.\n\n*   **Santa Cruz:** A classic surf town with a vintage boardwalk and amusement park.\n*   **Monterey & Carmel-by-the-Sea:** Visit the famous Monterey Bay Aquarium, then drive the **17-Mile Drive** into the fairytale-like village of Carmel.\n*   **Big Sur:** The crown jewel of the trip. Stop at **Bixby Creek Bridge** for photos and **Pfeiffer Big Sur State Park** for redwoods. \n    *   *Note: Check Caltrans for road closures, as landslides occasionally affect parts of Highway 1.*\n*   **Hearst Castle (San Simeon):** A stunning, opulent estate built by William Randolph Hearst. Be sure to stop at the nearby **Elephant Seal Vista Point** to see hundreds of seals lounging on the beach.\n*   **San Luis Obispo & Pismo Beach:** Great spots for a lunch break. If you like wine, detour slightly inland to the **Paso Robles** wine region.\n*   **Santa Barbara:** Known as the \"American Riviera,\" it has beautiful Spanish architecture, great seafood on the pier, and excellent shopping.\n\n---\n\n### 2. The Efficient Route: I-5\nIf you need to get to LA quickly (5–6 hours), you’ll take I-5. It is mostly farmland and not particularly scenic, but there are a few interesting pit stops:\n\n*   **Harris Ranch (Coalinga):** A famous halfway point. It’s a massive cattle ranch and steakhouse. You’ll smell it before you see it, but it’s a quintessential California road trip stop for a burger.\n*   **Tejon Outlets:** Located near the bottom of the Grapevine (the mountain pass into LA), it’s a good place to stretch your legs and do some shopping before hitting the LA traffic.\n*   **Valencia/Magic Mountain:** If you’re a thrill-seeker, Six Flags Magic Mountain is right off the freeway just as you enter the LA area.\n\n---\n\n### A \"Hybrid\" Option (The Best of Both Worlds)\nIf you want some scenery without committing to the full winding coastal road, do this:\n1.  Take **US-101 South** out of San Francisco.\n2.  Stop in **San Luis Obispo**.\n3.  Cut over to the coast to drive through **Santa Barbara** and **Malibu** as you enter Los Angeles. This avoids the slowest parts of the central coast while still giving you that beautiful Pacific ocean view for the final leg of the trip.\n\n**A few tips for your trip:**\n*   **Traffic:** Try to time your arrival into Los Angeles to avoid rush hour (7–10 AM or 3–7 PM). If you hit the LA freeway system during those times, your trip could easily double in length.\n*   **Direction:** Driving North-to-South (SF to LA) is actually better for the scenic route because you are in the lane closest to the ocean, making it easier to pull over into lookout points.\n\n**Do you have a specific number of days in mind for the trip, or are you looking for a particular vibe (e.g., foodie spots, nature, or shopping)?**",
            "thoughtSignature": "AY89a1+DkEptfX85ePwyRFYqv6jZiAGO5Z7gzH3IQR8a6+hYSOlBbY9Ho3m/LdqNW6M="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 64,
    "candidatesTokenCount": 778,
    "totalTokenCount": 842,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 64
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 778
      }
    ]
  },
  "modelVersion": "gemini-3.1-flash-lite",
  "createTime": "2026-07-21T16:29:09.152935Z",
  "responseId": "VZ5faueqCc3M8sYPy9OuKQ",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Creative Writing** — Higher temperature for creative output

```ts
const response = await env.AI.run(
  'google/gemini-3.1-flash-lite',
  {
    contents: [
      {
        parts: [{ text: 'Write a short story opening about a detective finding an unusual clue.' }],
        role: 'user',
      },
    ],
    generationConfig: { maxOutputTokens: 1500, temperature: 0.8 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.1-flash-lite",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "Write a short story opening about a detective finding an unusual clue."
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 1500,
      "temperature": 0.8
    }
  }
}'
```

The rain hammered against the window of the brownstone, a frantic, rhythmic drumming that did little to drown out the silence of the crime scene. Detective Elias Thorne knelt on the hardwood floor, his knees popping in the quiet room.

The victim, a reclusive clockmaker, lay sprawled near his workbench, but Thorne’s eyes weren't on the body. They were fixed on the center of the Persian rug, where a single, pristine object sat undisturbed by the violence that had clearly unfolded here.

It was a porcelain teacup, filled to the brim with fine, dry sand.

Thorne reached out with a gloved hand, careful not to disturb the delicate china. As he leaned closer, he saw something that made the hair on his neck prickle. Suspended in the center of the sand, perfectly vertical and defying the laws of gravity, was a single, iridescent blue feather. It wasn't resting on the surface; it was anchored deep within, as if the sand had been poured around it while it stood upright.

He clicked his flashlight on, the beam cutting through the gloom. As the light hit the feather, the sand didn't just glitter—it began to flow, like a slow-motion whirlpool, spiraling toward the base of the cup without ever spilling over the rim.

"Well," Thorne whispered to the empty room, his breath hitching in his chest. "That’s not how physics works."

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "The rain hammered against the window of the brownstone, a frantic, rhythmic drumming that did little to drown out the silence of the crime scene. Detective Elias Thorne knelt on the hardwood floor, his knees popping in the quiet room. \n\nThe victim, a reclusive clockmaker, lay sprawled near his workbench, but Thorne’s eyes weren't on the body. They were fixed on the center of the Persian rug, where a single, pristine object sat undisturbed by the violence that had clearly unfolded here.\n\nIt was a porcelain teacup, filled to the brim with fine, dry sand. \n\nThorne reached out with a gloved hand, careful not to disturb the delicate china. As he leaned closer, he saw something that made the hair on his neck prickle. Suspended in the center of the sand, perfectly vertical and defying the laws of gravity, was a single, iridescent blue feather. It wasn't resting on the surface; it was anchored deep within, as if the sand had been poured around it while it stood upright.\n\nHe clicked his flashlight on, the beam cutting through the gloom. As the light hit the feather, the sand didn't just glitter—it began to flow, like a slow-motion whirlpool, spiraling toward the base of the cup without ever spilling over the rim. \n\n\"Well,\" Thorne whispered to the empty room, his breath hitching in his chest. \"That’s not how physics works.\"",
            "thoughtSignature": "AY89a1/6wTGp3Yq8GtD5KlCLzP3qfjfpyt5QrXvsDKNbS4FR2jBPXckbTU1JKLs3JRY="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 13,
    "candidatesTokenCount": 300,
    "totalTokenCount": 313,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 13
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 300
      }
    ]
  },
  "modelVersion": "gemini-3.1-flash-lite",
  "createTime": "2026-07-21T16:29:13.373559Z",
  "responseId": "WZ5farfmFuDa8sYPwZ-jsAU",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

Schema variant

Generate ContentChat Completions

▶contents\[\]

`array`required

▶systemInstruction{}

`object`

▶generationConfig{}

`object`

▶safetySettings\[\]

`array`

▶tools\[\]

`array`

toolConfig

``

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

▶candidates\[\]

`array`

▶usageMetadata{}

`object`

modelVersion

`string`

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-lite/#page","headline":"Gemini 3.1 Flash Lite (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's lightest and most cost-efficient Gemini model for high-throughput tasks.","url":"https://developers.cloudflare.com/ai/models/google/gemini-3.1-flash-lite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
