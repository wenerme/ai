> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningDetailText - TypeScript SDK

> ReasoningDetailText type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning detail text schema

## Example Usage

```typescript lines theme={null}
import { ReasoningDetailText } from "@openrouter/sdk/models";

let value: ReasoningDetailText = {
  type: "reasoning.text",
};
```

## Fields

| Field       | Type                                                                                 | Required             | Description | Example |
| ----------- | ------------------------------------------------------------------------------------ | -------------------- | ----------- | ------- |
| `format`    | [models.ReasoningFormat](/agent-sdk/typescript/api-reference/models/reasoningformat) | :heavy\_minus\_sign: | N/A         | unknown |
| `id`        | *string*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `index`     | *number*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `signature` | *string*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `text`      | *string*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `type`      | *"reasoning.text"*                                                                   | :heavy\_check\_mark: | N/A         |         |
