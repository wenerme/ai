---
description: Build and deploy remote MCP servers on Cloudflare to connect AI agents with external tools and services.
title: Model Context Protocol (MCP)
image: https://developers.cloudflare.com/agents/model-context-protocol/og.png?v=ee9b25aede7ab8f7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Model Context Protocol (MCP)

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can build and deploy [Model Context Protocol (MCP) ↗︎](https://modelcontextprotocol.io/) servers on Cloudflare.

## What is the Model Context Protocol (MCP)?

[Model Context Protocol (MCP) ↗︎](https://modelcontextprotocol.io) is an open standard that connects AI systems with external applications. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various accessories, MCP provides a standardized way to connect AI agents to different services.

### MCP Terminology

- **Agents**: AI assistants (like [Claude ↗︎](https://claude.ai) or [Cursor ↗︎](https://cursor.com)), AI agents, or applications that need to access external capabilities.
- **MCP Clients**: Clients embedded within agents that connect to MCP servers and invoke tools. Each MCP client instance has a single connection to an MCP server.
- **MCP Servers**: Applications that expose [tools](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/), [prompts ↗︎](https://modelcontextprotocol.io/docs/concepts/prompts), and [resources ↗︎](https://modelcontextprotocol.io/docs/concepts/resources) that MCP clients can use.

### Remote vs. local MCP connections

The MCP standard supports two modes of operation:

- **Remote MCP connections**: MCP clients connect to MCP servers over the Internet, establishing a connection using [Streamable HTTP](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/), and authorizing the MCP client access to resources on the user's account using [OAuth](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/).
- **Local MCP connections**: MCP clients connect to MCP servers on the same machine, using [stdio ↗︎](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#stdio) as a local transport method.

### Best practices

- **Keep tool definitions out of the context window**: MCP clients used to send every tool definition straight to the model, so a server with many tools filled the agent's context window. Newer clients use Code Mode instead: the model writes code that calls your tools and loads only the definitions it needs. You can apply the same pattern on the server, exposing a large API through a small search-and-execute interface. Refer to [Code Mode for MCP servers ↗︎](https://blog.cloudflare.com/code-mode-mcp/) and [Build a Code Mode MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/).
- **Use granular authorization**: Protect your server with OAuth, and give each operation its own scopes. When a token lacks a scope, return an `insufficientScope()` challenge so the client asks the user to approve it (step-up authorization) instead of requesting every scope up front. Refer to [Authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/).
- **Declare accurate input and output schemas**: Strict MCP clients validate tool calls against `inputSchema` and tool results against `outputSchema`, and reject tools whose results do not match. Define both schemas for every tool, and return `structuredContent` that matches `outputSchema`. Refer to [Tools](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/).

### Get Started

Go to the [Getting Started](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) guide to learn how to build and deploy your first remote MCP server to Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/model-context-protocol/#page","headline":"Model Context Protocol (MCP)","description":"Build and deploy remote MCP servers on Cloudflare to connect AI agents with external tools and services.","url":"https://developers.cloudflare.com/agents/model-context-protocol/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/model-context-protocol/og.png?v=ee9b25aede7ab8f7","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
