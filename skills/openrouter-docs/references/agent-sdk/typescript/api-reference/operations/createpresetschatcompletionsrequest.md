> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreatePresetsChatCompletionsRequest - TypeScript SDK

> CreatePresetsChatCompletionsRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreatePresetsChatCompletionsRequest } from "@openrouter/sdk/models/operations";

let value: CreatePresetsChatCompletionsRequest = {
  slug: "my-preset",
  chatRequest: {
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
  },
};
```

## Fields

| Field           | Type                                                                         | Required             | Description                                                                                                                                                 | Example                                                                                                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`   | *string*                                                                     | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                                                                                                                                          |
| `appTitle`      | *string*                                                                     | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                                                                                                                                          |
| `appCategories` | *string*                                                                     | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                                                                                                                                          |
| `slug`          | *string*                                                                     | :heavy\_check\_mark: | URL-safe slug identifying the preset. Created if it does not exist.                                                                                         | my-preset                                                                                                                                                                                                                                |
| `chatRequest`   | [models.ChatRequest](/agent-sdk/typescript/api-reference/models/chatrequest) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"max_tokens": 150,"messages": [{"content": "You are a helpful assistant.","role": "system"}`,<br />`{"content": "What is the capital of France?","role": "user"}`<br />],<br />"model": "openai/gpt-4",<br />"temperature": 0.7<br />} |
