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

* [ TypeScript ](#tab-panel-472)
* [ cURL ](#tab-panel-473)

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

* [ Output ](#tab-panel-478)
* [ Raw response ](#tab-panel-479)

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

        "parts": [

          {

            "text": "The three laws of thermodynamics (plus the \"zeroth\" law, which was defined later but is foundational) describe how energy moves and transforms within physical systems.\n\nHere is a breakdown of the laws:\n\n### 0. The Zeroth Law (The Law of Equilibrium)\n**\"If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.\"**\n*   **What it means:** This law essentially defines the concept of **temperature**. It allows us to use thermometers; if a thermometer reads the same temperature when placed in two different containers of water, we know the water in both containers is at the same temperature, even if they aren't touching.\n\n### 1. The First Law (The Law of Conservation of Energy)\n**\"Energy cannot be created or destroyed, only transformed from one form to another.\"**\n*   **What it means:** The total energy of an isolated system remains constant. You can change energy from heat to work (or vice versa), but you cannot get \"something for nothing.\" If you put a certain amount of energy into a system, you will get that same amount back out in some form (like heat or motion), unless some is lost to the environment.\n\n### 2. The Second Law (The Law of Entropy)\n**\"The entropy of an isolated system will always increase over time; it can never decrease.\"**\n*   **What it means:** This law introduces the concept of **entropy**, which is often described as a measure of disorder or randomness. It states that energy naturally spreads out and becomes less useful over time. Heat will always flow spontaneously from a hot object to a cold object, never the other way around. This is why perpetual motion machines are impossible and why time feels like it has a \"direction\" (the arrow of time).\n\n### 3. The Third Law (The Law of Absolute Zero)\n**\"As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.\"**\n*   **What it means:** It is impossible to reach absolute zero through any finite number of physical processes. As a system gets colder, its particles lose energy and move less, eventually reaching a state of minimum possible motion and perfect order (a perfect crystal structure). Because you can never extract all the energy from a system, you can never reach absolute zero.\n\n***\n\n### Summary\n*   **0th Law:** You have to play by the rules of temperature (equilibrium).\n*   **1st Law:** You can't win (you can't create energy).\n*   **2nd Law:** You can't even break even (you always lose some energy to entropy).\n*   **3rd Law:** You can't get out of the game (you can't reach absolute zero).",

            "thoughtSignature": "AY89a18/qrzuCK5CIDaOYqC1wX01eZUMGTdZMAh65fcN1mR4la5a1PFsdF4H9pnJ50w="

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-17T05:56:31.311694Z",

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "responseId": "j8vhaY6DE6yQq8YPhOuliQs",

  "usageMetadata": {

    "candidatesTokenCount": 589,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 589

      }

    ],

    "promptTokenCount": 8,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 8

      }

    ],

    "totalTokenCount": 597,

    "trafficType": "ON_DEMAND"

  }

}


```

## Examples

**With System Instruction**  — Using a system instruction to set context 

* [ TypeScript ](#tab-panel-474)
* [ cURL ](#tab-panel-475)

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

* [ Output ](#tab-panel-480)
* [ Raw response ](#tab-panel-481)

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

        "parts": [

          {

            "text": "To read a JSON file in Python, you use the built-in `json` module.\n\nHere is the standard way to do it:\n\n### 1. The Basic Approach\nUse the `open()` function to open the file and `json.load()` to parse it into a Python dictionary or list.\n\n```python\nimport json\n\n# Open the file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary or list\nprint(data)\n```\n\n### Key details:\n*   **`with open(...)`**: This is a \"context manager.\" It is best practice because it ensures the file is automatically closed after you are done reading it, even if an error occurs.\n*   **`json.load()`**: This function takes the file object and converts the JSON data into the corresponding Python object (e.g., `{}` becomes a `dict`, `[]` becomes a `list`, `true` becomes `True`).\n\n---\n\n### 2. Handling Errors (Best Practice)\nIf the file might not exist or the JSON might be malformed, it is good practice to add error handling:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\n```\n\n---\n\n### 3. What if you have a JSON string instead of a file?\nIf you already have the JSON data stored in a variable (as a string) rather than in a file, use `json.loads()` (the \"s\" stands for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data[\"name\"])  # Output: Alice\n```\n\n### Summary:\n*   Use **`json.load(file_object)`** to read from a **file**.\n*   Use **`json.loads(string)`** to read from a **string**.",

            "thoughtSignature": "AY89a1+QCQyLEPmRYl+2AVmXHaIx0o+LPUSsAf95sDbX+GN5Rb8WyV+hgYbfVxXFwDQ="

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-17T05:56:31.695319Z",

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "responseId": "j8vhaZe4Kuyeq8YPgY-7yQ8",

  "usageMetadata": {

    "candidatesTokenCount": 478,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 478

      }

    ],

    "promptTokenCount": 20,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 20

      }

    ],

    "totalTokenCount": 498,

    "trafficType": "ON_DEMAND"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-482)
