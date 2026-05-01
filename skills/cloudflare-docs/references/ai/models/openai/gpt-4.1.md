---
title: GPT-4.1
description: OpenAI's flagship GPT model for complex tasks with a million-token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT-4.1 

Text Generation • OpenAI • Proxied 

`openai/gpt-4.1` 

OpenAI's flagship GPT model for complex tasks with a million-token context window.

| Model Info                                                                 |                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,047,576 tokens                                                                                                 |
| Terms and License                                                          | [link ↗](https://openai.com/policies/)                                                                           |
| More information                                                           | [link ↗](https://openai.com/index/gpt-4-1/)                                                                      |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-4.1) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

Certainly! The **three laws of thermodynamics** are fundamental principles describing how energy moves and changes in physical systems:

---

**1. First Law of Thermodynamics (Law of Energy Conservation):**  
*Energy cannot be created or destroyed, only converted from one form to another.*

- In other words, the total energy of an isolated system is constant.
- Mathematically:  
  ΔU = Q − W  
  Where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system.

---

**2. Second Law of Thermodynamics (Law of Entropy):**  
*The entropy of an isolated system always increases over time, or remains constant in ideal cases; it never decreases.*

- This law explains why certain processes are irreversible, and why heat flows from hotter to colder bodies naturally.
- It also means that energy transformations are never 100% efficient; some energy is always dispersed as heat.

---

**3. Third Law of Thermodynamics:**  
*As temperature approaches absolute zero (0 K), the entropy of a perfect crystal approaches zero.*

- This suggests it is impossible to reach absolute zero in any finite number of steps.
- At absolute zero, a perfectly ordered crystal would have only one microstate (minimum entropy).

---

**Summary Table:**

| Law        | Main Statement                                             |
|------------|-----------------------------------------------------------|
| First      | Energy is conserved                                       |
| Second     | Entropy increases or remains constant                     |
| Third      | Entropy approaches zero as temperature approaches 0 K     |

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

To read a JSON file in Python, you can use the built-in `json` module. Here’s a simple step-by-step example:

### 1. Import the `json` module

```python
import json
```

### 2. Open and read the JSON file

Assuming your JSON file is named `data.json`:

```python
with open('data.json', 'r') as file:
    data = json.load(file)
```

### 3. Now `data` is a Python object (usually a `dict` or `list`)  
You can use `data` just like any other Python dictionary or list.

### Full Example

Assume `data.json` contains:
```json
{
  "name": "Alice",
  "age": 30,
  "city": "Wonderland"
}
```

Python code:
```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data["name"])  # Output: Alice
print(data["age"])   # Output: 30
```

---

**Recap:**  
- Use `import json`.
- Use `with open(filename) as f: data = json.load(f)`
- Now, `data` contains your JSON data as Python objects!

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

Great! There are two main routes between San Francisco and Los Angeles:

**1. The Scenic Pacific Coast Highway (Highway 1):**  
This is the most beautiful (and slower) option, hugging the coastline with stunning ocean views. Key stops along this route include:

- **Half Moon Bay:** Charming coastal town, great for beaches and breakfast.
- **Santa Cruz:** Fun boardwalk, surf spots, and natural bridges.
- **Monterey:** Monterey Bay Aquarium, Cannery Row, 17-Mile Drive.
- **Carmel-by-the-Sea:** Picturesque town, great art galleries, boutiques, and beaches.
- **Big Sur:** Breathtaking cliffs, Bixby Creek Bridge, McWay Falls, and several state parks for hiking (like Julia Pfeiffer Burns State Park).
- **Hearst Castle (San Simeon):** Grand historic estate you can tour.
- **Cambria & Morro Bay:** Cute small towns, Morro Rock, great seafood.
- **San Luis Obispo:** Lively downtown, Madonna Inn for quirky photos, Mission San Luis Obispo.
- **Pismo Beach:** Famous for its dunes and clam chowder.
- **Santa Barbara:** Gorgeous beaches, Spanish architecture, great lunch stop, wine tasting.
- **Malibu:** Beautiful beaches and coastal views just before you reach LA.

*Tip: This route is best enjoyed over 2-3 days, but you can do portions if you’re on a tighter schedule.*

---

**2. The Fast Inland Route (Highway 101 or I-5):**  
Quicker, but less scenic. For quick but worthwhile stops:

- **Gilroy:** Garlic capital, outlet shopping.
- **Paso Robles:** Renowned wineries and adorable downtown.
- **Santa Barbara:** As above, worth a detour if you take Hwy 101.

If you’re on **I-5**, main stops are limited—Harris Ranch is a classic spot for a meal (and cattle viewing), but scenery is mostly farmland.

---

**Let me know:**
- Do you have 1 day or several for the drive?
- What are your interests (scenery, food, wine, beaches, hiking)?
- Traveling solo, as a couple, or with family/kids?

With a bit more info, I can tailor a perfect list for you!

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

Detective Lila Maren knelt beside the wrought-iron fence, her breath misting in the pale dawn light. The alley was quiet, save for the distant hum of the city waking. She scanned the scuffed cobblestones, expecting the usual—a cigarette butt, perhaps, or a scrap of torn fabric. Instead, nestled in a shallow puddle, she found a single red chess pawn, oddly pristine amid the grime.

Lila lifted it with gloved fingers, turning it over as she studied its glossy sheen. No markings. No blood. Just a chess piece, out of place and glinting like a secret. She frowned, recalling the message scrawled on the victim’s mirror upstairs: “Checkmate.” The game, it seemed, was just beginning.

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-4.1',

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

**Recursion** is a programming technique where a function calls itself to solve a problem. Each time the function calls itself, it breaks the problem down into smaller subproblems. For recursion to stop, a **base case** (or termination condition) is required.

**Simple Example: Calculating Factorial**

The **factorial** of a non-negative integer `n` (written as `n!`) is the product of all positive integers less than or equal to `n`.

**Mathematically:**
- `n! = n × (n-1) × (n-2) × ... × 1`
- By definition, `0! = 1`

**Recursive Definition:**
- If `n == 0`, then `factorial(n) = 1`   (base case)
- If `n > 0`, then `factorial(n) = n × factorial(n-1)`  (recursive case)

**Code Example in Python:**
```python
def factorial(n):
    if n == 0:         # Base case
        return 1
    else:
        return n * factorial(n - 1)   # Recursive call
```

**How it works:**
To compute `factorial(4)`:
- `factorial(4)` returns `4 * factorial(3)`
- `factorial(3)` returns `3 * factorial(2)`
- `factorial(2)` returns `2 * factorial(1)`
- `factorial(1)` returns `1 * factorial(0)`
- `factorial(0)` returns `1` (base case)

So,
- `factorial(1)` = 1 × 1 = 1
- `factorial(2)` = 2 × 1 = 2
- `factorial(3)` = 3 × 2 = 6
- `factorial(4)` = 4 × 6 = 24

**In summary:**  
Recursion is when a function calls itself, and the problem gets divided into smaller parts until reaching a simple, solvable case (the base case).

## Parameters

* [ Input ](#tab-panel-68)
* [ Output ](#tab-panel-69)

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
