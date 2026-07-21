> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsData - TypeScript SDK

> CreateEmbeddingsData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A single embedding object

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsData } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsData = {
  embedding: [
    0.0023064255,
    -0.009327292,
    0.015797347,
  ],
  object: "embedding",
};
```

## Fields

| Field       | Type                                                                                         | Required             | Description                                               | Example                                                          |
| ----------- | -------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- |
| `embedding` | *operations.Embedding*                                                                       | :heavy\_check\_mark: | Embedding vector as an array of floats or a base64 string | \[<br />0.0023064255,<br />-0.009327292,<br />0.015797347<br />] |
| `index`     | *number*                                                                                     | :heavy\_minus\_sign: | Index of the embedding in the input list                  | 0                                                                |
| `object`    | [operations.ObjectEmbedding](/docs/agent-sdk/typescript/api-reference/operations/objectembedding) | :heavy\_check\_mark: | N/A                                                       |                                                                  |
