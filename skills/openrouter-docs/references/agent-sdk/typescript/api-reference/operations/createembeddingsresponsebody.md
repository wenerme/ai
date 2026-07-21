> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsResponseBody - TypeScript SDK

> CreateEmbeddingsResponseBody type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Embeddings response containing embedding vectors

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsResponseBody = {
  data: [
    {
      embedding: [
        0.0023064255,
        -0.009327292,
        0.015797347,
      ],
      object: "embedding",
    },
  ],
  model: "openai/text-embedding-3-small",
  object: "list",
};
```

## Fields

| Field    | Type                                                                                                      | Required             | Description                                   | Example                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `data`   | [operations.CreateEmbeddingsData](/docs/agent-sdk/typescript/api-reference/operations/createembeddingsdata)\[] | :heavy\_check\_mark: | List of embedding objects                     | \[<br />`{"embedding": [0.0023064255,-0.009327292,0.015797347],"index": 0,"object": "embedding"}`<br />] |
| `id`     | *string*                                                                                                  | :heavy\_minus\_sign: | Unique identifier for the embeddings response | embd-1234567890                                                                                          |
| `model`  | *string*                                                                                                  | :heavy\_check\_mark: | The model used for embeddings                 | openai/text-embedding-3-small                                                                            |
| `object` | [operations.ObjectT](/docs/agent-sdk/typescript/api-reference/operations/objectt)                              | :heavy\_check\_mark: | N/A                                           |                                                                                                          |
| `usage`  | [operations.CreateEmbeddingsUsage](/docs/agent-sdk/typescript/api-reference/operations/createembeddingsusage)  | :heavy\_minus\_sign: | Token usage statistics                        | `{"prompt_tokens": 8,"total_tokens": 8}`                                                                 |
