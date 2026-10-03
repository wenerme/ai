---
description: Alibaba's Qwen 3.7 Plus is the cost-effective member of the Qwen3.7 series, pairing strong text capabilities with image and video understanding and full-stack agent-level intelligence for coding, tool use, and GUI-based automation, served via DashScope's OpenAI-compatible endpoint.
title: Qwen 3.7 Plus
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.BK31NAJz.svg)

# Qwen 3.7 Plus

Text Generation • Alibaba

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/qwen3.7-plus`

- Third-party

Alibaba's Qwen 3.7 Plus is the cost-effective member of the Qwen3.7 series, pairing strong text capabilities with image and video understanding and full-stack agent-level intelligence for coding, tool use, and GUI-based automation, served via DashScope's OpenAI-compatible endpoint.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal) |
| More information | [link ↗](https://www.qwencloud.com/models/qwen3.7-plus) |
| Request formats | Chat Completions, Responses |
| Pricing | <ul><li>Input (per 1M tokens)$0.32</li><li>Output (per 1M tokens)$1.28</li><li>Cached input (per 1M tokens)$0.064</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/qwen3.7-plus',
  { messages: [{ content: 'What are the three laws of thermodynamics?', role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen3.7-plus",
  "messages": [
    {
      "content": "What are the three laws of thermodynamics?",
      "role": "user"
    }
  ]
}'
```

