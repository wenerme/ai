---
description: Google's frontier model for deep work on complex, real-world tasks across coding, finance, legal, cybersecurity and science. The first model in the Gemini 4 family.
title: Gemini 4 Argon
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 4 Argon

Text Generation • Google

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-4-argon/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-4-argon`

- Third-party
- Zero data retention

Google's frontier model for deep work on complex, real-world tasks across coding, finance, legal, cybersecurity and science. The first model in the Gemini 4 family.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms) |
| More information | [link ↗](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-argon) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$2.00</li><li>Cached input (per 1M tokens)$0.10</li><li>Output (per 1M tokens)$10.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-4-argon',
  {
    contents: [
      {
        parts: [
          {
            text: 'What are the key differences between optimistic and pessimistic concurrency control in distributed systems?',
          },
        ],
        role: 'user',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-4-argon",
  "input": {
    "contents": [
      {
        "parts": [
          {
            "text": "What are the key differences between optimistic and pessimistic concurrency control in distributed systems?"
          }
        ],
        "role": "user"
      }
    ]
  }
}'
```

```
In distributed systems, concurrency control mechanisms ensure that multiple nodes can access and modify shared data simultaneously without violating data integrity (ACID properties).

The choice between **Pessimistic Concurrency Control (PCC)** and **Optimistic Concurrency Control (OCC)** comes down to a fundamental philosophical question: *How likely is it that two nodes will try to change the same data at the exact same time?*

Here are the key differences between the two approaches in a distributed context.

---

### 1. Core Philosophy
*   **Pessimistic (PCC):** Assumes conflicts are **frequent**. It prevents conflicts before they happen by blocking other transactions from accessing the data currently being used. Philosophy: *"Ask for permission."*
*   **Optimistic (OCC):** Assumes conflicts are **rare**. It allows transactions to proceed without locking resources and only checks for conflicts right before committing the data. Philosophy: *"Ask for forgiveness."*

### 2. Mechanism of Action
*   **Pessimistic:** Uses **Distributed Locks** (e.g., Two-Phase Locking, or 2PL).
    1. A node requests a lock on a record from a lock manager (or via consensus).
    2. Once acquired, it reads, modifies, and writes the data.
    3. It releases the lock. Other nodes must wait in a queue until the lock is released.
*   **Optimistic:** Uses **Timestamps or Version Numbers** (e.g., Multi-Version Concurrency Control, or MVCC).
    1. **Read Phase:** A node reads the data and its version number into a local workspace.
    2. **Modify Phase:** The node makes changes locally.
    3. **Validate & Write Phase:** The node checks if the shared data’s version number has changed since the Read Phase. If it hasn't, it commits and increments the version. If it *has* changed (a conflict occurred), the transaction is aborted and must be retried.

### 3. Impact of Network Latency (The Distributed Factor)
In a single-node database, locks take microseconds. In a distributed system, locks require network round-trips, which take milliseconds. This magnifies the differences:
*   **Pessimistic:** Holding a lock over a network is expensive. If Node A locks a row and experiences a network delay, Nodes B, C, and D are completely blocked. This drastically reduces system throughput.
*   **Optimistic:** Because there are no locks, nodes do not wait on network round-trips from other nodes to read or process data. Network overhead is only incurred during the final validation phase, leading to much higher throughput in low-conflict scenarios.

### 4. Failure Modes: Deadlocks vs. Starvation
*   **Pessimistic (Deadlocks):** Because nodes hold locks while waiting for other locks, **distributed deadlocks** are a major risk (Node A waits for Node B, while Node B waits for Node A). Detecting and resolving deadlocks across a network is complex and resource-intensive. Furthermore, if a node crashes while holding a lock, the system stalls until a timeout occurs.
*   **Optimistic (Starvation/Live-locks):** OCC is deadlock-free because no locks are held. However, it suffers from **wasted work**. If contention is high, transactions will constantly fail validation and roll back. A long-running transaction might be repeatedly aborted by shorter transactions, leading to "starvation" (never being able to complete).

### 5. Performance Under Contention
*   **High Contention (Many writes to the same data):** **PCC wins.** Although nodes have to wait in line, every transaction that gets a lock is guaranteed to succeed. In OCC, high contention leads to a "retry storm," where the network is flooded with aborted transactions trying to run again.
*   **Low Contention (Read-heavy, or writes to different data):** **OCC wins.** Transactions fly through the system without the heavy overhead of acquiring and releasing distributed locks.

---

### Summary Comparison Table

| Feature | Pessimistic Concurrency (PCC) | Optimistic Concurrency (OCC) |
| :--- | :--- | :--- |
| **Conflict Assumption** | Conflicts are likely. | Conflicts are rare. |
| **When is conflict detected?** | When requesting access to data. | At the very end, before committing. |
| **Conflict Resolution** | Block/Wait until the lock is free. | Abort/Rollback and retry the transaction. |
| **Primary Overhead** | Lock management and network wait times. | Wasted compute/network on rollbacks. |
| **Major Risk** | Distributed Deadlocks & Node Crashes. | Transaction Starvation & Retry Storms. |
| **Best Workload** | Write-heavy, high contention. | Read-heavy, low contention. |

### Real-World Distributed Examples
*   **Pessimistic:** Financial ledgers (preventing double-spending), ticket/inventory booking systems (where 1,000 users try to buy the last concert ticket simultaneously). *Tech: Google Cloud Spanner (uses Paxos and 2PL for writes), Apache ZooKeeper (for distributed locking).*
*   **Optimistic:** Content management systems, Wikipedia, e-commerce product catalogs, and most microservices APIs (using HTTP `ETags` for optimistic locking). *Tech: CockroachDB (uses Timestamp Ordering), Amazon DynamoDB (supports conditional writes/optimistic locking).*
```

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "In distributed systems, concurrency control mechanisms ensure that multiple nodes can access and modify shared data simultaneously without violating data integrity (ACID properties). \n\nThe choice between **Pessimistic Concurrency Control (PCC)** and **Optimistic Concurrency Control (OCC)** comes down to a fundamental philosophical question: *How likely is it that two nodes will try to change the same data at the exact same time?*\n\nHere are the key differences between the two approaches in a distributed context.\n\n---\n\n### 1. Core Philosophy\n*   **Pessimistic (PCC):** Assumes conflicts are **frequent**. It prevents conflicts before they happen by blocking other transactions from accessing the data currently being used. Philosophy: *\"Ask for permission.\"*\n*   **Optimistic (OCC):** Assumes conflicts are **rare**. It allows transactions to proceed without locking resources and only checks for conflicts right before committing the data. Philosophy: *\"Ask for forgiveness.\"*\n\n### 2. Mechanism of Action\n*   **Pessimistic:** Uses **Distributed Locks** (e.g., Two-Phase Locking, or 2PL). \n    1. A node requests a lock on a record from a lock manager (or via consensus).\n    2. Once acquired, it reads, modifies, and writes the data.\n    3. It releases the lock. Other nodes must wait in a queue until the lock is released.\n*   **Optimistic:** Uses **Timestamps or Version Numbers** (e.g., Multi-Version Concurrency Control, or MVCC).\n    1. **Read Phase:** A node reads the data and its version number into a local workspace.\n    2. **Modify Phase:** The node makes changes locally.\n    3. **Validate & Write Phase:** The node checks if the shared data’s version number has changed since the Read Phase. If it hasn't, it commits and increments the version. If it *has* changed (a conflict occurred), the transaction is aborted and must be retried.\n\n### 3. Impact of Network Latency (The Distributed Factor)\nIn a single-node database, locks take microseconds. In a distributed system, locks require network round-trips, which take milliseconds. This magnifies the differences:\n*   **Pessimistic:** Holding a lock over a network is expensive. If Node A locks a row and experiences a network delay, Nodes B, C, and D are completely blocked. This drastically reduces system throughput.\n*   **Optimistic:** Because there are no locks, nodes do not wait on network round-trips from other nodes to read or process data. Network overhead is only incurred during the final validation phase, leading to much higher throughput in low-conflict scenarios.\n\n### 4. Failure Modes: Deadlocks vs. Starvation\n*   **Pessimistic (Deadlocks):** Because nodes hold locks while waiting for other locks, **distributed deadlocks** are a major risk (Node A waits for Node B, while Node B waits for Node A). Detecting and resolving deadlocks across a network is complex and resource-intensive. Furthermore, if a node crashes while holding a lock, the system stalls until a timeout occurs.\n*   **Optimistic (Starvation/Live-locks):** OCC is deadlock-free because no locks are held. However, it suffers from **wasted work**. If contention is high, transactions will constantly fail validation and roll back. A long-running transaction might be repeatedly aborted by shorter transactions, leading to \"starvation\" (never being able to complete).\n\n### 5. Performance Under Contention\n*   **High Contention (Many writes to the same data):** **PCC wins.** Although nodes have to wait in line, every transaction that gets a lock is guaranteed to succeed. In OCC, high contention leads to a \"retry storm,\" where the network is flooded with aborted transactions trying to run again.\n*   **Low Contention (Read-heavy, or writes to different data):** **OCC wins.** Transactions fly through the system without the heavy overhead of acquiring and releasing distributed locks. \n\n---\n\n### Summary Comparison Table\n\n| Feature | Pessimistic Concurrency (PCC) | Optimistic Concurrency (OCC) |\n| :--- | :--- | :--- |\n| **Conflict Assumption** | Conflicts are likely. | Conflicts are rare. |\n| **When is conflict detected?** | When requesting access to data. | At the very end, before committing. |\n| **Conflict Resolution** | Block/Wait until the lock is free. | Abort/Rollback and retry the transaction. |\n| **Primary Overhead** | Lock management and network wait times. | Wasted compute/network on rollbacks. |\n| **Major Risk** | Distributed Deadlocks & Node Crashes. | Transaction Starvation & Retry Storms. |\n| **Best Workload** | Write-heavy, high contention. | Read-heavy, low contention. |\n\n### Real-World Distributed Examples\n*   **Pessimistic:** Financial ledgers (preventing double-spending), ticket/inventory booking systems (where 1,000 users try to buy the last concert ticket simultaneously). *Tech: Google Cloud Spanner (uses Paxos and 2PL for writes), Apache ZooKeeper (for distributed locking).*\n*   **Optimistic:** Content management systems, Wikipedia, e-commerce product catalogs, and most microservices APIs (using HTTP `ETags` for optimistic locking). *Tech: CockroachDB (uses Timestamp Ordering), Amazon DynamoDB (supports conditional writes/optimistic locking).*",
            "thoughtSignature": "AY89a1+B/ZlSIwm2seo+oToVuzFZ5gjCKXjrIWKdFu30/x3yV+dRnCO9o7n92KLTY3Q+yNN4+qz1hJ/uneonSSCnmL+wmT8GAGquO9yknltULvbJEQ=="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 46,
    "candidatesTokenCount": 1151,
    "totalTokenCount": 1197,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 46
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 1151
      }
    ]
  },
  "modelVersion": "gemini-4-argon",
  "createTime": "2026-10-13T17:07:24.709810Z",
  "responseId": "TGXOarKpK_2p8sYPuKPGoQI"
}
```

## Examples

<details>

<summary>**Agentic Coding** — Coding task with a system instruction</summary>



```ts
const response = await env.AI.run(
  'google/gemini-4-argon',
  {
    contents: [
      {
        parts: [
          { text: 'Write a Python function that merges two sorted lists into one sorted list.' },
        ],
        role: 'user',
      },
    ],
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
  "model": "google/gemini-4-argon",
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

````
Here are the two best ways to merge two sorted lists in Python: one using the standard library (recommended for production) and one using the classic two-pointer algorithm (common in interviews).

### 1. The Pythonic Way (Recommended)
Python’s built-in `heapq.merge` is specifically designed for this. It is implemented in C, making it fast and memory-efficient.

```python
import heapq
from typing import List, TypeVar

T = TypeVar("T")


def merge_sorted_lists(list1: List[T], list2: List[T]) -> List[T]:
    """Merges two sorted lists into a single sorted list using heapq.

    Time Complexity: O(n + m)
    Space Complexity: O(n + m) to store the resulting list.
    """
    return list(heapq.merge(list1, list2))


# Example usage:
# print(merge_sorted_lists([1, 3, 5], [2, 4, 6]))  # Output: [1, 2, 3, 4, 5, 6]
```

### 2. The Algorithmic Way (Two-Pointer Approach)
If you are in a coding interview and cannot use built-in libraries, use the two-pointer approach.

```python
from typing import List, TypeVar

T = TypeVar("T")


def merge_sorted_lists_manual(list1: List[T], list2: List[T]) -> List[T]:
    """Merges two sorted lists into a single sorted list using two pointers.

    Args:
        list1: The first sorted list.
        list2: The second sorted list.

    Returns:
        A new sorted list containing all elements from list1 and list2.

    Time Complexity: O(n + m) where n and m are the lengths of the lists.
    Space Complexity: O(n + m) for the output list.
    """
    merged = []
    i, j = 0, 0
    len1, len2 = len(list1), len(list2)

    # Traverse both lists and append the smaller element
    while i < len1 and j < len2:
        if list1[i] <= list2[j]:
            merged.append(list1[i])
            i += 1
        else:
            merged.append(list2[j])
            j += 1

    # Append any remaining elements (only one of these will execute)
    merged.extend(list1[i:])
    merged.extend(list2[j:])

    return merged


# Example usage:
# print(merge_sorted_lists_manual([1, 3, 5], [2, 4, 6, 8]))  # Output: [1, 2, 3, 4, 5, 6, 8]
```

*Note: For very small lists, `sorted(list1 + list2)` is also very fast in Python because Python's built-in Timsort algorithm is optimized to detect already-sorted subsections, giving it $O(n + m)$ performance in this specific case.*
````

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Here are the two best ways to merge two sorted lists in Python: one using the standard library (recommended for production) and one using the classic two-pointer algorithm (common in interviews).\n\n### 1. The Pythonic Way (Recommended)\nPython’s built-in `heapq.merge` is specifically designed for this. It is implemented in C, making it fast and memory-efficient.\n\n```python\nimport heapq\nfrom typing import List, TypeVar\n\nT = TypeVar(\"T\")\n\n\ndef merge_sorted_lists(list1: List[T], list2: List[T]) -> List[T]:\n    \"\"\"Merges two sorted lists into a single sorted list using heapq.\n\n    Time Complexity: O(n + m)\n    Space Complexity: O(n + m) to store the resulting list.\n    \"\"\"\n    return list(heapq.merge(list1, list2))\n\n\n# Example usage:\n# print(merge_sorted_lists([1, 3, 5], [2, 4, 6]))  # Output: [1, 2, 3, 4, 5, 6]\n```\n\n### 2. The Algorithmic Way (Two-Pointer Approach)\nIf you are in a coding interview and cannot use built-in libraries, use the two-pointer approach.\n\n```python\nfrom typing import List, TypeVar\n\nT = TypeVar(\"T\")\n\n\ndef merge_sorted_lists_manual(list1: List[T], list2: List[T]) -> List[T]:\n    \"\"\"Merges two sorted lists into a single sorted list using two pointers.\n\n    Args:\n        list1: The first sorted list.\n        list2: The second sorted list.\n\n    Returns:\n        A new sorted list containing all elements from list1 and list2.\n\n    Time Complexity: O(n + m) where n and m are the lengths of the lists.\n    Space Complexity: O(n + m) for the output list.\n    \"\"\"\n    merged = []\n    i, j = 0, 0\n    len1, len2 = len(list1), len(list2)\n\n    # Traverse both lists and append the smaller element\n    while i < len1 and j < len2:\n        if list1[i] <= list2[j]:\n            merged.append(list1[i])\n            i += 1\n        else:\n            merged.append(list2[j])\n            j += 1\n\n    # Append any remaining elements (only one of these will execute)\n    merged.extend(list1[i:])\n    merged.extend(list2[j:])\n\n    return merged\n\n\n# Example usage:\n# print(merge_sorted_lists_manual([1, 3, 5], [2, 4, 6, 8]))  # Output: [1, 2, 3, 4, 5, 6, 8]\n```\n\n*Note: For very small lists, `sorted(list1 + list2)` is also very fast in Python because Python's built-in Timsort algorithm is optimized to detect already-sorted subsections, giving it $O(n + m)$ performance in this specific case.*",
            "thoughtSignature": "AY89a1+/LrK2jXxLmBaHprRBVeDNnI475SQ66hmgm0NAESde+zMoKWM25WR7J+tZyCu7245dEioqKBKXMg/oF8/iXUehMAw9jEXuwL4MyN9GhOjFXw=="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 68,
    "candidatesTokenCount": 715,
    "totalTokenCount": 783,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 68
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 715
      }
    ]
  },
  "modelVersion": "gemini-4-argon",
  "createTime": "2026-10-13T17:07:38.420541Z",
  "responseId": "WmXOar3VGZ2skPsPzIu6wAY"
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a multi-step coding conversation, typical of an agentic loop</summary>



