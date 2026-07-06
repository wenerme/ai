> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsRequest - TypeScript SDK

> CreateEmbeddingsRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsRequest } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsRequest = {
  input: [
    [],
    [
      3849.69,
    ],
    [],
  ],
  model: "Model Y",
};
```

## Fields

| Field            | Type                                                                           | Required             | Description                                   |
| ---------------- | ------------------------------------------------------------------------------ | -------------------- | --------------------------------------------- |
| `input`          | *operations.InputUnion*                                                        | :heavy\_check\_mark: | N/A                                           |
| `model`          | *string*                                                                       | :heavy\_check\_mark: | N/A                                           |
| `encodingFormat` | [operations.EncodingFormat](/agent-sdk/typescript/operations/encodingformat)   | :heavy\_minus\_sign: | N/A                                           |
| `dimensions`     | *number*                                                                       | :heavy\_minus\_sign: | N/A                                           |
| `user`           | *string*                                                                       | :heavy\_minus\_sign: | N/A                                           |
| `provider`       | [models.ProviderPreferences](/agent-sdk/typescript/models/providerpreferences) | :heavy\_minus\_sign: | Provider routing preferences for the request. |
| `inputType`      | *string*                                                                       | :heavy\_minus\_sign: | N/A                                           |