```
The laws of thermodynamics govern how energy moves and transforms in the universe. Here are the three main laws, explained simply:

### 1. The First Law: The Law of Conservation of Energy
* **The Rule:** Energy cannot be created or destroyed; it can only be transferred or changed from one form to another.
* **In simple terms:** The total amount of energy in the universe is always the same. You can't get energy out of nowhere.
* **Example:** When you burn wood, the chemical energy stored in the wood isn't destroyed. It is simply converted into heat energy and light energy.

### 2. The Second Law: The Law of Entropy
* **The Rule:** The total entropy (disorder or randomness) of an isolated system will always increase over time. Additionally, heat naturally flows from a hotter object to a colder one, never the reverse without adding work.
* **In simple terms:** Things naturally move from a state of order to a state of disorder. Because of this, no machine or process can ever be 100% efficient; some energy is always lost as waste heat. This is also why perpetual motion machines are impossible.
* **Example:** If you leave a hot cup of coffee on a table, it will eventually cool down to room temperature. The heat disperses into the air, increasing the overall disorder (entropy) of the room. The coffee will never spontaneously heat back up.

### 3. The Third Law: The Law of Absolute Zero
* **The Rule:** As the temperature of a system approaches absolute zero, its entropy approaches a constant minimum (essentially zero for a perfect crystal).
* **In simple terms:** Absolute zero (0 Kelvin, or -273.15°C) is the theoretical temperature where all atomic and molecular motion completely stops. Because it is impossible to remove all heat from a system, it is physically impossible to ever actually reach absolute zero.

***

**A Quick Note on the "Zeroth" Law:**
While you asked for the three laws, physicists actually recognize a **Zeroth Law of Thermodynamics**, which was formulated after the other three but is considered so fundamental that it had to come first.
* **The Zeroth Law** states that if two objects are both in thermal equilibrium with a third object, then they are in thermal equilibrium with each other. This law is what allows us to define and measure **temperature** using thermometers.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The laws of thermodynamics govern how energy moves and transforms in the universe. Here are the three main laws, explained simply:\n\n### 1. The First Law: The Law of Conservation of Energy\n* **The Rule:** Energy cannot be created or destroyed; it can only be transferred or changed from one form to another.\n* **In simple terms:** The total amount of energy in the universe is always the same. You can't get energy out of nowhere. \n* **Example:** When you burn wood, the chemical energy stored in the wood isn't destroyed. It is simply converted into heat energy and light energy. \n\n### 2. The Second Law: The Law of Entropy\n* **The Rule:** The total entropy (disorder or randomness) of an isolated system will always increase over time. Additionally, heat naturally flows from a hotter object to a colder one, never the reverse without adding work.\n* **In simple terms:** Things naturally move from a state of order to a state of disorder. Because of this, no machine or process can ever be 100% efficient; some energy is always lost as waste heat. This is also why perpetual motion machines are impossible.\n* **Example:** If you leave a hot cup of coffee on a table, it will eventually cool down to room temperature. The heat disperses into the air, increasing the overall disorder (entropy) of the room. The coffee will never spontaneously heat back up.\n\n### 3. The Third Law: The Law of Absolute Zero\n* **The Rule:** As the temperature of a system approaches absolute zero, its entropy approaches a constant minimum (essentially zero for a perfect crystal).\n* **In simple terms:** Absolute zero (0 Kelvin, or -273.15°C) is the theoretical temperature where all atomic and molecular motion completely stops. Because it is impossible to remove all heat from a system, it is physically impossible to ever actually reach absolute zero.\n\n***\n\n**A Quick Note on the \"Zeroth\" Law:**\nWhile you asked for the three laws, physicists actually recognize a **Zeroth Law of Thermodynamics**, which was formulated after the other three but is considered so fundamental that it had to come first. \n* **The Zeroth Law** states that if two objects are both in thermal equilibrium with a third object, then they are in thermal equilibrium with each other. This law is what allows us to define and measure **temperature** using thermometers.",
        "reasoning_content": "Here's a thinking process that leads to the suggested answer:\n\n1.  **Analyze the Request:**\n    *   **Topic:** The three laws of thermodynamics.\n    *   **Goal:** Clearly explain what they are.\n    *   **Target Audience:** General audience (needs to be accurate but accessible, avoiding overly dense jargon where possible, or explaining it if used).\n\n2.  **Recall/Research the Three Laws of Thermodynamics:**\n    *   *Zeroth Law:* (Wait, there are technically *four* laws, but the prompt asks for the \"three.\" I should mention the Zeroth Law briefly for completeness, but focus primarily on the First, Second, and Third).\n    *   *First Law:* Conservation of energy. Energy cannot be created or destroyed, only transformed.\n    *   *Second Law:* Entropy. The total entropy of an isolated system always increases over time. Heat flows from hot to cold. No process is 100% efficient.\n    *   *Third Law:* Absolute zero. As temperature approaches absolute zero, entropy approaches a minimum (usually zero for a perfect crystal).\n\n3.  **Draft the Explanations (Iterative refinement for clarity):**\n\n    *   *Introduction:* Briefly state what thermodynamics is (the study of heat, energy, and work) to set the context.\n\n    *   *First Law (Conservation of Energy):*\n        *   *Scientific definition:* Energy can neither be created nor destroyed; it can only be transferred or changed from one form to another.\n        *   *Simple analogy/example:* A car engine turning fuel (chemical energy) into motion (kinetic energy) and heat. The total energy remains the same.\n\n    *   *Second Law (Entropy):*\n        *   *Scientific definition:* The total entropy (disorder) of an isolated system can never decrease over time. Heat naturally flows from hotter objects to colder ones.\n        *   *Simple analogy/example:* A hot cup of coffee cooling down in a room. You can't build a 100% efficient engine because some energy is always lost as waste heat (increasing overall disorder).\n\n    *   *Third Law (Absolute Zero):*\n        *   *Scientific definition:* As the temperature of a system approaches absolute zero (0 Kelvin or -273.15°C), the entropy of the system approaches a constant minimum.\n        *   *Simple analogy/example:* Absolute zero is the theoretical point where all molecular motion stops. You can't actually reach this point.\n\n    *   *Addressing the \"Zeroth Law\":*\n        *   Since the prompt specifically asked for *three*, I should answer with the main three (1st, 2nd, 3rd). However, in physics, the *Zeroth Law* is fundamental (it defines temperature). I will add a brief \"Bonus/Note\" about the Zeroth Law at the end to be thorough and accurate without confusing the main answer.\n\n4.  **Review and Refine:**\n    *   *Formatting:* Use bolding, bullet points, and clear headings to make it highly readable.\n    *   *Tone:* Informative, clear, and educational.\n    *   *Accuracy Check:* Are the definitions correct? Yes. Are the examples accurate? Yes.\n\n5.  **Final Output Generation:** (This matches the provided good response.)\n    *   *Drafting the response based on the above steps.* (See final output for the exact wording). Let me make sure the distinction between the formal law and the \"in simple terms\" is clear.\n\n    *(Self-Correction during drafting)*: Make sure to clearly state that the Second Law is why perpetual motion machines are impossible. That's a great practical takeaway for the reader.\n\n6.  **Final Polish:** (Produces the provided good response). Good structure, clear language, accurate physics. Include the Zeroth law as a fun fact at the end. Keep it concise. Let's go. 🚀👇🏼🔽",
        "role": "assistant"
      }
    }
  ],
  "created": 1785165311,
  "id": "chatcmpl-cadc5fbc-38d2-9d25-a2f0-d0322d13a6ed",
  "model": "qwen3.7-plus",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 1375,
    "completion_tokens_details": {
      "reasoning_tokens": 862,
      "text_tokens": 1375
    },
    "prompt_tokens": 19,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 19
    },
    "total_tokens": 1394
  }
}
```

