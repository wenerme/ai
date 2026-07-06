> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ImageGenCallCompletedEvent - TypeScript SDK

> ImageGenCallCompletedEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call completed

## Example Usage

```typescript lines theme={null}
import { ImageGenCallCompletedEvent } from "@openrouter/sdk/models";

let value: ImageGenCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 56929,
  sequenceNumber: 0,
  type: "response.image_generation_call.completed",
};
```

## Fields

| Field            | Type                                           | Required             | Description |
| ---------------- | ---------------------------------------------- | -------------------- | ----------- |
| `itemId`         | *string*                                       | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                       | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                       | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.image\_generation\_call.completed"* | :heavy\_check\_mark: | N/A         |
