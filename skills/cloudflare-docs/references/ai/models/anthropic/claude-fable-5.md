---
title: Claude Fable 5
description: Claude Fable 5 is Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work. Adaptive thinking is always on, and the model supports a 1M token context window with up to 128k output tokens per request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Fable 5 

Text Generation • Anthropic 

`anthropic/claude-fable-5` 

Claude Fable 5 is Anthropic's most capable widely released model, built for the most demanding reasoning and long-horizon agentic work. Adaptive thinking is always on, and the model supports a 1M token context window with up to 128k output tokens per request.

| Model Info                                                                 |                                                                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                           |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                 |
| More information                                                           | [link ↗](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)           |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-fable-5) |

## Usage

* [ TypeScript ](#tab-panel-112)
* [ cURL ](#tab-panel-113)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-fable-5',

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

  "model": "anthropic/claude-fable-5",

  "max_tokens": 1024,

  "messages": [

    {

      "content": "What are the three laws of thermodynamics?",

      "role": "user"

    }

  ]

}'


```

* [ Output ](#tab-panel-118)
* [ Raw response ](#tab-panel-119)

# The Three Laws of Thermodynamics

## First Law: Conservation of Energy
Energy cannot be created or destroyed—only converted from one form to another. The total energy of an isolated system remains constant.

**In practice:** When you burn fuel, the chemical energy isn't lost; it converts to heat, light, and mechanical energy.

Mathematically: ΔU = Q − W (the change in internal energy equals heat added minus work done by the system)

## Second Law: Entropy Always Increases
The entropy (disorder) of an isolated system always increases over time. Heat flows naturally from hot objects to cold objects, never the reverse, without external work.

**In practice:** This is why perpetual motion machines are impossible, why engines can never be 100% efficient, and why ice melts in a warm room rather than the room freezing.

## Third Law: Absolute Zero is Unattainable
As a system approaches absolute zero (0 Kelvin, or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.

**In practice:** You can get incredibly close to absolute zero (scientists have reached billionths of a degree above it), but never actually reach it.

---

**Bonus — The Zeroth Law:** Added later but considered more fundamental: if two systems are each in thermal equilibrium with a third system, they're in equilibrium with each other. This is what makes temperature measurement meaningful.

A popular informal summary: *"You can't win, you can't break even, and you can't quit the game."*

```

{

  "id": "msg_01R3mtPDk8nz2GtgZ4kaEV3h",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "thinking",

      "thinking": "",

      "signature": "CAIS/wIKYggOGAIqQL2DImxiS8eomHBT27EP6Vq1yIKYk7FRawnvr1x+JIqaaG1HvobVpukDf+fT2jalSaimOBFM4xpQ9qid41A7FHwyDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgwBC6HD8DwzUmOkyTQaDA5iwoIP4Sl4FtT7qiIwFuaXYp6DyWTfvs6Ahk5Q9ZPAmlRNmzJkLKAW4RQJezq8Es3Bch5pzRYS/RXbrv1LKsoBnj/bv7kwQDxJ9VF6P5YRlAja59MF3h7ILd/yMtP1eSQIMzxtZGUpg0Bg+8Yn2Z/iotpNB3+F1tGgLAv6wd2LZWAe0bAwoulFHOBYqGNQ0ZZELxm6B1y79x304TxxV/KOmpjhE9kXoxvxgv0WywAKR3qh4ERzJjaLA0w7WrhkGXnfOBnoGOCpENOhMBEI9NtbR+vtxn/H1LOeTz3wB1i/oXxG3ABrvfmZr2oa3dtP2W4WYiJtlQi5JtDcCf8EaPY95ay2uV0RjJAWsBgB"

    },

    {

      "type": "text",

      "text": "# The Three Laws of Thermodynamics\n\n## First Law: Conservation of Energy\nEnergy cannot be created or destroyed—only converted from one form to another. The total energy of an isolated system remains constant.\n\n**In practice:** When you burn fuel, the chemical energy isn't lost; it converts to heat, light, and mechanical energy.\n\nMathematically: ΔU = Q − W (the change in internal energy equals heat added minus work done by the system)\n\n## Second Law: Entropy Always Increases\nThe entropy (disorder) of an isolated system always increases over time. Heat flows naturally from hot objects to cold objects, never the reverse, without external work.\n\n**In practice:** This is why perpetual motion machines are impossible, why engines can never be 100% efficient, and why ice melts in a warm room rather than the room freezing.\n\n## Third Law: Absolute Zero is Unattainable\nAs a system approaches absolute zero (0 Kelvin, or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.\n\n**In practice:** You can get incredibly close to absolute zero (scientists have reached billionths of a degree above it), but never actually reach it.\n\n---\n\n**Bonus — The Zeroth Law:** Added later but considered more fundamental: if two systems are each in thermal equilibrium with a third system, they're in equilibrium with each other. This is what makes temperature measurement meaningful.\n\nA popular informal summary: *\"You can't win, you can't break even, and you can't quit the game.\"*"

    }

  ],

  "model": "claude-fable-5",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 20,

    "output_tokens": 576

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

