---
title: Tools
description: Define and use tools in Cloudflare Agents to interact with external APIs, process data, and perform actions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/concepts/tools.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Tools

### What are tools?

Tools enable AI systems to interact with external services and perform actions. They provide a structured way for agents and workflows to invoke APIs, manipulate data, and integrate with external systems. Tools form the bridge between AI decision-making capabilities and real-world actions.

### Understanding tools

In an AI system, tools are typically implemented as function calls that the AI can use to accomplish specific tasks. For example, a travel booking agent might have tools for:

* Searching flight availability
* Checking hotel rates
* Processing payments
* Sending confirmation emails

Each tool has a defined interface specifying its inputs, outputs, and expected behavior. This allows the AI system to understand when and how to use each tool appropriately.

### Common tool patterns

#### API integration tools

The most common type of tools are those that wrap external APIs. These tools handle the complexity of API authentication, request formatting, and response parsing, presenting a clean interface to the AI system.

#### Model Context Protocol (MCP)

The [Model Context Protocol ↗](https://modelcontextprotocol.io/introduction) provides a standardized way to define and interact with tools. Think of it as an abstraction on top of APIs designed for LLMs to interact with external resources. MCP defines a consistent interface for:

* **Tool Discovery**: Systems can dynamically discover available tools
* **Parameter Validation**: Tools specify their input requirements using JSON Schema
* **Error Handling**: Standardized error reporting and recovery
* **State Management**: Tools can maintain state across invocations

#### Data processing tools

Tools that handle data transformation and analysis are essential for many AI workflows. These might include:

* CSV parsing and analysis
* Image processing
* Text extraction
* Data validation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/concepts/tools/","name":"Tools"}}]}
```
