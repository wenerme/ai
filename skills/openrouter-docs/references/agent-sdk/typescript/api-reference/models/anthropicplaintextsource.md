> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicPlainTextSource - TypeScript SDK

> AnthropicPlainTextSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicPlainTextSource } from "@openrouter/sdk/models";

let value: AnthropicPlainTextSource = {
  data: "Hello, world!",
  mediaType: "text/plain",
  type: "text",
};
```

## Fields

| Field       | Type                                                                                                                     | Required             | Description |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `data`      | *string*                                                                                                                 | :heavy\_check\_mark: | N/A         |
| `mediaType` | [models.AnthropicPlainTextSourceMediaType](/agent-sdk/typescript/api-reference/models/anthropicplaintextsourcemediatype) | :heavy\_check\_mark: | N/A         |
| `type`      | *"text"*                                                                                                                 | :heavy\_check\_mark: | N/A         |
