---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Kimi K3.1 Pro Highspeed is the high-speed variant of Moonshot's Kimi K3.1 Pro, delivering 2-3x the speed of K3.1 Pro for more responsive interactions. It is built for long-horizon coding and end-to-end knowledge work with a 1M-token context window and always-on reasoning.
title: Kimi K3.1 Pro Highspeed
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Moonshot AI logo](https://developers.cloudflare.com/_astro/moonshotai.DjWMkXUS.svg)

# Kimi K3.1 Pro Highspeed

Text Generation • Moonshot AI

Model ID

`moonshotai/kimi-k3.1-pro-highspeed` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kimi K3.1 Pro Highspeed is the high-speed variant of Moonshot's Kimi K3.1 Pro, delivering 2-3x the speed of K3.1 Pro for more responsive interactions. It is built for long-horizon coding and end-to-end knowledge work with a 1M-token context window and always-on reasoning.

| Model Info | |
| --- | --- |
| Context Window [↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens |
| More information | [link ↗](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart) |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$4.00</li><li>Output (per 1M tokens)$20.00</li><li>Cached input (per 1M tokens)$0.20</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3.1-pro-highspeed',
  { messages: [{ content: 'Explain quantum entanglement in simple terms.', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3.1-pro-highspeed",
  "messages": [
    {
      "content": "Explain quantum entanglement in simple terms.",
      "role": "user"
    }
  ]
}'
```

```
**Quantum entanglement** is when two or more tiny particles become so strongly linked that they must be described as one shared system, rather than completely separate objects.

Imagine two special coins:

- Each coin gives a random result—heads or tails—when checked.
- But if the coins are entangled in a particular way, checking them in the same manner always produces matching results, even when they are far apart.
- You cannot predict either individual result, but you can predict the relationship between them.

This is stranger than simply putting a left glove in one box and a right glove in another. In that case, the answers were fixed from the start. Experiments show that entangled particles have correlations that cannot be explained by them simply carrying pre-set answers for every possible measurement.

**Entanglement does not allow faster-than-light messaging.** Each person still sees a random sequence of results. The remarkable pattern appears only when they compare their results later using ordinary communication.

Entanglement is an important part of technologies such as **quantum computers, quantum cryptography, and certain ultra-precise measurements**.

In short: **entangled particles have individually random behavior, but deeply connected results.**
```

```json
{
  "id": "chatcmpl-6aedfa1f86fc5d00d29fbfef",
  "object": "chat.completion",
  "created": 1793980959,
  "model": "kimi-k3.1-pro-highspeed",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**Quantum entanglement** is when two or more tiny particles become so strongly linked that they must be described as one shared system, rather than completely separate objects.\n\nImagine two special coins:\n\n- Each coin gives a random result—heads or tails—when checked.\n- But if the coins are entangled in a particular way, checking them in the same manner always produces matching results, even when they are far apart.\n- You cannot predict either individual result, but you can predict the relationship between them.\n\nThis is stranger than simply putting a left glove in one box and a right glove in another. In that case, the answers were fixed from the start. Experiments show that entangled particles have correlations that cannot be explained by them simply carrying pre-set answers for every possible measurement.\n\n**Entanglement does not allow faster-than-light messaging.** Each person still sees a random sequence of results. The remarkable pattern appears only when they compare their results later using ordinary communication.\n\nEntanglement is an important part of technologies such as **quantum computers, quantum cryptography, and certain ultra-precise measurements**.\n\nIn short: **entangled particles have individually random behavior, but deeply connected results.**",
        "reasoning_content": "I need answer user simple explanation quantum entanglement. Should think content. Should satisfy simple terms, clear accurate. Could use gloves/coins analogy but avoid misleading hidden variables? Should explain particles linked, measuring one correlated with other no matter distance, not signal faster than light, outcomes random individually, correlations only when compare. Use magic coins perhaps but pre-set outcomes analogy inaccurate. Better say pair of coins that always land matching when flipped same way? Quantum entanglement correlations depend on measurement settings; simple enough. Could start: Quantum entanglement is when two tiny particles share a quantum state so their properties can't be described independently. Measuring one instantly tells you something about the other, even far apart. Analogy pair of gloves? That implies predetermined. Can explicitly say unlike gloves, quantum experiments show results aren't simply fixed in advance (under standard assumptions). Then no communication faster than light because each sequence random. Perhaps use \"imagine two magic coins... when measured in same way, results show perfect matching/opposite depending prep. But each flip random. Entanglement is stronger than ordinary prearranged matching.\" Keep concise ~300 words? Could be ~200 words with bullets. Should avoid \"instantly tells you\" with measurement? It does tell outcome if perfect correlation same basis, but state collapse nonlocal; no need.\n\nPotential response:\n\"Quantum entanglement is a special connection between two or more quantum particles. Once entangled, they behave as parts of one system, so you can't fully describe one without the other.\n\nImagine two coins that each give a random result—heads or tails—when checked. If the coins are entangled in a certain way, checking them in the same way always gives matching results, even if they're far apart. You can't predict either result in advance, but the relationship between them is predictable.\n\nThis isn't just like putting a left glove and right glove in separate boxes, where the answers were fixed all along. Experiments show entangled particles have correlations that can't be explained by ordinary pre-set instructions.\n\nIt does not let us send messages faster than light: each person sees only random results, and the pattern becomes visible only when they compare notes through normal communication.\n\nScientists use entanglement in quantum computing, quantum cryptography, and precision experiments.\"\n\nMake sure matching results not universal, say \"for a particular kind of entangled pair and measurement\" or \"depending on how prepared, always match or always differ\". Better \"can always match (or always be opposite, depending on preparation)\". Simple terms. Does \"checking them same way\" obscure measurements. Fine.\n\nCould say no hidden variables caveat not necessary but accurate \"can't be explained by the particles simply carrying pre-set answers for every possible measurement.\" That's good.\n\nNo need ask clarifying. Respond in simple terms. Could include one-line summary. I'll formulate around 250 words? Perhaps 180. Should not overexplain. Use headings? Not needed. Could use analogy and important caveat.\n\nCheck if \"measuring one instantly tells you something about other\" might be perceived as FTL; include. Could avoid \"spooky action\" unless helpful. Einstein quote optional but not necessary. Simplicity. Kimi will produce ~220 words."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 94,
    "completion_tokens": 901,
    "total_tokens": 995,
    "completion_tokens_details": {
      "reasoning_tokens": 648
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
  'moonshotai/kimi-k3.1-pro-highspeed',
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
  "model": "moonshotai/kimi-k3.1-pro-highspeed",
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

Suppose, for the sake of contradiction, that \(\sqrt{2}\) is rational. Then we can write it in lowest terms as
\[
\sqrt{2}=\frac{a}{b},
\]
where \(a\) and \(b\) are integers, \(b\neq 0\), and \(\gcd(a,b)=1\).

Squaring both sides and rearranging gives
\[
2=\frac{a^2}{b^2}
\quad\Longrightarrow\quad
a^2=2b^2.
\]
Thus \(a^2\) is even, so \(a\) must be even. (The square of an odd integer is odd.) Write \(a=2k\) for some integer \(k\). Substituting, we obtain
\[
(2k)^2=2b^2
\quad\Longrightarrow\quad
4k^2=2b^2
\quad\Longrightarrow\quad
b^2=2k^2.
\]
Therefore \(b^2\) is even, and hence \(b\) is also even.

So both \(a\) and \(b\) are even, contradicting the assumption that \(\frac{a}{b}\) was in lowest terms. Therefore our initial assumption was false, and
\[
\boxed{\sqrt{2}\text{ is irrational}.}
\]
```

```json
{
  "id": "chatcmpl-6aedfa2d31a77f4016cb8c82",
  "object": "chat.completion",
  "created": 1793980973,
  "model": "kimi-k3.1-pro-highspeed",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "**Proof by contradiction.**\n\nSuppose, for the sake of contradiction, that \\(\\sqrt{2}\\) is rational. Then we can write it in lowest terms as\n\\[\n\\sqrt{2}=\\frac{a}{b},\n\\]\nwhere \\(a\\) and \\(b\\) are integers, \\(b\\neq 0\\), and \\(\\gcd(a,b)=1\\).\n\nSquaring both sides and rearranging gives\n\\[\n2=\\frac{a^2}{b^2}\n\\quad\\Longrightarrow\\quad\na^2=2b^2.\n\\]\nThus \\(a^2\\) is even, so \\(a\\) must be even. (The square of an odd integer is odd.) Write \\(a=2k\\) for some integer \\(k\\). Substituting, we obtain\n\\[\n(2k)^2=2b^2\n\\quad\\Longrightarrow\\quad\n4k^2=2b^2\n\\quad\\Longrightarrow\\quad\nb^2=2k^2.\n\\]\nTherefore \\(b^2\\) is even, and hence \\(b\\) is also even.\n\nSo both \\(a\\) and \\(b\\) are even, contradicting the assumption that \\(\\frac{a}{b}\\) was in lowest terms. Therefore our initial assumption was false, and\n\\[\n\\boxed{\\sqrt{2}\\text{ is irrational}.}\n\\]",
        "reasoning_content": "I need respond proof sqrt2 irrational. Should decide style. User simple math request. Should provide rigorous proof likely contradiction parity. Could present classic Euclid proof: suppose sqrt2=a/b in lowest terms, a,b integers b nonzero gcd1. Then a^2=2b^2 so a^2 even, hence a even (if a odd then square odd), a=2k. Then 4k^2=2b^2 => b^2=2k^2 so b even. Both even contradict lowest terms. Therefore irrational. Could also note assumptions positive since sqrt positive. Make sure no hidden issue: a,b integers, b>0, coprime. Good. Could offer concise proof and perhaps optional unique factorization alternative? Likely just classic proof. Should not overdo. Use formatted math. Perhaps title \"Proof by contradiction.\" Conclude \\boxed{\\sqrt2\\notin\\mathbb Q}. I should ensure \"if a^2 even then a even\" justified. Good. I'll formulate.\n\nPotential subtlety: lowest terms fraction implies not both even. Start assume rational, write sqrt2 = p/q with p,q integers, q≠0, gcd=1. Square etc. p even. Set p=2k. Then q even. Contradiction. Done.\n\nNo need mention decimal. Could include lemma inline. Fine. I should respond direct."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 96,
    "completion_tokens": 576,
    "total_tokens": 672,
    "completion_tokens_details": {
      "reasoning_tokens": 283
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
  'moonshotai/kimi-k3.1-pro-highspeed',
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
  "model": "moonshotai/kimi-k3.1-pro-highspeed",
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
  "id": "chatcmpl-6aedfa34ac58c03f772e4cc4",
  "object": "chat.completion",
  "created": 1793980981,
  "model": "kimi-k3.1-pro-highspeed",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "",
        "tool_calls": [
          {
            "index": 0,
            "id": "get_weather_0_9c50e31d",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\":\"San Francisco\"}"
            }
          }
        ],
        "reasoning_content": "I need respond to user weather San Francisco today. I'll call the get_weather tool. I have only get_weather city. I'll call. Perhaps after result respond. Tool choice required. I should invoke."
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 208,
    "completion_tokens": 96,
    "total_tokens": 304,
    "completion_tokens_details": {
      "reasoning_tokens": 43
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
  'moonshotai/kimi-k3.1-pro-highspeed',
  { messages: [{ content: 'Explain why the sky is blue.', role: 'user' }], stream: true },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3.1-pro-highspeed",
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
The sky is blue mainly because of **Rayleigh scattering** in Earth’s atmosphere.

Sunlight looks white, but it contains all visible colors. When sunlight passes through the atmosphere, its electric field interacts with tiny nitrogen and oxygen molecules, causing them to scatter light in different directions. Because these molecules are much smaller than the wavelengths of visible light, shorter wavelengths scatter far more strongly than longer ones:

\[
\text{scattering strength} \propto \frac{1}{\lambda^4}
\]

Blue light, with a wavelength of about 450 nm, is scattered roughly **six times more strongly** than red light at about 700 nm. So when you look away from the Sun, much of the light reaching your eyes is blue sunlight that has been scattered toward you from all over the sky.

Violet light scatters even more strongly, but sunlight contains less of it, and human eyes are much less sensitive to violet. The combined effect is that we perceive the sky as blue.

This also helps explain sunsets: sunlight then travels through a longer stretch of atmosphere, scattering much of the blue light out of the direct beam and leaving more red and orange light.
```

```json
[
  {
    "id": "chatcmpl-6aedfa3635ba3b8419313a2f",
    "object": "chat.completion.chunk",
    "created": 1793980983,
    "model": "kimi-k3.1-pro-highspeed",
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
    "system_fingerprint": "fpv0_9474d94a"
  },
  {
    "id": "chatcmpl-6aedfa3635ba3b8419313a2f",
    "object": "chat.completion.chunk",
    "created": 1793980983,
    "model": "kimi-k3.1-pro-highspeed",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": "I"
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_9474d94a"
  },
  "... 968 more chunks omitted ...",
  {
    "id": "chatcmpl-6aedfa3635ba3b8419313a2f",
    "object": "chat.completion.chunk",
    "created": 1793980983,
    "model": "kimi-k3.1-pro-highspeed",
    "choices": [],
    "usage": {
      "prompt_tokens": 92,
      "completion_tokens": 983,
      "total_tokens": 1075,
      "completion_tokens_details": {
        "reasoning_tokens": 733
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

Input [Open](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro-highspeed/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro-highspeed/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro-highspeed/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro-highspeed/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro-highspeed/#page","headline":"Kimi K3.1 Pro Highspeed","description":"Kimi K3.1 Pro Highspeed is the high-speed variant of Moonshot's Kimi K3.1 Pro, delivering 2-3x the speed of K3.1 Pro for more responsive interactions. It is built for long-horizon coding and end-to-end knowledge work with a 1M-token context window and always-on reasoning.","url":"https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3.1-pro-highspeed/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
