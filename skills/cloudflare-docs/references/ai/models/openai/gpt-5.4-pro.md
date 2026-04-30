---
title: GPT-5.4 Pro
description: GPT-5.4 Pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 Pro 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4-pro` 

GPT-5.4 Pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.

| Model Info                                                                 |                                                                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                     |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                               |
| More information                                                           | [link ↗](https://openai.com/)                                                                                        |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4-pro) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

  {

    input: 'What are the three laws of thermodynamics?',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-290)
* [ Output ](#tab-panel-291)

```

{

    "input": "What are the three laws of thermodynamics?"

}


```

```

{}


```

## Examples

**With Instructions**  — Using instructions to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

  {

    input: 'How do I read a JSON file in Python?',

    instructions: 'You are a helpful coding assistant specializing in Python.',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-292)
* [ Output ](#tab-panel-293)

```

{

    "input": "How do I read a JSON file in Python?",

    "instructions": "You are a helpful coding assistant specializing in Python."

}


```

```

{}


```

**Multi-turn Conversation**  — Continuing a conversation with message array 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

  {

    input: [

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

    max_output_tokens: 150,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-298)
* [ Output ](#tab-panel-299)

```

{

    "input": [

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

    "max_output_tokens": 150

}


```

```

{}


```

**Temperature Control**  — Using temperature for creative responses 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

  {

    input: 'Write a haiku about artificial intelligence',

    temperature: 1,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-294)
* [ Output ](#tab-panel-295)

```

{

    "input": "Write a haiku about artificial intelligence",

    "temperature": 1

}


```

```

{}


```

**With Reasoning**  — Using reasoning effort for complex problems 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

  {

    input:

      'Solve this problem step by step: A train leaves Chicago at 60mph heading east. Another train leaves New York at 80mph heading west. They are 900 miles apart. When do they meet?',

    reasoning: {

      effort: 'medium',

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Input / Output JSON 

* [ Input ](#tab-panel-296)
* [ Output ](#tab-panel-297)

```

{

    "input": "Solve this problem step by step: A train leaves Chicago at 60mph heading east. Another train leaves New York at 80mph heading west. They are 900 miles apart. When do they meet?",

    "reasoning": {

        "effort": "medium"

    }

}


```

```

{}


```

## Parameters

* [ Input ](#tab-panel-300)
* [ Output ](#tab-panel-301)

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[\]

`array`

tool\_choice

``

▶text{}

`object`

▶reasoning{}

`object`

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[\]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