```ts
const response = await env.AI.run(
  'google/gemini-4-argon',
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
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-4-argon",
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
    ]
  }
}'
```

````
Here is how to fix it using memoization. Since you didn't specify a language, here are examples in Python and JavaScript (let me know if you are using something else).

### Python

In Python, the easiest way is to use the built-in `@lru_cache` (or `@cache` in Python 3.9+) decorator. It automatically stores the results of previous function calls.

```python
from functools import lru_cache


@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


print(fib(40))  # Runs instantly: 102334155
```

**Manual approach (without imports):**
You can also pass a dictionary to store the results manually.

```python
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]


print(fib(40))  # 102334155
```

### JavaScript

In JavaScript, you can pass an object (`memo`) as a default parameter to cache the results.

```javascript
function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

console.log(fib(40)); // Runs instantly: 102334155
```

### Why this fixes the bug:
* **Before (Naive):** Calculating `fib(40)` required roughly **331 million** function calls ($O(2^n)$ time complexity) because it recalculated `fib(38)`, `fib(37)`, etc., millions of times.
* **After (Memoized):** Each number's Fibonacci value is calculated only once and then retrieved from memory. Calculating `fib(40)` now takes only **79** function calls ($O(n)$ time complexity).
````

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Here is how to fix it using memoization. Since you didn't specify a language, here are examples in Python and JavaScript (let me know if you are using something else).\n\n### Python\n\nIn Python, the easiest way is to use the built-in `@lru_cache` (or `@cache` in Python 3.9+) decorator. It automatically stores the results of previous function calls.\n\n```python\nfrom functools import lru_cache\n\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\n\nprint(fib(40))  # Runs instantly: 102334155\n```\n\n**Manual approach (without imports):**\nYou can also pass a dictionary to store the results manually.\n\n```python\ndef fib(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n\n\nprint(fib(40))  # 102334155\n```\n\n### JavaScript\n\nIn JavaScript, you can pass an object (`memo`) as a default parameter to cache the results.\n\n```javascript\nfunction fib(n, memo = {}) {\n    if (n in memo) return memo[n];\n    if (n <= 1) return n;\n    \n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n    return memo[n];\n}\n\nconsole.log(fib(40)); // Runs instantly: 102334155\n```\n\n### Why this fixes the bug:\n* **Before (Naive):** Calculating `fib(40)` required roughly **331 million** function calls ($O(2^n)$ time complexity) because it recalculated `fib(38)`, `fib(37)`, etc., millions of times.\n* **After (Memoized):** Each number's Fibonacci value is calculated only once and then retrieved from memory. Calculating `fib(40)` now takes only **79** function calls ($O(n)$ time complexity).",
            "thoughtSignature": "AY89a1/uBOBhQ0qUKNEsYwE4H9cWHXsKJeFhfnYkTwwTCLxszJv1hhQupgjY78MG1tiB7lewI70d3pD8vELzR5yam/Fy84daQ/NRt0Y1wlj/ZWq11A=="
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 101,
    "candidatesTokenCount": 522,
    "totalTokenCount": 623,
    "trafficType": "ON_DEMAND",
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 101
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 522
      }
    ]
  },
  "modelVersion": "gemini-4-argon",
  "createTime": "2026-10-13T17:07:44.524175Z",
  "responseId": "YGXOao__H8mn8sYPvI7UuAU"
}
```

</details>

<details>

<summary>**Spatial Reasoning** — A reasoning-heavy puzzle with the thinking level set to HIGH</summary>



```ts
const response = await env.AI.run(
  'google/gemini-4-argon',
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
    generationConfig: { thinkingConfig: { thinkingLevel: 'HIGH' } },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-4-argon",
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
      "thinkingConfig": {
        "thinkingLevel": "HIGH"
      }
    }
  }
}'
```

```
There are **12** smaller cubes that have exactly two red faces.

