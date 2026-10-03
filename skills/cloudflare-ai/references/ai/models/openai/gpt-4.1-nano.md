---
description: GPT-4.1 Nano is OpenAI’s smallest and cheapest GPT-4.1 variant, optimized for high-throughput, low-latency tasks.
title: GPT-4.1 nano
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT-4.1 nano

Text Generation • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-4.1-nano`

- Third-party
- Zero data retention

GPT-4.1 Nano is OpenAI’s smallest and cheapest GPT-4.1 variant, optimized for high-throughput, low-latency tasks.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://openai.com/) |
| Zero data retention | Yes |
| Request formats | Responses, Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$0.10</li><li>Output (per 1M tokens)$0.40</li><li>Cached input (per 1M tokens)$0.025</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-4.1-nano',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4.1-nano",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The three laws of thermodynamics are fundamental principles that describe the behavior of energy and temperature in physical systems:

1. **First Law of Thermodynamics (Law of Energy Conservation):**
   Energy cannot be created or destroyed in an isolated system. The total energy remains constant, implying that the change in the internal energy of a system is equal to the heat added to the system minus the work done by the system.
   Mathematically:
   \[
   \Delta U = Q - W
   \]

2. **Second Law of Thermodynamics:**
   The entropy of an isolated system always tends to increase over time, and natural processes tend to move towards a state of maximum entropy. This law introduces the concept of irreversibility and asserts that heat cannot spontaneously flow from a colder to a hotter body without external work.

3. **Third Law of Thermodynamics:**
   As the temperature of a perfect crystal approaches absolute zero (0 Kelvin), the entropy of the system approaches a constant minimum, often taken as zero. This implies that absolute zero temperature is unattainable in a finite number of steps.

These laws form the foundation of thermodynamics and are essential in understanding energy systems, engines, refrigerators, and many other physical phenomena.
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
        "content": "The three laws of thermodynamics are fundamental principles that describe the behavior of energy and temperature in physical systems:\n\n1. **First Law of Thermodynamics (Law of Energy Conservation):**  \n   Energy cannot be created or destroyed in an isolated system. The total energy remains constant, implying that the change in the internal energy of a system is equal to the heat added to the system minus the work done by the system.  \n   Mathematically:  \n   \\[\n   \\Delta U = Q - W\n   \\]\n\n2. **Second Law of Thermodynamics:**  \n   The entropy of an isolated system always tends to increase over time, and natural processes tend to move towards a state of maximum entropy. This law introduces the concept of irreversibility and asserts that heat cannot spontaneously flow from a colder to a hotter body without external work.\n\n3. **Third Law of Thermodynamics:**  \n   As the temperature of a perfect crystal approaches absolute zero (0 Kelvin), the entropy of the system approaches a constant minimum, often taken as zero. This implies that absolute zero temperature is unattainable in a finite number of steps.\n\nThese laws form the foundation of thermodynamics and are essential in understanding energy systems, engines, refrigerators, and many other physical phenomena.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777320190,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMScK7GU5VKq3YMOIJvLRfotOhnW",
  "model": "gpt-4.1-nano-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_8fc5e9a3e3",
  "usage": {
    "completion_tokens": 252,
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
    "total_tokens": 268
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1-nano',
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
  "model": "openai/gpt-4.1-nano",
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
To read a JSON file in Python, you can use the built-in `json` module which provides functions for parsing JSON data. Here's a simple step-by-step example:

1. Import the `json` module.
2. Open the JSON file using `open()`.
3. Use `json.load()` to parse the data from the file into a Python data structure (usually a dictionary or list).

Here's an example:

```python
import json

# Specify the path to your JSON file
file_path = 'data.json'

# Open the file and load the JSON data
with open(file_path, 'r') as file:
    data = json.load(file)

