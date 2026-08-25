---
description: Alibaba's Qwen 3.8 Max is a 2.4-trillion-parameter MoE flagship built for professional-grade coding and long-horizon autonomous work, capable of delivering complete, production-grade projects spanning 10+ days across legal, financial, design, and other specialized domains. Native visual understanding of images and extended video runs through the full plan-execute-verify cycle, served via DashScope's OpenAI-compatible endpoint.
title: Qwen 3.8 Max
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.BK31NAJz.svg)

# Qwen 3.8 Max

Text Generation • Alibaba

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/qwen3.8-max/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/qwen3.8-max`

* Third-party

Alibaba's Qwen 3.8 Max is a 2.4-trillion-parameter MoE flagship built for professional-grade coding and long-horizon autonomous work, capable of delivering complete, production-grade projects spanning 10+ days across legal, financial, design, and other specialized domains. Native visual understanding of images and extended video runs through the full plan-execute-verify cycle, served via DashScope's OpenAI-compatible endpoint.

| Model Info        |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                  |
| More information  | [link ↗](https://www.qwencloud.com/models/qwen3.8-max)                                                                |
| Request formats   | Chat Completions, Responses                                                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/qwen3.8-max) |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/qwen3.8-max',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.8-max",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

The three main laws of thermodynamics are:

1. **First Law — Conservation of Energy**
   Energy cannot be created or destroyed; it can only be transferred or converted from one form to another.
   In equation form:
   \[
   \Delta U = Q - W
   \]
   where \(\Delta U\) is the change in internal energy, \(Q\) is heat added to the system, and \(W\) is work done by the system.

2. **Second Law — Entropy Increases**
   In any natural process, the total entropy of an isolated system tends to increase.
   In simpler terms, energy naturally spreads out, and processes have a preferred direction—heat flows from hot to cold, not the reverse, without external work.

3. **Third Law — Absolute Zero Limit**
   As the temperature of a system approaches absolute zero, its entropy approaches a minimum value.
   It is impossible to reach absolute zero in a finite number of steps.

There is also a **Zeroth Law**, which says that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This law establishes the concept of temperature.

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The three main laws of thermodynamics are:\n\n1. **First Law — Conservation of Energy**  \n   Energy cannot be created or destroyed; it can only be transferred or converted from one form to another.  \n   In equation form:  \n   \\[\n   \\Delta U = Q - W\n   \\]  \n   where \\(\\Delta U\\) is the change in internal energy, \\(Q\\) is heat added to the system, and \\(W\\) is work done by the system.\n\n2. **Second Law — Entropy Increases**  \n   In any natural process, the total entropy of an isolated system tends to increase.  \n   In simpler terms, energy naturally spreads out, and processes have a preferred direction—heat flows from hot to cold, not the reverse, without external work.\n\n3. **Third Law — Absolute Zero Limit**  \n   As the temperature of a system approaches absolute zero, its entropy approaches a minimum value.  \n   It is impossible to reach absolute zero in a finite number of steps.\n\nThere is also a **Zeroth Law**, which says that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This law establishes the concept of temperature.",
        "reasoning_content": "We need answer user: \"What are the three laws of thermodynamics?\" Need likely mention there are four including zeroth? User asks three laws, likely first, second, third. Could also include zeroth? Need answer succinctly but detailed. Need final. Make sure not claim only three if common includes zeroth. Could say traditionally the “three laws” are first, second, third; there's also zeroth. Explain. Need maybe avoid too much. Final with bullet points.",
        "role": "assistant"
      }
    }
  ],
  "created": 1786048647,
  "id": "chatcmpl-2b915318-d6f0-9bab-88a6-504a5113fbc3",
  "model": "qwen3.8-max",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 356,
    "completion_tokens_details": {
      "reasoning_tokens": 99,
      "text_tokens": 356
    },
    "prompt_tokens": 57,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 57
    },
    "total_tokens": 413
  }
}
```

## Examples

**With System Message** — Using a system message to set context

```ts
const response = await env.AI.run(
  'alibaba/qwen3.8-max',
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
  "model": "alibaba/qwen3.8-max",
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

Use Python’s built-in `json` module:

```python
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data)
```

`data` will usually be a Python `dict` or `list`, depending on the JSON file.

If the JSON is a string instead of a file, use:

```python
import json

