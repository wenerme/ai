---
title: Claude Sonnet 4
description: Claude Sonnet 4 delivers superior coding and reasoning while responding more precisely to instructions, a significant upgrade over previous versions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Sonnet 4 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4` 

Claude Sonnet 4 delivers superior coding and reasoning while responding more precisely to instructions, a significant upgrade over previous versions.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                              |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                           |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-4) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4',

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

* [ Output ](#tab-panel-88)
* [ Raw response ](#tab-panel-89)

The three laws of thermodynamics are fundamental principles that govern energy and heat:

## First Law of Thermodynamics
**Energy cannot be created or destroyed, only converted from one form to another.**
- Also known as the law of conservation of energy
- The total energy of an isolated system remains constant
- Mathematically: ΔU = Q - W (change in internal energy equals heat added minus work done by the system)

## Second Law of Thermodynamics
**The entropy (disorder) of an isolated system always increases over time.**
- Heat flows naturally from hot to cold objects, never the reverse (without external work)
- No heat engine can be 100% efficient
- It's impossible to convert heat completely into work without some energy being lost as waste heat

## Third Law of Thermodynamics
**The entropy of a perfect crystal approaches zero as temperature approaches absolute zero.**
- Absolute zero (0 Kelvin or -273.15°C) represents the theoretical point where molecular motion stops
- It's impossible to reach absolute zero in a finite number of steps

*Note: Some formulations include a "zeroth law" about thermal equilibrium, making it technically four laws, but the three above are the classical formulation.*

```

{

  "id": "msg_01KCWPmBGq85xRjzGhNrX7n6",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "The three laws of thermodynamics are fundamental principles that govern energy and heat:\n\n## First Law of Thermodynamics\n**Energy cannot be created or destroyed, only converted from one form to another.**\n- Also known as the law of conservation of energy\n- The total energy of an isolated system remains constant\n- Mathematically: ΔU = Q - W (change in internal energy equals heat added minus work done by the system)\n\n## Second Law of Thermodynamics\n**The entropy (disorder) of an isolated system always increases over time.**\n- Heat flows naturally from hot to cold objects, never the reverse (without external work)\n- No heat engine can be 100% efficient\n- It's impossible to convert heat completely into work without some energy being lost as waste heat\n\n## Third Law of Thermodynamics\n**The entropy of a perfect crystal approaches zero as temperature approaches absolute zero.**\n- Absolute zero (0 Kelvin or -273.15°C) represents the theoretical point where molecular motion stops\n- It's impossible to reach absolute zero in a finite number of steps\n\n*Note: Some formulations include a \"zeroth law\" about thermal equilibrium, making it technically four laws, but the three above are the classical formulation.*"

    }

  ],

  "model": "claude-sonnet-4-20250514",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 17,

    "output_tokens": 272

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

  'anthropic/claude-sonnet-4',

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

* [ Output ](#tab-panel-90)
* [ Raw response ](#tab-panel-91)

Here are several ways to read a JSON file in Python:

## Basic Method

```python
import json

# Read JSON file
with open('data.json', 'r') as file:
    data = json.load(file)
    print(data)
```

## With Error Handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
        print(data)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError:
    print("Invalid JSON format!")
except Exception as e:
    print(f"An error occurred: {e}")
```

## Specifying Encoding

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
    print(data)
```

## Reading JSON String (if you have JSON as a string)

```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)  # Note: loads() not load()
print(data)
```

## Example with Sample Data

Let's say you have a file called `example.json`:
```json
{
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "hobbies": ["reading", "swimming"]
}
```

Reading and accessing the data:
```python
import json

with open('example.json', 'r') as file:
    data = json.load(file)
    
    print(f"Name: {data['name']}")
    print(f"Age: {data['age']}")
    print(f"Hobbies: {', '.join(data['hobbies'])}")
```

## Key Points:
- Use `json.load()` for files
- Use `json.loads()` for strings
- Always use `with open()` for proper file handling
- Add error handling for production code
- The JSON data becomes a Python dictionary/list after loading

```

{

  "id": "msg_01HK7EHouc5poo4jw7YU9MJr",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "Here are several ways to read a JSON file in Python:\n\n## Basic Method\n\n```python\nimport json\n\n# Read JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n    print(data)\n```\n\n## With Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\n        print(data)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format!\")\nexcept Exception as e:\n    print(f\"An error occurred: {e}\")\n```\n\n## Specifying Encoding\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n    print(data)\n```\n\n## Reading JSON String (if you have JSON as a string)\n\n```python\nimport json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\nprint(data)\n```\n\n## Example with Sample Data\n\nLet's say you have a file called `example.json`:\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 25,\n    \"city\": \"New York\",\n    \"hobbies\": [\"reading\", \"swimming\"]\n}\n```\n\nReading and accessing the data:\n```python\nimport json\n\nwith open('example.json', 'r') as file:\n    data = json.load(file)\n    \n    print(f\"Name: {data['name']}\")\n    print(f\"Age: {data['age']}\")\n    print(f\"Hobbies: {', '.join(data['hobbies'])}\")\n```\n\n## Key Points:\n- Use `json.load()` for files\n- Use `json.loads()` for strings\n- Always use `with open()` for proper file handling\n- Add error handling for production code\n- The JSON data becomes a Python dictionary/list after loading"

    }

  ],

  "model": "claude-sonnet-4-20250514",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 28,

    "output_tokens": 501

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

  'anthropic/claude-sonnet-4',

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

