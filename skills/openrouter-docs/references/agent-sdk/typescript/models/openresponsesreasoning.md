> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesReasoning - TypeScript SDK

> OpenResponsesReasoning method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning output item with signature and format extensions

## Example Usage

```typescript lines theme={null}
import { OpenResponsesReasoning } from "@openrouter/sdk/models";

let value: OpenResponsesReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

## Fields

| Field              | Type                                                                                             | Required             | Description |
| ------------------ | ------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`             | [models.OpenResponsesReasoningType](/agent-sdk/typescript/models/openresponsesreasoningtype)     | :heavy\_check\_mark: | N/A         |
| `id`               | *string*                                                                                         | :heavy\_check\_mark: | N/A         |
| `content`          | [models.ReasoningTextContent](/agent-sdk/typescript/models/reasoningtextcontent)\[]              | :heavy\_minus\_sign: | N/A         |
| `summary`          | [models.ReasoningSummaryText](/agent-sdk/typescript/models/reasoningsummarytext)\[]              | :heavy\_check\_mark: | N/A         |
| `encryptedContent` | *string*                                                                                         | :heavy\_minus\_sign: | N/A         |
| `status`           | *models.OpenResponsesReasoningStatusUnion*                                                       | :heavy\_minus\_sign: | N/A         |
| `signature`        | *string*                                                                                         | :heavy\_minus\_sign: | N/A         |
| `format`           | [models.OpenResponsesReasoningFormat](/agent-sdk/typescript/models/openresponsesreasoningformat) | :heavy\_minus\_sign: | N/A         |
