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

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-flash-lite',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'What are the three laws of thermodynamics?',

          },

        ],

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-180)
* [ Raw response ](#tab-panel-181)

The three laws of thermodynamics (plus the "zeroth" law, which was defined later but is foundational) describe how energy moves and transforms within physical systems.

Here is a breakdown of the laws:

### 0. The Zeroth Law (The Law of Equilibrium)
**"If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other."**
*   **What it means:** This law essentially defines the concept of **temperature**. It allows us to use thermometers; if a thermometer reads the same temperature when placed in two different containers of water, we know the water in both containers is at the same temperature, even if they aren't touching.

### 1. The First Law (The Law of Conservation of Energy)
**"Energy cannot be created or destroyed, only transformed from one form to another."**
*   **What it means:** The total energy of an isolated system remains constant. You can change energy from heat to work (or vice versa), but you cannot get "something for nothing." If you put a certain amount of energy into a system, you will get that same amount back out in some form (like heat or motion), unless some is lost to the environment.

### 2. The Second Law (The Law of Entropy)
**"The entropy of an isolated system will always increase over time; it can never decrease."**
*   **What it means:** This law introduces the concept of **entropy**, which is often described as a measure of disorder or randomness. It states that energy naturally spreads out and becomes less useful over time. Heat will always flow spontaneously from a hot object to a cold object, never the other way around. This is why perpetual motion machines are impossible and why time feels like it has a "direction" (the arrow of time).

### 3. The Third Law (The Law of Absolute Zero)
**"As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero."**
*   **What it means:** It is impossible to reach absolute zero through any finite number of physical processes. As a system gets colder, its particles lose energy and move less, eventually reaching a state of minimum possible motion and perfect order (a perfect crystal structure). Because you can never extract all the energy from a system, you can never reach absolute zero.

***

### Summary
*   **0th Law:** You have to play by the rules of temperature (equilibrium).
*   **1st Law:** You can't win (you can't create energy).
*   **2nd Law:** You can't even break even (you always lose some energy to entropy).
*   **3rd Law:** You can't get out of the game (you can't reach absolute zero).

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "The three laws of thermodynamics (plus the \"zeroth\" law, which was defined later but is foundational) describe how energy moves and transforms within physical systems.\n\nHere is a breakdown of the laws:\n\n### 0. The Zeroth Law (The Law of Equilibrium)\n**\"If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.\"**\n*   **What it means:** This law essentially defines the concept of **temperature**. It allows us to use thermometers; if a thermometer reads the same temperature when placed in two different containers of water, we know the water in both containers is at the same temperature, even if they aren't touching.\n\n### 1. The First Law (The Law of Conservation of Energy)\n**\"Energy cannot be created or destroyed, only transformed from one form to another.\"**\n*   **What it means:** The total energy of an isolated system remains constant. You can change energy from heat to work (or vice versa), but you cannot get \"something for nothing.\" If you put a certain amount of energy into a system, you will get that same amount back out in some form (like heat or motion), unless some is lost to the environment.\n\n### 2. The Second Law (The Law of Entropy)\n**\"The entropy of an isolated system will always increase over time; it can never decrease.\"**\n*   **What it means:** This law introduces the concept of **entropy**, which is often described as a measure of disorder or randomness. It states that energy naturally spreads out and becomes less useful over time. Heat will always flow spontaneously from a hot object to a cold object, never the other way around. This is why perpetual motion machines are impossible and why time feels like it has a \"direction\" (the arrow of time).\n\n### 3. The Third Law (The Law of Absolute Zero)\n**\"As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.\"**\n*   **What it means:** It is impossible to reach absolute zero through any finite number of physical processes. As a system gets colder, its particles lose energy and move less, eventually reaching a state of minimum possible motion and perfect order (a perfect crystal structure). Because you can never extract all the energy from a system, you can never reach absolute zero.\n\n***\n\n### Summary\n*   **0th Law:** You have to play by the rules of temperature (equilibrium).\n*   **1st Law:** You can't win (you can't create energy).\n*   **2nd Law:** You can't even break even (you always lose some energy to entropy).\n*   **3rd Law:** You can't get out of the game (you can't reach absolute zero).",

            "thoughtSignature": "AY89a18/qrzuCK5CIDaOYqC1wX01eZUMGTdZMAh65fcN1mR4la5a1PFsdF4H9pnJ50w="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 8,

    "candidatesTokenCount": 589,

    "totalTokenCount": 597,

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

        "tokenCount": 589

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-04-17T05:56:31.311694Z",

  "responseId": "j8vhaY6DE6yQq8YPhOuliQs",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**With System Instruction**  — Using a system instruction to set context 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-flash-lite',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'How do I read a JSON file in Python?',

          },

        ],

      },

    ],

    systemInstruction: {

      parts: [

        {

          text: 'You are a helpful coding assistant specializing in Python.',

        },

      ],

    },

    generationConfig: {

      temperature: 0.3,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-182)
