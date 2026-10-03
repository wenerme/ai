---
description: o3-mini is the lightweight, low-cost reasoning variant of o3, well suited to quick analytical tasks at scale.
title: o3-mini
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# o3-mini

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/o3-mini/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/o3-mini`

- Third-party
- Zero data retention

o3-mini is the lightweight, low-cost reasoning variant of o3, well suited to quick analytical tasks at scale.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 200,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.10</li><li>Output (per 1M tokens)$4.40</li><li>Cached input (per 1M tokens)$0.55</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/o3-mini',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/o3-mini",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
There are a few ways people count the laws of thermodynamics, but a common approach (especially in basic texts) is to focus on these three:

1. First Law of Thermodynamics (Law of Energy Conservation)
 • This law states that energy cannot be created or destroyed—only converted from one form to another. In a closed system, the total energy remains constant. For example, when you burn fuel, the chemical energy is converted into heat and work.

2. Second Law of Thermodynamics
 • This law introduces the concept of entropy, a measure of disorder. It states that in any natural (irreversible) process, the total entropy of an isolated system increases (or remains constant in ideal reversible cases). This explains why heat flows spontaneously from hot to cold and why certain processes (like perpetual motion machines) are impossible.

3. Third Law of Thermodynamics
 • The third law states that as the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero. This law implies that absolute zero is unattainable and provides a reference point for the measurement of entropy.

Note: There is also the Zeroth Law of Thermodynamics, which is sometimes considered foundational. It states that if two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other. This law is crucial in defining temperature but is not always numbered among the “three” if one starts counting from the first law.

These laws together form the basis of classical thermodynamics, helping us understand energy flow, heat transfer, and the directionality of physical processes.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "There are a few ways people count the laws of thermodynamics, but a common approach (especially in basic texts) is to focus on these three:\n\n1. First Law of Thermodynamics (Law of Energy Conservation)  \n • This law states that energy cannot be created or destroyed—only converted from one form to another. In a closed system, the total energy remains constant. For example, when you burn fuel, the chemical energy is converted into heat and work.\n\n2. Second Law of Thermodynamics  \n • This law introduces the concept of entropy, a measure of disorder. It states that in any natural (irreversible) process, the total entropy of an isolated system increases (or remains constant in ideal reversible cases). This explains why heat flows spontaneously from hot to cold and why certain processes (like perpetual motion machines) are impossible.\n\n3. Third Law of Thermodynamics  \n • The third law states that as the temperature of a system approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero. This law implies that absolute zero is unattainable and provides a reference point for the measurement of entropy.\n\nNote: There is also the Zeroth Law of Thermodynamics, which is sometimes considered foundational. It states that if two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other. This law is crucial in defining temperature but is not always numbered among the “three” if one starts counting from the first law.\n\nThese laws together form the basis of classical thermodynamics, helping us understand energy flow, heat transfer, and the directionality of physical processes.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319807,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMRxtcAbZLwD8Nd6POej2jkkjhT",
  "model": "o3-mini-2025-01-31",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_4e608cacbe",
  "usage": {
    "completion_tokens": 851,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 512,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 15,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 866
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/o3-mini',
  {
    messages: [
      { content: 'You are a helpful coding assistant specializing in Python.', role: 'system' },
      { content: 'How do I read a JSON file in Python?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/o3-mini",
  "messages": [
    {
      "content": "You are a helpful coding assistant specializing in Python.",
      "role": "system"
    },
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ]
}'
```

