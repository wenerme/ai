> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItemCacheControl - TypeScript SDK

> ChatMessageContentItemCacheControl method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageContentItemCacheControl } from "@openrouter/sdk/models";

let value: ChatMessageContentItemCacheControl = {
  type: "ephemeral",
};
```

## Fields

| Field  | Type                                           | Required             | Description |
| ------ | ---------------------------------------------- | -------------------- | ----------- |
| `type` | *"ephemeral"*                                  | :heavy\_check\_mark: | N/A         |
| `ttl`  | [models.Ttl](/agent-sdk/typescript/models/ttl) | :heavy\_minus\_sign: | N/A         |
