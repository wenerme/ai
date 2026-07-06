> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsRequestBody - TypeScript SDK

> CreateEmbeddingsRequestBody type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Embeddings request input

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsRequestBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsRequestBody = {
  input: "The quick brown fox jumps over the lazy dog",
  model: "openai/text-embedding-3-small",
};
```

## Fields

| Field            | Type                                                                                         | Required             | Description                                              | Example                                     |
| ---------------- | -------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------- | ------------------------------------------- |
| `dimensions`     | *number*                                                                                     | :heavy\_minus\_sign: | The number of dimensions for the output embeddings       | 1536                                        |
| `encodingFormat` | [operations.EncodingFormat](/agent-sdk/typescript/api-reference/operations/encodingformat)   | :heavy\_minus\_sign: | The format of the output embeddings                      | float                                       |
| `input`          | *operations.InputUnion*                                                                      | :heavy\_check\_mark: | Text, token, or multimodal input(s) to embed             | The quick brown fox jumps over the lazy dog |
| `inputType`      | *string*                                                                                     | :heavy\_minus\_sign: | The type of input (e.g. search\_query, search\_document) | search\_query                               |
| `model`          | *string*                                                                                     | :heavy\_check\_mark: | The model to use for embeddings                          | openai/text-embedding-3-small               |
| `provider`       | [models.ProviderPreferences](/agent-sdk/typescript/api-reference/models/providerpreferences) | :heavy\_minus\_sign: | N/A                                                      | `{"allow_fallbacks": true}`                 |
| `user`           | *string*                                                                                     | :heavy\_minus\_sign: | A unique identifier for the end-user                     | user-1234                                   |
