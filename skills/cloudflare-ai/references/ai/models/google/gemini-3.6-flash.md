---
description: Gemini 3.6 Flash provides sustained frontier-level intelligence optimized for real-world tasks at a higher speed and lower cost, excelling at code generation, agentic execution, and spatial reasoning.
title: Gemini 3.6 Flash
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 3.6 Flash

Text Generation • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-3.6-flash/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-3.6-flash`

* Third-party

Gemini 3.6 Flash provides sustained frontier-level intelligence optimized for real-world tasks at a higher speed and lower cost, excelling at code generation, agentic execution, and spatial reasoning.

| Model Info                                                                          |                                                                                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens                                                                                                          |
| Terms and License                                                                   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                          |
| More information                                                                    | [link ↗](https://deepmind.google/technologies/gemini/)                                                                    |
| Request formats                                                                     | Chat Completions                                                                                                          |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-3.6-flash) |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-3.6-flash',
  { contents: [{ parts: [{ text: 'What are the three laws of thermodynamics?' }], role: 'user' }] },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.6-flash",
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

Although historically there are **three main laws of thermodynamics**, a foundational law was added later and named the "Zeroth Law." Therefore, physics actually recognizes **four laws** that govern how energy, heat, and work behave.

Here is a breakdown of all of them, starting with the classic three, followed by the foundational Zeroth Law:

---

### 1. The First Law: Conservation of Energy
> **"Energy cannot be created or destroyed; it can only change forms."**

* **What it means:** The total amount of energy in an isolated system remains constant. You can convert thermal energy (heat) into mechanical energy (work), or chemical energy into electrical energy, but you can never end up with more energy than you started with.
* **Example:** In a car engine, the chemical energy in gasoline is converted into thermal energy (heat) through burning, which is then converted into mechanical energy (moving the car) and sound energy.

---

### 2. The Second Law: The Law of Entropy
> **"The total entropy (disorder) of an isolated system always increases over time."**

* **What it means:** Natural processes move toward disorder and randomness. This law explains the "arrow of time"—why processes are irreversible. It also dictates that heat will **always flow spontaneously from hotter objects to colder ones**, never the reverse, unless external work is applied.
* **Example:** If you drop an ice cube into a hot cup of coffee, the ice melts and the coffee cools down until they reach the same temperature. You will never see a lukewarm cup of coffee spontaneously separate into boiling liquid and an ice cube.

---

### 3. The Third Law: Absolute Zero
> **"As a system approaches absolute zero, its entropy approaches a constant minimum."**

* **What it means:** Absolute zero ($0\text{ Kelvin}$, or $-273.15^\circ\text{C}$ / $-459.67^\circ\text{F}$) is the theoretical temperature where all atomic motion completely stops. The third law states that a perfect, pure crystal at absolute zero has zero entropy (perfect order). Furthermore, it is physically impossible to actually reach absolute zero in a finite number of steps.
* **Example:** As you cool matter down closer and closer to absolute zero, its atoms slow down and become extremely organized, but you can never completely strip away all kinetic energy.

---

### Bonus: The Zeroth Law (Thermal Equilibrium)
*(Formulated after the First and Second laws, but deemed so fundamental it was placed "before" them)*

> **"If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other."**

* **What it means:** If Object A is the same temperature as Object B, and Object B is the same temperature as Object C, then Object A and Object C must also be the same temperature ($A = B$ and $B = C \implies A = C$).
* **Why it matters:** This law gives us a practical definition of **temperature** and allows us to use thermometers.

---

### Summary Analogy (The "Game of Thermodynamics")
A famous, humorous way to remember these laws is:

* **Zeroth Law:** You have to play the game.
* **First Law:** You can't win; you can only break even (you can't get more energy out than you put in).
* **Second Law:** You can't even break even (because of entropy, you always lose some usable energy as waste heat).
* **Third Law:** You can't quit the game (you can never reach absolute zero).

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Although historically there are **three main laws of thermodynamics**, a foundational law was added later and named the \"Zeroth Law.\" Therefore, physics actually recognizes **four laws** that govern how energy, heat, and work behave. \n\nHere is a breakdown of all of them, starting with the classic three, followed by the foundational Zeroth Law:\n\n---\n\n### 1. The First Law: Conservation of Energy\n> **\"Energy cannot be created or destroyed; it can only change forms.\"**\n\n* **What it means:** The total amount of energy in an isolated system remains constant. You can convert thermal energy (heat) into mechanical energy (work), or chemical energy into electrical energy, but you can never end up with more energy than you started with.\n* **Example:** In a car engine, the chemical energy in gasoline is converted into thermal energy (heat) through burning, which is then converted into mechanical energy (moving the car) and sound energy.\n\n---\n\n### 2. The Second Law: The Law of Entropy\n> **\"The total entropy (disorder) of an isolated system always increases over time.\"**\n\n* **What it means:** Natural processes move toward disorder and randomness. This law explains the \"arrow of time\"—why processes are irreversible. It also dictates that heat will **always flow spontaneously from hotter objects to colder ones**, never the reverse, unless external work is applied.\n* **Example:** If you drop an ice cube into a hot cup of coffee, the ice melts and the coffee cools down until they reach the same temperature. You will never see a lukewarm cup of coffee spontaneously separate into boiling liquid and an ice cube.\n\n---\n\n### 3. The Third Law: Absolute Zero\n> **\"As a system approaches absolute zero, its entropy approaches a constant minimum.\"**\n\n* **What it means:** Absolute zero ($0\\text{ Kelvin}$, or $-273.15^\\circ\\text{C}$ / $-459.67^\\circ\\text{F}$) is the theoretical temperature where all atomic motion completely stops. The third law states that a perfect, pure crystal at absolute zero has zero entropy (perfect order). Furthermore, it is physically impossible to actually reach absolute zero in a finite number of steps.\n* **Example:** As you cool matter down closer and closer to absolute zero, its atoms slow down and become extremely organized, but you can never completely strip away all kinetic energy.\n\n---\n\n### Bonus: The Zeroth Law (Thermal Equilibrium)\n*(Formulated after the First and Second laws, but deemed so fundamental it was placed \"before\" them)*\n\n> **\"If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other.\"**\n\n* **What it means:** If Object A is the same temperature as Object B, and Object B is the same temperature as Object C, then Object A and Object C must also be the same temperature ($A = B$ and $B = C \\implies A = C$). \n* **Why it matters:** This law gives us a practical definition of **temperature** and allows us to use thermometers.\n\n---\n\n### Summary Analogy (The \"Game of Thermodynamics\")\nA famous, humorous way to remember these laws is:\n\n* **Zeroth Law:** You have to play the game.\n* **First Law:** You can't win; you can only break even (you can't get more energy out than you put in).\n* **Second Law:** You can't even break even (because of entropy, you always lose some usable energy as waste heat).\n* **Third Law:** You can't quit the game (you can never reach absolute zero).",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 8,
    "candidatesTokenCount": 773,
    "totalTokenCount": 1863,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 8
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 773
      }
    ],
    "thoughtsTokenCount": 1082
  },
  "modelVersion": "gemini-3.6-flash",
  "createTime": "2026-07-21T16:21:14.948550Z",
  "responseId": "epxfasbyOaio8sYPu5SukQY"
}
```

