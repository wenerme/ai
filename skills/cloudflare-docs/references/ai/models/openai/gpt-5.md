---
title: GPT-5
description: OpenAI's model excelling at coding, writing, and reasoning.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5 

Text Generation • OpenAI • Proxied 

`openai/gpt-5` 

OpenAI's model excelling at coding, writing, and reasoning.

| Model Info                                                                 |                                                                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                         |
| More information                                                           | [link ↗](https://openai.com/)                                                                                  |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5',

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

* [ Input ](#tab-panel-242)
* [ Output ](#tab-panel-243)

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

    "text": "- First law: Conservation of energy. The change in a system’s internal energy equals heat added to the system minus work done by the system (ΔU = Q − W).\n\n- Second law: Entropy of an isolated system never decreases; natural processes have a preferred direction (e.g., heat flows spontaneously from hot to cold; no heat engine is 100% efficient).\n\n- Third law: As temperature approaches absolute zero, a system’s entropy approaches a constant minimum (often zero for a perfect crystal), and absolute zero cannot be reached in a finite number of steps.\n\nNote: Many summaries also include the “zeroth law,” which defines temperature via thermal equilibrium."

}


```

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5',

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

* [ Input ](#tab-panel-244)
* [ Output ](#tab-panel-245)

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

    "text": "The built-in json module does this.\n\nBasic case (read a JSON file into a Python dict/list):\n    import json\n\n    with open('data.json', 'r', encoding='utf-8') as f:\n        data = json.load(f)   # data is now a Python dict/list\n    print(data)\n\nFrom a JSON string (not a file):\n    import json\n    data = json.loads('{\"name\": \"Ada\", \"age\": 36}')\n\nCommon patterns:\n- Access values:\n    name = data.get('name')\n- Iterate a list of objects:\n    for item in data:\n        print(item)\n\nError handling:\n    import json, pathlib\n\n    path = pathlib.Path('data.json')\n    try:\n        with path.open('r', encoding='utf-8') as f:\n            data = json.load(f)\n    except FileNotFoundError:\n        print('File not found')\n    except json.JSONDecodeError as e:\n        print(f'Invalid JSON: {e}')\n\nNewline-delimited JSON (one JSON object per line):\n    import json\n\n    with open('data.ndjson', 'r', encoding='utf-8') as f:\n        for line in f:\n            if line.strip():\n                obj = json.loads(line)\n                # process obj\n\nNotes:\n- JSON doesn’t allow comments or trailing commas.\n- For very large files you may want streaming parsers like ijson.\n- To write JSON back to a file: json.dump(data, f, ensure_ascii=False, indent=2)."

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5',

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

* [ Input ](#tab-panel-248)
* [ Output ](#tab-panel-249)

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

    "text": ""

}


```

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5',

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

* [ Input ](#tab-panel-246)
* [ Output ](#tab-panel-247)

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

    "text": ""

}


```

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5',

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

* [ Input ](#tab-panel-250)
* [ Output ](#tab-panel-251)

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

        " a",

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

        " a",

        " smaller",

        " version",

        " of",

        " the",

        " same",

        " problem",

        ",",

        " stopping",

        " when",

        " it",

        " reaches",

        " a",

        " simplest",

        " case",

        " (",

        "the",

        " base",

        " case",

        ").\n\n",

        "Key",

        " ideas",

        ":\n",

        "-",

        " Base",

        " case",

        ":",

        " a",

        " simple",

        ",",

        " direct",

        " answer",

        " that",

        " stops",

        " the",

        " recursion",

        ".\n",

        "-",

        " Recursive",

        " case",

        ":",

        " reduce",

        " the",

        " problem",

        " and",

        " call",

        " the",

        " function",

        " again",

        ",",

        " moving",

        " toward",

        " the",

        " base",

        " case",

        ".\n\n",

        "Simple",

        " example",

        ":",

        " factorial",

        "\n",

        "Factor",

        "ial",

        " of",

        " n",

        " (",

        "written",

        " n",

        "!)",

        " is",

        " n",

        " ×",

        " (",

        "n",

        "−",

        "1",

        ")",

        " ×",

        " (",

        "n",

        "−",

        "2",

        ")",

        " ×",

        " …",

        " ×",

        " ",

        "1",

        ",",

        " with",

        " ",

        "0",

        "!",

        " =",

        " ",

        "1",

        ".\n\n",

        "P",

        "seud",

        "ocode",

        ":\n",

        "function",

        " factorial",

        "(n",

        "):\n",

        " ",

        " if",

        " n",

        " <=",

        " ",

        "1",

        ":\n",

        "   ",

        " return",

        " ",

        "1",

        "       ",

        " //",

        " base",

        " case",

        "\n",

        " ",

        " else",

        ":\n",

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

        " //",

        " recursive",

        " case",

        "\n\n",

        "How",

        " factorial",

        "(",

        "4",

        ")",

        " runs",

        ":\n",

        "-",

        " factorial",

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

        ")\n",

        "-",

        " factorial",

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

        ")\n",

        "-",

        " factorial",

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

        ")\n",

        "-",

        " factorial",

        "(",

        "1",

        ")",

        " =",

        " ",

        "1",

        " ",

        " (",

        "base",

        " case",

        ")\n",

        "Then",

        " it",

        " unw",

        "inds",

        ":\n",

        "-",

        " factorial",

        "(",

        "2",

        ")",

        " =",

        " ",

        "2",

        " *",

        " ",

        "1",

        " =",

        " ",

        "2",

        "\n",

        "-",

        " factorial",

        "(",

        "3",

        ")",

        " =",

        " ",

        "3",

        " *",

        " ",

        "2",

        " =",

        " ",

        "6",

        "\n",

        "-",

        " factorial",

        "(",

        "4",

        ")",

        " =",

        " ",

        "4",

        " *",

        " ",

        "6",

        " =",

        " ",

        "24",

        "\n\n",

        "Every",

        " recursive",

        " solution",

        " should",

        ":\n",

        "-",

        " Have",

        " a",

        " clear",

        " base",

        " case",

        ".\n",

        "-",

        " Make",

        " progress",

        " toward",

        " that",

        " base",

        " case",

        " each",

        " call",

        ".\n\n",

        "Anal",

        "ogy",

        ":",

        " Think",

        " of",

        " nested",

        " Russian",

        " dolls",

        ".",

        " To",

        " find",

        " the",

        " smallest",

        " doll",

        ",",

        " you",

        " open",

        " a",

        " doll",

        " to",

        " get",

        " a",

        " smaller",

        " one",

        " (",

        "recursive",

        " step",

        ")",

        " until",

        " you",

        " reach",

        " the",

        " tini",

        "est",

        " doll",

        " that",

        " can",

        "’t",

        " be",

        " opened",

        " (",

        "base",

        " case",

        ")."

    ]

}


```

## Parameters

* [ Input ](#tab-panel-252)
* [ Output ](#tab-panel-253)

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
