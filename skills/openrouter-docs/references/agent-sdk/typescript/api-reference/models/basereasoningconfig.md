> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BaseReasoningConfig - TypeScript SDK

> BaseReasoningConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BaseReasoningConfig } from "@openrouter/sdk/models";

let value: BaseReasoningConfig = {};
```

## Fields

| Field     | Type                                                                                                     | Required             | Description | Example |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | ------- |
| `effort`  | [models.ReasoningEffort](/agent-sdk/typescript/api-reference/models/reasoningeffort)                     | :heavy\_minus\_sign: | N/A         | medium  |
| `summary` | [models.ReasoningSummaryVerbosity](/agent-sdk/typescript/api-reference/models/reasoningsummaryverbosity) | :heavy\_minus\_sign: | N/A         | auto    |
