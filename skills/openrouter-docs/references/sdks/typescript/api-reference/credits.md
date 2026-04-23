> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/sdks/typescript/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/sdks/typescript/api-reference/llms-full.txt.

# Credits - TypeScript SDK

{/* banner:start */}

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Credit management endpoints

### Available Operations

* [getCredits](#getcredits) - Get remaining credits

## getCredits

Get total credits purchased and used for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="typescript" operationID="getCredits" method="get" path="/credits" */}

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.credits.getCredits();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { creditsGetCredits } from "@openrouter/sdk/funcs/creditsGetCredits.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await creditsGetCredits(openRouter);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("creditsGetCredits failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                             | Required             | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.GetCreditsRequest](/docs/sdks/typescript/api-reference/operations/getcreditsrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                   | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)          | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/sdks/typescript/api-reference/lib/retryconfig)                               | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetCreditsResponse](/docs/sdks/typescript/api-reference/operations/getcreditsresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |