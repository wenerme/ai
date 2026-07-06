> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StoredPromptTemplate - TypeScript SDK

> StoredPromptTemplate type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { StoredPromptTemplate } from "@openrouter/sdk/models";

let value: StoredPromptTemplate = {
  id: "prompt-abc123",
};
```

## Fields

| Field       | Type                                 | Required             | Description |
| ----------- | ------------------------------------ | -------------------- | ----------- |
| `id`        | *string*                             | :heavy\_check\_mark: | N/A         |
| `variables` | `Record<string, *models.Variables*>` | :heavy\_minus\_sign: | N/A         |
