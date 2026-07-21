> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputsReasoning - TypeScript SDK

> InputsReasoning type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output item containing reasoning

## Example Usage

```typescript lines theme={null}
import { InputsReasoning } from "@openrouter/sdk/models";

let value: InputsReasoning = {
  id: "reasoning-123",
  summary: [
    {
      text: "Analyzed the problem and found the optimal solution.",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

## Fields

| Field              | Type                                                                                              | Required             | Description                                                  | Example                                         |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `content`          | [models.ReasoningTextContent](/docs/agent-sdk/typescript/api-reference/models/reasoningtextcontent)\[] | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `encryptedContent` | *string*                                                                                          | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `id`               | *string*                                                                                          | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `status`           | *models.InputsStatusUnion2*                                                                       | :heavy\_minus\_sign: | N/A                                                          |                                                 |
| `summary`          | [models.ReasoningSummaryText](/docs/agent-sdk/typescript/api-reference/models/reasoningsummarytext)\[] | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `type`             | [models.InputsTypeReasoning](/docs/agent-sdk/typescript/api-reference/models/inputstypereasoning)      | :heavy\_check\_mark: | N/A                                                          |                                                 |
| `format`           | [models.ReasoningFormat](/docs/agent-sdk/typescript/api-reference/models/reasoningformat)              | :heavy\_minus\_sign: | N/A                                                          | unknown                                         |
| `signature`        | *string*                                                                                          | :heavy\_minus\_sign: | A signature for the reasoning content, used for verification | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj... |
