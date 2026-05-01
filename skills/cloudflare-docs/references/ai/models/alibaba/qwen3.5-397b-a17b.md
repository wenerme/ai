---
title: Qwen 3.5 397B A17B
description: Alibaba's Qwen 3.5 is a 397B-parameter mixture-of-experts model with 17B active parameters, offering strong reasoning capabilities with efficient inference.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  Qwen 3.5 397B A17B 

Text Generation • Alibaba • Proxied 

`alibaba/qwen3.5-397b-a17b` 

Alibaba's Qwen 3.5 is a 397B-parameter mixture-of-experts model with 17B active parameters, offering strong reasoning capabilities with efficient inference.

| Model Info        |                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                        |
| More information  | [link ↗](https://www.alibabacloud.com/en/solutions/generative-ai/qwen)                                                      |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/qwen3.5-397b-a17b) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3.5-397b-a17b',

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

The three laws of thermodynamics describe how energy, heat, and entropy behave in physical systems. Here they are, explained simply:

### 1. The First Law: Conservation of Energy
**The Definition:** Energy cannot be created or destroyed; it can only be transferred or changed from one form to another.
**What it means:** The total amount of energy in the universe is constant. If you put energy into a system (like heating a pot of water), that energy doesn't disappear; it turns into internal energy (hot water) or work (steam moving a lid).
*   **Simple Summary:** "You can't get something for nothing."

### 2. The Second Law: Entropy
**The Definition:** The total entropy (disorder or randomness) of an isolated system can never decrease over time.
**What it means:** Energy naturally flows from a concentrated state to a dispersed state. For example, heat always flows naturally from a hot object to a cold object, never the reverse, unless work is done. Because of this, no machine is 100% efficient; some energy is always lost as waste heat, increasing the disorder of the universe.
*   **Simple Summary:** "You can't even break even." (You always lose some usable energy as heat).

### 3. The Third Law: Absolute Zero
**The Definition:** As the temperature of a system approaches absolute zero, the entropy of the system approaches a constant minimum.
**What it means:** Absolute zero (0 Kelvin or -273.15°C) is the theoretical point where all molecular motion stops. This law implies that it is impossible to cool any substance to exactly absolute zero in a finite number of steps. As you get closer to that temperature, the system becomes perfectly ordered.
*   **Simple Summary:** "You can't get out of the game." (You can never reach absolute zero).

***

### Bonus: The Zeroth Law
Although it was formulated after the first three, it is so fundamental that it was named the "Zeroth" law.
**The Definition:** If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.
**What it means:** This is the law that allows us to use thermometers. If Thermometer A says Object B is 70°F, and Thermometer A says Object C is 70°F, then Object B and Object C are the same temperature.

### The "Gambling" Analogy
Physicist C.P. Snow famously summarized the laws using a gambling analogy:
1.  **First Law:** You can't win (you can't get more energy out than you put in).
2.  **Second Law:** You can't break even (you will always lose some energy to heat/friction).
3.  **Third Law:** You can't leave the table (you can never reach absolute zero to stop entropy).

## Examples

**With System Message**  — Using a system message to set context 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3.5-397b-a17b',

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

# Reading JSON Files in Python

Python's built-in `json` module makes it easy to read and work with JSON data. Here's a comprehensive guide:

## 1. Basic Example: Reading a JSON File

```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

- `json.load()` reads JSON from a file object.
- The `with` statement ensures the file is properly closed after reading.

## 2. Reading JSON from a String

```python
import json

json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)

print(data['name'])  # Output: Alice
```

- `json.loads()` parses JSON from a string.

## 3. With Error Handling

```python
import json

