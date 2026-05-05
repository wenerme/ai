---
title: Claude Haiku 4.5
description: Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Haiku 4.5 

Text Generation • Anthropic • Proxied 

`anthropic/claude-haiku-4.5` 

Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.

| Model Info                                                                 |                                                                                                                              |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                               |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                   |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/haiku)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-haiku-4.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

    max_tokens: 1024,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-52)
* [ Raw response ](#tab-panel-53)

# The Three Laws of Thermodynamics

## First Law (Conservation of Energy)
Energy cannot be created or destroyed, only converted from one form to another. The total energy input to a system equals the change in internal energy plus the work done by the system.

## Second Law (Entropy)
The entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold objects, not the reverse, and no process can be 100% efficient at converting heat to work.

## Third Law (Absolute Zero)
As temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero through any finite process.

---

These laws form the foundation of thermodynamics and explain why perpetual motion machines are impossible and why certain processes naturally occur while others don't.

```

{

  "id": "msg_01AudBc47nYro7MFJatA3KAW",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# The Three Laws of Thermodynamics\n\n## First Law (Conservation of Energy)\nEnergy cannot be created or destroyed, only converted from one form to another. The total energy input to a system equals the change in internal energy plus the work done by the system.\n\n## Second Law (Entropy)\nThe entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold objects, not the reverse, and no process can be 100% efficient at converting heat to work.\n\n## Third Law (Absolute Zero)\nAs temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero through any finite process.\n\n---\n\nThese laws form the foundation of thermodynamics and explain why perpetual motion machines are impossible and why certain processes naturally occur while others don't."

    }

  ],

  "model": "claude-haiku-4-5-20251001",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 17,

    "output_tokens": 191

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

  {

    messages: [

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

    max_tokens: 1024,

    system: 'You are a helpful coding assistant specializing in Python.',

    temperature: 0.3,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-54)
* [ Raw response ](#tab-panel-55)

# Reading a JSON File in Python

Here are the most common methods:

## 1. **Basic Method (Recommended)**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)

print(data)
```

## 2. **Reading JSON String**
If you have JSON as a string instead:
```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)

print(data)
```

## 3. **With Error Handling**
```python
import json

try:
    with open('file.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError:
    print("Invalid JSON format")
```

## 4. **Pretty Print the Data**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)

print(json.dumps(data, indent=2))
```

## Key Differences
| Method | Use Case |
|--------|----------|
| `json.load()` | Read from a file object |
| `json.loads()` | Parse a JSON string |

## Example
**file.json:**
```json
{
  "name": "Alice",
  "age": 25,
  "city": "New York"
}
```

**Python code:**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)
    print(data['name'])  # Output: Alice
```

The `with` statement is recommended because it automatically closes the file when done.

```

{

  "id": "msg_018PXaVwoWM8Eo7X51oCHmhz",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# Reading a JSON File in Python\n\nHere are the most common methods:\n\n## 1. **Basic Method (Recommended)**\n```python\nimport json\n\nwith open('file.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## 2. **Reading JSON String**\nIf you have JSON as a string instead:\n```python\nimport json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data)\n```\n\n## 3. **With Error Handling**\n```python\nimport json\n\ntry:\n    with open('file.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format\")\n```\n\n## 4. **Pretty Print the Data**\n```python\nimport json\n\nwith open('file.json', 'r') as file:\n    data = json.load(file)\n\nprint(json.dumps(data, indent=2))\n```\n\n## Key Differences\n| Method | Use Case |\n|--------|----------|\n| `json.load()` | Read from a file object |\n| `json.loads()` | Parse a JSON string |\n\n## Example\n**file.json:**\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 25,\n  \"city\": \"New York\"\n}\n```\n\n**Python code:**\n```python\nimport json\n\nwith open('file.json', 'r') as file:\n    data = json.load(file)\n    print(data['name'])  # Output: Alice\n```\n\nThe `with` statement is recommended because it automatically closes the file when done."

    }

  ],

  "model": "claude-haiku-4-5-20251001",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 28,

    "output_tokens": 425

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'I need help planning a road trip from San Francisco to Los Angeles.',

      },

      {

        role: 'assistant',

        content:

          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

      },

      {

        role: 'user',

        content: 'Yes, what are some good places to stop?',

      },

    ],

    max_tokens: 1024,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-56)
