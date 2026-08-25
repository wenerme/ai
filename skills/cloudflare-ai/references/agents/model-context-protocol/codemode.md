---
description: Understand single-code-tool and search-and-execute patterns for exposing tools and large APIs through MCP.
title: Code Mode MCP server patterns
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Code Mode MCP server patterns

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/codemode/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A Code Mode MCP server lets any Model Context Protocol (MCP) client use model-written code without providing its own sandbox. The MCP server exposes code execution as its tool interface and runs generated JavaScript in an isolated Worker.

Code Mode MCP servers follow two patterns:

| Pattern            | MCP tools       | Model-facing API                      | Use when                                                               |
| ------------------ | --------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| Single code tool   | code            | Typed methods for every upstream tool | You already have an MCP server with a manageable set of tools.         |
| Search and execute | search, execute | OpenAPI document and request function | You have a large API whose complete schema should stay out of context. |

Both patterns let generated code compose operations and keep intermediate results outside the model context. They differ in how the model discovers available operations.

## Single code tool

The single-tool pattern wraps an existing MCP server with `codeMcpServer()`. Instead of advertising each upstream tool separately, the server advertises one `code` tool.

The `code` tool description contains generated TypeScript definitions for every upstream tool. The model writes JavaScript against a `codemode` namespace:

```js
async () => {
	const projects = await codemode.list_projects({ status: "active" });
	const tasks = [];

	for (const project of projects) {
		tasks.push(...(await codemode.list_tasks({ projectId: project.id })));
	}

	return tasks.filter((task) => task.status === "blocked");
};
```

The MCP client makes one outer tool call. Inside the sandbox, the code can make dependent upstream calls, filter intermediate data, and return only the final result.

This pattern works well when the generated type declarations fit comfortably in the `code` tool description. The model receives those declarations when it loads the MCP tool.

To implement this pattern, refer to [Build a single-tool Code Mode MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/).

## Search and execute

A large API can have thousands of operations. Including every operation in one tool description would still consume substantial context. The search-and-execute pattern separates capability discovery from authenticated API calls.

The server exposes two MCP tools:

* `search` runs generated code against an OpenAPI document. It returns only the operations, parameters, or schemas needed for the task.
* `execute` runs generated code with an authenticated request function. It can call the selected operations, compose responses, and return a focused result.

The model first calls `search` with code such as:

```js
async () => {
	const spec = await codemode.spec();
	return Object.entries(spec.paths)
		.filter(([path]) => path.includes("/rulesets"))
		.map(([path, operations]) => ({
			path,
			methods: Object.keys(operations),
		}));
};
```

The complete OpenAPI document remains inside the sandbox. Only the returned subset enters the model context.

After selecting an operation, the model calls `execute`:

```js
async () => {
	const response = await codemode.request({
		method: "GET",
		path: `/zones/${zoneId}/rulesets`,
	});

	return response.result.map(({ id, name, phase }) => ({ id, name, phase }));
};
```

Authentication stays in the host request callback. The generated code receives a request function, not the credential.

The [Cloudflare API MCP server](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/) uses this pattern to expose the Cloudflare API through `search` and `execute`. For the design rationale and context savings, refer to [Code Mode: give agents an entire API in 1,000 tokens ↗](https://blog.cloudflare.com/code-mode-mcp/).

To implement this pattern, refer to [Build a search and execute MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-openapi-mcp-server/).

## Sandbox and authorization boundary

Model-written code runs in an isolated Worker. Direct outbound network access is blocked by default. Generated code reaches external systems only through upstream MCP tools or a host-provided request callback.

Code execution does not replace authorization. Enforce permissions and any required approval inside upstream tool handlers or the host request callback before applying side effects. Do not expose credentials through tool results or OpenAPI documents.

## Choose a pattern

Use `codeMcpServer()` when an existing MCP server already defines the operations and schemas the model needs. Use `openApiMcpServer()` when a large OpenAPI catalog needs progressive discovery and a fixed model-context footprint.

### [Build a single-tool server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/)

Wrap an existing MCP server with one code tool.

### [Build a search and execute server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-openapi-mcp-server/)

Publish a large OpenAPI service through progressive discovery.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/codemode/#page","headline":"Code Mode MCP server patterns · Cloudflare Agents docs","description":"Understand single-code-tool and search-and-execute patterns for exposing tools and large APIs through MCP.","url":"https://developers.cloudflare.com/agents/model-context-protocol/codemode/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","MCP"]}
```
