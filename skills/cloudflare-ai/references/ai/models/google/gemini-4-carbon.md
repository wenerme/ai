---
description: Google's most capable Gemini 4 reasoning model, built for complex software engineering, math and science problems, autonomous multi-step agents, and long outputs up to 1M tokens.
title: Gemini 4 Carbon
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini 4 Carbon

Text Generation • Google

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`google/gemini-4-carbon` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party
- Zero data retention

Google's most capable Gemini 4 reasoning model, built for complex software engineering, math and science problems, autonomous multi-step agents, and long outputs up to 1M tokens.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 1,048,576 tokens |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms) |
| More information | [link ↗](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-carbon) |
| Zero data retention | Yes |
| Request formats | Chat Completions |
| Pricing | <ul><li>Input (per 1M tokens)$2.00</li><li>Output (per 1M tokens)$10.00</li><li>Cached input (per 1M tokens)$0.10</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-4-carbon',
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
  "model": "google/gemini-4-carbon",
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
In distributed systems, concurrency control ensures that multiple nodes or clients can access and modify shared data simultaneously without corrupting it or violating consistency guarantees.

The fundamental difference between **Pessimistic Concurrency Control (PCC)** and **Optimistic Concurrency Control (OCC)** lies in how they anticipate and handle data conflicts—a challenge that is heavily amplified in distributed environments due to network latency, partial failures, and lack of a global clock.

Here are the key differences between the two approaches in distributed systems:

---

### 1. Core Philosophy & Execution Flow
*   **Pessimistic (PCC):** Assumes conflicts are **likely**. A transaction acquires exclusive or shared locks on the data across the relevant nodes *before* reading or modifying it. Other transactions trying to access the same data are blocked until the lock is released. *(“Ask for permission.”)*
*   **Optimistic (OCC):** Assumes conflicts are **rare**. Transactions execute locally without acquiring locks. They read data (often noting a version number or timestamp), compute changes, and validate at **commit time** whether another node modified the data in the interim. If a conflict is detected, the transaction aborts and retries. *(“Ask for forgiveness.”)*

### 2. Network Overhead and Latency
*   **Pessimistic:** High upfront network overhead. Acquiring and releasing distributed locks requires multiple network round-trips (often using protocols like Two-Phase Locking combined with Two-Phase Commit, or external coordinators like ZooKeeper/etcd) before work can safely finish. Locks are held across network boundaries, extending lock duration due to network latency.
*   **Optimistic:** Low upfront latency. Reads and local computations require minimal coordination. Network coordination only happens during the final validation/commit phase (e.g., via an atomic Compare-And-Swap operation or distributed consensus). However, if a conflict occurs, the entire network cost is wasted and must be repeated.

### 3. Handling Partial Failures and Node Crashes
In a distributed system, nodes can crash or experience network partitions at any time.
*   **Pessimistic:** Vulnerable to **blocking on failure**. If a client or coordinator node crashes while holding a distributed lock, that data becomes unavailable to the rest of the cluster until a lease/timeout expires and recovery protocols run.
*   **Optimistic:** Highly resilient to slow or crashing clients. Because no locks are held during the read and compute phases, a crashed client does not block any other nodes in the system from making progress.

### 4. Deadlocks vs. Livelocks (Starvation)
*   **Pessimistic:** Prone to **distributed deadlocks** (e.g., Node A locks Record 1 and waits for Record 2 on Node B, while Node B locks Record 2 and waits for Record 1). Detecting and resolving deadlocks across a network is complex and usually relies on aggressive timeouts.
*   **Optimistic:** **Deadlock-free** because transactions do not wait on locks. However, under high contention, OCC suffers from **starvation or livelocks**, where competing nodes repeatedly force each other to abort and retry, causing throughput to collapse (thrashing).

### 5. Throughput and Contention Profile
*   **Pessimistic:** Provides predictable, stable throughput under **high contention**. Even though transactions have to wait in line, work that starts is rarely wasted on rollbacks.
*   **Optimistic:** Provides vastly superior throughput and scalability under **low contention** or read-heavy workloads, because nodes operate independently without waiting on a centralized lock manager.

---

### Summary Comparison

