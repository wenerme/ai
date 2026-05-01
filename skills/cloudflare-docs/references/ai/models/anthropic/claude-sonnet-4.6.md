---
title: Claude Sonnet 4.6
description: Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Sonnet 4.6 

Text Generation • Anthropic • Proxied 

`anthropic/claude-sonnet-4.6` 

Claude Sonnet 4.6 is Anthropic's latest balanced model offering strong coding, reasoning, and agentic capabilities with improved instruction following.

| Model Info                                                                 |                                                                                                                               |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                                |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                    |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/sonnet)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-sonnet-4.6) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    messages: [

      {

        role: 'user',

        content: 'What are the three laws of thermodynamics?',

      },

    ],

    max_tokens: 1024,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

There are actually **four laws of thermodynamics** (numbered 0–3), but the three *main* ones most commonly referenced are:

## The Three Main Laws

**1st Law – Conservation of Energy**
Energy cannot be created or destroyed, only converted from one form to another. The total energy of an isolated system remains constant.

**2nd Law – Entropy**
The total entropy of an isolated system always increases over time. Heat flows naturally from hot to cold, and processes are irreversible in nature.

**3rd Law – Absolute Zero**
As a system approaches absolute zero (0 Kelvin / -273.15°C), its entropy approaches a minimum or constant value. It is impossible to reach absolute zero in a finite number of steps.

---

## The Often-Forgotten Zeroth Law
**0th Law – Thermal Equilibrium**
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes the concept of **temperature**.

---

Would you like a deeper explanation of any of these?

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    messages: [

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

    max_tokens: 1024,

    system: 'You are a helpful coding assistant specializing in Python.',

    temperature: 0.3,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

## Reading a JSON File in Python

### Basic Method using `json` module

```python
import json

# Open and read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

### Common Approaches

**1. Read as a dictionary/list**
```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)  # Returns a Python dict or list

# Access values
print(data['key'])
print(data['nested']['key'])
```

**2. Read a JSON string (not a file)**
```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)  # Note: loads() not load()

print(data['name'])  # Output: Alice
```

**3. Handle encoding explicitly**
```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

### Error Handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

### Key Functions Summary

| Function | Use Case |
|----------|----------|
| `json.load(file)` | Read from a **file object** |
| `json.loads(string)` | Read from a **string** |
| `json.dump(data, file)` | Write to a **file** |
| `json.dumps(data)` | Convert to a **string** |

### Example JSON file (`data.json`)
```json
{
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "coding"]
}
```

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data['name'])          # Alice
print(data['hobbies'][0])    # reading
```

The `json` module is built into Python, so **no installation is needed**.

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

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

    max_tokens: 1024,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Here are some great stops depending on which route you take:

**Coastal Route (Highway 1) - Scenic but longer**
- **Santa Cruz** - Beach boardwalk and pier
- **Monterey** - Famous aquarium and Cannery Row
- **Big Sur** - Stunning coastal cliffs and views
- **San Simeon** - Hearst Castle tours
- **San Luis Obispo** - Charming college town with good food

**Inland Route (Highway 101 or I-5) - Faster**
- **Gilroy** - Known as the garlic capital of the world
- **Paso Robles** - Great wine country
- **Santa Barbara** - Beautiful beaches and Spanish architecture

**Tips to consider:**
- The coastal route adds several hours but is one of the most beautiful drives in the US
- Big Sur can have road closures so check conditions before you go
- Santa Barbara is worth a stop on either route
- Try to avoid driving through LA during rush hour

**How long do you have for the trip?** That would help narrow down how many stops make sense. Also, are you interested in:
- Food and restaurants
- Outdoor activities
- History and culture
- A mix of everything

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_tokens: 512,

    temperature: 0.8,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

# The Smell of Lavender

Detective Mara Chen had seen a lot of crime scenes in fourteen years on the force. She had learned to read them the way other people read books — patiently, without skipping ahead.

But this one was giving her trouble.

The apartment was sparse and cold, its single window open to the November street below. The victim, a retired accountant named Gerald Foss, lay slumped at his kitchen table with no signs of forced entry, no signs of struggle, and — this was the part that nagged at her — no signs that anyone had been upset about anything at all.

Everything was deliberate. Calm.

She almost missed it.

She was pulling on a fresh glove when the draft shifted, and there it was — faint, out of place, almost polite. *Lavender.* Not a cleaning product. Not a candle. Something more personal, like soap or a fabric softener pressed warm from a dryer.

Mara stood very still.

Gerald Foss, according to his neighbor, had been allergic to every flowering plant known to mankind. His medicine cabinet held three different antihistamines. There wasn't a single flower, real or artificial, anywhere in the apartment.

Someone had been here recently. Someone clean, careful, and completely unafraid.

She pulled out her notebook and wrote one word.

*Lavender.*

Then she circled it twice.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-sonnet-4.6',

  {

    messages: [

      {

        role: 'user',

        content: 'Explain the concept of recursion with a simple example.',

      },

    ],

    max_tokens: 1024,

    stream: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

# Recursion

## Core Concept

Recursion is when a **function calls itself** to solve a smaller version of the same problem, breaking it down until it reaches a simple base case.

Every recursive solution needs:
1. **Base case** — when to stop
2. **Recursive case** — calling itself with a simpler input

---

## Simple Example: Factorial

`5! = 5 × 4 × 3 × 2 × 1 = 120`

```python
def factorial(n):
    # Base case: stop here
    if n == 0:
        return 1

    # Recursive case: call itself with a smaller value
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

---

## How It Unfolds

```
factorial(5)
  └── 5 * factorial(4)
            └── 4 * factorial(3)
                      └── 3 * factorial(2)
                                └── 2 * factorial(1)
                                          └── 1 * factorial(0)
                                                    └── returns 1  ← base case

# Then it works back up:
1 * 1 = 1
2 * 1 = 2
3 * 2 = 6
4 * 6 = 24
5 * 24 = 120 ✓
```

---

## The "Thousand Clones" Analogy

> Imagine you're in a long line and ask *"what position am I in?"*
> You ask the person in front, who asks the person in front of them, and so on.
> The person at the front says **"I'm #1"** (base case), and the answer passes back down the line.

---

## Key Warnings

| ⚠️ Problem | ✅ Solution |
|---|---|
| No base case → **infinite loop** | Always define a stopping condition |
| Too many calls → **stack overflow** | Ensure input gets smaller each time |
| Can be slow with repeated work | Use memoization or iteration if needed |

---

## Recursion vs. Iteration

Both solve the same problem — recursion is often **more readable** for naturally nested problems (trees, folders, fractals), while iteration is more **memory efficient** for simple loops.

## Parameters

* [ Input ](#tab-panel-20)
* [ Output ](#tab-panel-21)

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

temperature

`number`minimum: 0maximum: 1

top\_p

`number`minimum: 0maximum: 1

top\_k

`number`exclusiveMinimum: 0

stream

`boolean`

▶metadata{}

`object`

id

`string`

type

`string`const: message

role

`string`const: assistant

▶content\[\]

`array`

model

`string`

stop\_reason

`string | null`

▶usage{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