## Examples

**With System Instruction** — Using a system instruction to set an agentic coding persona

```ts
const response = await env.AI.run(
  'google/gemini-3.6-flash',
  {
    contents: [
      {
        parts: [
          { text: 'Write a Python function that merges two sorted lists into one sorted list.' },
        ],
        role: 'user',
      },
    ],
    generationConfig: { temperature: 0.2 },
    systemInstruction: {
      parts: [
        {
          text: 'You are an expert software engineering agent. Write concise, correct, well-documented code.',
        },
      ],
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.6-flash",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "Write a Python function that merges two sorted lists into one sorted list."
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "temperature": 0.2
    },
    "systemInstruction": {
      "parts": [
        {
          "text": "You are an expert software engineering agent. Write concise, correct, well-documented code."
        }
      ]
    }
  }
}'
```

Here is the standard two-pointer implementation, which achieves optimal **$O(n + m)$** time complexity and **$O(n + m)$** space complexity.

```python
def merge_sorted_lists(list1: list, list2: list) -> list:
    """Merges two pre-sorted lists into a single sorted list.

    Args:
        list1: A sorted list of elements.
        list2: A sorted list of elements.

    Returns:
        A new sorted list containing all elements from list1 and list2.
    """
    merged = []
    i, j = 0, 0
    len1, len2 = len(list1), len(list2)

    # Compare elements from both lists and append the smaller one
    while i < len1 and j < len2:
        if list1[i] <= list2[j]:
            merged.append(list1[i])
            i += 1
        else:
            merged.append(list2[j])
            j += 1

    # Append any remaining elements from either list
    merged.extend(list1[i:])
    merged.extend(list2[j:])

    return merged


# Example Usage:
if __name__ == "__main__":
    a = [1, 3, 5, 7]
    b = [2, 4, 6, 8, 9, 10]
    result = merge_sorted_lists(a, b)
    print(result)  # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### Python Standard Library Alternative
If you prefer using Python's built-in libraries, you can use `heapq.merge`, which returns an iterator and avoids loading everything into memory at once:

```python
import heapq


