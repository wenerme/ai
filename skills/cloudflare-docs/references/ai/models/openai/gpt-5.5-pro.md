---
title: GPT-5.5 Pro
description: GPT-5.5 Pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.5 Pro 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.5-pro` 

GPT-5.5 Pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.

| Model Info                                                                 |                                                                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                     |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                               |
| More information                                                           | [link ↗](https://openai.com/)                                                                                        |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.5-pro) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

  {

    input: 'What are the three laws of thermodynamics?',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

```

{

  "id": "resp_063e06a488467aad0169ebb1fc91d4819081d5cf054ee32daa",

  "object": "response",

  "created_at": 1777054206,

  "model": "gpt-5.5-pro-2026-04-23",

  "output": [

    {

      "id": "rs_063e06a488467aad0169ebb262c1408190aa715f10dd4763dc",

      "type": "reasoning",

      "summary": []

    },

    {

      "id": "msg_063e06a488467aad0169ebb262c45c819093301855572fac7f",

      "type": "message",

      "status": "completed",

      "content": [

        {

          "type": "output_text",

          "annotations": [],

          "logprobs": [],

          "text": "The **three laws of thermodynamics** are:\n\n1. **First Law — Conservation of Energy**  \n   Energy cannot be created or destroyed, only transferred or transformed.  \n   In thermodynamics: the change in a system’s internal energy equals heat added to the system minus work done by the system.  \n   \\[\n   \\Delta U = Q - W\n   \\]\n\n2. **Second Law — Entropy Increases**  \n   In any natural process, the total entropy of an isolated system tends to increase.  \n   Equivalently, heat flows spontaneously from hotter objects to colder ones, and no heat engine can be 100% efficient.\n\n3. **Third Law — Absolute Zero Limit**  \n   As temperature approaches absolute zero, the entropy of a perfect crystal approaches zero.  \n   It also implies that absolute zero cannot be reached by any finite physical process.\n\nThere is also a **Zeroth Law**, often stated separately: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is what makes temperature well-defined."

        }

      ],

      "phase": "final_answer",

      "role": "assistant"

    }

  ],

  "status": "completed",

  "usage": {

    "input_tokens": 15,

    "output_tokens": 293,

    "total_tokens": 308,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens_details": {

      "reasoning_tokens": 66

    }

  },

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054314,

  "error": null,

  "frequency_penalty": 0,

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "moderation": null,

  "parallel_tool_calls": true,

  "presence_penalty": 0,

  "previous_response_id": null,

  "prompt_cache_key": null,

  "prompt_cache_retention": "24h",

  "reasoning": {

    "effort": "high",

    "summary": null

  },

  "safety_identifier": null,

  "service_tier": "default",

  "store": false,

  "temperature": 1,

  "text": {

    "format": {

      "type": "text"

    },

    "verbosity": "medium"

  },

  "tool_choice": "auto",

  "tools": [],

  "top_logprobs": 0,

  "top_p": 0.98,

  "truncation": "disabled",

  "user": null,

  "metadata": {},

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**With Instructions**  — Using instructions to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

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

```

{

  "id": "resp_0a5627201ea32bd60169ebb23813c081978bb6448d3757ad16",

  "object": "response",

  "created_at": 1777054264,

  "model": "gpt-5.5-pro-2026-04-23",

  "output": [

    {

      "id": "rs_0a5627201ea32bd60169ebb24e286081979a18901a559d3252",

      "type": "reasoning",

      "summary": []

    },

    {

      "id": "msg_0a5627201ea32bd60169ebb24e2a148197917120444493cfa0",

      "type": "message",

      "status": "completed",

      "content": [

        {

          "type": "output_text",

          "annotations": [],

          "logprobs": [],

          "text": "Use Python’s built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\nIf `data.json` contains:\n\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30\n}\n```\n\nThen `data` will be a Python dictionary:\n\n```python\nprint(data[\"name\"])  # Alice\nprint(data[\"age\"])   # 30\n```\n\nYou can also handle common errors:\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n        data = json.load(file)\n\n    print(data)\n\nexcept FileNotFoundError:\n    print(\"The JSON file was not found.\")\n\nexcept json.JSONDecodeError:\n    print(\"The file is not valid JSON.\")\n```\n\nUse `json.load(file)` for reading from a file, and `json.loads(string)` for parsing a JSON string."

        }

      ],

      "phase": "final_answer",

      "role": "assistant"

    }

  ],

  "status": "completed",

  "usage": {

    "input_tokens": 30,

    "output_tokens": 387,

    "total_tokens": 417,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens_details": {

      "reasoning_tokens": 170

    }

  },

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054286,

  "error": null,

  "frequency_penalty": 0,

  "incomplete_details": null,

  "instructions": "You are a helpful coding assistant specializing in Python.",

  "max_output_tokens": null,

  "max_tool_calls": null,

  "moderation": null,

  "parallel_tool_calls": true,

  "presence_penalty": 0,

  "previous_response_id": null,

  "prompt_cache_key": null,

  "prompt_cache_retention": "24h",

  "reasoning": {

    "effort": "high",

    "summary": null

  },

  "safety_identifier": null,

  "service_tier": "default",

  "store": false,

  "temperature": 1,

  "text": {

    "format": {

      "type": "text"

    },

    "verbosity": "medium"

  },

  "tool_choice": "auto",

  "tools": [],

  "top_logprobs": 0,

  "top_p": 0.98,

  "truncation": "disabled",

  "user": null,

  "metadata": {},

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with message array 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

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

```

{

  "id": "resp_094e31e65118cd0f0169ebb24ee6b0819796327f59a6439f35",

  "object": "response",

  "created_at": 1777054287,

  "model": "gpt-5.5-pro-2026-04-23",

  "output": [

    {

      "id": "rs_094e31e65118cd0f0169ebb257e74c81979ddc97189d31ce3f",

      "type": "reasoning",

      "summary": []

    }

  ],

  "status": "incomplete",

  "usage": {

    "input_tokens": 76,

    "output_tokens": 150,

    "total_tokens": 226,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens_details": {

      "reasoning_tokens": 150

    }

  },

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": null,

  "error": null,

  "frequency_penalty": 0,

  "incomplete_details": {

    "reason": "max_output_tokens"

  },

  "instructions": null,

  "max_output_tokens": 150,

  "max_tool_calls": null,

  "moderation": null,

  "parallel_tool_calls": true,

  "presence_penalty": 0,

  "previous_response_id": null,

  "prompt_cache_key": null,

  "prompt_cache_retention": "24h",

  "reasoning": {

    "effort": "high",

    "summary": null

  },

  "safety_identifier": null,

  "service_tier": "default",

  "store": false,

  "temperature": 1,

  "text": {

    "format": {

      "type": "text"

    },

    "verbosity": "medium"

  },

  "tool_choice": "auto",

  "tools": [],

  "top_logprobs": 0,

  "top_p": 0.98,

  "truncation": "disabled",

  "user": null,

  "metadata": {},

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Temperature Control**  — Using temperature for creative responses 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

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

```

{

  "id": "resp_0861b6980fc9f4ab0169ebb2585a388196b5ae496c923d5c46",

  "object": "response",

  "created_at": 1777054296,

  "model": "gpt-5.5-pro-2026-04-23",

  "output": [

    {

      "id": "rs_0861b6980fc9f4ab0169ebb260b08c81968600b365effb3d15",

      "type": "reasoning",

      "summary": []

    },

    {

      "id": "msg_0861b6980fc9f4ab0169ebb260b29c81968b2573cb5b00befc",

      "type": "message",

      "status": "completed",

      "content": [

        {

          "type": "output_text",

          "annotations": [],

          "logprobs": [],

          "text": "Silent circuits dream  \nLearning patterns in starlight  \nDawn hums through the code"

        }

      ],

      "phase": "final_answer",

      "role": "assistant"

    }

  ],

  "status": "completed",

  "usage": {

    "input_tokens": 13,

    "output_tokens": 121,

    "total_tokens": 134,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens_details": {

      "reasoning_tokens": 97

    }

  },

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054304,

  "error": null,

  "frequency_penalty": 0,

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "moderation": null,

  "parallel_tool_calls": true,

  "presence_penalty": 0,

  "previous_response_id": null,

  "prompt_cache_key": null,

  "prompt_cache_retention": "24h",

  "reasoning": {

    "effort": "high",

    "summary": null

  },

  "safety_identifier": null,

  "service_tier": "default",

  "store": false,

  "temperature": 1,

  "text": {

    "format": {

      "type": "text"

    },

    "verbosity": "medium"

  },

  "tool_choice": "auto",

  "tools": [],

  "top_logprobs": 0,

  "top_p": 0.98,

  "truncation": "disabled",

  "user": null,

  "metadata": {},

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**With Reasoning**  — Using reasoning effort for complex problems 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

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

```

{

  "id": "resp_03fc3b8888c0aecf0169ebb2616f408195b4462e87d425924a",

  "object": "response",

  "created_at": 1777054305,

  "model": "gpt-5.5-pro-2026-04-23",

  "output": [

    {

      "id": "rs_03fc3b8888c0aecf0169ebb2684a4c8195b4fd258c0d92977d",

      "type": "reasoning",

      "summary": []

    },

    {

      "id": "msg_03fc3b8888c0aecf0169ebb2684bc0819589f472918a0073f2",

      "type": "message",

      "status": "completed",

      "content": [

        {

          "type": "output_text",

          "annotations": [],

          "logprobs": [],

          "text": "Assuming both trains leave at the same time:\n\n1. Train from Chicago speed: **60 mph**\n2. Train from New York speed: **80 mph**\n3. Since they are moving toward each other, add their speeds:\n\n\\[\n60 + 80 = 140 \\text{ mph}\n\\]\n\n4. They are **900 miles** apart, so time is:\n\n\\[\n\\text{time} = \\frac{900}{140}\n\\]\n\n\\[\n\\text{time} = 6.428571\\ldots \\text{ hours}\n\\]\n\n5. Convert the decimal part:\n\n\\[\n0.428571 \\times 60 \\approx 25.7 \\text{ minutes}\n\\]\n\nSo they meet after about:\n\n\\[\n\\boxed{6 \\text{ hours } 26 \\text{ minutes}}\n\\]\n\nMore exactly, they meet after **6 hours, 25 minutes, and 43 seconds**."

        }

      ],

      "phase": "final_answer",

      "role": "assistant"

    }

  ],

  "status": "completed",

  "usage": {

    "input_tokens": 48,

    "output_tokens": 381,

    "total_tokens": 429,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens_details": {

      "reasoning_tokens": 182

    }

  },

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054312,

  "error": null,

  "frequency_penalty": 0,

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "moderation": null,

  "parallel_tool_calls": true,

  "presence_penalty": 0,

  "previous_response_id": null,

  "prompt_cache_key": null,

  "prompt_cache_retention": "24h",

  "reasoning": {

    "effort": "medium",

    "summary": null

  },

  "safety_identifier": null,

  "service_tier": "default",

  "store": false,

  "temperature": 1,

  "text": {

    "format": {

      "type": "text"

    },

    "verbosity": "medium"

  },

  "tool_choice": "auto",

  "tools": [],

  "top_logprobs": 0,

  "top_p": 0.98,

  "truncation": "disabled",

  "user": null,

  "metadata": {},

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-466)
* [ Output ](#tab-panel-467)

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
