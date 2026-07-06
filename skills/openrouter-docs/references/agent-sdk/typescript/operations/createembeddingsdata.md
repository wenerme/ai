> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsData - TypeScript SDK

> CreateEmbeddingsData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsData } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsData = {
  object: "embedding",
  embedding: "<value>",
};
```

## Fields

| Field       | Type                                                                           | Required             | Description |
| ----------- | ------------------------------------------------------------------------------ | -------------------- | ----------- |
| `object`    | [operations.ObjectEmbedding](/agent-sdk/typescript/operations/objectembedding) | :heavy\_check\_mark: | N/A         |
| `embedding` | *operations.Embedding*                                                         | :heavy\_check\_mark: | N/A         |
| `index`     | *number*                                                                       | :heavy\_minus\_sign: | N/A         |
