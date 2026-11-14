---
description: Kimi K3.1 Pro is Moonshot's flagship model for long-horizon coding and end-to-end knowledge work, and the first model in the K3.1 series. A post-trained version of Kimi K3 with substantially larger post-training compute, it offers native visual understanding, always-on reasoning, and a 1M-token context window, with gains in coding, 3D creation, and financial research.
title: Kimi K3.1 Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Moonshot AI logo](https://developers.cloudflare.com/_astro/moonshotai.DjWMkXUS.svg)

# Kimi K3.1 Pro

Text Generation • Moonshot AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`moonshotai/kimi-k3.1-pro` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kimi K3.1 Pro is Moonshot's flagship model for long-horizon coding and end-to-end knowledge work, and the first model in the K3.1 series. A post-trained version of Kimi K3 with substantially larger post-training compute, it offers native visual understanding, always-on reasoning, and a 1M-token context window, with gains in coding, 3D creation, and financial research.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens |
| More information | [link ↗](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart) |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$2.00</li><li>Output (per 1M tokens)$10.00</li><li>Cached input (per 1M tokens)$0.20</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3.1-pro',
  { messages: [{ content: 'Explain quantum entanglement in simple terms.', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3.1-pro",
  "messages": [
    {
      "content": "Explain quantum entanglement in simple terms.",
      "role": "user"
    }
  ]
}'
```

```
**Quantum entanglement** is when two or more tiny particles share a quantum state so closely that they must be described as **one combined system**, rather than as completely separate objects.

Imagine an entangled pair of particles sent to two distant laboratories:

- Each particle’s measurement result is unpredictable—like flipping a coin that can land either way.
- Yet, when the particles are measured in matching ways, their results show strong correlations. For example, each result may look random on its own, but the two results always turn out opposite.

This is stranger than simply putting one red sock and one blue sock into separate envelopes. In that case, the colors were fixed all along. Entangled particles produce correlations across different kinds of measurements that **cannot be explained by pre-written instructions carried by each particle**. Experiments known as **Bell tests** have confirmed this quantum behavior.

### Does entanglement allow faster-than-light communication?
**No.** You cannot control which random result you get, so you cannot use it to send a chosen message. Each laboratory sees random results until the two sides compare notes using ordinary communication.

Entanglement is important because it enables technologies such as **quantum computing, quantum cryptography, and certain precision measurements**.
```

```json
{
  "id": "chatcmpl-6aedf643767e8e91b66ae14e",
  "object": "chat.completion",
  "created": 1793979971,
  "model": "moonshotai/kimi-k3.1-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**Quantum entanglement** is when two or more tiny particles share a quantum state so closely that they must be described as **one combined system**, rather than as completely separate objects.\n\nImagine an entangled pair of particles sent to two distant laboratories:\n\n- Each particle’s measurement result is unpredictable—like flipping a coin that can land either way.\n- Yet, when the particles are measured in matching ways, their results show strong correlations. For example, each result may look random on its own, but the two results always turn out opposite.\n\nThis is stranger than simply putting one red sock and one blue sock into separate envelopes. In that case, the colors were fixed all along. Entangled particles produce correlations across different kinds of measurements that **cannot be explained by pre-written instructions carried by each particle**. Experiments known as **Bell tests** have confirmed this quantum behavior.\n\n### Does entanglement allow faster-than-light communication?\n**No.** You cannot control which random result you get, so you cannot use it to send a chosen message. Each laboratory sees random results until the two sides compare notes using ordinary communication.\n\nEntanglement is important because it enables technologies such as **quantum computing, quantum cryptography, and certain precision measurements**.",
        "reasoning_content": "I need craft explanation quantum entanglement simple terms. I'll respond clear concise moderate. Should avoid misleading analogies e.g gloves or instant communication. Should explain linked particles measurements correlations even far, quantum state shared, random individually, correlations stronger than preassigned properties, not info FTL, no mind spooky. Perhaps analogy two magic coins: each random but comparisons correlated; caveat classical gloves insufficient. Should have simple terms. User just asks. I can give core, example, what it doesn't mean, why important. Should decide length 300-450? Simple terms maybe ~250. Should not overdo. I should explain \"when particles interact or created together, can share one quantum state, so can't fully describe each independently\". Measurement on one outcome random, distant other correlated when measured appropriately. Example spin measured same direction opposite if prepared singlet. But if \"always opposite\" depends preparation. Could say \"for certain entangled pair, if measured in same way, results always match (or always opposite, depending preparation)\". Distinction classical envelopes: knowing one tells other isn't surprising; entanglement correlations across measurement choices defy any pre-set answers, Bell tests. Not FTL communication because can't control outcomes. Applications. Ensure no collapse FTL assertion. Perhaps structure.\n\nI'll draft:\n\n\"Quantum entanglement is a special connection between two or more quantum particles in which they must be described as one combined system, not as separate objects with fully independent properties.\n\nImagine... Each measurement is like asking ... Before measurement quantum theory generally doesn't assign definite answer. When measured, each result random, yet results show correlations. For example ... 50/50 each but opposite. This remains when far apart (assuming prepared etc).\n\nWhy strange? Ordinary analogy pair gloves... entanglement stronger: correlations for different kinds of measurements can't be explained by particles simply carrying hidden matching instructions. Experiments (Bell tests) confirm.\n\nDoes it allow instant messaging? No. You cannot choose your particle's result, so no controllable signal. Other side sees random results until compare via ordinary communication. Entanglement doesn't mean particles physically attached or one 'controls' other in everyday sense.\n\nUsed in quantum computing, cryptography, sensing.\"\n\nCould keep analogy simple. Should avoid claim no definite answer before measurement universal interpretation; phrase \"In standard quantum description, the pair has definite joint properties even when individual outcomes are not definite.\" Better.\n\nNo need mention speed. Good. I need output response only."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 94,
    "completion_tokens": 756,
    "total_tokens": 850,
    "completion_tokens_details": {
      "reasoning_tokens": 494
    },
    "prompt_tokens_details": {
      "cache_write_tokens": 0
    }
  }
}
```

## Examples

<details>

<summary>**Reasoning Effort** — Configure reasoning effort (low, high, or max) for a harder problem</summary>



```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3.1-pro',
  {
    messages: [{ content: 'Prove that the square root of 2 is irrational.', role: 'user' }],
    reasoning_effort: 'max',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3.1-pro",
  "messages": [
    {
      "content": "Prove that the square root of 2 is irrational.",
      "role": "user"
    }
  ],
  "reasoning_effort": "max"
}'
```

```
**Proof by contradiction.**

Suppose, for the sake of contradiction, that \(\sqrt{2}\) is rational. Then we can write
\[
\sqrt{2}=\frac{a}{b},
\]
where \(a\) and \(b\) are integers, \(b\neq 0\), and the fraction is in lowest terms, so \(a\) and \(b\) have no common factor greater than \(1\).

Squaring both sides gives
\[
2=\frac{a^2}{b^2}
\quad\Longrightarrow\quad
a^2=2b^2.
\]
Thus \(a^2\) is even. Since the square of an odd integer is odd, \(a\) itself must be even. Write \(a=2k\) for some integer \(k\). Substituting,
\[
(2k)^2=2b^2
\quad\Longrightarrow\quad
4k^2=2b^2
\quad\Longrightarrow\quad
b^2=2k^2.
\]
Therefore \(b^2\) is even, and hence \(b\) is also even.

So both \(a\) and \(b\) are divisible by \(2\), contradicting the assumption that \(\frac{a}{b}\) was in lowest terms. Therefore our initial assumption was false, and
\[
\boxed{\sqrt{2}\text{ is irrational}.}
\]
```

```json
{
  "id": "chatcmpl-6aedf665a398e214bd658428",
  "object": "chat.completion",
  "created": 1793980005,
  "model": "moonshotai/kimi-k3.1-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**Proof by contradiction.**\n\nSuppose, for the sake of contradiction, that \\(\\sqrt{2}\\) is rational. Then we can write\n\\[\n\\sqrt{2}=\\frac{a}{b},\n\\]\nwhere \\(a\\) and \\(b\\) are integers, \\(b\\neq 0\\), and the fraction is in lowest terms, so \\(a\\) and \\(b\\) have no common factor greater than \\(1\\).\n\nSquaring both sides gives\n\\[\n2=\\frac{a^2}{b^2}\n\\quad\\Longrightarrow\\quad\na^2=2b^2.\n\\]\nThus \\(a^2\\) is even. Since the square of an odd integer is odd, \\(a\\) itself must be even. Write \\(a=2k\\) for some integer \\(k\\). Substituting,\n\\[\n(2k)^2=2b^2\n\\quad\\Longrightarrow\\quad\n4k^2=2b^2\n\\quad\\Longrightarrow\\quad\nb^2=2k^2.\n\\]\nTherefore \\(b^2\\) is even, and hence \\(b\\) is also even.\n\nSo both \\(a\\) and \\(b\\) are divisible by \\(2\\), contradicting the assumption that \\(\\frac{a}{b}\\) was in lowest terms. Therefore our initial assumption was false, and\n\\[\n\\boxed{\\sqrt{2}\\text{ is irrational}.}\n\\]",
        "reasoning_content": "I need respond to user \"Prove that the square root of 2 is irrational.\" Should deliver clear proof. Should consider style: classic contradiction, suppose sqrt2=a/b in lowest terms, then a^2=2b^2, a even, a=2k, then 4k^2=2b^2 => b^2=2k^2, b even, contradict gcd=1. Conclude irrational. Could include lemma even square implies even integer briefly. Make sure rigorous. Could present concise yet explanatory. I have huge token budget but simple task. Should have no tool. Should respond with proof. Could also alternative infinite descent but one proof enough. Should consider exact statement \"square root of 2\" positive. Start assume contrary sqrt2 rational, write p/q with q nonzero, coprime, q>0. Square. p^2=2q^2. p^2 even, so p even (if p odd, square odd). p=2k. Substitute 4k²=2q² => q²=2k², so q even. Both even contradict coprime. Hence no such representation, sqrt2 irrational. Perhaps box. Should avoid ambiguity about negative? square root normally positive. Fine.\n\nSimple query, proof and lemma. Could mention lowest terms. Format. Done."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 96,
    "completion_tokens": 577,
    "total_tokens": 673,
    "completion_tokens_details": {
      "reasoning_tokens": 274
    },
    "prompt_tokens_details": {
      "cache_write_tokens": 0
    }
  }
}
```

</details>

<details>

<summary>**Tool Choice Required** — Force a tool call on the first turn with tool_choice</summary>



```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3.1-pro',
  {
    messages: [{ content: 'What is the weather in San Francisco today?', role: 'user' }],
    tool_choice: 'required',
    tools: [
      {
        function: {
          description: 'Get the weather for a city',
          name: 'get_weather',
          parameters: {
            properties: { city: { type: 'string' } },
            required: ['city'],
            type: 'object',
          },
        },
        type: 'function',
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
  "model": "moonshotai/kimi-k3.1-pro",
  "messages": [
    {
      "content": "What is the weather in San Francisco today?",
      "role": "user"
    }
  ],
  "tool_choice": "required",
  "tools": [
    {
      "function": {
        "description": "Get the weather for a city",
        "name": "get_weather",
        "parameters": {
          "properties": {
            "city": {
              "type": "string"
            }
          },
          "required": [
            "city"
          ],
          "type": "object"
        }
      },
      "type": "function"
    }
  ]
}'
```

```json
{
  "id": "chatcmpl-6aedf676bc6c0a218ab9e0c1",
  "object": "chat.completion",
  "created": 1793980022,
  "model": "moonshotai/kimi-k3.1-pro",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "tool_calls": [
          {
            "index": 0,
            "id": "get_weather_0_694b7f4b",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\":\"San Francisco\"}"
            }
          }
        ],
        "reasoning_content": "I need respond to user with tool required. Should call get_weather city San Francisco. Should consider current weather date? Tool only city. Call."
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 208,
    "completion_tokens": 84,
    "total_tokens": 292,
    "completion_tokens_details": {
      "reasoning_tokens": 31
    },
    "prompt_tokens_details": {
      "cache_write_tokens": 0
    }
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3.1-pro',
  { messages: [{ content: 'Explain why the sky is blue.', role: 'user' }], stream: true },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3.1-pro",
  "messages": [
    {
      "content": "Explain why the sky is blue.",
      "role": "user"
    }
  ],
  "stream": true
}'
```

```
The sky is blue mainly because of **Rayleigh scattering**.

Sunlight looks white but contains many colors. As it passes through Earth’s atmosphere, tiny nitrogen and oxygen molecules—much smaller than the wavelengths of visible light—scatter the light in different directions. This scattering is much stronger for shorter wavelengths: its intensity is roughly proportional to \(1/\lambda^4\). Blue light therefore scatters far more than red light, so when you look away from the Sun, you see blue light arriving from all parts of the sky.

Violet light scatters even more strongly, but the sky doesn’t look violet because sunlight contains less violet, some is absorbed in the atmosphere, and human eyes are much less sensitive to violet than to blue.

This also explains sunsets: sunlight travels through more atmosphere when the Sun is low, so much of the blue light is scattered out of the direct beam, leaving more red and orange light.
```

```json
[
  {
    "id": "chatcmpl-6aedf9d1c68c634204e437b0",
    "object": "chat.completion.chunk",
    "created": 1793980881,
    "model": "kimi-k3.1-pro",
    "choices": [
      {
        "index": 0,
        "delta": {
          "role": "assistant",
          "content": ""
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_cc97d465"
  },
  {
    "id": "chatcmpl-6aedf9d1c68c634204e437b0",
    "object": "chat.completion.chunk",
    "created": 1793980881,
    "model": "kimi-k3.1-pro",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": "I"
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_cc97d465"
  },
  "... 491 more chunks omitted ...",
  {
    "id": "chatcmpl-6aedf9d1c68c634204e437b0",
    "object": "chat.completion.chunk",
    "created": 1793980881,
    "model": "kimi-k3.1-pro",
    "choices": [],
    "usage": {
      "prompt_tokens": 92,
      "completion_tokens": 506,
      "total_tokens": 598,
      "completion_tokens_details": {
        "reasoning_tokens": 306
      },
      "prompt_tokens_details": {
        "cache_write_tokens": 0
      }
    }
  }
]
```

</details>

## Parameters

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

Input [Open](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/#page","headline":"Kimi K3.1 Pro","description":"Kimi K3.1 Pro is Moonshot's flagship model for long-horizon coding and end-to-end knowledge work, and the first model in the K3.1 series. A post-trained version of Kimi K3 with substantially larger post-training compute, it offers native visual understanding, always-on reasoning, and a 1M-token context window, with gains in coding, 3D creation, and financial research.","url":"https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
