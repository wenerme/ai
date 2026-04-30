---
title: GPT-5.5
description: GPT-5.5 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.5 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.5` 

GPT-5.5 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-302)
* [ Output ](#tab-panel-303)

```

{

    "messages": [

        {

            "role": "user",

            "content": "What are the three laws of thermodynamics?"

        }

    ]

}


```

```

{

    "text": "The **three laws of thermodynamics** are:\n\n1. **First Law — Conservation of Energy**  \n   Energy cannot be created or destroyed, only transferred or transformed.  \n   In thermodynamics, this is often written as:  \n   \\[\n   \\Delta U = Q - W\n   \\]  \n   where \\(\\Delta U\\) is the change in internal energy, \\(Q\\) is heat added, and \\(W\\) is work done by the system.\n\n2. **Second Law — Entropy Increases**  \n   In an isolated system, entropy tends to increase over time.  \n   This means natural processes tend to move toward greater disorder or energy dispersal, and heat flows spontaneously from hot objects to cold ones.\n\n3. **Third Law — Absolute Zero Is Unattainable**  \n   As the temperature of a perfect crystal approaches absolute zero, its entropy approaches zero.  \n   It also implies that absolute zero, \\(0\\,K\\), cannot be reached by any finite physical process.\n\nThere is also a **Zeroth Law**, which says that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the basis for temperature measurement."

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'system',

        content: 'You are a helpful coding assistant specializing in Python.',

      },

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-304)
* [ Output ](#tab-panel-305)

```

{

    "messages": [

        {

            "role": "system",

            "content": "You are a helpful coding assistant specializing in Python."

        },

        {

            "role": "user",

            "content": "How do I read a JSON file in Python?"

        }

    ]

}


```

```

{

    "text": "You can read a JSON file in Python using the built-in `json` module.\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\nIf `data.json` contains:\n\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30\n}\n```\n\nThen `data` will be a Python dictionary:\n\n```python\n{\n    \"name\": \"Alice\",\n    \"age\": 30\n}\n```\n\nYou can access values like this:\n\n```python\nprint(data[\"name\"])  # Alice\nprint(data[\"age\"])   # 30\n```\n\nA slightly more explicit version with encoding:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n    data = json.load(file)\n```\n\nIf you have a JSON string instead of a file, use `json.loads()`:\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data[\"name\"])\n```"

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

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

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-308)
* [ Output ](#tab-panel-309)

```

{

    "messages": [

        {

            "role": "user",

            "content": "I need help planning a road trip from San Francisco to Los Angeles."

        },

        {

            "role": "assistant",

            "content": "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"

        },

        {

            "role": "user",

            "content": "Yes, what are some good places to stop?"

        }

    ],

    "max_completion_tokens": 2048

}


```

```

{

    "text": "Absolutely — the best stops depend on whether you take the **scenic coastal route** or the **faster inland route**.\n\n## Scenic Route: Highway 1 / 101\nThis is the classic California road trip route, best if you have **1–3 days**.\n\n### Great stops from north to south\n- **Half Moon Bay** – Coastal views, beaches, and a nice breakfast/lunch stop.\n- **Santa Cruz** – Beach Boardwalk, surfing, casual food, fun atmosphere.\n- **Monterey** – Monterey Bay Aquarium, Cannery Row, harbor views.\n- **Carmel-by-the-Sea** – Beautiful village, beach, shops, and restaurants.\n- **Big Sur** – One of the most scenic stretches in California. Stop at:\n  - Bixby Bridge\n  - Pfeiffer Beach\n  - McWay Falls\n- **San Simeon / Hearst Castle** – Tour Hearst Castle or see the elephant seals nearby.\n- **Paso Robles** – Wine tasting and good restaurants, especially if you cut inland.\n- **San Luis Obispo** – Great overnight stop; downtown, Mission Plaza, good food.\n- **Pismo Beach** – Beach stop, pier, clam chowder.\n- **Solvang** – Danish-style town with bakeries, wine tasting, and cute streets.\n- **Santa Barbara** – One of the best stops: beaches, State Street, the courthouse, Funk Zone.\n- **Malibu** – Scenic coastal drive, beaches, and a final stop before LA.\n\n## Faster Route: I-5\nBest if you want to get to LA quickly, about **5.5–6.5 hours** depending on traffic.\n\nGood practical stops:\n- **Casa de Fruta** – Roadside stop with snacks, fruit, and restrooms.\n- **Harris Ranch** – Popular meal stop, especially for steak.\n- **Kettleman City** – Gas, food, and a good halfway break.\n- **Tejon Ranch / Grapevine area** – Final major stop before entering LA traffic.\n\n## My recommendation\nIf you have the time, do at least **one overnight** and take the coast:\n\n**Day 1:** San Francisco → Santa Cruz → Monterey/Carmel → Big Sur → San Luis Obispo  \n**Day 2:** San Luis Obispo → Solvang → Santa Barbara → Malibu → Los Angeles\n\nAlso, check current road conditions for **Highway 1 near Big Sur**, since closures can happen due to landslides."

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-306)
* [ Output ](#tab-panel-307)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Write a short story opening about a detective finding an unusual clue."

        }

    ],

    "max_completion_tokens": 2048

}


```

```

{

    "text": "Detective Mara Venn found the clue inside the grandfather clock, though the clock had not worked in twenty years.\n\nThe house was silent around her, all velvet shadows and rain-streaked windows, the kind of silence that made every breath feel borrowed. Lord Edevane’s body lay in the study below, surrounded by overturned books, broken glass, and enough obvious evidence to make Mara immediately distrust all of it.\n\nShe had come upstairs only because of the ticking.\n\nIt was faint, irregular, and impossible.\n\nMara opened the clock’s warped oak door and raised her lantern. No weights. No pendulum. No mechanism at all.\n\nJust a small glass vial hanging from a red thread.\n\nInside the vial was a single human tooth, etched with three tiny words in gold:\n\n**ASK THE DEAD.**"

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    stream: true,

    stream_options: {

      include_usage: true,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-310)
* [ Output ](#tab-panel-311)

```

{

    "messages": [

        {

            "role": "user",

            "content": "Explain the concept of recursion with a simple example."

        }

    ],

    "stream": true,

    "stream_options": {

        "include_usage": true

    }

}


```

```

{

    "text": [

        "Rec",

        "ursion",

        " is",

        " when",

        " a",

        " function",

        " solves",

        " a",

        " problem",

        " by",

        " calling",

        " itself",

        " with",

        " a",

        " smaller",

        " or",

        " simpler",

        " version",

        " of",

        " the",

        " same",

        " problem",

        ".\n\n",

        "A",

        " recursion",

        " usually",

        " has",

        " two",

        " parts",

        ":\n\n",

        "1",

        ".",

        " **",

        "Base",

        " case",

        "**",

        ":",

        " when",

        " to",

        " stop",

        " calling",

        " itself",

        ".\n",

        "2",

        ".",

        " **",

        "Recursive",

        " case",

        "**",

        ":",

        " the",

        " part",

        " where",

        " the",

        " function",

        " calls",

        " itself",

        ".\n\n",

        "Example",

        ":",

        " counting",

        " down",

        " from",

        " a",

        " number",

        ".\n\n",

        "```",

        "python",

        "\n",

        "def",

        " countdown",

        "(n",

        "):\n",

        "   ",

        " if",

        " n",

        " ==",

        " ",

        "0",

        ":",

        "         ",

        " #",

        " base",

        " case",

        "\n",

        "       ",

        " print",

        "(\"",

        "Done",

        "!\")\n",

        "   ",

        " else",

        ":\n",

        "       ",

        " print",

        "(n",

        ")\n",

        "       ",

        " countdown",

        "(n",

        " -",

        " ",

        "1",

        ")",

        " #",

        " recursive",

        " case",

        "\n\n",

        "count",

        "down",

        "(",

        "3",

        ")\n",

        "``",

        "`\n\n",

        "Output",

        ":\n\n",

        "```",

        "text",

        "\n",

        "3",

        "\n",

        "2",

        "\n",

        "1",

        "\n",

        "Done",

        "!\n",

        "``",

        "`\n\n",

        "Here",

        " is",

        " what",

        " happens",

        ":\n\n",

        "-",

        " `",

        "count",

        "down",

        "(",

        "3",

        ")`",

        " prints",

        " `",

        "3",

        "`,",

        " then",

        " calls",

        " `",

        "count",

        "down",

        "(",

        "2",

        ")`\n",

        "-",

        " `",

        "count",

        "down",

        "(",

        "2",

        ")`",

        " prints",

        " `",

        "2",

        "`,",

        " then",

        " calls",

        " `",

        "count",

        "down",

        "(",

        "1",

        ")`\n",

        "-",

        " `",

        "count",

        "down",

        "(",

        "1",

        ")`",

        " prints",

        " `",

        "1",

        "`,",

        " then",

        " calls",

        " `",

        "count",

        "down",

        "(",

        "0",

        ")`\n",

        "-",

        " `",

        "count",

        "down",

        "(",

        "0",

        ")`",

        " reaches",

        " the",

        " base",

        " case",

        " and",

        " stops",

        "\n\n",

        "So",

        ",",

        " recursion",

        " is",

        " like",

        " breaking",

        " a",

        " problem",

        " into",

        " smaller",

        " versions",

        " of",

        " itself",

        " until",

        " reaching",

        " a",

        " stopping",

        " point",

        "."

    ]

}


```

## Parameters

* [ Input ](#tab-panel-312)
* [ Output ](#tab-panel-313)

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
