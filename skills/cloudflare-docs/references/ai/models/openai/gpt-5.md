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

- First law: Conservation of energy. The change in a system’s internal energy equals heat added to the system minus work done by the system (ΔU = Q − W).

- Second law: Entropy of an isolated system never decreases; natural processes have a preferred direction (e.g., heat flows spontaneously from hot to cold; no heat engine is 100% efficient).

- Third law: As temperature approaches absolute zero, a system’s entropy approaches a constant minimum (often zero for a perfect crystal), and absolute zero cannot be reached in a finite number of steps.

Note: Many summaries also include the “zeroth law,” which defines temperature via thermal equilibrium.

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

The built-in json module does this.

Basic case (read a JSON file into a Python dict/list):
    import json

    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)   # data is now a Python dict/list
    print(data)

From a JSON string (not a file):
    import json
    data = json.loads('{"name": "Ada", "age": 36}')

Common patterns:
- Access values:
    name = data.get('name')
- Iterate a list of objects:
    for item in data:
        print(item)

Error handling:
    import json, pathlib

    path = pathlib.Path('data.json')
    try:
        with path.open('r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print('File not found')
    except json.JSONDecodeError as e:
        print(f'Invalid JSON: {e}')

Newline-delimited JSON (one JSON object per line):
    import json

    with open('data.ndjson', 'r', encoding='utf-8') as f:
        for line in f:
            if line.strip():
                obj = json.loads(line)
                # process obj

Notes:
- JSON doesn’t allow comments or trailing commas.
- For very large files you may want streaming parsers like ijson.
- To write JSON back to a file: json.dump(data, f, ensure_ascii=False, indent=2).

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

Recursion is a technique where a function solves a problem by calling itself on a smaller version of the same problem, stopping when it reaches a simplest case (the base case).

Key ideas:
- Base case: a simple, direct answer that stops the recursion.
- Recursive case: reduce the problem and call the function again, moving toward the base case.

Simple example: factorial
Factorial of n (written n!) is n × (n−1) × (n−2) × … × 1, with 0! = 1.

Pseudocode:
function factorial(n):
  if n <= 1:
    return 1        // base case
  else:
    return n * factorial(n - 1)  // recursive case

How factorial(4) runs:
- factorial(4) = 4 * factorial(3)
- factorial(3) = 3 * factorial(2)
- factorial(2) = 2 * factorial(1)
- factorial(1) = 1  (base case)
Then it unwinds:
- factorial(2) = 2 * 1 = 2
- factorial(3) = 3 * 2 = 6
- factorial(4) = 4 * 6 = 24

Every recursive solution should:
- Have a clear base case.
- Make progress toward that base case each call.

Analogy: Think of nested Russian dolls. To find the smallest doll, you open a doll to get a smaller one (recursive step) until you reach the tiniest doll that can’t be opened (base case).

## Parameters

* [ Input ](#tab-panel-74)
* [ Output ](#tab-panel-75)

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