## Examples

<details>

<summary>**With System Message** — Using a system message to set context</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.7-plus',
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
  "model": "alibaba/qwen3.7-plus",
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
To read a JSON file in Python, you can use the built-in **`json`** module. Specifically, you will use the **`json.load()`** function, which reads a JSON file and converts it into a Python dictionary or list.

Here is the standard and safest way to do it:

### Basic Example

```python
import json

# Open the file and load its contents
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Now 'data' is a Python dictionary (or list)
print(data)
```

### How it works:
1. **`import json`**: Imports Python's built-in JSON library.
2. **`with open(...) as file:`**: Opens the file in read mode (`'r'`). Using the `with` statement is a best practice because it automatically closes the file for you when the block of code is finished, even if an error occurs.
3. **`encoding='utf-8'`**: It is highly recommended to specify UTF-8 encoding, as JSON files are typically encoded this way.
4. **`json.load(file)`**: Parses the JSON data from the file object and converts it into native Python data types (JSON objects become Python dictionaries, JSON arrays become Python lists, etc.).

---

### Best Practice: Adding Error Handling
When reading files, things can go wrong (the file might not exist, or it might contain invalid JSON). It's a good idea to handle these exceptions:

```python
import json

try:
    with open('data.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        print(data)

except FileNotFoundError:
    print("Error: The file was not found.")
except json.JSONDecodeError:
    print("Error: The file does not contain valid JSON.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

---

### Quick Tip: `load()` vs `loads()`
* **`json.load()`** (no "s"): Reads JSON data directly from a **file**.
* **`json.loads()`** (with an "s" for "string"): Reads JSON data from a **string** or bytes object.

*(Example: `data = json.loads('{"name": "Alice"}')`)*
````

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "To read a JSON file in Python, you can use the built-in **`json`** module. Specifically, you will use the **`json.load()`** function, which reads a JSON file and converts it into a Python dictionary or list.\n\nHere is the standard and safest way to do it:\n\n### Basic Example\n\n```python\nimport json\n\n# Open the file and load its contents\nwith open('data.json', 'r', encoding='utf-8') as file:\n    data = json.load(file)\n\n# Now 'data' is a Python dictionary (or list)\nprint(data)\n```\n\n### How it works:\n1. **`import json`**: Imports Python's built-in JSON library.\n2. **`with open(...) as file:`**: Opens the file in read mode (`'r'`). Using the `with` statement is a best practice because it automatically closes the file for you when the block of code is finished, even if an error occurs.\n3. **`encoding='utf-8'`**: It is highly recommended to specify UTF-8 encoding, as JSON files are typically encoded this way.\n4. **`json.load(file)`**: Parses the JSON data from the file object and converts it into native Python data types (JSON objects become Python dictionaries, JSON arrays become Python lists, etc.).\n\n---\n\n### Best Practice: Adding Error Handling\nWhen reading files, things can go wrong (the file might not exist, or it might contain invalid JSON). It's a good idea to handle these exceptions:\n\n```python\nimport json\n\ntry:\n    with open('data.json', 'r', encoding='utf-8') as file:\n        data = json.load(file)\n        print(data)\n        \nexcept FileNotFoundError:\n    print(\"Error: The file was not found.\")\nexcept json.JSONDecodeError:\n    print(\"Error: The file does not contain valid JSON.\")\nexcept Exception as e:\n    print(f\"An unexpected error occurred: {e}\")\n```\n\n---\n\n### Quick Tip: `load()` vs `loads()`\n* **`json.load()`** (no \"s\"): Reads JSON data directly from a **file**.\n* **`json.loads()`** (with an \"s\" for \"string\"): Reads JSON data from a **string** or bytes object. \n\n*(Example: `data = json.loads('{\"name\": \"Alice\"}')`)*",
        "reasoning_content": "Thinking Process:\n\n1.  **Understand the User's Goal:** The user wants to know how to read a JSON file using Python.\n2.  **Identify the Core Tool:** The standard library module for handling JSON in Python is `json`. Specifically, the `json.load()` function is used to read JSON data from a file.\n3.  **Formulate the Solution:**\n    *   Import the `json` module.\n    *   Open the file using the `open()` function (preferably using a `with` statement for safe file handling).\n    *   Use `json.load()` to parse the JSON content into a Python dictionary (or list, depending on the JSON structure).\n4.  **Draft the Code Example:**\n    ```python\n    import json\n\n    with open('data.json', 'r') as file:\n        data = json.load(file)\n        print(data)\n    ```\n5.  **Add Context and Best Practices:**\n    *   Explain what `json.load()` does (converts JSON to Python dict/list).\n    *   Mention the `with` statement (ensures the file is properly closed).\n    *   Briefly mention error handling (e.g., `FileNotFoundError`, `json.JSONDecodeError`) as it's highly recommended for robust code.\n    *   Distinguish between `json.load()` (for files) and `json.loads()` (for strings), as this is a common point of confusion.\n6.  **Review and Refine:**\n    *   *Self-Correction during drafting:* Make sure to specify the encoding, usually `utf-8`, when opening files, as JSON is typically UTF-8.\n    *   *Updated Code:* `open('data.json', 'r', encoding='utf-8')`\n7.  **Final Output Generation:** (Structure the response clearly with a basic example, explanation, and advanced/best practice tips). Keep it concise but comprehensive. Provide a sample JSON file content so the user can visualize it.\n\n*Plan:*\n- Direct answer with the standard `json` module.\n- Code snippet showing the basic usage.\n- Explanation of the key components (`with open`, `json.load`).\n- Code snippet showing error handling (best practice).\n- Quick tip on `load` vs `loads`.\n- Example JSON data for context. \n*Execution.* \n*End of thought process.*",
        "role": "assistant"
      }
    }
  ],
  "created": 1785165338,
  "id": "chatcmpl-793351f2-4078-932e-b20b-4d495b52f9d3",
  "model": "qwen3.7-plus",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 1024,
    "completion_tokens_details": {
      "reasoning_tokens": 510,
      "text_tokens": 1024
    },
    "prompt_tokens": 35,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "text_tokens": 35
    },
    "total_tokens": 1059
  }
}
```

</details>

<details>

<summary>**Vision: Image Understanding** — Describing the contents of an image</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.7-plus',
  {
    messages: [
      {
        content: [
          {
            image_url: {
              url: 'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg',
            },
            type: 'image_url',
          },
          { text: 'What is depicted in the image?', type: 'text' },
        ],
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
  "model": "alibaba/qwen3.7-plus",
  "messages": [
    {
      "content": [
        {
          "image_url": {
            "url": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg"
          },
          "type": "image_url"
        },
        {
          "text": "What is depicted in the image?",
          "type": "text"
        }
      ],
      "role": "user"
    }
  ]
}'
```