* [ Raw response ](#tab-panel-57)

# Good Stops on the SF to LA Route

**Halfway/Central Coast Options:**
- **San Luis Obispo** - Charming town with a mission, wineries, and Thursday night farmers market
- **Santa Barbara** - Beautiful coastal town with beaches, State Street shopping, and wine tasting
- **Solvang** - Danish village with unique architecture, wineries, and restaurants

**Scenic Detours:**
- **Big Sur** - Stunning coastal cliffs (adds time but worth it for photos)
- **Hearst Castle** - Historic mansion with tours in San Simeon
- **Monterey/Carmel** - Coastal towns with aquariums, beaches, and galleries

**Faster Route Stops:**
- **Salinas** - Agricultural hub, reasonable break point
- **Paso Robles** - Wine country with tasting rooms

**Tips:**
- Plan for 7-8 hours total if you want to stop for a meal and explore
- Big Sur adds 1-2 hours but offers incredible views
- Consider stopping overnight if you want a more relaxed trip

What's your timeline? Are you interested in nature, wine, food, or something else? That would help me narrow down recommendations.

```

{

  "id": "msg_01H4xB3mngxiKQMyrfDoJzKe",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# Good Stops on the SF to LA Route\n\n**Halfway/Central Coast Options:**\n- **San Luis Obispo** - Charming town with a mission, wineries, and Thursday night farmers market\n- **Santa Barbara** - Beautiful coastal town with beaches, State Street shopping, and wine tasting\n- **Solvang** - Danish village with unique architecture, wineries, and restaurants\n\n**Scenic Detours:**\n- **Big Sur** - Stunning coastal cliffs (adds time but worth it for photos)\n- **Hearst Castle** - Historic mansion with tours in San Simeon\n- **Monterey/Carmel** - Coastal towns with aquariums, beaches, and galleries\n\n**Faster Route Stops:**\n- **Salinas** - Agricultural hub, reasonable break point\n- **Paso Robles** - Wine country with tasting rooms\n\n**Tips:**\n- Plan for 7-8 hours total if you want to stop for a meal and explore\n- Big Sur adds 1-2 hours but offers incredible views\n- Consider stopping overnight if you want a more relaxed trip\n\nWhat's your timeline? Are you interested in nature, wine, food, or something else? That would help me narrow down recommendations."

    }

  ],

  "model": "claude-haiku-4-5-20251001",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 279

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_tokens: 512,

    temperature: 0.8,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-58)
* [ Raw response ](#tab-panel-59)

# The Photograph

Detective Sarah Chen stood in the victim's apartment, her latex gloves snapping softly as she examined the bookshelf for the third time. The case had gone cold within hours—no signs of forced entry, no witnesses, no motive that made sense.

Then she saw it.

Wedged behind a row of paperbacks, barely visible, was a Polaroid photograph. Sarah's breath caught. Not because of what it showed—a lake at sunset, unremarkable—but because of what was written on the back in faded blue ink:

*"The day before everything changed."*

And underneath, a date: twenty-three years ago.

Sarah turned the photo over again, studying the water, the trees, the single figure standing at the shore. The figure's face was deliberately obscured by a smudge of thumb, as if someone had tried to erase it.

She'd been a detective for twelve years. She'd learned that most mysteries had ordinary answers: greed, passion, rage. But something about this photograph—the deliberate hiding place, the cryptic message, the erased face—told her this case was different.

This photograph wasn't evidence of a crime.

It was a warning.

```

{

  "id": "msg_01TG861uc7b1Tbn664aaCLPf",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# The Photograph\n\nDetective Sarah Chen stood in the victim's apartment, her latex gloves snapping softly as she examined the bookshelf for the third time. The case had gone cold within hours—no signs of forced entry, no witnesses, no motive that made sense.\n\nThen she saw it.\n\nWedged behind a row of paperbacks, barely visible, was a Polaroid photograph. Sarah's breath caught. Not because of what it showed—a lake at sunset, unremarkable—but because of what was written on the back in faded blue ink:\n\n*\"The day before everything changed.\"*\n\nAnd underneath, a date: twenty-three years ago.\n\nSarah turned the photo over again, studying the water, the trees, the single figure standing at the shore. The figure's face was deliberately obscured by a smudge of thumb, as if someone had tried to erase it.\n\nShe'd been a detective for twelve years. She'd learned that most mysteries had ordinary answers: greed, passion, rage. But something about this photograph—the deliberate hiding place, the cryptic message, the erased face—told her this case was different.\n\nThis photograph wasn't evidence of a crime.\n\nIt was a warning."

    }

  ],

  "model": "claude-haiku-4-5-20251001",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 21,

    "output_tokens": 269

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    max_tokens: 1024,

    stream: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-60)
* [ Raw response ](#tab-panel-61)

# Recursion Explained

**Recursion** is when a function calls itself to solve smaller instances of the same problem until it reaches a simple base case.

## Key Components

1. **Base Case**: The condition that stops the recursion
2. **Recursive Case**: The function calling itself with a simpler input

## Simple Example: Factorial

Calculate 5! (5 × 4 × 3 × 2 × 1)

```python
def factorial(n):
    # Base case: stop here
    if n == 1:
        return 1
    
    # Recursive case: break problem into smaller piece
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

### How It Works

```
factorial(5)
→ 5 * factorial(4)
  → 4 * factorial(3)
    → 3 * factorial(2)
      → 2 * factorial(1)
        → return 1  [BASE CASE]
      → return 2 * 1 = 2
    → return 3 * 2 = 6
  → return 4 * 6 = 24
→ return 5 * 24 = 120
```

## Real-World Analogy

It's like opening Russian nesting dolls:
- Open a doll → find a smaller doll inside
- Open that doll → find an even smaller one
- Keep going until you reach the tiniest doll (base case)
- Now work backwards: you've reached the smallest piece

## Why Use Recursion?

✅ **Good for**: Problems with naturally recursive structure (trees, nested data, divide-and-conquer)  
⚠️ **Caution**: Can be slow and cause stack overflow if not careful

Recursion is elegant but always ensure you have a clear base case!

```

[

  {

    "type": "message_start",

    "message": {

      "model": "claude-haiku-4-5-20251001",

      "id": "msg_01KvQp2GZvMb9V166tjgWh8q",

      "type": "message",

      "role": "assistant",

      "content": [],

      "stop_reason": null,

      "stop_sequence": null,

      "stop_details": null,

      "usage": {

        "input_tokens": 19,

        "cache_creation_input_tokens": 0,

        "cache_read_input_tokens": 0,

        "cache_creation": {

          "ephemeral_5m_input_tokens": 0,

          "ephemeral_1h_input_tokens": 0

        },

        "output_tokens": 2,

        "service_tier": "standard",

        "inference_geo": "not_available"

      }

    }

  },

  {

    "type": "content_block_start",

    "index": 0,

    "content_block": {

      "type": "text",

      "text": ""

    }

  },

  {

    "type": "ping"

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "#"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " Recursion Explained\n\n**Recursion** is when a function calls itself to solve smaller instances of the same problem until it reaches a simple"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " base case.\n\n## Key Components\n\n1. **Base Case**: The condition that stops the recursion\n2. **Recursive Case**: The function"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " calling itself with a simpler input\n\n## Simple Example: Factorial\n\nCalculate 5! (5 ×"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " 4 × 3 × 2 × 1)\n\n```python\ndef factorial(n):\n    # Base case: stop here\n    if n == 1:\n        return 1\n    "

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "\n    # Recursive case: break problem into smaller piece\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120\n```\n\n### How It Works\n\n```"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "\nfactorial(5)\n→ 5 * factorial(4)\n  → 4 * factorial(3)\n    → 3 * factorial(2"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": ")\n      → 2 * factorial(1)\n        → return 1  [BASE CASE]\n      → return 2 "

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "* 1 = 2\n    → return 3 * 2 = 6\n  → return 4 * 6 = 24\n→ return 5 * 24 ="

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " 120\n```\n\n## Real-World Analogy\n\nIt's like opening Russian nesting dolls:\n- Open a d"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "oll → find a smaller doll inside\n- Open that doll → find an even smaller one\n- Keep"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " going until you reach the tiniest doll (base case)\n- Now work backwards: you've"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " reached the smallest piece\n\n## Why Use Recursion?\n\n✅ **Good for**: Problems with naturally recursive structure ("

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "trees, nested data, divide-and-conquer)  \n⚠️ **Caution**: Can be"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " slow and cause stack overflow if not careful\n\nRecursion is elegant but always ensure"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " you have a clear base case!"

    }

  },

  {

    "type": "content_block_stop",

    "index": 0

  },

  {

    "type": "message_delta",

    "delta": {

      "stop_reason": "end_turn",

      "stop_sequence": null,

      "stop_details": null

    },

    "usage": {

      "input_tokens": 19,

      "cache_creation_input_tokens": 0,

      "cache_read_input_tokens": 0,

      "output_tokens": 444

    }

  },

  {

    "type": "message_stop"

  }

]


```

## Parameters

* [ Input ](#tab-panel-62)
* [ Output ](#tab-panel-63)

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

temperature

`number`minimum: 0maximum: 1

top\_p

`number`minimum: 0maximum: 1

top\_k

`number`exclusiveMinimum: 0

stream

`boolean`

▶metadata{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[\]

`array`

model

`string`

stop\_reason

`string | null`

▶usage{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
