---
description: Claude Opus 5.5 is Anthropic's model for long-running agentic coding and knowledge work. It combines a one million token context window with adaptive thinking that is always on, a 128K token maximum output, and a medium default effort level.
title: Claude Opus 5.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg)

# Claude Opus 5.5

Text Generation • Anthropic

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`anthropic/claude-opus-5.5`

- Third-party

Claude Opus 5.5 is Anthropic's model for long-running agentic coding and knowledge work. It combines a one million token context window with adaptive thinking that is always on, a 128K token maximum output, and a medium default effort level.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,000,000 tokens |
| Terms and License | [link ↗](https://www.anthropic.com/legal/commercial-terms) |
| More information | [link ↗](https://platform.claude.com/docs/en/models/opus-5-5/overview) |
| Request formats | Anthropic Messages |
| Pricing | <ul><li>Input (per 1M tokens)$4.00</li><li>Output (per 1M tokens)$20.00</li><li>Cached input (per 1M tokens)$0.20</li><li>Cache creation (per 1M tokens)$5.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5.5',
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
  "model": "anthropic/claude-opus-5.5",
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
Thermodynamics is usually described by **three main laws**, plus a "zeroth" law that was added later because it underpins the others.

**Zeroth Law: Thermal equilibrium**
If two systems are each in thermal equilibrium with a third system, they are in equilibrium with each other. This is what makes temperature a meaningful, measurable quantity, and it is why thermometers work.

**First Law: Conservation of energy**
Energy cannot be created or destroyed, only transformed from one form to another.
- Written as: **ΔU = Q − W**, where ΔU is the change in a system's internal energy, Q is the heat added to the system, and W is the work done by the system.
- Implication: no machine can produce more energy than it takes in, so a "perpetual motion machine of the first kind" is impossible.

**Second Law: Entropy increases**
In an isolated system, total entropy (roughly, disorder or the spreading out of energy) never decreases over time.
- Heat flows spontaneously from hot to cold, never the reverse without outside work.
- No heat engine can be 100% efficient. Some energy is always lost as waste heat.
- This law gives time its "direction" (the arrow of time).

**Third Law: Absolute zero**
As a system approaches absolute zero (0 K, or −273.15 °C), its entropy approaches a minimum constant value. For a perfect crystal, that value is zero.
- Implication: absolute zero cannot be reached in a finite number of steps.

**A popular informal summary:**
1. You can't win (you can't get out more energy than you put in).
2. You can't break even (you'll always lose some energy as heat).
3. You can't quit the game (you can't reach absolute zero).
```

```json
{
  "model": "claude-opus-5-5",
  "id": "msg_011CfJq2fgVPNWUne9rV4Tiv",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAQSmwUKEAgSGAI4AUIIdGhpbmtpbmcSDFVkpHQKiUqmYYqLgBoM8wyoXxEXn4HFcl0CIjCevXuqxkDavToC7S4gH/QFNscgJxQuyQfgg5lrBctKdBWSqysQvLawgvmsCshEmpYquAQDK/xJ80Z7b+/HtCuw4EYkFeLBS9DgqtPWUbd5GSCI9aC9YXFhzp1f9qW1kUyMIBgoUhiQWi2N4LVQnFFuE+3T5DzegFjfCEsU9WLjw3LL4uUemJb+B7Y7wWJ7USzBIgdytRa3Ta/NePqTWHWMR3csyGHh+avsBoZ+GLsgFOs4HQ0AFW1qfnGuNRivh3947vZ1SWFaROOoYZK6LGV856aez1mjiHdr3+yzOBNHGL4nWM+EFG7CtjxcBfqI7qU3nK4atAjAweIFAHarEIApWCRodUVyDcSNpMnS4EuquJs7JPju7+0jxj+sLP/6faYmzH+thOy3YT/aBzlGOxVT2ns6TOFsMEcxRYBjwkj3f579LZ1VpE/GVT7ZJzGXq3puXvJhFdMvxYEgOnr2ih6S6cJHhB4FAGEjvvLMJ33MpGI92egyVFhJXTZfYz90W4vqIYpGLuRzERPLHjexXGwzAjZu8K1a/MvZcekX3mSNzoyhHO8B3ALp7p6aKYJ0PVTfGLD/p7IRuMRBf/sHauAiOy8RuUojVCbRkhcfzYLA+zpYs9AAe+HOv4hOS+yUq/dRZC2xpj8YWfhNwHVoIrqs0j5kGkjl33QX9X9BS1urhkAuUojh864FFNKb9z2uREt2kYglcrUz6fQQZ9iWvJ4iyO0cGKEyy53Tgehmf/lzNZlNWAPnGs05dH+t72Knf4gtepuZ1fDSTimg60NrIJvF9+7GrBjbJBY2rwAcgLM8g/8E8BbzSCruZqGaGAE="
    },
    {
      "type": "text",
      "text": "Thermodynamics is usually described by **three main laws**, plus a \"zeroth\" law that was added later because it underpins the others.\n\n**Zeroth Law: Thermal equilibrium**\nIf two systems are each in thermal equilibrium with a third system, they are in equilibrium with each other. This is what makes temperature a meaningful, measurable quantity, and it is why thermometers work.\n\n**First Law: Conservation of energy**\nEnergy cannot be created or destroyed, only transformed from one form to another.\n- Written as: **ΔU = Q − W**, where ΔU is the change in a system's internal energy, Q is the heat added to the system, and W is the work done by the system.\n- Implication: no machine can produce more energy than it takes in, so a \"perpetual motion machine of the first kind\" is impossible.\n\n**Second Law: Entropy increases**\nIn an isolated system, total entropy (roughly, disorder or the spreading out of energy) never decreases over time.\n- Heat flows spontaneously from hot to cold, never the reverse without outside work.\n- No heat engine can be 100% efficient. Some energy is always lost as waste heat.\n- This law gives time its \"direction\" (the arrow of time).\n\n**Third Law: Absolute zero**\nAs a system approaches absolute zero (0 K, or −273.15 °C), its entropy approaches a minimum constant value. For a perfect crystal, that value is zero.\n- Implication: absolute zero cannot be reached in a finite number of steps.\n\n**A popular informal summary:**\n1. You can't win (you can't get out more energy than you put in).\n2. You can't break even (you'll always lose some energy as heat).\n3. You can't quit the game (you can't reach absolute zero)."
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 22,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 597,
    "output_tokens_details": {
      "thinking_tokens": 30
    },
    "service_tier": "standard",
    "inference_geo": "global"
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5.5',
  {
    max_tokens: 1024,
    messages: [{ content: 'How do I read a JSON file in Python?', role: 'user' }],
    system: 'You are a helpful coding assistant specializing in Python.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 1024,
  "messages": [
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ],
  "system": "You are a helpful coding assistant specializing in Python."
}'
```

````
Use Python's built-in `json` module:

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

`json.load()` parses the file into Python objects:

| JSON | Python |
|------|--------|
| object `{}` | `dict` |
| array `[]` | `list` |
| string | `str` |
| number | `int` / `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

### Accessing the data

Given this `data.json`:

```json
{
  "name": "Alice",
  "age": 30,
  "skills": ["Python", "SQL"]
}
```

```python
print(data["name"])       # Alice
print(data["skills"][0])  # Python
print(data.get("email", "N/A"))  # N/A (safe access with a default)
```

### Handling errors

```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

### Related tips

- **Parsing a JSON string** (not a file): use `json.loads()` (the "s" stands for string).
  ```python
  data = json.loads('{"key": "value"}')
  ```
- **Using `pathlib`**:
  ```python
  from pathlib import Path
  data = json.loads(Path("data.json").read_text(encoding="utf-8"))
  ```
- **Writing JSON back to a file**:
  ```python
  with open("output.json", "w", encoding="utf-8") as f:
      json.dump(data, f, indent=4)
  ```
````

```json
{
  "model": "claude-opus-5-5",
  "id": "msg_011CfJq38YmJ38ymFcT5DTY1",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "CAQS2gQKEAgSGAI4AUIIdGhpbmtpbmcSDFxQnE4f+jiYlyFgJRoMSio6ozq/nrk03OjnIjBVW7CpYGDuYX0b4SOpKqPYvUWec6ECWFTyOTlkKzvsGwcS1cN+YxcSbrCn9Gas++Uq9wO+i2aTJH/h1Sp0FqfRJDDBYWHuhH/1E26gBxzSBMAf+a6H86MyyhWgenqOfkqey4JJT10Sw9Y3aPrXOdBiVVrDk+r74fWA+tGK/tEVawYJIQPKlZrH8OPSpvOoetWEGF/fCtDIJkjTL/YmT4GK+grY1UJJ/vkRrvX0hPOc5wD1y+Wk7WV4MtJMEioXohlQ93b7jO9Il9TVp1s5Pyt6SjQNal/VfnLa4zUfsKymng8D0c+o9BrfEtffPovv/PslRUv5XHKLTRYqIyJ9o3K3iTtoUMgAl+CyFE8/i48CC2ATgpfrnF60aXRqTYOHBs6h1C62pgfRGHsD7Xxcg0k7JNnyMw4PXml9i4//7MNzUW0ZHRN5K8u5aZoTo52x3LwyIO2bc7se+oISb8CcjTYRzWGLwE/ra4WW3LiR6i3uObzoEHWVwolPEgcJQU0HgYWpTSqCr4FugcxGoTtU1Nklly31MJzeYUcdATSJxOGw1rz0QfZmGN81uRYbS5DF2jiQ82t3b9K9XdZWFm7nguV5jb/Hl68hDoSrm4KCv40xZwe34cXp4FdQSAnEsMikuoP+odCbrUpdrCycGws8xwKkatEq2MBCZ0Y5U2HlSWEHJo8WqHYNuuC4sIgXWKdtZlZJZWzTqeZ//nq/57ON0Z02DNVTd4yjoMfF0BgB"
    },
    {
      "type": "text",
      "text": "Use Python's built-in `json` module:\n\n```python\nimport json\n\nwith open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n\nprint(data)\n```\n\n`json.load()` parses the file into Python objects:\n\n| JSON | Python |\n|------|--------|\n| object `{}` | `dict` |\n| array `[]` | `list` |\n| string | `str` |\n| number | `int` / `float` |\n| `true` / `false` | `True` / `False` |\n| `null` | `None` |\n\n### Accessing the data\n\nGiven this `data.json`:\n\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"skills\": [\"Python\", \"SQL\"]\n}\n```\n\n```python\nprint(data[\"name\"])       # Alice\nprint(data[\"skills\"][0])  # Python\nprint(data.get(\"email\", \"N/A\"))  # N/A (safe access with a default)\n```\n\n### Handling errors\n\n```python\nimport json\n\ntry:\n    with open(\"data.json\", \"r\", encoding=\"utf-8\") as f:\n        data = json.load(f)\nexcept FileNotFoundError:\n    print(\"File not found.\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n### Related tips\n\n- **Parsing a JSON string** (not a file): use `json.loads()` (the \"s\" stands for string).\n  ```python\n  data = json.loads('{\"key\": \"value\"}')\n  ```\n- **Using `pathlib`**:\n  ```python\n  from pathlib import Path\n  data = json.loads(Path(\"data.json\").read_text(encoding=\"utf-8\"))\n  ```\n- **Writing JSON back to a file**:\n  ```python\n  with open(\"output.json\", \"w\", encoding=\"utf-8\") as f:\n      json.dump(data, f, indent=4)\n  ```"
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 40,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 600,
    "output_tokens_details": {
      "thinking_tokens": 10
    },
    "service_tier": "standard",
    "inference_geo": "global"
  }
}
```

</details>

<details>

<summary>**Creative Writing with High Effort** — Use adaptive thinking with high effort for deeper reasoning.</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5.5',
  {
    max_tokens: 2048,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
    output_config: { effort: 'high' },
    thinking: { type: 'adaptive' },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "anthropic/claude-opus-5.5",
  "max_tokens": 2048,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ],
  "output_config": {
    "effort": "high"
  },
  "thinking": {
    "type": "adaptive"
  }
}'
```

