---
title: GPT-5.5 pro
description: GPT-5.5 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  GPT-5.5 pro

Text Generation • OpenAI

`openai/gpt-5.5-pro`

GPT-5.5 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.

| Model Info                                                                 |                                                                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                     |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                               |
| More information                                                           | [link ↗](https://openai.com/)                                                                                        |
| Zero data retention                                                        | Yes                                                                                                                  |
| Request formats                                                            | Responses                                                                                                            |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.5-pro) |

## Usage

* [ TypeScript ](#tab-panel-1458)
* [ cURL ](#tab-panel-1459)

**TypeScript**

```ts
const response = await env.AI.run(
  'openai/gpt-5.5-pro',
  { input: 'What are the three laws of thermodynamics?' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.5-pro",
  "input": "What are the three laws of thermodynamics?"
}'
```

* [ Output ](#tab-panel-1470)
* [ Raw response ](#tab-panel-1471)

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

```json
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

* [ TypeScript ](#tab-panel-1460)
* [ cURL ](#tab-panel-1461)

**TypeScript**

```ts
const response = await env.AI.run(
  'openai/gpt-5.5-pro',
  {
    input: 'How do I read a JSON file in Python?',
    instructions: 'You are a helpful coding assistant specializing in Python.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.5-pro",
  "input": "How do I read a JSON file in Python?",
  "instructions": "You are a helpful coding assistant specializing in Python."
}'
```

* [ Output ](#tab-panel-1472)
* [ Raw response ](#tab-panel-1473)

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

```json
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

* [ TypeScript ](#tab-panel-1466)
* [ cURL ](#tab-panel-1467)

**TypeScript**

```ts
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

```bash
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

* [ Output ](#tab-panel-1474)
* [ Raw response ](#tab-panel-1475)

- Monterey/Carmel is great for beaches, seafood, and a quick scenic stroll.
- Big Sur offers dramatic ocean views, Bixby Bridge, and McWay Falls.
- Santa Barbara is perfect for lunch, State Street, and Stearns Wharf.

```json
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

* [ TypeScript ](#tab-panel-1462)
* [ cURL ](#tab-panel-1463)

**TypeScript**

```ts
const response = await env.AI.run(
  'openai/gpt-5.5-pro',
  { input: 'Write a haiku about artificial intelligence', temperature: 1 },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.5-pro",
  "input": "Write a haiku about artificial intelligence",
  "temperature": 1
}'
```

* [ Output ](#tab-panel-1476)
* [ Raw response ](#tab-panel-1477)

Silent circuits dream
Learning patterns in starlight
Dawn hums through the code

```json
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

* [ TypeScript ](#tab-panel-1464)
* [ cURL ](#tab-panel-1465)

**TypeScript**

```ts
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

```bash
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

* [ Output ](#tab-panel-1478)
* [ Raw response ](#tab-panel-1479)

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

```json
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

**Web Search**  — Letting the model use OpenAI's built-in web search tool to answer with current information

* [ TypeScript ](#tab-panel-1468)
* [ cURL ](#tab-panel-1469)

**TypeScript**

```ts
const response = await env.AI.run(
  'openai/gpt-5.5-pro',
  {
    input: 'What were the top news stories about Cloudflare this week? Summarise in three bullets.',
    max_output_tokens: 4096,
    tools: [{ type: 'web_search_preview' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-5.5-pro",
  "input": "What were the top news stories about Cloudflare this week? Summarise in three bullets.",
  "max_output_tokens": 4096,
  "tools": [
    {
      "type": "web_search_preview"
    }
  ]
}'
```

* [ Output ](#tab-panel-1480)
* [ Raw response ](#tab-panel-1481)

Assuming **“this week” = Jun 16–22, 2026**:

- **Cloudflare service incident:** Cloudflare reported increased error rates/latency from 13:35 UTC today, affecting Analytics, CDN/Cache and Durable Objects; it later pointed to a fiber cut in Eastern North America and said traffic engineering had mitigated most congestion/packet loss. ([cloudflarestatus.com](https://www.cloudflarestatus.com/incidents/v3yl7jqmqj51))
- **New anti-bot/privacy protocol:** Cloudflare announced work with Mozilla Firefox, Google Chrome, Microsoft Edge and Shopify on **Private Access Control Tokens (PACT)**, meant to verify legitimate humans/agents without CAPTCHAs or invasive tracking. ([cloudflare.com](https://www.cloudflare.com/press/press-releases/2026/cloudflare-collaborates-with-leading-browsers-to-develop-a-privacy-first-protocol-for-the-global-internet/))
- **AI + SASE partner push:** Cloudflare launched a **Cloudflare One Design Partner** program and **Cloudflare One Stack**, giving select partners AI-powered workflows to help customers deploy and manage Zero Trust/SASE migrations. ([cloudflare.com](https://www.cloudflare.com/press/press-releases/2026/cloudflare-launches-design-partner-designation-to-accelerate-secure-ai-and-seamless-sase-adoption/))

```json
{
  "id": "resp_0fe61a92ccd82def016a3999c63130819a802271120be10eb8",
  "object": "response",
  "created_at": 1782159814,
  "model": "gpt-5.5-pro-2026-04-23",
  "output": [
    {
      "id": "rs_0fe61a92ccd82def016a399a21cc1c819abf92ab7bc7693b91",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a21d2bc819ab3ca33a96dbae75b",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare news this week June 2026",
          "Cloudflare latest news June 2026",
          "site:blog.cloudflare.com Cloudflare June 2026",
          "Cloudflare stock news June 2026"
        ],
        "query": "Cloudflare news this week June 2026"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a23240c819abcb66f4e6074d9bb",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a233940819a886fe58c76af4475",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare June 22 2026 outage",
          "Cloudflare outage June 22 2026",
          "Cloudflare news June 22 2026",
          "Cloudflare news June 18 2026"
        ],
        "query": "Cloudflare June 22 2026 outage"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a26503c819aa08c657db048d931",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a266c3c819a9c2ab66307ca1f26",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.cloudflarestatus.com/"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a26f1cc819a9e03d45e77d279df",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a2716f4819a9192da4315b2d3d4",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.cloudflarestatus.com/incidents/v3yl7jqmqj51"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a27525c819a8a61f7405ee19d00",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a276a7c819a99477a5b3d1eeaba",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.cloudflare.com/press/press-releases/"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a27c9b4819aa415421854c8a235",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a27e6f0819aad66447fbfd41467",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://www.cloudflare.com/press/press-releases/2026/cloudflare-launches-design-partner-designation-to-accelerate-secure-ai-and-seamless-sase-adoption/"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a28247c819aa2f43a2401eed9a2",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a2840a4819aa0ce23de6ec658cb",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare PACT privacy-first protocol browsers news June 22 2026",
          "Cloudflare leading browsers PACT Mozilla Google Microsoft Shopify June 22 2026",
          "Cloudflare One Stack agent-powered deployment news June 17 2026",
          "Cloudflare Design Partner Cloudflare One Stack SASE adoption June 17 2026"
        ],
        "query": "Cloudflare PACT privacy-first protocol browsers news June 22 2026"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a2ec420819a8391167e995a57d9",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a2ef608819a9cbcc945e42d0791",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare June 2026 latest site:theregister.com",
          "Cloudflare June 2026 latest site:bleepingcomputer.com OR site:thehackernews.com",
          "Cloudflare June 2026 \"June 22\" \"error rates\"",
          "Cloudflare June 2026 \"PACT\" \"Private Access Control Tokens\""
        ],
        "query": "Cloudflare June 2026 latest site:theregister.com"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a340edc819a95e0c1e4b5614f10",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a349134819ab8bc982a5aa737ad",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "Cloudflare",
          "Cloudflare news",
          "Cloudflare outage",
          "Cloudflare PACT"
        ],
        "query": "Cloudflare"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a3e086c819aab8c4070f38deb93",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a3e3d44819aa420a1a6e9206955",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "search",
        "queries": [
          "site:blog.cloudflare.com/ 2026/06/17 Cloudflare",
          "site:blog.cloudflare.com/ 2026/06/18 Cloudflare",
          "site:blog.cloudflare.com/ 2026/06/19 Cloudflare",
          "site:blog.cloudflare.com/ 2026/06/22 Cloudflare"
        ],
        "query": "site:blog.cloudflare.com/ 2026/06/17 Cloudflare"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a416410819a99bdad035902ddd9",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "ws_0fe61a92ccd82def016a399a41a87c819a918ac53a59f75243",
      "type": "web_search_call",
      "status": "completed",
      "action": {
        "type": "open_page",
        "url": "https://blog.cloudflare.com/cloudflare-one-stack/"
      }
    },
    {
      "id": "rs_0fe61a92ccd82def016a399a42968c819a9016993c608908de",
      "type": "reasoning",
      "content": [],
      "summary": []
    },
    {
      "id": "msg_0fe61a92ccd82def016a399a42a7f8819aa00992b84608e5ac",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [
            {
              "type": "url_citation",
              "end_index": 414,
              "start_index": 333,
              "title": "Cloudflare Status - Increased Error Rates",
              "url": "https://www.cloudflarestatus.com/incidents/v3yl7jqmqj51"
            },
            {
              "type": "url_citation",
              "end_index": 846,
              "start_index": 667,
              "title": "www.cloudflare.com",
              "url": "https://www.cloudflare.com/press/press-releases/2026/cloudflare-collaborates-with-leading-browsers-to-develop-a-privacy-first-protocol-for-the-global-internet/"
            },
            {
              "type": "url_citation",
              "end_index": 1250,
              "start_index": 1079,
              "title": "www.cloudflare.com",
              "url": "https://www.cloudflare.com/press/press-releases/2026/cloudflare-launches-design-partner-designation-to-accelerate-secure-ai-and-seamless-sase-adoption/"
            }
          ],
          "logprobs": [],
          "text": "Assuming **“this week” = Jun 16–22, 2026**:\n\n- **Cloudflare service incident:** Cloudflare reported increased error rates/latency from 13:35 UTC today, affecting Analytics, CDN/Cache and Durable Objects; it later pointed to a fiber cut in Eastern North America and said traffic engineering had mitigated most congestion/packet loss. ([cloudflarestatus.com](https://www.cloudflarestatus.com/incidents/v3yl7jqmqj51))\n- **New anti-bot/privacy protocol:** Cloudflare announced work with Mozilla Firefox, Google Chrome, Microsoft Edge and Shopify on **Private Access Control Tokens (PACT)**, meant to verify legitimate humans/agents without CAPTCHAs or invasive tracking. ([cloudflare.com](https://www.cloudflare.com/press/press-releases/2026/cloudflare-collaborates-with-leading-browsers-to-develop-a-privacy-first-protocol-for-the-global-internet/))\n- **AI + SASE partner push:** Cloudflare launched a **Cloudflare One Design Partner** program and **Cloudflare One Stack**, giving select partners AI-powered workflows to help customers deploy and manage Zero Trust/SASE migrations. ([cloudflare.com](https://www.cloudflare.com/press/press-releases/2026/cloudflare-launches-design-partner-designation-to-accelerate-secure-ai-and-seamless-sase-adoption/))"
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 83877,
    "output_tokens": 2919,
    "total_tokens": 86796,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 2689
    }
  },
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1782159941,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": 4096,
  "max_tool_calls": null,
  "moderation": null,
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "context": "current_turn",
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
  "tools": [
    {
      "type": "web_search_preview",
      "search_content_types": [
        "text"
      ],
      "search_context_size": "medium",
      "user_location": {
        "type": "approximate",
        "city": null,
        "country": "US",
        "region": null,
        "timezone": null
      }
    }
  ],
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

* [ Input ](#tab-panel-1482)
* [ Output ](#tab-panel-1483)

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

Input [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.5-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.5-pro/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.5-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-5.5-pro/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-5.5-pro/#page","headline":"GPT-5.5 pro (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"GPT-5.5 pro uses OpenAI's Responses API with built-in tools, improved reasoning, and stateful context management.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-5.5-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