| Feature | Pessimistic Concurrency (PCC) | Optimistic Concurrency (OCC) |
| :--- | :--- | :--- |
| **Conflict Detection** | Before data access (Acquire Locks) | At commit time (Validation / Versioning) |
| **Conflict Resolution** | Block / Wait (or Timeout) | Abort, Rollback, and Retry |
| **Failure Impact** | Crashed lock-holders block other nodes | Crashed nodes do not block others |
| **Primary Hazard** | Distributed Deadlocks | Retry storms / Starvation |
| **Cost of Contention** | High latency (waiting for locks) | Wasted compute & network bandwidth (retries) |
| **Common Mechanisms** | Distributed 2PL, Leases, Fencing Tokens | Version vectors, MVCC, Compare-And-Swap, ETags |

---

### Real-World Distributed Examples & When to Choose

**Use Pessimistic Concurrency when:**
*   Write contention on specific records ("hotspots") is high.
*   The cost of rolling back and retrying a transaction is expensive (e.g., complex multi-step workflows or external side effects).
*   *Examples:* Google Cloud Spanner (uses Two-Phase Locking for read-write transactions), distributed lock services (Redis Redlock, ZooKeeper, etcd) guarding critical sections.

**Use Optimistic Concurrency when:**
*   Workloads are read-heavy and writes rarely collide.
*   Transactions span user "think time" or unreliable wide-area networks (where holding locks would paralyze the system).
*   You need maximum horizontal scalability and availability.
*   *Examples:* Microservice APIs using HTTP `ETags` / `If-Match` headers, DynamoDB Conditional Writes, Apache Cassandra Lightweight Transactions (Paxos-based CAS), and conflict-free workflows in Git.
```

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "In distributed systems, concurrency control ensures that multiple nodes or clients can access and modify shared data simultaneously without corrupting it or violating consistency guarantees. \n\nThe fundamental difference between **Pessimistic Concurrency Control (PCC)** and **Optimistic Concurrency Control (OCC)** lies in how they anticipate and handle data conflicts—a challenge that is heavily amplified in distributed environments due to network latency, partial failures, and lack of a global clock.\n\nHere are the key differences between the two approaches in distributed systems:\n\n---\n\n### 1. Core Philosophy & Execution Flow\n*   **Pessimistic (PCC):** Assumes conflicts are **likely**. A transaction acquires exclusive or shared locks on the data across the relevant nodes *before* reading or modifying it. Other transactions trying to access the same data are blocked until the lock is released. *(“Ask for permission.”)*\n*   **Optimistic (OCC):** Assumes conflicts are **rare**. Transactions execute locally without acquiring locks. They read data (often noting a version number or timestamp), compute changes, and validate at **commit time** whether another node modified the data in the interim. If a conflict is detected, the transaction aborts and retries. *(“Ask for forgiveness.”)*\n\n### 2. Network Overhead and Latency\n*   **Pessimistic:** High upfront network overhead. Acquiring and releasing distributed locks requires multiple network round-trips (often using protocols like Two-Phase Locking combined with Two-Phase Commit, or external coordinators like ZooKeeper/etcd) before work can safely finish. Locks are held across network boundaries, extending lock duration due to network latency.\n*   **Optimistic:** Low upfront latency. Reads and local computations require minimal coordination. Network coordination only happens during the final validation/commit phase (e.g., via an atomic Compare-And-Swap operation or distributed consensus). However, if a conflict occurs, the entire network cost is wasted and must be repeated.\n\n### 3. Handling Partial Failures and Node Crashes\nIn a distributed system, nodes can crash or experience network partitions at any time.\n*   **Pessimistic:** Vulnerable to **blocking on failure**. If a client or coordinator node crashes while holding a distributed lock, that data becomes unavailable to the rest of the cluster until a lease/timeout expires and recovery protocols run.\n*   **Optimistic:** Highly resilient to slow or crashing clients. Because no locks are held during the read and compute phases, a crashed client does not block any other nodes in the system from making progress.\n\n### 4. Deadlocks vs. Livelocks (Starvation)\n*   **Pessimistic:** Prone to **distributed deadlocks** (e.g., Node A locks Record 1 and waits for Record 2 on Node B, while Node B locks Record 2 and waits for Record 1). Detecting and resolving deadlocks across a network is complex and usually relies on aggressive timeouts.\n*   **Optimistic:** **Deadlock-free** because transactions do not wait on locks. However, under high contention, OCC suffers from **starvation or livelocks**, where competing nodes repeatedly force each other to abort and retry, causing throughput to collapse (thrashing).\n\n### 5. Throughput and Contention Profile\n*   **Pessimistic:** Provides predictable, stable throughput under **high contention**. Even though transactions have to wait in line, work that starts is rarely wasted on rollbacks.\n*   **Optimistic:** Provides vastly superior throughput and scalability under **low contention** or read-heavy workloads, because nodes operate independently without waiting on a centralized lock manager.\n\n---\n\n### Summary Comparison\n\n| Feature | Pessimistic Concurrency (PCC) | Optimistic Concurrency (OCC) |\n| :--- | :--- | :--- |\n| **Conflict Detection** | Before data access (Acquire Locks) | At commit time (Validation / Versioning) |\n| **Conflict Resolution** | Block / Wait (or Timeout) | Abort, Rollback, and Retry |\n| **Failure Impact** | Crashed lock-holders block other nodes | Crashed nodes do not block others |\n| **Primary Hazard** | Distributed Deadlocks | Retry storms / Starvation |\n| **Cost of Contention** | High latency (waiting for locks) | Wasted compute & network bandwidth (retries) |\n| **Common Mechanisms** | Distributed 2PL, Leases, Fencing Tokens | Version vectors, MVCC, Compare-And-Swap, ETags |\n\n---\n\n### Real-World Distributed Examples & When to Choose\n\n**Use Pessimistic Concurrency when:**\n*   Write contention on specific records (\"hotspots\") is high.\n*   The cost of rolling back and retrying a transaction is expensive (e.g., complex multi-step workflows or external side effects).\n*   *Examples:* Google Cloud Spanner (uses Two-Phase Locking for read-write transactions), distributed lock services (Redis Redlock, ZooKeeper, etcd) guarding critical sections.\n\n**Use Optimistic Concurrency when:**\n*   Workloads are read-heavy and writes rarely collide.\n*   Transactions span user \"think time\" or unreliable wide-area networks (where holding locks would paralyze the system).\n*   You need maximum horizontal scalability and availability.\n*   *Examples:* Microservice APIs using HTTP `ETags` / `If-Match` headers, DynamoDB Conditional Writes, Apache Cassandra Lightweight Transactions (Paxos-based CAS), and conflict-free workflows in Git.",
            "thoughtSignature": "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
... response truncated ...
```

