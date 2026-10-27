---
description: Deploy a remote MCP server on Cloudflare with optional authentication using Streamable HTTP transport.
title: Build a Remote MCP server
image: https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/og.png?v=ef0a334079cbdee6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a Remote MCP server

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows how to deploy a remote MCP server on Cloudflare using [Streamable HTTP transport](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/). You have two options:

- **Without authentication** — anyone can connect and use the server (no login required).
- **With [authentication and authorization](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/#add-authentication)** — users sign in before accessing tools, and you can control which tools an agent can call based on the user's permissions.

## How the server works

The templates in this guide build the server with [`createMcpHandler`](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) from the Agents SDK. The handler is stateless: each request gets a fresh `McpServer` from a factory function, so the server needs no Durable Object or session. Keep data that must outlive a request in a binding such as KV, D1, or a Durable Object.

To move an existing `McpAgent` server, refer to [Migrate to MCP SDK v2](https://developers.cloudflare.com/agents/model-context-protocol/guides/migrate-to-mcp-sdk-v2/). The deprecated API is documented in the [`McpAgent` reference](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/).

## Deploy your first MCP server

You can start by deploying a [public MCP server ↗︎](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless) without authentication, then add user authentication and scoped authorization later. If you already know your server will require authentication, you can skip ahead to the [next section](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/#add-authentication).

### Via the dashboard

The button below will guide you through everything you need to do to deploy an [example MCP server ↗︎](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless) to your Cloudflare account:

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless)

Once deployed, this server will be live at your `workers.dev` subdomain (for example, `remote-mcp-server-authless.your-account.workers.dev/mcp`). You can connect to it immediately using the [AI Playground ↗︎](https://playground.ai.cloudflare.com/) (a remote MCP client), [MCP inspector ↗︎](https://github.com/modelcontextprotocol/inspector) or [other MCP clients](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/#connect-from-an-mcp-client).

A new git repository will be set up on your GitHub or GitLab account for your MCP server, configured to automatically deploy to Cloudflare each time you push a change or merge a pull request to the main branch of the repository. You can clone this repository, [develop locally](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/#via-the-cli), and start customizing the MCP server with your own [tools](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/).

### Via the CLI

You can use the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler) to create a new MCP Server on your local machine and deploy it to Cloudflare.

1. Open a terminal and run the following command:npmyarnpnpm

   ```
   npm create cloudflare@latest -- remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
   ```

   ```
   yarn create cloudflare remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
   ```

   ```
   pnpm create cloudflare@latest remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
   ```

   During setup, select the following options: - For *Do you want to add an AGENTS.md file to help AI coding tools understand Cloudflare APIs?*, choose `No`. - For *Do you want to use git for version control?*, choose `No`. - For *Do you want to deploy your application?*, choose `No` (we will be testing the server before deploying).

   Now, you have the MCP server setup, with dependencies installed.
2. Move into the project folder:

   ```sh
   cd remote-mcp-server-authless
   ```

3. In the directory of your new project, run the following command to start the development server:

   ```sh
   npm start
   ```

   ```sh
   ⎔ Starting local server...
   [wrangler:info] Ready on http://localhost:8788
   ```

   Check the command output for the local port. In this example, the MCP server runs on port `8788`, and the MCP endpoint URL is `http://localhost:8788/mcp`.

   Note

   You cannot interact with the MCP server by opening the `/mcp` URL directly in a web browser. The `/mcp` endpoint expects an MCP client to send MCP protocol messages, which a browser does not do by default. In the next step, we will demonstrate how to connect to the server using an MCP client.
4. To test the server locally:
   1. In a new terminal, run the [MCP inspector ↗︎](https://github.com/modelcontextprotocol/inspector). The MCP inspector is an interactive MCP client that allows you to connect to your MCP server and invoke tools from a web browser.

      ```sh
      npx @modelcontextprotocol/inspector@latest
      ```

      ```sh
      🚀 MCP Inspector is up and running at:
      	http://localhost:5173/?MCP_PROXY_AUTH_TOKEN=46ab..cd3

      🌐 Opening browser...
      ```

      The MCP Inspector will launch in your web browser. You can also launch it manually by opening a browser and going to `http://localhost:<PORT>`. Check the command output for the local port where MCP Inspector is running. In this example, MCP Inspector is served on port `5173`.
   2. In the MCP inspector, enter the URL of your MCP server ( `http://localhost:8788/mcp`), and select **Connect**. Select **List Tools** to show the tools that your MCP server exposes.
5. You can now deploy your MCP server to Cloudflare. From your project directory, run:

   ```sh
   npx wrangler@latest deploy
   ```

   If you have already [connected a git repository](https://developers.cloudflare.com/workers/ci-cd/builds/) to the Worker with your MCP server, you can deploy your MCP server by pushing a change or merging a pull request to the main branch of the repository.

   The MCP server will be deployed to your `*.workers.dev` subdomain at `https://remote-mcp-server-authless.your-account.workers.dev/mcp`.
6. To test the remote MCP server, take the URL of your deployed MCP server ( `https://remote-mcp-server-authless.your-account.workers.dev/mcp`) and enter it in the MCP inspector running on `http://localhost:5173`.

You now have a remote MCP server that MCP clients can connect to.

## Connect from an MCP client

Connect an MCP client with Streamable HTTP support directly to your deployed endpoint. For example, add the server to Claude Code:

```sh
claude mcp add --transport http math https://remote-mcp-server-authless.your-account.workers.dev/mcp
```

Run `claude mcp list` to verify the connection. Then ask Claude to use one of your tools. For example:

```txt
Could you use the math tool to add 23 and 19?
```

Claude should invoke the tool and show the server response.

For other clients, refer to [Test a Remote MCP Server](https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/).

## Add authentication

The server you deployed accepts any client. To require users to sign in, put it behind an OAuth authorization server built with [Workers OAuth Provider ↗︎](https://github.com/cloudflare/workers-oauth-provider):

1. Build an authorization server Worker with `OAuthAuthorizationServer`. Its `/authorize` page signs users in, directly or through GitHub, Google, Cloudflare Access, or another identity provider.
2. Wrap your MCP server's `createMcpHandler` in an `OAuthResourceServer`, which checks each request's token with the authorization server over a Service Binding.

MCP clients find the authorization server from your MCP server's `401` response, sign the user in, and retry with a token. Your tools read the signed-in user with `getMcpAuthContext()`.

Refer to [Authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) for both Workers in full.

## Next steps

### [MCP Tools](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/)

Add tools to your MCP server.

### [Authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/)

Add an authorization server and sign users in.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/#page","headline":"Build a Remote MCP server","description":"Deploy a remote MCP server on Cloudflare with optional authentication using Streamable HTTP transport.","url":"https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/og.png?v=ef0a334079cbdee6","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
