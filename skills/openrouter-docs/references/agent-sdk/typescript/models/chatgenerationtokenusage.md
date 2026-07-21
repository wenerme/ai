> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatGenerationTokenUsage - TypeScript SDK

> ChatGenerationTokenUsage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatGenerationTokenUsage } from "@openrouter/sdk/models";

let value: ChatGenerationTokenUsage = {
  completionTokens: 9399.77,
  promptTokens: 9559.6,
  totalTokens: 7060.03,
};
```

## Fields

| Field                     | Type                                                                                   | Required             | Description |
| ------------------------- | -------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `completionTokens`        | *number*                                                                               | :heavy\_check\_mark: | N/A         |
| `promptTokens`            | *number*                                                                               | :heavy\_check\_mark: | N/A         |
| `totalTokens`             | *number*                                                                               | :heavy\_check\_mark: | N/A         |
| `completionTokensDetails` | [models.CompletionTokensDetails](/docs/agent-sdk/typescript/models/completiontokensdetails) | :heavy\_minus\_sign: | N/A         |
| `promptTokensDetails`     | [models.PromptTokensDetails](/docs/agent-sdk/typescript/models/prompttokensdetails)         | :heavy\_minus\_sign: | N/A         |
