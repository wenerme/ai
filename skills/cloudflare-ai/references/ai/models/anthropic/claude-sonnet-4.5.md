---
description: Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.
title: Claude Sonnet 4.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Sonnet 4.5

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-sonnet-4.5`

- Third-party
- Zero data retention

Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 200,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://www.anthropic.com/claude/sonnet) |
| Zero data retention | Yes |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$3.00</li><li>Output (per 1M tokens)$15.00</li><li>Cached input (per 1M tokens)$0.30</li><li>Cache creation (per 1M tokens)$3.75</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
# The Three Laws of Thermodynamics

## **First Law: Conservation of Energy**
Energy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.
- Also stated as: ΔU = Q - W (change in internal energy equals heat added minus work done)

## **Second Law: Entropy**
The entropy of an isolated system always increases over time. Heat naturally flows from hot to cold, and processes tend toward disorder.
- This law explains why certain processes are irreversible and why we can't have 100% efficient heat engines

## **Third Law: Absolute Zero**
As temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero.
- Practically, this means absolute zero cannot be reached through any finite number of processes

**Note:** There's also a "Zeroth Law" (named later): If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of temperature.
```

```json
{
  "content": [
    {
      "text": "# The Three Laws of Thermodynamics\n\n## **First Law: Conservation of Energy**\nEnergy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.\n- Also stated as: ΔU = Q - W (change in internal energy equals heat added minus work done)\n\n## **Second Law: Entropy**\nThe entropy of an isolated system always increases over time. Heat naturally flows from hot to cold, and processes tend toward disorder.\n- This law explains why certain processes are irreversible and why we can't have 100% efficient heat engines\n\n## **Third Law: Absolute Zero**\nAs temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero.\n- Practically, this means absolute zero cannot be reached through any finite number of processes\n\n**Note:** There's also a \"Zeroth Law\" (named later): If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of temperature.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01GZMN4RKsBb5RHXUJYBgBdG",
  "model": "claude-sonnet-4-5-20250929",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 17,
    "output_tokens": 240
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],
    system: 'You are a helpful coding assistant specializing in Python.',
    temperature: 0.3,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "system": "You are a helpful coding assistant specializing in Python.",
  "temperature": 0.3
}'
```

````
# Reading a JSON File in Python

You can read a JSON file using Python's built-in `json` module. Here are the common methods:

## Basic Method

```python
import json

# Read JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Complete Example

```python
import json

# Reading JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

# Access the data
print(data)
print(type(data))  # Usually dict or list
```

## With Error Handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
    print(data)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError:
    print("Invalid JSON format!")
```

## Reading JSON String (not file)

If you have a JSON string instead of a file:

```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)  # Note: loads() not load()
print(data)
```

## Key Points

- **`json.load()`** - reads from a **file object**
- **`json.loads()`** - reads from a **string**
- Always use `with open()` to ensure the file is properly closed
- JSON objects become Python dictionaries
- JSON arrays become Python lists
````

```json
{
  "content": [
    {
      "text": "# Reading a JSON File in Python\n\nYou can read a JSON file using Python's built-in `json` module. Here are the common methods:\n\n## Basic Method\n\n```python\nimport json\n\n# Read JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n## Complete Example\n\n```python\nimport json\n\n# Reading JSON file\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n    \n# Access the data\nprint(data)\nprint(type(data))  # Usually dict or list\n```\n\n## With Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\n    print(data)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError:\n    print(\"Invalid JSON format!\")\n```\n\n## Reading JSON String (not file)\n\nIf you have a JSON string instead of a file:\n\n```python\nimport json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)  # Note: loads() not load()\nprint(data)\n```\n\n## Key Points\n\n- **`json.load()`** - reads from a **file object**\n- **`json.loads()`** - reads from a **string**\n- Always use `with open()` to ensure the file is properly closed\n- JSON objects become Python dictionaries\n- JSON arrays become Python lists",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01KF2gMfuUeqNjxZytqgkfGd",
  "model": "claude-sonnet-4-5-20250929",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 28,
    "output_tokens": 371
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.5',
  {
    max_tokens: 1024,
    messages: [
      {
        content: 'I need help planning a road trip from San Francisco to Los Angeles.',
        role: 'user',
      },
      {
        content:
          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
        role: 'assistant',
      },
      { content: 'Yes, what are some good places to stop?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "I need help planning a road trip from San Francisco to Los Angeles.",
      "role": "user"
    },
    {
      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
      "role": "assistant"
    },
    {
      "content": "Yes, what are some good places to stop?",
      "role": "user"
    }
  ]
}'
```

```
Here are some great stops between San Francisco and Los Angeles:

