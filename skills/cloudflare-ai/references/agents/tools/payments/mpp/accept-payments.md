---
description: Accept Machine Payments Protocol (MPP) payments from an origin, Cloudflare Worker route, or Model Context Protocol (MCP) tool.
title: Accept payments with MPP
image: https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/og.png?v=c8d7691096adf0d2
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Accept payments with MPP

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use Cloudflare Workers to accept Machine Payments Protocol (MPP) payments. Choose an integration based on the service you want to protect:

- [`mpp-proxy` ↗︎](https://github.com/cloudflare/mpp-proxy) — Charge for HTTP content without changing your origin code. Refer to [Charge for HTTP content](https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/).
- **Worker route** — Add `mppx` payment middleware to a Worker application.
- **MCP tool** — Require payment before an MCP tool returns its result.

## Prerequisites

Create a [Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/). You also need a payment recipient and an MPP secret key.

The examples use a stablecoin payment method on testnet. For other methods, refer to [MPP payment methods ↗︎](https://mpp.dev/payment-methods/).

## Charge for a Worker route

Add `mppx` middleware when you control the Worker application:

1. Install Hono and `mppx` in the Worker project:npmyarnpnpmbun

   ```
   npm i hono mppx
   ```

   ```
   yarn add hono mppx
   ```

   ```
   pnpm add hono mppx
   ```

   ```
   bun add hono mppx
   ```

2. Store the MPP signing key as a [Worker secret](https://developers.cloudflare.com/workers/configuration/secrets/):npmyarnpnpm

   ```
   npx wrangler secret put MPP_SECRET_KEY
   ```

   ```
   yarn wrangler secret put MPP_SECRET_KEY
   ```

   ```
   pnpm wrangler secret put MPP_SECRET_KEY
   ```

3. Add the payment middleware before the paid route handler:

   *src/index.jsjs*



   ```js
   import { env } from "cloudflare:workers";
   import { Hono } from "hono";
   import { Mppx, tempo } from "mppx/hono";

   const workerEnv = env;
   const app = new Hono();
   const mppx = Mppx.create({
   	methods: [tempo.charge({ testnet: true })],
   	secretKey: workerEnv.MPP_SECRET_KEY,
   });

   app.get(
   	"/premium",
   	mppx.charge({
   		amount: "0.01",
   		currency: "0x20c0000000000000000000000000000000000000",
   		description: "Premium API access",
   		recipient: "<YOUR_WALLET_ADDRESS>",
   	}),
   	(c) => c.json({ access: "paid" }),
   );

   export default app;
   ```

   *src/index.tsts*



   ```ts
   import { env } from "cloudflare:workers";
   import { Hono } from "hono";
   import { Mppx, tempo } from "mppx/hono";

   const workerEnv = env as Env & { MPP_SECRET_KEY: string };
   const app = new Hono();
   const mppx = Mppx.create({
     methods: [tempo.charge({ testnet: true })],
     secretKey: workerEnv.MPP_SECRET_KEY,
   });

   app.get(
     "/premium",
     mppx.charge({
       amount: "0.01",
       currency: "0x20c0000000000000000000000000000000000000",
       description: "Premium API access",
       recipient: "<YOUR_WALLET_ADDRESS>",
     }),
     (c) => c.json({ access: "paid" }),
   );

   export default app;
   ```

4. Deploy the Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

5. Request the paid route without a payment:

   ```sh
   curl -i https://<YOUR_WORKER>.workers.dev/premium
   ```

   The Worker returns `402 Payment Required` and a `WWW-Authenticate: Payment` header. A paid retry reaches the handler and returns a `Payment-Receipt` header.

## Charge for an MCP tool

Charge for a tool call from an MCP server on Workers. `mppx` reads payment credentials through the MCP SDK v1 request context (`Transport.mcpSdk()`), so this server uses an SDK v1 `McpServer` with `createLegacyMcpHandler`. It is still stateless: the Worker builds a new server for each request and needs no Durable Object.

1. Install the required packages in an Agents project:npmyarnpnpmbun

   ```
   npm i agents mppx @modelcontextprotocol/sdk zod
   ```

   ```
   yarn add agents mppx @modelcontextprotocol/sdk zod
   ```

   ```
   pnpm add agents mppx @modelcontextprotocol/sdk zod
   ```

   ```
   bun add agents mppx @modelcontextprotocol/sdk zod
   ```

2. Configure the Worker:

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "name": "mpp-server",
     "main": "src/index.ts",
     "upload_source_maps": true,
     // Set this to today's date
     "compatibility_date": "2026-10-27",
     "compatibility_flags": [
       "nodejs_compat"
     ]
   }
   ```

   ```toml
   name = "mpp-server"
   main = "src/index.ts"
   upload_source_maps = true
   # Set this to today's date
   compatibility_date = "2026-10-27"
   compatibility_flags = ["nodejs_compat"]
   ```

3. Store `MPP_SECRET_KEY` as a Worker secret:npmyarnpnpm

   ```
   npx wrangler secret put MPP_SECRET_KEY
   ```

   ```
   yarn wrangler secret put MPP_SECRET_KEY
   ```

   ```
   pnpm wrangler secret put MPP_SECRET_KEY
   ```

4. Check payment before returning the tool result:

   *src/index.jsjs*



   ```js
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { createLegacyMcpHandler } from "agents/mcp";
   import { Mppx, tempo, Transport } from "mppx/server";
   import { z } from "zod";

   function createServer(env) {
   	const server = new McpServer({ name: "paid-search", version: "1.0.0" });
   	const mppx = Mppx.create({
   		methods: [tempo.charge({ testnet: true })],
   		secretKey: env.MPP_SECRET_KEY,
   		transport: Transport.mcpSdk(),
   	});

   	server.registerTool(
   		"premium_search",
   		{
   			description: "Search premium content",
   			inputSchema: { query: z.string() },
   		},
   		async ({ query }, extra) => {
   			const payment = await mppx.charge({
   				amount: "0.01",
   				currency: "0x20c0000000000000000000000000000000000000",
   				description: "Premium search",
   				recipient: "<YOUR_WALLET_ADDRESS>",
   			})(extra);

   			if (payment.status === 402) throw payment.challenge;

   			return payment.withReceipt({
   				content: [{ type: "text", text: `Results for: ${query}` }],
   			});
   		},
   	);

   	return server;
   }

   export default {
   	fetch(request, env, ctx) {
   		return createLegacyMcpHandler(createServer(env))(request, env, ctx);
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { createLegacyMcpHandler } from "agents/mcp";
   import { Mppx, tempo, Transport } from "mppx/server";
   import { z } from "zod";

   type PaymentEnv = Env & { MPP_SECRET_KEY: string };

   function createServer(env: PaymentEnv) {
     const server = new McpServer({ name: "paid-search", version: "1.0.0" });
     const mppx = Mppx.create({
       methods: [tempo.charge({ testnet: true })],
       secretKey: env.MPP_SECRET_KEY,
       transport: Transport.mcpSdk(),
     });

     server.registerTool(
       "premium_search",
       {
         description: "Search premium content",
         inputSchema: { query: z.string() },
       },
       async ({ query }, extra) => {
         const payment = await mppx.charge({
           amount: "0.01",
           currency: "0x20c0000000000000000000000000000000000000",
           description: "Premium search",
           recipient: "<YOUR_WALLET_ADDRESS>",
         })(extra);

         if (payment.status === 402) throw payment.challenge;

         return payment.withReceipt({
           content: [{ type: "text", text: `Results for: ${query}` }],
         });
       },
     );

     return server;
   }

   export default {
     fetch(request, env, ctx) {
       return createLegacyMcpHandler(createServer(env))(request, env, ctx);
     },
   } satisfies ExportedHandler<PaymentEnv>;
   ```

5. Deploy the Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

   An unpaid `premium_search` call returns an MPP Challenge. A paid retry returns the tool result and an MPP Receipt in `_meta`.

To test both payment flows from a Cloudflare Agent, refer to [Pay from the Agents SDK](https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/). For production billing patterns, refer to [MPP payment intents ↗︎](https://mpp.dev/intents/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/#page","headline":"Accept payments with MPP","description":"Accept Machine Payments Protocol (MPP) payments from an origin, Cloudflare Worker route, or Model Context Protocol (MCP) tool.","url":"https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/og.png?v=c8d7691096adf0d2","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
