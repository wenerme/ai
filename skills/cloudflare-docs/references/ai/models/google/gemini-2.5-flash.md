---
title: Gemini 2.5 Flash
description: Google's fast multimodal Gemini 2.5 model with strong reasoning and a 1M token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 2.5 Flash 

Text Generation • Google • Proxied 

`google/gemini-2.5-flash` 

Google's fast multimodal Gemini 2.5 model with strong reasoning and a 1M token context window.

| Model Info                                                                 |                                                                                                                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                          |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                          |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/)                                                                    |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-2.5-flash) |

## Usage

* [ TypeScript ](#tab-panel-400)
* [ cURL ](#tab-panel-401)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash',

  { contents: [{ parts: [{ text: 'What are the three laws of thermodynamics?' }], role: 'user' }] },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/gemini-2.5-flash",

  "input": {

    "contents": [

      {

        "parts": [

          {

            "text": "What are the three laws of thermodynamics?"

          }

        ],

        "role": "user"

      }

    ]

  }

}'


```

* [ Output ](#tab-panel-406)
* [ Raw response ](#tab-panel-407)

The three laws of thermodynamics are fundamental principles that govern how energy is transferred and transformed in physical systems. They are:

1.  **The First Law of Thermodynamics (Law of Conservation of Energy)**
    *   **Statement:** Energy cannot be created or destroyed in an isolated system; it can only be transformed from one form to another.
    *   **Explanation:** This law means that the total amount of energy in the universe remains constant. When energy appears to be "lost," it has merely changed into a different form (e.g., chemical energy into heat, electrical energy into light and heat). Mathematically, for a closed system, it's often expressed as: $\Delta U = Q - W$, where $\Delta U$ is the change in the internal energy of the system, $Q$ is the heat added to the system, and $W$ is the work done *by* the system.

2.  **The Second Law of Thermodynamics (Law of Entropy Increase)**
    *   **Statement:** The total entropy of an isolated system can only increase over time, or remain constant in ideal cases; it never decreases.
    *   **Explanation:** Entropy is a measure of disorder or randomness within a system. This law essentially states that natural processes tend to move towards a state of greater disorder or randomness. For example, a broken glass won't spontaneously reassemble, and heat naturally flows from a hotter object to a colder one, not the other way around. This law also implies that no heat engine can be 100% efficient because some energy will always be lost to increasing the entropy of the surroundings (often as waste heat).

3.  **The Third Law of Thermodynamics**
    *   **Statement:** As a system approaches absolute zero, its entropy approaches a constant minimum value. For a perfect crystal at absolute zero (0 Kelvin or -273.15 °C), the entropy is exactly zero.
    *   **Explanation:** This law provides a fundamental reference point for the measurement of entropy. It means that at absolute zero, all molecular motion would cease, and the system would be in its most ordered possible state (a perfect crystal with no defects). In practice, reaching absolute zero is impossible, as doing so would require an infinite number of steps, each becoming progressively harder.

These three laws are cornerstones of physics and chemistry, explaining a vast range of phenomena from the operation of engines to the direction of chemical reactions and the very evolution of the universe.

```

{

  "candidates": [

    {

      "avgLogprobs": -0.7025290479937804,

      "content": {

        "parts": [

          {

            "text": "The three laws of thermodynamics are fundamental principles that govern how energy is transferred and transformed in physical systems. They are:\n\n1.  **The First Law of Thermodynamics (Law of Conservation of Energy)**\n    *   **Statement:** Energy cannot be created or destroyed in an isolated system; it can only be transformed from one form to another.\n    *   **Explanation:** This law means that the total amount of energy in the universe remains constant. When energy appears to be \"lost,\" it has merely changed into a different form (e.g., chemical energy into heat, electrical energy into light and heat). Mathematically, for a closed system, it's often expressed as: $\\Delta U = Q - W$, where $\\Delta U$ is the change in the internal energy of the system, $Q$ is the heat added to the system, and $W$ is the work done *by* the system.\n\n2.  **The Second Law of Thermodynamics (Law of Entropy Increase)**\n    *   **Statement:** The total entropy of an isolated system can only increase over time, or remain constant in ideal cases; it never decreases.\n    *   **Explanation:** Entropy is a measure of disorder or randomness within a system. This law essentially states that natural processes tend to move towards a state of greater disorder or randomness. For example, a broken glass won't spontaneously reassemble, and heat naturally flows from a hotter object to a colder one, not the other way around. This law also implies that no heat engine can be 100% efficient because some energy will always be lost to increasing the entropy of the surroundings (often as waste heat).\n\n3.  **The Third Law of Thermodynamics**\n    *   **Statement:** As a system approaches absolute zero, its entropy approaches a constant minimum value. For a perfect crystal at absolute zero (0 Kelvin or -273.15 °C), the entropy is exactly zero.\n    *   **Explanation:** This law provides a fundamental reference point for the measurement of entropy. It means that at absolute zero, all molecular motion would cease, and the system would be in its most ordered possible state (a perfect crystal with no defects). In practice, reaching absolute zero is impossible, as doing so would require an infinite number of steps, each becoming progressively harder.\n\nThese three laws are cornerstones of physics and chemistry, explaining a vast range of phenomena from the operation of engines to the direction of chemical reactions and the very evolution of the universe."

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:47.652835Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash",

  "responseId": "1wvxaaPsJ8CG998Pn665-Ag",

  "usageMetadata": {

    "candidatesTokenCount": 515,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 515

      }

    ],

    "promptTokenCount": 8,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 8

      }

    ],

    "thoughtsTokenCount": 1020,

    "totalTokenCount": 1543,

    "trafficType": "ON_DEMAND"

  }

}


```

## Examples

**With System Instruction**  — Using a system instruction to set context 

* [ TypeScript ](#tab-panel-402)
* [ cURL ](#tab-panel-403)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash',

  {

    contents: [{ parts: [{ text: 'How do I read a JSON file in Python?' }], role: 'user' }],

    generationConfig: { temperature: 0.3 },

    systemInstruction: {

      parts: [{ text: 'You are a helpful coding assistant specializing in Python.' }],

    },

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/gemini-2.5-flash",

  "input": {

    "contents": [

      {

        "parts": [

          {

            "text": "How do I read a JSON file in Python?"

          }

        ],

        "role": "user"

      }

    ],

    "generationConfig": {

      "temperature": 0.3

    },

    "systemInstruction": {

      "parts": [

        {

          "text": "You are a helpful coding assistant specializing in Python."

        }

      ]

    }

  }

}'


```

* [ Output ](#tab-panel-408)
* [ Raw response ](#tab-panel-409)

Reading a JSON (JavaScript Object Notation) file in Python is straightforward, thanks to the built-in `json` module.

Here's a step-by-step guide with examples:

---

### 1. The `json` Module

Python's `json` module provides methods for working with JSON data. The two primary methods you'll use for reading are:

*   **`json.load()`**: Reads JSON data from a file-like object (e.g., a file opened with `open()`).
*   **`json.loads()`**: Reads JSON data from a string.

---

### 2. Example: Reading a JSON File (`json.load()`)

This is the most common way to read a JSON file.

**Step 1: Create a sample JSON file**

Let's create a file named `data.json` with the following content:

```json
{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    {"title": "Math", "credits": 3},
    {"title": "Science", "credits": 4}
  ],
  "address": null
}
```

**Step 2: Python code to read the file**

```python
import json

file_path = 'data.json'

try:
    # Open the JSON file in read mode ('r')
    # The 'with' statement ensures the file is properly closed even if errors occur.
    with open(file_path, 'r', encoding='utf-8') as file:
        # Use json.load() to parse the JSON data from the file
        data = json.load(file)

    print("JSON data successfully loaded:")
    print(data)
    print(f"\nType of loaded data: {type(data)}")

    # You can now access the data like a Python dictionary or list
    print(f"Name: {data['name']}")
    print(f"Age: {data['age']}")
    print(f"First course title: {data['courses'][0]['title']}")

except FileNotFoundError:
    print(f"Error: The file '{file_path}' was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from '{file_path}'. Check its format.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")

```

**Explanation:**

1.  **`import json`**: Imports the necessary module.
2.  **`with open(file_path, 'r', encoding='utf-8') as file:`**:
    *   Opens the file specified by `file_path`.
    *   `'r'` indicates read mode.
    *   `encoding='utf-8'` is a good practice, especially if your JSON might contain non-ASCII characters.
    *   The `with` statement is a context manager that ensures the file is automatically closed when the block is exited, even if errors occur.
3.  **`data = json.load(file)`**: This is the core line. It reads the entire content of the `file` object, parses it as JSON, and converts it into a corresponding Python object (usually a dictionary or a list).
4.  **Error Handling**: The `try...except` block is crucial for robust code:
    *   `FileNotFoundError`: Catches the error if the specified file doesn't exist.
    *   `json.JSONDecodeError`: Catches errors if the file content is not valid JSON.
    *   `Exception as e`: Catches any other unexpected errors.

---

### 3. Example: Reading JSON from a String (`json.loads()`)

Sometimes, you might receive JSON data as a string (e.g., from a web API response). In such cases, you use `json.loads()`.

```python
import json

json_string_data = '''
{
  "product": "Laptop",
  "price": 1200.50,
  "inStock": true,
  "features": ["lightweight", "fast processor"]
}
'''

try:
    # Use json.loads() to parse the JSON data from a string
    data_from_string = json.loads(json_string_data)

    print("\nJSON data from string successfully loaded:")
    print(data_from_string)
    print(f"Type of loaded data: {type(data_from_string)}")

    print(f"Product: {data_from_string['product']}")
    print(f"Price: ${data_from_string['price']}")

except json.JSONDecodeError:
    print("Error: Could not decode JSON from the string. Check its format.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

---

### 4. JSON to Python Type Conversion

When `json.load()` or `json.loads()` parses JSON, it converts JSON data types to their corresponding Python types:

| JSON Type     | Python Type     |
| :------------ | :-------------- |
| object        | `dict`          |
| array         | `list`          |
| string        | `str`           |
| number        | `int` or `float` |
| boolean       | `bool`          |
| null          | `None`          |

---

### Best Practices:

*   **Always use `with open(...)`**: It's safer and handles file closing automatically.
*   **Include `encoding='utf-8'`**: This prevents issues with character encoding, especially for international data.
*   **Implement Error Handling**: Use `try...except` blocks to gracefully handle `FileNotFoundError` and `json.JSONDecodeError`.
*   **Understand `load` vs. `loads`**: Use `load` for file objects and `loads` for strings.

```

{

  "candidates": [

    {

      "avgLogprobs": -0.20984612667199337,

      "content": {

        "parts": [

          {

            "text": "Reading a JSON (JavaScript Object Notation) file in Python is straightforward, thanks to the built-in `json` module.\n\nHere's a step-by-step guide with examples:\n\n---\n\n### 1. The `json` Module\n\nPython's `json` module provides methods for working with JSON data. The two primary methods you'll use for reading are:\n\n*   **`json.load()`**: Reads JSON data from a file-like object (e.g., a file opened with `open()`).\n*   **`json.loads()`**: Reads JSON data from a string.\n\n---\n\n### 2. Example: Reading a JSON File (`json.load()`)\n\nThis is the most common way to read a JSON file.\n\n**Step 1: Create a sample JSON file**\n\nLet's create a file named `data.json` with the following content:\n\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"isStudent\": false,\n  \"courses\": [\n    {\"title\": \"Math\", \"credits\": 3},\n    {\"title\": \"Science\", \"credits\": 4}\n  ],\n  \"address\": null\n}\n```\n\n**Step 2: Python code to read the file**\n\n```python\nimport json\n\nfile_path = 'data.json'\n\ntry:\n    # Open the JSON file in read mode ('r')\n    # The 'with' statement ensures the file is properly closed even if errors occur.\n    with open(file_path, 'r', encoding='utf-8') as file:\n        # Use json.load() to parse the JSON data from the file\n        data = json.load(file)\n\n    print(\"JSON data successfully loaded:\")\n    print(data)\n    print(f\"\\nType of loaded data: {type(data)}\")\n\n    # You can now access the data like a Python dictionary or list\n    print(f\"Name: {data['name']}\")\n    print(f\"Age: {data['age']}\")\n    print(f\"First course title: {data['courses'][0]['title']}\")\n\nexcept FileNotFoundError:\n    print(f\"Error: The file '{file_path}' was not found.\")\nexcept json.JSONDecodeError:\n    print(f\"Error: Could not decode JSON from '{file_path}'. Check its format.\")\nexcept Exception as e:\n    print(f\"An unexpected error occurred: {e}\")\n\n```\n\n**Explanation:**\n\n1.  **`import json`**: Imports the necessary module.\n2.  **`with open(file_path, 'r', encoding='utf-8') as file:`**:\n    *   Opens the file specified by `file_path`.\n    *   `'r'` indicates read mode.\n    *   `encoding='utf-8'` is a good practice, especially if your JSON might contain non-ASCII characters.\n    *   The `with` statement is a context manager that ensures the file is automatically closed when the block is exited, even if errors occur.\n3.  **`data = json.load(file)`**: This is the core line. It reads the entire content of the `file` object, parses it as JSON, and converts it into a corresponding Python object (usually a dictionary or a list).\n4.  **Error Handling**: The `try...except` block is crucial for robust code:\n    *   `FileNotFoundError`: Catches the error if the specified file doesn't exist.\n    *   `json.JSONDecodeError`: Catches errors if the file content is not valid JSON.\n    *   `Exception as e`: Catches any other unexpected errors.\n\n---\n\n### 3. Example: Reading JSON from a String (`json.loads()`)\n\nSometimes, you might receive JSON data as a string (e.g., from a web API response). In such cases, you use `json.loads()`.\n\n```python\nimport json\n\njson_string_data = '''\n{\n  \"product\": \"Laptop\",\n  \"price\": 1200.50,\n  \"inStock\": true,\n  \"features\": [\"lightweight\", \"fast processor\"]\n}\n'''\n\ntry:\n    # Use json.loads() to parse the JSON data from a string\n    data_from_string = json.loads(json_string_data)\n\n    print(\"\\nJSON data from string successfully loaded:\")\n    print(data_from_string)\n    print(f\"Type of loaded data: {type(data_from_string)}\")\n\n    print(f\"Product: {data_from_string['product']}\")\n    print(f\"Price: ${data_from_string['price']}\")\n\nexcept json.JSONDecodeError:\n    print(\"Error: Could not decode JSON from the string. Check its format.\")\nexcept Exception as e:\n    print(f\"An unexpected error occurred: {e}\")\n```\n\n---\n\n### 4. JSON to Python Type Conversion\n\nWhen `json.load()` or `json.loads()` parses JSON, it converts JSON data types to their corresponding Python types:\n\n| JSON Type     | Python Type     |\n| :------------ | :-------------- |\n| object        | `dict`          |\n| array         | `list`          |\n| string        | `str`           |\n| number        | `int` or `float` |\n| boolean       | `bool`          |\n| null          | `None`          |\n\n---\n\n### Best Practices:\n\n*   **Always use `with open(...)`**: It's safer and handles file closing automatically.\n*   **Include `encoding='utf-8'`**: This prevents issues with character encoding, especially for international data.\n*   **Implement Error Handling**: Use `try...except` blocks to gracefully handle `FileNotFoundError` and `json.JSONDecodeError`.\n*   **Understand `load` vs. `loads`**: Use `load` for file objects and `loads` for strings."

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:48.848405Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash",

  "responseId": "2AvxaZXkM5mA6tkPxraQ6Qg",

  "usageMetadata": {

    "candidatesTokenCount": 1320,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 1320

      }

    ],

    "promptTokenCount": 20,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 20

      }

    ],

    "thoughtsTokenCount": 1357,

    "totalTokenCount": 2697,

    "trafficType": "ON_DEMAND"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-410)
* [ cURL ](#tab-panel-411)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash',

  {

    contents: [

      {

        parts: [{ text: 'I need help planning a road trip from San Francisco to Los Angeles.' }],

        role: 'user',

      },

      {

        parts: [

          {

            text: "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",

          },

        ],

        role: 'model',

      },

      { parts: [{ text: 'Yes, what are some good places to stop?' }], role: 'user' },

    ],

    generationConfig: { maxOutputTokens: 2048 },

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/gemini-2.5-flash",

  "input": {

    "contents": [

      {

        "parts": [

          {

            "text": "I need help planning a road trip from San Francisco to Los Angeles."

          }

        ],

        "role": "user"

      },

      {

        "parts": [

          {

            "text": "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"

          }

        ],

        "role": "model"

      },

      {

        "parts": [

          {

            "text": "Yes, what are some good places to stop?"

          }

        ],

        "role": "user"

      }

    ],

    "generationConfig": {

      "maxOutputTokens": 2048

    }

  }

}'


```

* [ Output ](#tab-panel-412)
* [ Raw response ](#tab-panel-413)

Okay, you've got two main routes, each with its own character and fantastic stops

```

{

  "candidates": [

    {

      "avgLogprobs": -10.623407151963976,

      "content": {

        "parts": [

          {

            "text": "Okay, you've got two main routes, each with its own character and fantastic stops"

          }

        ],

        "role": "model"

      },

      "finishReason": "MAX_TOKENS"

    }

  ],

  "createTime": "2026-04-28T19:34:57.011971Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash",

  "responseId": "4QvxacNd9bf33w-WuK35Ag",

  "usageMetadata": {

    "candidatesTokenCount": 18,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 18

      }

    ],

    "promptTokenCount": 64,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 64

      }

    ],

    "thoughtsTokenCount": 478,

    "totalTokenCount": 560,

    "trafficType": "ON_DEMAND"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-404)
* [ cURL ](#tab-panel-405)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash',

  {

    contents: [

      {

        parts: [{ text: 'Write a short story opening about a detective finding an unusual clue.' }],

        role: 'user',

      },

    ],

    generationConfig: { maxOutputTokens: 1500, temperature: 0.8 },

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/gemini-2.5-flash",

  "input": {

    "contents": [

      {

        "parts": [

          {

            "text": "Write a short story opening about a detective finding an unusual clue."

          }

        ],

        "role": "user"

      }

    ],

    "generationConfig": {

      "maxOutputTokens": 1500,

      "temperature": 0.8

    }

  }

}'


```

* [ Output ](#tab-panel-414)
* [ Raw response ](#tab-panel-415)

The rain had been a relentless drumbeat against

```

{

  "candidates": [

    {

      "avgLogprobs": -13.157335069444445,

      "content": {

        "parts": [

          {

            "text": "The rain had been a relentless drumbeat against"

          }

        ],

        "role": "model"

      },

      "finishReason": "MAX_TOKENS"

    }

  ],

  "createTime": "2026-04-28T19:35:01.318796Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash",

  "responseId": "5Qvxacy6E6CV9LsP2P_v0Ak",

  "usageMetadata": {

    "candidatesTokenCount": 9,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 9

      }

    ],

    "promptTokenCount": 13,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 13

      }

    ],

    "thoughtsTokenCount": 287,

    "totalTokenCount": 309,

    "trafficType": "ON_DEMAND"

  }

}


```

## Parameters

* [ Input ](#tab-panel-416)
* [ Output ](#tab-panel-417)

▶contents\[\]

`array`required

▶generationConfig{}

`object`

▶safetySettings\[\]

`array`

▶systemInstruction{}

`object`

toolConfig

``

▶tools\[\]

`array`

▶candidates\[\]

`array`

modelVersion

`string`

▶usageMetadata{}

`object`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
