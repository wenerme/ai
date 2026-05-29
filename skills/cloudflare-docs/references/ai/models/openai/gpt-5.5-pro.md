---
title: GPT-5.5 pro
description: GPT-5.5 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.5 pro 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.5-pro` 

GPT-5.5 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.

| Model Info                                                                 |                                                                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                     |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                               |
| More information                                                           | [link ↗](https://openai.com/)                                                                                        |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.5-pro) |

## Usage

* [ TypeScript ](#tab-panel-1034)
* [ cURL ](#tab-panel-1035)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

  { input: 'What are the three laws of thermodynamics?' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "openai/gpt-5.5-pro",

  "input": "What are the three laws of thermodynamics?"

}'


```

* [ Output ](#tab-panel-1044)
* [ Raw response ](#tab-panel-1045)

The **three laws of thermodynamics** are:

1. **First Law — Conservation of Energy**  
   Energy cannot be created or destroyed, only transferred or transformed.  
   In thermodynamics: the change in a system’s internal energy equals heat added to the system minus work done by the system.  
   \[
   \Delta U = Q - W
   \]

2. **Second Law — Entropy Increases**  
   In any natural process, the total entropy of an isolated system tends to increase.  
   Equivalently, heat flows spontaneously from hotter objects to colder ones, and no heat engine can be 100% efficient.

3. **Third Law — Absolute Zero Limit**  
   As temperature approaches absolute zero, the entropy of a perfect crystal approaches zero.  
   It also implies that absolute zero cannot be reached by any finite physical process.

There is also a **Zeroth Law**, often stated separately: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is what makes temperature well-defined.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054314,

  "created_at": 1777054206,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_063e06a488467aad0169ebb1fc91d4819081d5cf054ee32daa",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.5-pro-2026-04-23",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_063e06a488467aad0169ebb262c1408190aa715f10dd4763dc",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "The **three laws of thermodynamics** are:\n\n1. **First Law — Conservation of Energy**  \n   Energy cannot be created or destroyed, only transferred or transformed.  \n   In thermodynamics: the change in a system’s internal energy equals heat added to the system minus work done by the system.  \n   \\[\n   \\Delta U = Q - W\n   \\]\n\n2. **Second Law — Entropy Increases**  \n   In any natural process, the total entropy of an isolated system tends to increase.  \n   Equivalently, heat flows spontaneously from hotter objects to colder ones, and no heat engine can be 100% efficient.\n\n3. **Third Law — Absolute Zero Limit**  \n   As temperature approaches absolute zero, the entropy of a perfect crystal approaches zero.  \n   It also implies that absolute zero cannot be reached by any finite physical process.\n\nThere is also a **Zeroth Law**, often stated separately: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is what makes temperature well-defined.",

          "type": "output_text"

        }

      ],

      "id": "msg_063e06a488467aad0169ebb262c45c819093301855572fac7f",

      "phase": "final_answer",

      "role": "assistant",

      "status": "completed",

      "type": "message"

    }

  ],

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

  "status": "completed",

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

  "usage": {

    "input_tokens": 15,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 293,

    "output_tokens_details": {

      "reasoning_tokens": 66

    },

    "total_tokens": 308

  },

  "user": null

}


```

## Examples

**With Instructions**  — Using instructions to set context 

* [ TypeScript ](#tab-panel-1036)
* [ cURL ](#tab-panel-1037)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

  {

    input: 'How do I read a JSON file in Python?',

    instructions: 'You are a helpful coding assistant specializing in Python.',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "openai/gpt-5.5-pro",

  "input": "How do I read a JSON file in Python?",

  "instructions": "You are a helpful coding assistant specializing in Python."

}'


```

* [ Output ](#tab-panel-1046)
* [ Raw response ](#tab-panel-1047)

Use Python’s built-in `json` module:

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

print(data)
```

If `data.json` contains:

```json
{
  "name": "Alice",
  "age": 30
}
```

Then `data` will be a Python dictionary:

```python
print(data["name"])  # Alice
print(data["age"])   # 30
```

You can also handle common errors:

```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    print(data)

except FileNotFoundError:
    print("The JSON file was not found.")

except json.JSONDecodeError:
    print("The file is not valid JSON.")
```

Use `json.load(file)` for reading from a file, and `json.loads(string)` for parsing a JSON string.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054286,

  "created_at": 1777054264,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_0a5627201ea32bd60169ebb23813c081978bb6448d3757ad16",

  "incomplete_details": null,

  "instructions": "You are a helpful coding assistant specializing in Python.",

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.5-pro-2026-04-23",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_0a5627201ea32bd60169ebb24e286081979a18901a559d3252",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "Use Python’s built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\nIf `data.json` contains:\n\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30\n}\n```\n\nThen `data` will be a Python dictionary:\n\n```python\nprint(data[\"name\"])  # Alice\nprint(data[\"age\"])   # 30\n```\n\nYou can also handle common errors:\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as file:\n        data = json.load(file)\n\n    print(data)\n\nexcept FileNotFoundError:\n    print(\"The JSON file was not found.\")\n\nexcept json.JSONDecodeError:\n    print(\"The file is not valid JSON.\")\n```\n\nUse `json.load(file)` for reading from a file, and `json.loads(string)` for parsing a JSON string.",

          "type": "output_text"

        }

      ],

      "id": "msg_0a5627201ea32bd60169ebb24e2a148197917120444493cfa0",

      "phase": "final_answer",

      "role": "assistant",

      "status": "completed",

      "type": "message"

    }

  ],

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

  "status": "completed",

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

  "usage": {

    "input_tokens": 30,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 387,

    "output_tokens_details": {

      "reasoning_tokens": 170

    },

    "total_tokens": 417

  },

  "user": null

}


```

**Multi-turn Conversation**  — Continuing a conversation with message array 

* [ TypeScript ](#tab-panel-1042)
* [ cURL ](#tab-panel-1043)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

  {

    input: [

      {

        content: 'I need help planning a road trip from San Francisco to Los Angeles.',

        role: 'user',

      },

      {

        content:

          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

        role: 'assistant',

      },

      { content: 'Yes, name three good stops in one short sentence each.', role: 'user' },

    ],

    max_output_tokens: 16000,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "openai/gpt-5.5-pro",

  "input": [

    {

      "content": "I need help planning a road trip from San Francisco to Los Angeles.",

      "role": "user"

    },

    {

      "content": "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

      "role": "assistant"

    },

    {

      "content": "Yes, name three good stops in one short sentence each.",

      "role": "user"

    }

  ],

  "max_output_tokens": 16000

}'


```

* [ Output ](#tab-panel-1048)
* [ Raw response ](#tab-panel-1049)

- Monterey/Carmel is great for beaches, seafood, and a quick scenic stroll.  
- Big Sur offers dramatic ocean views, Bixby Bridge, and McWay Falls.  
- Santa Barbara is perfect for lunch, State Street, and Stearns Wharf.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777421264,

  "created_at": 1777421233,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "resp_01ed6abc47bd85fc0169f14bb1332481968b1628177ee39463",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": 16000,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.5-pro-2026-04-23",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_01ed6abc47bd85fc0169f14bcfd2508196b39551bf06fa05b5",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "- Monterey/Carmel is great for beaches, seafood, and a quick scenic stroll.  \n- Big Sur offers dramatic ocean views, Bixby Bridge, and McWay Falls.  \n- Santa Barbara is perfect for lunch, State Street, and Stearns Wharf.",

          "type": "output_text"

        }

      ],

      "id": "msg_01ed6abc47bd85fc0169f14bcfd38c81968fbe4768d5cc9b0f",

      "phase": "final_answer",

      "role": "assistant",

      "status": "completed",

      "type": "message"

    }

  ],

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

  "status": "completed",

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

  "usage": {

    "input_tokens": 78,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 251,

    "output_tokens_details": {

      "reasoning_tokens": 191

    },

    "total_tokens": 329

  },

  "user": null

}


```

**Temperature Control**  — Using temperature for creative responses 

* [ TypeScript ](#tab-panel-1038)
* [ cURL ](#tab-panel-1039)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

  { input: 'Write a haiku about artificial intelligence', temperature: 1 },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "openai/gpt-5.5-pro",

  "input": "Write a haiku about artificial intelligence",

  "temperature": 1

}'


```

