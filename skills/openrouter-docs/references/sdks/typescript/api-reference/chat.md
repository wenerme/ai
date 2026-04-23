> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/sdks/typescript/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/sdks/typescript/api-reference/llms-full.txt.

# Chat - TypeScript SDK

{/* banner:start */}

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

### Available Operations

* [send](#send) - Create a chat completion

## send

Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.

### Example Usage

{/* UsageSnippet language="typescript" operationID="sendChatCompletionRequest" method="post" path="/chat/completions" */}

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.chat.send({
    chatRequest: {
      maxTokens: 150,
      messages: [
        {
          content: "You are a helpful assistant.",
          role: "system",
        },
        {
          content: "What is the capital of France?",
          role: "user",
        },
      ],
      model: "openai/gpt-4",
      temperature: 0.7,
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
import { chatSend } from "@openrouter/sdk/funcs/chatSend.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await chatSend(openRouter, {
    chatRequest: {
      maxTokens: 150,
      messages: [
        {
          content: "You are a helpful assistant.",
          role: "system",
        },
        {
          content: "What is the capital of France?",
          role: "user",
        },
      ],
      model: "openai/gpt-4",
      temperature: 0.7,
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("chatSend failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                                           | Required             | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.SendChatCompletionRequestRequest](/docs/sdks/typescript/api-reference/operations/sendchatcompletionrequestrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                                                 | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                        | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/sdks/typescript/api-reference/lib/retryconfig)                                                             | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.SendChatCompletionRequestResponse](/docs/sdks/typescript/api-reference/operations/sendchatcompletionrequestresponse)>**

### Errors

| Error Type                              | Status Code | Content Type     |
| --------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError          | 400         | application/json |
| errors.UnauthorizedResponseError        | 401         | application/json |
| errors.PaymentRequiredResponseError     | 402         | application/json |
| errors.NotFoundResponseError            | 404         | application/json |
| errors.RequestTimeoutResponseError      | 408         | application/json |
| errors.PayloadTooLargeResponseError     | 413         | application/json |
| errors.UnprocessableEntityResponseError | 422         | application/json |
| errors.TooManyRequestsResponseError     | 429         | application/json |
| errors.InternalServerResponseError      | 500         | application/json |
| errors.BadGatewayResponseError          | 502         | application/json |
| errors.ServiceUnavailableResponseError  | 503         | application/json |
| errors.EdgeNetworkTimeoutResponseError  | 524         | application/json |
| errors.ProviderOverloadedResponseError  | 529         | application/json |
| errors.OpenRouterDefaultError           | 4XX, 5XX    | \*/\*            |