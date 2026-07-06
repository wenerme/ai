> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContextCompressionPlugin - TypeScript SDK

> ContextCompressionPlugin type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContextCompressionPlugin } from "@openrouter/sdk/models";

let value: ContextCompressionPlugin = {
  id: "context-compression",
};
```

## Fields

| Field     | Type                                                                                                   | Required             | Description                                                                                | Example    |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| `enabled` | *boolean*                                                                                              | :heavy\_minus\_sign: | Set to false to disable the context-compression plugin for this request. Defaults to true. |            |
| `engine`  | [models.ContextCompressionEngine](/agent-sdk/typescript/api-reference/models/contextcompressionengine) | :heavy\_minus\_sign: | The compression engine to use. Defaults to "middle-out".                                   | middle-out |
| `id`      | *"context-compression"*                                                                                | :heavy\_check\_mark: | N/A                                                                                        |            |
