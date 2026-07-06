> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateRerankResponseBody - TypeScript SDK

> CreateRerankResponseBody type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Rerank response containing ranked results

## Example Usage

```typescript lines theme={null}
import { CreateRerankResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateRerankResponseBody = {
  model: "cohere/rerank-v3.5",
  results: [
    {
      document: {
        text: "Paris is the capital of France.",
      },
      index: 0,
      relevanceScore: 0.98,
    },
  ],
};
```

## Fields

| Field      | Type                                                                                             | Required             | Description                                             | Example                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `id`       | *string*                                                                                         | :heavy\_minus\_sign: | Unique identifier for the rerank response (ORID format) | gen-rerank-1234567890-abc                                                                                                        |
| `model`    | *string*                                                                                         | :heavy\_check\_mark: | The model used for reranking                            | cohere/rerank-v3.5                                                                                                               |
| `provider` | *string*                                                                                         | :heavy\_minus\_sign: | The provider that served the rerank request             | Cohere                                                                                                                           |
| `results`  | [operations.Result](/agent-sdk/typescript/api-reference/operations/result)\[]                    | :heavy\_check\_mark: | List of rerank results sorted by relevance              | \[<br />`{"document": {"text": "Paris is the capital of France."}`,<br />"index": 0,<br />"relevance\_score": 0.98<br />}<br />] |
| `usage`    | [operations.CreateRerankUsage](/agent-sdk/typescript/api-reference/operations/creatererankusage) | :heavy\_minus\_sign: | Usage statistics                                        | `{"search_units": 1,"total_tokens": 150}`                                                                                        |