* [ Output ](#tab-panel-92)
* [ Raw response ](#tab-panel-93)

Here are some great stops along the SF to LA route:

**If taking the coastal route (Highway 1/PCH):**
- **Monterey/Carmel** - Monterey Bay Aquarium, charming Carmel-by-the-Sea
- **Big Sur** - Stunning coastal views, McWay Falls, Bixby Creek Bridge
- **Hearst Castle** - Historic mansion in San Simeon
- **Morro Bay** - Iconic Morro Rock and waterfront
- **San Luis Obispo** - Charming downtown and historic mission
- **Pismo Beach** - Beautiful beaches and dunes

**If taking the faster inland route (I-5):**
- **Gilroy** - Famous garlic capital
- **Paso Robles** - Wine country with great tastings
- **Santa Ynez Valley** - More wine regions, Danish-style Solvang

**Mixed route option:** Take Highway 1 partway for scenery, then cut inland via Highway 46 or 101.

The coastal route takes 7-9 hours with stops but offers incredible views. The inland route is faster (5-6 hours) but less scenic.

What type of experience are you looking for - scenic beauty, food, wine, or quick travel time?

```

{

  "id": "msg_01GNG7GjYUHbu1e36eP4G94J",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "Here are some great stops along the SF to LA route:\n\n**If taking the coastal route (Highway 1/PCH):**\n- **Monterey/Carmel** - Monterey Bay Aquarium, charming Carmel-by-the-Sea\n- **Big Sur** - Stunning coastal views, McWay Falls, Bixby Creek Bridge\n- **Hearst Castle** - Historic mansion in San Simeon\n- **Morro Bay** - Iconic Morro Rock and waterfront\n- **San Luis Obispo** - Charming downtown and historic mission\n- **Pismo Beach** - Beautiful beaches and dunes\n\n**If taking the faster inland route (I-5):**\n- **Gilroy** - Famous garlic capital\n- **Paso Robles** - Wine country with great tastings\n- **Santa Ynez Valley** - More wine regions, Danish-style Solvang\n\n**Mixed route option:** Take Highway 1 partway for scenery, then cut inland via Highway 46 or 101.\n\nThe coastal route takes 7-9 hours with stops but offers incredible views. The inland route is faster (5-6 hours) but less scenic.\n\nWhat type of experience are you looking for - scenic beauty, food, wine, or quick travel time?"

    }

  ],

  "model": "claude-sonnet-4-20250514",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 299

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

  'anthropic/claude-sonnet-4',

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

* [ Output ](#tab-panel-94)
* [ Raw response ](#tab-panel-95)

Detective Sarah Chen crouched beside the mahogany desk, her latex gloves squeaking against the wood as she carefully lifted what appeared to be an ordinary paper clip. But this one was different—twisted into an intricate knot that seemed to defy the laws of physics, its metal curves flowing impossibly through themselves like a three-dimensional puzzle.

"Henderson, come look at this," she called to her partner, who was dusting for prints near the shattered window. The morning light caught the paper clip's surface, revealing tiny etchings along its length—symbols that looked almost like writing, but in no alphabet she recognized.

The victim, renowned mathematician Dr. Marcus Webb, lay slumped in his chair just inches away, no visible wounds, no signs of struggle. Just him, his cluttered study, and this impossible piece of bent metal that hurt her eyes to look at directly.

Henderson whistled low as he peered over her shoulder. "That's... that's not possible. Metal doesn't bend that way."

Sarah felt a chill run down her spine as she realized the paper clip was warm to the touch, despite the October morning air seeping through the broken window. Whatever had happened in this room last night, she was certain this strange little object held the key to understanding it.

```

{

  "id": "msg_01HXYLgMgvUFaDSpLzUG4gNp",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "Detective Sarah Chen crouched beside the mahogany desk, her latex gloves squeaking against the wood as she carefully lifted what appeared to be an ordinary paper clip. But this one was different—twisted into an intricate knot that seemed to defy the laws of physics, its metal curves flowing impossibly through themselves like a three-dimensional puzzle.\n\n\"Henderson, come look at this,\" she called to her partner, who was dusting for prints near the shattered window. The morning light caught the paper clip's surface, revealing tiny etchings along its length—symbols that looked almost like writing, but in no alphabet she recognized.\n\nThe victim, renowned mathematician Dr. Marcus Webb, lay slumped in his chair just inches away, no visible wounds, no signs of struggle. Just him, his cluttered study, and this impossible piece of bent metal that hurt her eyes to look at directly.\n\nHenderson whistled low as he peered over her shoulder. \"That's... that's not possible. Metal doesn't bend that way.\"\n\nSarah felt a chill run down her spine as she realized the paper clip was warm to the touch, despite the October morning air seeping through the broken window. Whatever had happened in this room last night, she was certain this strange little object held the key to understanding it."

    }

  ],

  "model": "claude-sonnet-4-20250514",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 21,

    "output_tokens": 277

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

  'anthropic/claude-sonnet-4',

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

* [ Output ](#tab-panel-96)
* [ Raw response ](#tab-panel-97)

# Recursion Explained

**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components of Recursion

1. **Base case**: A condition that stops the recursion
2. **Recursive case**: The function calling itself with a modified input

## Simple Example: Calculating Factorial

Let's calculate the factorial of a number (n! = n × (n-1) × (n-2) × ... × 1):

```python
def factorial(n):
    # Base case: stop the recursion
    if n == 0 or n == 1:
        return 1
    
    # Recursive case: function calls itself
    else:
        return n * factorial(n - 1)

# Example usage
print(factorial(5))  # Output: 120
```

## How it works step by step:

```
factorial(5)
├── 5 * factorial(4)
    ├── 5 * 4 * factorial(3)
        ├── 5 * 4 * 3 * factorial(2)
            ├── 5 * 4 * 3 * 2 * factorial(1)
                └── 5 * 4 * 3 * 2 * 1 = 120
```

## Real-world Analogy

Think of **Russian nesting dolls**: To see what's inside, you open one doll, then another smaller doll inside, and so on, until you reach the smallest doll (base case). Then you put them back together in reverse order.

## Why Use Recursion?

- Makes complex problems simpler to understand and code
- Natural fit for problems with repetitive, self-similar structure
- Common in tree traversal, mathematical sequences, and divide-and-conquer algorithms

**Remember**: Always ensure you have a proper base case to avoid infinite recursion!

```

[

  {

    "type": "message_start",

    "message": {

      "model": "claude-sonnet-4-20250514",

      "id": "msg_01Gx5KoaDWdSUmfXCRyH2RMg",

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

        "output_tokens": 1,

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

      "text": " Recursion Explained\n\n**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.\n\n## Key Components"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " of Recursion\n\n1. **Base case**: A condition that stops the recursion\n2. **Recursive case**: The function calling itself with a modified input\n\n## Simple"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " Example: Calculating Factorial\n\nLet's calculate the factorial of a number (n! = n × (n-1) × (n-2) × ... × 1):"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "\n\n```python\ndef factorial(n):\n    # Base case: stop the recursion\n    if n == 0 or n == 1:\n        return 1\n    "

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "\n    # Recursive case: function calls itself\n    else:\n        return n * factorial(n - 1)\n\n# Example usage\nprint(factorial(5))  # Output: 120\n```"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "\n\n## How it works step by step:\n\n```\nfactorial(5)\n├── 5 * factorial(4)\n    ├── 5"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " * 4 * factorial(3)\n        ├── 5 * 4 * 3 * factorial(2)\n            ├── 5 * 4 * 3 * 2 * factorial(1)\n                └"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "── 5 * 4 * 3 * 2 * 1 = 120\n```\n\n## Real-world Analogy\n\nThink of **"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "Russian nesting dolls**: To see what's inside,"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " you open one doll, then another smaller doll inside, and so on, until you reach"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " the smallest doll (base case). Then you put them back"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": " together in reverse order.\n\n## Why Use Recursion?\n\n- Makes complex problems sim"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "pler to understand and code\n- Natural fit for problems with repet"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "itive, self-similar structure\n- Common in tree traversal, mathematical sequences, and divide"

    }

  },

  {

    "type": "content_block_delta",

    "index": 0,

    "delta": {

      "type": "text_delta",

      "text": "-and-conquer algorithms\n\n**Remember**: Always ensure you have a proper base case to avoid infinite recursion!"

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

      "output_tokens": 455

    }

  },

  {

    "type": "message_stop"

  }

]


```

## Parameters

* [ Input ](#tab-panel-98)
* [ Output ](#tab-panel-99)

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
