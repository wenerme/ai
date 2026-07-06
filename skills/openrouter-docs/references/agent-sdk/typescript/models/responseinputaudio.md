> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseInputAudio - TypeScript SDK

> ResponseInputAudio method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Audio input content item

## Example Usage

```typescript lines theme={null}
import { ResponseInputAudio } from "@openrouter/sdk/models";

let value: ResponseInputAudio = {
  type: "input_audio",
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
};
```

## Fields

| Field        | Type                                                                                             | Required             | Description |
| ------------ | ------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`       | *"input\_audio"*                                                                                 | :heavy\_check\_mark: | N/A         |
| `inputAudio` | [models.ResponseInputAudioInputAudio](/agent-sdk/typescript/models/responseinputaudioinputaudio) | :heavy\_check\_mark: | N/A         |
