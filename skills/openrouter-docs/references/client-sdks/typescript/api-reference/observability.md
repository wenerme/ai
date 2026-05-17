> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Observability - TypeScript SDK

The TypeScript SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).

## Overview

Observability endpoints

### Available Operations

* [list](#list) - List observability destinations
* [get](#get) - Get an observability destination

## list

List the observability destinations configured for the authenticated entity's default workspace. Use the `workspace_id` query parameter to scope the result to a different workspace. Only destinations with stable release status are surfaced — destinations of other types are excluded. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.observability.list();

  for await (const page of result) {
    console.log(page);
  }
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { observabilityList } from "@openrouter/sdk/funcs/observabilityList.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await observabilityList(openRouter);
  if (res.ok) {
    const { value: result } = res;
    for await (const page of result) {
    console.log(page);
  }
  } else {
    console.log("observabilityList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                                                   | Required             | Description                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.ListObservabilityDestinationsRequest](/docs/sdks/typescript/api-reference/operations/listobservabilitydestinationsrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                                                         | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/sdks/typescript/api-reference/lib/retryconfig)                                                                     | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListObservabilityDestinationsResponse](/docs/sdks/typescript/api-reference/operations/listobservabilitydestinationsresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get

Fetch a single observability destination by its UUID. Defaults to the authenticated entity's default workspace — use `workspace_id` to override. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.observability.get({
    id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { observabilityGet } from "@openrouter/sdk/funcs/observabilityGet.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await observabilityGet(openRouter, {
    id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("observabilityGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                                               | Required             | Description                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.GetObservabilityDestinationRequest](/docs/sdks/typescript/api-reference/operations/getobservabilitydestinationrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                                                     | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                            | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/sdks/typescript/api-reference/lib/retryconfig)                                                                 | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.GetObservabilityDestinationResponse](/docs/sdks/typescript/api-reference/models/getobservabilitydestinationresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |