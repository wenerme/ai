---
description: Control which MCP servers your organization uses and enforce access policies with Cloudflare Access.
title: MCP governance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

#  MCP governance

Last updated Jun 3, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/agents/model-context-protocol/protocol/governance/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Model Context Protocol (MCP) allows Large Language Models (LLMs) to interact with proprietary data and internal tools. However, as MCP adoption grows, organizations face security risks from "Shadow MCP", where employees run unmanaged local MCP servers against sensitive internal resources. MCP governance means that administrators have control over which MCP servers are used in the organization, who can use them, and under what conditions.

## MCP server portals

Cloudflare Access provides a centralized governance layer for MCP, allowing you to vet, authorize, and audit every interaction between users and MCP servers.

The [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) serves as the administrative hub for governance. From this portal, administrators can manage both third-party and internal MCP servers and define policies for:

* **Identity**: Which users or groups are authorized to access specific MCP servers.
* **Conditions**: The security posture (for example, device health or location) required for access.
* **Scope**: Which specific tools within an MCP server are authorized for use.

Cloudflare Access logs MCP server requests and tool executions made through the portal, providing administrators with visibility into MCP usage across the organization.

## Remote MCP servers

To maintain a modern security posture, Cloudflare recommends the use of [remote MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) over local installations. Running MCP servers locally introduces risks similar to unmanaged [shadow IT ↗](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/), making it difficult to audit data flow or verify the integrity of the server code. Remote MCP servers give administrators visibility into what servers are being used, along with the ability to control who access them and what tools are authorized for employee use.

You can [build your remote MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) directly on Cloudflare Workers. When both your [MCP server portal](#mcp-server-portals) and remote MCP servers run on Cloudflare's network, requests stay on the same infrastructure, minimizing latency and maximizing performance.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/governance/#page","headline":"MCP governance · Cloudflare Agents docs","description":"Control which MCP servers your organization uses and enforce access policies with Cloudflare Access.","url":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/governance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
