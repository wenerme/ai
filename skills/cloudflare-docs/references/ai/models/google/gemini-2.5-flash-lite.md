---
title: Gemini 2.5 Flash Lite
description: Google's lightest and most cost-efficient Gemini 2.5 model for high-throughput tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Gemini 2.5 Flash Lite 

Text Generation • Google • Proxied 

`google/gemini-2.5-flash-lite` 

Google's lightest and most cost-efficient Gemini 2.5 model for high-throughput tasks.

| Model Info                                                                 |                                                                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 1,000,000 tokens                                                                                                               |
| Terms and License                                                          | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                               |
| More information                                                           | [link ↗](https://deepmind.google/technologies/gemini/)                                                                         |
| Pricing                                                                    | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-2.5-flash-lite) |

## Usage

* [ TypeScript ](#tab-panel-418)
* [ cURL ](#tab-panel-419)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash-lite',

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

  "model": "google/gemini-2.5-flash-lite",

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

* [ Output ](#tab-panel-424)
* [ Raw response ](#tab-panel-425)

The three laws of thermodynamics are fundamental principles that describe the behavior of energy and matter. Here they are:

1.  **The Zeroth Law of Thermodynamics:**
    *   **Statement:** If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.
    *   **In simpler terms:** This law essentially defines the concept of temperature. If object A is the same temperature as object B, and object B is the same temperature as object C, then object A must also be the same temperature as object C. It allows us to use thermometers to measure temperature, as they achieve thermal equilibrium with the object being measured.

2.  **The First Law of Thermodynamics (Conservation of Energy):**
    *   **Statement:** Energy cannot be created or destroyed, only transferred or changed from one form to another. In a closed system, the total energy remains constant.
    *   **In simpler terms:** This is the law of conservation of energy. It means that the amount of energy in the universe is fixed. You can't get energy out of nowhere, and you can't make energy disappear. It can be converted, for example, from chemical energy in fuel to heat and kinetic energy in a car engine, but the total amount of energy stays the same.
    *   **Mathematical representation:** $\Delta U = Q - W$
        *   $\Delta U$ is the change in internal energy of the system.
        *   $Q$ is the heat added to the system.
        *   $W$ is the work done by the system.

3.  **The Second Law of Thermodynamics (Entropy):**
    *   **Statement:** In any isolated system, the total entropy (a measure of disorder or randomness) can only increase over time, or remain constant in ideal cases where the system is in a steady state or undergoing a reversible process. It never decreases.
    *   **In simpler terms:** This law explains why certain processes happen spontaneously and others don't. It's often described as "things tend to get messier." Heat naturally flows from hotter objects to colder objects, never the other way around spontaneously. Engines are never 100% efficient because some energy is always lost as unusable heat, increasing the overall entropy of the universe.
    *   **Implications:**
        *   It dictates the direction of spontaneous processes.
        *   It explains why perpetual motion machines of the second kind (which would convert all heat into work without any losses) are impossible.
        *   It suggests that the universe is heading towards a state of maximum entropy, often referred to as "heat death."

These three laws are fundamental to understanding how energy works in everything from chemical reactions and engines to living organisms and the universe as a whole.

```

{

  "candidates": [

    {

      "avgLogprobs": -0.2047232930570739,

      "content": {

        "parts": [

          {

            "text": "The three laws of thermodynamics are fundamental principles that describe the behavior of energy and matter. Here they are:\n\n1.  **The Zeroth Law of Thermodynamics:**\n    *   **Statement:** If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.\n    *   **In simpler terms:** This law essentially defines the concept of temperature. If object A is the same temperature as object B, and object B is the same temperature as object C, then object A must also be the same temperature as object C. It allows us to use thermometers to measure temperature, as they achieve thermal equilibrium with the object being measured.\n\n2.  **The First Law of Thermodynamics (Conservation of Energy):**\n    *   **Statement:** Energy cannot be created or destroyed, only transferred or changed from one form to another. In a closed system, the total energy remains constant.\n    *   **In simpler terms:** This is the law of conservation of energy. It means that the amount of energy in the universe is fixed. You can't get energy out of nowhere, and you can't make energy disappear. It can be converted, for example, from chemical energy in fuel to heat and kinetic energy in a car engine, but the total amount of energy stays the same.\n    *   **Mathematical representation:** $\\Delta U = Q - W$\n        *   $\\Delta U$ is the change in internal energy of the system.\n        *   $Q$ is the heat added to the system.\n        *   $W$ is the work done by the system.\n\n3.  **The Second Law of Thermodynamics (Entropy):**\n    *   **Statement:** In any isolated system, the total entropy (a measure of disorder or randomness) can only increase over time, or remain constant in ideal cases where the system is in a steady state or undergoing a reversible process. It never decreases.\n    *   **In simpler terms:** This law explains why certain processes happen spontaneously and others don't. It's often described as \"things tend to get messier.\" Heat naturally flows from hotter objects to colder objects, never the other way around spontaneously. Engines are never 100% efficient because some energy is always lost as unusable heat, increasing the overall entropy of the universe.\n    *   **Implications:**\n        *   It dictates the direction of spontaneous processes.\n        *   It explains why perpetual motion machines of the second kind (which would convert all heat into work without any losses) are impossible.\n        *   It suggests that the universe is heading towards a state of maximum entropy, often referred to as \"heat death.\"\n\nThese three laws are fundamental to understanding how energy works in everything from chemical reactions and engines to living organisms and the universe as a whole."

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:41.622271Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash-lite",

  "responseId": "0Qvxab_9Jc-R9LsPkdy1uAo",

  "usageMetadata": {

    "candidatesTokenCount": 586,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 586

      }

    ],

    "promptTokenCount": 8,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 8

      }

    ],

    "totalTokenCount": 594,

    "trafficType": "ON_DEMAND"

  }

}


```

## Examples

**With System Instruction**  — Using a system instruction to set context 

* [ TypeScript ](#tab-panel-420)
* [ cURL ](#tab-panel-421)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash-lite',

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

  "model": "google/gemini-2.5-flash-lite",

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

* [ Output ](#tab-panel-426)
* [ Raw response ](#tab-panel-427)

Reading a JSON file in Python is a straightforward process thanks to the built-in `json` module. Here's a breakdown of how to do it, along with explanations and examples:

**The Core Concept**

JSON (JavaScript Object Notation) is a lightweight data-interchange format. Python's `json` module provides functions to:

*   **`json.load()`**: Reads a JSON document from a file-like object and parses it into a Python object (dictionaries, lists, strings, numbers, booleans, and `None`).
*   **`json.loads()`**: Reads a JSON document from a string and parses it into a Python object.

Since you're asking about reading from a file, `json.load()` is the function you'll primarily use.

**Steps to Read a JSON File**

1.  **Import the `json` module:**
    ```python
    import json
    ```

2.  **Open the JSON file:** You need to open the file in read mode (`'r'`). It's best practice to use a `with` statement, which ensures the file is automatically closed even if errors occur.
    ```python
    with open('your_file.json', 'r') as f:
        # File operations will go here
    ```
    Replace `'your_file.json'` with the actual path to your JSON file.

3.  **Load the JSON data:** Use `json.load()` to read the content from the opened file object and convert it into a Python data structure.
    ```python
    with open('your_file.json', 'r') as f:
        data = json.load(f)
    ```

**Example**

Let's assume you have a JSON file named `data.json` with the following content:

```json
{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    {"title": "Math", "credits": 3},
    {"title": "Science", "credits": 4}
  ],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
}
```

Here's the Python code to read this file:

```python
import json

try:
    with open('data.json', 'r') as f:
        data = json.load(f)

    # Now 'data' is a Python dictionary
    print(f"Name: {data['name']}")
    print(f"Age: {data['age']}")
    print(f"Is Student: {data['isStudent']}")
    print("Courses:")
    for course in data['courses']:
        print(f"  - {course['title']} ({course['credits']} credits)")
    print(f"City: {data['address']['city']}")

except FileNotFoundError:
    print("Error: The file 'data.json' was not found.")
except json.JSONDecodeError:
    print("Error: Could not decode JSON from the file. Please check its format.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

**Explanation of the Example:**

*   **`import json`**: Imports the necessary module.
*   **`with open('data.json', 'r') as f:`**: Opens `data.json` in read mode. The file object is assigned to the variable `f`.
*   **`data = json.load(f)`**: Reads the entire content of the file `f` and parses it. The resulting Python object (in this case, a dictionary) is stored in the `data` variable.
*   **Accessing Data**: You can then access the data using standard Python dictionary and list indexing:
    *   `data['name']` accesses the value associated with the "name" key.
    *   `data['courses']` accesses the list of courses.
    *   `data['courses'][0]` accesses the first course dictionary.
    *   `data['courses'][0]['title']` accesses the title of the first course.
*   **Error Handling**: The `try...except` block is crucial for robust code.
    *   `FileNotFoundError`: Catches the case where `data.json` doesn't exist.
    *   `json.JSONDecodeError`: Catches errors if the file's content is not valid JSON.
    *   `Exception`: A general catch-all for any other unexpected errors.

**Reading JSON from a String**

If you have JSON data as a string (e.g., from an API response), you'd use `json.loads()`:

```python
import json

json_string = """
{
  "product": "Laptop",
  "price": 1200.50,
  "inStock": true
}
"""

try:
    data = json.loads(json_string)
    print(f"Product: {data['product']}")
    print(f"Price: ${data['price']:.2f}")
    print(f"In Stock: {data['inStock']}")
except json.JSONDecodeError:
    print("Error: Could not decode JSON from the string.")
```

**Key Considerations:**

*   **File Encoding:** By default, `open()` uses the system's default encoding. If your JSON file uses a different encoding (like UTF-8, which is common), you should specify it:
    ```python
    with open('your_file.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    ```
*   **JSON Structure:** The `json.load()` function will convert JSON data types to their Python equivalents:
    *   JSON objects (`{}`) become Python dictionaries (`dict`).
    *   JSON arrays (`[]`) become Python lists (`list`).
    *   JSON strings (`"..."`) become Python strings (`str`).
    *   JSON numbers (integers and floats) become Python integers (`int`) or floats (`float`).
    *   JSON booleans (`true`, `false`) become Python booleans (`True`, `False`).
    *   JSON `null` becomes Python `None`.
*   **Error Handling is Essential:** Always include error handling to gracefully manage situations where the file is missing or contains invalid JSON.

By following these steps, you can effectively read and work with JSON data in your Python applications.

```

{

  "candidates": [

    {

      "avgLogprobs": -0.05239303652533901,

      "content": {

        "parts": [

          {

            "text": "Reading a JSON file in Python is a straightforward process thanks to the built-in `json` module. Here's a breakdown of how to do it, along with explanations and examples:\n\n**The Core Concept**\n\nJSON (JavaScript Object Notation) is a lightweight data-interchange format. Python's `json` module provides functions to:\n\n*   **`json.load()`**: Reads a JSON document from a file-like object and parses it into a Python object (dictionaries, lists, strings, numbers, booleans, and `None`).\n*   **`json.loads()`**: Reads a JSON document from a string and parses it into a Python object.\n\nSince you're asking about reading from a file, `json.load()` is the function you'll primarily use.\n\n**Steps to Read a JSON File**\n\n1.  **Import the `json` module:**\n    ```python\n    import json\n    ```\n\n2.  **Open the JSON file:** You need to open the file in read mode (`'r'`). It's best practice to use a `with` statement, which ensures the file is automatically closed even if errors occur.\n    ```python\n    with open('your_file.json', 'r') as f:\n        # File operations will go here\n    ```\n    Replace `'your_file.json'` with the actual path to your JSON file.\n\n3.  **Load the JSON data:** Use `json.load()` to read the content from the opened file object and convert it into a Python data structure.\n    ```python\n    with open('your_file.json', 'r') as f:\n        data = json.load(f)\n    ```\n\n**Example**\n\nLet's assume you have a JSON file named `data.json` with the following content:\n\n```json\n{\n  \"name\": \"Alice\",\n  \"age\": 30,\n  \"isStudent\": false,\n  \"courses\": [\n    {\"title\": \"Math\", \"credits\": 3},\n    {\"title\": \"Science\", \"credits\": 4}\n  ],\n  \"address\": {\n    \"street\": \"123 Main St\",\n    \"city\": \"Anytown\"\n  }\n}\n```\n\nHere's the Python code to read this file:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as f:\n        data = json.load(f)\n\n    # Now 'data' is a Python dictionary\n    print(f\"Name: {data['name']}\")\n    print(f\"Age: {data['age']}\")\n    print(f\"Is Student: {data['isStudent']}\")\n    print(\"Courses:\")\n    for course in data['courses']:\n        print(f\"  - {course['title']} ({course['credits']} credits)\")\n    print(f\"City: {data['address']['city']}\")\n\nexcept FileNotFoundError:\n    print(\"Error: The file 'data.json' was not found.\")\nexcept json.JSONDecodeError:\n    print(\"Error: Could not decode JSON from the file. Please check its format.\")\nexcept Exception as e:\n    print(f\"An unexpected error occurred: {e}\")\n```\n\n**Explanation of the Example:**\n\n*   **`import json`**: Imports the necessary module.\n*   **`with open('data.json', 'r') as f:`**: Opens `data.json` in read mode. The file object is assigned to the variable `f`.\n*   **`data = json.load(f)`**: Reads the entire content of the file `f` and parses it. The resulting Python object (in this case, a dictionary) is stored in the `data` variable.\n*   **Accessing Data**: You can then access the data using standard Python dictionary and list indexing:\n    *   `data['name']` accesses the value associated with the \"name\" key.\n    *   `data['courses']` accesses the list of courses.\n    *   `data['courses'][0]` accesses the first course dictionary.\n    *   `data['courses'][0]['title']` accesses the title of the first course.\n*   **Error Handling**: The `try...except` block is crucial for robust code.\n    *   `FileNotFoundError`: Catches the case where `data.json` doesn't exist.\n    *   `json.JSONDecodeError`: Catches errors if the file's content is not valid JSON.\n    *   `Exception`: A general catch-all for any other unexpected errors.\n\n**Reading JSON from a String**\n\nIf you have JSON data as a string (e.g., from an API response), you'd use `json.loads()`:\n\n```python\nimport json\n\njson_string = \"\"\"\n{\n  \"product\": \"Laptop\",\n  \"price\": 1200.50,\n  \"inStock\": true\n}\n\"\"\"\n\ntry:\n    data = json.loads(json_string)\n    print(f\"Product: {data['product']}\")\n    print(f\"Price: ${data['price']:.2f}\")\n    print(f\"In Stock: {data['inStock']}\")\nexcept json.JSONDecodeError:\n    print(\"Error: Could not decode JSON from the string.\")\n```\n\n**Key Considerations:**\n\n*   **File Encoding:** By default, `open()` uses the system's default encoding. If your JSON file uses a different encoding (like UTF-8, which is common), you should specify it:\n    ```python\n    with open('your_file.json', 'r', encoding='utf-8') as f:\n        data = json.load(f)\n    ```\n*   **JSON Structure:** The `json.load()` function will convert JSON data types to their Python equivalents:\n    *   JSON objects (`{}`) become Python dictionaries (`dict`).\n    *   JSON arrays (`[]`) become Python lists (`list`).\n    *   JSON strings (`\"...\"`) become Python strings (`str`).\n    *   JSON numbers (integers and floats) become Python integers (`int`) or floats (`float`).\n    *   JSON booleans (`true`, `false`) become Python booleans (`True`, `False`).\n    *   JSON `null` becomes Python `None`.\n*   **Error Handling is Essential:** Always include error handling to gracefully manage situations where the file is missing or contains invalid JSON.\n\nBy following these steps, you can effectively read and work with JSON data in your Python applications."

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:41.673305Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash-lite",

  "responseId": "0QvxaZmMKdSNq8YPyLuh0AQ",

  "usageMetadata": {

    "candidatesTokenCount": 1438,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 1438

      }

    ],

    "promptTokenCount": 20,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 20

      }

    ],

    "totalTokenCount": 1458,

    "trafficType": "ON_DEMAND"

  }

}


```

**Multi-turn Conversation**  — Continuing a conversation with context 

* [ TypeScript ](#tab-panel-428)
* [ cURL ](#tab-panel-429)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash-lite',

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

  "model": "google/gemini-2.5-flash-lite",

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

* [ Output ](#tab-panel-430)
* [ Raw response ](#tab-panel-431)

Absolutely! The drive from San Francisco to Los Angeles offers a variety of stunning scenery and charming towns. Here are some of the most popular and highly recommended stops, depending on your interests and how much time you have:

**The Classic Coastal Route (Highway 1 - the most scenic, but can be slower):**

This is the iconic drive for a reason! Expect breathtaking ocean views, dramatic cliffs, and charming seaside towns. Be aware that sections of Highway 1 can be prone to closures due to landslides, so always check road conditions before you go (Caltrans is your friend!).

*   **Monterey:**
    *   **Monterey Bay Aquarium:** World-renowned and a must-visit. Plan for at least 2-3 hours.
    *   **Cannery Row:** Historic waterfront street, now filled with shops, restaurants, and hotels.
    *   **Old Fisherman's Wharf:** Great for whale watching tours, seafood, and souvenirs.
    *   **17-Mile Drive (Pebble Beach):** A private toll road with stunning coastal scenery, iconic golf courses, and the Lone Cypress.
*   **Carmel-by-the-Sea:**
    *   **Charming Village:** Wander through art galleries, boutiques, and quaint cottages.
    *   **Carmel Beach:** Beautiful white sand beach, perfect for a stroll.
    *   **Mission San Carlos Borroméo del río Carmelo:** A historic Spanish mission.
*   **Big Sur:** This is the heart of the coastal beauty.
    *   **Bixby Creek Bridge:** An iconic photo opportunity.
    *   **McWay Falls (Julia Pfeiffer Burns State Park):** A waterfall that cascades onto the beach.
    *   **Point Reyes Lighthouse (requires a detour, but worth it for lighthouse lovers):** Dramatic views.
    *   **Hiking trails:** Numerous options for all skill levels.
    *   **Nepenthe:** A famous restaurant with incredible ocean views, perfect for a lunch or drink.
*   **Hearst Castle (San Simeon):**
    *   **Opulent Estate:** A fascinating glimpse into the life of William Randolph Hearst. Book tours in advance, as they often sell out.
*   **Cambria:**
    *   **Moonstone Beach:** Known for its smooth, colorful "moonstones."
    *   

```

{

  "candidates": [

    {

      "avgLogprobs": -0.2926192626953125,

      "content": {

        "parts": [

          {

            "text": "Absolutely! The drive from San Francisco to Los Angeles offers a variety of stunning scenery and charming towns. Here are some of the most popular and highly recommended stops, depending on your interests and how much time you have:\n\n**The Classic Coastal Route (Highway 1 - the most scenic, but can be slower):**\n\nThis is the iconic drive for a reason! Expect breathtaking ocean views, dramatic cliffs, and charming seaside towns. Be aware that sections of Highway 1 can be prone to closures due to landslides, so always check road conditions before you go (Caltrans is your friend!).\n\n*   **Monterey:**\n    *   **Monterey Bay Aquarium:** World-renowned and a must-visit. Plan for at least 2-3 hours.\n    *   **Cannery Row:** Historic waterfront street, now filled with shops, restaurants, and hotels.\n    *   **Old Fisherman's Wharf:** Great for whale watching tours, seafood, and souvenirs.\n    *   **17-Mile Drive (Pebble Beach):** A private toll road with stunning coastal scenery, iconic golf courses, and the Lone Cypress.\n*   **Carmel-by-the-Sea:**\n    *   **Charming Village:** Wander through art galleries, boutiques, and quaint cottages.\n    *   **Carmel Beach:** Beautiful white sand beach, perfect for a stroll.\n    *   **Mission San Carlos Borroméo del río Carmelo:** A historic Spanish mission.\n*   **Big Sur:** This is the heart of the coastal beauty.\n    *   **Bixby Creek Bridge:** An iconic photo opportunity.\n    *   **McWay Falls (Julia Pfeiffer Burns State Park):** A waterfall that cascades onto the beach.\n    *   **Point Reyes Lighthouse (requires a detour, but worth it for lighthouse lovers):** Dramatic views.\n    *   **Hiking trails:** Numerous options for all skill levels.\n    *   **Nepenthe:** A famous restaurant with incredible ocean views, perfect for a lunch or drink.\n*   **Hearst Castle (San Simeon):**\n    *   **Opulent Estate:** A fascinating glimpse into the life of William Randolph Hearst. Book tours in advance, as they often sell out.\n*   **Cambria:**\n    *   **Moonstone Beach:** Known for its smooth, colorful \"moonstones.\"\n    *   "

          }

        ],

        "role": "model"

      },

      "finishReason": "MAX_TOKENS"

    }

  ],

  "createTime": "2026-04-28T19:34:45.059845Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash-lite",

  "responseId": "1QvxacXTA6iaq8YP8M2gkAc",

  "usageMetadata": {

    "candidatesTokenCount": 500,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 500

      }

    ],

    "promptTokenCount": 64,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 64

      }

    ],

    "totalTokenCount": 564,

    "trafficType": "ON_DEMAND"

  }

}


