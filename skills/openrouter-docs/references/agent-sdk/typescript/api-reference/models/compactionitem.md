> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompactionItem - TypeScript SDK

> CompactionItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A context compaction marker with encrypted summary

## Example Usage

```typescript lines theme={null}
import { CompactionItem } from "@openrouter/sdk/models";

let value: CompactionItem = {
  encryptedContent: "enc_abc123...",
  type: "compaction",
};
```

## Fields

| Field              | Type                                                                                       | Required             | Description |
| ------------------ | ------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `encryptedContent` | *string*                                                                                   | :heavy\_check\_mark: | N/A         |
| `id`               | *string*                                                                                   | :heavy\_minus\_sign: | N/A         |
| `type`             | [models.CompactionItemType](/docs/agent-sdk/typescript/api-reference/models/compactionitemtype) | :heavy\_check\_mark: | N/A         |
