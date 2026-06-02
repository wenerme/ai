---
title: Claude Sonnet 4.6
description: Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Sonnet 4.6 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4.6` 

Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.

| Model Info                                                                 |                                                                                                                               |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                                |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                    |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-4.6) |

## Usage

* [ TypeScript ](#tab-panel-242)
* [ cURL ](#tab-panel-243)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    max_tokens: 1024,

    messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }],

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-sonnet-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "What are the three laws of thermodynamics?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-246)
* [ Raw response ](#tab-panel-247)

There are actually **four laws of thermodynamics** (numbered 0–3), but the three *main* ones most commonly referenced are:

## The Three Main Laws

**1st Law – Conservation of Energy**
Energy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.

**2nd Law – Entropy**
The total entropy of an isolated system always increases over time. Heat flows naturally from hot to cold, and processes are irreversible in nature.

**3rd Law – Absolute Zero**
As a system approaches absolute zero (0 Kelvin / -273.15°C), its entropy approaches a minimum or constant value. It is impossible to reach absolute zero in a finite number of steps.

---

## The Often-Forgotten Zeroth Law
**0th Law – Thermal Equilibrium**
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of **temperature**.

---

Would you like a deeper explanation of any of these?

```

{

  "content": [

    {

      "text": "There are actually **four laws of thermodynamics** (numbered 0–3), but the three *main* ones most commonly referenced are:\n\n## The Three Main Laws\n\n**1st Law – Conservation of Energy**\nEnergy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.\n\n**2nd Law – Entropy**\nThe total entropy of an isolated system always increases over time. Heat flows naturally from hot to cold, and processes are irreversible in nature.\n\n**3rd Law – Absolute Zero**\nAs a system approaches absolute zero (0 Kelvin / -273.15°C), its entropy approaches a minimum or constant value. It is impossible to reach absolute zero in a finite number of steps.\n\n---\n\n## The Often-Forgotten Zeroth Law\n**0th Law – Thermal Equilibrium**\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of **temperature**.\n\n---\n\nWould you like a deeper explanation of any of these?",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01S23zge2x9ssM6otp3t33zw",

  "model": "claude-sonnet-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 17,

    "output_tokens": 241

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-244)
* [ cURL ](#tab-panel-245)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    max_tokens: 1024,

    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],

    system: 'You are a helpful coding assistant specializing in Python.',

    temperature: 0.3,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-sonnet-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "How do I read a JSON file in Python?",

      "role": "user"

    }

  ],

  "system": "You are a helpful coding assistant specializing in Python.",

  "temperature": 0.3

}'


```

* [ Output ](#tab-panel-250)
* [ Raw response ](#tab-panel-251)

## Reading a JSON File in Python

### Basic Method using `json` module

```python
import json

# Open and read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

### Common Approaches

**1. Read as a dictionary/list**
```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)  # Returns a Python dict or list

# Access values
print(data['key'])
print(data['nested']['key'])
```

**2. Read a JSON string (not a file)**
```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)  # Note: loads() not load()

print(data['name'])  # Output: Alice
```

**3. Handle encoding explicitly**
```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

### Error Handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

### Key Functions Summary

| Function | Use Case |
|----------|----------|
| `json.load(file)` | Read from a **file object** |
| `json.loads(string)` | Read from a **string** |
| `json.dump(data, file)` | Write to a **file** |
| `json.dumps(data)` | Convert to a **string** |

### Example JSON file (`data.json`)
```json
{
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "coding"]
}
```

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data['name'])          # Alice
print(data['hobbies'][0])    # reading
```

The `json` module is built into Python, so **no installation is needed**.

