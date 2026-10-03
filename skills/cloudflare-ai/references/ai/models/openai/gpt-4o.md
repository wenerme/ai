---
description: GPT-4o is OpenAI’s multimodal flagship, accepting text and images and responding quickly across a wide range of tasks.
title: GPT-4o
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-4o

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-4o/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-4o`

- Third-party
- Zero data retention

GPT-4o is OpenAI’s multimodal flagship, accepting text and images and responding quickly across a wide range of tasks.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 128,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$1.25</li><li>Output (per 1M tokens)$5.00</li><li>Cached input (per 1M tokens)$0.625</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-4o',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The three laws of thermodynamics are fundamental principles that describe the behavior of energy and matter in a system. They are:

1. **The First Law of Thermodynamics (Law of Energy Conservation):**
   This law states that energy cannot be created or destroyed in an isolated system. The total energy of a system and its surroundings is conserved. It can only change forms (e.g., from kinetic energy to potential energy, or from mechanical energy to thermal energy). Mathematically, it is often expressed as:
   \[
   \Delta U = Q - W
   \]
   where \(\Delta U\) is the change in internal energy of the system, \(Q\) is the heat added to the system, and \(W\) is the work done by the system.

2. **The Second Law of Thermodynamics:**
   This law states that the total entropy of a closed system can never decrease over time. It also posits that energy, while conserved, tends to disperse or spread out, leading to an increase in disorder or entropy. In more practical terms, it implies that heat cannot spontaneously flow from a colder body to a hotter one and that all natural processes are irreversible. It establishes the concept of entropy as a measure of the energy dispersal within a system.

3. **The Third Law of Thermodynamics:**
   According to this law, as the temperature of a system approaches absolute zero, the entropy of the system approaches a minimum value, often considered to be zero for a perfect crystalline structure. This means that it becomes increasingly difficult to remove more energy from a system as it nears absolute zero, and practically, reaching absolute zero is impossible.

These three laws describe the fundamental behavior of energy transformations and form the groundwork for understanding thermodynamic processes.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "The three laws of thermodynamics are fundamental principles that describe the behavior of energy and matter in a system. They are:\n\n1. **The First Law of Thermodynamics (Law of Energy Conservation):**\n   This law states that energy cannot be created or destroyed in an isolated system. The total energy of a system and its surroundings is conserved. It can only change forms (e.g., from kinetic energy to potential energy, or from mechanical energy to thermal energy). Mathematically, it is often expressed as:\n   \\[\n   \\Delta U = Q - W\n   \\]\n   where \\(\\Delta U\\) is the change in internal energy of the system, \\(Q\\) is the heat added to the system, and \\(W\\) is the work done by the system.\n\n2. **The Second Law of Thermodynamics:**\n   This law states that the total entropy of a closed system can never decrease over time. It also posits that energy, while conserved, tends to disperse or spread out, leading to an increase in disorder or entropy. In more practical terms, it implies that heat cannot spontaneously flow from a colder body to a hotter one and that all natural processes are irreversible. It establishes the concept of entropy as a measure of the energy dispersal within a system.\n\n3. **The Third Law of Thermodynamics:**\n   According to this law, as the temperature of a system approaches absolute zero, the entropy of the system approaches a minimum value, often considered to be zero for a perfect crystalline structure. This means that it becomes increasingly difficult to remove more energy from a system as it nears absolute zero, and practically, reaching absolute zero is impossible.\n\nThese three laws describe the fundamental behavior of energy transformations and form the groundwork for understanding thermodynamic processes.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319820,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMegPcIzmJH5Nn9qiWIzdRJqlSB",
  "model": "gpt-4o-2024-08-06",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_b0de34c6fc",
  "usage": {
    "completion_tokens": 360,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 16,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 376
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o',
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
  "model": "openai/gpt-4o",
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

````
To read a JSON file in Python, you typically use the built-in `json` module, which provides utilities for parsing JSON formatted data. Here’s a step-by-step guide on how to do it:

1. **Import the `json` module**: To work with JSON data, you need to import this module.

2. **Open the JSON file**: Use the built-in `open()` function to open the file in read mode.

3. **Parse the JSON data**: Use `json.load()` to parse the JSON data from the file into a Python data structure (usually a dictionary or a list).

Here is a simple example demonstrating these steps:

```python
import json

# Specify the path to your JSON file
file_path = 'data.json'

