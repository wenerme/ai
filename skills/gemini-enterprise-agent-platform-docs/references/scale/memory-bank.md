> [!IMPORTANT]
> **Important:** Agent Platform Memory Bank is a generative AI feature, subject to the [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms).

Agent Platform Memory Bank lets you dynamically generate long-term memories based on
conversations between the user and your agent. These memories are personalized
information that persists across multiple sessions, enabling your agent to adapt
and personalize responses for context and continuity.

## Features

Memory Bank helps you manage memories, so that you can
personalize how your agent interacts with users and manage the context window.
For each scope, Memory Bank maintains an isolated collection of
memories. Each memory is an independent, self-contained piece of information
that can be used to expand the context available to your agent. For example:

    {
      "name": "projects/.../locations/.../reasoningEngines/.../memories/...",
      "scope": {
        "agent_name": "My agent",
        "user": "my user ID"
      },
      "fact": "I use Memory Bank to manage my memories."
    }

Memory Bank includes the following features:

- **[Memory generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories)**:
  Create, refine, and manage memories using a large language model (LLM).

  - **Memory extraction**: Extract only the most meaningful information from
    source data to persist as memories.

  - **Memory consolidation** : Consolidate newly extracted information with
    existing memories, allowing memories to evolve as new information is
    ingested. You can also consolidate [pre-extracted
    memories](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#consolidate-pre-extracted-memories)
    (like information that your agent or a human-in-the-loop considers
    meaningful) with existing memories.

  - **Asynchronous generation** : Generate memories [in the
    background](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#background-memory-generation),
    so that your agent doesn't have to wait for memory generation to complete.

  - **Continuous event ingestion** : Stream and manage conversation events with [event ingestion](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/ingest-events), which automatically triggers memory generation based on batching rules that you configure.

  - **Customizable extraction** : [Configure what information
    Memory Bank considers
    meaningful](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#customization-config)
    by providing specific
    [topics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories#memory-topics)
    and few-shot examples.

  - **Multimodal understanding**: Process multimodal information to generate
    and persist textual insights.

- **Managed storage and retrieval**: Benefit from a fully managed, persistent,
  and accessible memory store.

  - **Data isolation across identities** : Memory consolidation and retrieval
    is isolated to a [specific
    identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#scope-based).

  - **Persistent and accessible storage** : Store memories that can be
    accessed from multiple environments, including [Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#ae-runtime),
    [your local environment, or other deployment
    options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#other-runtime).

  - **Similarity search** : Retrieve memories using similarity search that is
    [scoped to a specific
    identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/fetch-memories#similarity-search).

  - **Automatic expiration** : Set a time to live (TTL) on memories to ensure
    stale information is automatically deleted.
    [Configure](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup#ttl-config)
    your Memory Bank instance so that a TTL is automatically
    applied to inserted or generated memories.

  - **Memory revisions** : Automatically create and maintain [memory
    revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/revisions) which
    allow you to inspect how memories transform as new information is
    ingested.

  - **Restrictive permissions** : Use [IAM
    conditions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/iam-conditions) to
    restrict which principals can read or write specific scopes' memories.

- **Agent integration**: Connect Memory Bank to your agent, so
  that it can orchestrate calls to generate and retrieve memories.

  - **Agent Development Kit (ADK) Integration** : [Orchestrate calls from
    your ADK-based
    agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/adk-quickstart) using
    built-in ADK tools and the `VertexAiMemoryBankService` to read from and
    write to Memory Bank.

  - **Other frameworks**: Wrap your Memory Bank code in tools
    and callbacks to orchestrate memory generation and retrieval.

## Use cases

You can use Memory Bank to transform stateless agent interactions
into stateful, contextual experiences where the agent remembers, learns, and
adapts over time. Memory Bank is ideal for applications that
require:

- **Long-term personalization**: Build experiences that are tailored to
  individual users. Memory Bank scopes memories to a specific
  identity, allowing an agent to remember a user's preferences, history, and
  key details across multiple sessions.

  - Example: A customer service agent that remembers key information from a user's past support tickets and product preferences without needing to ask again.
- **LLM-driven knowledge extraction**: Use when you need to automatically
  identify and persist the most important information from conversations or
  multimodal content without manual intervention.

  - Example: A research agent that reads a series of technical papers and builds a consolidated memory of key findings, methodologies, and conclusions.
- **Dynamic \& evolving context**: Use Memory Bank when you need
  a knowledge source that isn't static. Memory Bank is designed
  to continuously integrate new information from your agent, refining and
  updating stored memories as new data becomes available. This ensures the
  context your agent relies on is always current and accurate. Whereas RAG has
  a static, external knowledge base, Memory Bank can evolve
  based on context provided by the agent.

## Example usage

![Agent Platform Memory Bank conceptual
overview](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/memory-bank.png)

You can use Memory Bank with Agent Platform Sessions to generate
memories from stored sessions using the following process:

1. **(Sessions) `CreateSession`** : At the start of each
   conversation, create a new session. The conversation history used by the
   agent is scoped to this session. A session contains the chronological
   sequence of messages and actions (`SessionEvents`) for an interaction
   between a user and your agent. All sessions must have a user ID; the
   extracted memories (see `GenerateMemories`) for this session are mapped to
   this user.

2. **(Sessions) `AppendEvent`**: As the user interacts with the agent, events
   (such as user messages, agent responses, tool actions) are uploaded to
   Sessions. The events persist conversation history and create a record of the
   conversation that can be used to generate memories.

3. **(Sessions) `ListEvents`**: As the user interacts with the agent, the agent
   retrieves the conversation history.

4. **(Memory Bank)** Generate or create memories:

   - **`GenerateMemories`**: At a specified interval (such as the end of
     every session or the end of every turn), the agent can trigger memories
     to be generated using conversation history. Facts about the user are
     automatically extracted from the conversation history so that they're
     available for current or future sessions.

   - **`CreateMemory`** : Your agent can write memories directly to
     Memory Bank. For example, the agent can decide when a
     memory should be written and what information should be saved
     (memory-as-a-tool). Use `CreateMemory` when you want your agent to have
     more control over what facts are extracted.

5. **(Memory Bank) `RetrieveMemories`**: As the user interacts
   with your agent, the agent can retrieve memories saved about that user. You
   can either retrieve all memories (simple retrieval) or only the most
   relevant memories to the current conversation (similarity search retrieval).
   Then you can insert the retrieved memories into your prompt.

## Quickstarts

Get started with Memory Bank using the following quickstarts:

- [**Quickstart using REST
  API**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/api-quickstart): Follow the
  REST API quickstart to make API calls directly to
  Sessions and
  Memory Bank.

- [**Quickstart using Agent Development Kit
  (ADK)**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/adk-quickstart): Follow the
  Agent Development Kit (ADK) quickstart if you want your ADK agent to
  orchestrate calls to Sessions and
  Memory Bank for you.

## Security risks of prompt injection

In addition to the security responsibilities outlined in [Agent Platform
shared responsibility](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/shared-responsibility),
consider the risk of prompt injection and memory poisoning that can affect your
agent when using long-term memories. Memory poisoning occurs when false
information is stored in Memory Bank. The agent may then operate
on this false or malicious information in future sessions.

To mitigate the risk of memory poisoning, you can do the following:

- **Model Armor** : Use
  [Model Armor](https://docs.cloud.google.com/security-command-center/docs/model-armor-overview)
  to inspect prompts being sent to Memory Bank or from your
  agent.

- **Adversarial testing**: Proactively test your LLM application for prompt
  injection vulnerabilities by simulating attacks. This is typically known as
  "red teaming."

- **Sandbox execution**: If the agent has the ability to execute or interact
  with external or critical systems, these actions should be performed in a
  sandboxed environment with strict access control and human review.

For more information, see [Google's Approach for Secure AI
Agents](https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/).

## What's next

Quickstart

### [Memory Bank API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/api-quickstart)

Get started with the Memory Bank API to manage long-term memories.

Quickstart

### [Quickstart with Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/adk-quickstart)

Get started with the Agent Development Kit (ADK).

Guide

### [Set up Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/setup)

Learn how to set up Memory Bank.
