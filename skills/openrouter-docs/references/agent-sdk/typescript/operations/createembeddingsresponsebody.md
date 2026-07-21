> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsResponseBody - TypeScript SDK

> CreateEmbeddingsResponseBody method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Embedding response

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsResponseBody = {
  object: "list",
  data: [],
  model: "Focus",
};
```

## Fields

| Field    | Type                                                                                        | Required             | Description |
| -------- | ------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`     | *string*                                                                                    | :heavy\_minus\_sign: | N/A         |
| `object` | [operations.ObjectT](/docs/agent-sdk/typescript/operations/objectt)                              | :heavy\_check\_mark: | N/A         |
| `data`   | [operations.CreateEmbeddingsData](/docs/agent-sdk/typescript/operations/createembeddingsdata)\[] | :heavy\_check\_mark: | N/A         |
| `model`  | *string*                                                                                    | :heavy\_check\_mark: | N/A         |
| `usage`  | [operations.Usage](/docs/agent-sdk/typescript/operations/usage)                                  | :heavy\_minus\_sign: | N/A         |