Here is the breakdown of why:

Since the large cube is cut into 27 equal smaller cubes, it is divided into a **3 x 3 x 3 grid** (just like a standard Rubik's Cube).

The smaller cubes can be categorized by their position on the original large cube:
*   **3 red faces (Corners):** A cube has 8 corners, so there are **8** of these.
*   **2 red faces (Edges):** These are the cubes in the middle of each edge, between the corners. A cube has 12 edges, and since it is a 3x3x3 grid, there is 1 middle cube per edge. (12 edges × 1 cube = **12**).
*   **1 red face (Centers):** These are in the very center of each of the 6 faces. (6 faces × 1 center cube = **6**).
*   **0 red faces (Core):** This is the single cube hidden in the very center of the large cube (**1**).

*(Total: 8 + 12 + 6 + 1 = 27 cubes)*
```

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "There are **12** smaller cubes that have exactly two red faces.\n\nHere is the breakdown of why:\n\nSince the large cube is cut into 27 equal smaller cubes, it is divided into a **3 x 3 x 3 grid** (just like a standard Rubik's Cube). \n\nThe smaller cubes can be categorized by their position on the original large cube:\n*   **3 red faces (Corners):** A cube has 8 corners, so there are **8** of these.\n*   **2 red faces (Edges):** These are the cubes in the middle of each edge, between the corners. A cube has 12 edges, and since it is a 3x3x3 grid, there is 1 middle cube per edge. (12 edges × 1 cube = **12**).\n*   **1 red face (Centers):** These are in the very center of each of the 6 faces. (6 faces × 1 center cube = **6**).\n*   **0 red faces (Core):** This is the single cube hidden in the very center of the large cube (**1**).\n\n*(Total: 8 + 12 + 6 + 1 = 27 cubes)*",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 62,
    "candidatesTokenCount": 266,
    "totalTokenCount": 1152,
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
        "tokenCount": 266
      }
    ],
    "thoughtsTokenCount": 824
  },
  "modelVersion": "gemini-4-argon",
  "createTime": "2026-10-13T17:07:50.028403Z",
  "responseId": "ZmXOavPdAbyt8sYPi8rYkAE"
}
```

</details>

## Parameters

Schema variant

Generate ContentChat Completions

▶contents\[]

`array`required

▶systemInstruction{}

`object`

▶generationConfig{}

`object`

▶safetySettings\[]

`array`

▶tools\[]

`array`

toolConfig

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

▶candidates\[]

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

▶choices\[]

`array`

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/google/gemini-4-argon/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-4-argon/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/gemini-4-argon/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-4-argon/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-4-argon/#page","headline":"Gemini 4 Argon","description":"Google's frontier model for deep work on complex, real-world tasks across coding, finance, legal, cybersecurity and science. The first model in the Gemini 4 family.","url":"https://developers.cloudflare.com/ai/models/google/gemini-4-argon/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