* [ cURL ](#tab-panel-483)

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

            "text": "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"

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

* [ Output ](#tab-panel-484)
* [ Raw response ](#tab-panel-485)

The best way to drive from San Francisco to Los Angeles is to take **Highway 1 (the Pacific Coast Highway)**. While it takes significantly longer than I-5 (the inland route), it is one of the most beautiful drives in the world.

To make the most of it, I recommend a **two-day trip**. Here are the essential stops, organized from North to South:

### 1. Santa Cruz
*   **The Vibe:** Classic California surf culture.
*   **What to do:** Walk the historic **Santa Cruz Beach Boardwalk**, see the surfers at Steamer Lane, or hike through the redwoods at Henry Cowell Redwoods State Park.

### 2. Monterey & Carmel-by-the-Sea
*   **The Vibe:** Upscale coastal elegance.
*   **What to do:** Visit the world-famous **Monterey Bay Aquarium**, drive the scenic **17-Mile Drive** (famous for the Lone Cypress tree), and explore the charming fairy-tale cottages of Carmel.

### 3. Big Sur (The Highlight)
*   **The Vibe:** Dramatic cliffs meeting the Pacific Ocean.
*   **Note:** Always check [Caltrans](https://roads.dot.ca.gov/) for road closures before you go; parts of Highway 1 occasionally close due to slides.
*   **What to do:** 
    *   **Bixby Creek Bridge:** One of the most photographed bridges in the world.
    *   **Pfeiffer Big Sur State Park:** Great for quick hikes under giant redwoods.
    *   **McWay Falls:** A stunning waterfall that drops directly onto a pristine beach.

### 4. San Simeon & Cambria
*   **The Vibe:** History and wildlife.
*   **What to do:** 
    *   **Hearst Castle:** The opulent hilltop estate of William Randolph Hearst (book tickets in advance).
    *   **Elephant Seal Vista Point:** Just north of the castle, you can see hundreds of elephant seals lounging on the beach—it’s free and very entertaining.

### 5. San Luis Obispo (SLO) & Pismo Beach
*   **The Vibe:** Vibrant college town and classic beach fun.
*   **What to do:** SLO has a great downtown area and the famous "Bubblegum Alley." If you’re hungry, grab a tri-tip sandwich at **Firestone Grill**. If you want a photo op, head to the Pismo Beach Pier.

### 6. Santa Barbara
*   **The Vibe:** Mediterranean architecture and high-end relaxation.
*   **What to do:** Visit the **Old Mission Santa Barbara**, walk the **Stearns Wharf**, or head to the "Funk Zone" for wine tasting and local art galleries.

---

### Pro-Tips for your trip:
*   **Direction Matters:** Driving North to South is better for views because you are in the lane closest to the ocean, making it much easier to pull over into scenic overlooks.
*   **Gas Up:** Fill your tank before entering Big Sur. Gas stations there are extremely sparse and can cost twice as much as in the city.
*   **Cell Service:** Expect to lose cell service for long stretches through Big Sur. Download offline maps (Google Maps) before you leave.

**How many days are you planning to dedicate to the drive?** If you tell me your timeframe, I can help you draft a specific itinerary!

```

{

  "candidates": [

    {

      "content": {

        "parts": [

          {

            "text": "The best way to drive from San Francisco to Los Angeles is to take **Highway 1 (the Pacific Coast Highway)**. While it takes significantly longer than I-5 (the inland route), it is one of the most beautiful drives in the world.\n\nTo make the most of it, I recommend a **two-day trip**. Here are the essential stops, organized from North to South:\n\n### 1. Santa Cruz\n*   **The Vibe:** Classic California surf culture.\n*   **What to do:** Walk the historic **Santa Cruz Beach Boardwalk**, see the surfers at Steamer Lane, or hike through the redwoods at Henry Cowell Redwoods State Park.\n\n### 2. Monterey & Carmel-by-the-Sea\n*   **The Vibe:** Upscale coastal elegance.\n*   **What to do:** Visit the world-famous **Monterey Bay Aquarium**, drive the scenic **17-Mile Drive** (famous for the Lone Cypress tree), and explore the charming fairy-tale cottages of Carmel.\n\n### 3. Big Sur (The Highlight)\n*   **The Vibe:** Dramatic cliffs meeting the Pacific Ocean.\n*   **Note:** Always check [Caltrans](https://roads.dot.ca.gov/) for road closures before you go; parts of Highway 1 occasionally close due to slides.\n*   **What to do:** \n    *   **Bixby Creek Bridge:** One of the most photographed bridges in the world.\n    *   **Pfeiffer Big Sur State Park:** Great for quick hikes under giant redwoods.\n    *   **McWay Falls:** A stunning waterfall that drops directly onto a pristine beach.\n\n### 4. San Simeon & Cambria\n*   **The Vibe:** History and wildlife.\n*   **What to do:** \n    *   **Hearst Castle:** The opulent hilltop estate of William Randolph Hearst (book tickets in advance).\n    *   **Elephant Seal Vista Point:** Just north of the castle, you can see hundreds of elephant seals lounging on the beach—it’s free and very entertaining.\n\n### 5. San Luis Obispo (SLO) & Pismo Beach\n*   **The Vibe:** Vibrant college town and classic beach fun.\n*   **What to do:** SLO has a great downtown area and the famous \"Bubblegum Alley.\" If you’re hungry, grab a tri-tip sandwich at **Firestone Grill**. If you want a photo op, head to the Pismo Beach Pier.\n\n### 6. Santa Barbara\n*   **The Vibe:** Mediterranean architecture and high-end relaxation.\n*   **What to do:** Visit the **Old Mission Santa Barbara**, walk the **Stearns Wharf**, or head to the \"Funk Zone\" for wine tasting and local art galleries.\n\n---\n\n### Pro-Tips for your trip:\n*   **Direction Matters:** Driving North to South is better for views because you are in the lane closest to the ocean, making it much easier to pull over into scenic overlooks.\n*   **Gas Up:** Fill your tank before entering Big Sur. Gas stations there are extremely sparse and can cost twice as much as in the city.\n*   **Cell Service:** Expect to lose cell service for long stretches through Big Sur. Download offline maps (Google Maps) before you leave.\n\n**How many days are you planning to dedicate to the drive?** If you tell me your timeframe, I can help you draft a specific itinerary!",

            "thoughtSignature": "AY89a19tNFykym7KHaZLthPWb1ZEsEjSDgSghQU80r45l+BVd0pYLlDu9m7087caZko="

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T23:58:11.349365Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "responseId": "k0nxabWpFcSeq8YP77OduQk",

  "usageMetadata": {

    "candidatesTokenCount": 733,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 733

      }

    ],

    "promptTokenCount": 64,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 64

      }

    ],

    "totalTokenCount": 797,

    "trafficType": "ON_DEMAND"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-476)
* [ cURL ](#tab-panel-477)

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

* [ Output ](#tab-panel-486)
* [ Raw response ](#tab-panel-487)

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

        "parts": [

          {

            "text": "The rain drummed a frantic rhythm against the windowpane of the derelict apartment, but Detective Elias Thorne didn’t hear it. He was staring at the center of the dust-choked rug, where the victim had supposedly spent his final moments.\n\nThere was no blood. There were no shell casings. There was only a single, perfectly preserved sprig of lavender resting on the floorboards.\n\nThorne knelt, his knees popping in the silence, and pulled a pair of latex gloves from his pocket. As he leaned in, the scent hit him—not the stale, metallic smell of death he had expected, but a sharp, clinical floral aroma that felt entirely out of place in a room smelling of rot and damp wallpaper. \n\nHe reached out with his tweezers to bag the evidence, but stopped cold. The lavender wasn't just lying on the wood; it was pulsing. A faint, rhythmic bioluminescence ebbed from the petals, casting a soft, rhythmic violet glow against the floorboards. It was breathing in sync with his own heartbeat.\n\nThorne pulled his hand back, his pulse quickening. He had been a homicide detective for twenty years, and he knew that dead men didn't leave behind flowers that remembered how to live.",

            "thoughtSignature": "AY89a1+eXS7mOv1k0+/v1b+BiI4lvuku7YD6rc6ahAuTpH0CIsazBf70N9Q9YTPsq9k="

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-17T05:56:34.799909Z",

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "modelVersion": "gemini-3.1-flash-lite-preview",

  "responseId": "ksvhaaXpMIGPq8YPsdmS-Qc",

  "usageMetadata": {

    "candidatesTokenCount": 256,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 256

      }

    ],

    "promptTokenCount": 13,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 13

      }

    ],

    "totalTokenCount": 269,

    "trafficType": "ON_DEMAND"

  }

}


```

## Parameters

* [ Input ](#tab-panel-488)
* [ Output ](#tab-panel-489)

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
