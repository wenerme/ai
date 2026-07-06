> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ImageGenCallGeneratingEvent - TypeScript SDK

> ImageGenCallGeneratingEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call is generating

## Example Usage

```typescript lines theme={null}
import { ImageGenCallGeneratingEvent } from "@openrouter/sdk/models";

let value: ImageGenCallGeneratingEvent = {
  itemId: "<id>",
  outputIndex: 672800,
  sequenceNumber: 0,
  type: "response.image_generation_call.generating",
};
```

## Fields

| Field            | Type                                            | Required             | Description |
| ---------------- | ----------------------------------------------- | -------------------- | ----------- |
| `itemId`         | *string*                                        | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                        | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                        | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.image\_generation\_call.generating"* | :heavy\_check\_mark: | N/A         |