* [ TypeScript ](#tab-panel-114)
* [ cURL ](#tab-panel-115)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-fable-5',

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

  "model": "anthropic/claude-fable-5",

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

* [ Output ](#tab-panel-116)
* [ Raw response ](#tab-panel-117)

# Reading a JSON File in Python

Use the built-in `json` module:

```python
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data)
```

## Key Points

- **`json.load(file)`** — reads JSON from a *file object*
- **`json.loads(string)`** — reads JSON from a *string* (note the "s")

## Example

Given a file `data.json`:

```json
{
    "name": "Alice",
    "age": 30,
    "languages": ["Python", "JavaScript"]
}
```

You can access the data like a regular Python dictionary:

```python
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data["name"])         # Alice
print(data["age"])          # 30
print(data["languages"][0]) # Python
```

## Handling Errors

It's good practice to handle common issues:

```python
import json

try:
    with open("data.json", "r") as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

## Type Conversions

JSON types map to Python types automatically:

| JSON | Python |
|------|--------|
| object | `dict` |
| array | `list` |
| string | `str` |
| number | `int` / `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

That's it! For writing JSON, use `json.dump(data, file)` instead.

```

{

  "id": "msg_01AoDTx5LghjgrjrHgPpkiui",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "text",

      "text": "# Reading a JSON File in Python\n\nUse the built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Key Points\n\n- **`json.load(file)`** — reads JSON from a *file object*\n- **`json.loads(string)`** — reads JSON from a *string* (note the \"s\")\n\n## Example\n\nGiven a file `data.json`:\n\n```json\n{\n    \"name\": \"Alice\",\n    \"age\": 30,\n    \"languages\": [\"Python\", \"JavaScript\"]\n}\n```\n\nYou can access the data like a regular Python dictionary:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\") as file:\n    data = json.load(file)\n\nprint(data[\"name\"])         # Alice\nprint(data[\"age\"])          # 30\nprint(data[\"languages\"][0]) # Python\n```\n\n## Handling Errors\n\nIt's good practice to handle common issues:\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\") as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n## Type Conversions\n\nJSON types map to Python types automatically:\n\n| JSON | Python |\n|------|--------|\n| object | `dict` |\n| array | `list` |\n| string | `str` |\n| number | `int` / `float` |\n| `true` / `false` | `True` / `False` |\n| `null` | `None` |\n\nThat's it! For writing JSON, use `json.dump(data, file)` instead."

    }

  ],

  "model": "claude-fable-5",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 38,

    "output_tokens": 513

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-120)
* [ cURL ](#tab-panel-121)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-fable-5',

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

  "model": "anthropic/claude-fable-5",

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

* [ Output ](#tab-panel-124)
* [ Raw response ](#tab-panel-125)

It depends on which route you take, so here are the highlights for each:

## Highway 1 (Pacific Coast Highway) — Scenic Route
This is the slowest but most beautiful option (10+ hours of driving, best split over 2+ days):

- **Half Moon Bay** – Charming coastal town, great for breakfast
- **Santa Cruz** – Beach boardwalk and surf culture
- **Monterey & Carmel-by-the-Sea** – World-class aquarium, 17-Mile Drive
- **Big Sur** – The crown jewel: Bixby Bridge, McWay Falls, dramatic cliffs
- **San Simeon** – Hearst Castle and elephant seal viewing at Piedras Blancas
- **Morro Bay** – Iconic Morro Rock
- **Pismo Beach** – Classic beach town
- **Santa Barbara** – Beautiful Spanish architecture, wineries, great food

## Highway 101 — Balanced Option (~7 hours)
- **San Jose / Gilroy** – Garlic capital of the world
- **Paso Robles** – Excellent wine country
- **San Luis Obispo** – Cute college town, Madonna Inn (worth seeing even just for the bathrooms)
- **Solvang** – Quirky Danish village with bakeries and windmills
- **Santa Barbara** – Same as above

## I-5 — Fastest Route (~5.5 hours)
Honestly, not much to see — it's mostly farmland. Harris Ranch is the classic food stop. Only take this if speed is the priority.

**My recommendation:** If you have the time, take Highway 1 at least through Big Sur, then cut over to 101. You get the best scenery without the full slow drive.

How many days do you have for the trip? That'll help narrow down the best plan.

```

{

  "id": "msg_01EwEx2XTC5pNdoT7PtTuXLq",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "thinking",

      "thinking": "",

      "signature": "CAISoAIKYggOGAIqQMlO95DiOtXNyD9qv654AmEcC1ASdAHhzQTsttiIfxm3PqYaLMrHm18ZiQThkonfmq61YPDFu1G6pyMX0eaLSnQyDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgyWam0aNaXTOFIOa5EaDMmDhR7yHWAr+COnviIw949Cqu4lKMTa8RYrcTgYgpsAP42lrDlRicsgtNdgAmWMWvuKUehGgIKEVQfhrS1CKmxdC9rpL8nQ92fa4nuPVoY2NU1QzAZCU+2WFapPArvpD8IwoP9oL7qTLE5Q8iU3HpX29l9p6cR+OVsB1z/RIpmDsQY6PQkvWG3qHC05f7zvc9VUdYaXEGBvw15wJh73m12yar0ydF5ZgvgWJcUYAQ=="

    },

    {

      "type": "text",

      "text": "It depends on which route you take, so here are the highlights for each:\n\n## Highway 1 (Pacific Coast Highway) — Scenic Route\nThis is the slowest but most beautiful option (10+ hours of driving, best split over 2+ days):\n\n- **Half Moon Bay** – Charming coastal town, great for breakfast\n- **Santa Cruz** – Beach boardwalk and surf culture\n- **Monterey & Carmel-by-the-Sea** – World-class aquarium, 17-Mile Drive\n- **Big Sur** – The crown jewel: Bixby Bridge, McWay Falls, dramatic cliffs\n- **San Simeon** – Hearst Castle and elephant seal viewing at Piedras Blancas\n- **Morro Bay** – Iconic Morro Rock\n- **Pismo Beach** – Classic beach town\n- **Santa Barbara** – Beautiful Spanish architecture, wineries, great food\n\n## Highway 101 — Balanced Option (~7 hours)\n- **San Jose / Gilroy** – Garlic capital of the world\n- **Paso Robles** – Excellent wine country\n- **San Luis Obispo** – Cute college town, Madonna Inn (worth seeing even just for the bathrooms)\n- **Solvang** – Quirky Danish village with bakeries and windmills\n- **Santa Barbara** – Same as above\n\n## I-5 — Fastest Route (~5.5 hours)\nHonestly, not much to see — it's mostly farmland. Harris Ranch is the classic food stop. Only take this if speed is the priority.\n\n**My recommendation:** If you have the time, take Highway 1 at least through Big Sur, then cut over to 101. You get the best scenery without the full slow drive.\n\nHow many days do you have for the trip? That'll help narrow down the best plan."

    }

  ],

  "model": "claude-fable-5",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 103,

    "output_tokens": 654

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Creative Writing with Adaptive Thinking**  — Use adaptive thinking with high effort to steer creative output. Adaptive thinking is always on for Claude Fable 5; use the \`effort\` parameter to control depth. 

* [ TypeScript ](#tab-panel-122)
* [ cURL ](#tab-panel-123)

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-fable-5',

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

  "model": "anthropic/claude-fable-5",

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

* [ Output ](#tab-panel-126)
* [ Raw response ](#tab-panel-127)

**The Paper Bird**

Detective Mara Voss had seen plenty of crime scenes in her fifteen years on the force, but never one this clean. The apartment looked staged, like a furniture showroom—not a fingerprint, not a stray hair, not so much as a coffee ring on the spotless kitchen counter. Even the victim, slumped peacefully in the armchair by the window, might have been napping if not for the medical examiner's grim verdict.

She was about to call it a night when she noticed it: a tiny origami crane perched on the bookshelf, tucked between a dictionary and a dog-eared travel guide to Portugal.

Mara pulled on a fresh glove and lifted the paper bird into the light. It was folded from a page of sheet music—she could see fragments of notes along the wings, a tempo marking creased into the tail. *Adagio*, it read. Slowly.

She turned it over, and her breath caught. There, written in red ink along the underside of one wing, in handwriting so small she had to squint:

*You're getting warmer.*

Mara looked around the silent apartment, at the body, at the door, at the window overlooking the rain-slicked street below. Three weeks ago, at the Halloran scene, she'd found a paper boat. She'd dismissed it then.

She wasn't dismissing it now.

Someone wasn't just killing people. Someone was leaving her a trail—and they knew she'd follow it.

```

{

  "id": "msg_01H7qU6WsJ1RdUUfb1FNUNp7",

  "type": "message",

  "role": "assistant",

  "content": [

    {

      "type": "thinking",

      "thinking": "",

      "signature": "CAIS+wEKYggOGAIqQFPxfBka1NRNW1rIQ1wZpAc+gQlviFi+V9+jNugw6OMNaHWQbkv9DsCcDURrvCSV+wk2roKaFG5XBywGYrr3kSsyDmNsYXVkZS1mYWJsZS01OAFCCHRoaW5raW5nEgyvo+jcJw5HIqgiDckaDDibIrfcOLshI3L72iIwm4V5PsoEX2t4CwqglakI/jVY8nj+//Tqt58ZmNHeYLa1JmUtvKONuh6F+F/N6izKKkdS8odduilutWhqmvZLN01d+R7Wi7gc/WxNPUean4c11emjGfKjWxZdqD6e17G1tuRxg8kfAPlOrcoCDCdBKUqr7a9K8R7kyhgB"

    },

    {

      "type": "text",

      "text": "**The Paper Bird**\n\nDetective Mara Voss had seen plenty of crime scenes in her fifteen years on the force, but never one this clean. The apartment looked staged, like a furniture showroom—not a fingerprint, not a stray hair, not so much as a coffee ring on the spotless kitchen counter. Even the victim, slumped peacefully in the armchair by the window, might have been napping if not for the medical examiner's grim verdict.\n\nShe was about to call it a night when she noticed it: a tiny origami crane perched on the bookshelf, tucked between a dictionary and a dog-eared travel guide to Portugal.\n\nMara pulled on a fresh glove and lifted the paper bird into the light. It was folded from a page of sheet music—she could see fragments of notes along the wings, a tempo marking creased into the tail. *Adagio*, it read. Slowly.\n\nShe turned it over, and her breath caught. There, written in red ink along the underside of one wing, in handwriting so small she had to squint:\n\n*You're getting warmer.*\n\nMara looked around the silent apartment, at the body, at the door, at the window overlooking the rain-slicked street below. Three weeks ago, at the Halloran scene, she'd found a paper boat. She'd dismissed it then.\n\nShe wasn't dismissing it now.\n\nSomeone wasn't just killing people. Someone was leaving her a trail—and they knew she'd follow it."

    }

  ],

  "model": "claude-fable-5",

  "stop_reason": "end_turn",

  "usage": {

    "input_tokens": 26,

    "output_tokens": 488

  },

  "stop_sequence": null,

  "stop_details": null,

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-128)
* [ Output ](#tab-panel-129)

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

Input [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/anthropic/claude-fable-5/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
