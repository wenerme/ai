---
description: Gemini 3 Flash is Google's fast multimodal model with frontier intelligence, superior search, and grounding capabilities.
title: Gemini 3 Flash
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 3 Flash

Text Generation • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-3-flash/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-3-flash`

* Third-party
* Zero data retention

Gemini 3 Flash is Google's fast multimodal model with frontier intelligence, superior search, and grounding capabilities.

| Model Info                                                                          |                                                                                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens                                                                                                        |
| Terms and License                                                                   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                        |
| More information                                                                    | [link ↗](https://deepmind.google/technologies/gemini/)                                                                  |
| Zero data retention                                                                 | Yes                                                                                                                     |
| Request formats                                                                     | Chat Completions                                                                                                        |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3-flash) |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-3-flash',
  { contents: [{ parts: [{ text: 'What are the three laws of thermodynamics?' }], role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3-flash",
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

While there are technically four laws (starting with the Zeroth Law), here are the **three primary laws of thermodynamics** that describe how energy, heat, and work behave in a system:

### 1. The First Law: The Law of Conservation of Energy
This law states that **energy cannot be created or destroyed, only transformed from one form to another.** The total energy in an isolated system remains constant.

*   **The Principle:** If you add heat to a system, that energy must go somewhere—it either increases the internal energy of the system (making it hotter) or it is used by the system to do work on its surroundings.
*   **The Equation:** $\Delta U = Q - W$
    *(Change in internal energy = Heat added to the system - Work done by the system)*
*   **Simple Takeaway:** You can't get something for nothing.

---

### 2. The Second Law: The Law of Entropy
This law states that the **total entropy (disorder) of an isolated system can never decrease over time.** It explains the "arrow of time" and why certain processes are irreversible.

*   **The Principle:** Heat will naturally flow from a hotter object to a colder object, never spontaneously the other way. In any energy transfer, some energy is always "lost" as waste heat, meaning no machine can ever be 100% efficient.
*   **The Result:** Systems naturally move toward a state of maximum disorder or randomness.
*   **Simple Takeaway:** Things tend to get messy, and you can't even break even (because you always lose some energy to friction/heat).

---

### 3. The Third Law: The Law of Absolute Zero
This law states that **as the temperature of a system approaches absolute zero (0 Kelvin or -273.15°C), the entropy of the system approaches a constant minimum.**

*   **The Principle:** In a "perfect crystal," the entropy at absolute zero would be exactly zero because all molecular motion would stop completely.
*   **The Catch:** It is physically impossible to reach absolute zero in a finite number of steps because as you get closer, it requires more and more work to remove the remaining heat.
*   **Simple Takeaway:** You can’t reach a state of zero energy/motion; you can’t quit the game.

***

### Summary (The "Ginsberg's Theorem" Mnemonic)
Scientists often use a humorous summary to remember these laws:
1.  **First Law:** You can't win (You can't get more energy out than you put in).
2.  **Second Law:** You can't break even (You always lose some energy as heat).
3.  **Third Law:** You can't get out of the game (You can never reach absolute zero).

***

**Note on the "Zeroth Law":**
There is also a **Zeroth Law**, which was identified after the first three but is more fundamental. It states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the law that allows us to use thermometers.

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "While there are technically four laws (starting with the Zeroth Law), here are the **three primary laws of thermodynamics** that describe how energy, heat, and work behave in a system:\n\n### 1. The First Law: The Law of Conservation of Energy\nThis law states that **energy cannot be created or destroyed, only transformed from one form to another.** The total energy in an isolated system remains constant.\n\n*   **The Principle:** If you add heat to a system, that energy must go somewhere—it either increases the internal energy of the system (making it hotter) or it is used by the system to do work on its surroundings.\n*   **The Equation:** $\\Delta U = Q - W$ \n    *(Change in internal energy = Heat added to the system - Work done by the system)*\n*   **Simple Takeaway:** You can't get something for nothing.\n\n---\n\n### 2. The Second Law: The Law of Entropy\nThis law states that the **total entropy (disorder) of an isolated system can never decrease over time.** It explains the \"arrow of time\" and why certain processes are irreversible.\n\n*   **The Principle:** Heat will naturally flow from a hotter object to a colder object, never spontaneously the other way. In any energy transfer, some energy is always \"lost\" as waste heat, meaning no machine can ever be 100% efficient.\n*   **The Result:** Systems naturally move toward a state of maximum disorder or randomness.\n*   **Simple Takeaway:** Things tend to get messy, and you can't even break even (because you always lose some energy to friction/heat).\n\n---\n\n### 3. The Third Law: The Law of Absolute Zero\nThis law states that **as the temperature of a system approaches absolute zero (0 Kelvin or -273.15°C), the entropy of the system approaches a constant minimum.**\n\n*   **The Principle:** In a \"perfect crystal,\" the entropy at absolute zero would be exactly zero because all molecular motion would stop completely.\n*   **The Catch:** It is physically impossible to reach absolute zero in a finite number of steps because as you get closer, it requires more and more work to remove the remaining heat.\n*   **Simple Takeaway:** You can’t reach a state of zero energy/motion; you can’t quit the game.\n\n***\n\n### Summary (The \"Ginsberg's Theorem\" Mnemonic)\nScientists often use a humorous summary to remember these laws:\n1.  **First Law:** You can't win (You can't get more energy out than you put in).\n2.  **Second Law:** You can't break even (You always lose some energy as heat).\n3.  **Third Law:** You can't get out of the game (You can never reach absolute zero).\n\n***\n\n**Note on the \"Zeroth Law\":** \nThere is also a **Zeroth Law**, which was identified after the first three but is more fundamental. It states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the law that allows us to use thermometers.",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 8,
    "candidatesTokenCount": 677,
    "totalTokenCount": 1132,
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
        "tokenCount": 677
      }
    ],
    "thoughtsTokenCount": 447
  },
  "modelVersion": "gemini-3-flash-preview",
  "createTime": "2026-07-14T02:14:06.911390Z",
  "responseId": "bptVap7QN-yN3dAPh4DzyAY",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**With System Instruction** — Using a system instruction to set context

```ts
const response = await env.AI.run(
  'google/gemini-3-flash',
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
  "model": "google/gemini-3-flash",
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

Here is the most common and recommended way to do it:

### Basic Example
```python
import json

# Open the file and load the data
with open('data.json', 'r') as file:
    data = json.load(file)

# Now 'data' is a Python dictionary or list
print(data)
```

---

### Key Details to Remember

#### 1. `json.load()` vs `json.loads()`
*   **`json.load(file_object)`**: Used to read data directly from a **file**.
*   **`json.loads(string)`**: Used to parse a **string** that contains JSON data (the "s" stands for "string").

#### 2. Using a Context Manager (`with`)
It is best practice to use the `with` statement. This ensures that the file is automatically closed as soon as the data is loaded, even if an error occurs during the process.

#### 3. Handling Encodings
If your JSON file contains special characters (like emojis or non-English characters), it is safer to specify the encoding:
```python
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

#### 4. Error Handling
If the file doesn't exist or the JSON is formatted incorrectly, your script will crash. You can wrap it in a `try-except` block to handle these cases gracefully:

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("The file was not found.")
except json.JSONDecodeError:
    print("The file is not a valid JSON format.")
```

### Summary Table
| Function | Input Source | Output |
| :--- | :--- | :--- |
| `json.load()` | File Object | Python Object (dict/list) |
| `json.loads()` | String | Python Object (dict/list) |
| `json.dump()` | Python Object | Write to File |
| `json.dumps()` | Python Object | Return as String |

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "To read a JSON file in Python, you use the built-in `json` module.\n\nHere is the most common and recommended way to do it:\n\n### Basic Example\n```python\nimport json\n\n# Open the file and load the data\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary or list\nprint(data)\n```\n\n---\n\n### Key Details to Remember\n\n#### 1. `json.load()` vs `json.loads()`\n*   **`json.load(file_object)`**: Used to read data directly from a **file**.\n*   **`json.loads(string)`**: Used to parse a **string** that contains JSON data (the \"s\" stands for \"string\").\n\n#### 2. Using a Context Manager (`with`)\nIt is best practice to use the `with` statement. This ensures that the file is automatically closed as soon as the data is loaded, even if an error occurs during the process.\n\n#### 3. Handling Encodings\nIf your JSON file contains special characters (like emojis or non-English characters), it is safer to specify the encoding:\n```python\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n#### 4. Error Handling\nIf the file doesn't exist or the JSON is formatted incorrectly, your script will crash. You can wrap it in a `try-except` block to handle these cases gracefully:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"The file is not a valid JSON format.\")\n```\n\n### Summary Table\n| Function | Input Source | Output |\n| :--- | :--- | :--- |\n| `json.load()` | File Object | Python Object (dict/list) |\n| `json.loads()` | String | Python Object (dict/list) |\n| `json.dump()` | Python Object | Write to File |\n| `json.dumps()` | Python Object | Return as String |",
            "thoughtSignature": "AY89a183n1HvGbI4q4zTRFxjxdRZcs7jbevbsOFvybvFJzvn34yQuUE0/cuxyD7rb2vYlKXbeB2vwLHig4Soy7MMIdUGx+Wd7GdMwUB8FM8aNtKvR3Ey9L7cEsL6mDd9Oc1Hi20PUrohGxDWiqv0HQyp2CkyuV2G4ufvLSuCQHG4ebaZUG/TtrCI3RjmxnpwXXJWvRwvfWfZOQsgS++CxtMnGoN+pnwu633crqMdSXcVgLGiysUmHXdpg7A3SFZlEM9X6drRS8N+SibUScLJHUJWcVMoi2Jw4IvphSOHxNSJUI9ebWcWliZ/T5+H4HICGl4VT4suZ23qxYYVrEHkkALu+30dOq8a/CJ/iKuoapBonAZhp0QTBtFKtBXhAT1El/KZnWeqDNnecawLfKH1mSw/CMk+INUkwWY/RRxbdmOVgqapGM6q6W51zZFKrOLBWVuNLf/xvRISv3rJPaTggKtXRJsplvkFyh0lOVnMqbR8fz1fJpwW1C4V6u9r1zqVWIm/wmXnp6quU0qOE9qsw7FeCbhuuhy7tzTKRMk1sQVPYcBAE1IE2A2khPW+4iXFsCU8FTVxg4WwAQhu5SQkG4P5VHqprD5TH4gjOIZL+iaVGK7yRlGHBn0zrPP90Z/4+L1yhCg/bf4A2SBMSepGmdo6PXLEVDNIFVROzi5XCdZ1K97LwFRMOZ5jUdXVaAX/S2vSomD8gIcOCelVZoeWTKW+1l/SqOKPtrYU9a4XWu3EXn2VkvtJNJnbL0xGEF3NgA7HDnivsyXR/o05eQzky2fy6XA4kE92H47pzG4eL+wIlVUGurLmNb5F19g+V3ss5k35mGaZ+8QzBXVHM3bAHVoyYeDqQugmNekN8q32EZ52ZnxuwoWUt1b/B7Spr1Ev2oomG6paGyHIldCW3LeaFYnjHhGoS4vNoCLd64Lvfg6W1aLER+r+F2f9rEYtZhmJRV6fFUsH+JfkHCgECS0q2cc7vtnW4989wdZvJ+r3zQR56k/UYo4xgxWyb8mUce6LZ2BT6y2nj4cuaycC+Svd/GfPhAP7yqWdyxuUj59l/AMrsdlV1agYqM+4DGvSehVMDMsYI7BqMwwEY+WJHQlxDIzM6Y+qOnNsyukPX4IY0+kx7ZntubtXZAJ0OEx980/XPmuNT+X+JQmyz1Bb47w56wDihRaPBmPgboRe2J76a3wH54diqrUWyUftVyOIuwQ/b3rAYS1IF/D2UENiaXjPNGcBkQuof0+vSyguVl3ynYE2Z2tPumUwBW8zNJ9ONxgtN/1H/BG9fOHPmCf7UT0/Wy+ftrSr6zqsRXCfZPKw5sv21Lt6y3XHJxsu+kDCC9I/gOEPmHpZbxyx4cmxYl7xFTf55ryG8HkojNW7+OHM4AyDjQNqesLh9VEwpnIKOXbgX62S9zMO96rtcnzZkJ+y04rMHlBxJ3AgsyNKe/7jJ9If0BPMJNortvReEs4kkzk3DulslLX0KvvRf+0n1h9GeRdEH7RBv9P/VOsn73P1+gYzssXq52kj4UQXbOs="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 20,
    "candidatesTokenCount": 501,
    "totalTokenCount": 833,
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
        "tokenCount": 501
      }
    ],
    "thoughtsTokenCount": 312
  },
  "modelVersion": "gemini-3-flash-preview",
  "createTime": "2026-07-14T02:14:14.559830Z",
  "responseId": "dptVataVIoGR3dAPg-rnoA8",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Multi-turn Conversation** — Continuing a conversation with context