```
To read a JSON file in Python, you can use the built-in json module. This module provides methods for encoding and decoding JSON data. Typically, you'll want to use the json.load() function to read and parse JSON data from a file. Here’s a simple step-by-step example:

1. Import the json module.
2. Open the JSON file using the with context manager (this automatically closes the file after you're done).
3. Use json.load() to parse the file.

Below is the complete example code:

--------------------------------------------------
import json

# Open the JSON file and load its content
with open('data.json', 'r') as file:
    data = json.load(file)

# Now 'data' contains the JSON file content as a Python dictionary (or list, depending on JSON structure)
print(data)
--------------------------------------------------

Explanation:
• The with statement is used to open the file, which ensures that the file is properly closed even if an error occurs.
• The 'r' mode is specified to open the file in read mode.
• json.load(file) parses the JSON content and returns a Python object.
• The resulting data is stored in the variable data, which you can then work with as needed.

If you have any questions or need further assistance, feel free to ask!
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "To read a JSON file in Python, you can use the built-in json module. This module provides methods for encoding and decoding JSON data. Typically, you'll want to use the json.load() function to read and parse JSON data from a file. Here’s a simple step-by-step example:\n\n1. Import the json module.\n2. Open the JSON file using the with context manager (this automatically closes the file after you're done).\n3. Use json.load() to parse the file.\n\nBelow is the complete example code:\n\n--------------------------------------------------\nimport json\n\n# Open the JSON file and load its content\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\n# Now 'data' contains the JSON file content as a Python dictionary (or list, depending on JSON structure)\nprint(data)\n--------------------------------------------------\n\nExplanation:\n• The with statement is used to open the file, which ensures that the file is properly closed even if an error occurs.\n• The 'r' mode is specified to open the file in read mode.\n• json.load(file) parses the JSON content and returns a Python object.\n• The resulting data is stored in the variable data, which you can then work with as needed.\n\nIf you have any questions or need further assistance, feel free to ask!",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319809,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMT5z8IEzwWx4HmgAYT2WScVD5o",
  "model": "o3-mini-2025-01-31",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_7a15bf1b39",
  "usage": {
    "completion_tokens": 400,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 128,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 30,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 430
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/o3-mini',
  {
    max_completion_tokens: 8192,
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/o3-mini",
  "max_completion_tokens": 8192,
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
Great! When planning a road trip along the scenic coast (California's Highway 1), here are some must-see stops between San Francisco and Los Angeles:

1. Santa Cruz:
   • Enjoy the laid-back vibe at the Santa Cruz Beach Boardwalk.
   • Take a stroll by the beach or check out the local shops and cafés downtown.

2. Monterey & Cannery Row:
   • Visit the famous Monterey Bay Aquarium, a highlight of the area.
   • Walk along Cannery Row and relish the coastal views or even take a local boat tour.
   • If time allows, consider the 17-Mile Drive in nearby Pebble Beach for a fantastic coastline drive.

3. Carmel-by-the-Sea:
   • This charming town offers art galleries, boutique shopping, and quaint cafés in a picturesque setting.
   • Enjoy the beautiful white-sand Carmel Beach and a stroll through the fairy-tale village.

4. Big Sur:
   • Drive through one of the most breathtaking stretches of coastline in the world.
   • Stop at iconic landmarks like Bixby Creek Bridge or take in the views from Nepenthe.
   • Enjoy a short hike or simply take in the ocean views over cliffs—just be sure to check road conditions, as parts of Highway 1 can be winding.

5. San Simeon/Hearst Castle:
   • Explore Hearst Castle, a historic mansion with impressive architecture and art.
   • Enjoy nearby coastal views and wildlife, including elephant seals which often hang out at the beaches.

6. Santa Barbara (Optional Stop):
   • Once you start heading toward Los Angeles, a stop in Santa Barbara can be a relaxing break.
   • Stroll through the downtown area, visit the historic Mission Santa Barbara or relax at the beach.

Depending on your schedule and interests, you can choose to spend more time in one area than another. For instance, if you're a nature lover, spending a day in Big Sur might be perfect for you. Alternatively, beer or foodie enthusiasts might enjoy more time exploring the eateries in Monterey or Santa Barbara.

Some additional tips:
• Always check for road conditions and parking information especially in Big Sur, as it can get busy on weekends.
• Consider making reservations at popular restaurants or attractions in advance.
• Pack some snacks and water, as some stretches between stops can be remote.

Would you like more detailed itineraries for any of these stops, or do you have specific interests (like hiking, dining, or cultural attractions) that we should highlight?
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Great! When planning a road trip along the scenic coast (California's Highway 1), here are some must-see stops between San Francisco and Los Angeles:\n\n1. Santa Cruz:  \n   • Enjoy the laid-back vibe at the Santa Cruz Beach Boardwalk.  \n   • Take a stroll by the beach or check out the local shops and cafés downtown.\n\n2. Monterey & Cannery Row:  \n   • Visit the famous Monterey Bay Aquarium, a highlight of the area.  \n   • Walk along Cannery Row and relish the coastal views or even take a local boat tour.\n   • If time allows, consider the 17-Mile Drive in nearby Pebble Beach for a fantastic coastline drive.\n\n3. Carmel-by-the-Sea:  \n   • This charming town offers art galleries, boutique shopping, and quaint cafés in a picturesque setting.  \n   • Enjoy the beautiful white-sand Carmel Beach and a stroll through the fairy-tale village.\n\n4. Big Sur:  \n   • Drive through one of the most breathtaking stretches of coastline in the world.  \n   • Stop at iconic landmarks like Bixby Creek Bridge or take in the views from Nepenthe.  \n   • Enjoy a short hike or simply take in the ocean views over cliffs—just be sure to check road conditions, as parts of Highway 1 can be winding.\n\n5. San Simeon/Hearst Castle:  \n   • Explore Hearst Castle, a historic mansion with impressive architecture and art.  \n   • Enjoy nearby coastal views and wildlife, including elephant seals which often hang out at the beaches.\n\n6. Santa Barbara (Optional Stop):  \n   • Once you start heading toward Los Angeles, a stop in Santa Barbara can be a relaxing break.  \n   • Stroll through the downtown area, visit the historic Mission Santa Barbara or relax at the beach.\n\nDepending on your schedule and interests, you can choose to spend more time in one area than another. For instance, if you're a nature lover, spending a day in Big Sur might be perfect for you. Alternatively, beer or foodie enthusiasts might enjoy more time exploring the eateries in Monterey or Santa Barbara.\n\nSome additional tips:  \n• Always check for road conditions and parking information especially in Big Sur, as it can get busy on weekends.  \n• Consider making reservations at popular restaurants or attractions in advance.  \n• Pack some snacks and water, as some stretches between stops can be remote.\n\nWould you like more detailed itineraries for any of these stops, or do you have specific interests (like hiking, dining, or cultural attractions) that we should highlight?",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319813,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMXgd7WUjV61fWbXbNNhOFEVnNB",
  "model": "o3-mini-2025-01-31",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_7a15bf1b39",
  "usage": {
    "completion_tokens": 917,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 384,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 74,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 991
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/o3-mini',
  {
    max_completion_tokens: 8192,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/o3-mini",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ]
}'
```

