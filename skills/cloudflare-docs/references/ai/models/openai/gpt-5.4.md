---
title: GPT-5.4
description: GPT-5.4 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-5.4 

Text Generation • OpenAI • Proxied 

`openai/gpt-5.4` 

GPT-5.4 is OpenAI's flagship model with strong coding, reasoning, and multimodal capabilities.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/)                                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-5.4) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

1. **First Law of Thermodynamics** — **Energy is conserved**  
   Energy cannot be created or destroyed, only transferred or transformed.  
   In thermodynamic systems, this is often written as:  
   **ΔU = Q - W**  
   where:
   - **ΔU** = change in internal energy  
   - **Q** = heat added to the system  
   - **W** = work done by the system  

2. **Second Law of Thermodynamics** — **Entropy tends to increase**  
   In any natural process, the total entropy of an isolated system never decreases.  
   This means energy tends to spread out, and no heat engine can be 100% efficient.

3. **Third Law of Thermodynamics** — **Entropy approaches a minimum at absolute zero**  
   As the temperature of a perfect crystal approaches **0 Kelvin**, its entropy approaches **zero**.  
   This also implies that absolute zero cannot be reached in a finite number of steps.

There is also a **Zeroth Law of Thermodynamics**, which is often listed before the first three:

- If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.  
- This is the basis for the concept of **temperature**.

If you want, I can also give a simple everyday explanation of each law.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

### Read a JSON file
```python
import json

with open("data.json", "r") as file:
    data = json.load(file)

print(data)
```

### If the file contains:
```json
{
  "name": "Alice",
  "age": 25
}
```

### Then `data` becomes:
```python
{'name': 'Alice', 'age': 25}
```

### Notes
- `json.load(file)` reads JSON from a file and converts it to Python objects.
- JSON objects become Python dictionaries.
- JSON arrays become Python lists.

### Read with UTF-8 encoding
```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)
```

### Handle invalid JSON safely
```python
import json

try:
    with open("data.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    print(data)
except FileNotFoundError:
    print("File not found.")
except json.JSONDecodeError:
    print("Invalid JSON.")
```

If you want, I can also show:
- how to read a JSON string
- how to write JSON to a file
- how to pretty-print JSON

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

Here are some popular stops if you take the scenic coastal route (Highway 1 / Pacific Coast Highway), which is much slower than I-5 but far more beautiful:

### Great stops from San Francisco to Los Angeles
- **Half Moon Bay** – Nice beaches, coastal views, and a good first stop.
- **Santa Cruz** – Classic beach town with a boardwalk, pier, and cafes.
- **Monterey** – Famous for Cannery Row and the Monterey Bay Aquarium.
- **Carmel-by-the-Sea** – Charming small town with shops, galleries, and a beautiful beach.
- **Big Sur** – One of the most scenic stretches of the drive, with cliffs, ocean views, and hiking spots.
- **San Simeon** – Known for Hearst Castle and elephant seals nearby.
- **Morro Bay** – Relaxed coastal town with the iconic Morro Rock.
- **San Luis Obispo** – Cute downtown, restaurants, and a good overnight stop.
- **Pismo Beach** – Good for a beach walk or seafood stop.
- **Santa Barbara** – Beautiful Spanish-style architecture, beaches, and wine tasting.
- **Malibu** – Scenic coastline before arriving in Los Angeles.

### If you want the faster inland route (I-5)
Stops are less scenic, but you could consider:
- **Gilroy** – Known for garlic-themed food.
- **Harris Ranch** – Popular food/rest stop on I-5.
- **Kettleman City** – Convenient midpoint break.
- **Grapevine area** – Good place to pause before descending into LA.

If you want, I can also suggest:
1. a **1-day fast itinerary**,  
2. a **2-3 day scenic itinerary**, or  
3. **food-focused stops**.

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

Detective Mara Voss found the first clue where no clue had any business being.

It was tucked inside the mouth of a stone lion that guarded the steps of Blackwell Hall, a place better known for charity galas than murder. The victim lay inside, under a chandelier bright enough to make everyone look innocent. Guests whispered behind silk gloves. Police boots clicked across marble. But Mara stood outside in the rain, staring at the lion’s weather-dark teeth.

Someone had placed a single peach pit on its tongue.

Not dropped. Placed.

She lifted it carefully with her handkerchief. The pit had been polished until it shone, and carved into its surface was the tiniest image of a key.

Mara looked up at the mansion windows. On the third floor, one curtain moved, though the glass behind it was black.

A dead banker in the ballroom was ordinary, as far as her city was concerned. A carved peach pit hidden in a stone lion’s mouth was not.

That was when she began to suspect the murder had started long before the body hit the floor.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-5.4',

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

It usually has 2 parts:

1. **Base case** — the condition where the function stops calling itself.
2. **Recursive case** — the part where the function calls itself with a smaller input.

### Simple example: factorial

The factorial of a number means:

- `5! = 5 × 4 × 3 × 2 × 1`
- `1! = 1`

A recursive version looks like this in Python:

```python
def factorial(n):
    if n == 1:          # base case
        return 1
    return n * factorial(n - 1)   # recursive case

print(factorial(5))
```

### How it works for `factorial(5)`

- `factorial(5)` → `5 * factorial(4)`
- `factorial(4)` → `4 * factorial(3)`
- `factorial(3)` → `3 * factorial(2)`
- `factorial(2)` → `2 * factorial(1)`
- `factorial(1)` → `1` ← base case

Then it returns back up:

- `factorial(2)` = `2 * 1 = 2`
- `factorial(3)` = `3 * 2 = 6`
- `factorial(4)` = `4 * 6 = 24`
- `factorial(5)` = `5 * 24 = 120`

### Key idea

Recursion works by breaking a big problem into smaller, similar problems until it reaches a simple stopping point.

If you want, I can also show a **real-life analogy** or a **non-math recursion example**.

## Parameters

* [ Input ](#tab-panel-76)
* [ Output ](#tab-panel-77)

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
