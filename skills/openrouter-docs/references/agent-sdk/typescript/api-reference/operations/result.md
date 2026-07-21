> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Result - TypeScript SDK

> Result type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A single rerank result

## Example Usage

```typescript lines theme={null}
import { Result } from "@openrouter/sdk/models/operations";

let value: Result = {
  document: {
    text: "Paris is the capital of France.",
  },
  index: 0,
  relevanceScore: 0.98,
};
```

## Fields

| Field            | Type                                                                           | Required             | Description                                      | Example |
| ---------------- | ------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------ | ------- |
| `document`       | [operations.Document](/docs/agent-sdk/typescript/api-reference/operations/document) | :heavy\_check\_mark: | The document object containing the original text |         |
| `index`          | *number*                                                                       | :heavy\_check\_mark: | Index of the document in the original input list | 0       |
| `relevanceScore` | *number*                                                                       | :heavy\_check\_mark: | Relevance score of the document to the query     | 0.98    |
