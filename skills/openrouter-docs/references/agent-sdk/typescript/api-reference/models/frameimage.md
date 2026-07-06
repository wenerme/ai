> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FrameImage - TypeScript SDK

> FrameImage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FrameImage } from "@openrouter/sdk/models";

let value: FrameImage = {
  imageUrl: {
    url: "https://example.com/image.png",
  },
  type: "image_url",
  frameType: "first_frame",
};
```

## Fields

| Field       | Type                                                                                       | Required             | Description                                                        | Example      |
| ----------- | ------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------ | ------------ |
| `imageUrl`  | [models.FrameImageImageUrl](/agent-sdk/typescript/api-reference/models/frameimageimageurl) | :heavy\_check\_mark: | N/A                                                                |              |
| `type`      | [models.FrameImageType](/agent-sdk/typescript/api-reference/models/frameimagetype)         | :heavy\_check\_mark: | N/A                                                                |              |
| `frameType` | [models.FrameType](/agent-sdk/typescript/api-reference/models/frametype)                   | :heavy\_check\_mark: | Whether this image represents the first or last frame of the video | first\_frame |
