> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningConfig - TypeScript SDK

> ReasoningConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for reasoning mode in the response

## Example Usage

```typescript lines theme={null}
import { ReasoningConfig } from "@openrouter/sdk/models";

let value: ReasoningConfig = {};
```

## Fields

| Field       | Type                                                                                                     | Required             | Description | Example |
| ----------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | ------- |
| `effort`    | [models.ReasoningEffort](/agent-sdk/typescript/api-reference/models/reasoningeffort)                     | :heavy\_minus\_sign: | N/A         | medium  |
| `summary`   | [models.ReasoningSummaryVerbosity](/agent-sdk/typescript/api-reference/models/reasoningsummaryverbosity) | :heavy\_minus\_sign: | N/A         | auto    |
| `enabled`   | *boolean*                                                                                                | :heavy\_minus\_sign: | N/A         |         |
| `maxTokens` | *number*                                                                                                 | :heavy\_minus\_sign: | N/A         |         |
