---
title: GPT-5.4 Nano
description: GPT-5.4 Nano is OpenAI's smallest and fastest model, optimized for edge and low-latency use cases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 Nano 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4-nano` 

GPT-5.4 Nano is OpenAI's smallest and fastest model, optimized for edge and low-latency use cases.

| Model Info                                                                 |                                                                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                        |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                                |
| More information                                                           | [link ↗](https://openai.com/)                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4-nano) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-352)
* [ Output ](#tab-panel-353)

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

    "text": "The three laws of thermodynamics are:\n\n1. **Zeroth Law (thermal equilibrium):**  \n   If system A is in thermal equilibrium with system B, and system B is in thermal equilibrium with system C, then A is in thermal equilibrium with C.  \n   *This law justifies the concept of temperature.*\n\n2. **First Law (conservation of energy):**  \n   Energy cannot be created or destroyed. It can only be transferred or transformed.  \n   *In thermodynamics:* the change in internal energy of a system equals heat added to the system minus work done by the system.\n\n3. **Second Law (entropy and direction of processes):**  \n   Natural processes occur in a direction that increases the **total entropy** of the universe (or, equivalently, they tend to go from more ordered to less ordered forms).  \n   It also implies that **not all heat can be converted into work** in a cyclical process.\n\n*(There is also a “Third Law,” often presented alongside these as the third in the series.)*\n\n4. **Third Law (absolute zero):**  \n   As temperature approaches absolute zero (0 K), the entropy of a perfect crystal approaches a constant minimum value (typically zero).  \n   It is impossible to reach absolute zero in a finite number of steps."

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-354)
* [ Output ](#tab-panel-355)

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

Explain Code

```

{

    "text": "You can read a JSON file in Python using the built-in `json` module.\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)  # data is now a Python dict/list depending on the JSON\n```\n\n**Notes:**\n- Use `json.load(f)` to read from a file object.\n- If your JSON file is an array at the top level, `data` will be a `list`; if it’s an object, it’ll be a `dict`.\n\nIf you want to read a JSON string instead (not a file), use `json.loads(s)`."

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-358)
* [ Output ](#tab-panel-359)

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

Explain Code

```

{

    "text": "Absolutely—here are some great stop ideas on a typical San Francisco → Los Angeles road trip (assuming you’ll mostly take **I‑5 or US‑101**). I’ll list them by region so you can mix and match based on time and interests.\n\n## Best quick stops (easy to add)\n### Along/near the coast (great views)\n- **Half Moon Bay** – beaches, scenic overlooks, quick coffee/food stops.\n- **Santa Cruz (if you take/near US‑101)** – boardwalk area, viewpoints; fun even for a short stop.\n- **Monterey Bay / Cannery Row** – aquarium area and coastal scenery.\n- **Big Sur viewpoints (if you do the coastal route)**  \n  - Common highlights: **Bixby Bridge**, **McWay Falls (if open)**, scenic pullouts along Highway 1.\n\n> Note: Big Sur can be slower and is weather-dependent (and Highway 1 sections can close occasionally), so plan with current conditions if you choose this.\n\n### Classic “Hollywood-adjacent” vibes\n- **Santa Barbara** – charming downtown, good food, beach walk.\n- **Solvang** – Danish-style village theme; silly/fun stop for snacks and photos.\n\n## Major “worth it” detours (more time, bigger payoff)\n### Wine country (if you like food + views)\n- **Santa Rosa / Healdsburg (Sonoma County)** – wineries, farm stands, tastings.\n- **Napa Valley (if you want a big wine day)** – mostly if you’re okay with a longer detour.\n\n### Redwood / nature stops\n- **Henry Cowell Redwoods State Park (near Santa Cruz)** – redwood trails without a huge detour.\n- **Giant redwoods near Monterey area / Big Basin (depending on route)** – more forest time.\n\n### Route/landscape highlights on inland routes\nIf you go more inland (often faster, less coastline):\n- **Gilroy** – quick stop for garlic-themed food or outlets.\n- **Central Valley roadside stops** – quick lunch breaks, but fewer “must-see” landmarks.\n\n## A few “choose based on your route” suggestions\n- **If you take US‑101 (often prettier / more towns):** Half Moon Bay → Santa Cruz → Monterey → Santa Barbara → LA.\n- **If you take I‑5 (usually faster):** San Jose area → Paso Robles (good mid-way option) → Santa Barbara → LA.\n- **If you want the iconic scenery:** prioritize **Highway 1 / Big Sur** (best views, slower, more planning).\n\n---\n\n### Quick questions so I can tailor a perfect stop list + itinerary\n1. What month (or approximate dates) are you going?\n2. Do you prefer **coastal views (slower, scenic)** or **faster/inland (more driving, fewer views)**?\n3. How many days do you want (e.g., 1 long day vs 2–3 days)?\n4. Any interests: beaches, hiking, wine, kitschy towns, food stops, museums?\n\nAnswer those and I’ll propose a specific route with 6–12 stops, estimated timing, and backup options."

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-356)
* [ Output ](#tab-panel-357)

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

    "text": "The rain had been falling long enough to turn the city’s neon into smeared watercolor, but it hadn’t softened the edges of the crime scene.\n\nDetective Mara Kincaid stood just inside the taped perimeter, her coat dark with moisture and her mind sharper than the puddles gathering at her feet. The victim’s apartment sat above a shuttered bakery, its windows fogged from the inside, its hallway smelling faintly of citrus cleaner and burnt copper.\n\nA uniform officer hovered nearby, eager to be useful. “No signs of forced entry, Detective. The husband—” He stopped, corrected himself. “The occupant. He found them like this.”\n\nMara didn’t look up. She was kneeling by the threshold, letting her flashlight sweep the floorboards the way some people read scripture—slow, patient, searching for the lines that didn’t belong.\n\nSomething glittered against the worn grain of wood.\n\nIt wasn’t glass. It wasn’t glitter from a spilled drink. It didn’t catch the light like coins or broken jewelry. It caught it like… breath.\n\nA thin, translucent flake—no bigger than a fingernail clipping—lay half-buried in the seam between two planks. When Mara tilted her beam, the flake didn’t reflect so much as *remember*. The light seemed to sink into it and come back altered, as if the material were holding a picture just out of reach.\n\n“Don’t touch it,” she said automatically, though she hadn’t realized she’d spoken until the officer flinched.\n\nMara held her breath. The flake had a faint curve, like the edge of a leaf, and a delicate pattern of lines that didn’t resemble any natural vein. Under the flashlight, the pattern looked almost… intentional.\n\nShe lifted her gloved hand, stopped millimeters above it, and felt a temperature difference. The wood around it was cold with night air. The flake was warmer, as though it had just been pressed there.\n\nOn instinct, she slid a small evidence marker beside it without moving the flake itself. Then she leaned closer and listened—because in her line of work, some things weren’t just seen.\n\nAt first there was only the rain and the distant rumble of traffic.\n\nThen—barely audible beneath it—a soft, rhythmic *tick… tick… tick*, like a clock inside something too small to be a clock.\n\nMara straightened slowly, her stomach tightening. The unusual clue wasn’t just out of place.\n\nIt was *alive* in a way she couldn’t explain.\n\nBehind her, the officer cleared his throat. “Detective? Should we—uh—call for your tech?”\n\nMara didn’t answer right away. She stared at the flake until her eyes began to ache, watching the light tremble within it like it was trying to form a message.\n\nFinally, she said, “Yeah. And bring two sets of gloves.”\n\nShe stood, turning toward the apartment interior where the air felt heavy with everything that had already happened.\n\nWhatever left this behind didn’t want to be caught.\n\nBut it had made sure she’d look—down at the seam between boards—at the moment her flashlight found it.\n\nAs if it knew exactly where her curiosity would go next."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-nano',

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-362)
* [ Output ](#tab-panel-363)

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

Explain Code

```

{

    "text": [

        "Rec",

        "ursion",

        " is",

        " a",

        " programming",

        " technique",

        " where",

        " a",

        " function",

        " solves",

        " a",

        " problem",

        " by",

        " calling",

        " itself",

        " on",

        " smaller",

        " versions",

        " of",

        " the",

        " same",

        " problem",

        ".\n\n",

        "A",

        " key",

        " idea",

        " is",

        " that",

        " recursion",

        " usually",

        " needs",

        ":\n",

        "1",

        ".",

        " **",

        "A",

        " base",

        " case",

        "**",

        " (",

        "when",

        " to",

        " stop",

        ").\n",

        "2",

        ".",

        " **",

        "A",

        " recursive",

        " case",

        "**",

        " (",

        "the",

        " problem",

        " broken",

        " into",

        " a",

        " smaller",

        " sub",

        "problem",

        ").\n\n",

        "###",

        " Simple",

        " Example",

        ":",

        " Factor",

        "ial",

        "\n",

        "The",

        " factorial",

        " of",

        " a",

        " number",

        " *",

        "n",

        "*",

        " (",

        "written",

        " `",

        "n",

        "!",

        "`)",

        " is",

        ":\n",

        "-",

        " `",

        "n",

        "!",

        " =",

        " n",

        " ×",

        " (",

        "n",

        "-",

        "1",

        ")!",

        "`\n",

        "-",

        " with",

        " the",

        " base",

        " case",

        " `",

        "0",

        "!",

        " =",

        " ",

        "1",

        "`\n\n",

        "####",

        " Code",

        " (",

        "Python",

        "-like",

        " pseud",

        "ocode",

        ")\n",

        "```",

        "python",

        "\n",

        "def",

        " factorial",

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

        " return",

        " ",

        "1",

        "\n",

        "   ",

        " return",

        " n",

        " *",

        " factorial",

        "(n",

        " -",

        " ",

        "1",

        ")",

        " ",

        " #",

        " recursive",

        " case",

        "\n",

        "``",

        "`\n\n",

        "####",

        " What",

        " happens",

        " for",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        "?\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")",

        " =",

        " ",

        "4",

        " *",

        " factorial",

        "(",

        "3",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "3",

        ")",

        " =",

        " ",

        "3",

        " *",

        " factorial",

        "(",

        "2",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "2",

        ")",

        " =",

        " ",

        "2",

        " *",

        " factorial",

        "(",

        "1",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "1",

        ")",

        " =",

        " ",

        "1",

        " *",

        " factorial",

        "(",

        "0",

        ")`\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "0",

        ")",

        " =",

        " ",

        "1",

        "`\n\n",

        "So",

        ":",

        " `",

        "4",

        " *",

        " ",

        "3",

        " *",

        " ",

        "2",

        " *",

        " ",

        "1",

        " =",

        " ",

        "24",

        "`\n\n",

        "If",

        " you",

        " want",

        ",",

        " I",

        " can",

        " also",

        " show",

        " a",

        " recursion",

        " example",

        " like",

        " summ",

        "ing",

        " a",

        " list",

        " or",

        " travers",

        "ing",

        " a",

        " tree",

        "."

    ]

}


```

Explain Code

## Parameters

* [ Input ](#tab-panel-364)
* [ Output ](#tab-panel-365)

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

## API Schemas

* [ Input ](#tab-panel-360)
* [ Output ](#tab-panel-361)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "messages": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "role": {

            "type": "string",

            "enum": [

              "system",

              "developer",

              "user",

              "assistant",

              "tool"

            ]

          },

          "content": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "null"

              },

              {

                "type": "array",

                "items": {}

              }

            ]

          }

        },

        "required": [

          "role",

          "content"

        ],

        "additionalProperties": {}

      }

    },

    "temperature": {

      "type": "number",

      "minimum": 0,

      "maximum": 2

    },

    "max_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "max_completion_tokens": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "top_p": {

      "type": "number",

      "minimum": 0,

      "maximum": 1

    },

    "frequency_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2

    },

    "presence_penalty": {

      "type": "number",

      "minimum": -2,

      "maximum": 2

    },

    "stream": {

      "type": "boolean"

    },

    "stream_options": {

      "type": "object",

      "properties": {

        "include_usage": {

          "type": "boolean"

        }

      },

      "additionalProperties": false

    },

    "tools": {

      "type": "array",

      "items": {}

    },

    "tool_choice": {},

    "response_format": {}

  },

  "required": [

    "messages"

  ],

  "additionalProperties": {}

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "id": {

      "type": "string"

    },

    "object": {

      "type": "string"

    },

    "created": {

      "type": "number"

    },

    "model": {

      "type": "string"

    },

    "choices": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "index": {

            "type": "number"

          },

          "message": {

            "type": "object",

            "properties": {

              "role": {

                "type": "string"

              },

              "content": {

                "anyOf": [

                  {

                    "type": "string"

                  },

                  {

                    "type": "null"

                  }

                ]

              },

              "tool_calls": {

                "type": "array",

                "items": {}

              }

            },

            "required": [

              "role"

            ],

            "additionalProperties": {}

          },

          "finish_reason": {

            "anyOf": [

              {

                "type": "string"

              },

              {

                "type": "null"

              }

            ]

          }

        },

        "required": [

          "index",

          "message",

          "finish_reason"

        ],

        "additionalProperties": {}

      }

    },

    "usage": {

      "type": "object",

      "properties": {

        "prompt_tokens": {

          "type": "number"

        },

        "completion_tokens": {

          "type": "number"

        },

        "total_tokens": {

          "type": "number"

        }

      },

      "required": [

        "prompt_tokens",

        "completion_tokens",

        "total_tokens"

      ],

      "additionalProperties": {}

    }

  },

  "required": [

    "id",

    "object",

    "created",

    "model",

    "choices"

  ],

  "additionalProperties": {}

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
