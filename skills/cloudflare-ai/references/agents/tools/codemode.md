---
description: Use Code Mode to let models discover and compose tools by writing code as a compact, executable plan.
title: Code Mode
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Code Mode

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/codemode/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Code Mode is a tool-use pattern where a model writes code instead of requesting each operation separately. The model receives one code-execution tool. Its code becomes a compact plan that calls tools, processes results, and returns the information needed for a response.

Code Mode exposes configured tools as typed methods. Models use those methods to express multi-step work with familiar programming constructs. Depending on the integration, tool definitions can be provided up front or discovered when needed.

Note

Code Mode is experimental and may introduce breaking changes. Use caution in production.

## Code as a plan

With direct tool use, the model selects one tool, receives its result, and then decides what to do next. Each operation can require another round trip through the model.

Code Mode moves that intermediate logic into executable code. A single plan can:

* Compose several dependent tool calls.
* Loop over collections of results.
* Filter and transform returned data.
* Branch based on earlier results.
* Shape the final returned value.

This approach keeps control flow and data handling together. It is useful when the model must coordinate several operations before producing an answer.

## Progressive tool discovery

Large tool catalogs can consume significant model context if every definition is loaded up front. Connector-based Code Mode runtimes support progressive discovery through `codemode.search()` and `codemode.describe()`.

Search finds relevant connectors, methods, and saved snippets. Describe returns detailed type information for a selected target. These results enter the running code, so the model can pull the definitions it needs instead of receiving the entire catalog with every request.

## Choose between Code Mode and direct tool calls

With direct tool calls, each result returns to the model before it chooses the next operation. Intermediate data consumes context, even when the model only needs a small part of it for the final answer.

Code Mode keeps that work inside one sandbox execution. Generated code can pass results between tools, filter intermediate data, and return only the final value the model needs. This makes multi-tool tasks more efficient and easier to generalize or repeat.

Use direct tool calls for simple tasks with a small, fixed tool set. Use Code Mode when a task needs composition, dependent calls, progressive discovery, reusable logic, or control flow:

| Pattern           | Best suited for                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Direct tool calls | Simple tasks using a small, known tool set                                                                       |
| Code Mode         | Composed or dependent calls, large tool catalogs, loops, branching, filtering, result shaping, or reusable logic |

## Choose an integration

Code Mode provides surfaces for agent runtimes, AI frameworks, browsers, and Model Context Protocol (MCP) systems.

### [Durable runtime](https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/)

Create a runtime with connectors, approvals, replay, and snippets.

### [AI SDK](https://developers.cloudflare.com/agents/tools/codemode/ai-sdk/)

Combine AI SDK tools into one Code Mode tool.

### [TanStack AI](https://developers.cloudflare.com/agents/tools/codemode/tanstack-ai/)

Use Code Mode with TanStack AI tools and chat applications.

### [Browser](https://developers.cloudflare.com/agents/tools/codemode/browser/)

Run generated code against browser-owned tools in an isolated iframe.

### [Model Context Protocol](https://developers.cloudflare.com/agents/tools/codemode/mcp/)

Expose tools from an Agents SDK MCP connection inside Code Mode.

### [OpenAPI](https://developers.cloudflare.com/agents/tools/codemode/openapi/)

Derive typed connector methods from an OpenAPI service.

## Understand the pattern

### [How Code Mode works](https://developers.cloudflare.com/agents/tools/codemode/how-it-works/)

Understand how a generated plan discovers, calls, and combines tools.

### [API reference](https://developers.cloudflare.com/agents/tools/codemode/api-reference/)

Look up Code Mode package exports, types, and options.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/tools/codemode/#page","headline":"Code Mode · Cloudflare Agents docs","description":"Use Code Mode to let models discover and compose tools by writing code as a compact, executable plan.","url":"https://developers.cloudflare.com/agents/tools/codemode/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
