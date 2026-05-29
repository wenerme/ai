---
title: Claude Opus 4.8
description: Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.8 

Text Generation • Anthropic • Proxied 

`anthropic/claude-opus-4.8` 

Claude Opus 4.8 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.7\. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.8) |

## Usage

* [ TypeScript ](#tab-panel-160)
* [ cURL ](#tab-panel-161)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.8',

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

  "model": "anthropic/claude-opus-4.8",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "What are the three laws of thermodynamics?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-164)
* [ Raw response ](#tab-panel-165)

# The Three Laws of Thermodynamics

There are actually **four** laws when you include the "Zeroth Law," but here are the three classic laws (I'll mention the zeroth too for completeness):

## Zeroth Law
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of temperature.

## First Law (Conservation of Energy)
Energy cannot be created or destroyed, only transformed from one form to another. The change in a system's internal energy equals the heat added to it minus the work it does.

**Equation:** ΔU = Q − W

*In simple terms:* You can't get something for nothing—energy is always conserved.

## Second Law (Entropy)
The total entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold, never spontaneously the reverse.

*In simple terms:* Things naturally tend toward disorder, and you can't build a perfectly efficient engine.

## Third Law (Absolute Zero)
As a system approaches absolute zero (0 Kelvin, −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.

*In simple terms:* You can't actually reach absolute zero.

---

**A popular humorous summary:**
1. You can't win (energy is conserved)
2. You can't break even (entropy always increases)
3. You can't quit the game (can't reach absolute zero)

Let me know if you'd like a deeper explanation of any of these!

```

{

  "id": "msg_01UJHCa5HEKFSjvGy8y7nNJ8",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# The Three Laws of Thermodynamics\n\nThere are actually **four** laws when you include the \"Zeroth Law,\" but here are the three classic laws (I'll mention the zeroth too for completeness):\n\n## Zeroth Law\nIf two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of temperature.\n\n## First Law (Conservation of Energy)\nEnergy cannot be created or destroyed, only transformed from one form to another. The change in a system's internal energy equals the heat added to it minus the work it does.\n\n**Equation:** ΔU = Q − W\n\n*In simple terms:* You can't get something for nothing—energy is always conserved.\n\n## Second Law (Entropy)\nThe total entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold, never spontaneously the reverse.\n\n*In simple terms:* Things naturally tend toward disorder, and you can't build a perfectly efficient engine.\n\n## Third Law (Absolute Zero)\nAs a system approaches absolute zero (0 Kelvin, −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n\n*In simple terms:* You can't actually reach absolute zero.\n\n---\n\n**A popular humorous summary:**\n1. You can't win (energy is conserved)\n2. You can't break even (entropy always increases)\n3. You can't quit the game (can't reach absolute zero)\n\nLet me know if you'd like a deeper explanation of any of these!"

    }

  ],

  "model": "claude-queso-eap",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 20,

    "output_tokens": 520

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**With System Message**  — Using a system message to set context 

* [ TypeScript ](#tab-panel-162)
* [ cURL ](#tab-panel-163)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.8',

  {

    max_tokens: 1024,

    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],

    system: 'You are a helpful coding assistant specializing in Python.',

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

  "model": "anthropic/claude-opus-4.8",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "How do I read a JSON file in Python?",

      "role": "user"

    }

  ],

  "system": "You are a helpful coding assistant specializing in Python."

}'


```

* [ Output ](#tab-panel-166)
* [ Raw response ](#tab-panel-167)

# Reading a JSON File in Python

Python's built-in `json` module makes this easy. Here's how:

## Basic Method

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

- `json.load()` reads from a **file object** and parses the JSON into a Python object (usually a `dict` or `list`).
- Using `with open(...)` ensures the file is closed automatically.

## Specifying Encoding (Recommended)

It's good practice to specify the encoding explicitly:

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

## Reading from a JSON String

If you have JSON as a **string** instead of a file, use `json.loads()` (note the `s` for "string"):

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data['name'])  # Alice
```

## Handling Errors

It's wise to handle potential issues:

```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
except FileNotFoundError:
    print("The file was not found.")
except json.JSONDecodeError:
    print("The file contains invalid JSON.")
```

## Quick Reference

| Function | Use Case |
|----------|----------|
| `json.load(file)` | Read from a file object |
| `json.loads(string)` | Parse from a string |
| `json.dump(obj, file)` | Write to a file |
| `json.dumps(obj)` | Convert to a string |

Let me know if you'd like help **writing** JSON or working with a specific data structure!

```

{

  "id": "msg_01HPeNQZ66acTPaXFtXFGU3D",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# Reading a JSON File in Python\n\nPython's built-in `json` module makes this easy. Here's how:\n\n## Basic Method\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n- `json.load()` reads from a **file object** and parses the JSON into a Python object (usually a `dict` or `list`).\n- Using `with open(...)` ensures the file is closed automatically.\n\n## Specifying Encoding (Recommended)\n\nIt's good practice to specify the encoding explicitly:\n\n```python\nimport json\n\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n## Reading from a JSON String\n\nIf you have JSON as a **string** instead of a file, use `json.loads()` (note the `s` for \"string\"):\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data['name'])  # Alice\n```\n\n## Handling Errors\n\nIt's wise to handle potential issues:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"The file contains invalid JSON.\")\n```\n\n## Quick Reference\n\n| Function | Use Case |\n|----------|----------|\n| `json.load(file)` | Read from a file object |\n| `json.loads(string)` | Parse from a string |\n| `json.dump(obj, file)` | Write to a file |\n| `json.dumps(obj)` | Convert to a string |\n\nLet me know if you'd like help **writing** JSON or working with a specific data structure!"

    }

  ],

  "model": "claude-queso-eap",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 38,

    "output_tokens": 575

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-170)
* [ cURL ](#tab-panel-171)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.8',

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

  "model": "anthropic/claude-opus-4.8",

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

* [ Output ](#tab-panel-172)
* [ Raw response ](#tab-panel-173)

Here are some great stops along the way, depending on which route you take:

## If You Take Highway 1 (Pacific Coast Highway) — Scenic but Slower
This route adds time but offers stunning coastal views.

- **Santa Cruz** – Beach boardwalk, classic seaside vibe
- **Monterey** – World-famous aquarium, Cannery Row
- **Carmel-by-the-Sea** – Charming village, beautiful beaches
- **Big Sur** – Dramatic cliffs, Bixby Bridge, hiking (a must-see!)
- **Hearst Castle** (San Simeon) – Opulent historic estate, tours available
- **Pismo Beach** – Sand dunes, laid-back beach town

## If You Take Highway 101 — Balanced Option
Faster than Highway 1 but still scenic in parts.

- **Gilroy** – The "Garlic Capital," outlet shopping
- **Paso Robles** – Excellent wine country
- **San Luis Obispo** – Cute college town, good food
- **Santa Barbara** – Beautiful "American Riviera," Spanish architecture, wineries

## If You Take Interstate 5 — Fastest Route
The quickest way (about 5-6 hours) but mostly flat farmland with little scenery.

- **Kettleman City** – Main rest/fuel stop
- Not many attractions, but great if you're short on time

---

A few questions to help me refine suggestions:
1. **How much time** do you have for the trip? (One day or multiple?)
2. **What interests you most** — nature, food, beaches, history?
3. Are you traveling **solo, as a couple, or with family/kids**?

Let me know and I can help build an itinerary!

```

{

  "id": "msg_014YutctbptEfx7RyuVjoFSk",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "Here are some great stops along the way, depending on which route you take:\n\n## If You Take Highway 1 (Pacific Coast Highway) — Scenic but Slower\nThis route adds time but offers stunning coastal views.\n\n- **Santa Cruz** – Beach boardwalk, classic seaside vibe\n- **Monterey** – World-famous aquarium, Cannery Row\n- **Carmel-by-the-Sea** – Charming village, beautiful beaches\n- **Big Sur** – Dramatic cliffs, Bixby Bridge, hiking (a must-see!)\n- **Hearst Castle** (San Simeon) – Opulent historic estate, tours available\n- **Pismo Beach** – Sand dunes, laid-back beach town\n\n## If You Take Highway 101 — Balanced Option\nFaster than Highway 1 but still scenic in parts.\n\n- **Gilroy** – The \"Garlic Capital,\" outlet shopping\n- **Paso Robles** – Excellent wine country\n- **San Luis Obispo** – Cute college town, good food\n- **Santa Barbara** – Beautiful \"American Riviera,\" Spanish architecture, wineries\n\n## If You Take Interstate 5 — Fastest Route\nThe quickest way (about 5-6 hours) but mostly flat farmland with little scenery.\n\n- **Kettleman City** – Main rest/fuel stop\n- Not many attractions, but great if you're short on time\n\n---\n\nA few questions to help me refine suggestions:\n1. **How much time** do you have for the trip? (One day or multiple?)\n2. **What interests you most** — nature, food, beaches, history?\n3. Are you traveling **solo, as a couple, or with family/kids**?\n\nLet me know and I can help build an itinerary!"

    }

  ],

  "model": "claude-queso-eap",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 103,

    "output_tokens": 583

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Creative Writing with Adaptive Thinking**  — Use adaptive thinking with high effort to steer creative output -- the recommended replacement for the deprecated \`temperature\` parameter. 

* [ TypeScript ](#tab-panel-174)
* [ cURL ](#tab-panel-175)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.8',

  {

    max_tokens: 2048,

    messages: [

      {

        content: 'Write a short story opening about a detective finding an unusual clue.',

        role: 'user',

      },

    ],

    output_config: { effort: 'high' },

    thinking: { type: 'adaptive' },

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

  "model": "anthropic/claude-opus-4.8",

  "max_tokens": 2048,

  "messages": [

    {

      "content": "Write a short story opening about a detective finding an unusual clue.",

      "role": "user"

    }

  ],

  "output_config": {

    "effort": "high"

  },

  "thinking": {

    "type": "adaptive"

  }

}'


```

* [ Output ](#tab-panel-176)
* [ Raw response ](#tab-panel-177)

Detective Mara Voss had seen blood spatter shaped like everything from constellations to corporate logos, but she'd never seen a crime scene that smelled like oranges.

She paused in the doorway of the dead man's study, notebook half-raised, and breathed in again. Citrus, bright and unmistakable, layered over the expected copper tang. No fruit bowl. No air freshener. No candle that she could see.

"You smell that?" she asked.

Behind her, Officer Reyes shrugged. "Smell what?"

Mara stepped carefully around the chalk-pale shape on the hardwood—Gerald Finch, sixty-three, retired accountant, found by his housekeeper at seven that morning. The scent grew stronger as she approached the desk, and there, beneath the man's outstretched right hand, she found it.

A single dried orange peel, curled into a tight spiral, placed deliberately atop a blank sheet of paper.

Not dropped. Not discarded. *Placed.* The spiral wound clockwise, perfectly even, the way a person might twist a peel if they had all the time in the world and very steady hands.

Mara crouched, knees popping, and studied it without touching. Gerald Finch lived alone. Gerald Finch, according to three separate neighbors, was allergic to citrus.

So the question wasn't who had killed him.

The question was who had sat here, calm as a churchgoer, peeling an orange beside a dying man—and why they'd wanted her to know it.

```

{

  "id": "msg_017M9L3VVeQg7PVJC4CZgpEq",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "Detective Mara Voss had seen blood spatter shaped like everything from constellations to corporate logos, but she'd never seen a crime scene that smelled like oranges.\n\nShe paused in the doorway of the dead man's study, notebook half-raised, and breathed in again. Citrus, bright and unmistakable, layered over the expected copper tang. No fruit bowl. No air freshener. No candle that she could see.\n\n\"You smell that?\" she asked.\n\nBehind her, Officer Reyes shrugged. \"Smell what?\"\n\nMara stepped carefully around the chalk-pale shape on the hardwood—Gerald Finch, sixty-three, retired accountant, found by his housekeeper at seven that morning. The scent grew stronger as she approached the desk, and there, beneath the man's outstretched right hand, she found it.\n\nA single dried orange peel, curled into a tight spiral, placed deliberately atop a blank sheet of paper.\n\nNot dropped. Not discarded. *Placed.* The spiral wound clockwise, perfectly even, the way a person might twist a peel if they had all the time in the world and very steady hands.\n\nMara crouched, knees popping, and studied it without touching. Gerald Finch lived alone. Gerald Finch, according to three separate neighbors, was allergic to citrus.\n\nSo the question wasn't who had killed him.\n\nThe question was who had sat here, calm as a churchgoer, peeling an orange beside a dying man—and why they'd wanted her to know it."

    }

  ],

  "model": "claude-queso-eap",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 26,

    "output_tokens": 492

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Streaming Response**  — Enable streaming for real-time output 

* [ TypeScript ](#tab-panel-168)
* [ cURL ](#tab-panel-169)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.8',

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

  "model": "anthropic/claude-opus-4.8",

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

## Parameters

* [ Input ](#tab-panel-178)
* [ Output ](#tab-panel-179)

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
