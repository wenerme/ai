> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema2ReasoningSummary - TypeScript SDK

> Schema2ReasoningSummary method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Schema2ReasoningSummary } from "@openrouter/sdk/models";

let value: Schema2ReasoningSummary = {
  type: "reasoning.summary",
  summary: "<value>",
};
```

## Fields

| Field     | Type                                                   | Required             | Description |
| --------- | ------------------------------------------------------ | -------------------- | ----------- |
| `type`    | *"reasoning.summary"*                                  | :heavy\_check\_mark: | N/A         |
| `summary` | *string*                                               | :heavy\_check\_mark: | N/A         |
| `id`      | *string*                                               | :heavy\_minus\_sign: | N/A         |
| `format`  | [models.Schema4](/docs/agent-sdk/typescript/models/schema4) | :heavy\_minus\_sign: | N/A         |
| `index`   | *number*                                               | :heavy\_minus\_sign: | N/A         |
