---
title: GPT-4.1
description: OpenAI's flagship GPT model for complex tasks with a million-token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-4.1 

Text Generation • OpenAI • Proxied 

`openai/gpt-4.1` 

OpenAI's flagship GPT model for complex tasks with a million-token context window.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,047,576 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/index/gpt-4-1/)                                                                      |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-4.1) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

* [ Input ](#tab-panel-208)
* [ Output ](#tab-panel-209)

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

    "text": "Certainly! The **three laws of thermodynamics** are fundamental principles describing how energy moves and changes in physical systems:\n\n---\n\n**1. First Law of Thermodynamics (Law of Energy Conservation):**  \n*Energy cannot be created or destroyed, only converted from one form to another.*\n\n- In other words, the total energy of an isolated system is constant.\n- Mathematically:  \n  ΔU = Q − W  \n  Where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system.\n\n---\n\n**2. Second Law of Thermodynamics (Law of Entropy):**  \n*The entropy of an isolated system always increases over time, or remains constant in ideal cases; it never decreases.*\n\n- This law explains why certain processes are irreversible, and why heat flows from hotter to colder bodies naturally.\n- It also means that energy transformations are never 100% efficient; some energy is always dispersed as heat.\n\n---\n\n**3. Third Law of Thermodynamics:**  \n*As temperature approaches absolute zero (0 K), the entropy of a perfect crystal approaches zero.*\n\n- This suggests it is impossible to reach absolute zero in any finite number of steps.\n- At absolute zero, a perfectly ordered crystal would have only one microstate (minimum entropy).\n\n---\n\n**Summary Table:**\n\n| Law        | Main Statement                                             |\n|------------|-----------------------------------------------------------|\n| First      | Energy is conserved                                       |\n| Second     | Entropy increases or remains constant                     |\n| Third      | Entropy approaches zero as temperature approaches 0 K     |"

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

* [ Input ](#tab-panel-210)
* [ Output ](#tab-panel-211)

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

    "text": "To read a JSON file in Python, you can use the built-in `json` module. Here’s a simple step-by-step example:\n\n### 1. Import the `json` module\n\n```python\nimport json\n```\n\n### 2. Open and read the JSON file\n\nAssuming your JSON file is named `data.json`:\n\n```python\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n```\n\n### 3. Now `data` is a Python object (usually a `dict` or `list`)  \nYou can use `data` just like any other Python dictionary or list.\n\n### Full Example\n\nAssume `data.json` contains:\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"city\": \"Wonderland\"\n}\n```\n\nPython code:\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data[\"name\"])  # Output: Alice\nprint(data[\"age\"])   # Output: 30\n```\n\n---\n\n**Recap:**  \n- Use `import json`.\n- Use `with open(filename) as f: data = json.load(f)`\n- Now, `data` contains your JSON data as Python objects!"

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

* [ Input ](#tab-panel-214)
* [ Output ](#tab-panel-215)

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

    "text": "Great! There are two main routes between San Francisco and Los Angeles:\n\n**1. The Scenic Pacific Coast Highway (Highway 1):**  \nThis is the most beautiful (and slower) option, hugging the coastline with stunning ocean views. Key stops along this route include:\n\n- **Half Moon Bay:** Charming coastal town, great for beaches and breakfast.\n- **Santa Cruz:** Fun boardwalk, surf spots, and natural bridges.\n- **Monterey:** Monterey Bay Aquarium, Cannery Row, 17-Mile Drive.\n- **Carmel-by-the-Sea:** Picturesque town, great art galleries, boutiques, and beaches.\n- **Big Sur:** Breathtaking cliffs, Bixby Creek Bridge, McWay Falls, and several state parks for hiking (like Julia Pfeiffer Burns State Park).\n- **Hearst Castle (San Simeon):** Grand historic estate you can tour.\n- **Cambria & Morro Bay:** Cute small towns, Morro Rock, great seafood.\n- **San Luis Obispo:** Lively downtown, Madonna Inn for quirky photos, Mission San Luis Obispo.\n- **Pismo Beach:** Famous for its dunes and clam chowder.\n- **Santa Barbara:** Gorgeous beaches, Spanish architecture, great lunch stop, wine tasting.\n- **Malibu:** Beautiful beaches and coastal views just before you reach LA.\n\n*Tip: This route is best enjoyed over 2-3 days, but you can do portions if you’re on a tighter schedule.*\n\n---\n\n**2. The Fast Inland Route (Highway 101 or I-5):**  \nQuicker, but less scenic. For quick but worthwhile stops:\n\n- **Gilroy:** Garlic capital, outlet shopping.\n- **Paso Robles:** Renowned wineries and adorable downtown.\n- **Santa Barbara:** As above, worth a detour if you take Hwy 101.\n\nIf you’re on **I-5**, main stops are limited—Harris Ranch is a classic spot for a meal (and cattle viewing), but scenery is mostly farmland.\n\n---\n\n**Let me know:**\n- Do you have 1 day or several for the drive?\n- What are your interests (scenery, food, wine, beaches, hiking)?\n- Traveling solo, as a couple, or with family/kids?\n\nWith a bit more info, I can tailor a perfect list for you!"

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

* [ Input ](#tab-panel-212)
* [ Output ](#tab-panel-213)

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

    "text": "Detective Lila Maren knelt beside the wrought-iron fence, her breath misting in the pale dawn light. The alley was quiet, save for the distant hum of the city waking. She scanned the scuffed cobblestones, expecting the usual—a cigarette butt, perhaps, or a scrap of torn fabric. Instead, nestled in a shallow puddle, she found a single red chess pawn, oddly pristine amid the grime.\n\nLila lifted it with gloved fingers, turning it over as she studied its glossy sheen. No markings. No blood. Just a chess piece, out of place and glinting like a secret. She frowned, recalling the message scrawled on the victim’s mirror upstairs: “Checkmate.” The game, it seemed, was just beginning."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

* [ Input ](#tab-panel-216)
* [ Output ](#tab-panel-217)

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

        "**",

        "Rec",

        "ursion",

        "**",

        " is",

        " a",

        " programming",

        " technique",

        " where",

        " a",

        " function",

        " calls",

        " itself",

        " to",

        " solve",

        " a",

        " problem",

        ".",

        " Each",

        " time",

        " the",

        " function",

        " calls",

        " itself",

        ",",

        " it",

        " breaks",

        " the",

        " problem",

        " down",

        " into",

        " smaller",

        " sub",

        "pro",

        "blems",

        ".",

        " For",

        " recursion",

        " to",

        " stop",

        ",",

        " a",

        " **",

        "base",

        " case",

        "**",

        " (",

        "or",

        " termination",

        " condition",

        ")",

        " is",

        " required",

        ".\n\n",

        "**",

        "Simple",

        " Example",

        ":",

        " Calcul",

        "ating",

        " Factor",

        "ial",

        "**\n\n",

        "The",

        " **",

        "factor",

        "ial",

        "**",

        " of",

        " a",

        " non",

        "-negative",

        " integer",

        " `",

        "n",

        "`",

        " (",

        "written",

        " as",

        " `",

        "n",

        "!",

        "`)",

        " is",

        " the",

        " product",

        " of",

        " all",

        " positive",

        " integers",

        " less",

        " than",

        " or",

        " equal",

        " to",

        " `",

        "n",

        "`.\n\n",

        "**",

        "Mat",

        "hem",

        "atically",

        ":",

        "**\n",

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

        ")",

        " ×",

        " (",

        "n",

        "-",

        "2",

        ")",

        " ×",

        " ...",

        " ×",

        " ",

        "1",

        "`\n",

        "-",

        " By",

        " definition",

        ",",

        " `",

        "0",

        "!",

        " =",

        " ",

        "1",

        "`\n\n",

        "**",

        "Recursive",

        " Definition",

        ":",

        "**\n",

        "-",

        " If",

        " `",

        "n",

        " ==",

        " ",

        "0",

        "`,",

        " then",

        " `",

        "factor",

        "ial",

        "(n",

        ")",

        " =",

        " ",

        "1",

        "`",

        "  ",

        " (",

        "base",

        " case",

        ")\n",

        "-",

        " If",

        " `",

        "n",

        " >",

        " ",

        "0",

        "`,",

        " then",

        " `",

        "factor",

        "ial",

        "(n",

        ")",

        " =",

        " n",

        " ×",

        " factorial",

        "(n",

        "-",

        "1",

        ")`",

        " ",

        " (",

        "recursive",

        " case",

        ")\n\n",

        "**",

        "Code",

        " Example",

        " in",

        " Python",

        ":",

        "**\n",

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

        "        ",

        " #",

        " Base",

        " case",

        "\n",

        "       ",

        " return",

        " ",

        "1",

        "\n",

        "   ",

        " else",

        ":\n",

        "       ",

        " return",

        " n",

        " *",

        " factorial",

        "(n",

        " -",

        " ",

        "1",

        ")",

        "  ",

        " #",

        " Recursive",

        " call",

        "\n",

        "``",

        "`\n\n",

        "**",

        "How",

        " it",

        " works",

        ":",

        "**\n",

        "To",

        " compute",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        ":\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        " returns",

        " `",

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

        ")`",

        " returns",

        " `",

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

        ")`",

        " returns",

        " `",

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

        ")`",

        " returns",

        " `",

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

        ")`",

        " returns",

        " `",

        "1",

        "`",

        " (",

        "base",

        " case",

        ")\n\n",

        "So",

        ",\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "1",

        ")`",

        " =",

        " ",

        "1",

        " ×",

        " ",

        "1",

        " =",

        " ",

        "1",

        "\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "2",

        ")`",

        " =",

        " ",

        "2",

        " ×",

        " ",

        "1",

        " =",

        " ",

        "2",

        "\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "3",

        ")`",

        " =",

        " ",

        "3",

        " ×",

        " ",

        "2",

        " =",

        " ",

        "6",

        "\n",

        "-",

        " `",

        "factor",

        "ial",

        "(",

        "4",

        ")`",

        " =",

        " ",

        "4",

        " ×",

        " ",

        "6",

        " =",

        " ",

        "24",

        "\n\n",

        "**",

        "In",

        " summary",

        ":**",

        "  \n",

        "Rec",

        "ursion",

        " is",

        " when",

        " a",

        " function",

        " calls",

        " itself",

        ",",

        " and",

        " the",

        " problem",

        " gets",

        " divided",

        " into",

        " smaller",

        " parts",

        " until",

        " reaching",

        " a",

        " simple",

        ",",

        " solv",

        "able",

        " case",

        " (",

        "the",

        " base",

        " case",

        ")."

    ]

}


```

Explain Code

## Parameters

* [ Input ](#tab-panel-218)
* [ Output ](#tab-panel-219)

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
