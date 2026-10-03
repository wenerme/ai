---
description: Alibaba's Qwen 3.5 is a 397B-parameter mixture-of-experts model with 17B active parameters, offering strong reasoning capabilities with efficient inference.
title: Qwen 3.5 397B A17B
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.BK31NAJz.svg)

# Qwen 3.5 397B A17B

Text Generation • Alibaba

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/qwen3.5-397b-a17b`

- Third-party
- Zero data retention

Alibaba's Qwen 3.5 is a 397B-parameter mixture-of-experts model with 17B active parameters, offering strong reasoning capabilities with efficient inference.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal) |
| More information | [link ↗](https://www.alibabacloud.com/en/solutions/generative-ai/qwen) |
| Zero data retention | Yes |
| Request formats | Chat Completions, Responses |
| Pricing | <ul><li>Input (per 1M tokens)$0.60</li><li>Output (per 1M tokens)$3.60</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/qwen3.5-397b-a17b',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.5-397b-a17b",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

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
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "The three laws of thermodynamics describe how energy, heat, and entropy behave in physical systems. Here they are, explained simply:\n\n### 1. The First Law: Conservation of Energy\n**The Definition:** Energy cannot be created or destroyed; it can only be transferred or changed from one form to another.\n**What it means:** The total amount of energy in the universe is constant. If you put energy into a system (like heating a pot of water), that energy doesn't disappear; it turns into internal energy (hot water) or work (steam moving a lid).\n*   **Simple Summary:** \"You can't get something for nothing.\"\n\n### 2. The Second Law: Entropy\n**The Definition:** The total entropy (disorder or randomness) of an isolated system can never decrease over time.\n**What it means:** Energy naturally flows from a concentrated state to a dispersed state. For example, heat always flows naturally from a hot object to a cold object, never the reverse, unless work is done. Because of this, no machine is 100% efficient; some energy is always lost as waste heat, increasing the disorder of the universe.\n*   **Simple Summary:** \"You can't even break even.\" (You always lose some usable energy as heat).\n\n### 3. The Third Law: Absolute Zero\n**The Definition:** As the temperature of a system approaches absolute zero, the entropy of the system approaches a constant minimum.\n**What it means:** Absolute zero (0 Kelvin or -273.15°C) is the theoretical point where all molecular motion stops. This law implies that it is impossible to cool any substance to exactly absolute zero in a finite number of steps. As you get closer to that temperature, the system becomes perfectly ordered.\n*   **Simple Summary:** \"You can't get out of the game.\" (You can never reach absolute zero).\n\n***\n\n### Bonus: The Zeroth Law\nAlthough it was formulated after the first three, it is so fundamental that it was named the \"Zeroth\" law.\n**The Definition:** If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.\n**What it means:** This is the law that allows us to use thermometers. If Thermometer A says Object B is 70°F, and Thermometer A says Object C is 70°F, then Object B and Object C are the same temperature.\n\n### The \"Gambling\" Analogy\nPhysicist C.P. Snow famously summarized the laws using a gambling analogy:\n1.  **First Law:** You can't win (you can't get more energy out than you put in).\n2.  **Second Law:** You can't break even (you will always lose some energy to heat/friction).\n3.  **Third Law:** You can't leave the table (you can never reach absolute zero to stop entropy).",
        "reasoning_content": "Here's a thinking process that leads to the suggested answer:\n\n1.  **Analyze the Request:**\n    *   **Topic:** Thermodynamics.\n    *   **Question:** What are the three laws?\n    *   **Goal:** Provide a clear, accurate, and concise explanation of the three laws of thermodynamics.\n\n2.  **Identify the Core Content:**\n    *   *First Law:* Conservation of energy (energy cannot be created or destroyed, only changed).\n    *   *Second Law:* Entropy (disorder increases, heat flows hot to cold, efficiency limits).\n    *   *Third Law:* Absolute zero (entropy approaches a constant minimum as temperature approaches absolute zero).\n    *   *Zeroth Law:* (Optional but good to mention for completeness) Thermal equilibrium.\n\n3.  **Drafting the Explanations (Iterative Process):**\n\n    *   *First Law:*\n        *   *Draft 1:* Energy stays the same.\n        *   *Draft 2:* You can't create energy. It just changes form.\n        *   *Refinement:* Energy cannot be created or destroyed, only transformed or transferred. $\\Delta U = Q - W$.\n        *   *Analogy:* \"You can't win\" (can't get more energy out than you put in).\n\n    *   *Second Law:*\n        *   *Draft 1:* Things get messy. Heat goes to cold.\n        *   *Draft 2:* Entropy always increases. You can't break even.\n        *   *Refinement:* The total entropy of an isolated system always increases over time. Heat naturally flows from hot to cold. Perpetual motion machines are impossible.\n        *   *Analogy:* \"You can't break even\" (you always lose some energy as waste heat).\n\n    *   *Third Law:*\n        *   *Draft 1:* Absolute zero is cold.\n        *   *Draft 2:* At zero Kelvin, entropy stops.\n        *   *Refinement:* As temperature approaches absolute zero, the entropy of a system approaches a constant minimum. It is impossible to reach absolute zero.\n        *   *Analogy:* \"You can't get out of the game\" (you can never reach absolute zero).\n\n4.  **Structuring the Response:**\n    *   **Introduction:** Briefly define thermodynamics (study of heat/energy).\n    *   **The Laws (Numbered):**\n        *   Name of the law.\n        *   Formal definition.\n        *   Simple explanation/implication.\n        *   (Optional but helpful) The \"Gambling\" analogy is a classic way to remember them.\n    *   **Bonus:** Mention the Zeroth Law (since it logically comes first but was discovered later).\n    *   **Conclusion:** Summary sentence.\n\n5.  **Refining the Content (Self-Correction during drafting):**\n    *   *Check:* Did I explain *Entropy* clearly? It's a tricky concept. I should define it as \"disorder\" or \"randomness\" for simplicity, though \"energy dispersal\" is more accurate physically. Let's stick to \"disorder/randomness\" for a general overview but mention energy quality.\n    *   *Check:* Is the math necessary? Maybe include the formula for the First Law ($\\Delta U = Q - W$) but keep it secondary to the text explanation.\n    *   *Check:* Make sure to distinguish between \"isolated system\" and just \"system.\"\n\n6.  **Final Polish (similar to the provided good output):**\n\n    *   *First Law:* Conservation of Energy. \"Energy cannot be created or destroyed...\"\n    *   *Second Law:* Entropy. \"Total entropy of an isolated system can never decrease...\" Mention heat flow.\n    *   *Third Law:* Absolute Zero. \"Entropy approaches a constant value as temperature approaches absolute zero...\"\n\n    *   *The \"Gin Rummy\" Analogy:*\n        1.  You can't win.\n        2.  You can't break even.\n        3.  You can't quit the game.\n\n7.  **Final Output Generation:** (This matches the structured response provided in the good output.)\n    *   *Zeroth Law:* Added as a footnote or brief mention because it's foundational.\n\n8.  **Review against constraints:** The user asked for \"the three laws.\" I will provide the three main ones but briefly acknowledge the Zeroth law for accuracy.\n\n**(Self-Correction Example during the process):** I initially thought about just saying \"Energy is conserved.\" But that's too brief. I need to explain *how* (transformation). For the Second Law, just saying \"Entropy increases\" is confusing to laypeople. I need to add \"heat flows from hot to cold\" or \"energy becomes less useful.\"\n\n9.  **Final Output Construction.** (Proceed to generate the response.)",
        "role": "assistant"
      }
    }
  ],
  "created": 1776471119,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-551fb302-f3c7-927c-879d-7103aaea0479",
  "model": "qwen3.5-397b-a17b",
  "object": "chat.completion",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 1675,
    "completion_tokens_details": {
      "reasoning_tokens": 1056,
      "text_tokens": 1675
    },
    "prompt_tokens": 19,
    "prompt_tokens_details": {
      "text_tokens": 19
    },
    "total_tokens": 1694
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.5-397b-a17b',
  {
    messages: [
      { content: 'You are a helpful coding assistant specializing in Python.', role: 'system' },
      { content: 'How do I read a JSON file in Python?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.5-397b-a17b",
  "messages": [
    {
      "content": "You are a helpful coding assistant specializing in Python.",
      "role": "system"
    },
    {
      "content": "How do I read a JSON file in Python?",
      "role": "user"
    }
  ]
}'
```

