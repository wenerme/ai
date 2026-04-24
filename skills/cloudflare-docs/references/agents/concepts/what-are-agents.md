---
title: What are agents?
description: Understand what Agents are, how they differ from workflows and co-pilots, and when to use them.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI)[ LLM ](https://developers.cloudflare.com/search/?tags=LLM) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/concepts/what-are-agents.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# What are agents?

An agent is an AI system that can autonomously execute tasks by making decisions about tool usage and process flow. Unlike traditional automation that follows predefined paths, agents can dynamically adapt their approach based on context and intermediate results. Agents are also distinct from co-pilots (such as traditional chat applications) in that they can fully automate a task, as opposed to simply augmenting and extending human input.

* **Agents** → non-linear, non-deterministic (can change from run to run)
* **Workflows** → linear, deterministic execution paths
* **Co-pilots** → augmentative AI assistance requiring human intervention

## Example: Booking vacations

If this is your first time working with or interacting with agents, this example illustrates how an agent works within a context like booking a vacation.

Imagine you are trying to book a vacation. You need to research flights, find hotels, check restaurant reviews, and keep track of your budget.

### Traditional workflow automation

A traditional automation system follows a predetermined sequence:

* Takes specific inputs (dates, location, budget)
* Calls predefined API endpoints in a fixed order
* Returns results based on hardcoded criteria
* Cannot adapt if unexpected situations arise
![Traditional workflow automation diagram](https://developers.cloudflare.com/_astro/workflow-automation.D1rsykgR_Z1dw1Js.svg) 

### AI Co-pilot

A co-pilot acts as an intelligent assistant that:

* Provides hotel and itinerary recommendations based on your preferences
* Can understand and respond to natural language queries
* Offers guidance and suggestions
* Requires human decision-making and action for execution
![A co-pilot diagram](https://developers.cloudflare.com/_astro/co-pilot.BZ_kRuK6_Z2sKyKr.svg) 

### Agent

An agent combines AI's ability to make judgments and call the relevant tools to execute the task. An agent's output will be nondeterministic given:

* Real-time availability and pricing changes
* Dynamic prioritization of constraints
* Ability to recover from failures
* Adaptive decision-making based on intermediate results
![An agent diagram](https://developers.cloudflare.com/_astro/agent-workflow.5VDKtHdO_Z1Hdwi1.svg) 

An agent can dynamically generate an itinerary and execute on booking reservations, similarly to what you would expect from a travel agent.

## Components of agent systems

Agent systems typically have three primary components:

* **Decision Engine**: Usually an LLM (Large Language Model) that determines action steps
* **Tool Integration**: APIs, functions, and services the agent can utilize — often via [MCP](https://developers.cloudflare.com/agents/model-context-protocol/)
* **Memory System**: Maintains context and tracks task progress

### How agents work

Agents operate in a continuous loop of:

1. **Observing** the current state or task
2. **Planning** what actions to take, using AI for reasoning
3. **Executing** those actions using available tools
4. **Learning** from the results (storing results in memory, updating task progress, and preparing for next iteration)

## Building agents on Cloudflare

The Cloudflare Agents SDK provides the infrastructure for building production agents:

* **Persistent state** — Each agent instance has its own SQLite database for storing context and memory
* **Real-time sync** — State changes automatically broadcast to all connected clients via WebSockets
* **Hibernation** — Agents sleep when idle and wake on demand, so you only pay for what you use
* **Global edge deployment** — Agents run close to your users on Cloudflare's network
* **Built-in capabilities** — Scheduling, task queues, workflows, email handling, and more

## Next steps

[ Quick start ](https://developers.cloudflare.com/agents/getting-started/quick-start/) Build your first agent in 10 minutes. 

[ Agents API ](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK. 

[ Using AI models ](https://developers.cloudflare.com/agents/api-reference/using-ai-models/) Integrate OpenAI, Anthropic, and other providers. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/concepts/what-are-agents/","name":"What are agents?"}}]}
```
