---
title: Qwen 3 Max
description: Alibaba's Qwen 3 Max is a large language model with strong coding, reasoning, and multilingual capabilities, served via DashScope's OpenAI-compatible endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  Qwen 3 Max 

Text Generation • Alibaba • Proxied 

`alibaba/qwen3-max` 

Alibaba's Qwen 3 Max is a large language model with strong coding, reasoning, and multilingual capabilities, served via DashScope's OpenAI-compatible endpoint.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                |
| More information  | [link ↗](https://www.alibabacloud.com/en/solutions/generative-ai/qwen)                                              |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/qwen3-max) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3-max',

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

The three laws of thermodynamics are fundamental principles that describe the behavior of energy and entropy in physical systems:

1. **Zeroth Law of Thermodynamics**:  
   *If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.*  
   This law establishes the concept of temperature and justifies the use of thermometers.

2. **First Law of Thermodynamics** (Law of Energy Conservation):  
   *Energy cannot be created or destroyed in an isolated system; it can only change forms.*  
   Mathematically, this is often expressed as:  
   \[
   \Delta U = Q - W
   \]  
   where \(\Delta U\) is the change in internal energy of the system, \(Q\) is the heat added to the system, and \(W\) is the work done by the system.

3. **Second Law of Thermodynamics**:  
   *The total entropy of an isolated system can never decrease over time; it either increases or remains constant in ideal reversible processes.*  
   This law introduces the concept of irreversibility and explains why certain processes occur spontaneously in one direction (e.g., heat flows from hot to cold).

There is also a **Third Law of Thermodynamics**, which is sometimes included as the fourth in historical contexts but is now standardly recognized as the third:

4. **Third Law of Thermodynamics**:  
   *As the temperature of a system approaches absolute zero, the entropy of the system approaches a constant minimum value.*  
   In practical terms, it implies that absolute zero (0 K) cannot be reached in a finite number of steps.

So, while commonly referred to as “three laws,” modern physics includes **four**—with the Zeroth Law added later for logical completeness, even though it was formulated after the first three.

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3-max',

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

To read a JSON file in Python, you can use the built-in `json` module. Here's the basic approach:

## Basic Example

```python
import json

# Read JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

# Now you can work with your data
print(data)
```

## Step-by-step breakdown:

1. **Import the json module**: `import json`
2. **Open the file**: Use `open()` with mode `'r'` (read mode)
3. **Parse the JSON**: Use `json.load()` to parse the file content into Python objects
4. **Use context manager**: The `with` statement automatically closes the file when done

## Common Data Types After Loading

JSON data gets converted to these Python types:
- JSON object → Python dictionary (`dict`)
- JSON array → Python list (`list`)
- JSON string → Python string (`str`)
- JSON number → Python int or float
- JSON boolean → Python `True` or `False`
- JSON null → Python `None`

## Example with Error Handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
    print("Data loaded successfully!")
    print(data)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError:
    print("Invalid JSON format!")
```

## Reading JSON from a String

If you have JSON as a string (not a file), use `json.loads()` instead:

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)
print(data)  # {'name': 'Alice', 'age': 30}
```

## Specifying Encoding (if needed)

For files with non-UTF-8 encoding:

```python
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

The `json.load()` function handles UTF-8 by default, so you usually don't need to specify encoding unless you're dealing with a different character encoding.

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3-max',

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

Great! The classic route from San Francisco to Los Angeles along the California coast—especially **Highway 1 (Pacific Coast Highway)**—is one of the most scenic drives in the world. While it takes longer than the inland I-5 freeway (about 8–10 hours without stops), it’s absolutely worth it for the views and experiences. Here are some top places to stop, roughly ordered from north to south:

### 🌉 **Half Moon Bay**  
- Just 30 miles south of SF  
- Charming coastal town with beaches, tide pools, and great seafood  
- Stop at **Pillar Point Harbor** or walk the **Coastal Trail**

### 🏞️ **Santa Cruz**  
- Famous for its beach boardwalk (oldest in California!), surfing, and laid-back vibe  
- Visit the **Santa Cruz Beach Boardwalk** or explore **Natural Bridges State Beach**

### 🐬 **Monterey & Carmel-by-the-Sea**  
- **Monterey**: Don’t miss the world-class **Monterey Bay Aquarium** and Cannery Row  
- **Carmel**: Quaint village with art galleries, fairytale cottages, and **Carmel Beach**  
- Optional detour: **17-Mile Drive** through Pebble Beach (toll road with stunning ocean views)

### 🌲 **Big Sur**  
- The crown jewel of the PCH! Dramatic cliffs, redwoods, and ocean vistas  
- Must-stops:  
  - **Bixby Creek Bridge** (iconic photo spot)  
  - **McWay Falls** at Julia Pfeiffer Burns State Park (80-ft waterfall onto a beach!)  
  - **Nepenthe** restaurant for lunch with panoramic views  

> ⚠️ Note: Check road conditions before heading through Big Sur—landslides occasionally close Highway 1.

### 🍷 **San Simeon**  
- Home of **Hearst Castle**, the opulent estate of newspaper magnate William Randolph Hearst  
- Also great for spotting **elephant seals** at the **Piedras Blancas Rookery** just north of town

### 🏖️ **Cambria & Morro Bay**  
- **Cambria**: Cozy seaside village with unique shops and forest-meets-ocean scenery  
- **Morro Bay**: Known for **Morro Rock**, kayaking, and fresh oysters

### 🌴 **San Luis Obispo (SLO)**  
- A relaxed college town with a historic mission, farmers’ market (Thursday nights!), and great food  
- Nearby: **Bubblegum Alley** and **Madonna Inn** (quirky, Instagrammable hotel)

### 🏄 **Pismo Beach**  
- Classic Central Coast surf town with dunes and a long pier  
- Try clam chowder—it’s the “Clam Capital of the World”!

### 🌺 **Santa Barbara**  
- “The American Riviera” with Spanish architecture, palm-lined streets, and wine tasting  
- Stroll **Stearns Wharf**, visit the **Mission Santa Barbara**, or relax on **East Beach**

### 🏙️ **Final Stretch to Los Angeles**  
- From Santa Barbara, you can stay on Highway 1 through **Malibu** (stop at **El Matador Beach** or **Point Dume**)  
- Or hop on US-101 for a quicker arrival into LA

---

### Tips:
- **Allow 2–3 days** if you want to enjoy the stops without rushing  
- **Book lodging in advance**, especially in Big Sur, Carmel, or Santa Barbara  
- **Fill your gas tank**—some stretches (like Big Sur) have limited services  
- **Pack layers**—coastal weather changes fast, even in summer!

Would you like help planning an itinerary based on how many days you have?

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3-max',

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

Rain slicked the cobblestones of Blackwater Lane, turning the gaslight into smears of gold on wet stone. Detective Aris Thorne hunched deeper into his trench coat, the damp wool smell a familiar companion to the city’s usual perfume of coal smoke and despair. Another dead end—literally and figuratively—in the case of the vanished heiress, Elara Vance. The alley reeked of stale beer and something sharper, metallic.

Then he saw it.

Nestled in a puddle near a overflowing gutter, half-submerged but gleaming with unnatural clarity, was a single playing card. Not just any card. The Queen of Hearts. But this one was wrong. Horribly wrong.

The queen’s face wasn’t printed ink. It was *stitched*. Delicate, almost surgical sutures traced her features—a crimson thread for lips, fine black silk for eyes, silver wire forming the curve of a regal brow. And where the heart symbol should be, centered on her chest, was a tiny, perfect keyhole, wrought from what looked like tarnished silver. Rainwater pooled around it, but the stitches remained unnervingly dry, as if repelling the downpour.

Thorne crouched, ignoring the ache in his knees and the cold seeping through his trousers. He didn’t touch it. Not yet. This wasn’t evidence left by accident; it was a message. A challenge. And the meticulous, chilling craftsmanship whispered of a mind far more dangerous than the common cutpurse or jealous rival he’d been chasing. The rain drummed a frantic rhythm on his hat, but the only sound he truly heard was the sudden, icy thrum of his own pulse. The game, it seemed, had just changed its rules.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3-max',

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

**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.

## Key Components of Recursion

1. **Base case**: A condition that stops the recursion (prevents infinite loops)
2. **Recursive case**: The function calls itself with modified arguments that move toward the base case

## Simple Example: Calculating Factorial

The factorial of a number `n` (written as `n!`) is the product of all positive integers from 1 to n.
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- By definition: 0! = 1

### Recursive Implementation

```python
def factorial(n):
    # Base case: stop when n is 0 or 1
    if n <= 1:
        return 1
    
    # Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1)

# Example usage
print(factorial(5))  # Output: 120
```

### How it works step by step:

```
factorial(5)
├── 5 * factorial(4)
    ├── 4 * factorial(3)
        ├── 3 * factorial(2)
            ├── 2 * factorial(1)
                └── returns 1 (base case)
            └── returns 2 * 1 = 2
        └── returns 3 * 2 = 6
    └── returns 4 * 6 = 24
└── returns 5 * 24 = 120
```

## Why Recursion Works

Each recursive call works on a **smaller version** of the original problem until it reaches the simplest case (base case). Then, the results bubble back up to build the final answer.

**Important**: Always ensure your recursive function has a proper base case, otherwise it will run infinitely and cause a stack overflow error!

## Parameters

* [ Input ](#tab-panel-4)
* [ Output ](#tab-panel-5)

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
