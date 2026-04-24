---
title: Gemini 3.1 Pro
description: Google's most intelligent Gemini model with improved reasoning, a medium thinking level, and a 1M token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-174)
* [ Output ](#tab-panel-175)

```

{

    "contents": [

        {

            "role": "user",

            "parts": [

                {

                    "text": "What are the three laws of thermodynamics?"

                }

            ]

        }

    ]

}


```

Explain Code

```

{

    "text": "The laws of thermodynamics are the fundamental principles that describe how energy moves and changes within the universe. While the prompt asks for the \"three\" laws, there are actually four (scientists later added a \"Zeroth\" law). \n\nHere is a breakdown of the three main laws, plus the bonus Zeroth law, explained in both scientific terms and plain English.\n\n### 1. The First Law: The Law of Conservation of Energy\n*   **The Science:** Energy cannot be created or destroyed in an isolated system; it can only change forms. The change in a system's internal energy is equal to the heat added to the system minus the work done by the system.\n*   **Plain English:** You can’t get something for nothing. Energy just trades places or changes its outfit. \n*   **Everyday Example:** When you turn on a lightbulb, electrical energy isn't destroyed; it is transformed into light energy and heat energy. When you eat an apple, your body converts the chemical energy in the food into kinetic energy so you can move.\n\n### 2. The Second Law: The Law of Entropy\n*   **The Science:** The total entropy (a measure of disorder, randomness, or chaotic energy) of an isolated system will always increase over time. Furthermore, heat will always flow spontaneously from a hotter object to a colder one, never the other way around. \n*   **Plain English:** Things naturally degrade and become more disorganized over time. Because some energy is always lost as unusable heat when it changes forms, no process is 100% efficient. \n*   **Everyday Example:** If you leave a hot cup of coffee on a table, it will naturally cool down as its heat spreads into the room. It will never spontaneously gather heat from the room to make itself boiling hot again. Similarly, a tidy room will naturally become messy over time unless you expend energy (do work) to clean it.\n\n### 3. The Third Law: Absolute Zero\n*   **The Science:** As the temperature of a system approaches absolute zero (0 Kelvin, or -273.15°C / -459.67°F), the entropy of the system approaches a constant minimum. \n*   **Plain English:** Absolute zero is the coldest possible temperature, where all molecular and atomic movement completely stops. This law states that it is physically impossible to actually reach absolute zero because doing so would require an infinite amount of work.\n*   **Everyday Example:** Imagine a bustling crowd of people (molecules) moving around. As the room gets colder, they slow down. At absolute zero, every single person would be perfectly frozen in place. \n\n---\n\n### *Bonus: The Zeroth Law (Thermal Equilibrium)*\nScientists realized this principle was so fundamental that it needed to precede the First, Second, and Third laws—hence, the \"Zeroth\" law.\n*   **The Science:** If System A is in thermal equilibrium (the same temperature) with System B, and System B is in thermal equilibrium with System C, then System A is in thermal equilibrium with System C.\n*   **Plain English:** If two things are the same temperature as a third thing, they are all the same temperature. \n*   **Everyday Example:** This is why thermometers work. If a thermometer is the same temperature as a room, and you are the same temperature as the room, you are the same temperature as the thermometer.\n\n### The \"Gambling\" Summary\nA famous and humorous way physicists remember the laws of thermodynamics is by comparing the universe to a rigged casino game:\n*   **1st Law:** *You can’t win.* (You cannot create energy out of nothing).\n*   **2nd Law:** *You can’t break even.* (You always lose some energy to heat/entropy).\n*   **3rd Law:** *You can’t quit the game.* (You can never reach absolute zero)."

}


```

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-176)
* [ Output ](#tab-panel-177)

```

{

    "contents": [

        {

            "role": "user",

            "parts": [

                {

                    "text": "How do I read a JSON file in Python?"

                }

            ]

        }

    ],

    "systemInstruction": {

        "parts": [

            {

                "text": "You are a helpful coding assistant specializing in Python."

            }

        ]

    },

    "generationConfig": {

        "temperature": 0.3

    }

}


```

Explain Code

```

{

    "text": "To read a JSON file in Python, you can use the built-in `json` module. \n\nHere is the most common and standard way to do it:\n\n### Basic Example\n\nAssuming you have a file named `data.json`, here is how you read it:\n\n```python\nimport json\n\n# Open the file in read mode\nwith open('data.json', 'r', encoding='utf-8') as file:\n    # Load the JSON data into a Python dictionary\n    data = json.load(file)\n\n# Now you can use 'data' like a normal Python dictionary\nprint(data)\n```\n\n### How it works:\n1. **`import json`**: Imports Python's built-in JSON library.\n2. **`with open(...) as file:`**: Opens the file safely. Using `with` ensures that the file is automatically closed after it is read, even if an error occurs. Adding `encoding='utf-8'` is a best practice to prevent errors with special characters.\n3. **`json.load(file)`**: Reads the file and converts the JSON data into the corresponding Python object (usually a dictionary or a list).\n\n---\n\n### Advanced Example (with Error Handling)\n\nIf you want to write robust code, it is a good idea to handle potential errors, such as the file not existing or the JSON being formatted incorrectly:\n\n```python\nimport json\n\nfile_path = 'data.json'\n\ntry:\n    with open(file_path, 'r', encoding='utf-8') as file:\n        data = json.load(file)\n        print(\"Successfully read JSON data!\")\n        \nexcept FileNotFoundError:\n    print(f\"Error: The file {file_path} was not found.\")\nexcept json.JSONDecodeError:\n    print(f\"Error: The file {file_path} does not contain valid JSON.\")\n```\n\n### A Quick Note: `load()` vs `loads()`\n* Use **`json.load()`** (no 's') when reading directly from a **file**.\n* Use **`json.loads()`** (with an 's' for string) if you are reading JSON from a **string variable** in your code."

}


