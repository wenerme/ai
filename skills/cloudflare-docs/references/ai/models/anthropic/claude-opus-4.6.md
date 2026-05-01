---
title: Claude Opus 4.6
description: Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.6 

Text Generation • Anthropic • Proxied 

`anthropic/claude-opus-4.6` 

Claude Opus 4.6 is Anthropic's flagship language model built for complex, multi-step work in coding, financial analysis, and legal reasoning. It uses extended thinking to work through complex problems carefully and features a one million token context window.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.6) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

# The Laws of Thermodynamics

Here are the three main laws (along with the "zeroth" law often included):

## Zeroth Law
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. (This establishes the concept of temperature.)

## First Law
Energy cannot be created or destroyed, only transferred or converted from one form to another. In essence, this is the **conservation of energy**. The change in a system's internal energy equals the heat added minus the work done by the system.

## Second Law
The total **entropy** (disorder) of an isolated system can never decrease over time. Heat naturally flows from hotter to cooler objects, not the reverse. This means no process is perfectly efficient, and it establishes the "arrow of time."

## Third Law
As a system's temperature approaches **absolute zero** (0 Kelvin / −273.15°C), its entropy approaches a minimum value. It is impossible to reach absolute zero in a finite number of steps.

---

Together, these laws govern how energy behaves in all physical and chemical processes, from engines to stars to biological systems.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

# Reading a JSON File in Python

Python has a built-in `json` module that makes it easy to read JSON files. Here are the most common approaches:

## Basic Example

```python
import json

# Open and read the JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Step-by-Step Breakdown

| Step | Code | Description |
|------|------|-------------|
| 1 | `import json` | Import the built-in JSON module |
| 2 | `open('data.json', 'r')` | Open the file in **read** mode |
| 3 | `json.load(file)` | Parse the JSON into a Python object |

## Common Scenarios

### Reading into a Dictionary
```python
import json

with open('config.json', 'r') as file:
    config = json.load(file)

# Access values like a normal dictionary
print(config['name'])
print(config['settings']['theme'])
```

### Reading a JSON String (not a file)
```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)  # Note: loads() with an 's'

print(data['name'])  # Output: Alice
```

### Handling Errors
```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError:
    print("Invalid JSON format!")
```

### Specifying Encoding
```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

## Key Differences

| Method | Input | Use Case |
|--------|-------|----------|
| `json.load(file)` | **File object** | Reading from a `.json` file |
| `json.loads(string)` | **String** | Parsing a JSON-formatted string |

## JSON → Python Type Mapping

| JSON Type | Python Type |
|-----------|-------------|
| `object`  | `dict`      |
| `array`   | `list`      |
| `string`  | `str`       |
| `number`  | `int`/`float` |
| `true/false` | `True`/`False` |
| `null`    | `None`      |

> **Tip:** Always use the `with` statement when opening files — it ensures the file is properly closed, even if an error occurs.

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

# Great Stops Between SF & LA

Here are some popular options depending on your route:

## Coastal Route (Highway 1) 🌊
This is the scenic route (~8-10 hours with stops):
- **Half Moon Bay** – Beautiful coastal town, great seafood
- **Santa Cruz** – Boardwalk, surfing, laid-back vibe
- **Monterey/Carmel** – Monterey Bay Aquarium, 17-Mile Drive
- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls
- **San Simeon** – Hearst Castle, elephant seal colony
- **San Luis Obispo** – Charming college town, great food
- **Santa Barbara** – "American Riviera," wine country, beaches
- **Solvang** – Danish-style village with bakeries & windmills

## Inland Route (I-5) 🚗
This is the fastest route (~5-6 hours):
- **Harris Ranch** – Popular rest stop with a restaurant
- **Bakersfield** – Buck Owens' Crystal Palace (country music)
- Not as scenic, but efficient!

## Tips:
- ⛽ Fill up before Big Sur (limited gas stations)
- 📸 Start early for the best light on Highway 1
- 🏨 Consider an overnight stop if taking the coastal route

**Which route interests you more – scenic or fast?**

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

# The Orchid on the Windowsill

Detective Mara Solis had seen her share of crime scenes—enough to know when something didn't belong.

The apartment was almost aggressively ordinary. Beige carpet, IKEA furniture, a stack of unopened mail on the kitchen counter. The victim, Gerald Pryce, age fifty-two, accountant, had lived the kind of life that left barely a thumbprint on the world. Even in death, slumped against his recliner with a single stab wound beneath the ribs, he seemed to be trying not to make a fuss.

But there, on the windowsill above the kitchen sink, sat a black orchid.

Not dark purple. Not deep burgundy masquerading as black under bad lighting. Mara leaned closer, pulling on a fresh glove, and tilted the pot toward the gray morning light filtering through the blinds. The petals were the pure, liquid black of a moonless lake—a color that shouldn't exist in nature.

And as far as the department's botanist would confirm six hours later, it didn't.

"No soil," Mara murmured, peering into the ceramic pot. The orchid's roots wrapped around nothing but a small, folded piece of vellum paper, yellowed at the edges. She extracted it with tweezers and opened it carefully.

A single line, handwritten in red ink:

*He was not the first, and you already know me.*

Mara set the note down. Her hands were steady. Her pulse was not.

She read it again—not because she needed to, but because some part of her recognized the handwriting.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.6',

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

# Understanding Recursion

## The Concept

**Recursion** is a programming technique where a **function calls itself** to solve a problem by breaking it down into smaller, simpler sub-problems. Every recursive function needs:

1. **Base Case** – A condition that stops the recursion (prevents infinite loops).
2. **Recursive Case** – The function calling itself with a *smaller* or *simpler* input.

> **Think of it like Russian nesting dolls** 🪆 — you keep opening a smaller doll until you reach the tiniest one (the base case).

---

## Simple Example: Factorial

The factorial of `n` (written `n!`) is:
`5! = 5 × 4 × 3 × 2 × 1 = 120`

```python
def factorial(n):
    # Base case: stop when n is 0 or 1
    if n <= 1:
        return 1

    # Recursive case: n * factorial of (n-1)
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

---

## How It Works (Call Stack)

```
factorial(5)
│
├─ 5 * factorial(4)
│      ├─ 4 * factorial(3)
│      │      ├─ 3 * factorial(2)
│      │      │      ├─ 2 * factorial(1)
│      │      │      │      └─ returns 1  ← Base case hit!
│      │      │      └─ returns 2 × 1 = 2
│      │      └─ returns 3 × 2 = 6
│      └─ returns 4 × 6 = 24
└─ returns 5 × 24 = 120 ✅
```

---

## Key Takeaways

| Aspect | Description |
|---|---|
| **Base Case** | `if n <= 1: return 1` — stops the recursion |
| **Recursive Case** | `n * factorial(n - 1)` — moves toward the base case |
| **Risk** | Missing a base case → **infinite loop** (stack overflow 💥) |
| **Alternative** | Most recursive solutions can also be written as **loops** (iteration) |

> **Rule of thumb:** If a problem can be defined in terms of a *smaller version of itself*, recursion is a natural fit (e.g., tree traversal, searching, sorting, mathematical sequences).

## Parameters

* [ Input ](#tab-panel-12)
* [ Output ](#tab-panel-13)

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
