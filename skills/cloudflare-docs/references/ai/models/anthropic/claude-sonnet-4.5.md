---
title: Claude Sonnet 4.5
description: Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Sonnet 4.5 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4.5` 

Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.

| Model Info                                                                 |                                                                                                                               |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                                |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                    |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-4.5) |

## Usage

* [ TypeScript ](#tab-panel-220)
* [ cURL ](#tab-panel-221)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

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

  "model": "anthropic/claude-sonnet-4.5",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "What are the three laws of thermodynamics?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-224)
* [ Raw response ](#tab-panel-225)

# The Three Laws of Thermodynamics

## **First Law: Conservation of Energy**
Energy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.
- Also stated as: ΔU = Q - W (change in internal energy equals heat added minus work done)

## **Second Law: Entropy**
The entropy of an isolated system always increases over time. Heat naturally flows from hot to cold, and processes tend toward disorder.
- This law explains why certain processes are irreversible and why we can't have 100% efficient heat engines

## **Third Law: Absolute Zero**
As temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero.
- Practically, this means absolute zero cannot be reached through any finite number of processes

**Note:** There's also a "Zeroth Law" (named later): If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of temperature.

```

{

  "content": [

    {

      "text": "# The Three Laws of Thermodynamics\n\n## **First Law: Conservation of Energy**\nEnergy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.\n- Also stated as: ΔU = Q - W (change in internal energy equals heat added minus work done)\n\n## **Second Law: Entropy**\nThe entropy of an isolated system always increases over time. Heat naturally flows from hot to cold, and processes tend toward disorder.\n- This law explains why certain processes are irreversible and why we can't have 100% efficient heat engines\n\n## **Third Law: Absolute Zero**\nAs temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero.\n- Practically, this means absolute zero cannot be reached through any finite number of processes\n\n**Note:** There's also a \"Zeroth Law\" (named later): If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of temperature.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01GZMN4RKsBb5RHXUJYBgBdG",

  "model": "claude-sonnet-4-5-20250929",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 17,

    "output_tokens": 240

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-222)
* [ cURL ](#tab-panel-223)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

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

  "model": "anthropic/claude-sonnet-4.5",

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

* [ Output ](#tab-panel-228)
* [ Raw response ](#tab-panel-229)

# Reading a JSON File in Python

You can read a JSON file using Python's built-in `json` module. Here are the common methods:

## Basic Method

```python
import json

# Read JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Complete Example

```python
import json

# Reading JSON file
with open('data.json', 'r') as file:
    data = json.load(file)
    
# Access the data
print(data)
print(type(data))  # Usually dict or list
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
```

## Reading JSON String (not file)

If you have a JSON string instead of a file:

```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)  # Note: loads() not load()
print(data)
```

## Key Points

- **`json.load()`** - reads from a **file object**
- **`json.loads()`** - reads from a **string**
- Always use `with open()` to ensure the file is properly closed
- JSON objects become Python dictionaries
- JSON arrays become Python lists

```

{

  "content": [

    {

      "text": "# Reading a JSON File in Python\n\nYou can read a JSON file using Python's built-in `json` module. Here are the common methods:\n\n## Basic Method\n\n```python\nimport json\n\n# Read JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Complete Example\n\n```python\nimport json\n\n# Reading JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n    \n# Access the data\nprint(data)\nprint(type(data))  # Usually dict or list\n```\n\n## With Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\n    print(data)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format!\")\n```\n\n## Reading JSON String (not file)\n\nIf you have a JSON string instead of a file:\n\n```python\nimport json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\nprint(data)\n```\n\n## Key Points\n\n- **`json.load()`** - reads from a **file object**\n- **`json.loads()`** - reads from a **string**\n- Always use `with open()` to ensure the file is properly closed\n- JSON objects become Python dictionaries\n- JSON arrays become Python lists",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01KF2gMfuUeqNjxZytqgkfGd",

  "model": "claude-sonnet-4-5-20250929",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 28,

    "output_tokens": 371

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-232)
* [ cURL ](#tab-panel-233)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

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

  "model": "anthropic/claude-sonnet-4.5",

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

* [ Output ](#tab-panel-234)
* [ Raw response ](#tab-panel-235)

Here are some great stops between San Francisco and Los Angeles:

**Scenic Route (Highway 1/PCH - about 10 hours driving):**
- **Monterey & Carmel** - Monterey Bay Aquarium, 17-Mile Drive, charming downtown Carmel
- **Big Sur** - McWay Falls, Bixby Bridge, stunning coastal views
- **Hearst Castle** - Historic mansion tours in San Simeon
- **Morro Bay** - Iconic Morro Rock and waterfront
- **San Luis Obispo** - Downtown shopping, Madonna Inn
- **Santa Barbara** - Spanish architecture, beaches, wine country
- **Solvang** - Danish-themed village (short detour)

**Faster Route (Highway 101 - about 6 hours):**
- **Gilroy** - Famous garlic capital
- **San Luis Obispo** - Bubblegum Alley, Mission
- **Pismo Beach** - Classic beach town
- **Santa Barbara** - Mission, State Street

**Tips:**
- Big Sur has limited cell service and few gas stations
- Book Hearst Castle tickets in advance
- Consider splitting into 2-3 days to enjoy stops

What interests you most - beaches, nature, food, or historic sites? I can refine recommendations based on your preferences!

```

{

  "content": [

    {

      "text": "Here are some great stops between San Francisco and Los Angeles:\n\n**Scenic Route (Highway 1/PCH - about 10 hours driving):**\n- **Monterey & Carmel** - Monterey Bay Aquarium, 17-Mile Drive, charming downtown Carmel\n- **Big Sur** - McWay Falls, Bixby Bridge, stunning coastal views\n- **Hearst Castle** - Historic mansion tours in San Simeon\n- **Morro Bay** - Iconic Morro Rock and waterfront\n- **San Luis Obispo** - Downtown shopping, Madonna Inn\n- **Santa Barbara** - Spanish architecture, beaches, wine country\n- **Solvang** - Danish-themed village (short detour)\n\n**Faster Route (Highway 101 - about 6 hours):**\n- **Gilroy** - Famous garlic capital\n- **San Luis Obispo** - Bubblegum Alley, Mission\n- **Pismo Beach** - Classic beach town\n- **Santa Barbara** - Mission, State Street\n\n**Tips:**\n- Big Sur has limited cell service and few gas stations\n- Book Hearst Castle tickets in advance\n- Consider splitting into 2-3 days to enjoy stops\n\nWhat interests you most - beaches, nature, food, or historic sites? I can refine recommendations based on your preferences!",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_013M3Nhg1ApNNGZf1GWxRHUj",

  "model": "claude-sonnet-4-5-20250929",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 310

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-226)
* [ cURL ](#tab-panel-227)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

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

  "model": "anthropic/claude-sonnet-4.5",

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

* [ Output ](#tab-panel-236)
* [ Raw response ](#tab-panel-237)

# The Blue Feather

Detective Sarah Chen had seen plenty of strange things at crime scenes over her fifteen years on the force, but she'd never seen anything quite like this.

The penthouse apartment was pristine—too pristine for a place where someone had allegedly been murdered just hours ago. No blood spatter. No signs of struggle. No body, for that matter, despite three separate witnesses reporting screams and a gunshot at 2:47 AM.

She was about to call it in as a false alarm when the morning sun shifted through the floor-to-ceiling windows, catching something wedged between the marble tiles near the balcony door.

Sarah knelt down and pulled out her tweezers. The object was impossibly delicate: a single feather, no longer than her thumb, glowing an electric blue that seemed to pulse with its own light. She'd never seen a bird with plumage this color—not naturally, anyway.

But it was what happened when she picked it up that made her breath catch.

The feather was warm. And getting warmer.

Then it started to hum.

```

{

  "content": [

    {

      "text": "# The Blue Feather\n\nDetective Sarah Chen had seen plenty of strange things at crime scenes over her fifteen years on the force, but she'd never seen anything quite like this.\n\nThe penthouse apartment was pristine—too pristine for a place where someone had allegedly been murdered just hours ago. No blood spatter. No signs of struggle. No body, for that matter, despite three separate witnesses reporting screams and a gunshot at 2:47 AM.\n\nShe was about to call it in as a false alarm when the morning sun shifted through the floor-to-ceiling windows, catching something wedged between the marble tiles near the balcony door.\n\nSarah knelt down and pulled out her tweezers. The object was impossibly delicate: a single feather, no longer than her thumb, glowing an electric blue that seemed to pulse with its own light. She'd never seen a bird with plumage this color—not naturally, anyway.\n\nBut it was what happened when she picked it up that made her breath catch.\n\nThe feather was warm. And getting warmer.\n\nThen it started to hum.",

      "type": "text"

    }

  ],

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "msg_01Qf12B9uws6JAnfRfQ6WgBe",

  "model": "claude-sonnet-4-5-20250929",

  "role": "assistant",

  "stop_details": null,

  "stop_reason": "end_turn",

  "stop_sequence": null,

  "type": "message",

  "usage": {

    "input_tokens": 21,

    "output_tokens": 243

  }

}


```

**Streaming Response**  — Enable streaming for real-time output 

* [ TypeScript ](#tab-panel-230)
* [ cURL ](#tab-panel-231)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.5',

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

  "model": "anthropic/claude-sonnet-4.5",

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

* [ Output ](#tab-panel-238)
* [ Raw response ](#tab-panel-239)

# Recursion Explained

**Recursion** is when a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components

1. **Base case**: A condition that stops the recursion
2. **Recursive case**: The function calling itself with a simpler input

## Simple Example: Countdown

```python
def countdown(n):
    # Base case: stop when we reach 0
    if n <= 0:
        print("Done!")
    else:
        # Recursive case
        print(n)
        countdown(n - 1)  # Call itself with smaller number

countdown(3)
```

**Output:**
```
3
2
1
Done!
```

**How it works:**
1. `countdown(3)` prints 3, then calls `countdown(2)`
2. `countdown(2)` prints 2, then calls `countdown(1)`
3. `countdown(1)` prints 1, then calls `countdown(0)`
4. `countdown(0)` hits the base case and prints "Done!"

## Real-World Analogy

Think of Russian nesting dolls:
- Opening one doll reveals a smaller doll inside
- You keep opening dolls (recursion) until you find the smallest one (base case)
- Then you're done!

## Common Use Cases
- Calculating factorials
- Tree/graph traversal
- Sorting algorithms (quicksort, mergesort)
- Processing nested structures

```

[

  {

    "message": {

      "content": [],

      "id": "msg_01UgonW6EAQVn2dqA3yEGcj6",

      "model": "claude-sonnet-4-5-20250929",

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

        "inference_geo": "not_available",

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

      "text": " Recursion Explained\n\n**Recursion** is when a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.\n\n## Key Components",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n\n1. **Base case**: A condition that stops the recursion\n2. **Recursive case**: The function calling itself with a simpler input\n\n## Simple Example: Countdown",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n\n```python\ndef countdown(n):\n    # Base case: stop when we reach 0\n    if n <= 0:\n        print(\"Done!\")\n    else:\n        # Recursive case",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n        print(n)\n        countdown(n - 1)  # Call itself with smaller number\n\ncountdown(3",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ")\n```\n\n**Output:**\n```\n3\n2\n1\nDone!\n```\n\n**How it works:**\n1. `countdown(3)` prints 3, then calls `countdown(2)`",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n2. `countdown(2)` prints 2, then calls `countdown(1)`\n3. `countdown(1)` prints 1, then calls `countdown(0)`\n4. `countdown(0)` hits the base case and prints",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " \"Done!\"\n\n## Real-World Analogy\n\nThink of Russian nesting dolls:\n- Opening one",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": " doll reveals a smaller doll inside\n- You keep opening dolls (recursion",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": ") until you find the smallest one (base case)\n- Then you're done!\n\n## Common Use Cases",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n- Calculating factorials\n- Tree/graph traversal\n- Sorting algorithms (quicksort, mergesort)",

      "type": "text_delta"

    },

    "index": 0,

    "type": "content_block_delta"

  },

  {

    "delta": {

      "text": "\n- Processing nested structures",

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

      "output_tokens": 349

    }

  },

  {

    "type": "message_stop"

  }

]


```

## Parameters

* [ Input ](#tab-panel-240)
* [ Output ](#tab-panel-241)

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
