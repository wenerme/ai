> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Beta.Analytics - TypeScript SDK

## Overview

beta.Analytics endpoints

### Available Operations

* [getAnalyticsMeta](#getanalyticsmeta) - Get available analytics metrics and dimensions
* [queryAnalytics](#queryanalytics) - Query analytics data

## getAnalyticsMeta

Returns the available metrics, dimensions, filter operators, and granularities for the analytics query endpoint. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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
  const result = await openRouter.beta.analytics.getAnalyticsMeta();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { betaAnalyticsGetAnalyticsMeta } from "@openrouter/sdk/funcs/betaAnalyticsGetAnalyticsMeta.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await betaAnalyticsGetAnalyticsMeta(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("betaAnalyticsGetAnalyticsMeta failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                         | Required             | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.GetAnalyticsMetaRequest](/docs/sdks/typescript/api-reference/operations/getanalyticsmetarequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                               | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                      | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/sdks/typescript/api-reference/lib/retryconfig)                                           | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetAnalyticsMetaResponse](/docs/sdks/typescript/api-reference/operations/getanalyticsmetaresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## queryAnalytics

Execute an analytics query with specified metrics, dimensions, filters, and time range. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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
  const result = await openRouter.beta.analytics.queryAnalytics({
    requestBody: {
      dimensions: [
        "model",
      ],
      granularity: "day",
      limit: 100,
      metrics: [
        "request_count",
      ],
      timeRange: {
        end: new Date("2025-01-08T00:00:00Z"),
        start: new Date("2025-01-01T00:00:00Z"),
      },
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { betaAnalyticsQueryAnalytics } from "@openrouter/sdk/funcs/betaAnalyticsQueryAnalytics.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await betaAnalyticsQueryAnalytics(openRouter, {
    requestBody: {
      dimensions: [
        "model",
      ],
      granularity: "day",
      limit: 100,
      metrics: [
        "request_count",
      ],
      timeRange: {
        end: new Date("2025-01-08T00:00:00Z"),
        start: new Date("2025-01-01T00:00:00Z"),
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("betaAnalyticsQueryAnalytics failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                     | Required             | Description                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.QueryAnalyticsRequest](/docs/sdks/typescript/api-reference/operations/queryanalyticsrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                           | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                  | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/sdks/typescript/api-reference/lib/retryconfig)                                       | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.QueryAnalyticsResponse](/docs/sdks/typescript/api-reference/operations/queryanalyticsresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.RequestTimeoutResponseError | 408         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |