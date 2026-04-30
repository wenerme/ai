---
title: GPT-5.4 mini
description: GPT-5.4 Mini is a smaller, faster, and more cost-efficient version of GPT-5.4 for lightweight tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 mini 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4-mini` 

GPT-5.4 Mini is a smaller, faster, and more cost-efficient version of GPT-5.4 for lightweight tasks.

| Model Info                                                                 |                                                                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                        |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                                |
| More information                                                           | [link ↗](https://openai.com/)                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4-mini) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

* [ Input ](#tab-panel-266)
* [ Output ](#tab-panel-267)

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

    "text": "The three laws of thermodynamics are:\n\n1. **First Law: Conservation of energy**  \n   Energy cannot be created or destroyed, only transferred or transformed.  \n   In simple form:  \n   **ΔU = Q − W**  \n   where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system.\n\n2. **Second Law: Entropy increases**  \n   In an isolated system, entropy tends to increase over time. This means natural processes are irreversible and energy tends to spread out.  \n   A common implication: no heat engine can be 100% efficient.\n\n3. **Third Law: Absolute zero is unattainable**  \n   As temperature approaches absolute zero, the entropy of a perfect crystal approaches a minimum value, usually taken as zero.  \n   In practice, it’s impossible to reach exactly 0 K in a finite number of steps.\n\nIf you want, I can also give you a **very simple everyday analogy** for each law."

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

* [ Input ](#tab-panel-268)
* [ Output ](#tab-panel-269)

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

    "text": "Use Python’s built-in `json` module.\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\n### Notes\n- `json.load(f)` reads JSON from a file object.\n- `json.loads(s)` reads JSON from a string.\n- The result is usually a Python `dict` or `list`, depending on the JSON structure.\n\n### Example JSON\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30\n}\n```\n\n### Python result\n```python\n{'name': 'Alice', 'age': 30}\n```\n\nIf you want, I can also show how to:\n- read JSON into a pandas DataFrame\n- handle invalid JSON errors\n- write JSON back to a file"

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

* [ Input ](#tab-panel-272)
* [ Output ](#tab-panel-273)

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

    "text": "Absolutely — the San Francisco to Los Angeles drive has a lot of great stop options depending on whether you want the **fastest route** or the **most scenic one**.\n\n## Best stops if you take Highway 1 / Pacific Coast Highway\nThis is the most scenic route, but it can add a lot of time.\n\n### 1. Monterey / Carmel-by-the-Sea\n- Great for a first major stop south of SF\n- **Monterey Bay Aquarium** is a top attraction\n- Carmel has a charming village feel, beaches, and galleries\n\n### 2. Big Sur\n- One of the most famous scenic stretches in California\n- Must-see viewpoints:\n  - **Bixby Creek Bridge**\n  - **Pfeiffer Beach**\n  - **Julia Pfeiffer Burns State Park** / McWay Falls\n- Ideal if you want dramatic coastline and photo stops\n\n### 3. San Simeon / Hearst Castle\n- Good place to break up the drive\n- **Hearst Castle** is the big attraction here\n- Also possible to see elephant seals at **Piedras Blancas**\n\n### 4. San Luis Obispo\n- Nice overnight or lunch stop\n- Relaxed downtown, good food, and easy access to nearby wine country\n\n### 5. Santa Barbara\n- Beautiful coastal city, great for a meal or longer stop\n- **Stearns Wharf**, the mission, and the harbor are popular\n- Good “last major stop” before LA\n\n## Best stops if you take the faster inland route (US-101 / I-5)\nThis is quicker and still has good options.\n\n### 1. San Luis Obispo\n- Great midway break\n- Walkable downtown and lots of restaurants\n\n### 2. Solvang\n- A fun Danish-style town near Santa Barbara\n- Good for pastries, coffee, and a quick stretch\n\n### 3. Santa Barbara\n- Still worth stopping even on the faster route\n- Beautiful and easy to enjoy without a huge detour\n\n### 4. Ventura / Oxnard\n- Good coastal stop before reaching LA\n- Less crowded than Santa Barbara\n\n## If you want a balanced one-day route\nA practical plan is:\n- **SF → Monterey / Carmel**\n- **Monterey → Big Sur**\n- **Big Sur → San Luis Obispo**\n- **San Luis Obispo → Santa Barbara**\n- **Santa Barbara → LA**\n\nThat’s a lot for one day, so many people do it as a **2-day or 3-day road trip**.\n\n## Quick recommendation\nIf you only want a few stops, I’d pick:\n1. **Monterey**\n2. **Big Sur**\n3. **Santa Barbara**\n\nIf you want, I can also make you:\n- a **1-day itinerary**\n- a **2-day scenic itinerary**\n- or a route with **food, beaches, and hiking stops**."

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

* [ Input ](#tab-panel-270)
* [ Output ](#tab-panel-271)

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

    "text": "The rain had been falling since midnight, soft and persistent, turning the city into a blur of sodium light and reflected secrets. Detective Mara Venn stood in the doorway of apartment 4B, one gloved hand resting against the frame, and looked down at the object gleaming on the floorboards.\n\nIt wasn’t a weapon. It wasn’t jewelry, either.\n\nAt first glance, it looked like a child’s toy: a tiny brass bird with one wing folded and the other raised as if caught mid-flight. But when Mara knelt and picked it up, she felt the weight of it—too heavy for its size—and noticed the fine engraved line along its belly. A seam.\n\nShe turned the figurine over. Hidden beneath the bird’s feet was a row of numbers, stamped so neatly they might have been part of the design. Not a serial number, exactly. Too deliberate for that. Too precise.\n\nBehind her, the apartment hummed with the low buzz of the refrigerator and the distant wail of a siren moving somewhere farther downtown. Inside the room, the dead man sat slumped in his chair as if he’d merely nodded off. His hands were folded on the desk. His face was calm.\n\nMara looked again at the brass bird.\n\nThe numbers weren’t random. She knew that before she even compared them to the note pinned under the victim’s pen, written in a hand so steady it seemed almost smug:\n\n**You’re late. Look under the third stone.**\n\nShe slipped the bird into an evidence bag and stared at the cold line of the victim’s mouth.\n\nSomeone had planned this very carefully.\n\nAnd somehow, they had expected her to come."

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

* [ Input ](#tab-panel-274)
* [ Output ](#tab-panel-275)

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

        " on",

        " a",

        " smaller",

        " version",

        " of",

        " the",

        " same",

        " problem",

        ".\n\n",

        "###",

        " Simple",

        " idea",

        "\n",

        "A",

        " recursive",

        " function",

        " usually",

        " has",

        ":\n",

        "1",

        ".",

        " **",

        "A",

        " base",

        " case",

        "**",

        " —",

        " when",

        " to",

        " stop",

        " calling",

        " itself",

        "\n",

        "2",

        ".",

        " **",

        "A",

        " recursive",

        " case",

        "**",

        " —",

        " when",

        " it",

        " calls",

        " itself",

        " with",

        " a",

        " smaller",

        " input",

        "\n\n",

        "###",

        " Example",

        ":",

        " counting",

        " down",

        "\n",

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

        " ",

        " #",

        " recursive",

        " call",

        "\n",

        "``",

        "`\n\n",

        "If",

        " you",

        " run",

        ":\n",

        "```",

        "python",

        "\n",

        "count",

        "down",

        "(",

        "3",

        ")\n",

        "``",

        "`\n\n",

        "It",

        " prints",

        ":\n",

        "```",

        "python",

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

        "###",

        " How",

        " it",

        " works",

        "\n",

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

        "###",

        " In",

        " short",

        "\n",

        "Rec",

        "ursion",

        " is",

        " like",

        " solving",

        " a",

        " big",

        " problem",

        " by",

        " breaking",

        " it",

        " into",

        " smaller",

        " versions",

        " of",

        " the",

        " same",

        " problem",

        " until",

        " you",

        " reach",

        " a",

        " stopping",

        " point",

        "."

    ]

}


```

## Parameters

* [ Input ](#tab-panel-276)
* [ Output ](#tab-panel-277)

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