````
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
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "# Reading JSON Files in Python\n\nPython's built-in `json` module makes it easy to read and work with JSON data. Here's a comprehensive guide:\n\n## 1. Basic Example: Reading a JSON File\n\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)\n```\n\n- `json.load()` reads JSON from a file object.\n- The `with` statement ensures the file is properly closed after reading.\n\n## 2. Reading JSON from a String\n\n```python\nimport json\n\njson_string = '{\"name\": \"Alice\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data['name'])  # Output: Alice\n```\n\n- `json.loads()` parses JSON from a string.\n\n## 3. With Error Handling\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r') as file:\n        data = json.load(file)\nexcept FileNotFoundError:\n    print(\"File not found!\")\nexcept json.JSONDecodeError as e:\n    print(f\"Invalid JSON: {e}\")\n```\n\n## 4. Complete Example with Sample Data\n\n**data.json**\n```json\n{\n    \"name\": \"John\",\n    \"age\": 25,\n    \"city\": \"New York\",\n    \"hobbies\": [\"reading\", \"gaming\"]\n}\n```\n\n**Python Code**\n```python\nimport json\n\nwith open('data.json', 'r') as file:\n    data = json.load(file)\n\nprint(f\"Name: {data['name']}\")\nprint(f\"Age: {data['age']}\")\nprint(f\"Hobbies: {', '.join(data['hobbies'])}\")\n```\n\n## 5. Key Differences: `load()` vs `loads()`\n\n| Method      | Purpose                        |\n|-------------|--------------------------------|\n| `json.load()`   | Read JSON from a **file**        |\n| `json.loads()`  | Read JSON from a **string**      |\n\n## 6. Useful Options\n\n```python\n# Pretty-print JSON data\nprint(json.dumps(data, indent=4))\n\n# Read with specific encoding\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n```\n\n## 7. Working with JSON Arrays\n\n```python\n# If your JSON file contains a list\nwith open('users.json', 'r') as file:\n    users = json.load(file)  # Returns a list\n\nfor user in users:\n    print(user['name'])\n```\n\n## Key Points\n\n- ✅ Always use `with open()` for safe file handling\n- ✅ Use `json.load()` for files, `json.loads()` for strings\n- ✅ JSON objects become Python dictionaries\n- ✅ JSON arrays become Python lists\n- ✅ Handle exceptions for robust code\n\nThis covers the most common scenarios for reading JSON in Python. Let me know if you'd like to learn about writing JSON files too!",
        "reasoning_content": "This is a straightforward question about reading JSON files in Python. I should provide a clear, practical answer with code examples. Let me cover:\n\n1. The basic method using the json module\n2. Different ways to read JSON (from file, from string)\n3. Error handling\n4. Common use cases\n\nLet me provide a helpful, comprehensive answer with examples.",
        "role": "assistant"
      }
    }
  ],
  "created": 1776471107,
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "id": "chatcmpl-e13707d8-7ad1-9e21-81bb-ada8479d43a5",
  "model": "qwen3.5-397b-a17b",
  "object": "chat.completion",
  "system_fingerprint": null,
  "usage": {
    "completion_tokens": 735,
    "completion_tokens_details": {
      "reasoning_tokens": 76,
      "text_tokens": 735
    },
    "prompt_tokens": 35,
    "prompt_tokens_details": {
      "text_tokens": 35
    },
    "total_tokens": 770
  }
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a conversation with context</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.5-397b-a17b',
  {
    max_completion_tokens: 8192,
    messages: [
      {
        content: 'I need help planning a road trip from San Francisco to Los Angeles.',
        role: 'user',
      },
      {
        content:
          "I'd be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
        role: 'assistant',
      },
      { content: 'Yes, what are some good places to stop?', role: 'user' },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.5-397b-a17b",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "I need help planning a road trip from San Francisco to Los Angeles.",
      "role": "user"
    },
    {
      "content": "I'\''d be happy to help! The drive is about 380 miles and takes roughly 5-6 hours. Would you like suggestions for scenic routes or interesting stops along the way?",
      "role": "assistant"
    },
    {
      "content": "Yes, what are some good places to stop?",
      "role": "user"
    }
  ]
}'
```

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
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "The best stops depend heavily on which route you choose. There are two main options:\n\n1.  **Highway 1 (Pacific Coast Highway):** The scenic, iconic route. It takes longer (8–10+ hours driving time) but is much more beautiful.\n2.  **Interstate 5 (I-5):** The fastest route (5–6 hours), but mostly flat farmland and less scenic.\n\nHere are the best stops for both routes, ordered from North to South:\n\n### **Option 1: The Scenic Route (Highway 1)**\n*Best if you have 2 days or want the classic California experience.*\n\n*   **Half Moon Bay (30 mins from SF):** Great for a quick coffee and a walk on the beach before leaving the Bay Area.\n*   **Santa Cruz (1.5 hours from SF):** Visit the **Santa Cruz Boardwalk** for classic amusement park vibes or surf at Steamer Lane.\n*   **Monterey & Carmel-by-the-Sea (2.5 hours from SF):**\n    *   **Monterey Bay Aquarium:** World-class marine life.\n    *   **17-Mile Drive:** A scenic toll road with stunning ocean views.\n    *   **Carmel:** Quaint village feel, great for lunch and browsing art galleries.\n*   **Big Sur (3.5 hours from SF):** The highlight of the trip.\n    *   **Bixby Creek Bridge:** The most photographed bridge in California.\n    *   **McWay Falls:** An 80-foot waterfall that drops directly onto the beach.\n    *   *Note: Check Caltrans for road closures before you go, as landslides occasionally close this section.*\n*   **San Luis Obispo (SLO) (5.5 hours from SF):** A good halfway point to sleep. Visit **Bubblegum Alley** or the Mission San Luis Obispo.\n*   **Solvang (6 hours from SF):** A slight detour off the 101, this is a unique Danish-style village with bakeries and windmills.\n*   **Santa Barbara (7 hours from SF):** Known as the \"American Riviera.\" Visit the **Old Mission**, the **Courthouse Sunroom** for views, and **Stearns Wharf**.\n*   **Malibu (8.5 hours from SF):** You're almost there! Stop at **Santa Monica Pier** or **Venice Beach** to officially mark the end of the trip.\n\n### **Option 2: The Fast Route (I-5 South)**\n*Best if you just want to get to LA quickly.*\n\n*   **Gilroy Premium Outlets (1 hour from SF):** Good for shopping and lunch; known as the \"Garlic Capital of the World.\"\n*   **Kettleman City (2.5 hours from SF):** Mostly known for another large outlet mall and fast food stops in the middle of the valley.\n*   **Six Flags Magic Mountain (5 hours from SF):** Located in Valencia, just north of LA. Great if you like roller coasters and have extra time.\n\n### **Quick Tips for the Trip**\n*   **Time:** If you take Highway 1, I highly recommend splitting it into **two days**. Trying to do it in one day means you'll be driving in the dark and miss the views.\n*   **Gas:** Gas prices are higher along Highway 1. Fill up in larger towns like Monterey or San Luis Obispo.\n*   **Food:** You can't miss an **In-N-Out Burger** along the way (there are many on both routes).\n*   **Traffic:** Avoid leaving SF on Friday afternoon or entering LA during rush hour (3 PM–7 PM) if possible.\n\nDo you think you'll prefer the scenic route or the faster one? I can help you plan a schedule based on that!",
        "reasoning_content": "Thinking Process:\n\n1.  **Analyze the Request:**\n    *   **Task:** Plan a road trip from San Francisco (SF) to Los Angeles (LA).\n    *   **Specific Question:** \"What are some good places to stop?\"\n    *   **Context:** The user previously asked for help planning the trip, and I confirmed the distance/time and offered route/stop suggestions. Now they want specific stops.\n\n2.  **Identify Key Routes:**\n    *   There are two main routes for SF to LA:\n        *   **I-5 South:** Fastest, inland, mostly agriculture/flat, less scenic.\n        *   **Highway 1 (Pacific Coast Highway - PCH):** Scenic, coastal, slower, more stops, iconic.\n    *   *Decision:* Since the user asked for \"good places to stop,\" they are likely interested in the scenic route (Highway 1) or a mix. I should present options based on the route because the stops differ significantly. I'll focus primarily on Highway 1 as it's the classic \"road trip\" experience, but mention I-5 options for efficiency.\n\n3.  **Brainstorm Stops (Highway 1/PCH):**\n    *   *Half Moon Bay:* Close to SF, beaches, pumpkin season.\n    *   *Santa Cruz:* Boardwalk, surf culture.\n    *   *Monterey/Carmel:* Aquarium, 17-Mile Drive, Cannery Row.\n    *   *Big Sur:* Bixby Bridge, McWay Falls, hiking.\n    *   *San Luis Obispo (SLO):* Bubblegum Alley, Mission.\n    *   *Solvang:* Danish village (slightly inland off the 101).\n    *   *Santa Barbara:* Courthouse, Stearns Wharf, \"American Riviera.\"\n    *   *Malibu:* Beaches, celebrity homes, nearing LA.\n\n4.  **Brainstorm Stops (I-5):**\n    *   *Gilroy:* Garlic capital (outlets).\n    *   *Coalinga:* Pretty much nothing.\n    *   *Kettleman City:* Outlets.\n    *   *Grapevine:* Tejon Pass (scary drive), Lebec.\n    *   *Valencia:* Six Flags.\n    *   *Note:* I-5 is boring. I should emphasize Highway 1 for a \"road trip\" vibe.\n\n5.  **Structure the Response:**\n    *   **Acknowledge the Route Choice:** Crucial because stops depend on the route. Recommend Highway 1 for scenery, I-5 for speed.\n    *   **Categorize Stops:** Group them geographically (North to South) so the user can visualize the flow.\n    *   **Highlight Must-Sees:** Pick the top attractions for each stop.\n    *   **Practical Tips:** Mention driving time, reservations (Big Sur), and best time to travel.\n\n6.  **Drafting the Content (Iterative refinement):**\n    *   *Intro:* Clarify the two main routes.\n    *   *Route 1: Pacific Coast Highway (Highway 1)* - The Scenic Choice.\n        *   Stop 1: Monterey/Carmel (Aquarium, 17-Mile).\n        *   Stop 2: Big Sur (Bixby, McWay Falls). *Warning: Check road conditions.*\n        *   Stop 3: San Luis Obispo (SLO).\n        *   Stop 4: Santa Barbara (Courthouse, Wharf).\n        *   Stop 5: Malibu (Beaches).\n    *   *Route 2: Interstate 5* - The Fast Choice.\n        *   Gilroy Premium Outlets.\n        *   Kettleman City Outlets.\n        *   Six Flags Magic Mountain (near end).\n    *   *Tips:* Check Caltrans for road closures (Big Sur slides are common), book accommodations early, allow 2 days for PCH.\n\n7.  **Refining for Helpfulness:**\n    *   Make sure to mention that Highway 1 is currently open but always check for closures due to landslides.\n    *   Suggest splitting the trip over 2 days if taking PCH.\n    *   Keep the tone enthusiastic and helpful.\n\n8.  **Final Review:** Does this answer the user's question directly? Yes. Is it accurate? Yes. Is it safe advice (regarding road conditions)? Yes.\n\n    *(Self-Correction during drafting)*: I should make sure not to overwhelm them. Keep the list curated. Focus on the \"best\" stops. Also, remind them that Highway 1 takes much longer than I-5.\n\n9.  **Final Output Generation:** (Matches the planned structure).\n    *   Greeting & Route Clarification.\n    *   Highway 1 Stops (North to South).\n    *   I-5 Stops (Briefly).\n    *   Practical Tips.\n\n10. **Post-computation check:** Ensure I don't give outdated info about Big Sur closures. As of my last update, it's generally open but prone to closures. I will advise checking current status.\n\n    *Let's build the response.*\n    *   Start with the route distinction.\n    *   List PCH stops: Half Moon Bay, Santa Cruz, Monterey/Carmel, Big Sur, SLO, Santa Barbara, Malibu.\n    *   List I-5 stops: Gilroy, Kettleman, Valencia.\n    *   Add tips on timing and reservations.\n\n    *Wait, one more thing:* Food recommendations add value. Maybe mention In-N-Out or specific local spots? Keep it general enough to be useful but specific enough to be actionable.\n\n    *Okay, ready to write.*",
        "role": "assistant"
      }
    }
  ],
  "created": 1776471146,
  "gatewayMetadata": {
    "keySource":
... response truncated ...
```