data = json.loads('{"name": "Alice"}')
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Use Python’s built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\") as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n`data` will usually be a Python `dict` or `list`, depending on the JSON file.\n\nIf the JSON is a string instead of a file, use:\n\n```python\nimport json\n\ndata = json.loads('{\"name\": \"Alice\"}')\n```",
        "reasoning_content": "We need to answer user's simple question: \"How do I read a JSON file in Python?\" Need produce final. Need maybe include code using json.load, with open. Mention json.loads for string. Ensure helpful. No need overdo.",
        "role": "assistant"
      }
    }
  ],
  "created": 1786048656,
  "id": "chatcmpl-7d75d520-ba7c-98ac-bb93-3122e0d2ef4b",
  "model": "qwen3.8-max",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 154,
    "completion_tokens_details": {
      "reasoning_tokens": 49,
      "text_tokens": 154
    },
    "prompt_tokens": 73,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 73
    },
    "total_tokens": 227
  }
}
```

**Vision: Image Understanding** — Describing the contents of an image

```ts
const response = await env.AI.run(
  'alibaba/qwen3.8-max',
  {
    messages: [
      {
        content: [
          {
            image_url: {
              url: 'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg',
            },
            type: 'image_url',
          },
          { text: 'What is depicted in the image?', type: 'text' },
        ],
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
  "model": "alibaba/qwen3.8-max",
  "messages": [
    {
      "content": [
        {
          "image_url": {
            "url": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg"
          },
          "type": "image_url"
        },
        {
          "text": "What is depicted in the image?",
          "type": "text"
        }
      ],
      "role": "user"
    }
  ]
}'
```

The image shows a heartwarming beach scene at what appears to be sunset (golden hour). A young woman with long dark hair is sitting barefoot on the sand, wearing a black-and-white plaid flannel shirt and dark pants. She's smiling as she gives a "high five" to a yellow Labrador Retriever sitting opposite her—the dog has raised its paw to meet her open hand. In her other hand, she seems to be holding a small treat, suggesting a training or play moment.

Other details include:

- **The dog** is wearing a harness decorated with colorful paw prints, with a red leash trailing onto the sand.
- **The setting** is a sandy beach with the ocean and a breaking wave visible in the background.
- **The lighting** is soft and warm, with the sun creating a golden glow and slight lens flare on the right side, giving the scene a peaceful, affectionate mood.

Overall, it depicts the bond between a person and her dog during a playful, tender moment by the sea.

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The image shows a heartwarming beach scene at what appears to be sunset (golden hour). A young woman with long dark hair is sitting barefoot on the sand, wearing a black-and-white plaid flannel shirt and dark pants. She's smiling as she gives a \"high five\" to a yellow Labrador Retriever sitting opposite her—the dog has raised its paw to meet her open hand. In her other hand, she seems to be holding a small treat, suggesting a training or play moment.\n\nOther details include:\n\n- **The dog** is wearing a harness decorated with colorful paw prints, with a red leash trailing onto the sand.\n- **The setting** is a sandy beach with the ocean and a breaking wave visible in the background.\n- **The lighting** is soft and warm, with the sun creating a golden glow and slight lens flare on the right side, giving the scene a peaceful, affectionate mood.\n\nOverall, it depicts the bond between a person and her dog during a playful, tender moment by the sea.",
        "reasoning_content": "The user is asking me to describe what's shown in the image. Let me look at the image carefully.\n\nThe image shows a beach scene, and from the quality of the light it seems to be sunset or sunrise (golden hour). A young woman with long black hair is sitting on the sand, wearing a checkered (plaid) shirt and dark-colored pants/jeans, barefoot. She's smiling and appears to be doing a \"high five\" or \"shake hands\" with a dog—looks like a yellow/golden Labrador Retriever. The dog is sitting on the sand, lifting its front paw and placing it on the woman's hand. The dog is wearing a harness with a colorful pattern (looks like a paw print pattern), and a red leash is attached, dangling onto the sand.\n\nIn the background, you can see the sea with waves breaking, and the sky is bright and hazy, with warm sunlight streaming in from the right side of the image, creating a lens flare effect.\n\nThe scene depicts the bond between the woman and the dog, probably a training moment (the dog is doing a \"high five\" trick), and the woman might be holding a treat in her other hand.\n\nI should describe this clearly and concisely. Let me make it a friendly, descriptive response. No special instructions, just answer the question. Let me describe the main elements:\n\n- A woman sitting on a sandy beach\n- A Labrador Retriever dog\n- The two are doing a high five / shaking hands\n- Sunset/golden hour light\n- Ocean waves in the background\n- The dog is wearing a harness with a leash\n- The woman is smiling, wearing a plaid shirt, barefoot\n- She might be holding a treat\n\nFormat: A short descriptive paragraph is appropriate. No tools needed. It should be concise but complete. A medium-length paragraph should be fine. Let me try writing it.",
        "role": "assistant"
      }
    }
  ],
  "created": 1786048660,
  "id": "chatcmpl-8a8cec83-a8e2-9d27-9f9b-102906147b5c",
  "model": "qwen3.8-max",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 618,
    "completion_tokens_details": {
      "reasoning_tokens": 400,
      "text_tokens": 218
    },
    "prompt_tokens": 2520,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "image_tokens": 2503,
      "text_tokens": 17
    },
    "total_tokens": 3138
  }
}
```

**Streaming Response** — Enable streaming for real-time output

```ts
const response = await env.AI.run(
  'alibaba/qwen3.8-max',
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
  "model": "alibaba/qwen3.8-max",
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

Recursion is a way of solving a problem where a function calls itself to solve smaller versions of the same problem.

A recursive function usually has two parts:

1. **Base case** — when to stop
2. **Recursive case** — calling itself with a smaller input

Example: calculating `3!` factorial.

```python
def factorial(n):
    if n == 1:          # base case
        return 1
    else:
        return n * factorial(n - 1)  # recursive case
```

Calling:

```python
print(factorial(3))
```

This works like:

```python
factorial(3) = 3 * factorial(2)
factorial(2) = 2 * factorial(1)
factorial(1) = 1
```

So:

```python
3 * 2 * 1 = 6
```

Recursion is useful when a problem can be broken into smaller repeated subproblems.

```json
[
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null,
    "choices": [
      {
        "logprobs": null,
        "index": 0,
        "delta": {
          "content": "",
          "role": "assistant",
          "reasoning_content": ""
        },
        "finish_reason": null
      }
    ]
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": "We"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " need to answer"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " user:"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " \"Explain the"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " concept of recursion with"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " a simple example.\""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " Simple. Done."
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " Need final answer"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": ". Could include definition"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": ", base case,"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " recursive case, example"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " factorial"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " or countdown, maybe"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " Python. Keep"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": " clear."
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "Recursion is a",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " way of solving a",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " problem where",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " a function calls itself",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " to solve smaller versions",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " of the same",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " problem.\n\nA",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " recursive function usually has",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " two",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " parts:\n\n1",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": ".",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " **Base case**",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " — when to stop",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "  \n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "2. **Recursive",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " case** — calling",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " itself with a smaller",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " input\n\nExample:",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " calculating `3!",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "` factorial",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": ".\n\n```python",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\ndef factorial(n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "):\n    if",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " n == 1",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": ":          # base",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " case\n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "        return 1",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\n    else:",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\n        return n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " * factorial(n -",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " 1) ",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " # recursive case\n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "```\n\nCalling:",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\n\n```python\n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "print(factorial(",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "3))\n```",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\n\nThis works like",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": ":\n\n```python",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\nfactorial(",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "3) = ",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "3 * factorial",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "(2)\n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "factorial(2",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": ") = 2",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " * factorial(1",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": ")\nfactorial",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "(1) =",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " 1\n```",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\n\nSo:\n\n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "```python\n",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "3 * 2",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " * 1 =",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " 6\n```",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "\n\nRecursion is",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " useful when",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " a problem can be",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " broken into smaller repeated",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": " subproblems.",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "model": "qwen3.8-max",
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": ""
        },
        "index": 0,
        "finish_reason": "stop",
        "logprobs": null
      }
    ],
    "created": 1786048673,
    "object": "chat.completion.chunk",
    "usage": null
  },
  {
    "choices": [],
    "created": 1786048673,
    "id": "chatcmpl-93de192c-09a4-9b99-8c9a-55f6302cc5c5",
    "model": "qwen3.8-max",
    "object": "chat.completion.chunk",
    "usage": {
      "completion_tokens": 263,
      "completion_tokens_details": {
        "reasoning_tokens": 47,
        "text_tokens": 263
      },
      "prompt_tokens": 59,
      "prompt_tokens_details": {
        "cached_tokens": 0,
        "text_tokens": 59
      },
      "total_tokens": 322
    }
  }
]
```

## Parameters

Schema variant

Chat CompletionsResponses

▶messages\[\]

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

`number`minimum: \-2maximum: 2

presence\_penalty

`number`minimum: \-2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[\]

`array`

tool\_choice

``

response\_format

``

▶modalities\[\]

`array`

▶audio{}

`object`

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

`string`

created

`number`

model

`string`

▶choices\[\]

`array`

▶usage{}

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/qwen3.8-max/#page","headline":"Qwen 3.8 Max (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's Qwen 3.8 Max is a 2.4-trillion-parameter MoE flagship built for professional-grade coding and long-horizon autonomous work, capable of delivering complete, production-grade projects spanning 10+ days across legal, financial, design, and other specialized domains. Native visual understanding of images and extended video runs through the full plan-execute-verify cycle, served via DashScope's OpenAI-compatible endpoint.","url":"https://developers.cloudflare.com/ai/models/alibaba/qwen3.8-max/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