```
# The Missing Page

The dead man had been arranged with the kind of care people usually reserve for sleeping children. Hands folded over his sternum. Shoes placed side by side at the foot of the bed, laces tucked in. Someone had even drawn the curtains halfway, as if the morning light might disturb him.

Detective Inez Halloran stood in the doorway longer than she needed to, letting the room tell her what it wanted to tell her. Rooms always talked, if you let them. This one was saying *nothing happened here*, and it was saying it far too politely.

"Neighbor found him," said Patrolman Deaks, hovering at her elbow. "Door was unlocked. No sign of forced entry, no sign of a struggle. Coroner's thinking heart, maybe. Guy was sixty-one."

"Guys who die of heart attacks don't usually take their shoes off first and line them up."

"Maybe he was tidy."

Inez didn't answer. She crossed the room, snapped on a pair of gloves, and crouched beside the shoes. Brown oxfords, recently polished, heels worn unevenly in a way that suggested a bad left knee. She picked up the right shoe, then the left, and felt something shift inside the toe.

A folded square of paper, pale blue, lined.

She knew the paper before she'd even opened it. It was the same shade of blue as the cheap spiral notebook she'd bought from the pharmacy on Calder Street that morning, because her old one had gotten coffee-soaked in the car. She'd grabbed it off the rack without thinking, paid with exact change, and written exactly one thing in it: the address of this apartment.

She unfolded the paper.

Four words, written in blue ballpoint:

*He wasn't the first.*

The handwriting was slanted, cramped, the *t*s crossed low and hard, the way her father had taught her when she was seven because he said it looked more decisive. Nobody else crossed their *t*s like that. She'd never seen anyone else do it.

It was her handwriting.

"Detective?" Deaks leaned in. "You got something?"

Inez folded the paper back along its creases and slipped it into an evidence bag, keeping her face very still. Then, as casually as she could manage, she reached into her coat pocket and pulled out her new notebook. She flipped it open to the first page, where the address sat in her own familiar scrawl.

Then she ran her thumb along the spiral binding and felt the small, ragged teeth of paper where the second page had been torn out.

"Detective?"

"Get me a list," she said quietly, "of every unattended death in this city for the past six months. Every single one where the coroner said *natural causes*."

"That's gonna be a lot of names."

Inez looked down at the dead man's folded hands, at the careful, tender way someone had placed them, and felt a cold certainty settle in her chest like a stone sinking to the bottom of a well.

"I know," she said. "That's what worries me."
```