</details>

<details>

<summary>**Creative Writing** — Longer completion for creative output</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.5-397b-a17b',
  {
    max_completion_tokens: 8192,
    messages: [
      {
        content: 'Write a short story opening about a detective finding an unusual clue.',
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.5-397b-a17b",
  "max_completion_tokens": 8192,
  "messages": [
    {
      "content": "Write a short story opening about a detective finding an unusual clue.",
      "role": "user"
    }
  ]
}'
```

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
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "The rain didn't fall so much as it hovered, a wet gray mist that clung to Detective Silas Vane's trench coat like a second skin. He ducked under the yellow tape, the flashing blue and red lights of the cruisers painting the puddles in fractured neon. Inside the apartment, the air was still, smelling faintly of copper and old paper.\n\nThe victim lay sprawled across the Persian rug, a man of means who had died in a place of solitude. The uniformed officers had already tagged the obvious: the empty pistol on the desk, the shattered whiskey glass, the note that screamed suicide but felt too practiced to be real.\n\nVane ignored them all. He knelt beside the body, his knees cracking in the silence. He wasn't looking at the dead man's face, but at his right hand. The fingers were curled tight, locked in rigor mortis around something small and metallic.\n\n\"Bag it,\" Vane said, his voice gravelly from too many cigarettes and not enough sleep.\n\nAn officer stepped forward with evidence tweezers, but Vane held up a gloved hand. He leaned in closer. Resting in the palm of the dead man's hand was a die. It was heavy, made of brushed steel, cold to the touch even through the latex of his glove.\n\nVane frowned. He turned the object slightly with the tip of the tweezers.\n\nOne face showed a single dot. The next, two. The third, three. But as he rotated it, the geometry stopped making sense. There were no opposing sides that added up to seven. There wasn't even a standard cube shape; it was slightly asymmetrical, worn smooth on one edge as if it had been rolled a million times.\n\nAnd then he saw the seventh face.\n\nStandard dice have six. This one had a flat, polished surface where a corner should have been, etched with a symbol Vane didn't recognize: a circle bisected by a jagged line.\n\nHe glanced at the sealed windows, then back at the die. It was warm. Not body heat warm, but vibrating with a low, humless energy that tickled the tips of his fingers. Someone hadn't just dropped this; someone had placed it here after the heart stopped beating.\n\n\"Change of plans,\" Vane said, standing up and pocketing the evidence bag without sealing it. \"Don't bag the body yet. I think he was waiting for someone to roll again.\"",
        "reasoning_content": "Thinking Process:\n\n1.  **Analyze the Request:**\n    *   **Topic:** A detective finding an unusual clue.\n    *   **Format:** Short story opening.\n    *   **Tone:** Implicitly mystery/noir/thriller (given the genre).\n    *   **Goal:** Hook the reader, establish atmosphere, introduce the detective and the clue.\n\n2.  **Brainstorming Core Elements:**\n    *   *Detective:* Needs a name, a vibe (tired, observant, cynical?). Let's go with Elias Thorne. Grizzled, maybe a bit old-school.\n    *   *Setting:* Crime scene. Rain is cliché but effective. Maybe an abandoned place? A library? A high-tech lab? Let's try a cramped, overly warm apartment. Contrast the cold case with the heat.\n    *   *The Clue:* Needs to be \"unusual.\" Not a fingerprint or a shell casing. Something out of place. A living thing? A sound? A smell? An object that shouldn't exist?\n        *   Idea 1: A clock running backwards.\n        *   Idea 2: A bird inside a sealed room.\n        *   Idea 3: A book written in a language that doesn't exist.\n        *   Idea 4: A single, fresh flower in a rotting room.\n        *   Idea 5: A pocket watch filled with sand instead of gears.\n        *   *Selection:* Let's go with something sensory and slightly surreal. A pocket watch filled with sand is good, but maybe too steampunk. How about a sound? No, visual is better for an opening. Let's try a *living* clue in a dead place. A origami bird? No. How about a photograph that changes? Too sci-fi.\n        *   *Revised Selection:* A single, pristine white glove, but it's wet with saltwater, despite being miles from the ocean in a dry season. Or... a key made of ice that hasn't melted.\n        *   *Final Decision:* A music box that plays a tune no one has heard, found in a place where music is forbidden/impossible. Or simpler: A specific, anachronistic object. Let's go with a *pocket watch that ticks backwards*. It implies time manipulation or a specific signature. Actually, let's make it more tangible. A *seed* from a plant extinct for a century, found in the victim's clenched fist.\n\n3.  **Drafting - Scene Setting:**\n    *   Rain against the window.\n    *   Police tape.\n    *   The body (briefly mentioned, don't linger too much, focus on the clue).\n    *   Elias's internal state.\n\n4.  **Drafting - The Discovery:**\n    *   Elias is searching.\n    *   He finds something the uniforms missed.\n    *   The realization of its significance.\n\n5.  **Refining the Prose:**\n    *   Show, don't tell.\n    *   Use sensory details (smell of copper, sound of rain, texture of the object).\n    *   Keep it tight.\n\n6.  **Writing - First Pass (Mental):**\n    Elias stood over the body. It was dead. He looked around. He saw something on the floor. It was a blue marble. But it was warm. He picked it up. It hummed. He knew this meant trouble.\n\n    *Critique:* Too bland. Needs more atmosphere.\n\n7.  **Writing - Second Pass (Closer to final):**\n    The rain hammered the precinct roof. Elias Thorne didn't care. He was at the scene. The victim was slumped in the chair. Elias looked at the desk. Everything was normal except one thing. A single gear. But it was made of wood. Wood doesn't work in watches. He picked it up. It smelled like lavender.\n\n    *Critique:* Better. Let's polish the \"unusual\" aspect. A wooden gear is okay, but let's make it more striking. A *live moth* pinned to the wall with a murder weapon? No. Let's go with the *extinct seed* idea. It implies history and impossibility.\n\n8.  **Finalizing the Concept:**\n    *   Detective: Elias Thorne.\n    *   Scene: A locked room, study.\n    *   Clue: A flower petal that shouldn't exist. Specifically, a *Night-Blooming Cereus* that blooms only once, but it's midday, or a species thought extinct. Let's go with a *blue rose* that isn't dyed. No, let's go with *sand* in a inland house.\n    *   *Wait, I like the \"watch ticking backwards\" idea.* It's classic but effective. Let's twist it. A watch that *doesn't tick*, but breathes. No, too fantasy.\n    *   *Okay, final choice:* A key made of glass, found in a lock of wood. It shouldn't fit, but it does.\n    *   *Actually, let's go with something simpler but eerie.* A photograph of the detective himself, taken at the crime scene, found in the victim's wallet, dated tomorrow.\n    *   *No, keep it grounded.* A single, wet footprint that leads *out* of a sealed room, but the floor is dry everywhere else.\n    *   *Okay, let's settle on:* A pocket watch filled with seawater, found in a desert town.\n    *   *Wait, I'll write about a specific object:* A child's toy soldier, but it's wearing a uniform from a war that never happened.\n\n    *Let's pivot to atmosphere.* The rain, the body, the object.\n    Object: A silver locket. Inside, not a picture, but a coordinate.\n    Object: A matchbook from a club that burned down ten years ago.\n    Object: A single ice cube that won't melt.\n\n    *Let's go with the Ice Cube.* It's visceral.\n\n    *Re-evaluating:* The prompt asks for an \"unusual clue.\"\n    Let's try: A bird. A live canary in a cage, in a house where the owner was allergic and no pets were allowed, singing a specific tune.\n    Actually, I think the *extinct flower* is the strongest visual.\n\n    *Drafting the scene:*\n    Elias Thorne hated rainy nights. The body is in the library. He finds a petal. It's from a Ghost Orchid. They don't grow here. They barely exist.\n\n    *Let's write it.*\n\n9.  **Polishing:**\n    *   Focus on the lighting (flickering bulb).\n    *   The silence vs. the rain.\n    *   Th
... response truncated ...
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.5-397b-a17b',
  {
    messages: [{ content: 'Explain the concept of recursion with a simple example.', role: 'user' }],
    stream: true,
    stream_options: { include_usage: true },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.5-397b-a17b",
  "messages": [
    {
      "content": "Explain the concept of recursion with a simple example.",
      "role": "user"
    }
  ],
  "stream": true,
  "stream_options": {
    "include_usage": true
  }
}'
```

````
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
````

```json
[
  {
    "choices": [
      {
        "delta": {
          "content": null,
          "reasoning_content": "",
          "role": "assistant"
        },
        "finish_reason": null,
        "index": 0,
        "logprobs": null
      }
    ],
    "created": 1776471147,
    "id": "chatcmpl-a04b3264-a267-9868-80d3-bd0ef7353605",
    "model": "qwen3.5-397b-a17b",
    "object": "chat.completion.chunk",
    "system_fingerprint": null,
    "usage": null
  },
  {
    "choices": [
      {
        "delta": {
          "content": null,
          "reasoning_content": "This"
        },
        "finish_reason": null,
        "index": 0,
        "logprobs": null
      }
    ],
    "created": 1776471147,
    "id": "chatcmpl-a04b3264-a267-9868-80d3-bd0ef7353605",
    "model": "qwen3.5-397b-a17b",
    "object": "chat.completion.chunk",
    "system_fingerprint": null,
    "usage": null
  },
  "... 192 more chunks omitted ...",
  {
    "choices": [],
    "created": 1776471147,
    "id": "chatcmpl-a04b3264-a267-9868-80d3-bd0ef7353605",
    "model": "qwen3.5-397b-a17b",
    "object": "chat.completion.chunk",
    "system_fingerprint": null,
    "usage": {
      "completion_tokens": 656,
      "completion_tokens_details": {
        "reasoning_tokens": 108,
        "text_tokens": 656
      },
      "prompt_tokens": 21,
      "prompt_tokens_details": {
        "text_tokens": 21
      },
      "total_tokens": 677
    }
  }
]
```

</details>

<details>

<summary>**Web Search** — Letting Qwen use DashScope's built-in web search via enable_search</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.5-397b-a17b',
  {
    enable_search: true,
    max_tokens: 4096,
    messages: [
      {
        content:
          'What were the top news stories about Cloudflare this week? Summarise in three bullets.',
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.5-397b-a17b",
  "enable_search": true,
  "max_tokens": 4096,
  "messages": [
    {
      "content": "What were the top news stories about Cloudflare this week? Summarise in three bullets.",
      "role": "user"
    }
  ]
}'
```

```
Based on the provided knowledge base (current context June 2026), here are the top recent news stories about Cloudflare:

*   **Acquisition of VoidZero:** On June 4, 2026, Cloudflare announced the acquisition of VoidZero to build the future of the AI-native web, marking its latest strategic move in the AI sector.
*   **Secure Sandboxes for Claude Agents:** On May 19, 2026, Cloudflare introduced secure, scalable sandboxes for Claude managed agents, enhancing security for AI agent lifecycles.
*   **Q1 2026 Financial Results:** Cloudflare announced its first-quarter 2026 financial results on May 7, 2026, alongside being named a leader in edge development platforms by an independent research firm.
```

```json
{
  "id": "chatcmpl-1dcd0242-41e4-9959-b650-2328b2a35e8c",
  "object": "chat.completion",
  "created": 1782161740,
  "model": "qwen3.5-397b-a17b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Based on the provided knowledge base (current context June 2026), here are the top recent news stories about Cloudflare:\n\n*   **Acquisition of VoidZero:** On June 4, 2026, Cloudflare announced the acquisition of VoidZero to build the future of the AI-native web, marking its latest strategic move in the AI sector.\n*   **Secure Sandboxes for Claude Agents:** On May 19, 2026, Cloudflare introduced secure, scalable sandboxes for Claude managed agents, enhancing security for AI agent lifecycles.\n*   **Q1 2026 Financial Results:** Cloudflare announced its first-quarter 2026 financial results on May 7, 2026, alongside being named a leader in edge development platforms by an independent research firm.",
        "reasoning_content": "Thinking Process:\n\n1.  **Analyze the Request:**\n    *   Topic: Top news stories about Cloudflare.\n    *   Timeframe: \"This week\" (relative to the current date provided in the knowledge base).\n    *   Format: Summarize in three bullets.\n    *   Language: The user asked in English, so the response should be in English.\n\n2.  **Determine the Current Date:**\n    *   The knowledge base contains multiple timestamps.\n    *   One source says \"搜索结果收录于 2026 年 6 月 13 日\" (Search results recorded on June 13, 2026).\n    *   Another source says \"撰于 2026 年 6 月 4 日\" (Written on June 4, 2026).\n    *   Another source says \"消息于 2026 年 2 月 8 日发布\" (Message published on February 8, 2026).\n    *   Another source says \"该信息的时间戳是 2026 年 4 月 19 日\" (Timestamp is April 19, 2026).\n    *   Another source says \"资料日期为 2024 年 6 月 18 日\" (Data date is June 18, 2024).\n    *   Another source says \"2026 年 6 月 8 日的资料\" (Data from June 8, 2026).\n    *   The most recent and relevant \"current\" date context seems to be around June 2026, specifically mid-June 2026 (June 13, 2026 is the latest search record date).\n    *   However, looking at the \"Media Overview | Cloudflare\" section, it lists press releases for June 2026.\n    *   The list shows:\n        *   2026 年 6 月 4 日 (June 4, 2026): \"cloudflare acquires voidzero to build the future of the ai-native web\"\n        *   2026 年 5 月 19 日 (May 19, 2026): \"cloudflare brings secure, scalable sandboxes to claude managed agents\"\n        *   2026 年 5 月 7 日 (May 7, 2026): \"cloudflare announces first quarter 2026 financial results\"\n        *   2026 年 5 月 5 日 (May 5, 2026): \"cloudflare named a leader in edge development platforms report...\"\n    *   If \"this week\" refers to the week surrounding the latest data point (June 13, 2026), I need to look for news around early to mid-June 2026.\n    *   The only June 2026 press release listed is June 4, 2026 (\"cloudflare acquires voidzero...\").\n    *   There is also a mention of \"2026 年 6 月 2 日\" (June 2, 2026) in the Spanish section regarding ITBrief about \"vinext\".\n    *   There is a mention of \"2026 年 6 月 8 日的资料\" (June 8, 2026) for the official press releases list.\n    *   Since the search record date is June 13, 2026, \"this week\" would roughly be June 9 - June 15, or perhaps the most recent significant news available in the context of the provided knowledge base (which seems to cluster around early June 2026).\n    *   However, the knowledge base primarily highlights the June 4th acquisition as the top June news.\n    *   Let's look for other recent items. The \"Media Overview\" shows June 2026 has only 1 item listed in the 1-10 range (June 4).\n    *   The Spanish section mentions \"febrero de 2026 26 de febrero de 2026\" for Vinext, but also says \"2026 年 6 月 2 日\" (June 2, 2026) in the header context. Wait, the Spanish text says \"ITBrief Cloudflare unveils vinext... febrero de 2026 26 de febrero de 2026（2026 年 6 月 2 日）\". This is confusing. It might mean the article was accessed June 2, but published Feb 26.\n    *   The most prominent recent news in the provided text for June 2026 is the acquisition of VoidZero.\n    *   Other recent news (May 2026) includes: Secure sandboxes for Claude agents (May 19), Q1 2026 Financial Results (May 7), Leader in Edge Development (May 5).\n    *   If I must strictly adhere to \"this week\" relative to the latest timestamp (June 13, 2026), the June 4th news is the closest significant event (about 1.5 weeks prior). There isn't much else specifically dated June 9-13 in the text.\n    *   However, often in these tasks, \"this week\" implies the most recent news available in the context provided. The context heavily features June 2026 news.\n    *   Let's select the top 3 most recent/significant stories from the provided text that represent the latest \"news cycle\" available (June 2026).\n    *   Story 1: Acquisition of VoidZero (June 4, 2026).\n    *   Story 2: Secure sandboxes for Claude managed agents (May 19, 2026) - This is late May, close to June.\n    *   Story 3: Q1 2026 Financial Results (May 7, 2026) OR Threat Intelligence Report (March 2026) OR Agents Week (April 2026).\n    *   Actually, looking at the \"Media Overview\" for June 2026, it says \"显示 1-10 个，共 17 个\" (Showing 1-10 of 17). But only one is explicitly dated June 4th in the list provided.\n    *   Wait, the text says \"2026 年 6 月 8 日的资料\" (Data from June 8, 2026) for the press release list.\n    *   If today is June 13, 2026 (search record date), the June 4th news is the most recent major announcement.\n    *   I need to find two more recent stories. The May 19th story about Claude agents is the next most recent.\n    *   The May 7th financial results are also recent.\n    *   Alternatively, there is mention of \"Agents Week 2026\" wrapped up around April 19, 2026.\n    *   Let's prioritize the June and May 2026 news as the \"top stories\" relative to the provided knowledge base's \"current\" timeframe (June 2026).\n\n    *   Candidate 1: Cloudflare acquires VoidZero to build the AI-native web (June 4, 2026).\n    *   Candidate 2: Cloudflare brings secure, scalable sandboxes to Claude managed agents (May 19, 2026).\n    *   Candidate 3: Cloudflare announces First Quarter 2026 Financial Results (May 7, 2026) OR Cloudflare named a leader in edge development platforms (May 5, 2026).\n    *   Let's pick the Financial Results as it's usually a top story.\n    *   Wait, is there anything else? The Spanish section mentions \"ITBrief Cloudflare unveils vinext... 2026 年 6 月 2 日\". This might be interpreted as a June 2nd news item about Vinext (Vite-based Next.js rival). This is closer to \"this week\" (June 13) than May 7.\n    *   So:\n        1.  Acquisition of VoidZero (June 4).\n        2.  Unveiling Vinext (June 2 - based on the header date context though the text says Feb 26, the header says June 2. I should be careful. The text says \"febrero de 2026 26 de febrero de 2026（2026 年 6 月 2 日）\". This likely means the article was accessed/recorded on June 2, but published Feb 26. I should probably stick to the clearly dated June 4 press release).\n        3.  Secure sandboxes for Claude (May 19).\n\n    *   Actually, looking closely at the first block: \"2026 年 6 月 显示 1-10 个，共 17 个\". It lists \"cloudflare acquires voidzero...\" on June 4. It doesn't list others for June.\n    *   So the top stories are likely the June 4 acquisition, and the late May stories.\n    *   Let's formulate the bullets based on the most recent significant announcements available in the text (June 2026 context).\n\n    *   Bullet 1: Acquisition of VoidZero (June 4, 2026).\n    *   Bullet 2: Secure sandboxes for Claude agents (May 19, 2026).\n    *   Bullet 3: Q1 2026 Financial Results (May 7, 2026) OR Being named a leader in edge development (May 5, 2026). Financial results are usually more significant.\n    *   Wait, the prompt asks for \"this week\". If the current date is June 13, 2026, June 4 is la
... response truncated ...
```

</details>

## Parameters

Schema variant

Chat CompletionsResponses

▶messages\[]

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

`number`minimum: -2maximum: 2

presence\_penalty

`number`minimum: -2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[]

`array`

tool\_choice

response\_format

▶modalities\[]

`array`

▶audio{}

`object`

reasoning\_effort

`string`Optional reasoning control; availability and accepted values are model-dependent.

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[]

`array`

▶usage{}

`object`

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/#page","headline":"Qwen 3.5 397B A17B","description":"Alibaba's Qwen 3.5 is a 397B-parameter mixture-of-experts model with 17B active parameters, offering strong reasoning capabilities with efficient inference.","url":"https://developers.cloudflare.com/ai/models/alibaba/qwen3.5-397b-a17b/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