* [ Output ](#tab-panel-1050)
* [ Raw response ](#tab-panel-1051)

Silent circuits dream  
Learning patterns in starlight  
Dawn hums through the code

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054304,

  "created_at": 1777054296,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_0861b6980fc9f4ab0169ebb2585a388196b5ae496c923d5c46",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.5-pro-2026-04-23",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_0861b6980fc9f4ab0169ebb260b08c81968600b365effb3d15",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "Silent circuits dream  \nLearning patterns in starlight  \nDawn hums through the code",

          "type": "output_text"

        }

      ],

      "id": "msg_0861b6980fc9f4ab0169ebb260b29c81968b2573cb5b00befc",

      "phase": "final_answer",

      "role": "assistant",

      "status": "completed",

      "type": "message"

    }

  ],

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

  "status": "completed",

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

  "usage": {

    "input_tokens": 13,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 121,

    "output_tokens_details": {

      "reasoning_tokens": 97

    },

    "total_tokens": 134

  },

  "user": null

}


```

**With Reasoning**  — Using reasoning effort for complex problems 

* [ TypeScript ](#tab-panel-1040)
* [ cURL ](#tab-panel-1041)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5-pro',

  {

    input:

      'Solve this problem step by step: A train leaves Chicago at 60mph heading east. Another train leaves New York at 80mph heading west. They are 900 miles apart. When do they meet?',

    reasoning: { effort: 'medium' },

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "openai/gpt-5.5-pro",

  "input": "Solve this problem step by step: A train leaves Chicago at 60mph heading east. Another train leaves New York at 80mph heading west. They are 900 miles apart. When do they meet?",

  "reasoning": {

    "effort": "medium"

  }

}'


```

* [ Output ](#tab-panel-1052)
* [ Raw response ](#tab-panel-1053)

Assuming both trains leave at the same time:

1. Train from Chicago speed: **60 mph**
2. Train from New York speed: **80 mph**
3. Since they are moving toward each other, add their speeds:

\[
60 + 80 = 140 \text{ mph}
\]

4. They are **900 miles** apart, so time is:

\[
\text{time} = \frac{900}{140}
\]

\[
\text{time} = 6.428571\ldots \text{ hours}
\]

5. Convert the decimal part:

\[
0.428571 \times 60 \approx 25.7 \text{ minutes}
\]

So they meet after about:

\[
\boxed{6 \text{ hours } 26 \text{ minutes}}
\]

More exactly, they meet after **6 hours, 25 minutes, and 43 seconds**.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054312,

  "created_at": 1777054305,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_03fc3b8888c0aecf0169ebb2616f408195b4462e87d425924a",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.5-pro-2026-04-23",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_03fc3b8888c0aecf0169ebb2684a4c8195b4fd258c0d92977d",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "Assuming both trains leave at the same time:\n\n1. Train from Chicago speed: **60 mph**\n2. Train from New York speed: **80 mph**\n3. Since they are moving toward each other, add their speeds:\n\n\\[\n60 + 80 = 140 \\text{ mph}\n\\]\n\n4. They are **900 miles** apart, so time is:\n\n\\[\n\\text{time} = \\frac{900}{140}\n\\]\n\n\\[\n\\text{time} = 6.428571\\ldots \\text{ hours}\n\\]\n\n5. Convert the decimal part:\n\n\\[\n0.428571 \\times 60 \\approx 25.7 \\text{ minutes}\n\\]\n\nSo they meet after about:\n\n\\[\n\\boxed{6 \\text{ hours } 26 \\text{ minutes}}\n\\]\n\nMore exactly, they meet after **6 hours, 25 minutes, and 43 seconds**.",

          "type": "output_text"

        }

      ],

      "id": "msg_03fc3b8888c0aecf0169ebb2684bc0819589f472918a0073f2",

      "phase": "final_answer",

      "role": "assistant",

      "status": "completed",

      "type": "message"

    }

  ],

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

  "status": "completed",

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

  "usage": {

    "input_tokens": 48,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 381,

    "output_tokens_details": {

      "reasoning_tokens": 182

    },

    "total_tokens": 429

  },

  "user": null

}


```

## Parameters

* [ Input ](#tab-panel-1054)
* [ Output ](#tab-panel-1055)

▶input

`one of`required

instructions

`string`

max\_output\_tokens

`number`exclusiveMinimum: 0

▶reasoning{}

`object`

stream

`boolean`

temperature

`number`maximum: 2minimum: 0

▶text{}

`object`

tool\_choice

``

▶tools\[\]

`array`

top\_p

`number`maximum: 1minimum: 0

created\_at

`number`

id

`string`

model

`string`

object

`string`const: response

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