```

{

  "content": [

    {

      "text": "## Reading a JSON File in Python\n\n### Basic Method using `json` module\n\n```python\nimport json\n\n# Open and read the JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n### Common Approaches\n\n**1. Read as a dictionary/list**\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)  # Returns a Python dict or list\n\n# Access values\nprint(data['key'])\nprint(data['nested']['key'])\n```\n\n**2. Read a JSON string (not a file)**\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\n\nprint(data['name'])  # Output: Alice\n```\n\n**3. Handle encoding explicitly**\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n### Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n### Key Functions Summary\n\n| Function | Use Case |\n|----------|----------|\n| `json.load(file)` | Read from a **file object** |\n| `json.loads(string)` | Read from a **string** |\n| `json.dump(data, file)` | Write to a **file** |\n| `json.dumps(data)` | Convert to a **string** |\n\n### Example JSON file (`data.json`)\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"hobbies\": [\"reading\", \"coding\"]\n}\n```\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data['name'])          # Alice\nprint(data['hobbies'][0])    # reading\n```\n\nThe `json` module is built into Python, so **no installation is needed**.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_015LKPCnULzDqfFALqKD6qZw",

  "model": "claude-sonnet-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 29,

    "output_tokens": 556

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-254)
* [ cURL ](#tab-panel-255)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    max_tokens: 1024,

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

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-sonnet-4.6",

  "max_tokens": 1024,

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

* [ Output ](#tab-panel-256)
* [ Raw response ](#tab-panel-257)

Here are some great stops depending on which route you take:

**Coastal Route (Highway 1) - Scenic but longer**
- **Santa Cruz** - Beach boardwalk and pier
- **Monterey** - Famous aquarium and Cannery Row
- **Big Sur** - Stunning coastal cliffs and views
- **San Simeon** - Hearst Castle tours
- **San Luis Obispo** - Charming college town with good food

**Inland Route (Highway 101 or I-5) - Faster**
- **Gilroy** - Known as the garlic capital of the world
- **Paso Robles** - Great wine country
- **Santa Barbara** - Beautiful beaches and Spanish architecture

**Tips to consider:**
- The coastal route adds several hours but is one of the most beautiful drives in the US
- Big Sur can have road closures so check conditions before you go
- Santa Barbara is worth a stop on either route
- Try to avoid driving through LA during rush hour

**How long do you have for the trip?** That would help narrow down how many stops make sense. Also, are you interested in:
- Food and restaurants
- Outdoor activities
- History and culture
- A mix of everything

```

{

  "content": [

    {

      "text": "Here are some great stops depending on which route you take:\n\n**Coastal Route (Highway 1) - Scenic but longer**\n- **Santa Cruz** - Beach boardwalk and pier\n- **Monterey** - Famous aquarium and Cannery Row\n- **Big Sur** - Stunning coastal cliffs and views\n- **San Simeon** - Hearst Castle tours\n- **San Luis Obispo** - Charming college town with good food\n\n**Inland Route (Highway 101 or I-5) - Faster**\n- **Gilroy** - Known as the garlic capital of the world\n- **Paso Robles** - Great wine country\n- **Santa Barbara** - Beautiful beaches and Spanish architecture\n\n**Tips to consider:**\n- The coastal route adds several hours but is one of the most beautiful drives in the US\n- Big Sur can have road closures so check conditions before you go\n- Santa Barbara is worth a stop on either route\n- Try to avoid driving through LA during rush hour\n\n**How long do you have for the trip?** That would help narrow down how many stops make sense. Also, are you interested in:\n- Food and restaurants\n- Outdoor activities\n- History and culture\n- A mix of everything",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01S9ZEwEprBa1m64zKWUvdmW",

  "model": "claude-sonnet-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 280

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-248)
* [ cURL ](#tab-panel-249)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    max_tokens: 512,

    messages: [

      {

        content: 'Write a short story opening about a detective finding an unusual clue.',

        role: 'user',

      },

    ],

    temperature: 0.8,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-sonnet-4.6",

  "max_tokens": 512,

  "messages": [

    {

      "content": "Write a short story opening about a detective finding an unusual clue.",

      "role": "user"

    }

  ],

  "temperature": 0.8

}'


```

* [ Output ](#tab-panel-258)
* [ Raw response ](#tab-panel-259)

# The Smell of Lavender

Detective Mara Chen had seen a lot of crime scenes in fourteen years on the force. She had learned to read them the way other people read books — patiently, without skipping ahead.

But this one was giving her trouble.

The apartment was sparse and cold, its single window open to the November street below. The victim, a retired accountant named Gerald Foss, lay slumped at his kitchen table with no signs of forced entry, no signs of struggle, and — this was the part that nagged at her — no signs that anyone had been upset about anything at all.

Everything was deliberate. Calm.

She almost missed it.

She was pulling on a fresh glove when the draft shifted, and there it was — faint, out of place, almost polite. *Lavender.* Not a cleaning product. Not a candle. Something more personal, like soap or a fabric softener pressed warm from a dryer.

Mara stood very still.

Gerald Foss, according to his neighbor, had been allergic to every flowering plant known to mankind. His medicine cabinet held three different antihistamines. There wasn't a single flower, real or artificial, anywhere in the apartment.

Someone had been here recently. Someone clean, careful, and completely unafraid.

She pulled out her notebook and wrote one word.

*Lavender.*

Then she circled it twice.

```

{

  "content": [

    {

      "text": "# The Smell of Lavender\n\nDetective Mara Chen had seen a lot of crime scenes in fourteen years on the force. She had learned to read them the way other people read books — patiently, without skipping ahead.\n\nBut this one was giving her trouble.\n\nThe apartment was sparse and cold, its single window open to the November street below. The victim, a retired accountant named Gerald Foss, lay slumped at his kitchen table with no signs of forced entry, no signs of struggle, and — this was the part that nagged at her — no signs that anyone had been upset about anything at all.\n\nEverything was deliberate. Calm.\n\nShe almost missed it.\n\nShe was pulling on a fresh glove when the draft shifted, and there it was — faint, out of place, almost polite. *Lavender.* Not a cleaning product. Not a candle. Something more personal, like soap or a fabric softener pressed warm from a dryer.\n\nMara stood very still.\n\nGerald Foss, according to his neighbor, had been allergic to every flowering plant known to mankind. His medicine cabinet held three different antihistamines. There wasn't a single flower, real or artificial, anywhere in the apartment.\n\nSomeone had been here recently. Someone clean, careful, and completely unafraid.\n\nShe pulled out her notebook and wrote one word.\n\n*Lavender.*\n\nThen she circled it twice.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_0144jtkQ6nQrr9BswabiMh3h",

  "model": "claude-sonnet-4-6",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 21,

    "output_tokens": 317

  }

}


```

**Streaming Response**  — Enable streaming for real-time output 

* [ TypeScript ](#tab-panel-252)
* [ cURL ](#tab-panel-253)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    max_tokens: 1024,

    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],

    stream: true,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "anthropic/claude-sonnet-4.6",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "Explain the concept of recursion with a simple example.",

      "role": "user"

    }

  ],

  "stream": true

}'


```

* [ Output ](#tab-panel-260)
* [ Raw response ](#tab-panel-261)

# Recursion

## Core Concept

Recursion is when a **function calls itself** to solve a smaller version of the same problem, breaking it down until it reaches a simple base case.

Every recursive solution needs:
1. **Base case** — when to stop
2. **Recursive case** — calling itself with a simpler input

---

## Simple Example: Factorial

`5! = 5 × 4 × 3 × 2 × 1 = 120`

```python
def factorial(n):
    # Base case: stop here
    if n == 0:
        return 1

    # Recursive case: call itself with a smaller value
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

---

## How It Unfolds

```
factorial(5)
  └── 5 * factorial(4)
            └── 4 * factorial(3)
                      └── 3 * factorial(2)
                                └── 2 * factorial(1)
                                          └── 1 * factorial(0)
                                                    └── returns 1  ← base case

# Then it works back up:
1 * 1 = 1
2 * 1 = 2
3 * 2 = 6
4 * 6 = 24
5 * 24 = 120 ✓
```

---

## The "Thousand Clones" Analogy

> Imagine you're in a long line and ask *"what position am I in?"*
> You ask the person in front, who asks the person in front of them, and so on.
> The person at the front says **"I'm #1"** (base case), and the answer passes back down the line.

---

## Key Warnings

| ⚠️ Problem | ✅ Solution |
|---|---|
| No base case → **infinite loop** | Always define a stopping condition |
| Too many calls → **stack overflow** | Ensure input gets smaller each time |
| Can be slow with repeated work | Use memoization or iteration if needed |

---

## Recursion vs. Iteration

Both solve the same problem — recursion is often **more readable** for naturally nested problems (trees, folders, fractals), while iteration is more **memory efficient** for simple loops.

```

[

  {

    "message": {

      "content": [],

      "id": "msg_013h2aK7NSZ33csCepec5U2R",

      "model": "claude-sonnet-4-6",

      "role": "assistant",

      "stop_details": null,

      "stop_reason": null,

      "stop_sequence": null,

      "type": "message",

      "usage": {

        "cache_creation": {

          "ephemeral_1h_input_tokens": 0,

          "ephemeral_5m_input_tokens": 0

        },

        "cache_creation_input_tokens": 0,

        "cache_read_input_tokens": 0,

        "inference_geo": "global",

        "input_tokens": 19,

        "output_tokens": 1,

        "service_tier": "standard"

      }

    },

    "type": "message_start"

  },

  {

    "content_block": {

      "text": "",

      "type": "text"

    },

    "index": 0,

    "type": "content_block_start"

  },

  {

    "type": "ping"

  },

  {

    "delta": {

      "text": "#",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " Recursion\n\n## Core Concept\n\nRecursion is when a **function calls itself** to solve a smaller",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " version of the same problem, breaking it down until it reaches a simple base case.\n\nEvery recursive solution",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " needs:\n1. **Base case** — when to stop\n2. **Recursive case** — calling",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " itself with a simpler input\n\n---\n\n## Simple Example: Factorial\n\n`5! = 5 × ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "4 × 3 × 2 × 1 = 120`\n\n```python\ndef factorial(n):\n    # Base case: stop here",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n    if n == 0:\n        return 1\n\n    # Recursive case: call itself with a smaller value\n    return n * factorial(n - 1)\n\nprint",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "(factorial(5))  # Output: 120\n```\n\n---\n\n## How It Unfolds\n\n```\nfactorial(5)\n  └",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "── 5 * factorial(4)\n            └── 4 * factorial(3)\n                      └── 3 * factorial(2)\n                                ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "└── 2 * factorial(1)\n                                          └── 1 * factorial(0)\n                                                    └── returns 1  ← base case",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n\n# Then it works back up:\n1 * 1 = 1\n2",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " * 1 = 2\n3 * 2 = 6\n4 * 6 = 24\n5 * 24 = 120 ✓\n```\n\n---\n\n## The",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " \"Thousand Clones\" Analogy\n\n> Imagine you're in",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " a long line and ask *\"what position am I in?\"*\n> You",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " ask the person in front, who asks the person in front of",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " them, and so on.\n> The person at the front says **\"I'm #",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "1\"** (base case), and the answer passes back",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " down the line.\n\n---\n\n## Key Warnings\n\n| ⚠️ Problem | ",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "✅ Solution |\n|---|---|\n| No base case → **infinite loop** | Always define a stopping condition |\n| Too",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " many calls → **stack overflow** | Ensure input gets smaller each time |\n| Can be",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " slow with repeated work | Use memoization or iteration if needed |\n\n---\n\n##",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " Recursion vs. Iteration\n\nBoth solve the same problem — recursion is",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " often **more readable** for naturally nested problems (trees",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ", folders, fractals), while iteration is more **memory efficient** for simple loops",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ".",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "index": 0,

    "type": "content_block_stop"

  },

  {

    "delta": {

      "stop_details": null,

      "stop_reason": "end_turn",

      "stop_sequence": null

    },

    "type": "message_delta",

    "usage": {

      "cache_creation_input_tokens": 0,

      "cache_read_input_tokens": 0,

      "input_tokens": 19,

      "output_tokens": 562

    }

  },

  {

    "type": "message_stop"

  }

]


```

## Parameters

* [ Input ](#tab-panel-262)
* [ Output ](#tab-panel-263)

max\_tokens

`number`requiredexclusiveMinimum: 0

▶messages\[\]

`array`required

▶metadata{}

`object`

stream

`boolean`

system

`string`

temperature

`number`maximum: 1minimum: 0

top\_k

`number`exclusiveMinimum: 0

top\_p

`number`maximum: 1minimum: 0

▶content\[\]

`array`

id

`string`

model

`string`

role

`string`const: assistant

stop\_reason

`string | null`

type

`string`const: message

▶usage{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
