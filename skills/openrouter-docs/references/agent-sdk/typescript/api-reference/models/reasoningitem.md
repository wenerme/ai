> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningItem - TypeScript SDK

> ReasoningItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning output item with signature and format extensions

## Example Usage

```typescript lines theme={null}
import { ReasoningItem } from "@openrouter/sdk/models";

let value: ReasoningItem = {
  id: "reasoning-abc123",
  summary: [
    {
      text: "Step by step analysis",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

## Fields

| Field              | Type                                                                                              | Required             | Description | Example |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------- | ----------- | ------- |
| `content`          | [models.ReasoningTextContent](/agent-sdk/typescript/api-reference/models/reasoningtextcontent)\[] | :heavy\_minus\_sign: | N/A         |         |
| `encryptedContent` | *string*                                                                                          | :heavy\_minus\_sign: | N/A         |         |
| `id`               | *string*                                                                                          | :heavy\_check\_mark: | N/A         |         |
| `status`           | *models.ReasoningItemStatusUnion*                                                                 | :heavy\_minus\_sign: | N/A         |         |
| `summary`          | [models.ReasoningSummaryText](/agent-sdk/typescript/api-reference/models/reasoningsummarytext)\[] | :heavy\_check\_mark: | N/A         |         |
| `type`             | [models.ReasoningItemType](/agent-sdk/typescript/api-reference/models/reasoningitemtype)          | :heavy\_check\_mark: | N/A         |         |
| `format`           | [models.ReasoningFormat](/agent-sdk/typescript/api-reference/models/reasoningformat)              | :heavy\_minus\_sign: | N/A         | unknown |
| `signature`        | *string*                                                                                          | :heavy\_minus\_sign: | N/A         |         |
