---
description: GPT-4o Mini is the lightweight, low-cost variant of GPT-4o, well suited to high-volume tasks with multimodal inputs.
title: GPT-4o mini
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-4o mini

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-4o-mini`

- Third-party
- Zero data retention

GPT-4o Mini is the lightweight, low-cost variant of GPT-4o, well suited to high-volume tasks with multimodal inputs.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 128,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$0.075</li><li>Output (per 1M tokens)$0.30</li><li>Cached input (per 1M tokens)$0.0375</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-4o-mini',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4o-mini",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The three laws of thermodynamics are fundamental principles that describe the behavior of energy and matter in physical systems. Here’s a brief overview of each:

1. **Zeroth Law of Thermodynamics**: Though it was formulated after the first three laws, it's often referred to as the "zeroth" law. It states that if two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other. This law forms the basis for the concept of temperature.

2. **First Law of Thermodynamics (Law of Energy Conservation)**: This law states that energy cannot be created or destroyed, only transformed from one form to another. In a closed system, the change in internal energy is equal to the heat added to the system minus the work done by the system. Mathematically, it's often expressed as:
   \[
   \Delta U = Q - W
   \]
   where \( \Delta U \) is the change in internal energy, \( Q \) is the heat added to the system, and \( W \) is the work done by the system.

3. **Second Law of Thermodynamics**: This law introduces the concept of entropy, stating that the total entropy of an isolated system can never decrease over time. It also implies that processes occur in a direction that increases the overall entropy of the universe. This law explains why some energy transformations are not 100% efficient and why heat flows spontaneously from hot to cold bodies.

4. **Third Law of Thermodynamics**: This law states that as the temperature of a system approaches absolute zero, the entropy of a perfect crystal approaches zero. It helps define the absolute temperature scale and indicates that it is impossible to reach absolute zero in a finite number of steps.

These laws are foundational to the study of physics and chemistry, affecting various fields, including engineering, biology, and materials science.
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
        "content": "The three laws of thermodynamics are fundamental principles that describe the behavior of energy and matter in physical systems. Here’s a brief overview of each:\n\n1. **Zeroth Law of Thermodynamics**: Though it was formulated after the first three laws, it's often referred to as the \"zeroth\" law. It states that if two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other. This law forms the basis for the concept of temperature.\n\n2. **First Law of Thermodynamics (Law of Energy Conservation)**: This law states that energy cannot be created or destroyed, only transformed from one form to another. In a closed system, the change in internal energy is equal to the heat added to the system minus the work done by the system. Mathematically, it's often expressed as:\n   \\[\n   \\Delta U = Q - W\n   \\]\n   where \\( \\Delta U \\) is the change in internal energy, \\( Q \\) is the heat added to the system, and \\( W \\) is the work done by the system.\n\n3. **Second Law of Thermodynamics**: This law introduces the concept of entropy, stating that the total entropy of an isolated system can never decrease over time. It also implies that processes occur in a direction that increases the overall entropy of the universe. This law explains why some energy transformations are not 100% efficient and why heat flows spontaneously from hot to cold bodies.\n\n4. **Third Law of Thermodynamics**: This law states that as the temperature of a system approaches absolute zero, the entropy of a perfect crystal approaches zero. It helps define the absolute temperature scale and indicates that it is impossible to reach absolute zero in a finite number of steps.\n\nThese laws are foundational to the study of physics and chemistry, affecting various fields, including engineering, biology, and materials science.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319548,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMIGfjLc8l4VDEpWs4s7mSFBSVSy",
  "model": "gpt-4o-mini-2024-07-18",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_3d695acdac",
  "usage": {
    "completion_tokens": 382,
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
    "total_tokens": 398
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o-mini',
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
  "model": "openai/gpt-4o-mini",
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
To read a JSON file in Python, you can use the built-in `json` module, which provides methods for parsing JSON data. Here’s a step-by-step guide on how to do this:

1. **Import the `json` module**: This module allows you to work with JSON data easily.
2. **Open the JSON file**: Use Python's built-in `open()` function to access the file.
3. **Load the JSON data**: Use the `json.load()` function to parse the JSON data in the file.

Here is a simple example:

### Example: Reading a JSON file

Assuming you have a JSON file named `data.json` with the following content:

```json
{
    "name": "John",
    "age": 30,
    "city": "New York"
}
```

Here is how you can read this JSON file in Python:

```python
import json

