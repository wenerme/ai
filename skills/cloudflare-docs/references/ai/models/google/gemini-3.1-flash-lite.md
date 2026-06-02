---
title: Gemini 3.1 Flash Lite
description: Google's lightest and most cost-efficient Gemini model for high-throughput tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 3.1 Flash Lite 

Text Generation • Google • Proxied 

`google/gemini-3.1-flash-lite` 

Google's lightest and most cost-efficient Gemini model for high-throughput tasks.

| Model Info                                                                 |                                                                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                               |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                               |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/)                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.1-flash-lite) |

## Usage

* [ TypeScript ](#tab-panel-490)
* [ cURL ](#tab-panel-491)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-flash-lite',

  { contents: [{ parts: [{ text: 'What are the three laws of thermodynamics?' }], role: 'user' }] },

)

console.log(response)


```

Terminal window

```

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

* [ Output ](#tab-panel-496)
* [ Raw response ](#tab-panel-497)

The three laws of thermodynamics (plus the "zeroth" law, which was defined later) describe the fundamental rules governing energy, heat, and entropy in the universe.

Here is a breakdown of each:

### 0. The Zeroth Law (The Law of Equilibrium)
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.
*   **What it means:** This is the logical basis for temperature. It explains why thermometers work: if a thermometer reads the same temperature as object A, and the same temperature as object B, then object A and object B have the same temperature as each other.

### 1. The First Law (The Law of Conservation of Energy)
Energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.
*   **What it means:** You cannot get "something for nothing." If you want to increase the energy inside a system, you must add energy from the outside (by doing work on it or adding heat). Mathematically, it is often expressed as: **ΔU = Q - W** (The change in internal energy equals the heat added to the system minus the work done by the system).

### 2. The Second Law (The Law of Entropy)
The total entropy of an isolated system can never decrease over time; it can only remain constant or increase. 
*   **What it means:** Heat always flows spontaneously from a hotter object to a colder object, never the other way around. It also implies that "disorder" (entropy) in the universe is constantly increasing. This law effectively dictates the "arrow of time" and explains why perpetual motion machines are impossible: some energy is always lost to the environment as unusable heat.

### 3. The Third Law (The Law of Absolute Zero)
As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.
*   **What it means:** It is impossible to reach absolute zero in a finite number of steps. At absolute zero, all molecular motion would theoretically stop, and a perfectly ordered crystal would have no "randomness" or entropy. Because entropy can never be fully removed, you can get very close to absolute zero, but you can never actually reach it.

***

### Summary for easy remembering:
*   **Zeroth:** You have to play the game (temperature exists).
*   **First:** You can't win (you can't create energy).
*   **Second:** You can't break even (you can't get back as much energy as you put in; some is always lost).
*   **Third:** You can't leave the game (you can't reach absolute zero).

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "The three laws of thermodynamics (plus the \"zeroth\" law, which was defined later) describe the fundamental rules governing energy, heat, and entropy in the universe.\n\nHere is a breakdown of each:\n\n### 0. The Zeroth Law (The Law of Equilibrium)\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.\n*   **What it means:** This is the logical basis for temperature. It explains why thermometers work: if a thermometer reads the same temperature as object A, and the same temperature as object B, then object A and object B have the same temperature as each other.\n\n### 1. The First Law (The Law of Conservation of Energy)\nEnergy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.\n*   **What it means:** You cannot get \"something for nothing.\" If you want to increase the energy inside a system, you must add energy from the outside (by doing work on it or adding heat). Mathematically, it is often expressed as: **ΔU = Q - W** (The change in internal energy equals the heat added to the system minus the work done by the system).\n\n### 2. The Second Law (The Law of Entropy)\nThe total entropy of an isolated system can never decrease over time; it can only remain constant or increase. \n*   **What it means:** Heat always flows spontaneously from a hotter object to a colder object, never the other way around. It also implies that \"disorder\" (entropy) in the universe is constantly increasing. This law effectively dictates the \"arrow of time\" and explains why perpetual motion machines are impossible: some energy is always lost to the environment as unusable heat.\n\n### 3. The Third Law (The Law of Absolute Zero)\nAs the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.\n*   **What it means:** It is impossible to reach absolute zero in a finite number of steps. At absolute zero, all molecular motion would theoretically stop, and a perfectly ordered crystal would have no \"randomness\" or entropy. Because entropy can never be fully removed, you can get very close to absolute zero, but you can never actually reach it.\n\n***\n\n### Summary for easy remembering:\n*   **Zeroth:** You have to play the game (temperature exists).\n*   **First:** You can't win (you can't create energy).\n*   **Second:** You can't break even (you can't get back as much energy as you put in; some is always lost).\n*   **Third:** You can't leave the game (you can't reach absolute zero).",

            "thoughtSignature": "AY89a1/EHFiot4UXSeid202GCFEHyZa98rcGe1Gu+0O8+BEZz4yYyhqwk0jb/IjL11U="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 8,

    "candidatesTokenCount": 582,

    "totalTokenCount": 590,

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

        "tokenCount": 582

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-05-28T00:56:41.227568Z",

  "responseId": "yZIXavDxDfqE3dAP7f2X4Qo",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**With System Instruction**  — Using a system instruction to set context 

