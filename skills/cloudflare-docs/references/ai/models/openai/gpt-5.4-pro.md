---
title: GPT-5.4 pro
description: GPT-5.4 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 pro 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4-pro` 

GPT-5.4 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.

| Model Info                                                                 |                                                                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                     |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                               |
| More information                                                           | [link ↗](https://openai.com/)                                                                                        |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4-pro) |

## Usage

* [ TypeScript ](#tab-panel-1026)
* [ cURL ](#tab-panel-1027)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

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

  "model": "openai/gpt-5.4-pro",

  "input": "What are the three laws of thermodynamics?"

}'


```

* [ Output ](#tab-panel-1036)
* [ Raw response ](#tab-panel-1037)

The **three laws of thermodynamics** usually mean:

1. **First Law — Conservation of Energy**  
   Energy cannot be created or destroyed, only transferred or transformed.  
   - In thermodynamics: the change in a system’s internal energy equals heat added to the system minus work done by the system.

2. **Second Law — Entropy Increases**  
   In any natural process, the total entropy of an isolated system tends to increase.  
   - This means energy spontaneously spreads out, and no heat engine can be 100% efficient.
   - Heat naturally flows from hot objects to cold ones, not the reverse without input of work.

3. **Third Law — Entropy at Absolute Zero**  
   As temperature approaches **absolute zero** (0 K), the entropy of a perfect crystal approaches zero.  
   - A consequence is that absolute zero cannot be reached in a finite number of steps.

Small note: thermodynamics also has a **Zeroth Law**, which is often listed before these:
- If system A is in thermal equilibrium with B, and B is in thermal equilibrium with C, then A is in thermal equilibrium with C.  
- This is the basis for the concept of **temperature**.

If you want, I can also give a **one-line intuitive version** of each law.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054203,

  "created_at": 1777054122,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_00272dd8da5b37c90169ebb1aaeb288194a6e5ddeb7bb03dc8",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.4-pro-2026-03-05",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_00272dd8da5b37c90169ebb1faf90c81948fd9a67a37b4c209",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "The **three laws of thermodynamics** usually mean:\n\n1. **First Law — Conservation of Energy**  \n   Energy cannot be created or destroyed, only transferred or transformed.  \n   - In thermodynamics: the change in a system’s internal energy equals heat added to the system minus work done by the system.\n\n2. **Second Law — Entropy Increases**  \n   In any natural process, the total entropy of an isolated system tends to increase.  \n   - This means energy spontaneously spreads out, and no heat engine can be 100% efficient.\n   - Heat naturally flows from hot objects to cold ones, not the reverse without input of work.\n\n3. **Third Law — Entropy at Absolute Zero**  \n   As temperature approaches **absolute zero** (0 K), the entropy of a perfect crystal approaches zero.  \n   - A consequence is that absolute zero cannot be reached in a finite number of steps.\n\nSmall note: thermodynamics also has a **Zeroth Law**, which is often listed before these:\n- If system A is in thermal equilibrium with B, and B is in thermal equilibrium with C, then A is in thermal equilibrium with C.  \n- This is the basis for the concept of **temperature**.\n\nIf you want, I can also give a **one-line intuitive version** of each law.",

          "type": "output_text"

        }

      ],

      "id": "msg_00272dd8da5b37c90169ebb1fafad0819488ef71fbebf8527a",

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

  "prompt_cache_retention": "in_memory",

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

    "input_tokens": 15,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 342,

    "output_tokens_details": {

      "reasoning_tokens": 67

    },

    "total_tokens": 357

  },

  "user": null

}


```

## Examples

**With Instructions**  — Using instructions to set context 

* [ TypeScript ](#tab-panel-1028)
* [ cURL ](#tab-panel-1029)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

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

  "model": "openai/gpt-5.4-pro",

  "input": "How do I read a JSON file in Python?",

  "instructions": "You are a helpful coding assistant specializing in Python."

}'


```

