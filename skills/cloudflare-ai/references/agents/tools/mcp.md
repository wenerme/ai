---
description: Connect agents to external Model Context Protocol servers and use their tools in model calls.
title: MCP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# MCP

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/mcp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Agents can use [Model Context Protocol (MCP)](https://developers.cloudflare.com/agents/model-context-protocol/) as clients. Connect an agent to external MCP servers, discover the tools those servers expose, and pass those tools into model calls.

Use MCP when you want an agent to:

* Call tools exposed by external MCP servers.
* Reuse tools across agents, IDEs, and other AI clients.
* Connect to services that already expose an MCP endpoint.
* Add OAuth or token-based authorization around external tool access.

To build an MCP server instead, refer to [Model Context Protocol (MCP)](https://developers.cloudflare.com/agents/model-context-protocol/).

## Basic pattern

Call `addMcpServer()` to connect to a remote MCP server, then pass `this.mcp.getAITools()` to the AI SDK.

```js
import { Agent } from "agents";
import { generateText } from "ai";
import { createWorkersAI } from "workers-ai-provider";

export class ToolAgent extends Agent {
	async onStart() {
		await this.addMcpServer("github", "https://mcp.github.com/mcp");
	}

	async onRequest(request) {
		const workersai = createWorkersAI({ binding: this.env.AI });

		const response = await generateText({
			model: workersai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Use available tools to summarize the latest issue activity.",
			tools: this.mcp.getAITools(),
		});

		return new Response(response.text);
	}
}
```

```ts
import { Agent } from "agents";
import { generateText } from "ai";
import { createWorkersAI } from "workers-ai-provider";

export class ToolAgent extends Agent<Env> {
	async onStart() {
		await this.addMcpServer("github", "https://mcp.github.com/mcp");
	}

	async onRequest(request: Request) {
		const workersai = createWorkersAI({ binding: this.env.AI });

		const response = await generateText({
			model: workersai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Use available tools to summarize the latest issue activity.",
			tools: this.mcp.getAITools(),
		});

		return new Response(response.text);
	}
}
```

If the server requires OAuth, `addMcpServer()` returns an authentication state and authorization URL. The connection is persisted in the agent's [SQL storage](https://developers.cloudflare.com/agents/runtime/lifecycle/state/).

## Configuration

For public MCP servers, no binding configuration is required. Store server URLs, API tokens, or OAuth settings as environment variables or secrets.

For MCP servers that require bearer tokens or Cloudflare Access headers, pass custom transport headers when connecting.

```js
await this.addMcpServer("internal", this.env.MCP_SERVER_URL, {
	transport: {
		headers: {
			Authorization: `Bearer ${this.env.MCP_TOKEN}`,
			"CF-Access-Client-Id": this.env.CF_ACCESS_CLIENT_ID,
			"CF-Access-Client-Secret": this.env.CF_ACCESS_CLIENT_SECRET,
		},
	},
});
```

```ts
await this.addMcpServer("internal", this.env.MCP_SERVER_URL, {
	transport: {
		headers: {
			Authorization: `Bearer ${this.env.MCP_TOKEN}`,
			"CF-Access-Client-Id": this.env.CF_ACCESS_CLIENT_ID,
			"CF-Access-Client-Secret": this.env.CF_ACCESS_CLIENT_SECRET,
		},
	},
});
```

## Related resources

### [McpClient API](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/)

Connect Agents to external MCP servers and use their tools, resources, and prompts.

### [Connect to an MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/connect-mcp-client/)

Create an Agent that connects to an external MCP server and uses its tools.

### [Use MCP tools with Code Mode](https://developers.cloudflare.com/agents/tools/codemode/mcp/)

Use progressive discovery, code-based composition, and durable approvals with MCP tools.

### [Model Context Protocol specification](https://modelcontextprotocol.io/)

Learn about the open protocol for connecting AI applications to external tools and data.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/mcp/#page","headline":"MCP · Cloudflare Agents docs","description":"Connect agents to external Model Context Protocol servers and use their tools in model calls.","url":"https://developers.cloudflare.com/agents/tools/mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