## Examples

<details>

<summary>**Agentic Coding** — Coding task with a system instruction</summary>



```ts
const response = await env.AI.run(
  'google/gemini-4-carbon',
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
  "model": "google/gemini-4-carbon",
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
Here is a concise, efficient implementation using the classic two-pointer approach, which runs in $O(n + m)$ time and $O(n + m)$ space:

```python
from typing import TypeVar

T = TypeVar("T")


def merge_sorted_lists(list1: list[T], list2: list[T]) -> list[T]:
    """Merges two sorted lists into a single sorted list.

    Args:
        list1: The first sorted list.
        list2: The second sorted list.

    Returns:
        A new sorted list containing all elements from both input lists.
    """
    merged: list[T] = []
    i, j = 0, 0
    len1, len2 = len(list1), len(list2)

    # Compare elements from both lists and append the smaller one
    while i < len1 and j < len2:
        if list1[i] <= list2[j]:  # type: ignore[operator]
            merged.append(list1[i])
            i += 1
        else:
            merged.append(list2[j])
            j += 1

    # Append any remaining elements (only one of these slices will be non-empty)
    merged.extend(list1[i:])
    merged.extend(list2[j:])

    return merged
```

### Example Usage

```python
a = [1, 3, 5, 7]
b = [2, 3, 6, 8, 9]

print(merge_sorted_lists(a, b))
# Output: [1, 2, 3, 3, 5, 6, 7, 8, 9]
```

### Pythonic Alternative (`heapq.merge`)
In production code, you can also use Python's standard library `heapq.merge`, which is implemented in C, works on any sorted iterable, and evaluates lazily:

```python
import heapq