```ts
const response = await env.AI.run(
  'google/gemini-3-flash',
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
  "model": "google/gemini-3-flash",
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

A road trip from San Francisco to Los Angeles can take several different paths depending on whether you want speed or scenery.

**Important Note:** If you plan on taking the scenic Highway 1 (Pacific Coast Highway), there is currently a major road closure south of Big Sur (near Lucia) due to landslides. You can visit Big Sur from the north, but you currently cannot drive all the way through to LA on the coast. You have to cut back to Highway 101.

Here are the best stops based on the route you choose:

### 1. The Scenic Route (Highway 1 & 101)
*Best for: Nature lovers, photographers, and first-timers. Plan for 2–3 days.*

*   **Monterey & Carmel-by-the-Sea:** Visit the Monterey Bay Aquarium, drive the "17-Mile Drive" for famous golf course views, and walk through the fairytale-style cottages in Carmel.
*   **Big Sur:** Even with the closure, you can drive down to see the iconic **Bixby Creek Bridge** and **Pfeiffer Big Sur State Park**.
*   **Hearst Castle (San Simeon):** A massive, opulent hilltop estate built by newspaper tycoon William Randolph Hearst. (Accessible by taking the 101 south and cutting back to the coast).
*   **San Luis Obispo (SLO):** A great halfway point. Visit "Bubblegum Alley" or hike Bishop Peak.
*   **Solvang:** A charming, authentic Danish village in the middle of California. Great for pastries and windmills.
*   **Santa Barbara:** Known as the "American Riviera." Stop at the Old Mission, walk State Street for shopping, or visit Stearns Wharf.

### 2. The Wine & Inland Route (Highway 101)
*Best for: Foodies, wine enthusiasts, and those who want a mix of speed and beauty. Plan for 1–2 days.*

*   **Paso Robles:** One of the best wine regions in the state. Don't miss **Sensorio**, a massive outdoor light installation (best seen at dusk).
*   **Pismo Beach:** Famous for its wide sandy beaches and the "Oceano Dunes" where you can drive vehicles on the sand.
*   **Los Olivos:** A tiny, sophisticated town in the Santa Ynez Valley perfect for wine tasting and high-end boutiques.

### 3. The Fast Route (I-5 South)
*Best for: Getting there as quickly as possible. Plan for 6 hours.*

*   **Harris Ranch (Coalinga):** A famous "oasis" in the middle of the farmland known for its high-quality steaks and resort-style atmosphere.
*   **Bravo Farms (Kettleman City):** A quirky stop with a petting zoo, ice cream, and a multi-story "treehouse" structure for kids to climb.
*   **Pyramid Lake:** Located just before you descend the "Grapevine" into LA, it offers a nice overlook and a visitor center.

### Pro-Tips for your trip:
1.  **Check the Weather:** If you take the coast, it can be very foggy (the "June Gloom") in the mornings.
2.  **Gas Up:** If you decide to go through Big Sur, gas is extremely expensive and sparse. Fill up in Monterey or Carmel.
3.  **The "Grapevine":** If taking the I-5, be aware of the "Grapevine" (Tejon Pass). It is a steep mountain pass that can occasionally close due to snow in winter or high winds.

**How many days are you planning to take for the trip?** I can help you narrow down a specific itinerary!

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "A road trip from San Francisco to Los Angeles can take several different paths depending on whether you want speed or scenery. \n\n**Important Note:** If you plan on taking the scenic Highway 1 (Pacific Coast Highway), there is currently a major road closure south of Big Sur (near Lucia) due to landslides. You can visit Big Sur from the north, but you currently cannot drive all the way through to LA on the coast. You have to cut back to Highway 101.\n\nHere are the best stops based on the route you choose:\n\n### 1. The Scenic Route (Highway 1 & 101)\n*Best for: Nature lovers, photographers, and first-timers. Plan for 2–3 days.*\n\n*   **Monterey & Carmel-by-the-Sea:** Visit the Monterey Bay Aquarium, drive the \"17-Mile Drive\" for famous golf course views, and walk through the fairytale-style cottages in Carmel.\n*   **Big Sur:** Even with the closure, you can drive down to see the iconic **Bixby Creek Bridge** and **Pfeiffer Big Sur State Park**.\n*   **Hearst Castle (San Simeon):** A massive, opulent hilltop estate built by newspaper tycoon William Randolph Hearst. (Accessible by taking the 101 south and cutting back to the coast).\n*   **San Luis Obispo (SLO):** A great halfway point. Visit \"Bubblegum Alley\" or hike Bishop Peak.\n*   **Solvang:** A charming, authentic Danish village in the middle of California. Great for pastries and windmills.\n*   **Santa Barbara:** Known as the \"American Riviera.\" Stop at the Old Mission, walk State Street for shopping, or visit Stearns Wharf.\n\n### 2. The Wine & Inland Route (Highway 101)\n*Best for: Foodies, wine enthusiasts, and those who want a mix of speed and beauty. Plan for 1–2 days.*\n\n*   **Paso Robles:** One of the best wine regions in the state. Don't miss **Sensorio**, a massive outdoor light installation (best seen at dusk).\n*   **Pismo Beach:** Famous for its wide sandy beaches and the \"Oceano Dunes\" where you can drive vehicles on the sand.\n*   **Los Olivos:** A tiny, sophisticated town in the Santa Ynez Valley perfect for wine tasting and high-end boutiques.\n\n### 3. The Fast Route (I-5 South)\n*Best for: Getting there as quickly as possible. Plan for 6 hours.*\n\n*   **Harris Ranch (Coalinga):** A famous \"oasis\" in the middle of the farmland known for its high-quality steaks and resort-style atmosphere.\n*   **Bravo Farms (Kettleman City):** A quirky stop with a petting zoo, ice cream, and a multi-story \"treehouse\" structure for kids to climb.\n*   **Pyramid Lake:** Located just before you descend the \"Grapevine\" into LA, it offers a nice overlook and a visitor center.\n\n### Pro-Tips for your trip:\n1.  **Check the Weather:** If you take the coast, it can be very foggy (the \"June Gloom\") in the mornings.\n2.  **Gas Up:** If you decide to go through Big Sur, gas is extremely expensive and sparse. Fill up in Monterey or Carmel.\n3.  **The \"Grapevine\":** If taking the I-5, be aware of the \"Grapevine\" (Tejon Pass). It is a steep mountain pass that can occasionally close due to snow in winter or high winds.\n\n**How many days are you planning to take for the trip?** I can help you narrow down a specific itinerary!",
            "thoughtSignature": "AY89a18pwe0rJ8l60T5RZbWGZVVPnehXDomPlov/I0+Jj5P7QfbrldSsDYQ2ZosP0bK7c5K9zDAhL48GMu0WNSrim3l/w1Tvmwcq4UillqX9CZJjKQrbL0L6jAHCj31OSMWo2ov4n4SSUH8aBUpcusELlf41U7KkOoF42BUOlLqMGNINgFKqcsEEmSKGK48+iyU8bVGPgqRsyqXN1BZGWvDoetEo5B7iSLTlHYzNAjsnA7EnIMY3FOYQl9dYJmQsN3D/3ok6NV1DqdbXvotMQJSgwuonekU5QzcO4DH3oMfsuUhLgsaIO6gHR4D8sEXufgk7DZhStTuSJOVb9dq888jkErwuAu7cq1yqa48X0zeyOOB7uS9zEyqIFfO53kiB4XYkcGLp+fPJIvTn2HV08z7kI+PafiTkN53wUnbluLuluMXoPEnU1MWZ8u2VbRHdIYz/OHvb8oMypwNxm8xMMmhQvaisdtyhp04oSIFlaOL9ZOzl3oPt/kGkGwJLJxE0LCJH+03AhYmVMwR/NajFD4Z/EhOebhnIWNKBIy1vtK5Y3lvCBn9/ee+q5h5OfBsSXXsCrZpJLaKx+SmkWh1TGpCZO+bDKssulZZw+leyMEI9Le+Jhii9bvLIe5ygM3ZWXZMsiIICVpB5BkKv7Sqd8+Hvyc+HUfyEuS/6C0oi6HbDnyYHKCedVbg9/l2g+Nta/Eeoegjsjyifs4lxDLbYiVEWL7ITLAS95tdAYn3I7TkR4hUqK9+4CZrRf9XgRUv9fy6u7al+v4ulHvNUvupz6X5ZwOMyXvYes+G2hSVGGhMEAZwPjzOzn6xx7DExso7CIV2tMl2+io3x03McryhEapftD43B30rynyG2lGandqUsW34fP/fx0Fsdbxuh/yieJq3tZKJthn9Tlw6AqxaetwmECrJmv2taK9frKuflgK/DpPbLaG30ThBzQmAwA7gSvVaZ2J3kAf1BgZsM0NUpYoivjp4ld+k8NhJXKaSBEQOwnM/rRBQKR+tZwNaJgSYOUEuNbjjRfaD3wOlUtLTCDteta66hYn78hv9XU32C4pIv3mUNrxX3hyaxmW/EFDV0xyXmhuC04E5mlrikFadLN5Rb0nV2Cy4xSIuPHi9XvL56YoSXXZ7BoKqFKXtJSP3kUO7aylM2IigKzoAR54KnDsPDm9l8oe673m0Sr3o7HZ+EiqvYN1bGVwaYugSm3Y0seUdrWFpeU++JnSRB/l63av2zlKcUjPLtroUPZdd/U+9dLqwQ1he1Ak/Am5CyFnYlqyhw2aISDQhnt3DZmwEAIF5U8ptRLNjsCFb/kanOfjfFDdRe5YfVK7SasHaybocxrXhtoBFToFukOANzALc+4xvpwl720DwrxHgI1bC7kZjiat3AannOum8g8t9OGOHTxUdL1tKZJOtAcHwKuRkXXGTEnsrDCEUDBbhuxo9OXRSYDBNYYZZLP2sAGA0mP2NZ9OxmuNzCQAC1vl31R58wD/hzJBm6YuecCH9fS2WSEteSCyPH02MBZdevVG5rAq6Ka3GseQ2mSfI6GeDNx1hrMjjl4cHiLnQwEpcRQ4l5cjnagzI+HWHLkrpodftI+AZGj/uAVzdRjK6otWq6RJDa+dHNWqOJzJ2FqbddJNZArjgMeDALPST7+XhjkOTUGBJf8UHrxn4Fm9MKfXWytiloOhhueoPdj2adXsIXK6cDP78vQZeH0kTk5XryLqga4Na3uvQhcXQx68UuMAGSGIVWX/4leSecVvGMlBXvL9XOnBOvxtGrSvA6/TKHvJQn8M2KtujgnLyTqlTULYDNivDyrf08ci6902ZPf/AEMpyoW8q5bKMkkxzLTmwDrdgoZSLmw58QlC7pQnckflRyaTpwmW+ajn/WK1vEJ7oaD0u2mKycFPAQdk8JJAXoXqGWQgABYiHCHzePh2fEyQ9VP3ejhPdZCB9FMzEfDXmqWpmWY0jd4wFdfrKNuTnW/0SpPO+MYPiPPy7FcBMA8WzpCaFgvXxKj0Ga/ep9Zmk6ahWRkAaDTFGfE8ZFJBLDgeNMol6/XHjOToH4KAFIvepCVX64OQqDNdiMZOgOsa5g+0/ecEHThosqeEQNaDFefxaWJuQtXCw995MxPSLPQ6HLDs2506N6/a5wQ9ESrYfCp/5KHWTY/MskhpOj0YI87P5xd3e+/VU8qOvQTMk0ao0vllmmLP3QpG5bKmpQ03bYcbXgR5hHW42gIwpFR7A53ujJk6blQ2Uj0RvGj0Tl6SdQN1WgVS4L+vb+Wlv4SD6cogND3kv2lslbgvOO7t37WA0984CPMvb0S8AQjovc2Z2a1c8yTDaJvJidQIJlzL6C0z16Dt1mrFPNv9SCPhu9nCoOFarxMxH6t7ZJlMtvDlB6neb+NzB5vvDTqvl9wp7vR6pK4wttqU4fxEqWXXMI5miYQfv+ZosRDa6lH2EqUck/lig="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 64,
    "candidatesTokenCount": 796,
    "totalTokenCount": 1357,
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
        "tokenCount": 796
      }
    ],
    "thoughtsTokenCount": 497
  },
  "modelVersion": "gemini-3-flash-preview",
  "createTime": "2026-07-14T02:14:20.450752Z",
  "responseId": "fJtVasDBG-jOu-gPvavt4Q4",
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Creative Writing** — Higher temperature for creative output

```ts
const response = await env.AI.run(
  'google/gemini-3-flash',
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
  "model": "google/gemini-3-flash",
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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3-flash/#page","headline":"Gemini 3 Flash (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Gemini 3 Flash is Google's fast multimodal model with frontier intelligence, superior search, and grounding capabilities.","url":"https://developers.cloudflare.com/ai/models/google/gemini-3-flash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