# Now you can work with 'data' as a Python dictionary or list
print(data)
```

### Notes:
- Make sure the JSON file exists at the specified location.
- If the JSON data is in string format rather than a file, you can use `json.loads()` instead.
- Always handle potential exceptions (like `FileNotFoundError` or `json.JSONDecodeError`) when working with files and JSON data.

Would you like an example with error handling or working with JSON data in a string?
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
        "content": "To read a JSON file in Python, you can use the built-in `json` module which provides functions for parsing JSON data. Here's a simple step-by-step example:\n\n1. Import the `json` module.\n2. Open the JSON file using `open()`.\n3. Use `json.load()` to parse the data from the file into a Python data structure (usually a dictionary or list).\n\nHere's an example:\n\n```python\nimport json\n\n# Specify the path to your JSON file\nfile_path = 'data.json'\n\n# Open the file and load the JSON data\nwith open(file_path, 'r') as file:\n    data = json.load(file)\n\n# Now you can work with 'data' as a Python dictionary or list\nprint(data)\n```\n\n### Notes:\n- Make sure the JSON file exists at the specified location.\n- If the JSON data is in string format rather than a file, you can use `json.loads()` instead.\n- Always handle potential exceptions (like `FileNotFoundError` or `json.JSONDecodeError`) when working with files and JSON data.\n\nWould you like an example with error handling or working with JSON data in a string?",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777320192,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMSexsEYr8aaW33Xyn2IaPnygnY5",
  "model": "gpt-4.1-nano-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_1bedc25778",
  "usage": {
    "completion_tokens": 238,
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
    "total_tokens": 269
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1-nano',
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
  "model": "openai/gpt-4.1-nano",
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
Great! Here are some interesting stops along the San Francisco to Los Angeles route, mainly along the iconic Highway 1 and scenic coastal areas:

1. **Santa Cruz**
   - Enjoy the beaches, surf culture, and the famous Santa Cruz Beach Boardwalk amusement park.

2. **Monterey & Carmel-by-the-Sea**
   - Monterey: Visit the Monterey Bay Aquarium and Cannery Row.
   - Carmel: Stroll through charming streets, galleries, and enjoy the stunning coastal views.

3. **Big Sur**
   - One of the most breathtaking parts of California's coast.
   - Stop at Pfeiffer Beach, Bixby Creek Bridge, McWay Falls, and Julia Pfeiffer Burns State Park.

4. **San Simeon**
   - Tour Hearst Castle, a magnificent historic estate with stunning architecture and gardens.

5. **Cambria or Morro Bay**
   - Enjoy small-town charm, local shops, and coastal scenery.

6. **Elephant Seal Rookery at Piedras Blancas**
   - See seals along the coast (near San Simeon).

7. **Santa Barbara**
   - Often called the "American Riviera," it's known for beautiful beaches, Spanish-style architecture, and lively downtown.

8. **Malibu**
   - Famous for its beaches and celebrity homes. Consider a quick stop at Zuma Beach or Malibu Pier.

If you're looking for a more inland route, you can also take Interstate 5 and explore some of California’s inland attractions, but the coastal drive offers some of the most iconic scenic views.

Would you like a suggested itinerary or specific activity recommendations at any of these stops?
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
        "content": "Great! Here are some interesting stops along the San Francisco to Los Angeles route, mainly along the iconic Highway 1 and scenic coastal areas:\n\n1. **Santa Cruz**  \n   - Enjoy the beaches, surf culture, and the famous Santa Cruz Beach Boardwalk amusement park.\n\n2. **Monterey & Carmel-by-the-Sea**  \n   - Monterey: Visit the Monterey Bay Aquarium and Cannery Row.  \n   - Carmel: Stroll through charming streets, galleries, and enjoy the stunning coastal views.\n\n3. **Big Sur**  \n   - One of the most breathtaking parts of California's coast.  \n   - Stop at Pfeiffer Beach, Bixby Creek Bridge, McWay Falls, and Julia Pfeiffer Burns State Park.\n\n4. **San Simeon**  \n   - Tour Hearst Castle, a magnificent historic estate with stunning architecture and gardens.\n\n5. **Cambria or Morro Bay**  \n   - Enjoy small-town charm, local shops, and coastal scenery.\n\n6. **Elephant Seal Rookery at Piedras Blancas**  \n   - See seals along the coast (near San Simeon).\n\n7. **Santa Barbara**  \n   - Often called the \"American Riviera,\" it's known for beautiful beaches, Spanish-style architecture, and lively downtown.\n\n8. **Malibu**  \n   - Famous for its beaches and celebrity homes. Consider a quick stop at Zuma Beach or Malibu Pier.\n\nIf you're looking for a more inland route, you can also take Interstate 5 and explore some of California’s inland attractions, but the coastal drive offers some of the most iconic scenic views.\n\nWould you like a suggested itinerary or specific activity recommendations at any of these stops?",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777320194,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMSggejH8U1yMFzW7Ibn1J2xL8xx",
  "model": "gpt-4.1-nano-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_8fc5e9a3e3",
  "usage": {
    "completion_tokens": 341,
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
    "total_tokens": 416
  }
}
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1-nano',
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
  "model": "openai/gpt-4.1-nano",
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
Detective Mara Collins cautiously stepped into the dimly lit workshop, the scent of oil and old wood lingering in the air. Pieces of broken clock gears and scattered tools dotted the cluttered space, but it was the tiny, shimmering feather tucked behind a loose brick that caught her eye. It was unlike any bird feather she’d seen—irregularly shaped, iridescent, and strangely warm to the touch. As she examined it, a shiver ran down her spine, promising that this was no ordinary clue, but a signature left behind by someone desperately trying to be remembered.
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
        "content": "Detective Mara Collins cautiously stepped into the dimly lit workshop, the scent of oil and old wood lingering in the air. Pieces of broken clock gears and scattered tools dotted the cluttered space, but it was the tiny, shimmering feather tucked behind a loose brick that caught her eye. It was unlike any bird feather she’d seen—irregularly shaped, iridescent, and strangely warm to the touch. As she examined it, a shiver ran down her spine, promising that this was no ordinary clue, but a signature left behind by someone desperately trying to be remembered.",
        "refusal": null,
        "role": "assistant"
      }
    }
  ],
  "created": 1777320194,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-DZMSg3VYyqTPmNOmWnu1UqurYsxlI",
  "model": "gpt-4.1-nano-2025-04-14",
  "object": "chat.completion",
  "service_tier": "default",
  "system_fingerprint": "fp_04a6e55762",
  "usage": {
    "completion_tokens": 117,
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
    "total_tokens": 137
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-4.1-nano',
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
  "model": "openai/gpt-4.1-nano",
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
Recursion is a programming technique where a function calls itself to solve a problem. It’s especially useful when a problem can be broken down into smaller, similar subproblems. Each recursive call works on a smaller piece, and the process continues until a basic case is reached, which stops the recursion.

**Simple Example:** Calculating the factorial of a number

The factorial of a number \( n \) (written as \( n! \)) is the product of all positive integers up to \( n \).

For example:
\[ 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120 \]

**Recursive approach:**

- The factorial of \( n \) is \( n \) multiplied by the factorial of \( n-1 \).
- Base case: factorial of 1 (or 0) is 1.

**Python code example:**

```python
def factorial(n):
    if n == 0 or n == 1:
        return 1  # Base case
    else:
        return n * factorial(n - 1)  # Recursive call

print(factorial(5))  # Output: 120
```

In this example:
- When `factorial(5)` is called, it computes \( 5 \times factorial(4) \).
- `factorial(4)` computes \( 4 \times factorial(3) \), and so on.
- When it reaches `factorial(1)`, it hits the base case and returns 1.
- The recursive calls then resolve, multiplying the numbers back up to give the final result.
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
    "created": 1777320196,
    "id": "chatcmpl-DZMSi0LW1G5hMlCi690nyLIRbQopZ",
    "model": "gpt-4.1-nano-2025-04-14",
    "obfuscation": "Iw5l2php",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_04a6e55762",
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
    "created": 1777320196,
    "id": "chatcmpl-DZMSi0LW1G5hMlCi690nyLIRbQopZ",
    "model": "gpt-4.1-nano-2025-04-14",
    "obfuscation": "dCJPqHY",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_04a6e55762",
    "usage": null
  },
  "... 337 more chunks omitted ...",
  {
    "choices": [],
    "created": 1777320196,
    "id": "chatcmpl-DZMSi0LW1G5hMlCi690nyLIRbQopZ",
    "model": "gpt-4.1-nano-2025-04-14",
    "obfuscation": "tNgMbOK",
    "object": "chat.completion.chunk",
    "service_tier": "default",
    "system_fingerprint": "fp_04a6e55762",
    "usage": {
      "completion_tokens": 337,
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
      "total_tokens": 354
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/#page","headline":"GPT-4.1 nano","description":"GPT-4.1 Nano is OpenAI’s smallest and cheapest GPT-4.1 variant, optimized for high-throughput, low-latency tasks.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-4.1-nano/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