merged = list(heapq.merge(list1, list2))
```
````

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Here is a concise, efficient implementation using the classic two-pointer approach, which runs in $O(n + m)$ time and $O(n + m)$ space:\n\n```python\nfrom typing import TypeVar\n\nT = TypeVar(\"T\")\n\n\ndef merge_sorted_lists(list1: list[T], list2: list[T]) -> list[T]:\n    \"\"\"Merges two sorted lists into a single sorted list.\n\n    Args:\n        list1: The first sorted list.\n        list2: The second sorted list.\n\n    Returns:\n        A new sorted list containing all elements from both input lists.\n    \"\"\"\n    merged: list[T] = []\n    i, j = 0, 0\n    len1, len2 = len(list1), len(list2)\n\n    # Compare elements from both lists and append the smaller one\n    while i < len1 and j < len2:\n        if list1[i] <= list2[j]:  # type: ignore[operator]\n            merged.append(list1[i])\n            i += 1\n        else:\n            merged.append(list2[j])\n            j += 1\n\n    # Append any remaining elements (only one of these slices will be non-empty)\n    merged.extend(list1[i:])\n    merged.extend(list2[j:])\n\n    return merged\n```\n\n### Example Usage\n\n```python\na = [1, 3, 5, 7]\nb = [2, 3, 6, 8, 9]\n\nprint(merge_sorted_lists(a, b))\n# Output: [1, 2, 3, 3, 5, 6, 7, 8, 9]\n```\n\n### Pythonic Alternative (`heapq.merge`)\nIn production code, you can also use Python's standard library `heapq.merge`, which is implemented in C, works on any sorted iterable, and evaluates lazily:\n\n```python\nimport heapq\n\nmerged = list(heapq.merge(list1, list2))\n```",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 68,
    "candidatesTokenCount": 472,
    "totalTokenCount": 956,
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
        "tokenCount": 472
      }
    ],
    "thoughtsTokenCount": 416
  },
  "modelVersion": "gemini-4-carbon",
  "createTime": "2026-11-10T15:53:24.940732Z",
  "responseId": "9D3zary1OZe4u-gPsOO98AY"
}
```

</details>

<details>

<summary>**Multi-turn Conversation** — Continuing a multi-step coding conversation, typical of an agentic loop</summary>



```ts
const response = await env.AI.run(
  'google/gemini-4-carbon',
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
  "model": "google/gemini-4-carbon",
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
Since you didn't mention a specific language, here is how to do it in **Python** (the logic translates easily to any language).

Memoization works by storing the results of expensive function calls in a dictionary/hash map so you only calculate each Fibonacci number once. This drops the time complexity from $O(2^n)$ down to $O(n)$, making `n=40` run instantaneously.

### 1. Manual Memoization (Works in any language)
You pass a `memo` dictionary down through the recursive calls to keep track of values you've already solved:

```python
def fib(n, memo=None):
    if memo is None:
        memo = {}

    # 1. Check if we already calculated this value
    if n in memo:
        return memo[n]

    # 2. Base cases
    if n <= 1:
        return n

    # 3. Calculate, store in memo, and return
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]


print(fib(40))  # Outputs: 102334155 instantly
```

*(Note: We use `memo=None` as the default argument instead of `memo={}` to avoid Python's mutable default argument quirk, though `memo={}` would technically work as a persistent cache here.)*

### 2. Using Built-in Caching (Python-specific)
If you happen to be using Python 3.9+, the standard library has a decorator that does this exact thing automatically:

```python
from functools import cache


@cache
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


print(fib(40))
```
*(For Python 3.2–3.8, you can use `@lru_cache(maxsize=None)` from `functools` instead).*

---

If you are using JavaScript, Java, C++, or another language, let me know and I'll write out the syntax for that one!
````

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "Since you didn't mention a specific language, here is how to do it in **Python** (the logic translates easily to any language).\n\nMemoization works by storing the results of expensive function calls in a dictionary/hash map so you only calculate each Fibonacci number once. This drops the time complexity from $O(2^n)$ down to $O(n)$, making `n=40` run instantaneously.\n\n### 1. Manual Memoization (Works in any language)\nYou pass a `memo` dictionary down through the recursive calls to keep track of values you've already solved:\n\n```python\ndef fib(n, memo=None):\n    if memo is None:\n        memo = {}\n\n    # 1. Check if we already calculated this value\n    if n in memo:\n        return memo[n]\n\n    # 2. Base cases\n    if n <= 1:\n        return n\n\n    # 3. Calculate, store in memo, and return\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n\n\nprint(fib(40))  # Outputs: 102334155 instantly\n```\n\n*(Note: We use `memo=None` as the default argument instead of `memo={}` to avoid Python's mutable default argument quirk, though `memo={}` would technically work as a persistent cache here.)*\n\n### 2. Using Built-in Caching (Python-specific)\nIf you happen to be using Python 3.9+, the standard library has a decorator that does this exact thing automatically:\n\n```python\nfrom functools import cache\n\n\n@cache\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\n\nprint(fib(40))\n```\n*(For Python 3.2–3.8, you can use `@lru_cache(maxsize=None)` from `functools` instead).*\n\n---\n\nIf you are using JavaScript, Java, C++, or another language, let me know and I'll write out the syntax for that one!",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 101,
    "candidatesTokenCount": 481,
    "totalTokenCount": 1090,
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
        "tokenCount": 481
      }
    ],
    "thoughtsTokenCount": 508
  },
  "modelVersion": "gemini-4-carbon",
  "createTime": "2026-11-10T15:53:39.705154Z",
  "responseId": "Az7zaoKFK4jIu-gPuKPXmQo"
}
```

</details>

<details>

<summary>**Spatial Reasoning** — A reasoning-heavy puzzle with the thinking level set to HIGH</summary>



```ts
const response = await env.AI.run(
  'google/gemini-4-carbon',
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
  "model": "google/gemini-4-carbon",
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

**Here is why:**
Since the large cube is cut into 27 equal smaller cubes, it is divided into a $3 \times 3 \times 3$ grid ($\sqrt[3]{27} = 3$). You can figure out how many faces are painted based on where each smaller cube was located in the original large cube:

* **3 red faces (Corners):** A cube has 8 corners, so there are **8** of these cubes.
* **2 red faces (Edges):** The cubes with two painted faces are located along the edges, *between* the corners. A cube has 12 edges, and in a $3 \times 3 \times 3$ grid, there is 1 middle cube per edge ($12 \times 1 = \mathbf{12}$).
* **1 red face (Centers of each face):** A cube has 6 faces, with 1 cube right in the center of each face, giving **6** of these cubes.
* **0 red faces (Core):** There is **1** cube completely hidden in the very center of the $3 \times 3 \times 3$ grid with no paint at all.

*(Check: $8 + 12 + 6 + 1 = 27$ total cubes)*
```

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "There are **12** smaller cubes that have exactly two red faces.\n\n**Here is why:**\nSince the large cube is cut into 27 equal smaller cubes, it is divided into a $3 \\times 3 \\times 3$ grid ($\\sqrt[3]{27} = 3$). You can figure out how many faces are painted based on where each smaller cube was located in the original large cube:\n\n* **3 red faces (Corners):** A cube has 8 corners, so there are **8** of these cubes.\n* **2 red faces (Edges):** The cubes with two painted faces are located along the edges, *between* the corners. A cube has 12 edges, and in a $3 \\times 3 \\times 3$ grid, there is 1 middle cube per edge ($12 \\times 1 = \\mathbf{12}$). \n* **1 red face (Centers of each face):** A cube has 6 faces, with 1 cube right in the center of each face, giving **6** of these cubes.\n* **0 red faces (Core):** There is **1** cube completely hidden in the very center of the $3 \\times 3 \\times 3$ grid with no paint at all.\n\n*(Check: $8 + 12 + 6 + 1 = 27$ total cubes)*",
            "thoughtSignature": "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"
          }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 62,
    "candidatesTokenCount": 297,
    "totalTokenCount": 1077,
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
        "tokenCount": 297
      }
    ],
    "thoughtsTokenCount": 718
  },
  "modelVersion": "gemini-4-carbon",
  "createTime": "2026-11-10T15:53:55.521592Z",
  "responseId": "Ez7zavjqH7_Xu-gPx6arkQM"
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

Input [Open](https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/#page","headline":"Gemini 4 Carbon","description":"Google's most capable Gemini 4 reasoning model, built for complex software engineering, math and science problems, autonomous multi-step agents, and long outputs up to 1M tokens.","url":"https://developers.cloudflare.com/ai/models/google/gemini-4-carbon/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
