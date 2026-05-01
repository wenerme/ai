---
title: Claude Opus 4.7
description: Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Anthropic logo](https://developers.cloudflare.com/_astro/anthropic.DbRqBIjP.svg) 

#  Claude Opus 4.7 

Text Generation • Anthropic • Proxied 

`anthropic/claude-opus-4.7` 

Claude Opus 4.7 is Anthropic's most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6\. It uses adaptive thinking to calibrate reasoning per task and supports a one million token context window at standard pricing.

| Model Info                                                                 |                                                                                                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                            |
| Terms and License                                                          | [link ↗](https://www.anthropic.com/legal/commercial-terms)                                                                  |
| More information                                                           | [link ↗](https://www.anthropic.com/claude/opus)                                                                             |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/anthropic/claude-opus-4.7) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.7',

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

**First Law (Conservation of Energy):**
Energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.
- Often expressed as: ΔU = Q − W (change in internal energy equals heat added minus work done by the system)

**Second Law (Entropy):**
The total entropy (disorder) of an isolated system always increases over time, or remains constant in ideal reversible processes. Heat naturally flows from hot to cold, never the reverse without external work.
- This law explains why perpetual motion machines are impossible and why processes have a preferred direction.

**Third Law (Absolute Zero):**
As a system approaches absolute zero (0 Kelvin or −273.15°C), its entropy approaches a minimum constant value. It's impossible to reach absolute zero in a finite number of steps.
- A perfect crystal at absolute zero would have zero entropy.

**Bonus — Zeroth Law:**
Often mentioned alongside these: if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This is the basis for temperature measurement.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.7',

  {

    messages: [

      {

        role: 'user',

        content: 'How do I read a JSON file in Python?',

      },

    ],

    max_tokens: 1024,

    system: 'You are a helpful coding assistant specializing in Python.',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

# Reading a JSON File in Python

Python has a built-in `json` module that makes reading JSON files straightforward.

## Basic Example

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

## Key Points

- **`json.load()`** reads from a file object and parses JSON into Python objects
- **`json.loads()`** (with an "s") parses JSON from a string
- JSON objects become Python **dictionaries**, and JSON arrays become **lists**

## Complete Example

Suppose you have `data.json`:
```json
{
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "hiking"]
}
```

You can read and access it like this:

```python
import json

with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

print(data['name'])        # Alice
print(data['age'])         # 30
print(data['hobbies'][0])  # reading
```

## Handling Errors

It's good practice to handle potential errors:

```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

## Bonus: Writing JSON

To write data back to a JSON file:

```python
import json

data = {"name": "Bob", "age": 25}

with open('output.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)
```

The `indent=4` argument makes the output nicely formatted. Let me know if you'd like help with a specific JSON structure!

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.7',

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

Great choice to explore along the way! Here are some popular stops, organized by route:

## If Taking Highway 1 / Pacific Coast Highway (scenic, ~9-10 hours driving)

- **Half Moon Bay** – Charming coastal town, great for breakfast
- **Santa Cruz** – Boardwalk, beaches, and redwoods
- **Monterey** – Famous aquarium and Cannery Row
- **Carmel-by-the-Sea** – Quaint village with art galleries
- **Big Sur** – Stunning cliffs, Bixby Bridge, McWay Falls
- **Hearst Castle** (San Simeon) – Historic mansion tours
- **Morro Bay** – Iconic Morro Rock and sea otters
- **Pismo Beach** – Sand dunes and beach town vibes
- **Santa Barbara** – "American Riviera," wine, and Spanish architecture

## If Taking I-5 (fastest, ~5-6 hours)

- **Harris Ranch** – Famous steakhouse and rest stop
- **Kettleman City** – Gas and snacks (not much else!)
- I-5 is efficient but pretty barren—mostly farmland

## If Taking US-101 (middle ground, ~6-7 hours)

- **Gilroy** – Garlic capital, outlet shopping
- **Paso Robles** – Excellent wine country
- **San Luis Obispo** – College town with great food
- **Solvang** – Charming Danish-themed village
- **Santa Barbara** – Worth visiting on this route too

## Questions to help narrow it down:
1. How many days do you have for the trip?
2. Are you more interested in nature, food, history, or beaches?
3. Traveling solo, with family, or friends?

Let me know and I can build a more detailed itinerary!

**Creative Writing with Adaptive Thinking**  — Use adaptive thinking with high effort to steer creative output -- the recommended replacement for the deprecated \`temperature\` parameter. 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.7',

  {

    messages: [

      {

        role: 'user',

        content:

          'Write a short story opening about a detective finding an unusual clue.',

      },

    ],

    max_tokens: 2048,

    thinking: {

      type: 'adaptive',

    },

    output_config: {

      effort: 'high',

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

# The Wrong Kind of Silence

Detective Mara Halloran had worked enough crime scenes to know that rooms had voices. A kitchen where someone had fled mid-breakfast hummed with interruption. A bedroom after a struggle kept the echo of it in the disarranged sheets, the lamp knocked just-so.

But the study at 14 Pearsmont Lane was quiet in a way she didn't recognize.

She stood in the doorway, coffee going cold in her hand, and tried to name it. The body had already been photographed and carried out—Gerald Finch, seventy-two, retired cartographer, found slumped over his desk by the housekeeper at half past six. No forced entry. No wound. The coroner was calling it natural until the tox screen said otherwise.

Mara stepped inside. Bookshelves. A globe. The smell of pipe tobacco clinging to the curtains like an old apology. Everything where a dead man's things ought to be.

Except.

On the desk, beside the blotter where Finch's forehead had rested, someone had laid out seven grains of rice in a perfect, deliberate row.

Not spilled. Not scattered. *Placed.*

She crouched until her eyes were level with the desktop. The grains were evenly spaced, each one turned so its seam faced the same direction—north, if she was reading the window light right. The housekeeper hadn't mentioned them. The first responders hadn't logged them. And Gerald Finch, according to three separate statements, hadn't eaten rice in forty years. Couldn't stand the stuff, his sister had said. Something about the war.

Mara straightened slowly, her knees protesting, and felt the quiet of the room press against her ears.

Seven grains. Facing north. On the desk of a man who drew maps for a living.

"Well, Gerald," she murmured, reaching for her notebook. "Who were you trying to tell?"

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'anthropic/claude-opus-4.7',

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

**Recursion** is a programming concept where a function calls itself to solve a smaller version of the same problem, until it reaches a simple case it can solve directly.

## Two Essential Parts

Every recursive function needs:

1. **Base case** — a condition that stops the recursion (prevents infinite loops)
2. **Recursive case** — the function calling itself with a smaller/simpler input

## Simple Example: Factorial

The factorial of a number `n` (written `n!`) is the product of all positive integers up to `n`.

- `5! = 5 × 4 × 3 × 2 × 1 = 120`

Notice that `5! = 5 × 4!`, and `4! = 4 × 3!`, and so on. This self-similar pattern is perfect for recursion.

```python
def factorial(n):
    # Base case: stop when n is 0 or 1
    if n <= 1:
        return 1
    # Recursive case: n × factorial of (n-1)
    return n * factorial(n - 1)

print(factorial(5))  # Output: 120
```

## How It Works (Step by Step)

When you call `factorial(5)`:

```
factorial(5) = 5 × factorial(4)
             = 5 × (4 × factorial(3))
             = 5 × (4 × (3 × factorial(2)))
             = 5 × (4 × (3 × (2 × factorial(1))))
             = 5 × (4 × (3 × (2 × 1)))     ← base case hit!
             = 120
```

## Real-World Analogy

Think of **Russian nesting dolls** 🪆. To find the smallest doll, you open one, find another inside, open that, find another... until finally you reach the tiniest doll that doesn't open. That "tiniest doll" is your base case.

## Key Takeaway

Recursion is elegant for problems that can be broken into **smaller versions of themselves** — like traversing trees, navigating folders, or solving puzzles like the Tower of Hanoi. Just remember: **always include a base case**, or your program will crash with a stack overflow!

## Parameters

* [ Input ](#tab-panel-14)
* [ Output ](#tab-panel-15)

▶messages\[\]

`array`required

max\_tokens

`number`requiredexclusiveMinimum: 0

system

`string`

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
