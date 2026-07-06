> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentPartInputVideo - TypeScript SDK

> ContentPartInputVideo type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentPartInputVideo } from "@openrouter/sdk/models";

let value: ContentPartInputVideo = {
  inputVideo: {
    data: "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",
  },
  type: "input_video",
};
```

## Fields

| Field        | Type                                                                                 | Required             | Description | Example                                                                            |
| ------------ | ------------------------------------------------------------------------------------ | -------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `inputVideo` | [models.MultimodalMedia](/agent-sdk/typescript/api-reference/models/multimodalmedia) | :heavy\_check\_mark: | N/A         | `{"data": "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...","format": "wav"}` |
| `type`       | *"input\_video"*                                                                     | :heavy\_check\_mark: | N/A         |                                                                                    |
