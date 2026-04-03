---
title: Connect to an MCP server
description: Your Agent can connect to external Model Context Protocol (MCP) servers to access their tools and extend your Agent's capabilities. In this tutorial, you'll create an Agent that connects to an MCP server and uses one of its tools.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ MCP ](https://developers.cloudflare.com/search/?tags=MCP) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/agents/guides/connect-mcp-client.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect to an MCP server

**Last reviewed:**  5 months ago 

Your Agent can connect to external [Model Context Protocol (MCP) ↗](https://modelcontextprotocol.io) servers to access their tools and extend your Agent's capabilities. In this tutorial, you'll create an Agent that connects to an MCP server and uses one of its tools.

## What you will build

An Agent with endpoints to:

* Connect to an MCP server
* List available tools from connected servers
* Get the connection status

## Prerequisites

An MCP server to connect to (or use the public example in this tutorial).

## 1\. Create a basic Agent

1. Create a new Agent project using the `hello-world` template:  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-mcp-client --template=cloudflare/ai/demos/hello-world  
```  
```  
yarn create cloudflare my-mcp-client --template=cloudflare/ai/demos/hello-world  
```  
```  
pnpm create cloudflare@latest my-mcp-client --template=cloudflare/ai/demos/hello-world  
```
2. Move into the project directory:  
Terminal window  
```  
cd my-mcp-client  
```  
Your Agent is ready! The template includes a minimal Agent in `src/index.ts`:  
   * [  JavaScript ](#tab-panel-2910)  
   * [  TypeScript ](#tab-panel-2911)  
JavaScript  
```  
import { Agent, routeAgentRequest } from "agents";  
export class HelloAgent extends Agent {  
  async onRequest(request) {  
    return new Response("Hello, Agent!", { status: 200 });  
  }  
}  
export default {  
  async fetch(request, env) {  
    return (  
      (await routeAgentRequest(request, env, { cors: true })) ||  
      new Response("Not found", { status: 404 })  
    );  
  },  
};  
```  
TypeScript  
```  
import { Agent, routeAgentRequest } from "agents";  
type Env = {  
  HelloAgent: DurableObjectNamespace<HelloAgent>;  
};  
export class HelloAgent extends Agent<Env> {  
  async onRequest(request: Request): Promise<Response> {  
    return new Response("Hello, Agent!", { status: 200 });  
  }  
}  
export default {  
  async fetch(request: Request, env: Env) {  
    return (  
      (await routeAgentRequest(request, env, { cors: true })) ||  
      new Response("Not found", { status: 404 })  
    );  
  },  
} satisfies ExportedHandler<Env>;  
```

## 2\. Add MCP connection endpoint

1. Add an endpoint to connect to MCP servers. Update your Agent class in `src/index.ts`:  
   * [  JavaScript ](#tab-panel-2914)  
   * [  TypeScript ](#tab-panel-2915)  
JavaScript  
```  
export class HelloAgent extends Agent {  
  async onRequest(request) {  
    const url = new URL(request.url);  
    // Connect to an MCP server  
    if (url.pathname.endsWith("add-mcp") && request.method === "POST") {  
      const { serverUrl, name } = await request.json();  
      const { id, authUrl } = await this.addMcpServer(name, serverUrl);  
      if (authUrl) {  
        // OAuth required - return auth URL  
        return new Response(JSON.stringify({ serverId: id, authUrl }), {  
          headers: { "Content-Type": "application/json" },  
        });  
      }  
      return new Response(  
        JSON.stringify({ serverId: id, status: "connected" }),  
        { headers: { "Content-Type": "application/json" } },  
      );  
    }  
    return new Response("Not found", { status: 404 });  
  }  
}  
```  
TypeScript  
```  
export class HelloAgent extends Agent<Env> {  
  async onRequest(request: Request): Promise<Response> {  
    const url = new URL(request.url);  
    // Connect to an MCP server  
    if (url.pathname.endsWith("add-mcp") && request.method === "POST") {  
      const { serverUrl, name } = (await request.json()) as {  
        serverUrl: string;  
        name: string;  
      };  
      const { id, authUrl } = await this.addMcpServer(name, serverUrl);  
      if (authUrl) {  
        // OAuth required - return auth URL  
        return new Response(  
          JSON.stringify({ serverId: id, authUrl }),  
          { headers: { "Content-Type": "application/json" } },  
        );  
      }  
      return new Response(  
        JSON.stringify({ serverId: id, status: "connected" }),  
        { headers: { "Content-Type": "application/json" } },  
      );  
    }  
    return new Response("Not found", { status: 404 });  
  }  
}  
```

The `addMcpServer()` method connects to an MCP server. If the server requires OAuth authentication, it returns an `authUrl` that users must visit to complete authorization.

## 3\. Test the connection

1. Start your development server:  
Terminal window  
```  
npm start  
```
2. In a new terminal, connect to an MCP server (using a public example):  
Terminal window  
```  
curl -X POST http://localhost:8788/agents/hello-agent/default/add-mcp \  
  -H "Content-Type: application/json" \  
  -d '{  
    "serverUrl": "https://docs.mcp.cloudflare.com/mcp",  
    "name": "Example Server"  
  }'  
```  
You should see a response with the server ID:  
```  
{  
  "serverId": "example-server-id",  
  "status": "connected"  
}  
```

## 4\. List available tools

1. Add an endpoint to see which tools are available from connected servers:  
   * [  JavaScript ](#tab-panel-2912)  
   * [  TypeScript ](#tab-panel-2913)  
JavaScript  
```  
export class HelloAgent extends Agent {  
  async onRequest(request) {  
    const url = new URL(request.url);  
    // ... previous add-mcp endpoint ...  
    // List MCP state (servers, tools, etc)  
    if (url.pathname.endsWith("mcp-state") && request.method === "GET") {  
      const mcpState = this.getMcpServers();  
      return Response.json(mcpState);  
    }  
    return new Response("Not found", { status: 404 });  
  }  
}  
```  
TypeScript  
```  
export class HelloAgent extends Agent<Env> {  
  async onRequest(request: Request): Promise<Response> {  
    const url = new URL(request.url);  
    // ... previous add-mcp endpoint ...  
    // List MCP state (servers, tools, etc)  
    if (url.pathname.endsWith("mcp-state") && request.method === "GET") {  
      const mcpState = this.getMcpServers();  
      return Response.json(mcpState);  
    }  
    return new Response("Not found", { status: 404 });  
  }  
}  
```
2. Test it:  
Terminal window  
```  
curl http://localhost:8788/agents/hello-agent/default/mcp-state  
```  
You'll see all connected servers, their connection states, and available tools:  
```  
{  
  "servers": {  
    "example-server-id": {  
      "name": "Example Server",  
      "state": "ready",  
      "server_url": "https://docs.mcp.cloudflare.com/mcp",  
      ...  
    }  
  },  
  "tools": [  
    {  
      "name": "add",  
      "description": "Add two numbers",  
      "serverId": "example-server-id",  
      ...  
    }  
  ]  
}  
```

## Summary

You created an Agent that can:

* Connect to external MCP servers dynamically
* Handle OAuth authentication flows when required
* List all available tools from connected servers
* Monitor connection status

Connections persist in the Agent's [SQL storage](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/), so they remain active across requests.

## Next steps

[ Handle OAuth flows ](https://developers.cloudflare.com/agents/guides/oauth-mcp-client/) Configure OAuth callbacks and error handling. 

[ MCP Client API ](https://developers.cloudflare.com/agents/api-reference/mcp-client-api/) Complete API documentation for MCP clients. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/guides/","name":"Guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/guides/connect-mcp-client/","name":"Connect to an MCP server"}}]}
```
