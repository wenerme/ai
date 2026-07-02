---
title: Use an OpenAPI service with Code Mode
description: Turn OpenAPI operations into typed Code Mode connector methods while keeping authentication in the host Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Use an OpenAPI service with Code Mode

Use `OpenApiConnector` to expose an OpenAPI service inside a durable Code Mode runtime. The connector derives one sandbox method for each operation in the OpenAPI document.

The model can discover methods with `codemode.search()` and request focused input types with `codemode.describe()`. The complete OpenAPI document does not need to enter the model context.

This page covers an Agent consuming an OpenAPI service. To publish an OpenAPI service to external MCP clients through `search` and `execute`, refer to [Build a search and execute MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-openapi-mcp-server/).

## Prerequisites

You need a project with the [durable Code Mode runtime](https://developers.cloudflare.com/agents/tools/codemode/durable-runtime/) configured. The runtime setup provides the Worker Loader binding and the `CodemodeRuntime` export used in this guide.

## Create an OpenAPI connector

1. Add the OpenAPI document to your project. Give each operation a unique `operationId` so it produces a stable sandbox method name:

  * [  JavaScript ](#tab-panel-6809)
  * [  TypeScript ](#tab-panel-6810)

**src/orders-openapi.js**
```js
export const ordersOpenApiSpec = {
  openapi: "3.1.0",
  info: { title: "Orders API", version: "1.0.0" },
  paths: {
    "/orders/{orderId}": {
      get: {
        operationId: "get_order",
        summary: "Get an order by ID.",
        parameters: [
          {
            name: "orderId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
      },
    },
    "/orders": {
      post: {
        operationId: "create_order",
        summary: "Create an order.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  quantity: { type: "integer" },
                },
                required: ["productId", "quantity"],
              },
            },
          },
        },
      },
    },
  },
};
```

**src/orders-openapi.ts**
```ts
export const ordersOpenApiSpec = {
  openapi: "3.1.0",
  info: { title: "Orders API", version: "1.0.0" },
  paths: {
    "/orders/{orderId}": {
      get: {
        operationId: "get_order",
        summary: "Get an order by ID.",
        parameters: [
          {
            name: "orderId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
      },
    },
    "/orders": {
      post: {
        operationId: "create_order",
        summary: "Create an order.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  quantity: { type: "integer" },
                },
                required: ["productId", "quantity"],
              },
            },
          },
        },
      },
    },
  },
} as const;
```
2. Create the connector. Implement `spec()` to return the document and `request()` to make authenticated host-side requests:

  * [  JavaScript ](#tab-panel-6811)
  * [  TypeScript ](#tab-panel-6812)

**src/orders-connector.js**
```js
import { OpenApiConnector } from "@cloudflare/codemode";
import { ordersOpenApiSpec } from "./orders-openapi";
const API_ORIGIN = "https://api.example.com";
export class OrdersConnector extends OpenApiConnector {
  name() {
    return "orders";
  }
  instructions() {
    return "Use for reading and creating orders.";
  }
  spec() {
    return ordersOpenApiSpec;
  }
  async request(options) {
    if (!options.path.startsWith("/")) {
      throw new Error("Orders API path must start with a slash");
    }
    const url = new URL(options.path, API_ORIGIN);
    for (const [key, value] of Object.entries(options.params ?? {})) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
        ...options.headers,
        Authorization: `Bearer ${this.env.ORDERS_API_TOKEN}`,
      },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
    });
    if (!response.ok) {
      throw new Error(`Orders API request failed: ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }
  tool(name, tool) {
    if (name === "create_order") {
      return { ...tool, requiresApproval: true };
    }
    return tool;
  }
}
```

**src/orders-connector.ts**
```ts
import {
  OpenApiConnector,
  type ConnectorTool,
  type OpenApiRequestOptions,
} from "@cloudflare/codemode";
import { ordersOpenApiSpec } from "./orders-openapi";
const API_ORIGIN = "https://api.example.com";
export class OrdersConnector extends OpenApiConnector<Env> {
  override name() {
    return "orders";
  }
  protected override instructions() {
    return "Use for reading and creating orders.";
  }
  protected override spec() {
    return ordersOpenApiSpec;
  }
  protected override async request(options: OpenApiRequestOptions) {
    if (!options.path.startsWith("/")) {
      throw new Error("Orders API path must start with a slash");
    }
    const url = new URL(options.path, API_ORIGIN);
    for (const [key, value] of Object.entries(options.params ?? {})) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
        ...options.headers,
        Authorization: `Bearer ${this.env.ORDERS_API_TOKEN}`,
      },
      body:
        options.body === undefined
          ? undefined
          : JSON.stringify(options.body),
    });
    if (!response.ok) {
      throw new Error(`Orders API request failed: ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }
  protected override tool(name: string, tool: ConnectorTool): ConnectorTool {
    if (name === "create_order") {
      return { ...tool, requiresApproval: true };
    }
    return tool;
  }
}
```
Credentials remain in the host Worker. Model-written code receives connector methods and their results, not `ORDERS_API_TOKEN`.
The `tool()` hook decorates derived operations. This example requires approval before `create_order` executes. You can also use the hook to add replay or rollback behavior.
3. Import the connector and add it to the runtime:

  * [  JavaScript ](#tab-panel-6807)
  * [  TypeScript ](#tab-panel-6808)

**src/server.js**
```js
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
  createCodemodeRuntime,
  DynamicWorkerExecutor,
} from "@cloudflare/codemode";
import { OrdersConnector } from "./orders-connector";
export class Chat extends AIChatAgent {
  #runtime() {
    return createCodemodeRuntime({
      ctx: this.ctx,
      executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
      connectors: [new OrdersConnector(this.ctx, this.env)],
    });
  }
  async onChatMessage() {
    const tools = { codemode: this.#runtime().tool() };
    // Pass tools to your model call.
  }
}
```

**src/server.ts**
```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
  createCodemodeRuntime,
  DynamicWorkerExecutor,
} from "@cloudflare/codemode";
import { OrdersConnector } from "./orders-connector";
export class Chat extends AIChatAgent<Env> {
  #runtime() {
    return createCodemodeRuntime({
      ctx: this.ctx,
      executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
      connectors: [new OrdersConnector(this.ctx, this.env)],
    });
  }
  async onChatMessage() {
    const tools = { codemode: this.#runtime().tool() };
    // Pass tools to your model call.
  }
}
```
4. Let the model discover the operations and call the generated connector methods:

**JavaScript**
```js
async () => {
  const matches = await codemode.search("get an order by ID");
  const docs = await codemode.describe(matches.results[0].path);
  const order = await orders.get_order({ orderId: "order-123" });
  return { docs, order };
};
```

## Derived method behavior

`OpenApiConnector` uses a sanitized `operationId` as the method name. If an operation has no `operationId`, it derives a name from the HTTP method and path. Define unique operation IDs to keep method names stable and avoid collisions.

Each generated method accepts one object:

* Path, query, and header parameters appear as top-level fields.
* A JSON request body appears under `body`.
* Required OpenAPI parameters become required TypeScript fields.
* Local `$ref` values in input schemas are resolved before types are generated.

The connector substitutes path parameters and passes a normalized `{ path, method, params, body, headers }` object to `request()`.

The current connector derives input types but does not derive response types from OpenAPI response schemas. Generated methods therefore return `unknown` unless your application provides more specific declarations through another connector implementation.

## Request escape hatch

Every OpenAPI connector also exposes a low-level `request()` sandbox method. Use it when the OpenAPI document does not describe an operation the model needs:

**JavaScript**

```js
const result = await orders.request({
  path: "/orders",
  method: "GET",
  params: { status: "processing" },
});
```

Prefer derived operation methods when available. They provide discoverable descriptions and generated input types.

`exposeSpec()` returns `false` by default. Override it to return `true` only when model-written code needs access to the raw OpenAPI document. Large documents can produce large results and durable log entries.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/codemode/openapi/#page","headline":"Use an OpenAPI service with Code Mode · Cloudflare Agents docs","description":"Turn OpenAPI operations into typed Code Mode connector methods while keeping authentication in the host Worker.","url":"https://developers.cloudflare.com/agents/tools/codemode/openapi/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/codemode/","name":"Code Mode"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/codemode/openapi/","name":"Use an OpenAPI service with Code Mode"}}]}
```
