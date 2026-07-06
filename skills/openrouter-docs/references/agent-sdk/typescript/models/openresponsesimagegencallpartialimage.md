> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesImageGenCallPartialImage - TypeScript SDK

> OpenResponsesImageGenCallPartialImage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Image generation call with partial image

## Example Usage

```typescript lines theme={null}
import { OpenResponsesImageGenCallPartialImage } from "@openrouter/sdk/models";

let value: OpenResponsesImageGenCallPartialImage = {
  type: "response.image_generation_call.partial_image",
  itemId: "<id>",
  outputIndex: 2243.31,
  sequenceNumber: 0,
  partialImageB64: "<value>",
  partialImageIndex: 1141.42,
};
```

## Fields

| Field               | Type                                                | Required             | Description |
| ------------------- | --------------------------------------------------- | -------------------- | ----------- |
| `type`              | *"response.image\_generation\_call.partial\_image"* | :heavy\_check\_mark: | N/A         |
| `itemId`            | *string*                                            | :heavy\_check\_mark: | N/A         |
| `outputIndex`       | *number*                                            | :heavy\_check\_mark: | N/A         |
| `sequenceNumber`    | *number*                                            | :heavy\_check\_mark: | N/A         |
| `partialImageB64`   | *string*                                            | :heavy\_check\_mark: | N/A         |
| `partialImageIndex` | *number*                                            | :heavy\_check\_mark: | N/A         |