# Open the JSON file for reading
with open('data.json', 'r') as file:
    # Load the JSON data from the file
    data = json.load(file)

# Now you can access the data
print(data)  # This will print the contents of the JSON file as a dictionary
print(data['name'])  # Outputs: John
print(data['age'])   # Outputs: 30
print(data['city'])  # Outputs: New York
```

### Explanation:
- The `with open('data.json', 'r') as file:` statement opens the file in read mode and ensures it will be properly closed after its suite finishes, even if an error is raised.
- The `json.load(file)` function reads the JSON data and converts it into a Python dictionary.
- You can then access the data using the dictionary syntax.

### Additional Notes:
- If you have a JSON string instead of a file, you can use `json.loads()` instead.
- Handle exceptions using `try-except` blocks if you want to manage errors, such as when a file does not exist or contains invalid JSON.

This method is simple and efficient for reading JSON data in Python.
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
        "content": "To read a JSON file in Python, you can use the built-in `json` module, which provides methods for parsing JSON data. Here’s a step-by-step guide on how to do this:\n\n1. **Import the `json` module**: This module allows you to work with JSON data easily.\n2. **Open the JSON file**: Use Python's built-in `open()` function to access the file.\n3. **Load the JSON data**: Use the `json.load()` function to parse the JSON data in the file.\n\nHere is a simple example:\n\n### Example: Reading a JSON file\n\nAssuming you have a JSON file named `data.json` with the following content:\n\n```json\n{\n    \"name\": \"John\",\n    \"age\": 30,\n    \"city\": \"New York\"\n}\n```\n\nHere is how you can read this JSON file in Python:\n\n```python\nimport json\n\n# Open the JSON file for reading\nwith open('data.json', 'r') as file:\n    # Load the JSON data from the file\n    data = json.load(file)\n\n# Now you can access the data\nprint(data)  # This will print the contents of the JSON file as a dictionary\nprint(data['name'])  # Outputs: John\nprint(data['age'])   # Outputs: 30\nprint(data['city'])  # Outputs: New York\n```\n\n### Explanation:\n- The `with open('data.json', 'r') as file:` statement opens the file in read mode and ensures it will be properly closed after its suite finishes, even if an error is raised.\n- The `json.load(file)` function reads the JSON data and converts it into a Python dictionary.\n- You can then access the data using the dictionary syntax.\n\n### Additional Notes:\n- If you have a JSON string instead of a file, you can use `json.loads()` instead.\n- Handle exceptions using `try-except` blocks if you want to manage errors, such as when a file does not exist or contains invalid JSON.\n\nThis method is simple and efficient for reading JSON data in Python.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319552,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMIKpzH6Ql5Lv3sgRPyY48bdKmlB",
  "model": "gpt-4o-mini-2024-07-18",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_e2f9fd5023",
  "usage": {
    "completion_tokens": 432,
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
    "total_tokens": 463
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o-mini',
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
  "model": "openai/gpt-4o-mini",
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
Here are some great stops you can consider on your road trip from San Francisco to Los Angeles, highlighting both scenic spots and interesting attractions:

### 1. **Half Moon Bay**
   - **Distance from San Francisco:** ~30 minutes
   - **Highlights:** Beautiful beaches, coastal cliffs, and the charming downtown area. Consider stopping at a beach or enjoying a meal at one of the waterfront restaurants.

### 2. **Santa Cruz**
   - **Distance from San Francisco:** ~1.5 hours
   - **Highlights:** Visit the Santa Cruz Beach Boardwalk, explore the redwood forests in Henry Cowell Redwoods State Park, or take a stroll along the coastline.

### 3. **Monterey**
   - **Distance from Santa Cruz:** ~45 minutes
   - **Highlights:** Monterey Bay Aquarium, Cannery Row, and beautiful coastal views. A must-see is the 17-Mile Drive through Pebble Beach.

### 4. **Carmel-by-the-Sea**
   - **Distance from Monterey:** ~15 minutes
   - **Highlights:** A picturesque town known for its art galleries, boutique shops, and stunning beach. Don't miss the chance to explore Carmel Mission Basilica.

### 5. **Big Sur**
   - **Distance from Carmel:** ~30 minutes
   - **Highlights:** Drive along the rugged coastline on Highway 1, stopping at famous viewpoints like Bixby Creek Bridge, McWay Falls, and Pfeiffer Beach. This stretch is a highlight of the trip.

### 6. **San Luis Obispo**
   - **Distance from Big Sur:** ~2 hours
   - **Highlights:** A quaint town with a vibrant downtown area, Mission San Luis Obispo de Tolosa, and the famous Bubblegum Alley. If you have time, check out nearby Hearst Castle in San Simeon.

### 7. **Pismo Beach**
   - **Distance from San Luis Obispo:** ~15 minutes
   - **Highlights:** A classic Californian beach town. Enjoy the pier, beautiful beaches, and local restaurants. If you're a fan of clam chowder, it's a great place to stop for some.

### 8. **Santa Barbara**
   - **Distance from Pismo Beach:** ~1 hour
   - **Highlights:** Gorgeous Mediterranean-style architecture, beautiful beaches, and wine country nearby. Visit State Street, the Santa Barbara Mission, and the Santa Barbara Botanic Garden.

### 9. **Malibu**
   - **Distance from Santa Barbara:** ~1.5 hours
   - **Highlights:** Scenic coastal views, beautiful beaches like Zuma Beach, and the Malibu Pier. If time allows, stop at the Getty Villa for art and architecture.

### 10. **Los Angeles**
   - **Distance from Malibu:** ~30 minutes
   - **Final Destination:** Depending on your interests, explore Hollywood, Santa Monica, or any of the numerous attractions the city has to offer.

### Tips:
- **Timing:** Start your trip early to maximize your time at each stop.
- **Scenic Routes:** The Pacific Coast Highway (Highway 1) is the most scenic route, but parts may be subject to closure due to weather or landslides, so check ahead.
- **Food:** There are many great eateries along the coast; don’t hesitate to stop for local seafood and cafés.
- **Overnight Stay:** If you want to break it into two days, consider staying in Monterey or Santa Barbara for a more relaxed pace.

Hope this helps you plan an amazing road trip! Let me know if you need more information or specific recommendations.
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
        "content": "Here are some great stops you can consider on your road trip from San Francisco to Los Angeles, highlighting both scenic spots and interesting attractions:\n\n### 1. **Half Moon Bay**\n   - **Distance from San Francisco:** ~30 minutes\n   - **Highlights:** Beautiful beaches, coastal cliffs, and the charming downtown area. Consider stopping at a beach or enjoying a meal at one of the waterfront restaurants.\n\n### 2. **Santa Cruz**\n   - **Distance from San Francisco:** ~1.5 hours\n   - **Highlights:** Visit the Santa Cruz Beach Boardwalk, explore the redwood forests in Henry Cowell Redwoods State Park, or take a stroll along the coastline.\n\n### 3. **Monterey**\n   - **Distance from Santa Cruz:** ~45 minutes\n   - **Highlights:** Monterey Bay Aquarium, Cannery Row, and beautiful coastal views. A must-see is the 17-Mile Drive through Pebble Beach.\n\n### 4. **Carmel-by-the-Sea**\n   - **Distance from Monterey:** ~15 minutes\n   - **Highlights:** A picturesque town known for its art galleries, boutique shops, and stunning beach. Don't miss the chance to explore Carmel Mission Basilica.\n\n### 5. **Big Sur**\n   - **Distance from Carmel:** ~30 minutes\n   - **Highlights:** Drive along the rugged coastline on Highway 1, stopping at famous viewpoints like Bixby Creek Bridge, McWay Falls, and Pfeiffer Beach. This stretch is a highlight of the trip.\n\n### 6. **San Luis Obispo**\n   - **Distance from Big Sur:** ~2 hours\n   - **Highlights:** A quaint town with a vibrant downtown area, Mission San Luis Obispo de Tolosa, and the famous Bubblegum Alley. If you have time, check out nearby Hearst Castle in San Simeon.\n\n### 7. **Pismo Beach**\n   - **Distance from San Luis Obispo:** ~15 minutes\n   - **Highlights:** A classic Californian beach town. Enjoy the pier, beautiful beaches, and local restaurants. If you're a fan of clam chowder, it's a great place to stop for some.\n\n### 8. **Santa Barbara**\n   - **Distance from Pismo Beach:** ~1 hour\n   - **Highlights:** Gorgeous Mediterranean-style architecture, beautiful beaches, and wine country nearby. Visit State Street, the Santa Barbara Mission, and the Santa Barbara Botanic Garden.\n\n### 9. **Malibu**\n   - **Distance from Santa Barbara:** ~1.5 hours\n   - **Highlights:** Scenic coastal views, beautiful beaches like Zuma Beach, and the Malibu Pier. If time allows, stop at the Getty Villa for art and architecture.\n\n### 10. **Los Angeles**\n   - **Distance from Malibu:** ~30 minutes\n   - **Final Destination:** Depending on your interests, explore Hollywood, Santa Monica, or any of the numerous attractions the city has to offer.\n\n### Tips:\n- **Timing:** Start your trip early to maximize your time at each stop.\n- **Scenic Routes:** The Pacific Coast Highway (Highway 1) is the most scenic route, but parts may be subject to closure due to weather or landslides, so check ahead.\n- **Food:** There are many great eateries along the coast; don’t hesitate to stop for local seafood and cafés.\n- **Overnight Stay:** If you want to break it into two days, consider staying in Monterey or Santa Barbara for a more relaxed pace.\n\nHope this helps you plan an amazing road trip! Let me know if you need more information or specific recommendations.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319556,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMIOnfc6dUu1qvfnFZgI5SPXv4s1",
  "model": "gpt-4o-mini-2024-07-18",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_a7190374f3",
  "usage": {
    "completion_tokens": 737,
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
    "total_tokens": 812
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o-mini',
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
  "model": "openai/gpt-4o-mini",
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
Detective Iris Kline stood in the dimly lit study of the late Vincent Hawthorne, an eccentric author known for his best-selling thrillers and reclusive nature. The smell of old books and the faint hint of cigar smoke lingered in the air, wrapping around her like a shroud as she scanned the cluttered room for anything that might shed light on the enigmatic man's death. The police had ruled it a heart attack, but Iris wasn’t convinced. A writer whose life revolved around crafting intricate plots wouldn't simply drop dead without a shred of foreshadowing.

She crouched beside a mahogany desk strewn with yellowed manuscripts and coffee-stained pages, her fingers brushing against the surface. That’s when she spotted it—a glint of silver poking out from beneath a loose floorboard. Curious, she pried it open, her nails scraping against the wood until she could retrieve the object: a small, intricately designed key.

Flipping it over in her palm, she noticed a curious engraving on its barrel—a compass rose, with eight tiny arrows radiating from the center. It was both beautiful and unsettling, like something straight out of one of Hawthorne's novels. But it was the cryptic inscription beneath it that gave her pause, a single word: “NAVIGATOR.”

Iris felt the weight of the key shift in her hand, a sense of urgency rising within her. Whatever this key unlocked, it was clear it held secrets far beyond the reclusive author’s final chapter. She slid the key into her pocket, the quiet thrill of an unraveling mystery beginning to take root in her mind. What could Vincent Hawthorne have been hiding? And where would this unusual clue lead her next?
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
        "content": "Detective Iris Kline stood in the dimly lit study of the late Vincent Hawthorne, an eccentric author known for his best-selling thrillers and reclusive nature. The smell of old books and the faint hint of cigar smoke lingered in the air, wrapping around her like a shroud as she scanned the cluttered room for anything that might shed light on the enigmatic man's death. The police had ruled it a heart attack, but Iris wasn’t convinced. A writer whose life revolved around crafting intricate plots wouldn't simply drop dead without a shred of foreshadowing.\n\nShe crouched beside a mahogany desk strewn with yellowed manuscripts and coffee-stained pages, her fingers brushing against the surface. That’s when she spotted it—a glint of silver poking out from beneath a loose floorboard. Curious, she pried it open, her nails scraping against the wood until she could retrieve the object: a small, intricately designed key. \n\nFlipping it over in her palm, she noticed a curious engraving on its barrel—a compass rose, with eight tiny arrows radiating from the center. It was both beautiful and unsettling, like something straight out of one of Hawthorne's novels. But it was the cryptic inscription beneath it that gave her pause, a single word: “NAVIGATOR.” \n\nIris felt the weight of the key shift in her hand, a sense of urgency rising within her. Whatever this key unlocked, it was clear it held secrets far beyond the reclusive author’s final chapter. She slid the key into her pocket, the quiet thrill of an unraveling mystery beginning to take root in her mind. What could Vincent Hawthorne have been hiding? And where would this unusual clue lead her next?",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777319560,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMISg6vI8hQtXDR8mDZ4ED3dwWUk",
  "model": "gpt-4o-mini-2024-07-18",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_370ba29939",
  "usage": {
    "completion_tokens": 352,
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
    "total_tokens": 372
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4o-mini',
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
  "model": "openai/gpt-4o-mini",
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
Recursion is a programming concept where a function calls itself in order to solve a problem. It typically involves a base case that stops the recursion and a recursive case that breaks the problem down into smaller subproblems.

### Example: Factorial

A classic example of recursion is calculating the factorial of a number, denoted as `n!`. The factorial of a non-negative integer `n` is the product of all positive integers less than or equal to `n`. The recursive definition is:

- **Base Case**: `0! = 1` (the factorial of 0 is 1)
- **Recursive Case**: `n! = n * (n - 1)!` for `n > 0`

Here’s a simple implementation of this concept in Python:

```python
def factorial(n):
    # Base case
    if n == 0:
        return 1
    # Recursive case
    else:
        return n * factorial(n - 1)

# Example usage
result = factorial(5)  # This will compute 5 * 4 * 3 * 2 * 1
print(result)  # Output: 120
```

### Explanation:

1. **When `factorial(5)` is called**:
   - It checks if `n` is 0 (which it isn't).
   - It computes `5 * factorial(4)`.

2. **Next, `factorial(4)` is called**:
   - Again, it checks if `n` is 0 (which it isn't).
   - It computes `4 * factorial(3)`.

3. This process continues until `factorial(0)` is reached, which hits the base case and returns 1.

4. The function then unwinds:
   - `factorial(1)` returns `1 * 1 = 1`
   - `factorial(2)` returns `2 * 1 = 2`
   - `factorial(3)` returns `3 * 2 = 6`
   - `factorial(4)` returns `4 * 6 = 24`
   - `factorial(5)` returns `5 * 24 = 120`

Thus, the factorial of 5 is computed to be 120, demonstrating how recursion can break down a complex problem into simpler subproblems.
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
    "created": 1777319565,
    "id": "chatcmpl-DZMIXJtgYyfytjeCEUmk1Yhm8o5XO",
    "model": "gpt-4o-mini-2024-07-18",
    "obfuscation": "a9jF6VOdC",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_6042092f77",
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
    "created": 1777319565,
    "id": "chatcmpl-DZMIXJtgYyfytjeCEUmk1Yhm8o5XO",
    "model": "gpt-4o-mini-2024-07-18",
    "obfuscation": "K0QlI2xz",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_6042092f77",
    "usage": null
  },
  "... 485 more chunks omitted ...",
  {
    "choices": [],
    "created": 1777319565,
    "id": "chatcmpl-DZMIXJtgYyfytjeCEUmk1Yhm8o5XO",
    "model": "gpt-4o-mini-2024-07-18",
    "obfuscation": "8alXGeDK",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_6042092f77",
    "usage": {
      "completion_tokens": 485,
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
      "total_tokens": 502
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/#page","headline":"GPT-4o mini","description":"GPT-4o Mini is the lightweight, low-cost variant of GPT-4o, well suited to high-volume tasks with multimodal inputs.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-4o-mini/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