def merge_sorted_lists_heapq(list1: list, list2: list) -> list:
    return list(heapq.merge(list1, list2))
```

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Here is the standard two-pointer implementation, which achieves optimal **$O(n + m)$** time complexity and **$O(n + m)$** space complexity.\n\n```python\ndef merge_sorted_lists(list1: list, list2: list) -> list:\n    \"\"\"Merges two pre-sorted lists into a single sorted list.\n\n    Args:\n        list1: A sorted list of elements.\n        list2: A sorted list of elements.\n\n    Returns:\n        A new sorted list containing all elements from list1 and list2.\n    \"\"\"\n    merged = []\n    i, j = 0, 0\n    len1, len2 = len(list1), len(list2)\n\n    # Compare elements from both lists and append the smaller one\n    while i < len1 and j < len2:\n        if list1[i] <= list2[j]:\n            merged.append(list1[i])\n            i += 1\n        else:\n            merged.append(list2[j])\n            j += 1\n\n    # Append any remaining elements from either list\n    merged.extend(list1[i:])\n    merged.extend(list2[j:])\n\n    return merged\n\n\n# Example Usage:\nif __name__ == \"__main__\":\n    a = [1, 3, 5, 7]\n    b = [2, 4, 6, 8, 9, 10]\n    result = merge_sorted_lists(a, b)\n    print(result)  # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n```\n\n### Python Standard Library Alternative\nIf you prefer using Python's built-in libraries, you can use `heapq.merge`, which returns an iterator and avoids loading everything into memory at once:\n\n```python\nimport heapq\n\n\ndef merge_sorted_lists_heapq(list1: list, list2: list) -> list:\n    return list(heapq.merge(list1, list2))\n```",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP",
      "citationMetadata": {
        "citations": [
          {
            "startIndex": 640,
            "endIndex": 961,
            "uri": "https://github.com/s-m-quadri/geca-labs"
          }
        ]
      }
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 32,
    "candidatesTokenCount": 472,
    "totalTokenCount": 988,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 32
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 472
      }
    ],
    "thoughtsTokenCount": 484
  },
  "modelVersion": "gemini-3.6-flash",
  "createTime": "2026-07-21T16:21:23.639338Z",
  "responseId": "g5xfauqCJ-2r8sYPq8XmoQg"
}
```

**Multi-turn Conversation** — Continuing a multi-step coding conversation, typical of an agentic loop

```ts
const response = await env.AI.run(
  'google/gemini-3.6-flash',
  {
    contents: [
      {
        parts: [{ text: 'I have a bug where my recursive fibonacci function is too slow for n=40.' }],
        role: 'user',
      },
      {
        parts: [
          {
            text: "That's expected with naive recursion since it recomputes overlapping subproblems exponentially. You can fix it with memoization or an iterative approach. Which would you like to see?",
          },
        ],
        role: 'model',
      },
      { parts: [{ text: 'Show me the memoized version.' }], role: 'user' },
    ],
    generationConfig: { maxOutputTokens: 2048 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.6-flash",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "I have a bug where my recursive fibonacci function is too slow for n=40."
          }
        ],
        "role": "user"
      },
      {
        "parts": [
          {
            "text": "That'\''s expected with naive recursion since it recomputes overlapping subproblems exponentially. You can fix it with memoization or an iterative approach. Which would you like to see?"
          }
        ],
        "role": "model"
      },
      {
        "parts": [
          {
            "text": "Show me the memoized version."
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

Here is how to optimize your recursive Fibonacci function using **memoization**.

Memoization stores the results of expensive function calls in a cache (like a dictionary or map) so you don't recompute the same values over and over. This reduces the time complexity from **$O(2^n)$** (exponential) to **$O(n)$** (linear).

---

### Python Example

#### Option 1: Manual Cache (Shows how it works under the hood)
```python
def fib(n, memo={}):
    # 1. Check if the result is already in the cache
    if n in memo:
        return memo[n]

    # 2. Base cases
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # 3. Compute and store in cache before returning
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]


# Test
print(fib(40))  # Returns 102334155 instantly
```

#### Option 2: Python's Built-in `@lru_cache` (Cleanest)
If you are using Python, you don't even need to modify your function logic—just add a decorator:

```python
from functools import lru_cache


# maxsize=None allows the cache to grow indefinitely
@lru_cache(maxsize=None)
def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1

    return fib(n - 1) + fib(n - 2)


print(fib(40))  # Instantly computes
```

---

### JavaScript Example

```javascript
function fib(n, memo = {}) {
    // 1. Check cache
    if (n in memo) return memo[n];

    // 2. Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;

    // 3. Compute and store
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

console.log(fib(40)); // 102334155
```

---

### What changed?
* **Without Memoization ($n=40$):** Takes roughly **1.1 trillion function calls**, taking minutes or hours to finish.
* **With Memoization ($n=40$):** Takes only **40 function calls**, finishing in less than a millisecond.

*(Let me know if you need this written in a different programming language like C++, Java, or Rust!)*

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Here is how to optimize your recursive Fibonacci function using **memoization**. \n\nMemoization stores the results of expensive function calls in a cache (like a dictionary or map) so you don't recompute the same values over and over. This reduces the time complexity from **$O(2^n)$** (exponential) to **$O(n)$** (linear).\n\n---\n\n### Python Example\n\n#### Option 1: Manual Cache (Shows how it works under the hood)\n```python\ndef fib(n, memo={}):\n    # 1. Check if the result is already in the cache\n    if n in memo:\n        return memo[n]\n\n    # 2. Base cases\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n\n    # 3. Compute and store in cache before returning\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n\n\n# Test\nprint(fib(40))  # Returns 102334155 instantly\n```\n\n#### Option 2: Python's Built-in `@lru_cache` (Cleanest)\nIf you are using Python, you don't even need to modify your function logic—just add a decorator:\n\n```python\nfrom functools import lru_cache\n\n\n# maxsize=None allows the cache to grow indefinitely\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n\n    return fib(n - 1) + fib(n - 2)\n\n\nprint(fib(40))  # Instantly computes\n```\n\n---\n\n### JavaScript Example\n\n```javascript\nfunction fib(n, memo = {}) {\n    // 1. Check cache\n    if (n in memo) return memo[n];\n    \n    // 2. Base cases\n    if (n <= 0) return 0;\n    if (n === 1) return 1;\n\n    // 3. Compute and store\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n    return memo[n];\n}\n\nconsole.log(fib(40)); // 102334155\n```\n\n---\n\n### What changed?\n* **Without Memoization ($n=40$):** Takes roughly **1.1 trillion function calls**, taking minutes or hours to finish.\n* **With Memoization ($n=40$):** Takes only **40 function calls**, finishing in less than a millisecond.\n\n*(Let me know if you need this written in a different programming language like C++, Java, or Rust!)*",
            "thoughtSignature": "AY89a1+ctnO9pFN+e7hgW0eZao5X3ew4AhkhyjLFp8H/8277YIUwpU9afhv8Sqb+P9/tYhd+SuWIOyutodLO4F8akA+FkY8qD1Ib3js3+4tcLU9L1gxGKG+/EBA6Hdgh5EBtyf4/1KqsMTAsnPwV0UTF/HRo64vqoyXoX8FBnKiXYLsYDmnBXNMPSudVsSDuuPUOdQM9Siig8F7jLArxYFvDSeQcEgKw3PnAXMLFD3rHiNsAglqZvtsue/04p6JG/LwAswI0GOCXvt9T1iknzVFIAISWkGymKs+jSNF9uwRzcbmDcndEntX4pbKlOBztkB5Eo0m2zw+VecVXy/cScmGCQYUNONikvTWU7MeUlYWRYbLbN/v5GHpFn5nbgVtHzpQpdPhUJEJP6z8fVuRtx3UQOxGSHmpG3xNCDaWDuJEvk2qjBqW8lguRpFZIDO516CV8etHYCi53MkDMZPv8JGWy1+wkqu4/6TyKtG+O3q3NUx2OBQwsUYzfIl+487pmJ/2XtF3mq4eoL4HaXJ+lXBNfjDzJRuj8NyQuG/5yUFpzpAEllh3RoqplDYexbO9LhelfudqAUSiqsRS9yxHZZBMSEoVjpKBlLp5j5wCq5gNDR3MvdqOps4GR91jDiKfF1BWEh3m2x7XV6+L2NNi9KPP1hZBmTExR3W1OXeKpUJLr8t5ROT0650xPAj3Ch2cDzHAEBo67ScwwVUEt8zXRx67p5nmT8GT8IMuzqulPj33Kk/XGmBJ6xoHwgivUPhs2ZPjlV0oDVRRcXUdQkb3yBQMgPmrTK/yE96TIzLaY02f2X7RIpeG+aNi+WSd6DNHGadLXPV2+UbP6mE+0eGj/1eZiyHdH4uANyjIZ5vRQYrsq4R6WC4LWS2a7ClFIcEQOXNTe5YcdqgFc4D+XLubk7SwIGlaIvAAN3UgaPxphDcw0ci0GLKN5NWikEj5y05JnAP0k70I7eNDcvwC8utNX9nNYRdzvJm5tEVjhNhYFmLjtpi3ca8w0wlE+WK1qA+ILYaO5qrvjNm2jFllqRKdBE1i2glFTNZO+dNL43bTgydtXjjrWpFqFFTnx9mP8NLWV/6nA4XdE+JfQA4CQ3JHy6vJAJPbh5cEmS/FRreFwNfS8U6wGaNx3VioqLDnVf9aI0edEEI4m0f7XWsT9dkdWxThfycC95HSFkX9jvUpv5e4dqzNo8bccenbE++4M4qhiqFL9SP5Ov6arYpl33P4rTEDGOHWHIlzupvM5EJ1IkppuSjh2UQm/PtAgHxxuE68riJ3YgbVvY5J7BekLtQMOzvLuEGFU3VGa2ArMs/dtHsfYygv3Nlrzs4IwOKuMo4V0mXYpsKxDckn/Yu3eSxgZzALRcU3Vytm+g6Mutzc5fvZCi4kDVKlW2yDrGFtTk1v116ggtQDPwREyI4+DzO7Cl8NqIZPgvM0NLnuZgNAgF4mABtf6FaTe/C8I9sHYzYVFOft3h1BN993hcAUpJW2aJHYaIChCNKUKBbX7f5nCUtgZ93NhUedLiDnOasVZB9xeR30wWglInifB77Q2Ue1QGXrBlPWyolODYjOcg4ZG42eI80sb5lAojzh3dtfGcf7AUfnNnHWV5dlSVa4uvZw1FF+RyEJuV+UcnSa3Kgjr2YPvD0GxecqBnIP7R7Weahl+mvLx362MYqfOu7+0+l02BCUcyMjWCymfBc+I5O1ILCUxQMnVf/CQZLUKziWrXwXESxeZqkAFqkzYQltrtxwjBddq"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 62,
    "candidatesTokenCount": 631,
    "totalTokenCount": 1031,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 62
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 631
      }
    ],
    "thoughtsTokenCount": 338
  },
  "modelVersion": "gemini-3.6-flash",
  "createTime": "2026-07-21T16:21:27.790920Z",
  "responseId": "h5xfaoijMIWq8sYPycj20Q0"
}
```

**Spatial Reasoning** — Higher thinking budget for a spatial reasoning task

```ts
const response = await env.AI.run(
  'google/gemini-3.6-flash',
  {
    contents: [
      {
        parts: [
          {
            text: 'A cube is painted red on all faces, then cut into 27 equal smaller cubes. How many of the smaller cubes have exactly two red faces?',
          },
        ],
        role: 'user',
      },
    ],
    generationConfig: { maxOutputTokens: 4096 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-3.6-flash",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "A cube is painted red on all faces, then cut into 27 equal smaller cubes. How many of the smaller cubes have exactly two red faces?"
          }
        ],
        "role": "user"
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 4096
    }
  }
}'
```

There are **12** smaller cubes that have exactly two red faces.

### Breakdown of the solution:

When a cube is cut into 27 equal smaller cubes, it forms a **$3 \times 3 \times 3$ grid**. The location of a small cube determines how many of its faces are painted red:

1. **Corner cubes (3 painted faces):** There are **8** corners on a cube, so 8 small cubes have 3 red faces.
2. **Edge cubes (2 painted faces):** These are the cubes along the edges, excluding the corners. A cube has **12 edges**, and with a $3 \times 3 \times 3$ grid, there is exactly 1 such cube per edge ($12 \times 1 = \mathbf{12}$).
3. **Face-center cubes (1 painted face):** There are **6** faces on a cube, and each face has 1 center cube ($6 \times 1 = 6$).
4. **Inside/Core cube (0 painted faces):** There is **1** cube hidden completely in the center.

**Total check:** $8 + 12 + 6 + 1 = 27$ cubes.

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "There are **12** smaller cubes that have exactly two red faces.\n\n### Breakdown of the solution:\n\nWhen a cube is cut into 27 equal smaller cubes, it forms a **$3 \\times 3 \\times 3$ grid**. The location of a small cube determines how many of its faces are painted red:\n\n1. **Corner cubes (3 painted faces):** There are **8** corners on a cube, so 8 small cubes have 3 red faces.\n2. **Edge cubes (2 painted faces):** These are the cubes along the edges, excluding the corners. A cube has **12 edges**, and with a $3 \\times 3 \\times 3$ grid, there is exactly 1 such cube per edge ($12 \\times 1 = \\mathbf{12}$).\n3. **Face-center cubes (1 painted face):** There are **6** faces on a cube, and each face has 1 center cube ($6 \\times 1 = 6$).\n4. **Inside/Core cube (0 painted faces):** There is **1** cube hidden completely in the center.\n\n**Total check:** $8 + 12 + 6 + 1 = 27$ cubes.",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 31,
    "candidatesTokenCount": 265,
    "totalTokenCount": 1089,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 31
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 265
      }
    ],
    "thoughtsTokenCount": 793
  },
  "modelVersion": "gemini-3.6-flash",
  "createTime": "2026-07-21T16:21:32.579668Z",
  "responseId": "jJxfatSwI9jY8sYPgtSd8Ag"
}
```

## Parameters

Schema variant

Generate ContentChat Completions

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

▶modalities\[\]

`array`

▶audio{}

`object`

▶candidates\[\]

`array`

▶usageMetadata{}

`object`

modelVersion

`string`

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-3.6-flash/#page","headline":"Gemini 3.6 Flash (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Gemini 3.6 Flash provides sustained frontier-level intelligence optimized for real-world tasks at a higher speed and lower cost, excelling at code generation, agentic execution, and spatial reasoning.","url":"https://developers.cloudflare.com/ai/models/google/gemini-3.6-flash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
