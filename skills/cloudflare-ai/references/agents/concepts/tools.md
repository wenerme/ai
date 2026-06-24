---
title: Tools
description: Understand how tools are exposed to models, where tools execute, and how MCP connects external tools to Cloudflare Agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Tools

Tools let models retrieve information, process data, and perform actions. Each tool defines an interface that describes its inputs, outputs, and behavior.

A travel agent might use tools to search flights, check hotel rates, process payments, and send confirmation emails. The tool interface lets the model understand when and how to use each capability.

Tool design involves three independent choices:

1. **Model interface** — expose tools as direct tool calls or through Code Mode.
2. **Execution location** — run tool implementations in a Worker, browser, or another Agent.
3. **Tool source** — define tools in the application or connect to externally hosted tools through Model Context Protocol (MCP).

For example, browser tools can be exposed directly or through Code Mode. An MCP tool can also be exposed through either model interface.

## Choose the model interface

Direct tool calls and Code Mode define how the model sees and invokes tools. They do not determine where the underlying tool implementations run.

| Interface         | How it works                                                                                                      | Use when                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Direct tool calls | The model receives individual tool definitions. Each result returns to the model before it chooses the next call. | The task is simple and uses a small, known tool set.                                                    |
| Code Mode         | The model receives one code tool and writes code against typed tool interfaces.                                   | The task needs composition, dependent calls, filtering, branching, repeatable logic, or tool discovery. |

### Direct tool calls

Most tool examples use direct tool calls, even when they do not name the pattern. You define each tool and pass its schema to the model. The model selects a tool, your application executes it, and the result returns to the model.

The model sees each intermediate result before choosing another tool. This makes the execution path easy to inspect. However, dependent operations require repeated model turns and consume context with intermediate data.

### Code Mode

[Code Mode](https://developers.cloudflare.com/agents/tools/codemode/) gives the model one code-execution tool. The model writes JavaScript that calls typed tools, passes results between them, and applies control flow.

The generated code can filter large responses and return only the final value the model needs. Intermediate results stay inside the sandbox instead of entering the model context after every operation. This makes Code Mode more efficient for composed workflows and large tool catalogs.

Code Mode also supports progressive discovery. The model can search available connectors and request detailed types only for the methods it needs. Successful programs can be saved as reusable snippets.

For runtime behavior, approvals, replay, and snippets, refer to [How Code Mode works](https://developers.cloudflare.com/agents/tools/codemode/how-it-works/).

## Choose where tools run

Execution location describes where a tool implementation runs. It is independent from the model interface. Tools in each location can be exposed directly or through Code Mode.

| Location      | Use when                                                                      | Start here                                                                                                               |
| ------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Worker        | The tool calls an API, queries SQL, or uses server-side bindings and secrets. | [Server-side tools](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#server-side-tools) |
| Browser       | The tool needs geolocation, clipboard, local storage, or other browser APIs.  | [Client-side tools](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#client-side-tools) |
| Another Agent | A chat-capable Agent should execute as a retained, streaming tool.            | [Agents as tools](https://developers.cloudflare.com/agents/runtime/execution/agent-tools/)                               |

With direct tool calls, the model calls the tool and the framework routes execution to the configured location.

With Code Mode, generated code runs in a sandbox. Calls from that code cross the sandbox boundary to the underlying tool implementation. Server tools can execute in the host Worker, browser-owned tools can execute in the parent page, and Agent tools can delegate work to another Agent.

## Connect external tools with MCP

The [Model Context Protocol (MCP) ↗](https://modelcontextprotocol.io/introduction) standardizes how AI applications discover and invoke externally hosted tools. MCP describes the source and transport of a tool, not how the model must invoke it.

An Agent can expose MCP tools through either model interface:

* Pass MCP tools directly to a model with the [Agents MCP client](https://developers.cloudflare.com/agents/tools/mcp/).
* Expose MCP tools inside Code Mode for composition and progressive discovery with [MCP connectors](https://developers.cloudflare.com/agents/tools/codemode/mcp/).

An MCP server can also expose Code Mode itself. For example, it can present one `code` tool or separate `search` and `execute` tools. For these server-side patterns, refer to [Code Mode MCP server patterns](https://developers.cloudflare.com/agents/model-context-protocol/codemode/).

## Control side effects

Approval policy is also independent from execution location and tool source. Any tool that modifies external state may require user approval.

Direct tools can use the standard [human-in-the-loop approval pattern](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/).

The durable Code Mode runtime can pause generated code before an annotated connector method executes. Approval replays completed calls from the execution log, applies the approved action, and continues the same program.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/concepts/tools/#page","headline":"Tools · Cloudflare Agents docs","description":"Understand how tools are exposed to models, where tools execute, and how MCP connects external tools to Cloudflare Agents.","url":"https://developers.cloudflare.com/agents/concepts/tools/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/concepts/tools/","name":"Tools"}}]}
```