```
Detective Elena Marquez stood motionless in the dim glow of the abandoned warehouse, her eyes fixated on a peculiar object half-buried in layers of dust and cobwebs. Amidst scattered papers and defaced photographs, the unusual clue—a small porcelain figurine with an ethereal, almost luminescent crack running down its side—seemed to beckon her closer. Its delicate features, strangely out of place in this grim setting, whispered secrets of a long-forgotten past and hinted at connections far deeper than any ordinary case.

As she carefully lifted the figurine with gloved hands, Elena noted an inscription faintly etched along its base, its characters reminiscent of an undiscovered language. The artifact pulsed with an energy that both unnerved and fascinated her, a silent promise that solving its mystery might unravel the threads of a labyrinthine conspiracy. In that hushed moment, the detective realized that this was no random piece of debris—it was an intentional breadcrumb leading to a truth hidden beneath layers of time and deceit.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "annotations": [],
        "content": "Detective Elena Marquez stood motionless in the dim glow of the abandoned warehouse, her eyes fixated on a peculiar object half-buried in layers of dust and cobwebs. Amidst scattered papers and defaced photographs, the unusual clue—a small porcelain figurine with an ethereal, almost luminescent crack running down its side—seemed to beckon her closer. Its delicate features, strangely out of place in this grim setting, whispered secrets of a long-forgotten past and hinted at connections far deeper than any ordinary case.\n\nAs she carefully lifted the figurine with gloved hands, Elena noted an inscription faintly etched along its base, its characters reminiscent of an undiscovered language. The artifact pulsed with an energy that both unnerved and fascinated her, a silent promise that solving its mystery might unravel the threads of a labyrinthine conspiracy. In that hushed moment, the detective realized that this was no random piece of debris—it was an intentional breadcrumb leading to a truth hidden beneath layers of time and deceit.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319815,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMZ0kiOSZsAi3ZVIKwPfnLDiAIz",
  "model": "o3-mini-2025-01-31",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_7a15bf1b39",
  "usage": {
    "completion_tokens": 414,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 192,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 19,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 433
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/o3-mini',
  {
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
    stream_options: { include_usage: true },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/o3-mini",
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true,
  "stream_options": {
    "include_usage": true
  }
}'
```