```json
{
  "model": "claude-opus-5-5",
  "id": "msg_011CfJq3WeHfjsXNsyLj1M39",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "",
      "signature": "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"
    },
    {
      "type": "text",
      "text": "# The Missing Page\n\nThe dead man had been arranged with the kind of care people usually reserve for sleeping children. Hands folded over his sternum. Shoes placed side by side at the foot of the bed, laces tucked in. Someone had even drawn the curtains halfway, as if the morning light might disturb him.\n\nDetective Inez Halloran stood in the doorway longer than she needed to, letting the room tell her what it wanted to tell her. Rooms always talked, if you let them. This one was saying *nothing happened here*, and it was saying it far too politely.\n\n\"Neighbor found him,\" said Patrolman Deaks, hovering at her elbow. \"Door was unlocked. No sign of forced entry, no sign of a struggle. Coroner's thinking heart, maybe. Guy was sixty-one.\"\n\n\"Guys who die of heart attacks don't usually take their shoes off first and line them up.\"\n\n\"Maybe he was tidy.\"\n\nInez didn't answer. She crossed the room, snapped on a pair of gloves, and crouched beside the shoes. Brown oxfords, recently polished, heels worn unevenly in a way that suggested a bad left knee. She picked up the right shoe, then the left, and felt something shift inside the toe.\n\nA folded square of paper, pale blue, lined.\n\nShe knew the paper before she'd even opened it. It was the same shade of blue as the cheap spiral notebook she'd bought from the pharmacy on Calder Street that morning, because her old one had gotten coffee-soaked in the car. She'd grabbed it off the rack without thinking, paid with exact change, and written exactly one thing in it: the address of this apartment.\n\nShe unfolded the paper.\n\nFour words, written in blue ballpoint:\n\n*He wasn't the first.*\n\nThe handwriting was slanted, cramped, the *t*s crossed low and hard, the way her father had taught her when she was seven because he said it looked more decisive. Nobody else crossed their *t*s like that. She'd never seen anyone else do it.\n\nIt was her handwriting.\n\n\"Detective?\" Deaks leaned in. \"You got something?\"\n\nInez folded the paper back along its creases and slipped it into an evidence bag, keeping her face very still. Then, as casually as she could manage, she reached into her coat pocket and pulled out her new notebook. She flipped it open to the first page, where the address sat in her own familiar scrawl.\n\nThen she ran her thumb along the spiral binding and felt the small, ragged teeth of paper where the second page had been torn out.\n\n\"Detective?\"\n\n\"Get me a list,\" she said quietly, \"of every unattended death in this city for the past six months. Every single one where the coroner said *natural causes*.\"\n\n\"That's gonna be a lot of names.\"\n\nInez looked down at the dead man's folded hands, at the careful, tender way someone had placed them, and felt a cold certainty settle in her chest like a stone sinking to the bottom of a well.\n\n\"I know,\" she said. \"That's what worries me.\""
    }
  ],
  "container": null,
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 28,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 1633,
    "output_tokens_details": {
      "thinking_tokens": 656
    },
    "service_tier": "standard",
    "inference_geo": "global"
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'anthropic/claude-opus-5.5',
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
  "model": "anthropic/claude-opus-5.5",
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
# Recursion

**Recursion** is when a function solves a problem by **calling itself** on a smaller version of the same problem, until it reaches a case simple enough to answer directly.

Every recursive function needs two parts:

1. **Base case**: the simplest version of the problem, answered directly without recursion. This is what stops the function.
2. **Recursive case**: the function calls itself on a smaller input, moving closer to the base case.

## A Simple Example: Factorial

The factorial of a number `n` (written `n!`) is the product of all positive integers up to `n`:

```
5! = 5 × 4 × 3 × 2 × 1 = 120
```

Notice that `5! = 5 × 4!`, and `4! = 4 × 3!`, and so on. The problem contains a smaller copy of itself, which makes it a natural fit for recursion.

```python
def factorial(n):
    if n == 1:                       # Base case
        return 1
    return n * factorial(n - 1)      # Recursive case