# Open the file and load the JSON data
with open(file_path, 'r') as file:
    data = json.load(file)

# Now `data` is a Python dictionary (or list, depending on the structure of your JSON file)
print(data)
```

### Key Points:

- **Error Handling**: You might want to add exception handling to handle potential errors, such as the file not being found or the JSON data being malformed. You can do this using a `try-except` block.

  ```python
  import json

  file_path = 'data.json'

  try:
      with open(file_path, 'r') as file:
          data = json.load(file)
  except FileNotFoundError:
      print(f"Error: The file {file_path} does not exist.")
  except json.JSONDecodeError:
      print("Error: The file contains invalid JSON.")
  else:
      print(data)
  ```

- **File Modes**: Ensure the file is opened in read mode (`'r'`). If the JSON data is coming from a different source (like an API), you would use `json.loads()` to parse a JSON string instead.

Using this method, you can easily read and work with JSON data in your Python projects.
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "To read a JSON file in Python, you typically use the built-in `json` module, which provides utilities for parsing JSON formatted data. Here’s a step-by-step guide on how to do it:\n\n1. **Import the `json` module**: To work with JSON data, you need to import this module.\n\n2. **Open the JSON file**: Use the built-in `open()` function to open the file in read mode.\n\n3. **Parse the JSON data**: Use `json.load()` to parse the JSON data from the file into a Python data structure (usually a dictionary or a list).\n\nHere is a simple example demonstrating these steps:\n\n```python\nimport json\n\n# Specify the path to your JSON file\nfile_path = 'data.json'\n\n# Open the file and load the JSON data\nwith open(file_path, 'r') as file:\n    data = json.load(file)\n\n# Now `data` is a Python dictionary (or list, depending on the structure of your JSON file)\nprint(data)\n```\n\n### Key Points:\n\n- **Error Handling**: You might want to add exception handling to handle potential errors, such as the file not being found or the JSON data being malformed. You can do this using a `try-except` block.\n  \n  ```python\n  import json\n\n  file_path = 'data.json'\n\n  try:\n      with open(file_path, 'r') as file:\n          data = json.load(file)\n  except FileNotFoundError:\n      print(f\"Error: The file {file_path} does not exist.\")\n  except json.JSONDecodeError:\n      print(\"Error: The file contains invalid JSON.\")\n  else:\n      print(data)\n  ```\n\n- **File Modes**: Ensure the file is opened in read mode (`'r'`). If the JSON data is coming from a different source (like an API), you would use `json.loads()` to parse a JSON string instead.\n\nUsing this method, you can easily read and work with JSON data in your Python projects.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319825,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMjoI33nq3RWgWVcBbUEFhj8zgI",
  "model": "gpt-4o-2024-08-06",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_025fc0f80f",
  "usage": {
    "completion_tokens": 416,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 31,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 447
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o',
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
  "model": "openai/gpt-4o",
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
A road trip from San Francisco to Los Angeles offers many scenic and interesting stops. Here are some popular ones:

1. **Half Moon Bay**: Just south of San Francisco, this coastal town is great for a quick visit to the beach and offers stunning ocean views.

2. **Santa Cruz**: Known for its boardwalk and beaches, Santa Cruz also has charming downtown shops and eateries.

3. **Monterey**: Visit the famous Monterey Bay Aquarium or take a scenic drive along the 17-Mile Drive through Pebble Beach.

4. **Carmel-by-the-Sea**: This picturesque town is perfect for a stroll through art galleries, shops, and beautiful beaches.

5. **Big Sur**: Enjoy dramatic coastal views on Highway 1. Stops include Bixby Creek Bridge, McWay Falls, and Pfeiffer Beach.

6. **San Luis Obispo**: Known for its charming downtown and the quirky Bubblegum Alley. You can also visit nearby Pismo Beach or Avila Beach.

7. **Solvang**: A small Danish-style town that offers unique architecture, bakeries, and shops.

8. **Santa Barbara**: Known as the "American Riviera," this city offers beautiful beaches, a bustling downtown, and the iconic Santa Barbara Mission.

9. **Malibu**: Stop by for some of the most famous beaches like Zuma Beach or enjoy oceanfront dining.

These stops offer a mix of natural beauty, quaint towns, and interesting attractions. Be sure to check road conditions and make accommodations as needed, especially if traveling along the Pacific Coast Highway (Highway 1). Safe travels!
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "A road trip from San Francisco to Los Angeles offers many scenic and interesting stops. Here are some popular ones:\n\n1. **Half Moon Bay**: Just south of San Francisco, this coastal town is great for a quick visit to the beach and offers stunning ocean views.\n\n2. **Santa Cruz**: Known for its boardwalk and beaches, Santa Cruz also has charming downtown shops and eateries.\n\n3. **Monterey**: Visit the famous Monterey Bay Aquarium or take a scenic drive along the 17-Mile Drive through Pebble Beach.\n\n4. **Carmel-by-the-Sea**: This picturesque town is perfect for a stroll through art galleries, shops, and beautiful beaches.\n\n5. **Big Sur**: Enjoy dramatic coastal views on Highway 1. Stops include Bixby Creek Bridge, McWay Falls, and Pfeiffer Beach.\n\n6. **San Luis Obispo**: Known for its charming downtown and the quirky Bubblegum Alley. You can also visit nearby Pismo Beach or Avila Beach.\n\n7. **Solvang**: A small Danish-style town that offers unique architecture, bakeries, and shops.\n\n8. **Santa Barbara**: Known as the \"American Riviera,\" this city offers beautiful beaches, a bustling downtown, and the iconic Santa Barbara Mission.\n\n9. **Malibu**: Stop by for some of the most famous beaches like Zuma Beach or enjoy oceanfront dining.\n\nThese stops offer a mix of natural beauty, quaint towns, and interesting attractions. Be sure to check road conditions and make accommodations as needed, especially if traveling along the Pacific Coast Highway (Highway 1). Safe travels!",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319826,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMk2DS6zoHQlMok2F1yWsewGVJc",
  "model": "gpt-4o-2024-08-06",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_6dd86a7be3",
  "usage": {
    "completion_tokens": 331,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 75,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 406
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o',
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
  "model": "openai/gpt-4o",
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
Detective Elara Finch pushed open the creaky iron gate of the weathered mansion, her eyes narrowing against the gray drizzle that blanketed the estate. The air was thick with the earthy scent of rain and old secrets. She stepped cautiously, her boots sinking slightly into the sodden earth, as she approached the scene where the latest in a string of bizarre disappearances had occurred.

The house loomed ahead, its once-grand façade now a tapestry of ivy and neglect. As Elara entered through the front door, the dim light from the overcast sky barely penetrated the dust-choked windows. Her gloved hand traced the outlines of dilapidated furniture covered in yellowed sheets, ghostly sentinels bearing witness to the passage of time.

Her gaze swept the parlor before settling on an oddly pristine object that gleamed incongruously amidst the decay—a small, intricately carved music box, perched neatly on the mantelpiece. She approached, her curiosity piqued by its anachronistic presence. Gently lifting the lid, she was met with the delicate chime of a haunting melody.

Inside the box lay a perfectly folded piece of parchment, its edges fraying but the ink remarkably intact. As she unfolded it, Elara's eyes widened at the drawing: a curious map, sketched with meticulous detail, leading to a location unfamiliar to her but marked with an ominous "X." What caught her attention most, however, was the signature beneath—a simple yet unmistakable mark that had haunted her career for years: a raven outlined in black.

This symbol had been left at every one of the enigmatic disappearances plaguing the city, and now, finally, a tangible connection lay before her. As the music continued to play, its eerie notes echoing in the hushed room, Elara realized that this peculiar clue—this thread from a carefully woven tapestry of puzzles—might just unravel the mystery that had eluded her for so long.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "annotations": [],
        "content": "Detective Elara Finch pushed open the creaky iron gate of the weathered mansion, her eyes narrowing against the gray drizzle that blanketed the estate. The air was thick with the earthy scent of rain and old secrets. She stepped cautiously, her boots sinking slightly into the sodden earth, as she approached the scene where the latest in a string of bizarre disappearances had occurred.\n\nThe house loomed ahead, its once-grand façade now a tapestry of ivy and neglect. As Elara entered through the front door, the dim light from the overcast sky barely penetrated the dust-choked windows. Her gloved hand traced the outlines of dilapidated furniture covered in yellowed sheets, ghostly sentinels bearing witness to the passage of time.\n\nHer gaze swept the parlor before settling on an oddly pristine object that gleamed incongruously amidst the decay—a small, intricately carved music box, perched neatly on the mantelpiece. She approached, her curiosity piqued by its anachronistic presence. Gently lifting the lid, she was met with the delicate chime of a haunting melody.\n\nInside the box lay a perfectly folded piece of parchment, its edges fraying but the ink remarkably intact. As she unfolded it, Elara's eyes widened at the drawing: a curious map, sketched with meticulous detail, leading to a location unfamiliar to her but marked with an ominous \"X.\" What caught her attention most, however, was the signature beneath—a simple yet unmistakable mark that had haunted her career for years: a raven outlined in black.\n\nThis symbol had been left at every one of the enigmatic disappearances plaguing the city, and now, finally, a tangible connection lay before her. As the music continued to play, its eerie notes echoing in the hushed room, Elara realized that this peculiar clue—this thread from a carefully woven tapestry of puzzles—might just unravel the mystery that had eluded her for so long.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319830,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMMo1EfktQBREr7zAR2RCWKFjLlD",
  "model": "gpt-4o-2024-08-06",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_8637f949d3",
  "usage": {
    "completion_tokens": 399,
    "completion_tokens_details": {
      "accepted_prediction_tokens": 0,
      "audio_tokens": 0,
      "reasoning_tokens": 0,
      "rejected_prediction_tokens": 0
    },
    "prompt_tokens": 20,
    "prompt_tokens_details": {
      "audio_tokens": 0,
      "cached_tokens": 0
    },
    "total_tokens": 419
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o',
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
  "model": "openai/gpt-4o",
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

````
Recursion is a programming concept where a function calls itself in order to solve a problem. It breaks down a problem into smaller, more manageable sub-problems, each of which resembles the original problem. This approach is especially useful in tasks that can naturally be divided into similar subtasks, like calculating factorials or traversing data structures like trees.

A simple example of recursion is the calculation of the factorial of a number. The factorial of a non-negative integer \( n \), denoted as \( n! \), is the product of all positive integers less than or equal to \( n \). The factorial of 0 is defined as 1.

Here's how you can define this problem recursively:

- Base case: If \( n \) is 0, return 1.
- Recursive case: If \( n \) is greater than 0, return \( n \times \text{factorial}(n-1) \).

Here's a simple implementation in Python:

```python
def factorial(n):
    if n == 0:  # Base case
        return 1
    else:
        return n * factorial(n - 1)  # Recursive case

# Example usage:
print(factorial(5))  # Output: 120
```

In this example:
- The base case stops the recursion when \( n \) is 0.
- The recursive case reduces the problem by calling the `factorial` function with \( n-1 \), gradually approaching the base case.
- Each call of the function adds a new layer to the call stack, and returning the result of each call unwinds the stack, culminating in the final result.
````

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
        "index": 0,
        "logprobs": null
      }
    ],
    "created": 1777319831,
    "id": "chatcmpl-DZMMpD11GwQsD27xo2aEnxkId8PGM",
    "model": "gpt-4o-2024-08-06",
    "obfuscation": "BfwwVsWIvF4uTQ",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_6dd86a7be3",
    "usage": null
  },
  {
    "choices": [
      {
        "delta": {
          "content": "Rec"
        },
        "finish_reason": null,
        "index": 0,
        "logprobs": null
      }
    ],
    "created": 1777319831,
    "id": "chatcmpl-DZMMpD11GwQsD27xo2aEnxkId8PGM",
    "model": "gpt-4o-2024-08-06",
    "obfuscation": "CK2cVlJRUSY0t",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_6dd86a7be3",
    "usage": null
  },
  "... 339 more chunks omitted ...",
  {
    "choices": [],
    "created": 1777319831,
    "id": "chatcmpl-DZMMpD11GwQsD27xo2aEnxkId8PGM",
    "model": "gpt-4o-2024-08-06",
    "obfuscation": "zYJbbJ6sJN0JV",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_6dd86a7be3",
    "usage": {
      "completion_tokens": 339,
      "completion_tokens_details": {
        "accepted_prediction_tokens": 0,
        "audio_tokens": 0,
        "reasoning_tokens": 0,
        "rejected_prediction_tokens": 0
      },
      "prompt_tokens": 17,
      "prompt_tokens_details": {
        "audio_tokens": 0,
        "cached_tokens": 0
      },
      "total_tokens": 356
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4o/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4o/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4o/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4o/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-4o/#page","headline":"GPT-4o","description":"GPT-4o is OpenAI’s multimodal flagship, accepting text and images and responding quickly across a wide range of tasks.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-4o/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
