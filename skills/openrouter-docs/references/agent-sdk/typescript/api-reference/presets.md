> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Presets - TypeScript SDK

> Presets method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Overview

Presets endpoints

### Available Operations

* [createPresetsChatCompletions](#createpresetschatcompletions) - Create a preset from a chat-completions request body
* [createPresetsMessages](#createpresetsmessages) - Create a preset from a messages request body
* [createPresetsResponses](#createpresetsresponses) - Create a preset from a responses request body

## createPresetsChatCompletions

Creates a preset (or a new version of an existing one) from an inference request body. Only fields that overlap with the preset config are persisted; other fields (e.g. `messages`, `stream`, `prompt`) are silently ignored.

### Example Usage

```typescript expandable lines theme={null}
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.presets.createPresetsChatCompletions({
    slug: "my-preset",
    chatRequest: {
      messages: [
        {
          content: "You are a helpful assistant.",
          role: "system",
        },
        {
          content: "Hello!",
          role: "user",
        },
      ],
      model: "openai/gpt-5.4",
      temperature: 0.7,
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript expandable lines theme={null}
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { presetsCreatePresetsChatCompletions } from "@openrouter/sdk/funcs/presetsCreatePresetsChatCompletions.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await presetsCreatePresetsChatCompletions(openRouter, {
    slug: "my-preset",
    chatRequest: {
      messages: [
        {
          content: "You are a helpful assistant.",
          role: "system",
        },
        {
          content: "Hello!",
          role: "user",
        },
      ],
      model: "openai/gpt-5.4",
      temperature: 0.7,
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("presetsCreatePresetsChatCompletions failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                                                 | Required             | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.CreatePresetsChatCompletionsRequest](/docs/agent-sdk/typescript/api-reference/operations/createpresetschatcompletionsrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                                                       | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                              | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/agent-sdk/typescript/api-reference/lib/retryconfig)                                                                   | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.CreatePresetFromInferenceResponse](/docs/agent-sdk/typescript/api-reference/models/createpresetfrominferenceresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.ConflictResponseError       | 409         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## createPresetsMessages

Creates a preset (or a new version of an existing one) from an inference request body. Only fields that overlap with the preset config are persisted; other fields (e.g. `messages`, `stream`, `prompt`) are silently ignored.

### Example Usage

```typescript expandable lines theme={null}
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.presets.createPresetsMessages({
    slug: "my-preset",
    messagesRequest: {
      maxTokens: 1024,
      messages: [
        {
          content: "Hello!",
          role: "user",
        },
      ],
      model: "anthropic/claude-4.6-sonnet",
      system: "You are a helpful assistant.",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript expandable lines theme={null}
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { presetsCreatePresetsMessages } from "@openrouter/sdk/funcs/presetsCreatePresetsMessages.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await presetsCreatePresetsMessages(openRouter, {
    slug: "my-preset",
    messagesRequest: {
      maxTokens: 1024,
      messages: [
        {
          content: "Hello!",
          role: "user",
        },
      ],
      model: "anthropic/claude-4.6-sonnet",
      system: "You are a helpful assistant.",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("presetsCreatePresetsMessages failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                                   | Required             | Description                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.CreatePresetsMessagesRequest](/docs/agent-sdk/typescript/api-reference/operations/createpresetsmessagesrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                                         | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/agent-sdk/typescript/api-reference/lib/retryconfig)                                                     | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.CreatePresetFromInferenceResponse](/docs/agent-sdk/typescript/api-reference/models/createpresetfrominferenceresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.ConflictResponseError       | 409         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## createPresetsResponses

Creates a preset (or a new version of an existing one) from an inference request body. Only fields that overlap with the preset config are persisted; other fields (e.g. `messages`, `stream`, `prompt`) are silently ignored.

### Example Usage

```typescript expandable lines theme={null}
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.presets.createPresetsResponses({
    slug: "my-preset",
    responsesRequest: {
      input: "Hello!",
      instructions: "You are a helpful assistant.",
      model: "openai/gpt-5.4",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript expandable lines theme={null}
import { OpenRouterCore } from "@openrouter/sdk/core.js";
import { presetsCreatePresetsResponses } from "@openrouter/sdk/funcs/presetsCreatePresetsResponses.js";

// Use `OpenRouterCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const openRouter = new OpenRouterCore({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const res = await presetsCreatePresetsResponses(openRouter, {
    slug: "my-preset",
    responsesRequest: {
      input: "Hello!",
      instructions: "You are a helpful assistant.",
      model: "openai/gpt-5.4",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("presetsCreatePresetsResponses failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter              | Type                                                                                                                     | Required             | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`              | [operations.CreatePresetsResponsesRequest](/docs/agent-sdk/typescript/api-reference/operations/createpresetsresponsesrequest) | :heavy\_check\_mark: | The request object to use for the request.                                                                                                                                     |
| `options`              | RequestOptions                                                                                                           | :heavy\_minus\_sign: | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions` | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                  | :heavy\_minus\_sign: | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`      | [RetryConfig](/docs/agent-sdk/typescript/api-reference/lib/retryconfig)                                                       | :heavy\_minus\_sign: | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.CreatePresetFromInferenceResponse](/docs/agent-sdk/typescript/api-reference/models/createpresetfrominferenceresponse)>**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.ConflictResponseError       | 409         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