* [ Output ](#tab-panel-1038)
* [ Raw response ](#tab-panel-1039)

Use Python’s built-in `json` module.

### Read a JSON file into a Python object
```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

### What you get back
`json.load()` converts JSON into normal Python types:

- JSON object → `dict`
- JSON array → `list`
- JSON string → `str`
- JSON number → `int` / `float`
- JSON true/false → `True` / `False`
- JSON null → `None`

### Example
If `data.json` contains:
```json
{
  "name": "Alice",
  "age": 30,
  "skills": ["Python", "SQL"]
}
```

Then:
```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data["name"])    # Alice
print(data["skills"])  # ['Python', 'SQL']
```

### Handle errors safely
```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError:
    print("Invalid JSON.")
```

### If you already have JSON as a string
Use `json.loads()` instead:
```python
import json

text = '{"name": "Alice", "age": 30}'
data = json.loads(text)
print(data)
```

If you want, I can also show how to **write JSON back to a file**.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054145,

  "created_at": 1777054123,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_00e5a81e42bf0bda0169ebb1ab449c8190a0d57802b4aebebd",

  "incomplete_details": null,

  "instructions": "You are a helpful coding assistant specializing in Python.",

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.4-pro-2026-03-05",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_00e5a81e42bf0bda0169ebb1c0e57881909eaf01efa0557a43",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "Use Python’s built-in `json` module.\n\n### Read a JSON file into a Python object\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\n### What you get back\n`json.load()` converts JSON into normal Python types:\n\n- JSON object → `dict`\n- JSON array → `list`\n- JSON string → `str`\n- JSON number → `int` / `float`\n- JSON true/false → `True` / `False`\n- JSON null → `None`\n\n### Example\nIf `data.json` contains:\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"skills\": [\"Python\", \"SQL\"]\n}\n```\n\nThen:\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data[\"name\"])    # Alice\nprint(data[\"skills\"])  # ['Python', 'SQL']\n```\n\n### Handle errors safely\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON.\")\n```\n\n### If you already have JSON as a string\nUse `json.loads()` instead:\n```python\nimport json\n\ntext = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(text)\nprint(data)\n```\n\nIf you want, I can also show how to **write JSON back to a file**.",

          "type": "output_text"

        }

      ],

      "id": "msg_00e5a81e42bf0bda0169ebb1c0e7608190b3928d22f252a21a",

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

  "prompt_cache_retention": "in_memory",

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

    "input_tokens": 30,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 397,

    "output_tokens_details": {

      "reasoning_tokens": 35

    },

    "total_tokens": 427

  },

  "user": null

}


```

**Multi-turn Conversation**  — Continuing a conversation with message array 

* [ TypeScript ](#tab-panel-1034)
* [ cURL ](#tab-panel-1035)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

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

  "model": "openai/gpt-5.4-pro",

  "input": [

    {

      "content": "I need help planning a road trip from San Francisco to Los Angeles.",

      "role": "user"

    },

    {

      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

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

* [ Output ](#tab-panel-1040)
* [ Raw response ](#tab-panel-1041)

- Monterey is great for the aquarium, Cannery Row, and ocean views.  
- San Luis Obispo is a fun lunch stop with a charming downtown and Mission Plaza.  
- Santa Barbara offers beaches, palm-lined streets, and an easy coastal break.

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777421276,

  "created_at": 1777421147,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "id": "resp_08addd0821ac85160169f14b5b16d881968c58b918efd0d015",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": 16000,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.4-pro-2026-03-05",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_08addd0821ac85160169f14bdca35c819696eb984a7f0beead",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "- Monterey is great for the aquarium, Cannery Row, and ocean views.  \n- San Luis Obispo is a fun lunch stop with a charming downtown and Mission Plaza.  \n- Santa Barbara offers beaches, palm-lined streets, and an easy coastal break.",

          "type": "output_text"

        }

      ],

      "id": "msg_08addd0821ac85160169f14bdca4ec8196a5b40b76291544f5",

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

  "prompt_cache_retention": "in_memory",

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

    "input_tokens": 78,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 104,

    "output_tokens_details": {

      "reasoning_tokens": 46

    },

    "total_tokens": 182

  },

  "user": null

}


```

**Temperature Control**  — Using temperature for creative responses 

