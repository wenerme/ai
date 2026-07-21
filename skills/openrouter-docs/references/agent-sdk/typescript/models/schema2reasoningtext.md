> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema2ReasoningText - TypeScript SDK

> Schema2ReasoningText method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Schema2ReasoningText } from "@openrouter/sdk/models";

let value: Schema2ReasoningText = {
  type: "reasoning.text",
};
```

## Fields

| Field       | Type                                                   | Required             | Description |
| ----------- | ------------------------------------------------------ | -------------------- | ----------- |
| `type`      | *"reasoning.text"*                                     | :heavy\_check\_mark: | N/A         |
| `text`      | *string*                                               | :heavy\_minus\_sign: | N/A         |
| `signature` | *string*                                               | :heavy\_minus\_sign: | N/A         |
| `id`        | *string*                                               | :heavy\_minus\_sign: | N/A         |
| `format`    | [models.Schema4](/docs/agent-sdk/typescript/models/schema4) | :heavy\_minus\_sign: | N/A         |
| `index`     | *number*                                               | :heavy\_minus\_sign: | N/A         |
