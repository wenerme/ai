---
title: Gemini 3.1 Pro
description: Google's most intelligent Gemini model with improved reasoning, a medium thinking level, and a 1M token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 3.1 Pro 

Text Generation • Google • Proxied 

`google/gemini-3.1-pro` 

Google's most intelligent Gemini model with improved reasoning, a medium thinking level, and a 1M token context window.

| Model Info                                                                 |                                                                                                                         |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                        |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                        |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/)                                                                  |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.1-pro) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-pro',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'What are the three laws of thermodynamics?',

          },

        ],

      },

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

The laws of thermodynamics are the fundamental principles that describe how energy moves and changes within the universe. While the prompt asks for the "three" laws, there are actually four (scientists later added a "Zeroth" law). 

Here is a breakdown of the three main laws, plus the bonus Zeroth law, explained in both scientific terms and plain English.

### 1. The First Law: The Law of Conservation of Energy
*   **The Science:** Energy cannot be created or destroyed in an isolated system; it can only change forms. The change in a system's internal energy is equal to the heat added to the system minus the work done by the system.
*   **Plain English:** You can’t get something for nothing. Energy just trades places or changes its outfit. 
*   **Everyday Example:** When you turn on a lightbulb, electrical energy isn't destroyed; it is transformed into light energy and heat energy. When you eat an apple, your body converts the chemical energy in the food into kinetic energy so you can move.

### 2. The Second Law: The Law of Entropy
*   **The Science:** The total entropy (a measure of disorder, randomness, or chaotic energy) of an isolated system will always increase over time. Furthermore, heat will always flow spontaneously from a hotter object to a colder one, never the other way around. 
*   **Plain English:** Things naturally degrade and become more disorganized over time. Because some energy is always lost as unusable heat when it changes forms, no process is 100% efficient. 
*   **Everyday Example:** If you leave a hot cup of coffee on a table, it will naturally cool down as its heat spreads into the room. It will never spontaneously gather heat from the room to make itself boiling hot again. Similarly, a tidy room will naturally become messy over time unless you expend energy (do work) to clean it.

### 3. The Third Law: Absolute Zero
*   **The Science:** As the temperature of a system approaches absolute zero (0 Kelvin, or -273.15°C / -459.67°F), the entropy of the system approaches a constant minimum. 
*   **Plain English:** Absolute zero is the coldest possible temperature, where all molecular and atomic movement completely stops. This law states that it is physically impossible to actually reach absolute zero because doing so would require an infinite amount of work.
*   **Everyday Example:** Imagine a bustling crowd of people (molecules) moving around. As the room gets colder, they slow down. At absolute zero, every single person would be perfectly frozen in place. 

---

### *Bonus: The Zeroth Law (Thermal Equilibrium)*
Scientists realized this principle was so fundamental that it needed to precede the First, Second, and Third laws—hence, the "Zeroth" law.
*   **The Science:** If System A is in thermal equilibrium (the same temperature) with System B, and System B is in thermal equilibrium with System C, then System A is in thermal equilibrium with System C.
*   **Plain English:** If two things are the same temperature as a third thing, they are all the same temperature. 
*   **Everyday Example:** This is why thermometers work. If a thermometer is the same temperature as a room, and you are the same temperature as the room, you are the same temperature as the thermometer.

### The "Gambling" Summary
A famous and humorous way physicists remember the laws of thermodynamics is by comparing the universe to a rigged casino game:
*   **1st Law:** *You can’t win.* (You cannot create energy out of nothing).
*   **2nd Law:** *You can’t break even.* (You always lose some energy to heat/entropy).
*   **3rd Law:** *You can’t quit the game.* (You can never reach absolute zero).

## Examples

**With System Instruction**  — Using a system instruction to set context 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-pro',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'How do I read a JSON file in Python?',

          },

        ],

      },

    ],

    systemInstruction: {

      parts: [

        {

          text: 'You are a helpful coding assistant specializing in Python.',

        },

      ],

    },

    generationConfig: {

      temperature: 0.3,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

To read a JSON file in Python, you can use the built-in `json` module. 

Here is the most common and standard way to do it:

### Basic Example

Assuming you have a file named `data.json`, here is how you read it:

```python
import json

# Open the file in read mode
with open('data.json', 'r', encoding='utf-8') as file:
    # Load the JSON data into a Python dictionary
    data = json.load(file)

# Now you can use 'data' like a normal Python dictionary
print(data)
```

### How it works:
1. **`import json`**: Imports Python's built-in JSON library.
2. **`with open(...) as file:`**: Opens the file safely. Using `with` ensures that the file is automatically closed after it is read, even if an error occurs. Adding `encoding='utf-8'` is a best practice to prevent errors with special characters.
3. **`json.load(file)`**: Reads the file and converts the JSON data into the corresponding Python object (usually a dictionary or a list).

---

### Advanced Example (with Error Handling)

If you want to write robust code, it is a good idea to handle potential errors, such as the file not existing or the JSON being formatted incorrectly:

```python
import json

file_path = 'data.json'

try:
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        print("Successfully read JSON data!")
        
except FileNotFoundError:
    print(f"Error: The file {file_path} was not found.")
except json.JSONDecodeError:
    print(f"Error: The file {file_path} does not contain valid JSON.")
```

### A Quick Note: `load()` vs `loads()`
* Use **`json.load()`** (no 's') when reading directly from a **file**.
* Use **`json.loads()`** (with an 's' for string) if you are reading JSON from a **string variable** in your code.

**Multi-turn Conversation**  — Continuing a conversation with context 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-pro',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'I need help planning a road trip from San Francisco to Los Angeles.',

          },

        ],

      },

      {

        role: 'model',

        parts: [

          {

            text: "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

          },

        ],

      },

      {

        role: 'user',

        parts: [

          {

            text: 'Yes, what are some good places to stop?',

          },

        ],

      },

    ],

    generationConfig: {

      maxOutputTokens: 500,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

The best stops really depend on which route you decide to take! There are three

**Creative Writing**  — Higher temperature for creative output 

TypeScript

```

const response = await env.AI.run(

  'google/gemini-3.1-pro',

  {

    contents: [

      {

        role: 'user',

        parts: [

          {

            text: 'Write a short story opening about a detective finding an unusual clue.',

          },

        ],

      },

    ],

    generationConfig: {

      temperature: 0.8,

      maxOutputTokens: 300,

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

The air in Elias Vance’s apartment smelled of stale copper

## Parameters

* [ Input ](#tab-panel-34)
* [ Output ](#tab-panel-35)

▶contents\[\]

`array`required

▶systemInstruction{}

`object`

▶generationConfig{}

`object`

▶safetySettings\[\]

`array`

▶tools\[\]

`array`

toolConfig

``

▶candidates\[\]

`array`

▶usageMetadata{}

`object`

modelVersion

`string`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