* [ TypeScript ](#tab-panel-492)
* [ cURL ](#tab-panel-493)

TypeScript

```

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

Terminal window

```

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

* [ Output ](#tab-panel-498)
* [ Raw response ](#tab-panel-499)

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
3.  **`json.load(file)`**: This function parses the file object and converts the JSON data into the corresponding Python object (e.g., a JSON object becomes a `dict`, a JSON array becomes a `list`).

---

### Common Scenarios

#### 1. What if the file is empty or malformed?
If the file is empty or contains invalid JSON, `json.load()` will raise a `json.JSONDecodeError`. You can handle this with a `try-except` block:

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except json.JSONDecodeError:
    print("The file contains invalid JSON.")
except FileNotFoundError:
    print("The file does not exist.")
```

#### 2. Reading a JSON string (instead of a file)
If you have the JSON data as a string variable rather than a file, use `json.loads()` (the "s" stands for "string"):

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data["name"])  # Output: Alice
```

### Summary: Which one to use?
*   Use **`json.load(file_object)`** when reading from a **file**.
*   Use **`json.loads(string)`** when reading from a **string**.

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "To read a JSON file in Python, you use the built-in `json` module.\n\nHere is the standard way to do it:\n\n### The Basic Approach\n```python\nimport json\n\n# Open the file and load the data\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary or list\nprint(data)\n```\n\n### Breakdown of the code:\n1.  **`import json`**: Imports Python's built-in library for handling JSON.\n2.  **`with open(...)`**: This is a \"context manager.\" It is the best practice because it ensures the file is automatically closed after you are done reading it, even if an error occurs.\n3.  **`json.load(file)`**: This function parses the file object and converts the JSON data into the corresponding Python object (e.g., a JSON object becomes a `dict`, a JSON array becomes a `list`).\n\n---\n\n### Common Scenarios\n\n#### 1. What if the file is empty or malformed?\nIf the file is empty or contains invalid JSON, `json.load()` will raise a `json.JSONDecodeError`. You can handle this with a `try-except` block:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\nexcept FileNotFoundError:\n    print(\"The file does not exist.\")\n```\n\n#### 2. Reading a JSON string (instead of a file)\nIf you have the JSON data as a string variable rather than a file, use `json.loads()` (the \"s\" stands for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data[\"name\"])  # Output: Alice\n```\n\n### Summary: Which one to use?\n*   Use **`json.load(file_object)`** when reading from a **file**.\n*   Use **`json.loads(string)`** when reading from a **string**.",

            "thoughtSignature": "AY89a19YeehPDK20Ix1JZMp7Y711rMQkP3i2gEgq6TQjivmc3a78w5LmaBP2PZS2AZM="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 20,

    "candidatesTokenCount": 493,

    "totalTokenCount": 513,

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

        "tokenCount": 493

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-05-28T00:56:44.293757Z",

  "responseId": "zJIXav32EfeY3dAPlp-m0AY",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-500)
* [ cURL ](#tab-panel-501)

TypeScript

```

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

Terminal window

```

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

* [ Output ](#tab-panel-502)
* [ Raw response ](#tab-panel-503)

To give you the best recommendations, it helps to know which route you plan to take. There are two primary ways to drive from San Francisco to Los Angeles:

### 1. The Pacific Coast Highway (Highway 1) – The Scenic Route
*   **Time:** 9–12 hours of driving (without stops). This is best done over **2–3 days**.
*   **Best for:** Views, photography, nature, and cute coastal towns.

**Top Stops:**
*   **Santa Cruz:** Grab a coffee, walk the famous Beach Boardwalk, or watch the surfers at Steamer Lane.
*   **Monterey/Carmel-by-the-Sea:** Visit the world-class Monterey Bay Aquarium and take the iconic "17-Mile Drive" through Pebble Beach. Carmel is perfect for a boutique lunch.
*   **Big Sur:** This is the highlight. Stop at **Bixby Creek Bridge** for the classic photo. If you have time, hike in **Pfeiffer Big Sur State Park** or see **McWay Falls** (a waterfall that drops onto the beach).
*   **San Simeon:** Visit **Hearst Castle** (book in advance!) and the nearby **Elephant Seal Vista Point** to see hundreds of seals lounging on the beach.
*   **San Luis Obispo / Pismo Beach:** A great spot to grab a tri-tip sandwich or walk out on the Pismo Pier.
*   **Santa Barbara:** Known as the "American Riviera." Walk State Street for shopping and dining, or visit the Old Mission Santa Barbara.

---

### 2. The I-5 Freeway – The "Get There Fast" Route
*   **Time:** 5–6 hours.
*   **Best for:** Efficiency. It is largely agricultural and flat, but there are a few unique spots to break up the monotony.

**Top Stops:**
*   **Harris Ranch (Coalinga):** The most famous stop on the I-5. It’s an enormous cattle ranch and restaurant known for their steaks. It’s the primary "pit stop" for most road trippers.
*   **The Grapevine:** As you descend toward LA, you’ll hit the "Grapevine" mountain pass. There are several scenic overlooks where you can see the Tejon Pass.
*   **Castaic/Valencia:** As you enter the LA basin, you’ll pass Six Flags Magic Mountain if you want a thrill-seeking break.

---

### Which one should you pick?
*   **Choose Highway 1 if:** You are on vacation, have at least two days, and want to see some of the most famous coastline in the world.
*   **Choose I-5 if:** You need to get to LA for an appointment, have limited time, or simply want the most direct route possible.

**Pro Tip:** If you take Highway 1, **check road conditions before you leave.** Big Sur is prone to landslides, and parts of the highway are occasionally closed for repairs.

**Are you planning to do this in one day or spread it out over a few?** I can help you build an itinerary based on your timeline!

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "To give you the best recommendations, it helps to know which route you plan to take. There are two primary ways to drive from San Francisco to Los Angeles:\n\n### 1. The Pacific Coast Highway (Highway 1) – The Scenic Route\n*   **Time:** 9–12 hours of driving (without stops). This is best done over **2–3 days**.\n*   **Best for:** Views, photography, nature, and cute coastal towns.\n\n**Top Stops:**\n*   **Santa Cruz:** Grab a coffee, walk the famous Beach Boardwalk, or watch the surfers at Steamer Lane.\n*   **Monterey/Carmel-by-the-Sea:** Visit the world-class Monterey Bay Aquarium and take the iconic \"17-Mile Drive\" through Pebble Beach. Carmel is perfect for a boutique lunch.\n*   **Big Sur:** This is the highlight. Stop at **Bixby Creek Bridge** for the classic photo. If you have time, hike in **Pfeiffer Big Sur State Park** or see **McWay Falls** (a waterfall that drops onto the beach).\n*   **San Simeon:** Visit **Hearst Castle** (book in advance!) and the nearby **Elephant Seal Vista Point** to see hundreds of seals lounging on the beach.\n*   **San Luis Obispo / Pismo Beach:** A great spot to grab a tri-tip sandwich or walk out on the Pismo Pier.\n*   **Santa Barbara:** Known as the \"American Riviera.\" Walk State Street for shopping and dining, or visit the Old Mission Santa Barbara.\n\n---\n\n### 2. The I-5 Freeway – The \"Get There Fast\" Route\n*   **Time:** 5–6 hours.\n*   **Best for:** Efficiency. It is largely agricultural and flat, but there are a few unique spots to break up the monotony.\n\n**Top Stops:**\n*   **Harris Ranch (Coalinga):** The most famous stop on the I-5. It’s an enormous cattle ranch and restaurant known for their steaks. It’s the primary \"pit stop\" for most road trippers.\n*   **The Grapevine:** As you descend toward LA, you’ll hit the \"Grapevine\" mountain pass. There are several scenic overlooks where you can see the Tejon Pass.\n*   **Castaic/Valencia:** As you enter the LA basin, you’ll pass Six Flags Magic Mountain if you want a thrill-seeking break.\n\n---\n\n### Which one should you pick?\n*   **Choose Highway 1 if:** You are on vacation, have at least two days, and want to see some of the most famous coastline in the world.\n*   **Choose I-5 if:** You need to get to LA for an appointment, have limited time, or simply want the most direct route possible.\n\n**Pro Tip:** If you take Highway 1, **check road conditions before you leave.** Big Sur is prone to landslides, and parts of the highway are occasionally closed for repairs.\n\n**Are you planning to do this in one day or spread it out over a few?** I can help you build an itinerary based on your timeline!",

            "thoughtSignature": "AY89a18J+OP94FihCOOSKOTP1/A3aj1DPFpKGlAu0M+6gC05cuBJdnWi+n4VC0J/O7s="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 64,

    "candidatesTokenCount": 669,

    "totalTokenCount": 733,

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

        "tokenCount": 669

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-05-28T00:56:47.115882Z",

  "responseId": "z5IXaqqJB4GR3dAP46nYuQ8",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-494)
* [ cURL ](#tab-panel-495)

TypeScript

```

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

Terminal window

```

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

* [ Output ](#tab-panel-504)
* [ Raw response ](#tab-panel-505)

The rain drummed a relentless, hollow rhythm against the skylight of the abandoned clock tower, but Elias Thorne didn’t hear it. He was too busy staring at the centerpiece of the crime scene.

The victim lay sprawled across the floorboards, exactly where the anonymous tip had promised, but it wasn't the body that made the breath hitch in Elias’s throat. Tucked neatly into the victim’s stiff, pale hand was a small, ornate music box—not the kind you’d find in a dusty antique shop, but one carved from a material that seemed to swallow the beam of his flashlight. 

Elias knelt, his joints popping in the quiet room. He reached out with a gloved finger to nudge the lid. As the mechanism clicked open, a melody drifted into the damp air—a discordant, shivering waltz that sounded less like a song and more like a warning. 

But it was what sat inside the velvet lining that turned his blood to ice: a perfectly preserved, human tooth, still damp, with a tiny, silver serial number etched into the enamel.

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "The rain drummed a relentless, hollow rhythm against the skylight of the abandoned clock tower, but Elias Thorne didn’t hear it. He was too busy staring at the centerpiece of the crime scene.\n\nThe victim lay sprawled across the floorboards, exactly where the anonymous tip had promised, but it wasn't the body that made the breath hitch in Elias’s throat. Tucked neatly into the victim’s stiff, pale hand was a small, ornate music box—not the kind you’d find in a dusty antique shop, but one carved from a material that seemed to swallow the beam of his flashlight. \n\nElias knelt, his joints popping in the quiet room. He reached out with a gloved finger to nudge the lid. As the mechanism clicked open, a melody drifted into the damp air—a discordant, shivering waltz that sounded less like a song and more like a warning. \n\nBut it was what sat inside the velvet lining that turned his blood to ice: a perfectly preserved, human tooth, still damp, with a tiny, silver serial number etched into the enamel.",

            "thoughtSignature": "AY89a1+efRG966PVAWsOCpYT3WsWbVd23ij9APAlGDpoQpVy3/vLRUmxGHuK6AsLd8I="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 13,

    "candidatesTokenCount": 226,

    "totalTokenCount": 239,

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

        "tokenCount": 226

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-05-28T00:56:50.984912Z",

  "responseId": "0pIXatCOPOCH3dAPs-CH0Ac",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-506)
* [ Output ](#tab-panel-507)

▶contents\[\]

`array`required

▶generationConfig{}

`object`

▶safetySettings\[\]

`array`

▶systemInstruction{}

`object`

toolConfig

``

▶tools\[\]

`array`

▶candidates\[\]

`array`

modelVersion

`string`

▶usageMetadata{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
