> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateRerankRequestBody - TypeScript SDK

> CreateRerankRequestBody type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Rerank request input

## Example Usage

```typescript lines theme={null}
import { CreateRerankRequestBody } from "@openrouter/sdk/models/operations";

let value: CreateRerankRequestBody = {
  documents: [
    "Paris is the capital of France.",
    "Berlin is the capital of Germany.",
  ],
  model: "cohere/rerank-v3.5",
  query: "What is the capital of France?",
};
```

## Fields

| Field       | Type                                                                                         | Required             | Description                                  | Example                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `documents` | *string*\[]                                                                                  | :heavy\_check\_mark: | The list of documents to rerank              | \[<br />"Paris is the capital of France.",<br />"Berlin is the capital of Germany."<br />] |
| `model`     | *string*                                                                                     | :heavy\_check\_mark: | The rerank model to use                      | cohere/rerank-v3.5                                                                         |
| `provider`  | [models.ProviderPreferences](/docs/agent-sdk/typescript/api-reference/models/providerpreferences) | :heavy\_minus\_sign: | N/A                                          | `{"allow_fallbacks": true}`                                                                |
| `query`     | *string*                                                                                     | :heavy\_check\_mark: | The search query to rerank documents against | What is the capital of France?                                                             |
| `topN`      | *number*                                                                                     | :heavy\_minus\_sign: | Number of most relevant documents to return  | 3                                                                                          |