```
This image depicts a heartwarming scene of a young woman and her dog interacting on a sandy beach, likely during sunset or sunrise given the warm, golden lighting.

Here are the specific details:

*   **The Subjects:** A young woman with long dark hair is sitting on the sand, wearing a blue and white plaid shirt and dark pants. She is smiling happily at a large, light-colored dog (appearing to be a Golden Retriever or Labrador).
*   **The Action:** The dog is sitting facing the woman and has lifted its front paw to touch her hand. They appear to be doing a "high five" or a "shake" trick. The woman is holding the dog's paw with one hand and seems to be holding a treat in the other.
*   **The Setting:** They are on a beach with textured sand full of footprints. In the background, the ocean stretches out to the horizon with gentle waves rolling in. The sky is bright and hazy, suggesting the sun is low on the horizon, creating a lens flare effect on the right side of the image.
*   **Accessories:** The dog is wearing a blue harness with a colorful pattern, and a red rope leash is lying on the sand next to it. The woman is wearing a white watch.
```

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "This image depicts a heartwarming scene of a young woman and her dog interacting on a sandy beach, likely during sunset or sunrise given the warm, golden lighting.\n\nHere are the specific details:\n\n*   **The Subjects:** A young woman with long dark hair is sitting on the sand, wearing a blue and white plaid shirt and dark pants. She is smiling happily at a large, light-colored dog (appearing to be a Golden Retriever or Labrador).\n*   **The Action:** The dog is sitting facing the woman and has lifted its front paw to touch her hand. They appear to be doing a \"high five\" or a \"shake\" trick. The woman is holding the dog's paw with one hand and seems to be holding a treat in the other.\n*   **The Setting:** They are on a beach with textured sand full of footprints. In the background, the ocean stretches out to the horizon with gentle waves rolling in. The sky is bright and hazy, suggesting the sun is low on the horizon, creating a lens flare effect on the right side of the image.\n*   **Accessories:** The dog is wearing a blue harness with a colorful pattern, and a red rope leash is lying on the sand next to it. The woman is wearing a white watch.",
        "reasoning_content": "The user wants a description of the image.\n\n1.  **Identify the main subjects:** A woman and a dog.\n2.  **Identify the setting:** A beach with sand and the ocean in the background. The lighting suggests sunset or sunrise (golden hour).\n3.  **Describe the action:** The woman is sitting on the sand. The dog is sitting facing her. They are doing a \"high five\" or shaking hands. The dog has its paw raised, and the woman is holding it.\n4.  **Describe the subjects in detail:**\n    *   **Woman:** Long dark hair, wearing a plaid shirt (blue/white/black check), dark pants (rolled up), smiling, looking at the dog. She has a watch on her wrist.\n    *   **Dog:** Looks like a Golden Retriever or Labrador Retriever (light golden fur). It's wearing a harness (blue with colorful patterns) and a leash is attached (red rope). It's sitting on its haunches.\n5.  **Describe the background/environment:** Sandy beach with footprints. Ocean waves in the background. The sky is bright, suggesting early morning or late afternoon sun. There's a lens flare or sun glare on the right side.\n6.  **Synthesize the description:** Combine these elements into a coherent paragraph. Start with the main action, then add details about the subjects and the setting.\n\n*Drafting the description:*\nThe image shows a woman and a dog on a beach. The woman is sitting on the sand, wearing a plaid shirt. The dog is a golden retriever or lab. They are shaking hands/high-fiving. The sun is setting or rising, creating a warm glow. The ocean is in the background.\n\n*Refining the description:*\nThis is a heartwarming photo of a young woman and her dog interacting on a sandy beach.\n- **The Woman:** She is sitting cross-legged or with legs bent on the sand, facing left. She has long brown hair and is wearing a blue and white plaid flannel shirt over dark pants. She is smiling broadly at the dog.\n- **The Dog:** It looks like a yellow Labrador or Golden Retriever. It is sitting facing the woman. It is wearing a colorful harness. The dog has lifted its front right paw to touch the woman's hand, performing a \"high five\" or \"shake\" trick.\n- **The Setting:** They are on a beach with textured sand. In the background, there is the ocean with small waves rolling in. The lighting is soft and warm, likely from a sunset or sunrise, with a bright flare coming from the right side of the frame.\n- **Details:** There is a red leash lying on the sand near the dog.\n\n*Final Polish:* Structure the answer clearly. Start with a general overview, then break down the details.",
        "role": "assistant"
      }
    }
  ],
  "created": 1785165357,
  "id": "chatcmpl-6856ed0e-4b37-9fd3-ae85-7d106cc018bd",
  "model": "qwen3.7-plus",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 874,
    "completion_tokens_details": {
      "reasoning_tokens": 602,
      "text_tokens": 272
    },
    "prompt_tokens": 2520,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "image_tokens": 2503,
      "text_tokens": 17
    },
    "total_tokens": 3394
  }
}
```

</details>

<details>

<summary>**Streaming Response** — Enable streaming for real-time output</summary>



```ts
const response = await env.AI.run(
  'alibaba/qwen3.7-plus',
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
  "model": "alibaba/qwen3.7-plus",
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
At its core, **recursion** is a programming concept where a function calls *itself* in order to solve a problem.

Instead of attacking a massive problem all at once, recursion breaks the problem down into smaller, simpler versions of the *exact same problem*, until it reaches a point that is easy to solve.

To understand it, let's look at a real-world analogy, followed by a simple coding example.

---

### The Real-World Analogy: The Line
Imagine you are standing in a long line, and you want to know what number you are in the line.

Instead of counting everyone from the front, you use **recursion**:
1. **The Recursive Step:** You tap the person in front of you and ask, *"What number are you in the line?"*
2. That person doesn't know either, so they tap the person in front of *them* and ask the same question.
3. This continues down the line until it reaches the very first person.
4. **The Base Case:** The first person knows exactly where they are. They say, *"I am number 1."* They don't ask anyone else.
5. The answer gets passed back down the line. The second person adds 1 (so they are 2), the third person adds 1 (they are 3), and so on, until the answer finally reaches you.

In programming, the **Base Case** is the condition that tells the function to stop calling itself (the person at the front of the line). Without a base case, the function would loop forever!

---

### The Coding Example: Factorial
The most classic example of recursion is calculating a **factorial**.
The factorial of 3 (written as `3!`) means multiplying 3 by every whole number below it:
**`3! = 3 × 2 × 1 = 6`**

Here is how we write that using recursion in Python:

```python
def factorial(n):
    # 1. The Base Case (When do we stop?)
    if n == 1:
        return 1

    # 2. The Recursive Case (The function calls itself)
    else:
        return n * factorial(n - 1)
```

### How it works step-by-step
Let's trace what happens when we ask the computer for `factorial(3)`:

**Phase 1: The Calls (Going down the line)**
* `factorial(3)` sees that `n` is not 1. It returns `3 * factorial(2)`. *(Wait, we need to know what factorial(2) is!)*
* `factorial(2)` sees that `n` is not 1. It returns `2 * factorial(1)`. *(Wait, we need to know what factorial(1) is!)*
* `factorial(1)` hits the **Base Case**. It simply returns `1`.

**Phase 2: The Returns (Passing the answer back up the line)**
* Now the computer replaces `factorial(1)` with `1`.
  * The previous step was `2 * factorial(1)`, which becomes `2 * 1 = 2`.
* Now the computer replaces `factorial(2)` with `2`.
  * The very first step was `3 * factorial(2)`, which becomes `3 * 2 = 6`.

The final answer is **6**.

---

### The Two Golden Rules of Recursion
Every recursive function **must** have these two parts, or your program will crash (usually resulting in a "Stack Overflow" error):
1. **The Base Case:** The condition where the function stops calling itself (e.g., `if n == 1`).
2. **The Recursive Case:** The part where the function calls itself, but with a modified input that moves *closer* to the base case (e.g., `n - 1`).

### Why use it?
While a simple `for` loop can calculate a factorial, recursion is incredibly powerful for problems that involve branching structures, like navigating through folders on your computer, searching through a family tree, or sorting complex data. It allows you to write clean, elegant code for problems that would otherwise require massive, confusing loops.
````

```json
[
  {
    "model": "qwen3.7-plus",
    "id": "chatcmpl-29158f9e-a9f4-9c08-9d9e-96bc58a68c5e",
    "created": 1785165376,
    "object": "chat.completion.chunk",
    "usage": null,
    "choices": [
      {
        "logprobs": null,
        "index": 0,
        "delta": {
          "content": "",
          "role": "assistant",
          "reasoning_content": ""
        },
        "finish_reason": null
      }
    ]
  },
  {
    "model": "qwen3.7-plus",
    "id": "chatcmpl-29158f9e-a9f4-9c08-9d9e-96bc58a68c5e",
    "choices": [
      {
        "delta": {
          "content": "",
          "reasoning_content": "Here"
        },
        "index": 0,
        "finish_reason": null,
        "logprobs": null
      }
    ],
    "created": 1785165376,
    "object": "chat.completion.chunk",
    "usage": null
  },
  "... 598 more chunks omitted ...",
  {
    "choices": [],
    "created": 1785165376,
    "id": "chatcmpl-29158f9e-a9f4-9c08-9d9e-96bc58a68c5e",
    "model": "qwen3.7-plus",
    "object": "chat.completion.chunk",
    "usage": {
      "completion_tokens": 2114,
      "completion_tokens_details": {
        "reasoning_tokens": 1194,
        "text_tokens": 2114
      },
      "prompt_tokens": 21,
      "prompt_tokens_details": {
        "cached_tokens": 0,
        "text_tokens": 21
      },
      "total_tokens": 2135
    }
  }
]
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

Input [Open](https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/#page","headline":"Qwen 3.7 Plus","description":"Alibaba's Qwen 3.7 Plus is the cost-effective member of the Qwen3.7 series, pairing strong text capabilities with image and video understanding and full-stack agent-level intelligence for coding, tool use, and GUI-based automation, served via DashScope's OpenAI-compatible endpoint.","url":"https://developers.cloudflare.com/ai/models/alibaba/qwen3.7-plus/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