try:
    with open('data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("File not found!")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

## 4. Complete Example with Sample Data

**data.json**
```json
{
    "name": "John",
    "age": 25,
    "city": "New York",
    "hobbies": ["reading", "gaming"]
}
```

**Python Code**
```python
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(f"Name: {data['name']}")
print(f"Age: {data['age']}")
print(f"Hobbies: {', '.join(data['hobbies'])}")
```

## 5. Key Differences: `load()` vs `loads()`

| Method      | Purpose                        |
|-------------|--------------------------------|
| `json.load()`   | Read JSON from a **file**        |
| `json.loads()`  | Read JSON from a **string**      |

## 6. Useful Options

```python
# Pretty-print JSON data
print(json.dumps(data, indent=4))

# Read with specific encoding
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
```

## 7. Working with JSON Arrays

```python
# If your JSON file contains a list
with open('users.json', 'r') as file:
    users = json.load(file)  # Returns a list

for user in users:
    print(user['name'])
```

## Key Points

- ✅ Always use `with open()` for safe file handling
- ✅ Use `json.load()` for files, `json.loads()` for strings
- ✅ JSON objects become Python dictionaries
- ✅ JSON arrays become Python lists
- ✅ Handle exceptions for robust code

This covers the most common scenarios for reading JSON in Python. Let me know if you'd like to learn about writing JSON files too!

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3.5-397b-a17b',

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

The best stops depend heavily on which route you choose. There are two main options:

1.  **Highway 1 (Pacific Coast Highway):** The scenic, iconic route. It takes longer (8–10+ hours driving time) but is much more beautiful.
2.  **Interstate 5 (I-5):** The fastest route (5–6 hours), but mostly flat farmland and less scenic.

Here are the best stops for both routes, ordered from North to South:

### **Option 1: The Scenic Route (Highway 1)**
*Best if you have 2 days or want the classic California experience.*

*   **Half Moon Bay (30 mins from SF):** Great for a quick coffee and a walk on the beach before leaving the Bay Area.
*   **Santa Cruz (1.5 hours from SF):** Visit the **Santa Cruz Boardwalk** for classic amusement park vibes or surf at Steamer Lane.
*   **Monterey & Carmel-by-the-Sea (2.5 hours from SF):**
    *   **Monterey Bay Aquarium:** World-class marine life.
    *   **17-Mile Drive:** A scenic toll road with stunning ocean views.
    *   **Carmel:** Quaint village feel, great for lunch and browsing art galleries.
*   **Big Sur (3.5 hours from SF):** The highlight of the trip.
    *   **Bixby Creek Bridge:** The most photographed bridge in California.
    *   **McWay Falls:** An 80-foot waterfall that drops directly onto the beach.
    *   *Note: Check Caltrans for road closures before you go, as landslides occasionally close this section.*
*   **San Luis Obispo (SLO) (5.5 hours from SF):** A good halfway point to sleep. Visit **Bubblegum Alley** or the Mission San Luis Obispo.
*   **Solvang (6 hours from SF):** A slight detour off the 101, this is a unique Danish-style village with bakeries and windmills.
*   **Santa Barbara (7 hours from SF):** Known as the "American Riviera." Visit the **Old Mission**, the **Courthouse Sunroom** for views, and **Stearns Wharf**.
*   **Malibu (8.5 hours from SF):** You're almost there! Stop at **Santa Monica Pier** or **Venice Beach** to officially mark the end of the trip.

### **Option 2: The Fast Route (I-5 South)**
*Best if you just want to get to LA quickly.*

*   **Gilroy Premium Outlets (1 hour from SF):** Good for shopping and lunch; known as the "Garlic Capital of the World."
*   **Kettleman City (2.5 hours from SF):** Mostly known for another large outlet mall and fast food stops in the middle of the valley.
*   **Six Flags Magic Mountain (5 hours from SF):** Located in Valencia, just north of LA. Great if you like roller coasters and have extra time.

### **Quick Tips for the Trip**
*   **Time:** If you take Highway 1, I highly recommend splitting it into **two days**. Trying to do it in one day means you'll be driving in the dark and miss the views.
*   **Gas:** Gas prices are higher along Highway 1. Fill up in larger towns like Monterey or San Luis Obispo.
*   **Food:** You can't miss an **In-N-Out Burger** along the way (there are many on both routes).
*   **Traffic:** Avoid leaving SF on Friday afternoon or entering LA during rush hour (3 PM–7 PM) if possible.

Do you think you'll prefer the scenic route or the faster one? I can help you plan a schedule based on that!

**Creative Writing**  — Longer completion for creative output 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3.5-397b-a17b',

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

The rain didn't fall so much as it hovered, a wet gray mist that clung to Detective Silas Vane's trench coat like a second skin. He ducked under the yellow tape, the flashing blue and red lights of the cruisers painting the puddles in fractured neon. Inside the apartment, the air was still, smelling faintly of copper and old paper.

The victim lay sprawled across the Persian rug, a man of means who had died in a place of solitude. The uniformed officers had already tagged the obvious: the empty pistol on the desk, the shattered whiskey glass, the note that screamed suicide but felt too practiced to be real.

Vane ignored them all. He knelt beside the body, his knees cracking in the silence. He wasn't looking at the dead man's face, but at his right hand. The fingers were curled tight, locked in rigor mortis around something small and metallic.

"Bag it," Vane said, his voice gravelly from too many cigarettes and not enough sleep.

An officer stepped forward with evidence tweezers, but Vane held up a gloved hand. He leaned in closer. Resting in the palm of the dead man's hand was a die. It was heavy, made of brushed steel, cold to the touch even through the latex of his glove.

Vane frowned. He turned the object slightly with the tip of the tweezers.

One face showed a single dot. The next, two. The third, three. But as he rotated it, the geometry stopped making sense. There were no opposing sides that added up to seven. There wasn't even a standard cube shape; it was slightly asymmetrical, worn smooth on one edge as if it had been rolled a million times.

And then he saw the seventh face.

Standard dice have six. This one had a flat, polished surface where a corner should have been, etched with a symbol Vane didn't recognize: a circle bisected by a jagged line.

He glanced at the sealed windows, then back at the die. It was warm. Not body heat warm, but vibrating with a low, humless energy that tickled the tips of his fingers. Someone hadn't just dropped this; someone had placed it here after the heart stopped beating.

"Change of plans," Vane said, standing up and pocketing the evidence bag without sealing it. "Don't bag the body yet. I think he was waiting for someone to roll again."

**Streaming Response**  — Enable streaming for real-time output 

TypeScript

```

const response = await env.AI.run(

  'alibaba/qwen3.5-397b-a17b',

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

# Understanding Recursion

**Recursion** is a programming technique where a function calls itself to solve a problem. It's like solving a big problem by breaking it down into smaller versions of the same problem.

## Key Components

Every recursive function needs two essential parts:

1. **Base Case** – The condition that stops the recursion (prevents infinite loops)
2. **Recursive Case** – Where the function calls itself with a simpler version of the problem

## Simple Example: Calculating Factorial

The factorial of a number `n` (written as `n!`) is the product of all positive integers up to `n`.

```python
def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)
```

### How It Works: `factorial(4)`

```
factorial(4)
= 4 * factorial(3)
= 4 * (3 * factorial(2))
= 4 * (3 * (2 * factorial(1)))
= 4 * (3 * (2 * 1))    ← Base case reached!
= 4 * (3 * 2)
= 4 * 6
= 24
```

**Visual Flow:**
```
factorial(4) → 4 × factorial(3)
                   ↓
              3 × factorial(2)
                   ↓
              2 × factorial(1)
                   ↓
                   1  ← Base case!
```

## Another Simple Example: Countdown

```python
def countdown(n):
    if n <= 0:  # Base case
        print("Blastoff!")
        return
    
    print(n)  # Do something
    countdown(n - 1)  # Recursive call

countdown(3)
# Output: 3, 2, 1, Blastoff!
```

## When to Use Recursion

✅ **Good for:**
- Tree/graph traversals
- Mathematical sequences (factorial, Fibonacci)
- Problems that naturally break into similar subproblems

⚠️ **Watch out for:**
- Missing base case (causes infinite recursion)
- Too many recursive calls (can cause stack overflow)
- Problems better solved with iteration (for performance)

## Key Takeaway

Think of recursion like Russian nesting dolls – you keep opening smaller dolls until you reach the smallest one (base case), then work your way back out!

## Parameters

* [ Input ](#tab-panel-6)
* [ Output ](#tab-panel-7)

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