**Scenic Route (Highway 1/PCH - about 10 hours driving):**
- **Monterey & Carmel** - Monterey Bay Aquarium, 17-Mile Drive, charming downtown Carmel
- **Big Sur** - McWay Falls, Bixby Bridge, stunning coastal views
- **Hearst Castle** - Historic mansion tours in San Simeon
- **Morro Bay** - Iconic Morro Rock and waterfront
- **San Luis Obispo** - Downtown shopping, Madonna Inn
- **Santa Barbara** - Spanish architecture, beaches, wine country
- **Solvang** - Danish-themed village (short detour)

**Faster Route (Highway 101 - about 6 hours):**
- **Gilroy** - Famous garlic capital
- **San Luis Obispo** - Bubblegum Alley, Mission
- **Pismo Beach** - Classic beach town
- **Santa Barbara** - Mission, State Street

**Tips:**
- Big Sur has limited cell service and few gas stations
- Book Hearst Castle tickets in advance
- Consider splitting into 2-3 days to enjoy stops

What interests you most - beaches, nature, food, or historic sites? I can refine recommendations based on your preferences!
```

```json
{
  "content": [
    {
      "text": "Here are some great stops between San Francisco and Los Angeles:\n\n**Scenic Route (Highway 1/PCH - about 10 hours driving):**\n- **Monterey & Carmel** - Monterey Bay Aquarium, 17-Mile Drive, charming downtown Carmel\n- **Big Sur** - McWay Falls, Bixby Bridge, stunning coastal views\n- **Hearst Castle** - Historic mansion tours in San Simeon\n- **Morro Bay** - Iconic Morro Rock and waterfront\n- **San Luis Obispo** - Downtown shopping, Madonna Inn\n- **Santa Barbara** - Spanish architecture, beaches, wine country\n- **Solvang** - Danish-themed village (short detour)\n\n**Faster Route (Highway 101 - about 6 hours):**\n- **Gilroy** - Famous garlic capital\n- **San Luis Obispo** - Bubblegum Alley, Mission\n- **Pismo Beach** - Classic beach town\n- **Santa Barbara** - Mission, State Street\n\n**Tips:**\n- Big Sur has limited cell service and few gas stations\n- Book Hearst Castle tickets in advance\n- Consider splitting into 2-3 days to enjoy stops\n\nWhat interests you most - beaches, nature, food, or historic sites? I can refine recommendations based on your preferences!",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_013M3Nhg1ApNNGZf1GWxRHUj",
  "model": "claude-sonnet-4-5-20250929",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 76,
    "output_tokens": 310
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Higher temperature for creative output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.5',
  {
    max_tokens: 512,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
    temperature: 0.8,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 512,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ],
  "temperature": 0.8
}'
```

```
# The Blue Feather

Detective Sarah Chen had seen plenty of strange things at crime scenes over her fifteen years on the force, but she'd never seen anything quite like this.

The penthouse apartment was pristine—too pristine for a place where someone had allegedly been murdered just hours ago. No blood spatter. No signs of struggle. No body, for that matter, despite three separate witnesses reporting screams and a gunshot at 2:47 AM.

She was about to call it in as a false alarm when the morning sun shifted through the floor-to-ceiling windows, catching something wedged between the marble tiles near the balcony door.

Sarah knelt down and pulled out her tweezers. The object was impossibly delicate: a single feather, no longer than her thumb, glowing an electric blue that seemed to pulse with its own light. She'd never seen a bird with plumage this color—not naturally, anyway.

But it was what happened when she picked it up that made her breath catch.

The feather was warm. And getting warmer.

Then it started to hum.
```

```json
{
  "content": [
    {
      "text": "# The Blue Feather\n\nDetective Sarah Chen had seen plenty of strange things at crime scenes over her fifteen years on the force, but she'd never seen anything quite like this.\n\nThe penthouse apartment was pristine—too pristine for a place where someone had allegedly been murdered just hours ago. No blood spatter. No signs of struggle. No body, for that matter, despite three separate witnesses reporting screams and a gunshot at 2:47 AM.\n\nShe was about to call it in as a false alarm when the morning sun shifted through the floor-to-ceiling windows, catching something wedged between the marble tiles near the balcony door.\n\nSarah knelt down and pulled out her tweezers. The object was impossibly delicate: a single feather, no longer than her thumb, glowing an electric blue that seemed to pulse with its own light. She'd never seen a bird with plumage this color—not naturally, anyway.\n\nBut it was what happened when she picked it up that made her breath catch.\n\nThe feather was warm. And getting warmer.\n\nThen it started to hum.",
      "type": "text"
    }
  ],
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "id": "msg_01Qf12B9uws6JAnfRfQ6WgBe",
  "model": "claude-sonnet-4-5-20250929",
  "role": "assistant",
  "stop_details": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 21,
    "output_tokens": 243
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true
}'
```

````
# Recursion Explained

**Recursion** is when a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components

1. **Base case**: A condition that stops the recursion
2. **Recursive case**: The function calling itself with a simpler input

## Simple Example: Countdown

```python
def countdown(n):
    # Base case: stop when we reach 0
    if n <= 0:
        print("Done!")
    else:
        # Recursive case
        print(n)
        countdown(n - 1)  # Call itself with smaller number

countdown(3)
```

**Output:**
```
3
2
1
Done!
```

**How it works:**
1. `countdown(3)` prints 3, then calls `countdown(2)`
2. `countdown(2)` prints 2, then calls `countdown(1)`
3. `countdown(1)` prints 1, then calls `countdown(0)`
4. `countdown(0)` hits the base case and prints "Done!"

## Real-World Analogy

Think of Russian nesting dolls:
- Opening one doll reveals a smaller doll inside
- You keep opening dolls (recursion) until you find the smallest one (base case)
- Then you're done!

## Common Use Cases
- Calculating factorials
- Tree/graph traversal
- Sorting algorithms (quicksort, mergesort)
- Processing nested structures
````

```json
[
  {
    "message": {
      "content": [],
      "id": "msg_01UgonW6EAQVn2dqA3yEGcj6",
      "model": "claude-sonnet-4-5-20250929",
      "role": "assistant",
      "stop_details": null,
      "stop_reason": null,
      "stop_sequence": null,
      "type": "message",
      "usage": {
        "cache_creation": {
          "ephemeral_1h_input_tokens": 0,
          "ephemeral_5m_input_tokens": 0
        },
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "inference_geo": "not_available",
        "input_tokens": 19,
        "output_tokens": 1,
        "service_tier": "standard"
      }
    },
    "type": "message_start"
  },
  {
    "content_block": {
      "text": "",
      "type": "text"
    },
    "index": 0,
    "type": "content_block_start"
  },
  "... 15 more chunks omitted ...",
  {
    "type": "message_stop"
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting Claude use Anthropic's server-side web search tool to answer with current information</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-sonnet-4.5',
  {
    max_tokens: 4096,
    messages: [
      {
        content:
          'What were the top news stories about Cloudflare this week? Summarise in three bullets.',
        role: 'user',
      },
    ],
    tools: [{ max_uses: 3, name: 'web_search', type: 'web_search_20250305' }],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 4096,
  "messages": [
    {
      "content": "What were the top news stories about Cloudflare this week? Summarise in three bullets.",
      "role": "user"
    }
  ],
  "tools": [
    {
      "max_uses": 3,
      "name": "web_search",
      "type": "web_search_20250305"
    }
  ]
}'
```

```
Based on the search results, here are the top news stories about Cloudflare this week:

• **Ongoing Network Outage**:
```

```json
{
  "id": "msg_018Y4VGmTsaUk4xzCg2SNi29",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "server_tool_use",
      "id": "srvtoolu_014NoiMmSbNDc3u27gXvxmcd",
      "name": "web_search",
      "input": {
        "query": "Cloudflare news this week"
      }
    },
    {
      "type": "web_search_tool_result",
      "tool_use_id": "srvtoolu_014NoiMmSbNDc3u27gXvxmcd",
      "content": [
        {
          "type": "web_search_result",
          "title": "Cloudflare Status",
          "url": "https://www.cloudflarestatus.com/",
          "encrypted_content": "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",
          "page_age": "2 hours ago"
        },
        {
          "type": "web_search_result",
          "title": "The Cloudflare Blog: Product News",
          "url": "https://blog.cloudflare.com/tag/product-news/",
          "encrypted_content": "Eq4RCioIERgCIiQ5ODY2MTIzNC03NmUwLTRlMGQtYTgyMS1iZThmOGMzNDc0ZDYSDPxF37VWzvD0IwnS6xoMfestyfsaChUSVJSpIjCYuV32cdisnHf8bzAn4Fj13E6MmFIQmyyo6WnLAHWVDwisii7KAble8MguJTzCMOIqsRDAP9d02MbbbyD8Ewhhs2wnoh0QYHNnxGrZHXvLWDKInrCy6lhQygvLecfKEvvOXYrICCSNl+tyioICV1M7ktvUktJ2Efm5nLw0L1C1/vLQeQQ5LFKEXqhYz/W+Xds28/aH6udGZMBTduyytOsd1fDAcwIztMuZQtrESOpOZPVxblbxYFBY/4yUGmDh+7HRG86zdAuNCoipu6lykNIKOUsNTY+nxtJPgjdEj0/HhHRwf7REaerssFXgUw5WdQmRXAxP649+Cfjik0qrvNGgGTthdoH9nO/uK5udkIPErGU81Pasti6uSzAl8AeityGxKp9lpBpmRsPfTLi+YdLwDTO9FezP/+OGhw+nDsddcF7bCK+M43CbfSL6iHwUkuSXYrxN6vPyfX9Rk13SjaB+rnEQOjQMHtXsKxNPR7VIecaQiJ2TxRWWSZ7+S4qiFPNXDyKM/OW8rCv++JdC7YAKxiZva/LE2uS1sX2sr+LcuSlYg6QPy9rqoD7go3d6oxXTxFkEoKpWQHI8VCAAo0fo2W+yhgHOT2WewfynS8V0a7Y45suq3CDLWjJ6Pj2E66/E3ONz0A7xV77jszpRjEWbQWpXDocCh/Fflps/+xKqCOGInHGH477cXPq+g4yu1/4EIY0eZZavvQG9Xbr+KAkd4M0g+h2rSxE3pvQdEBzBbmGkzSHmxBnHecjJdoU04yWrSjZH7TYksQ/a8067BY2tcEKD7PQFftQQGlOSSq4XuwBS1Z+/R4i1BGo5KofazOfMDB33FSjPiih3nTS5lgJSC/YwVgTCqKcOlXOs0Ka9sRfYixXre0mZhrWSm4AAB7W/RZ0z1ujbQ//FoCFhd5dgnZOB7raAYIbrkPhZxw2EHMqBqsw+n98/4amJwoa7iQrfC0mpgJ/MLPVh6YNQepPimdLMxEVHBxdsjd/AamCVDEEdaLG2bgnXgy/DaJiq+dFdZb8JNIuvNh1tJxkOLO9RQXDIWF/Dfj1y+4wDRQaHVmIpj+VvCyg006+sUk7jIHvO9jhkj6f6vPWAHTkDJY0wHO+0qmEowvtCfmOohsAdVLj/0grqhNu9j05gdEmpEQvENrk3JiD41XgkKhpeC0DHe4xOt53o9oNwmMDKQ0Ixbc70uk+Mc/Of33stig8M9IA74hMur88SOFItY5bBRMEKoebjc7bLU0Hp20bqGmsfFAGXKDM/4FL/qrZ8BG/AKN73ilnXT0a6sP4gSGZq2gScAMo2v28t6jT0W0wzcjVDCP65R0FvoC7r9bj1PlJWq5PLgh6PH3PllUp/Jzu
... response truncated ...
```

</details>

## Parameters

▶messages\[]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

temperature

`number`minimum: 0maximum: 1

top\_p

`number`minimum: 0maximum: 1

top\_k

`number`exclusiveMinimum: 0

stream

`boolean`

▶metadata{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[]

`array`

model

`string`

stop\_reason

`string`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/#page","headline":"Claude Sonnet 4.5","description":"Claude Sonnet 4.5 is the best coding model to date, with significant improvements across the entire development lifecycle.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-sonnet-4.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
