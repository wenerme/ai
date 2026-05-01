---
title: Claude Haiku 4.5
description: Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Haiku 4.5 

Text Generation • Anthropic • Proxied 

`anthropic/claude-haiku-4.5` 

Claude Haiku 4.5 delivers similar levels of coding performance at one-third the cost and more than twice the speed of larger models.

| Model Info                                                                 |                                                                                                                              |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 200,000 tokens                                                                                                               |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                   |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/haiku)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-haiku-4.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

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

# The Three Laws of Thermodynamics

## First Law (Conservation of Energy)
Energy cannot be created or destroyed, only converted from one form to another. The total energy input to a system equals the change in internal energy plus the work done by the system.

## Second Law (Entropy)
The entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold objects, not the reverse, and no process can be 100% efficient at converting heat to work.

## Third Law (Absolute Zero)
As temperature approaches absolute zero (0 Kelvin or -273.15°C), the entropy of a perfect crystal approaches zero. It's impossible to reach absolute zero through any finite process.

---

These laws form the foundation of thermodynamics and explain why perpetual motion machines are impossible and why certain processes naturally occur while others don't.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

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

Here are the most common methods:

## 1. **Basic Method (Recommended)**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)

print(data)
```

## 2. **Reading JSON String**
If you have JSON as a string instead:
```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)

print(data)
```

## 3. **With Error Handling**
```python
import json

try:
    with open('file.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError:
    print("Invalid JSON format")
```

## 4. **Pretty Print the Data**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)

print(json.dumps(data, indent=2))
```

## Key Differences
| Method | Use Case |
|--------|----------|
| `json.load()` | Read from a file object |
| `json.loads()` | Parse a JSON string |

## Example
**file.json:**
```json
{
  "name": "Alice",
  "age": 25,
  "city": "New York"
}
```

**Python code:**
```python
import json

with open('file.json', 'r') as file:
    data = json.load(file)
    print(data['name'])  # Output: Alice
```

The `with` statement is recommended because it automatically closes the file when done.

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

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

# Good Stops on the SF to LA Route

**Halfway/Central Coast Options:**
- **San Luis Obispo** - Charming town with a mission, wineries, and Thursday night farmers market
- **Santa Barbara** - Beautiful coastal town with beaches, State Street shopping, and wine tasting
- **Solvang** - Danish village with unique architecture, wineries, and restaurants

**Scenic Detours:**
- **Big Sur** - Stunning coastal cliffs (adds time but worth it for photos)
- **Hearst Castle** - Historic mansion with tours in San Simeon
- **Monterey/Carmel** - Coastal towns with aquariums, beaches, and galleries

**Faster Route Stops:**
- **Salinas** - Agricultural hub, reasonable break point
- **Paso Robles** - Wine country with tasting rooms

**Tips:**
- Plan for 7-8 hours total if you want to stop for a meal and explore
- Big Sur adds 1-2 hours but offers incredible views
- Consider stopping overnight if you want a more relaxed trip

What's your timeline? Are you interested in nature, wine, food, or something else? That would help me narrow down recommendations.

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

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

# The Photograph

Detective Sarah Chen stood in the victim's apartment, her latex gloves snapping softly as she examined the bookshelf for the third time. The case had gone cold within hours—no signs of forced entry, no witnesses, no motive that made sense.

Then she saw it.

Wedged behind a row of paperbacks, barely visible, was a Polaroid photograph. Sarah's breath caught. Not because of what it showed—a lake at sunset, unremarkable—but because of what was written on the back in faded blue ink:

*"The day before everything changed."*

And underneath, a date: twenty-three years ago.

Sarah turned the photo over again, studying the water, the trees, the single figure standing at the shore. The figure's face was deliberately obscured by a smudge of thumb, as if someone had tried to erase it.

She'd been a detective for twelve years. She'd learned that most mysteries had ordinary answers: greed, passion, rage. But something about this photograph—the deliberate hiding place, the cryptic message, the erased face—told her this case was different.

This photograph wasn't evidence of a crime.

It was a warning.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-haiku-4.5',

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

# Recursion Explained

**Recursion** is when a function calls itself to solve smaller instances of the same problem until it reaches a simple base case.

## Key Components

1. **Base Case**: The condition that stops the recursion
2. **Recursive Case**: The function calling itself with a simpler input

## Simple Example: Factorial

Calculate 5! (5 × 4 × 3 × 2 × 1)

```python
def factorial(n):
    # Base case: stop here
    if n == 1:
        return 1
    
    # Recursive case: break problem into smaller piece
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

### How It Works

```
factorial(5)
→ 5 * factorial(4)
  → 4 * factorial(3)
    → 3 * factorial(2)
      → 2 * factorial(1)
        → return 1  [BASE CASE]
      → return 2 * 1 = 2
    → return 3 * 2 = 6
  → return 4 * 6 = 24
→ return 5 * 24 = 120
```

## Real-World Analogy

It's like opening Russian nesting dolls:
- Open a doll → find a smaller doll inside
- Open that doll → find an even smaller one
- Keep going until you reach the tiniest doll (base case)
- Now work backwards: you've reached the smallest piece

## Why Use Recursion?

✅ **Good for**: Problems with naturally recursive structure (trees, nested data, divide-and-conquer)  
⚠️ **Caution**: Can be slow and cause stack overflow if not careful

Recursion is elegant but always ensure you have a clear base case!

## Parameters

* [ Input ](#tab-panel-10)
* [ Output ](#tab-panel-11)

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
