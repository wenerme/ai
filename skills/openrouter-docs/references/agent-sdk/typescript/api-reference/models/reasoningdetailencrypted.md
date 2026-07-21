> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningDetailEncrypted - TypeScript SDK

> ReasoningDetailEncrypted type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning detail encrypted schema

## Example Usage

```typescript lines theme={null}
import { ReasoningDetailEncrypted } from "@openrouter/sdk/models";

let value: ReasoningDetailEncrypted = {
  data: "<value>",
  type: "reasoning.encrypted",
};
```

## Fields

| Field    | Type                                                                                 | Required             | Description | Example |
| -------- | ------------------------------------------------------------------------------------ | -------------------- | ----------- | ------- |
| `data`   | *string*                                                                             | :heavy\_check\_mark: | N/A         |         |
| `format` | [models.ReasoningFormat](/docs/agent-sdk/typescript/api-reference/models/reasoningformat) | :heavy\_minus\_sign: | N/A         | unknown |
| `id`     | *string*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `index`  | *number*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `type`   | *"reasoning.encrypted"*                                                              | :heavy\_check\_mark: | N/A         |         |
