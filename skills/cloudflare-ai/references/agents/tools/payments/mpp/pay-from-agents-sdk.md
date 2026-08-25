---
description: Configure a Cloudflare Agent to pay HTTP services and Model Context Protocol (MCP) tools with Machine Payments Protocol (MPP).
title: Pay from the Agents SDK
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Pay from the Agents SDK

Last updated Aug 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the Cloudflare Agents SDK to pay MPP services. The `mppx` SDK handles payment retries for HTTP requests and Model Context Protocol (MCP) tool calls.

## Prerequisites

Create a [Cloudflare Agents project](https://developers.cloudflare.com/agents/getting-started/). Fund an account for the payment method that the service accepts.

## Configure payments

1. Install the Agents SDK, `mppx`, and `viem`:
npmyarnpnpmbun
```
npm i agents mppx viem
```
```
yarn add agents mppx viem
```
```
pnpm add agents mppx viem
```
```
bun add agents mppx viem
```
2. Store the payment private key as a [Worker secret](https://developers.cloudflare.com/workers/configuration/secrets/):
npmyarnpnpm
```
npx wrangler secret put MPP_PRIVATE_KEY
```
```
yarn wrangler secret put MPP_PRIVATE_KEY
```
```
pnpm wrangler secret put MPP_PRIVATE_KEY
```
3. Create the payment method once:
```js
import { tempo } from "mppx/client";
import { privateKeyToAccount } from "viem/accounts";
export function createPaymentMethods(privateKey) {
	const account = privateKeyToAccount(privateKey);
	return [tempo.charge({ account })];
}
```
```ts
import { tempo } from "mppx/client";
import { privateKeyToAccount } from "viem/accounts";
export function createPaymentMethods(privateKey: string) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return [tempo.charge({ account })] as const;
}
```

Note

For production Agents, use a scoped access key. Apply spending limits and recipient restrictions. For more information, refer to [Manage Agent spend ↗](https://mpp.dev/guides/managing-agent-spend).

## Pay an HTTP service

Create a payment-aware client in `onStart()`. Restrict automatic payments to trusted origins:

```js
import { Agent } from "agents";
import { Mppx } from "mppx/client";
import { createPaymentMethods } from "./payments";

export class BuyerAgent extends Agent {
	methods;
	payments;

	async onStart() {
		this.methods = createPaymentMethods(this.env.MPP_PRIVATE_KEY);
		this.payments = Mppx.create({
			acceptPaymentPolicy: { origins: ["https://api.example.com"] },
			methods: this.methods,
			polyfill: false,
		});
	}

	async buyReport() {
		const response = await this.payments.fetch(
			"https://api.example.com/reports/latest",
		);

		if (!response.ok) throw new Error(`Request failed: ${response.status}`);
		return response.json();
	}
}
```

```ts
import { Agent } from "agents";
import { Mppx } from "mppx/client";
import { createPaymentMethods } from "./payments";

type PaymentEnv = Env & { MPP_PRIVATE_KEY: string };

export class BuyerAgent extends Agent<PaymentEnv> {
	methods!: ReturnType<typeof createPaymentMethods>;
	payments!: ReturnType<typeof Mppx.create>;

	async onStart() {
		this.methods = createPaymentMethods(this.env.MPP_PRIVATE_KEY);
		this.payments = Mppx.create({
			acceptPaymentPolicy: { origins: ["https://api.example.com"] },
			methods: this.methods,
			polyfill: false,
		});
	}

	async buyReport() {
		const response = await this.payments.fetch(
			"https://api.example.com/reports/latest",
		);

		if (!response.ok) throw new Error(`Request failed: ${response.status}`);
		return response.json();
	}
}
```

Free endpoints pass through unchanged. Paid endpoints trigger the payment retry and return a `Payment-Receipt` header.

## Pay an MCP tool

Connect the Agent with `addMcpServer()`. Wait for the connection before wrapping its client:

```js
import { Agent } from "agents";
import { McpClient } from "mppx/mcp/client";
import { createPaymentMethods } from "./payments";

export class BuyerAgent extends Agent {
	methods;

	async onStart() {
		this.methods = createPaymentMethods(this.env.MPP_PRIVATE_KEY);
	}

	async paidSearch() {
		const connection = await this.addMcpServer(
			"premium-search",
			"https://mcp.example.com/mcp",
		);
		if (connection.state === "authenticating") {
			return { authUrl: connection.authUrl };
		}

		await this.mcp.waitForConnections();

		const server = this.getMcpServers().servers[connection.id];
		const mcpConnection = this.mcp.mcpConnections[connection.id];
		if (server?.state !== "ready" || !mcpConnection) {
			throw new Error("MCP server is not ready.");
		}

		const client = McpClient.wrap(mcpConnection.client, {
			methods: this.methods,
		});
		const result = await client.callTool({
			name: "premium_search",
			arguments: { query: "Cloudflare Agents" },
		});

		return { content: result.content, receipt: result.receipt };
	}
}
```

```ts
import { Agent } from "agents";
import { McpClient } from "mppx/mcp/client";
import { createPaymentMethods } from "./payments";

type PaymentEnv = Env & { MPP_PRIVATE_KEY: string };

export class BuyerAgent extends Agent<PaymentEnv> {
	methods!: ReturnType<typeof createPaymentMethods>;

	async onStart() {
		this.methods = createPaymentMethods(this.env.MPP_PRIVATE_KEY);
	}

	async paidSearch() {
		const connection = await this.addMcpServer(
			"premium-search",
			"https://mcp.example.com/mcp",
		);
		if (connection.state === "authenticating") {
			return { authUrl: connection.authUrl };
		}

		await this.mcp.waitForConnections();

		const server = this.getMcpServers().servers[connection.id];
		const mcpConnection = this.mcp.mcpConnections[connection.id];
		if (server?.state !== "ready" || !mcpConnection) {
			throw new Error("MCP server is not ready.");
		}

		const client = McpClient.wrap(mcpConnection.client, {
			methods: this.methods,
		});
		const result = await client.callTool({
			name: "premium_search",
			arguments: { query: "Cloudflare Agents" },
		});

		return { content: result.content, receipt: result.receipt };
	}
}
```

If `paidSearch()` returns an `authUrl`, send the user to that URL and retry after authorization.

The wrapper retries a paid tool call with an MPP Credential. The result includes the MPP Receipt as `result.receipt`.

By default, both clients pay compatible Challenges automatically. Use `onChallenge` for HTTP or `onPaymentRequired` for MCP when a payment needs approval. Challenge amounts are integer base units, not decimal display values.

## Pay x402 services

The `mppx` HTTP client also recognizes x402 Challenges. Configure an x402-compatible EVM method next to the MPP method. The service does not need changes. For configuration, refer to [Use MPP with x402 ↗](https://mpp.dev/guides/use-mpp-with-x402).

To accept payments, refer to [Accept payments with MPP](https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/). For MCP connection options, refer to the [MCP client API](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/#page","headline":"Pay from the Agents SDK · Cloudflare Agents docs","description":"Configure a Cloudflare Agent to pay HTTP services and Model Context Protocol (MCP) tools with Machine Payments Protocol (MPP).","url":"https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
