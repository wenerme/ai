---
title: Gemini 2.5 Pro
description: Google's most capable Gemini 2.5 model with strong reasoning, thinking support, and a 1M token context window.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 2.5 Pro 

Text Generation • Google • Proxied 

`google/gemini-2.5-pro` 

Google's most capable Gemini 2.5 model with strong reasoning, thinking support, and a 1M token context window.

| Model Info                                                                 |                                                                                                                         |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                        |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                        |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/)                                                                  |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-2.5-pro) |

## Usage

* [ TypeScript ](#tab-panel-454)
* [ cURL ](#tab-panel-455)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-pro',

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

  "model": "google/gemini-2.5-pro",

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

* [ Output ](#tab-panel-460)
* [ Raw response ](#tab-panel-461)

Of course! The three laws of thermodynamics are fundamental principles in physics that describe the relationships between heat, energy, and work.

Here they are, explained from a simple "catchphrase" summary to a more detailed breakdown.

***

### A Quick Summary (The "Gambling" Analogy)

A popular, easy way to remember the laws is to think of them in terms of a game:

1.  **First Law:** You can't win. (You can't get more energy out than you put in.)
2.  **Second Law:** You can't break even. (You can't even get back the energy you put in, in a perfectly useful form.)
3.  **Third Law:** You can't quit the game. (You can't reach absolute zero and stop all energy.)

***

### The Detailed Explanation

Before the three main laws, it's helpful to understand the **Zeroth Law**, which was formulated after the others but is more fundamental.

#### The Zeroth Law of Thermodynamics: Defines Temperature
*   **Simple Statement:** Objects in thermal equilibrium are at the same temperature.
*   **Explanation:** If two systems are each in thermal equilibrium with a third system, then they are also in thermal equilibrium with each other. This law sounds obvious, but it's what makes thermometers work. When you put a thermometer in a cup of coffee, the thermometer and coffee reach thermal equilibrium. If you then use that thermometer on another cup and it gives the same reading, you know both cups are the same temperature without them ever having touched.

---

### 1. The First Law of Thermodynamics: Conservation of Energy

*   **Simple Statement:** Energy cannot be created or destroyed, only converted from one form to another.
*   **Explanation:** This is the thermodynamic version of the law of conservation of energy. It means that the total energy in a closed system is constant. If you add energy to a system (e.g., by heating it), that energy doesn't disappear. It either increases the system's internal energy (making it hotter) or is used by the system to do work on its surroundings (like a piston moving). You can't get free energy out of nothing.
*   **Everyday Example:** When you eat food, the chemical energy stored in the food is converted by your body into thermal energy (to keep you warm) and kinetic energy (to move your muscles). The energy isn't created; it's just transformed.

---

### 2. The Second Law of Thermodynamics: The Increase of Entropy

*   **Simple Statement:** The total entropy (disorder) of the universe always increases over time.
*   **Explanation:** This is arguably the most profound of the laws. It states that natural processes tend to move towards a state of greater disorder or randomness (entropy). Heat will always spontaneously flow from a hotter object to a colder object, never the other way around. This flow increases the overall entropy because the energy becomes more spread out and less "organized." Because of this law, no energy transfer is 100% efficient; some energy is always lost as waste heat, increasing the overall disorder of the universe.
*   **Everyday Example:** A hot cup of coffee will always cool down to room temperature. The concentrated heat (an ordered state) will spread out into the cooler, larger room (a more disordered state). You will never see a room-temperature cup of coffee spontaneously become hot by drawing heat from the air. Similarly, an ice cube melts in a warm room, moving from an ordered crystal structure to a disordered liquid.

---

### 3. The Third Law of Thermodynamics: Absolute Zero is Unreachable

*   **Simple Statement:** The entropy of a system approaches a minimum value as the temperature approaches absolute zero. It is impossible to reach absolute zero in a finite number of steps.
*   **Explanation:** Absolute zero (0 Kelvin or -273.15°C / -459.67°F) is the theoretical temperature at which all particle motion would completely stop. The Third Law states that as you get colder and closer to this temperature, the entropy of a perfect crystal becomes zero. However, the law also implies that it's physically impossible to ever reach absolute zero. Each step you take to cool a system gets you closer, but the effort required to remove the next bit of heat increases exponentially. You can get incredibly close, but you can never take that final step to get there.
*   **Everyday Example:** This law is less intuitive in daily life as it deals with extreme cold. But you can think of it like trying to create a perfect vacuum by pumping all the air out of a container. With each pump, you remove a fraction of the remaining air, so you get closer and closer to a perfect vacuum but never fully achieve it because there will always be *some* molecules left. Reaching absolute zero is a similar process of diminishing returns.

| Law | Simple Statement | Key Concept |
| :--- | :--- | :--- |
| **Zeroth** | Defines temperature. | Thermal Equilibrium |
| **First** | Energy is conserved. | Conservation of Energy |
| **Second**| Disorder (entropy) increases. | Entropy & The Arrow of Time |
| **Third** | Absolute zero is unreachable. | Absolute Zero & Minimum Entropy |

```

{

  "candidates": [

    {

      "avgLogprobs": -0.3830967711048414,

      "content": {

        "parts": [

          {

            "text": "Of course! The three laws of thermodynamics are fundamental principles in physics that describe the relationships between heat, energy, and work.\n\nHere they are, explained from a simple \"catchphrase\" summary to a more detailed breakdown.\n\n***\n\n### A Quick Summary (The \"Gambling\" Analogy)\n\nA popular, easy way to remember the laws is to think of them in terms of a game:\n\n1.  **First Law:** You can't win. (You can't get more energy out than you put in.)\n2.  **Second Law:** You can't break even. (You can't even get back the energy you put in, in a perfectly useful form.)\n3.  **Third Law:** You can't quit the game. (You can't reach absolute zero and stop all energy.)\n\n***\n\n### The Detailed Explanation\n\nBefore the three main laws, it's helpful to understand the **Zeroth Law**, which was formulated after the others but is more fundamental.\n\n#### The Zeroth Law of Thermodynamics: Defines Temperature\n*   **Simple Statement:** Objects in thermal equilibrium are at the same temperature.\n*   **Explanation:** If two systems are each in thermal equilibrium with a third system, then they are also in thermal equilibrium with each other. This law sounds obvious, but it's what makes thermometers work. When you put a thermometer in a cup of coffee, the thermometer and coffee reach thermal equilibrium. If you then use that thermometer on another cup and it gives the same reading, you know both cups are the same temperature without them ever having touched.\n\n---\n\n### 1. The First Law of Thermodynamics: Conservation of Energy\n\n*   **Simple Statement:** Energy cannot be created or destroyed, only converted from one form to another.\n*   **Explanation:** This is the thermodynamic version of the law of conservation of energy. It means that the total energy in a closed system is constant. If you add energy to a system (e.g., by heating it), that energy doesn't disappear. It either increases the system's internal energy (making it hotter) or is used by the system to do work on its surroundings (like a piston moving). You can't get free energy out of nothing.\n*   **Everyday Example:** When you eat food, the chemical energy stored in the food is converted by your body into thermal energy (to keep you warm) and kinetic energy (to move your muscles). The energy isn't created; it's just transformed.\n\n---\n\n### 2. The Second Law of Thermodynamics: The Increase of Entropy\n\n*   **Simple Statement:** The total entropy (disorder) of the universe always increases over time.\n*   **Explanation:** This is arguably the most profound of the laws. It states that natural processes tend to move towards a state of greater disorder or randomness (entropy). Heat will always spontaneously flow from a hotter object to a colder object, never the other way around. This flow increases the overall entropy because the energy becomes more spread out and less \"organized.\" Because of this law, no energy transfer is 100% efficient; some energy is always lost as waste heat, increasing the overall disorder of the universe.\n*   **Everyday Example:** A hot cup of coffee will always cool down to room temperature. The concentrated heat (an ordered state) will spread out into the cooler, larger room (a more disordered state). You will never see a room-temperature cup of coffee spontaneously become hot by drawing heat from the air. Similarly, an ice cube melts in a warm room, moving from an ordered crystal structure to a disordered liquid.\n\n---\n\n### 3. The Third Law of Thermodynamics: Absolute Zero is Unreachable\n\n*   **Simple Statement:** The entropy of a system approaches a minimum value as the temperature approaches absolute zero. It is impossible to reach absolute zero in a finite number of steps.\n*   **Explanation:** Absolute zero (0 Kelvin or -273.15°C / -459.67°F) is the theoretical temperature at which all particle motion would completely stop. The Third Law states that as you get colder and closer to this temperature, the entropy of a perfect crystal becomes zero. However, the law also implies that it's physically impossible to ever reach absolute zero. Each step you take to cool a system gets you closer, but the effort required to remove the next bit of heat increases exponentially. You can get incredibly close, but you can never take that final step to get there.\n*   **Everyday Example:** This law is less intuitive in daily life as it deals with extreme cold. But you can think of it like trying to create a perfect vacuum by pumping all the air out of a container. With each pump, you remove a fraction of the remaining air, so you get closer and closer to a perfect vacuum but never fully achieve it because there will always be *some* molecules left. Reaching absolute zero is a similar process of diminishing returns.\n\n| Law | Simple Statement | Key Concept |\n| :--- | :--- | :--- |\n| **Zeroth** | Defines temperature. | Thermal Equilibrium |\n| **First** | Energy is conserved. | Conservation of Energy |\n| **Second**| Disorder (entropy) increases. | Entropy & The Arrow of Time |\n| **Third** | Absolute zero is unreachable. | Absolute Zero & Minimum Entropy |"

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:08.655096Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-pro",

  "responseId": "sAvxafj9J8aA9LsP4fWlkAs",

  "usageMetadata": {

    "candidatesTokenCount": 1127,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 1127

      }

    ],

    "promptTokenCount": 8,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 8

      }

    ],

    "thoughtsTokenCount": 1631,

    "totalTokenCount": 2766,

    "trafficType": "ON_DEMAND"

  }

}


```

## Examples

**With System Instruction**  — Using a system instruction to set context 

* [ TypeScript ](#tab-panel-456)
* [ cURL ](#tab-panel-457)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-pro',

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

  "model": "google/gemini-2.5-pro",

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

* [ Output ](#tab-panel-462)
* [ Raw response ](#tab-panel-463)

Of course! Reading a JSON file in Python is a common task, and the built-in `json` module makes it very straightforward.

Here is the most common and recommended way to do it.

### The Short & Sweet Answer

Use the `json.load()` function along with a `with open()` context manager.

```python
import json

# The name of your JSON file
filename = 'data.json'

# Use a 'with' statement for safe file handling
with open(filename, 'r') as file:
    # Load the JSON data from the file into a Python object
    data = json.load(file)

# Now 'data' is a Python dictionary (or list) that you can work with
print("Successfully loaded JSON data!")
print(data)

# Example of accessing data
print("\nAccessing specific data:")
print("Name:", data['name'])
print("First skill:", data['skills'][0])
```

---

### Step-by-Step Explanation

Let's break down the code above with a complete, runnable example.

#### 1. Create a Sample JSON File

First, let's create a JSON file to read. Save the following content in a file named `data.json` in the same directory as your Python script.

**`data.json`**
```json
{
  "name": "Alex",
  "id": 12345,
  "is_active": true,
  "email": null,
  "skills": [
    "Python",
    "Data Analysis",
    "Machine Learning"
  ],
  "projects": {
    "project_a": "In Progress",
    "project_b": "Completed"
  }
}
```
> **Note:** JSON requires double quotes `"` for all keys and string values. Single quotes `'` will cause an error.

#### 2. Write the Python Script

Now, let's look at the Python code in detail.

**`read_file.py`**
```python
# Step 1: Import the json module
# This module is built into Python, so no installation is needed.
import json

# Step 2: Open the JSON file for reading
# The 'with' statement is highly recommended because it automatically
# handles closing the file, even if errors occur.
# 'r' stands for "read mode".
with open('data.json', 'r') as f:
    
    # Step 3: Load the data using json.load()
    # The json.load() function reads from a file-like object (f),
    # parses the JSON data, and converts it into a Python object.
    data = json.load(f)

# Step 4: Work with your new Python object
# The 'data' variable now holds the content of the JSON file.
# JSON objects are converted to Python dictionaries.
# JSON arrays are converted to Python lists.

print("The data type is:", type(data))
print("---")
print("Full data:", data)
print("---")

# You can now access the data just like any other Python dictionary
print("User's name:", data['name'])
print("User's skills:", data['skills'])

# Loop through the list of skills
print("\nSkills:")
for skill in data['skills']:
    print("-", skill)
```

#### How JSON Types Map to Python Types

When you use `json.load()`, the data is converted as follows:

| JSON | Python |
| :--- | :--- |
| object | `dict` |
| array | `list` |
| string | `str` |
| number (int) | `int` |
| number (real) | `float` |
| `true` | `True` |
| `false` | `False` |
| `null` | `None` |

---

### Common Issues and Solutions

1.  **`FileNotFoundError`**: This happens if Python can't find your file.
    *   **Solution**: Make sure the file name is spelled correctly and the file is in the same directory as your script. If it's in a different directory, provide the full or relative path (e.g., `'data/my_file.json'`).

2.  **`json.JSONDecodeError`**: This means your file is not valid JSON.
    *   **Solution**: Check your `.json` file for syntax errors. The most common mistakes are:
        *   Using single quotes (`'`) instead of double quotes (`"`).
        *   Having a trailing comma after the last item in an object or list.
        *   Missing commas between elements.

3.  **Character Encoding Issues**: If your file contains special characters (like `é` or `ü`), you might get a `UnicodeDecodeError`.
    *   **Solution**: Specify the encoding when opening the file. UTF-8 is the most common and is standard for JSON.
    ```python
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    ```

### Reading a JSON String vs. a JSON File

It's important to know the difference between `json.load()` and `json.loads()`.

*   `json.load()`: Reads from a **file object**.
*   `json.loads()`: Reads from a **string**. (The 's' stands for "string").

**Example using `json.loads()`:**

```python
import json

json_string = """
{
  "name": "Brenda",
  "city": "New York"
}
"""

# Load data from the string
data = json.loads(json_string)

print(data['city'])  # Output: New York
```

```

{

  "candidates": [

    {

      "avgLogprobs": -0.18925412299094185,

      "content": {

        "parts": [

          {

            "text": "Of course! Reading a JSON file in Python is a common task, and the built-in `json` module makes it very straightforward.\n\nHere is the most common and recommended way to do it.\n\n### The Short & Sweet Answer\n\nUse the `json.load()` function along with a `with open()` context manager.\n\n```python\nimport json\n\n# The name of your JSON file\nfilename = 'data.json'\n\n# Use a 'with' statement for safe file handling\nwith open(filename, 'r') as file:\n    # Load the JSON data from the file into a Python object\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary (or list) that you can work with\nprint(\"Successfully loaded JSON data!\")\nprint(data)\n\n# Example of accessing data\nprint(\"\\nAccessing specific data:\")\nprint(\"Name:\", data['name'])\nprint(\"First skill:\", data['skills'][0])\n```\n\n---\n\n### Step-by-Step Explanation\n\nLet's break down the code above with a complete, runnable example.\n\n#### 1. Create a Sample JSON File\n\nFirst, let's create a JSON file to read. Save the following content in a file named `data.json` in the same directory as your Python script.\n\n**`data.json`**\n```json\n{\n  \"name\": \"Alex\",\n  \"id\": 12345,\n  \"is_active\": true,\n  \"email\": null,\n  \"skills\": [\n    \"Python\",\n    \"Data Analysis\",\n    \"Machine Learning\"\n  ],\n  \"projects\": {\n    \"project_a\": \"In Progress\",\n    \"project_b\": \"Completed\"\n  }\n}\n```\n> **Note:** JSON requires double quotes `\"` for all keys and string values. Single quotes `'` will cause an error.\n\n#### 2. Write the Python Script\n\nNow, let's look at the Python code in detail.\n\n**`read_file.py`**\n```python\n# Step 1: Import the json module\n# This module is built into Python, so no installation is needed.\nimport json\n\n# Step 2: Open the JSON file for reading\n# The 'with' statement is highly recommended because it automatically\n# handles closing the file, even if errors occur.\n# 'r' stands for \"read mode\".\nwith open('data.json', 'r') as f:\n    \n    # Step 3: Load the data using json.load()\n    # The json.load() function reads from a file-like object (f),\n    # parses the JSON data, and converts it into a Python object.\n    data = json.load(f)\n\n# Step 4: Work with your new Python object\n# The 'data' variable now holds the content of the JSON file.\n# JSON objects are converted to Python dictionaries.\n# JSON arrays are converted to Python lists.\n\nprint(\"The data type is:\", type(data))\nprint(\"---\")\nprint(\"Full data:\", data)\nprint(\"---\")\n\n# You can now access the data just like any other Python dictionary\nprint(\"User's name:\", data['name'])\nprint(\"User's skills:\", data['skills'])\n\n# Loop through the list of skills\nprint(\"\\nSkills:\")\nfor skill in data['skills']:\n    print(\"-\", skill)\n```\n\n#### How JSON Types Map to Python Types\n\nWhen you use `json.load()`, the data is converted as follows:\n\n| JSON | Python |\n| :--- | :--- |\n| object | `dict` |\n| array | `list` |\n| string | `str` |\n| number (int) | `int` |\n| number (real) | `float` |\n| `true` | `True` |\n| `false` | `False` |\n| `null` | `None` |\n\n---\n\n### Common Issues and Solutions\n\n1.  **`FileNotFoundError`**: This happens if Python can't find your file.\n    *   **Solution**: Make sure the file name is spelled correctly and the file is in the same directory as your script. If it's in a different directory, provide the full or relative path (e.g., `'data/my_file.json'`).\n\n2.  **`json.JSONDecodeError`**: This means your file is not valid JSON.\n    *   **Solution**: Check your `.json` file for syntax errors. The most common mistakes are:\n        *   Using single quotes (`'`) instead of double quotes (`\"`).\n        *   Having a trailing comma after the last item in an object or list.\n        *   Missing commas between elements.\n\n3.  **Character Encoding Issues**: If your file contains special characters (like `é` or `ü`), you might get a `UnicodeDecodeError`.\n    *   **Solution**: Specify the encoding when opening the file. UTF-8 is the most common and is standard for JSON.\n    ```python\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\n    ```\n\n### Reading a JSON String vs. a JSON File\n\nIt's important to know the difference between `json.load()` and `json.loads()`.\n\n*   `json.load()`: Reads from a **file object**.\n*   `json.loads()`: Reads from a **string**. (The 's' stands for \"string\").\n\n**Example using `json.loads()`:**\n\n```python\nimport json\n\njson_string = \"\"\"\n{\n  \"name\": \"Brenda\",\n  \"city\": \"New York\"\n}\n\"\"\"\n\n# Load data from the string\ndata = json.loads(json_string)\n\nprint(data['city'])  # Output: New York\n```"

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:08.614146Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-pro",

  "responseId": "sAvxaYK-JZmA6tkPxraQ6Qg",

  "usageMetadata": {

    "candidatesTokenCount": 1292,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 1292

      }

    ],

    "promptTokenCount": 20,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 20

      }

    ],

    "thoughtsTokenCount": 1582,

    "totalTokenCount": 2894,

    "trafficType": "ON_DEMAND"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-464)
* [ cURL ](#tab-panel-465)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-pro',

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

  "model": "google/gemini-2.5-pro",

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

            "text": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?"

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

* [ Output ](#tab-panel-466)
* [ Raw response ](#tab-panel-467)

Of course! The drive from San Francisco to Los Angeles offers two very different experiences, depending on

```

{

  "candidates": [

    {

      "avgLogprobs": -5.178282888312089,

      "content": {

        "parts": [

          {

            "text": "Of course! The drive from San Francisco to Los Angeles offers two very different experiences, depending on"

          }

        ],

        "role": "model"

      },

      "finishReason": "MAX_TOKENS"

    }

  ],

  "createTime": "2026-04-28T19:34:34.916567Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-pro",

  "responseId": "ygvxadf4N5TIodAPqsDhyQk",

  "usageMetadata": {

    "candidatesTokenCount": 19,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 19

      }

    ],

    "promptTokenCount": 64,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 64

      }

    ],

    "thoughtsTokenCount": 477,

    "totalTokenCount": 560,

    "trafficType": "ON_DEMAND"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-458)
* [ cURL ](#tab-panel-459)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-pro',

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

  "model": "google/gemini-2.5-pro",

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

* [ Output ](#tab-panel-468)
* [ Raw response ](#tab-panel-469)

The stale, metallic tang of blood was the first

```

{

  "candidates": [

    {

      "avgLogprobs": -7.117010498046875,

      "content": {

        "parts": [

          {

            "text": "The stale, metallic tang of blood was the first"

          }

        ],

        "role": "model"

      },

      "finishReason": "MAX_TOKENS"

    }

  ],

  "createTime": "2026-04-28T19:34:36.902347Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-pro",

  "responseId": "zAvxacuJN-fHodAP8o2RyQ4",

  "usageMetadata": {

    "candidatesTokenCount": 10,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 10

      }

    ],

    "promptTokenCount": 13,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 13

      }

    ],

    "thoughtsTokenCount": 286,

    "totalTokenCount": 309,

    "trafficType": "ON_DEMAND"

  }

}


```

## Parameters

* [ Input ](#tab-panel-470)
* [ Output ](#tab-panel-471)

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
