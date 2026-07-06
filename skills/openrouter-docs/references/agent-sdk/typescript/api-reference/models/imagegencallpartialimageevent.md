> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ImageGenCallPartialImageEvent - TypeScript SDK

> ImageGenCallPartialImageEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call with partial image

## Example Usage

```typescript lines theme={null}
import { ImageGenCallPartialImageEvent } from "@openrouter/sdk/models";

let value: ImageGenCallPartialImageEvent = {
  itemId: "<id>",
  outputIndex: 474497,
  partialImageB64: "<value>",
  partialImageIndex: 124636,
  sequenceNumber: 0,
  type: "response.image_generation_call.partial_image",
};
```

## Fields

| Field               | Type                                                | Required             | Description |
| ------------------- | --------------------------------------------------- | -------------------- | ----------- |
| `itemId`            | *string*                                            | :heavy\_check\_mark: | N/A         |
| `outputIndex`       | *number*                                            | :heavy\_check\_mark: | N/A         |
| `partialImageB64`   | *string*                                            | :heavy\_check\_mark: | N/A         |
| `partialImageIndex` | *number*                                            | :heavy\_check\_mark: | N/A         |
| `sequenceNumber`    | *number*                                            | :heavy\_check\_mark: | N/A         |
| `type`              | *"response.image\_generation\_call.partial\_image"* | :heavy\_check\_mark: | N/A         |
