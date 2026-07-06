> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesOutputItemReasoning - TypeScript SDK

> ResponsesOutputItemReasoning method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output item containing reasoning

## Example Usage

```typescript lines theme={null}
import { ResponsesOutputItemReasoning } from "@openrouter/sdk/models";

let value: ResponsesOutputItemReasoning = {
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

| Field              | Type                                                                                                         | Required             | Description                                                  | Example                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `type`             | [models.ResponsesOutputItemReasoningType](/agent-sdk/typescript/models/responsesoutputitemreasoningtype)     | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `id`               | *string*                                                                                                     | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `content`          | [models.ReasoningTextContent](/agent-sdk/typescript/models/reasoningtextcontent)\[]                          | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `summary`          | [models.ReasoningSummaryText](/agent-sdk/typescript/models/reasoningsummarytext)\[]                          | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `encryptedContent` | *string*                                                                                                     | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `status`           | *models.ResponsesOutputItemReasoningStatusUnion*                                                             | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `signature`        | *string*                                                                                                     | :heavy\_minus\_sign: | A signature for the reasoning content, used for verification | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj... |
| `format`           | [models.ResponsesOutputItemReasoningFormat](/agent-sdk/typescript/models/responsesoutputitemreasoningformat) | :heavy\_minus\_sign: | The format of the reasoning content                          | anthropic-claude-v1                             |
