> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputReasoningItem - TypeScript SDK

> OutputReasoningItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output item containing reasoning

## Example Usage

```typescript lines theme={null}
import { OutputReasoningItem } from "@openrouter/sdk/models";

let value: OutputReasoningItem = {
  id: "msg-abc123",
  summary: [
    {
      text: "Analyzed the problem using first principles",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

## Fields

| Field              | Type                                                                                              | Required             | Description                                                  | Example                                         |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `content`          | [models.ReasoningTextContent](/agent-sdk/typescript/api-reference/models/reasoningtextcontent)\[] | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `encryptedContent` | *string*                                                                                          | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `id`               | *string*                                                                                          | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `status`           | *models.OutputReasoningItemStatusUnion*                                                           | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `summary`          | [models.ReasoningSummaryText](/agent-sdk/typescript/api-reference/models/reasoningsummarytext)\[] | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `type`             | *"reasoning"*                                                                                     | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `format`           | [models.ReasoningFormat](/agent-sdk/typescript/api-reference/models/reasoningformat)              | :heavy\_minus\_sign: | N/A                                                          | unknown                                         |
| `signature`        | *string*                                                                                          | :heavy\_minus\_sign: | A signature for the reasoning content, used for verification | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj... |