* [ TypeScript ](#tab-panel-1030)
* [ cURL ](#tab-panel-1031)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

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

  "model": "openai/gpt-5.4-pro",

  "input": "Write a haiku about artificial intelligence",

  "temperature": 1

}'


```

* [ Output ](#tab-panel-1042)
* [ Raw response ](#tab-panel-1043)

Silent circuits dream  
Learning patterns in the dark  
Dawn wakes metal minds

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054190,

  "created_at": 1777054156,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_01b04056ffd5d9ac0169ebb1cc85348196a164e1d9e99ac1f5",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.4-pro-2026-03-05",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_01b04056ffd5d9ac0169ebb1ee42688196859b0cd089b7924c",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "Silent circuits dream  \nLearning patterns in the dark  \nDawn wakes metal minds",

          "type": "output_text"

        }

      ],

      "id": "msg_01b04056ffd5d9ac0169ebb1ee44248196aa66c63d28c6a59b",

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

  "prompt_cache_retention": "in_memory",

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

    "input_tokens": 13,

    "input_tokens_details": {

      "cached_tokens": 0

    },

    "output_tokens": 122,

    "output_tokens_details": {

      "reasoning_tokens": 101

    },

    "total_tokens": 135

  },

  "user": null

}


```

**With Reasoning**  — Using reasoning effort for complex problems 

* [ TypeScript ](#tab-panel-1032)
* [ cURL ](#tab-panel-1033)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-pro',

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

  "model": "openai/gpt-5.4-pro",

  "input": "Solve this problem step by step: A train leaves Chicago at 60mph heading east. Another train leaves New York at 80mph heading west. They are 900 miles apart. When do they meet?",

  "reasoning": {

    "effort": "medium"

  }

}'


```

* [ Output ](#tab-panel-1044)
* [ Raw response ](#tab-panel-1045)

Step 1: Find their combined speed since they are moving toward each other.

- Train from Chicago: **60 mph**
- Train from New York: **80 mph**

Combined speed:

**60 + 80 = 140 mph**

Step 2: Use the distance formula:

\[
\text{time}=\frac{\text{distance}}{\text{speed}}
\]

\[
\text{time}=\frac{900}{140}
\]

\[
\text{time}=6.428571\text{ hours}
\]

Step 3: Convert the decimal part to minutes.

\[
0.428571 \times 60 \approx 25.7 \text{ minutes}
\]

So they meet after about:

**6 hours 26 minutes**

Final answer: **The trains meet about 6 hours 26 minutes after they leave.**

```

{

  "background": false,

  "billing": {

    "payer": "developer"

  },

  "completed_at": 1777054263,

  "created_at": 1777054191,

  "error": null,

  "frequency_penalty": 0,

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "id": "resp_01e1e7671514bf440169ebb1ef8af88190b68b1e60a0cb59ed",

  "incomplete_details": null,

  "instructions": null,

  "max_output_tokens": null,

  "max_tool_calls": null,

  "metadata": {},

  "model": "gpt-5.4-pro-2026-03-05",

  "moderation": null,

  "object": "response",

  "output": [

    {

      "id": "rs_01e1e7671514bf440169ebb236f1e88190931dc758c55a4050",

      "summary": [],

      "type": "reasoning"

    },

    {

      "content": [

        {

          "annotations": [],

          "logprobs": [],

          "text": "Step 1: Find their combined speed since they are moving toward each other.\n\n- Train from Chicago: **60 mph**\n- Train from New York: **80 mph**\n\nCombined speed:\n\n**60 + 80 = 140 mph**\n\nStep 2: Use the distance formula:\n\n\\[\n\\text{time}=\\frac{\\text{distance}}{\\text{speed}}\n\\]\n\n\\[\n\\text{time}=\\frac{900}{140}\n\\]\n\n\\[\n\\text{time}=6.428571\\text{ hours}\n\\]\n\nStep 3: Convert the decimal part to minutes.\n\n\\[\n0.428571 \\times 60 \\approx 25.7 \\text{ minutes}\n\\]\n\nSo they meet after about:\n\n**6 hours 26 minutes**\n\nFinal answer: **The trains meet about 6 hours 26 minutes after they leave.**",

          "type": "output_text"

        }

      ],

      "id": "msg_01e1e7671514bf440169ebb236f3a88190b6a99b6fc6389fde",

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

  "prompt_cache_retention": "in_memory",

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

    "output_tokens": 272,

    "output_tokens_details": {

      "reasoning_tokens": 88

    },

    "total_tokens": 320

  },

  "user": null

}


```

## Parameters

* [ Input ](#tab-panel-1046)
* [ Output ](#tab-panel-1047)

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