```

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-180)
* [ Output ](#tab-panel-181)

```

{

    "contents": [

        {

            "role": "user",

            "parts": [

                {

                    "text": "I need help planning a road trip from San Francisco to Los Angeles."

                }

            ]

        },

        {

            "role": "model",

            "parts": [

                {

                    "text": "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"

                }

            ]

        },

        {

            "role": "user",

            "parts": [

                {

                    "text": "Yes, what are some good places to stop?"

                }

            ]

        }

    ],

    "generationConfig": {

        "maxOutputTokens": 500

    }

}


```

Explain Code

```

{

    "text": "The best stops really depend on which route you decide to take! There are three"

}


```

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

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-178)
* [ Output ](#tab-panel-179)

```

{

    "contents": [

        {

            "role": "user",

            "parts": [

                {

                    "text": "Write a short story opening about a detective finding an unusual clue."

                }

            ]

        }

    ],

    "generationConfig": {

        "temperature": 0.8,

        "maxOutputTokens": 300

    }

}


```

Explain Code

```

{

    "text": "The air in Elias Vance’s apartment smelled of stale copper"

}


```

## Parameters

* [ Input ](#tab-panel-184)
* [ Output ](#tab-panel-185)

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

## API Schemas

* [ Input ](#tab-panel-182)
* [ Output ](#tab-panel-183)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "contents": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "role": {

            "type": "string",

            "enum": [

              "user",

              "model"

            ]

          },

          "parts": {

            "type": "array",

            "items": {

              "type": "object",

              "properties": {

                "text": {

                  "type": "string"

                }

              },

              "additionalProperties": {}

            }

          }

        },

        "required": [

          "parts"

        ],

        "additionalProperties": {}

      }

    },

    "systemInstruction": {

      "type": "object",

      "properties": {

        "parts": {

          "type": "array",

          "items": {

            "type": "object",

            "properties": {

              "text": {

                "type": "string"

              }

            },

            "additionalProperties": {}

          }

        }

      },

      "required": [

        "parts"

      ],

      "additionalProperties": {}

    },

    "generationConfig": {

      "type": "object",

      "properties": {

        "temperature": {

          "type": "number"

        },

        "topP": {

          "type": "number"

        },

        "topK": {

          "type": "number"

        },

        "maxOutputTokens": {

          "type": "number"

        },

        "candidateCount": {

          "type": "number"

        },

        "stopSequences": {

          "type": "array",

          "items": {

            "type": "string"

          }

        },

        "responseMimeType": {

          "type": "string"

        }

      },

      "additionalProperties": {}

    },

    "safetySettings": {

      "type": "array",

      "items": {

        "type": "object",

        "properties": {

          "category": {

            "type": "string"

          },

          "threshold": {

            "type": "string"

          }

        },

        "required": [

          "category",

          "threshold"

        ],

        "additionalProperties": {}

      }

    },

    "tools": {

      "type": "array",

      "items": {}

    },

    "toolConfig": {}

  },

  "required": [

    "contents"

  ],

  "additionalProperties": {}

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "candidates": {

      "type": "array",

      "items": {}

    },

    "usageMetadata": {

      "type": "object",

      "properties": {

        "promptTokenCount": {

          "type": "number"

        },

        "candidatesTokenCount": {

          "type": "number"

        },

        "totalTokenCount": {

          "type": "number"

        }

      },

      "additionalProperties": {}

    },

    "modelVersion": {

      "type": "string"

    }

  },

  "additionalProperties": {}

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
