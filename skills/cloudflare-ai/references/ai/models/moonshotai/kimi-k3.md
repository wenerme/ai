---
title: Kimi K3
description: Kimi K3 is Moonshot's flagship 2.8 trillion-parameter model, built on Kimi Delta Attention (a hybrid linear attention mechanism) with Attention Residuals. It offers native visual understanding, always-on reasoning, and a 1M-token context window for long-horizon coding, knowledge work, and deep reasoning tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Moonshot AI logo](https://developers.cloudflare.com/_astro/moonshotai.D9EBG7kx.svg)

#  Kimi K3

Text Generation • Moonshot AI

`moonshotai/kimi-k3`

Kimi K3 is Moonshot's flagship 2.8 trillion-parameter model, built on Kimi Delta Attention (a hybrid linear attention mechanism) with Attention Residuals. It offers native visual understanding, always-on reasoning, and a 1M-token context window for long-horizon coding, knowledge work, and deep reasoning tasks.

| Model Info                                                                 |                                                                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,048,576 tokens                                                                                                     |
| More information                                                           | [link ↗](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart)                                                     |
| Request formats                                                            | Chat Completions                                                                                                     |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/moonshotai/kimi-k3) |

## Usage

* [ TypeScript ](#tab-panel-1034)
* [ cURL ](#tab-panel-1035)

**TypeScript**

```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3',
  { messages: [{ content: 'Explain quantum entanglement in simple terms.', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3",
  "messages": [
    {
      "content": "Explain quantum entanglement in simple terms.",
      "role": "user"
    }
  ]
}'
```

* [ Output ](#tab-panel-1040)
* [ Raw response ](#tab-panel-1041)

Quantum entanglement is when two particles become linked in such a way that they behave as a single system — even when separated by vast distances.

**An analogy to start:**
Imagine two coins that are mysteriously connected. You shuffle them, keep one, and mail the other to a friend across the world. The moment you look at your coin and see heads, you instantly know your friend's coin shows tails.

**Here's where it gets weird:**
With ordinary coins, the outcome was fixed all along — your coin was *already* heads before you looked. But quantum mechanics says something stranger: before measurement, entangled particles don't have definite properties at all. Each exists in a haze of possibilities (called "superposition"). The instant you measure one, it "settles" into a state — and its partner instantly takes on the matching state, no matter how far away it is.

**Why this bothered Einstein:**
He famously called it "spooky action at a distance," because it seemed like the particles were communicating faster than light — which relativity says is impossible. He suspected the particles carried hidden instructions all along. But experiments over the past few decades (recognized with the 2022 Nobel Prize in Physics) proved Einstein wrong: the correlations are real, and the particles genuinely don't have definite states until measured.

**One important caveat:**
You *can't* use entanglement to send messages faster than light. The outcome you see is random, so there's no way to encode information in it. The connection only becomes apparent when both sides compare their results through normal, slower-than-light channels.

**Why it matters:**
Entanglement isn't just a curiosity — it's the foundation of quantum computing, ultra-secure quantum cryptography, and emerging quantum communication networks.

In short: entangled particles share one fate, and measuring one instantly shapes the other — a phenomenon so strange that even Einstein refused to believe it.

```json
{
  "id": "chatcmpl-6a592349f5fee221445e964f",
  "object": "chat.completion",
  "created": 1784226633,
  "model": "moonshotai/kimi-k3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum entanglement is when two particles become linked in such a way that they behave as a single system — even when separated by vast distances.\n\n**An analogy to start:**\nImagine two coins that are mysteriously connected. You shuffle them, keep one, and mail the other to a friend across the world. The moment you look at your coin and see heads, you instantly know your friend's coin shows tails.\n\n**Here's where it gets weird:**\nWith ordinary coins, the outcome was fixed all along — your coin was *already* heads before you looked. But quantum mechanics says something stranger: before measurement, entangled particles don't have definite properties at all. Each exists in a haze of possibilities (called \"superposition\"). The instant you measure one, it \"settles\" into a state — and its partner instantly takes on the matching state, no matter how far away it is.\n\n**Why this bothered Einstein:**\nHe famously called it \"spooky action at a distance,\" because it seemed like the particles were communicating faster than light — which relativity says is impossible. He suspected the particles carried hidden instructions all along. But experiments over the past few decades (recognized with the 2022 Nobel Prize in Physics) proved Einstein wrong: the correlations are real, and the particles genuinely don't have definite states until measured.\n\n**One important caveat:**\nYou *can't* use entanglement to send messages faster than light. The outcome you see is random, so there's no way to encode information in it. The connection only becomes apparent when both sides compare their results through normal, slower-than-light channels.\n\n**Why it matters:**\nEntanglement isn't just a curiosity — it's the foundation of quantum computing, ultra-secure quantum cryptography, and emerging quantum communication networks.\n\nIn short: entangled particles share one fate, and measuring one instantly shapes the other — a phenomenon so strange that even Einstein refused to believe it.",
        "reasoning_content": "The user wants a simple explanation of quantum entanglement. This is a physics concept that many people find confusing, so my goal is to make it accessible without dumbing it down to the point of inaccuracy.\n\nLet me think about what quantum entanglement actually is:\n- Quantum entanglement is a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances.\n- When you measure one particle of an entangled pair, you instantly know something about the other particle, regardless of the distance between them.\n- Einstein famously called it \"spooky action at a distance.\"\n\nKey points I want to convey:\n1. What entanglement is (particles linked in a special way)\n2. The strange part: measuring one instantly tells you about the other\n3. Why it's weird (this seems to defy our classical intuitions)\n4. Maybe clear up a common misconception: you can't use it to send information faster than light\n\nGood analogies to consider:\n- The classic glove analogy: You put a left glove and right glove in separate boxes, send one to a friend. When you open yours and see the left glove, you instantly know your friend has the right one. BUT this analogy is actually misleading because it suggests hidden variables — the gloves were always left and right. Quantum mechanics says the particles don't have definite states until measured (Bell's theorem proved this). I should be careful here. I could use the analogy but then explain why it falls short, which is actually a great pedagogical approach — it highlights what's truly weird about entanglement.\n\n- The coin analogy: two coins that always land on opposite sides when flipped. Similar issue with hidden variables.\n\nActually, the best approach might be:\n1. Start with the intuitive analogy (gloves or coins)\n2. Explain the quantum twist: unlike gloves, the particles don't have definite properties until measured — they're in a \"superposition\" of states\n3. The measurement of one \"collapses\" both into definite states instantly\n4. Mention why this bothered Einstein\n5. Clarify the no-faster-than-light-communication point\n6. Maybe mention practical applications briefly (quantum computing, quantum cryptography)\n\nLet me think about format:\n- \"Simple terms\" request means I should avoid jargon or explain it when used\n- Should be conversational but informative\n- Medium length — not too short that it's unhelpful, not so long it overwhelms\n- Could use a brief structure but probably flowing prose with maybe a couple of natural paragraph breaks works well for an explanation\n- An analogy is essential for \"simple terms\"\n\nLet me draft this:\n\n---\n\nQuantum entanglement is when two particles become linked so that they behave as one system, no matter how far apart they are.\n\n**The basic idea:**\nImagine you have two coins that are \"entangled.\" You shake them up and send one to a friend on the other side of the world. The moment you look at your coin and see heads, you instantly know your friend's coin shows tails — even before they look.\n\n**The quantum twist:**\nHere's where it gets truly strange. With ordinary coins, the outcome was decided the moment you separated them — your coin was \"really\" heads all along. But quantum mechanics tells us something weirder: before you measure them, entangled particles don't have definite properties at all. Each particle exists in a blur of possibilities (called \"superposition\") until the moment of measurement, when it \"chooses\" a state — and its partner instantly matches, no matter the distance.\n\nEinstein hated this, calling it \"spooky action at a distance,\" because it seemed like information was traveling faster than light. Scientists have since confirmed through experiments (winning the 2022 Nobel Prize) that entanglement is real.\n\n**Important caveat:**\nYou can't use entanglement to send messages faster than light. The results you see are random — you only discover the correlation when you compare notes with your friend through ordinary means.\n\n**Why it matters:**\nEntanglement is the engine behind quantum computing, quantum cryptography, and quantum teleportation experiments.\n\n---\n\nThat's pretty good. Let me refine. The coin analogy has the same hidden-variable problem as gloves, but I address it directly, which is the right pedagogical move. Actually I want to make sure the explanation of the twist is clear. \n\nThe key insight: classical correlations (gloves in boxes) are just about our ignorance — the properties existed all along. Quantum entanglement is different because the properties genuinely don't exist until measured, and experiments (Bell tests) have proven this distinction.\n\nShould I mention Bell's theorem explicitly? Maybe briefly — the 2022 Nobel Prize reference (Aspect, Clauser, Zeilinger) is a nice concrete touch that shows this isn't just theory.\n\nLength check: The draft above feels right — comprehensive but not overwhelming. Headers might be helpful here to organize, or I could do flowing prose. For a \"simple terms\" explanation, I think light structure with bold key phrases or minimal headers works well. Actually, maybe I'll keep it more conversational with minimal formatting — a few short paragraphs. Let me think... The request is conversational (\"Explain X in simple terms\"), so a conversational response with maybe one or two bolded phrases for emphasis feels right. Headers might make it feel like a textbook. I'll use flowing paragraphs with clear structure but keep it warm and readable.\n\nLet me finalize:\n\nParagraph 1: What it is — linked particles acting as one system\nParagraph 2: The coin/glove analogy\nParagraph 3: The quantum twist — superposition, properties don't exist until measured\nParagraph 4: Einstein's objection + experimental confirmation\nParagraph 5: The no-FTL-communication caveat\nParagraph 6 (optional): Why it matters\n\nActually that might be slightly long. Let me see if I can tighten. The caveat about FTL communication is important because it's the most common misconception. The applications bit can be one sentence.\n\nI'll aim for around 250-350 words. That feels right for \"simple terms\" — enough to actually explain, not so much it overwhelms."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 94,
    "completion_tokens": 1661,
    "total_tokens": 1755,
    "cached_tokens": 94,
    "completion_tokens_details": {
      "reasoning_tokens": 1264
    },
    "prompt_tokens_details": {
      "cached_tokens": 94
    }
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Reasoning Effort**  — Configure reasoning effort for a harder problem (K3's reasoning\_effort replaces the K2.x thinking parameter)

* [ TypeScript ](#tab-panel-1036)
* [ cURL ](#tab-panel-1037)

**TypeScript**

```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3',
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
  "model": "moonshotai/kimi-k3",
  "messages": [
    {
      "content": "Prove that the square root of 2 is irrational.",
      "role": "user"
    }
  ],
  "reasoning_effort": "max"
}'
```

* [ Output ](#tab-panel-1042)
* [ Raw response ](#tab-panel-1043)

# Proof that √2 is irrational

**Theorem.** √2 is irrational.

**Proof.** We proceed by contradiction. Suppose √2 is rational. Then it can be written as a fraction in lowest terms:

$$\sqrt{2} = \frac{a}{b}$$

where $a$ and $b$ are integers, $b \neq 0$, and $\gcd(a, b) = 1$ (meaning $a$ and $b$ share no common factor).

**Step 1: Square both sides.**

$$2 = \frac{a^2}{b^2} \implies a^2 = 2b^2$$

So $a^2$ is even. This forces $a$ itself to be even, because the square of an odd number is odd: if $a = 2k+1$, then $a^2 = 4k^2 + 4k + 1$, which is odd. Hence we can write:

$$a = 2k \quad \text{for some integer } k$$

**Step 2: Substitute back.**

$$(2k)^2 = 2b^2 \implies 4k^2 = 2b^2 \implies b^2 = 2k^2$$

So $b^2$ is even, and by the same reasoning as above, $b$ must be even.

**Step 3: Reach a contradiction.**

We have shown that both $a$ and $b$ are even, so they share a common factor of 2. But this contradicts our assumption that $\gcd(a, b) = 1$.

**Conclusion.** The assumption that √2 is rational leads to a contradiction. Therefore, √2 is irrational. $\blacksquare$

---

**Remark on the key step:** The entire proof hinges on the fact that *every* rational number has a unique fully-reduced form. The equation $a^2 = 2b^2$ is impossible for reduced fractions because the factor 2 appears an even number of times on the left (in the prime factorization of $a^2$) but an odd number of times on the right (in $2b^2$) — this is essentially the contradiction in disguise.

```json
{
  "id": "chatcmpl-6a59237a703baa4f421e6187",
  "object": "chat.completion",
  "created": 1784226682,
  "model": "moonshotai/kimi-k3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "# Proof that √2 is irrational\n\n**Theorem.** √2 is irrational.\n\n**Proof.** We proceed by contradiction. Suppose √2 is rational. Then it can be written as a fraction in lowest terms:\n\n$$\\sqrt{2} = \\frac{a}{b}$$\n\nwhere $a$ and $b$ are integers, $b \\neq 0$, and $\\gcd(a, b) = 1$ (meaning $a$ and $b$ share no common factor).\n\n**Step 1: Square both sides.**\n\n$$2 = \\frac{a^2}{b^2} \\implies a^2 = 2b^2$$\n\nSo $a^2$ is even. This forces $a$ itself to be even, because the square of an odd number is odd: if $a = 2k+1$, then $a^2 = 4k^2 + 4k + 1$, which is odd. Hence we can write:\n\n$$a = 2k \\quad \\text{for some integer } k$$\n\n**Step 2: Substitute back.**\n\n$$(2k)^2 = 2b^2 \\implies 4k^2 = 2b^2 \\implies b^2 = 2k^2$$\n\nSo $b^2$ is even, and by the same reasoning as above, $b$ must be even.\n\n**Step 3: Reach a contradiction.**\n\nWe have shown that both $a$ and $b$ are even, so they share a common factor of 2. But this contradicts our assumption that $\\gcd(a, b) = 1$.\n\n**Conclusion.** The assumption that √2 is rational leads to a contradiction. Therefore, √2 is irrational. $\\blacksquare$\n\n---\n\n**Remark on the key step:** The entire proof hinges on the fact that *every* rational number has a unique fully-reduced form. The equation $a^2 = 2b^2$ is impossible for reduced fractions because the factor 2 appears an even number of times on the left (in the prime factorization of $a^2$) but an odd number of times on the right (in $2b^2$) — this is essentially the contradiction in disguise.",
        "reasoning_content": "The user wants a proof that √2 is irrational. This is a classic proof by contradiction. Let me write it out clearly and rigorously.\n\nThe standard proof:\n\n**Claim:** √2 is irrational.\n\n**Proof (by contradiction):**\n\nSuppose, for the sake of contradiction, that √2 is rational. Then we can write:\n√2 = a/b\n\nwhere a and b are integers with b ≠ 0, and we can assume the fraction is in lowest terms, meaning gcd(a, b) = 1 (a and b share no common factors).\n\nSquaring both sides:\n2 = a²/b²\n2b² = a²\n\nThis means a² is even, which implies a is even (because if a were odd, a² would be odd — the square of an odd number (2k+1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1 is odd).\n\nSo a = 2k for some integer k.\n\nSubstituting:\n2b² = (2k)² = 4k²\nb² = 2k²\n\nThis means b² is even, which implies b is even (by the same reasoning).\n\nBut now both a and b are even, meaning they share a common factor of 2. This contradicts our assumption that gcd(a, b) = 1 (that the fraction was in lowest terms).\n\nTherefore, our initial assumption that √2 is rational must be false. Hence √2 is irrational. ∎\n\nI should also justify the lemma that if a² is even then a is even. I did that inline above.\n\nLet me format this nicely with clear structure. This is a math proof request, so headers or clear proof structure would be appropriate. I'll use a theorem-proof format. Should be moderately concise but complete and rigorous. I can use some markdown formatting since this appears to be a chat interface where markdown renders.\n\nI'll structure it:\n1. Statement\n2. Proof setup (contradiction)\n3. Key steps\n4. Contradiction\n5. Conclusion\n\nMaybe include the lemma explicitly. Let me write it well."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 96,
    "completion_tokens": 932,
    "total_tokens": 1028,
    "cached_tokens": 96,
    "completion_tokens_details": {
      "reasoning_tokens": 450
    },
    "prompt_tokens_details": {
      "cached_tokens": 96
    }
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Tool Choice Required**  — Force a tool call on the first turn with tool\_choice

* [ TypeScript ](#tab-panel-1044)
* [ cURL ](#tab-panel-1045)

**TypeScript**

```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3',
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
  "model": "moonshotai/kimi-k3",
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

* [ Output ](#tab-panel-1046)
* [ Raw response ](#tab-panel-1047)

I'll check the weather in San Francisco for you.

```json
{
  "id": "chatcmpl-6a5923933594b7665d11ae23",
  "object": "chat.completion",
  "created": 1784226696,
  "model": "moonshotai/kimi-k3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'll check the weather in San Francisco for you.",
        "tool_calls": [
          {
            "index": 0,
            "id": "get_weather_0",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\":\"San Francisco\"}"
            }
          }
        ],
        "reasoning_content": "The user is asking about the weather in San Francisco today. I have a `get_weather` tool available. I should call it with the city \"San Francisco\"."
      },
      "finish_reason": "tool_calls"
    }
  ],
  "usage": {
    "prompt_tokens": 208,
    "completion_tokens": 98,
    "total_tokens": 306,
    "cached_tokens": 208,
    "completion_tokens_details": {
      "reasoning_tokens": 35
    },
    "prompt_tokens_details": {
      "cached_tokens": 208
    }
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Streaming Response**  — Enable streaming for real-time output

* [ TypeScript ](#tab-panel-1038)
* [ cURL ](#tab-panel-1039)

**TypeScript**

```ts
const response = await env.AI.run(
  'moonshotai/kimi-k3',
  { messages: [{ content: 'Explain why the sky is blue.', role: 'user' }], stream: true },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "moonshotai/kimi-k3",
  "messages": [
    {
      "content": "Explain why the sky is blue.",
      "role": "user"
    }
  ],
  "stream": true
}'
```

* [ Output ](#tab-panel-1048)
* [ Raw response ](#tab-panel-1049)

The sky is blue because of a phenomenon called **Rayleigh scattering**, which describes how light interacts with tiny particles—in this case, the gas molecules in Earth's atmosphere.

Here's the process, step by step:

1. **Sunlight contains all colors.** Although it looks white, sunlight is actually a mix of every color of visible light, each with a different wavelength. Red light has long wavelengths (~700 nm), while blue and violet have short ones (~400–450 nm).

2. **Air molecules scatter light.** Nitrogen and oxygen molecules are far smaller than the wavelengths of visible light. When light strikes particles this tiny, it gets scattered in all directions.

3. **Shorter wavelengths scatter much more strongly.** Rayleigh scattering intensity is proportional to 1/λ⁴, meaning blue light is scattered roughly 5–6 times more than red light. As sunlight streams through the atmosphere, blue light gets bounced all over the place—so no matter where you look in the sky, scattered blue light is reaching your eyes.

**Why not violet?** Violet light scatters even more than blue, but the sun emits less of it, and our eyes are less sensitive to it. The combined effect is that we perceive the sky as blue.

**A nice confirmation:** the same physics explains sunsets. When the sun is low on the horizon, its light travels through much more atmosphere to reach you. By the time it arrives, most of the blue has been scattered away, leaving the reds and oranges behind.

As a bonus: on the Moon, which has no atmosphere, the daytime sky is black—there's nothing to scatter the sunlight at all.

```json
[
  {
    "id": "chatcmpl-6a59238b8a290065f7c0f652",
    "object": "chat.completion.chunk",
    "created": 1784226700,
    "model": "kimi-k3",
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
    "system_fingerprint": "fpv0_0d4e787e"
  },
  {
    "id": "chatcmpl-6a59238b8a290065f7c0f652",
    "object": "chat.completion.chunk",
    "created": 1784226700,
    "model": "kimi-k3",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": "The"
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_0d4e787e"
  },
  {
    "id": "chatcmpl-6a59238b8a290065f7c0f652",
    "object": "chat.completion.chunk",
    "created": 1784226700,
    "model": "kimi-k3",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": " user"
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_0d4e787e"
  },
  {
    "id": "chatcmpl-6a59238b8a290065f7c0f652",
    "object": "chat.completion.chunk",
    "created": 1784226700,
    "model": "kimi-k3",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": " is"
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_0d4e787e"
  },
  {
    "id": "chatcmpl-6a59238b8a290065f7c0f652",
    "object": "chat.completion.chunk",
    "created": 1784226700,
    "model": "kimi-k3",
    "choices": [
      {
        "index": 0,
        "delta": {
          "reasoning_content": " asking"
        },
        "finish_reason": null
      }
    ],
    "system_fingerprint": "fpv0_0d4e787e"
  }
]
```

## Parameters

* [ Input ](#tab-panel-1050)
* [ Output ](#tab-panel-1051)

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

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3/#page","headline":"Kimi K3 (Moonshot AI) · Cloudflare AI docs · Cloudflare AI docs","description":"Kimi K3 is Moonshot's flagship 2.8 trillion-parameter model, built on Kimi Delta Attention (a hybrid linear attention mechanism) with Attention Residuals. It offers native visual understanding, always-on reasoning, and a 1M-token context window for long-horizon coding, knowledge work, and deep reasoning tasks.","url":"https://developers.cloudflare.com/ai/models/moonshotai/kimi-k3/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
