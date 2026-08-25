---
description: Connect AI agents and LLMs to Cloudflare docs
title: Docs for agents
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/docs-for-agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Docs for agents

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/docs-for-agents/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI agents — tools like Cursor, GitHub Copilot, and Claude Code — can answer questions about Cloudflare products, generate configuration, and call Cloudflare APIs on your behalf. Cloudflare documentation provides content in agent-friendly formats, agent skills, and MCP servers so your AI agent can look up documentation and interact with Cloudflare services directly.

This page explains the available approaches and how to set them up.

## Quick start

These resources cover different aspects of using AI agents with Cloudflare documentation. Start with the one most relevant to you:

### [Understand key concepts](#concepts)

Learn about agent skills and MCP (Model Context Protocol).

### [Set up your agent](https://developers.cloudflare.com/agent-setup/)

Install skills and MCP servers for your specific AI tool.

### [Extract documentation in agent-friendly format](#markdown-documentation-for-llms)

Minimize token usage while improving the accuracy of your agent's responses.

## Concepts

### Agent skills

[Agent skills ↗](https://agentskills.io/home) are structured, task-specific instructions that AI tools load on demand — for example, a skill might teach your agent how to deploy a Cloudflare Worker or configure a WAF (Web Application Firewall) rule. Skills give your agent Cloudflare-specific instructions it would not otherwise have. Cloudflare publishes skills covering Workers, storage, AI, networking, security, and more in the [Cloudflare Skills repository ↗](https://github.com/cloudflare/skills).

Each agent has its own installation method for skills. Refer to [Agent setup](#set-up-your-agent) for installation instructions.

### Model Context Protocol (MCP)

The [Model Context Protocol ↗](https://modelcontextprotocol.io/) (MCP) is an open standard that defines how AI tools connect to external tools, data, and services. An MCP server is an application that exposes specific capabilities. When you connect one to your agent, the agent can use those capabilities as part of its workflow (for example, searching documentation, creating DNS records, or deploying Workers).

Cloudflare runs managed remote MCP servers that give your agent the ability to search documentation, call the Cloudflare API, and query logs and analytics while it works.

There are two approaches:

* **[Cloudflare API MCP server](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/)**: A Code Mode server that covers the entire Cloudflare API (over 2,500 endpoints). Use this when your agent needs broad access across multiple Cloudflare products.
* **Domain-specific servers**: Focused servers for documentation, observability, DNS analytics, and more. Use these when your agent only needs access to a specific area. The full catalog is in the [cloudflare/mcp-server-cloudflare ↗](https://github.com/cloudflare/mcp-server-cloudflare) repository.

Each agent's [Agent setup](#set-up-your-agent) guide includes MCP server installation as part of its Quick start. For the full list of available MCP servers, refer to [MCP servers for Cloudflare](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/).

### Model flexibility

AI agents use large language models (LLMs) to understand your requests and generate responses. The model affects response quality, speed, and cost. How many models you can choose from depends on the agent:

* **Locked**: Only the vendor's own models are supported.
* **BYOK** (Bring Your Own Key): You supply your own API key for the model provider of your choice.
* **Multi-provider**: Several model providers are supported out of the box.

### Context approaches

How the agent retains information about your project between conversations affects how much your agent remembers between sessions:

* **Project memory**: The agent remembers context across sessions using stored files or memory.
* **Indexed codebase**: The agent builds a searchable index of your repository for fast lookups.

## Set up your agent

Each supported agent has a dedicated setup guide covering installation, skills, MCP server configuration, example prompts, tips, and troubleshooting.

[Get started](https://developers.cloudflare.com/agent-setup/)

## Markdown documentation for LLMs

AI tools work better with Markdown than HTML because Markdown's explicit structure has less overhead than HTML tags, which reduces wasted tokens (the units of text that AI models process) and produces better results.

Every documentation page is available as Markdown using any of the following methods, powered by [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/).

### Copy from the current page

On any documentation page, select **Copy as Markdown** to copy the current page as Markdown.

### Append `/index.md` to the URL

Add `/index.md` to the end of any page URL. For example:

```txt
https://developers.cloudflare.com/workers/get-started/index.md
```

### Send an `Accept: text/markdown` header

Request any page with the `Accept: text/markdown` header, which tells the server you prefer Markdown instead of HTML:

```sh
curl "https://developers.cloudflare.com/workers/get-started/" \
  --header "Accept: text/markdown"
```

The response includes `x-markdown-tokens` and `x-original-tokens` headers with estimated token counts for the Markdown document and original HTML document, useful for context window planning (a context window is the maximum number of tokens an AI model can consider at once).

### Site-wide endpoints

These endpoints follow the [llms.txt standard ↗](https://llmstxt.org/) and provide documentation content in Markdown format:

| Endpoint                                                          | Description                                                                                                                                                                                     |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [/llms.txt](https://developers.cloudflare.com/llms.txt)           | Page index grouped by product category, with links to each product's own llms.txt                                                                                                               |
| [/llms-full.txt](https://developers.cloudflare.com/llms-full.txt) | Full content of all documentation in a single file, for offline indexing, bulk vectorization (converting content into numerical representations for similarity search), or large-context models |

### Per-product endpoints

Each product has its own scoped `llms.txt` and `llms-full.txt`. Use these when you only need documentation for a specific product.

| Endpoint                                                                          | Description                                     |
| --------------------------------------------------------------------------------- | ----------------------------------------------- |
| [/workers/llms.txt](https://developers.cloudflare.com/workers/llms.txt)           | Page index for Workers documentation            |
| [/workers/llms-full.txt](https://developers.cloudflare.com/workers/llms-full.txt) | Full content of all Workers documentation pages |

Replace `/workers/` with any product path. For the full list of available products, refer to [/llms.txt](https://developers.cloudflare.com/llms.txt).

## OpenAPI specification

An [OpenAPI specification ↗](https://www.openapis.org/) is a machine-readable description of an API — it lists every available endpoint, the parameters each one accepts, and the responses it returns. When you add this to your AI tool's context, the tool can generate API calls to Cloudflare services without you having to look up the documentation manually.

The full Cloudflare API OpenAPI specification is available for AI coding tools, API clients, and code generators:

| Endpoint                                                              | Description                                      |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| [cloudflare/api-schemas ↗](https://github.com/cloudflare/api-schemas) | Full Cloudflare API OpenAPI specification (JSON) |

For the full API reference, refer to the [Cloudflare API documentation](https://developers.cloudflare.com/api/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/docs-for-agents/#page","headline":"Docs for agents · Docs for agents docs","description":"Connect AI agents and LLMs to Cloudflare docs","url":"https://developers.cloudflare.com/docs-for-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
