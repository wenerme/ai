> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EditCompact20260112 - TypeScript SDK

> EditCompact20260112 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { EditCompact20260112 } from "@openrouter/sdk/models";

let value: EditCompact20260112 = {
  type: "compact_20260112",
};
```

## Fields

| Field                  | Type                                                                                       | Required             | Description | Example                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ | -------------------- | ----------- | ------------------------------------------ |
| `instructions`         | *string*                                                                                   | :heavy\_minus\_sign: | N/A         |                                            |
| `pauseAfterCompaction` | *boolean*                                                                                  | :heavy\_minus\_sign: | N/A         |                                            |
| `trigger`              | [models.TriggerInputTokens](/docs/agent-sdk/typescript/api-reference/models/triggerinputtokens) | :heavy\_minus\_sign: | N/A         | `{"type": "input_tokens","value": 100000}` |
| `type`                 | *"compact\_20260112"*                                                                      | :heavy\_check\_mark: | N/A         |                                            |
