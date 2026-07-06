> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ItemReferenceItem - TypeScript SDK

> ItemReferenceItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A reference to a previous response item by ID

## Example Usage

```typescript lines theme={null}
import { ItemReferenceItem } from "@openrouter/sdk/models";

let value: ItemReferenceItem = {
  id: "msg-abc123",
  type: "item_reference",
};
```

## Fields

| Field  | Type                                                                                             | Required             | Description |
| ------ | ------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `id`   | *string*                                                                                         | :heavy\_check\_mark: | N/A         |
| `type` | [models.ItemReferenceItemType](/agent-sdk/typescript/api-reference/models/itemreferenceitemtype) | :heavy\_check\_mark: | N/A         |
