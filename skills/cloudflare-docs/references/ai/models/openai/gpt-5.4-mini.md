---
title: GPT-5.4 mini
description: GPT-5.4 Mini is a smaller, faster, and more cost-efficient version of GPT-5.4 for lightweight tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 mini 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4-mini` 

GPT-5.4 Mini is a smaller, faster, and more cost-efficient version of GPT-5.4 for lightweight tasks.

| Model Info                                                                 |                                                                                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 128,000 tokens                                                                                                        |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                                |
| More information                                                           | [link ↗](https://openai.com/)                                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4-mini) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

The three laws of thermodynamics are:

1. **First Law: Conservation of energy**  
   Energy cannot be created or destroyed, only transferred or transformed.  
   In simple form:  
   **ΔU = Q − W**  
   where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system.

2. **Second Law: Entropy increases**  
   In an isolated system, entropy tends to increase over time. This means natural processes are irreversible and energy tends to spread out.  
   A common implication: no heat engine can be 100% efficient.

3. **Third Law: Absolute zero is unattainable**  
   As temperature approaches absolute zero, the entropy of a perfect crystal approaches a minimum value, usually taken as zero.  
   In practice, it’s impossible to reach exactly 0 K in a finite number of steps.

If you want, I can also give you a **very simple everyday analogy** for each law.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

Use Python’s built-in `json` module.

```python
import json

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data)
```

### Notes
- `json.load(f)` reads JSON from a file object.
- `json.loads(s)` reads JSON from a string.
- The result is usually a Python `dict` or `list`, depending on the JSON structure.

### Example JSON
```json
{
  "name": "Alice",
  "age": 30
}
```

### Python result
```python
{'name': 'Alice', 'age': 30}
```

If you want, I can also show how to:
- read JSON into a pandas DataFrame
- handle invalid JSON errors
- write JSON back to a file

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

Absolutely — the San Francisco to Los Angeles drive has a lot of great stop options depending on whether you want the **fastest route** or the **most scenic one**.

## Best stops if you take Highway 1 / Pacific Coast Highway
This is the most scenic route, but it can add a lot of time.

### 1. Monterey / Carmel-by-the-Sea
- Great for a first major stop south of SF
- **Monterey Bay Aquarium** is a top attraction
- Carmel has a charming village feel, beaches, and galleries

### 2. Big Sur
- One of the most famous scenic stretches in California
- Must-see viewpoints:
  - **Bixby Creek Bridge**
  - **Pfeiffer Beach**
  - **Julia Pfeiffer Burns State Park** / McWay Falls
- Ideal if you want dramatic coastline and photo stops

### 3. San Simeon / Hearst Castle
- Good place to break up the drive
- **Hearst Castle** is the big attraction here
- Also possible to see elephant seals at **Piedras Blancas**

### 4. San Luis Obispo
- Nice overnight or lunch stop
- Relaxed downtown, good food, and easy access to nearby wine country

### 5. Santa Barbara
- Beautiful coastal city, great for a meal or longer stop
- **Stearns Wharf**, the mission, and the harbor are popular
- Good “last major stop” before LA

## Best stops if you take the faster inland route (US-101 / I-5)
This is quicker and still has good options.

### 1. San Luis Obispo
- Great midway break
- Walkable downtown and lots of restaurants

### 2. Solvang
- A fun Danish-style town near Santa Barbara
- Good for pastries, coffee, and a quick stretch

### 3. Santa Barbara
- Still worth stopping even on the faster route
- Beautiful and easy to enjoy without a huge detour

### 4. Ventura / Oxnard
- Good coastal stop before reaching LA
- Less crowded than Santa Barbara

## If you want a balanced one-day route
A practical plan is:
- **SF → Monterey / Carmel**
- **Monterey → Big Sur**
- **Big Sur → San Luis Obispo**
- **San Luis Obispo → Santa Barbara**
- **Santa Barbara → LA**

That’s a lot for one day, so many people do it as a **2-day or 3-day road trip**.

## Quick recommendation
If you only want a few stops, I’d pick:
1. **Monterey**
2. **Big Sur**
3. **Santa Barbara**

If you want, I can also make you:
- a **1-day itinerary**
- a **2-day scenic itinerary**
- or a route with **food, beaches, and hiking stops**.

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

The rain had been falling since midnight, soft and persistent, turning the city into a blur of sodium light and reflected secrets. Detective Mara Venn stood in the doorway of apartment 4B, one gloved hand resting against the frame, and looked down at the object gleaming on the floorboards.

It wasn’t a weapon. It wasn’t jewelry, either.

At first glance, it looked like a child’s toy: a tiny brass bird with one wing folded and the other raised as if caught mid-flight. But when Mara knelt and picked it up, she felt the weight of it—too heavy for its size—and noticed the fine engraved line along its belly. A seam.

She turned the figurine over. Hidden beneath the bird’s feet was a row of numbers, stamped so neatly they might have been part of the design. Not a serial number, exactly. Too deliberate for that. Too precise.

Behind her, the apartment hummed with the low buzz of the refrigerator and the distant wail of a siren moving somewhere farther downtown. Inside the room, the dead man sat slumped in his chair as if he’d merely nodded off. His hands were folded on the desk. His face was calm.

Mara looked again at the brass bird.

The numbers weren’t random. She knew that before she even compared them to the note pinned under the victim’s pen, written in a hand so steady it seemed almost smug:

**You’re late. Look under the third stone.**

She slipped the bird into an evidence bag and stared at the cold line of the victim’s mouth.

Someone had planned this very carefully.

And somehow, they had expected her to come.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4-mini',

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

Recursion is when a function solves a problem by calling itself on a smaller version of the same problem.

### Simple idea
A recursive function usually has:
1. **A base case** — when to stop calling itself
2. **A recursive case** — when it calls itself with a smaller input

### Example: counting down
```python
def countdown(n):
    if n == 0:          # base case
        print("Done!")
    else:
        print(n)
        countdown(n - 1)  # recursive call
```

If you run:
```python
countdown(3)
```

It prints:
```python
3
2
1
Done!
```

### How it works
- `countdown(3)` prints `3`, then calls `countdown(2)`
- `countdown(2)` prints `2`, then calls `countdown(1)`
- `countdown(1)` prints `1`, then calls `countdown(0)`
- `countdown(0)` reaches the base case and stops

### In short
Recursion is like solving a big problem by breaking it into smaller versions of the same problem until you reach a stopping point.

## Parameters

* [ Input ](#tab-panel-78)
* [ Output ](#tab-panel-79)

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