* [ Raw response ](#tab-panel-183)

To read a JSON file in Python, you use the built-in `json` module.

Here is the standard way to do it:

### 1. The Basic Approach
Use the `open()` function to open the file and `json.load()` to parse it into a Python dictionary or list.

```python
import json

# Open the file
with open('data.json', 'r') as file:
    data = json.load(file)

# Now 'data' is a Python dictionary or list
print(data)
```

### Key details:
*   **`with open(...)`**: This is a "context manager." It is best practice because it ensures the file is automatically closed after you are done reading it, even if an error occurs.
*   **`json.load()`**: This function takes the file object and converts the JSON data into the corresponding Python object (e.g., `{}` becomes a `dict`, `[]` becomes a `list`, `true` becomes `True`).

---

### 2. Handling Errors (Best Practice)
If the file might not exist or the JSON might be malformed, it is good practice to add error handling:

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("The file was not found.")
except json.JSONDecodeError:
    print("The file contains invalid JSON.")
```

---

### 3. What if you have a JSON string instead of a file?
If you already have the JSON data stored in a variable (as a string) rather than in a file, use `json.loads()` (the "s" stands for "string"):

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data["name"])  # Output: Alice
```

### Summary:
*   Use **`json.load(file_object)`** to read from a **file**.
*   Use **`json.loads(string)`** to read from a **string**.

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "To read a JSON file in Python, you use the built-in `json` module.\n\nHere is the standard way to do it:\n\n### 1. The Basic Approach\nUse the `open()` function to open the file and `json.load()` to parse it into a Python dictionary or list.\n\n```python\nimport json\n\n# Open the file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary or list\nprint(data)\n```\n\n### Key details:\n*   **`with open(...)`**: This is a \"context manager.\" It is best practice because it ensures the file is automatically closed after you are done reading it, even if an error occurs.\n*   **`json.load()`**: This function takes the file object and converts the JSON data into the corresponding Python object (e.g., `{}` becomes a `dict`, `[]` becomes a `list`, `true` becomes `True`).\n\n---\n\n### 2. Handling Errors (Best Practice)\nIf the file might not exist or the JSON might be malformed, it is good practice to add error handling:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\n```\n\n---\n\n### 3. What if you have a JSON string instead of a file?\nIf you already have the JSON data stored in a variable (as a string) rather than in a file, use `json.loads()` (the \"s\" stands for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data[\"name\"])  # Output: Alice\n```\n\n### Summary:\n*   Use **`json.load(file_object)`** to read from a **file**.\n*   Use **`json.loads(string)`** to read from a **string**.",

            "thoughtSignature": "AY89a1+QCQyLEPmRYl+2AVmXHaIx0o+LPUSsAf95sDbX+GN5Rb8WyV+hgYbfVxXFwDQ="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 20,

    "candidatesTokenCount": 478,

    "totalTokenCount": 498,

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

        "tokenCount": 478

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-04-17T05:56:31.695319Z",

  "responseId": "j8vhaZe4Kuyeq8YPgY-7yQ8",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-flash-lite',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'I need help planning a road trip from San Francisco to Los Angeles.',

          },

        ],

      },

      {

        role: 'model',

        parts: [

          {

            text: "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

          },

        ],

      },

      {

        role: 'user',

        parts: [

          {

            text: 'Yes, what are some good places to stop?',

          },

        ],

      },

    ],

    generationConfig: {

      maxOutputTokens: 500,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

```

{

  "candidates": [

    {

      "content": {

        "role": "model"

      },

      "finishReason": "MAX_TOKENS"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 64,

    "candidatesTokenCount": 496,

    "totalTokenCount": 560,

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

        "tokenCount": 496

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-04-17T05:56:34.641767Z",

  "responseId": "ksvhaeeVJ6CIq8YPzKOY8Qk",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-flash-lite',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'Write a short story opening about a detective finding an unusual clue.',

          },

        ],

      },

    ],

    generationConfig: {

      temperature: 0.8,

      maxOutputTokens: 300,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-184)
* [ Raw response ](#tab-panel-185)

The rain drummed a frantic rhythm against the windowpane of the derelict apartment, but Detective Elias Thorne didn’t hear it. He was staring at the center of the dust-choked rug, where the victim had supposedly spent his final moments.

There was no blood. There were no shell casings. There was only a single, perfectly preserved sprig of lavender resting on the floorboards.

Thorne knelt, his knees popping in the silence, and pulled a pair of latex gloves from his pocket. As he leaned in, the scent hit him—not the stale, metallic smell of death he had expected, but a sharp, clinical floral aroma that felt entirely out of place in a room smelling of rot and damp wallpaper. 

He reached out with his tweezers to bag the evidence, but stopped cold. The lavender wasn't just lying on the wood; it was pulsing. A faint, rhythmic bioluminescence ebbed from the petals, casting a soft, rhythmic violet glow against the floorboards. It was breathing in sync with his own heartbeat.

Thorne pulled his hand back, his pulse quickening. He had been a homicide detective for twenty years, and he knew that dead men didn't leave behind flowers that remembered how to live.

```

{

  "candidates": [

    {

      "content": {

        "role": "model",

        "parts": [

          {

            "text": "The rain drummed a frantic rhythm against the windowpane of the derelict apartment, but Detective Elias Thorne didn’t hear it. He was staring at the center of the dust-choked rug, where the victim had supposedly spent his final moments.\n\nThere was no blood. There were no shell casings. There was only a single, perfectly preserved sprig of lavender resting on the floorboards.\n\nThorne knelt, his knees popping in the silence, and pulled a pair of latex gloves from his pocket. As he leaned in, the scent hit him—not the stale, metallic smell of death he had expected, but a sharp, clinical floral aroma that felt entirely out of place in a room smelling of rot and damp wallpaper. \n\nHe reached out with his tweezers to bag the evidence, but stopped cold. The lavender wasn't just lying on the wood; it was pulsing. A faint, rhythmic bioluminescence ebbed from the petals, casting a soft, rhythmic violet glow against the floorboards. It was breathing in sync with his own heartbeat.\n\nThorne pulled his hand back, his pulse quickening. He had been a homicide detective for twenty years, and he knew that dead men didn't leave behind flowers that remembered how to live.",

            "thoughtSignature": "AY89a1+eXS7mOv1k0+/v1b+BiI4lvuku7YD6rc6ahAuTpH0CIsazBf70N9Q9YTPsq9k="

          }

        ]

      },

      "finishReason": "STOP"

    }

  ],

  "usageMetadata": {

    "promptTokenCount": 13,

    "candidatesTokenCount": 256,

    "totalTokenCount": 269,

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

        "tokenCount": 256

      }

    ]

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "createTime": "2026-04-17T05:56:34.799909Z",

  "responseId": "ksvhaaXpMIGPq8YPsdmS-Qc",

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-186)
* [ Output ](#tab-panel-187)

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

▶candidates\[\]

`array`

▶usageMetadata{}

`object`

modelVersion

`string`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
