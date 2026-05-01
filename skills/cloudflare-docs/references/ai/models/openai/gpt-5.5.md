---
title: GPT-5.5
description: GPT-5.5 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.5 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.5` 

GPT-5.5 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

The **three laws of thermodynamics** are:

1. **First Law — Conservation of Energy**  
   Energy cannot be created or destroyed, only transferred or transformed.  
   In thermodynamics, this is often written as:  
   \[
   \Delta U = Q - W
   \]  
   where \(\Delta U\) is the change in internal energy, \(Q\) is heat added, and \(W\) is work done by the system.

2. **Second Law — Entropy Increases**  
   In an isolated system, entropy tends to increase over time.  
   This means natural processes tend to move toward greater disorder or energy dispersal, and heat flows spontaneously from hot objects to cold ones.

3. **Third Law — Absolute Zero Is Unattainable**  
   As the temperature of a perfect crystal approaches absolute zero, its entropy approaches zero.  
   It also implies that absolute zero, \(0\,K\), cannot be reached by any finite physical process.

There is also a **Zeroth Law**, which says that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the basis for temperature measurement.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'system',

        content: 'You are a helpful coding assistant specializing in Python.',

      },

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

You can read a JSON file in Python using the built-in `json` module.

```python
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data)
```

If `data.json` contains:

```json
{
  "name": "Alice",
  "age": 30
}
```

Then `data` will be a Python dictionary:

```python
{
    "name": "Alice",
    "age": 30
}
```

You can access values like this:

```python
print(data["name"])  # Alice
print(data["age"])   # 30
```

A slightly more explicit version with encoding:

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)
```

If you have a JSON string instead of a file, use `json.loads()`:

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data["name"])
```

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'I need help planning a road trip from San Francisco to Los Angeles.',

      },

      {

        role: 'assistant',

        content:

          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

      },

      {

        role: 'user',

        content: 'Yes, what are some good places to stop?',

      },

    ],

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Absolutely — the best stops depend on whether you take the **scenic coastal route** or the **faster inland route**.

## Scenic Route: Highway 1 / 101
This is the classic California road trip route, best if you have **1–3 days**.

### Great stops from north to south
- **Half Moon Bay** – Coastal views, beaches, and a nice breakfast/lunch stop.
- **Santa Cruz** – Beach Boardwalk, surfing, casual food, fun atmosphere.
- **Monterey** – Monterey Bay Aquarium, Cannery Row, harbor views.
- **Carmel-by-the-Sea** – Beautiful village, beach, shops, and restaurants.
- **Big Sur** – One of the most scenic stretches in California. Stop at:
  - Bixby Bridge
  - Pfeiffer Beach
  - McWay Falls
- **San Simeon / Hearst Castle** – Tour Hearst Castle or see the elephant seals nearby.
- **Paso Robles** – Wine tasting and good restaurants, especially if you cut inland.
- **San Luis Obispo** – Great overnight stop; downtown, Mission Plaza, good food.
- **Pismo Beach** – Beach stop, pier, clam chowder.
- **Solvang** – Danish-style town with bakeries, wine tasting, and cute streets.
- **Santa Barbara** – One of the best stops: beaches, State Street, the courthouse, Funk Zone.
- **Malibu** – Scenic coastal drive, beaches, and a final stop before LA.

## Faster Route: I-5
Best if you want to get to LA quickly, about **5.5–6.5 hours** depending on traffic.

Good practical stops:
- **Casa de Fruta** – Roadside stop with snacks, fruit, and restrooms.
- **Harris Ranch** – Popular meal stop, especially for steak.
- **Kettleman City** – Gas, food, and a good halfway break.
- **Tejon Ranch / Grapevine area** – Final major stop before entering LA traffic.

## My recommendation
If you have the time, do at least **one overnight** and take the coast:

**Day 1:** San Francisco → Santa Cruz → Monterey/Carmel → Big Sur → San Luis Obispo  
**Day 2:** San Luis Obispo → Solvang → Santa Barbara → Malibu → Los Angeles

Also, check current road conditions for **Highway 1 near Big Sur**, since closures can happen due to landslides.

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_completion_tokens: 2048,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Detective Mara Venn found the clue inside the grandfather clock, though the clock had not worked in twenty years.

The house was silent around her, all velvet shadows and rain-streaked windows, the kind of silence that made every breath feel borrowed. Lord Edevane’s body lay in the study below, surrounded by overturned books, broken glass, and enough obvious evidence to make Mara immediately distrust all of it.

She had come upstairs only because of the ticking.

It was faint, irregular, and impossible.

Mara opened the clock’s warped oak door and raised her lantern. No weights. No pendulum. No mechanism at all.

Just a small glass vial hanging from a red thread.

Inside the vial was a single human tooth, etched with three tiny words in gold:

**ASK THE DEAD.**

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.5',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    stream: true,

    stream_options: {

      include_usage: true,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Recursion is when a function solves a problem by calling itself with a smaller or simpler version of the same problem.

A recursion usually has two parts:

1. **Base case**: when to stop calling itself.
2. **Recursive case**: the part where the function calls itself.

Example: counting down from a number.

```python
def countdown(n):
    if n == 0:          # base case
        print("Done!")
    else:
        print(n)
        countdown(n - 1) # recursive case

countdown(3)
```

Output:

```text
3
2
1
Done!
```

Here is what happens:

- `countdown(3)` prints `3`, then calls `countdown(2)`
- `countdown(2)` prints `2`, then calls `countdown(1)`
- `countdown(1)` prints `1`, then calls `countdown(0)`
- `countdown(0)` reaches the base case and stops

So, recursion is like breaking a problem into smaller versions of itself until reaching a stopping point.

## Parameters

* [ Input ](#tab-panel-84)
* [ Output ](#tab-panel-85)

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

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