```

**Creative Writing**  — Higher temperature for creative output 

* [ TypeScript ](#tab-panel-422)
* [ cURL ](#tab-panel-423)

TypeScript

```

const response = await env.AI.run(

  'google/gemini-2.5-flash-lite',

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

  "model": "google/gemini-2.5-flash-lite",

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

* [ Output ](#tab-panel-432)
* [ Raw response ](#tab-panel-433)

The air in the cramped apartment hung thick with the scent of stale cigarettes and something vaguely floral, a cloying perfume that did little to mask the metallic tang of dried blood. Detective Miles Corbin, a man whose trench coat seemed permanently etched with the grime of a thousand city streets, surveyed the scene with weary eyes. Another Tuesday, another victim. But this one, a young woman named Clara Bellweather, had left behind more than just a messy end to her life.

Miles knelt beside the overturned coffee table, its polished surface marred by a dark, sticky stain. He’d seen plenty of overturned furniture, plenty of blood. What made him pause, what pricked at his seasoned detective’s intuition, was the object nestled amidst the shattered ceramic mug and scattered papers. It was a single, perfectly preserved peacock feather.

Not just any feather, either. This one shimmered with an iridescent blues and greens, its eye a mesmerizing swirl of sapphire and emerald. It was impossibly vibrant, almost glowing against the drab carpet. Miles had seen exotic pets, he’d even seen a crime scene once that involved a boa constrictor, but never, in all his years, had he encountered a peacock feather at a homicide. And not just a stray one, mind you. This looked…placed. Deliberately. As if the killer, in their haste or their madness, had left behind a calling card of pure, unadulterated strangeness.

```

{

  "candidates": [

    {

      "avgLogprobs": -0.5958368333719545,

      "content": {

        "parts": [

          {

            "text": "The air in the cramped apartment hung thick with the scent of stale cigarettes and something vaguely floral, a cloying perfume that did little to mask the metallic tang of dried blood. Detective Miles Corbin, a man whose trench coat seemed permanently etched with the grime of a thousand city streets, surveyed the scene with weary eyes. Another Tuesday, another victim. But this one, a young woman named Clara Bellweather, had left behind more than just a messy end to her life.\n\nMiles knelt beside the overturned coffee table, its polished surface marred by a dark, sticky stain. He’d seen plenty of overturned furniture, plenty of blood. What made him pause, what pricked at his seasoned detective’s intuition, was the object nestled amidst the shattered ceramic mug and scattered papers. It was a single, perfectly preserved peacock feather.\n\nNot just any feather, either. This one shimmered with an iridescent blues and greens, its eye a mesmerizing swirl of sapphire and emerald. It was impossibly vibrant, almost glowing against the drab carpet. Miles had seen exotic pets, he’d even seen a crime scene once that involved a boa constrictor, but never, in all his years, had he encountered a peacock feather at a homicide. And not just a stray one, mind you. This looked…placed. Deliberately. As if the killer, in their haste or their madness, had left behind a calling card of pure, unadulterated strangeness."

          }

        ],

        "role": "model"

      },

      "finishReason": "STOP"

    }

  ],

  "createTime": "2026-04-28T19:34:46.279307Z",

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "modelVersion": "gemini-2.5-flash-lite",

  "responseId": "1gvxaYuGEZafq8YP873hkQQ",

  "usageMetadata": {

    "candidatesTokenCount": 295,

    "candidatesTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 295

      }

    ],

    "promptTokenCount": 13,

    "promptTokensDetails": [

      {

        "modality": "TEXT",

        "tokenCount": 13

      }

    ],

    "totalTokenCount": 308,

    "trafficType": "ON_DEMAND"

  }

}


```

## Parameters

* [ Input ](#tab-panel-434)
* [ Output ](#tab-panel-435)

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