print(factorial(5))  # Output: 120
```

## How It Works Step by Step

When you call `factorial(5)`, the calls stack up until they reach the base case:

```
factorial(5) = 5 * factorial(4)
                   factorial(4) = 4 * factorial(3)
                                      factorial(3) = 3 * factorial(2)
                                                         factorial(2) = 2 * factorial(1)
                                                                            factorial(1) = 1   ← base case
```

Then the results are returned back up the chain:

```
factorial(1) = 1
factorial(2) = 2 * 1  = 2
factorial(3) = 3 * 2  = 6
factorial(4) = 4 * 6  = 24
factorial(5) = 5 * 24 = 120
```

## A Real-World Analogy

Imagine you're standing in a long line and want to know your position. You ask the person in front of you, "What's your position?" They ask the person in front of them, and so on. The person at the very front knows they're #1 (**base case**). Each person then answers the one behind them with "my position + 1," until the answer reaches you.

## Common Pitfall

If you forget the base case, or the input never gets closer to it, the function calls itself forever:

```python
def broken(n):
    return n * broken(n - 1)   # No base case!
```

In Python this raises a `RecursionError` (a "stack overflow") because each call takes up memory until the limit is hit.

## When to Use Recursion

Recursion works well for problems that naturally break into smaller, similar subproblems, such as:
- Traversing trees and folder structures
- Sorting algorithms like merge sort and quicksort
- Mathematical sequences (factorial, Fibonacci)
- Puzzles like the Tower of Hanoi

For simple repetitive tasks, a regular loop is often more efficient, but recursion can make certain problems much clearer and easier to write.
````

```json
[
  {
    "type": "message_start",
    "message": {
      "model": "claude-opus-5-5",
      "id": "msg_011CfJq56VHXzuR3jeXnycTD",
      "type": "message",
      "role": "assistant",
      "content": [],
      "container": null,
      "stop_reason": null,
      "stop_sequence": null,
      "stop_details": null,
      "usage": {
        "input_tokens": 24,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "cache_creation": {
          "ephemeral_5m_input_tokens": 0,
          "ephemeral_1h_input_tokens": 0
        },
        "output_tokens": 2,
        "service_tier": "standard",
        "inference_geo": "global"
      }
    }
  },
  {
    "type": "content_block_start",
    "index": 0,
    "content_block": {
      "type": "thinking",
      "thinking": "",
      "signature": ""
    }
  },
  "... 169 more chunks omitted ...",
  {
    "type": "message_stop"
  }
]
```

</details>

## Parameters

▶messages\[]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

stream

`boolean`

▶metadata{}

`object`

▶thinking{}

`object`

▶output\_config{}

`object`

▶tool\_choice

`one of`

▶tools\[]

`array`

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

Input [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/#page","headline":"Claude Opus 5.5","description":"Claude Opus 5.5 is Anthropic's model for long-running agentic coding and knowledge work. It combines a one million token context window with adaptive thinking that is always on, a 128K token maximum output, and a medium default effort level.","url":"https://developers.cloudflare.com/ai/models/anthropic/claude-opus-5.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