```
Recursion is a technique in programming where a function calls itself to solve a problem. The function breaks the problem into smaller, similar subproblems until it reaches a simple case that can be solved directly—this is known as the base case. Once the base case is reached, the recursion stops, and the solutions to the smaller subproblems are combined to solve the original problem.

A simple example is calculating the factorial of a number. The factorial of a non-negative integer n (written as n!) is defined as:

  n! = n × (n-1) × (n-2) × ... × 1

By definition, 0! is 1. Using recursion, you can express the factorial function as:

  factorial(n) = n × factorial(n-1)

with the base case:

  factorial(0) = 1

Here’s a step-by-step explanation:

1. If n is 0, return 1 (base case).
2. Otherwise, return n multiplied by the factorial of (n-1).

For example, to compute 3!:
  • factorial(3) = 3 × factorial(2)
  • factorial(2) = 2 × factorial(1)
  • factorial(1) = 1 × factorial(0)
  • factorial(0) = 1 (base case)

Working back up:
  • factorial(1) = 1 × 1 = 1
  • factorial(2) = 2 × 1 = 2
  • factorial(3) = 3 × 2 = 6

Thus, 3! equals 6.

This example illustrates how recursion solves a problem by simplifying it step by step until it reaches a solution.
```

```json
[
  {
    "choices": [
      {
        "delta": {
          "content": "",
          "refusal": null,
          "role": "assistant"
        },
        "finish_reason": null,
        "index": 0
      }
    ],
    "created": 1777319820,
    "id": "chatcmpl-DZMMetd1XpZ1frdVc0o4T4L12OVXk",
    "model": "o3-mini-2025-01-31",
    "obfuscation": "zz38RTm3YrrY6",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_b5e0a50a2e",
    "usage": null
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Rec"
        },
        "finish_reason": null,
        "index": 0
      }
    ],
    "created": 1777319820,
    "id": "chatcmpl-DZMMetd1XpZ1frdVc0o4T4L12OVXk",
    "model": "o3-mini-2025-01-31",
    "obfuscation": "Q2PVeG8xwBfH",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_b5e0a50a2e",
    "usage": null
  },
  "... 371 more chunks omitted ...",
  {
    "choices": [],
    "created": 1777319820,
    "id": "chatcmpl-DZMMetd1XpZ1frdVc0o4T4L12OVXk",
    "model": "o3-mini-2025-01-31",
    "obfuscation": "2wTYZNsXap",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_b5e0a50a2e",
    "usage": {
      "completion_tokens": 640,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 256,
        "rejected_prediction_tokens": 0
      },
      "prompt_tokens": 16,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 0
      },
      "total_tokens": 656
    }
  }
]
```

</details>

## Parameters

Schema variant

ResponsesChat Completions

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

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

▶messages\[]

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

`number`minimum: -2maximum: 2

presence\_penalty

`number`minimum: -2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[]

`array`

tool\_choice

response\_format

▶modalities\[]

`array`

▶audio{}

`object`

reasoning\_effort

`string`Optional reasoning control; availability and accepted values are model-dependent.

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[]

`array`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/o3-mini/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/o3-mini/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/o3-mini/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/o3-mini/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/o3-mini/#page","headline":"o3-mini","description":"o3-mini is the lightweight, low-cost reasoning variant of o3, well suited to quick analytical tasks at scale.","url":"https://developers.cloudflare.com/ai/models/openai/o3-mini/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
