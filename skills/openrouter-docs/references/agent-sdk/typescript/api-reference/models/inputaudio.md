> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputAudio - TypeScript SDK

> InputAudio type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Audio input content item

## Example Usage

```typescript lines theme={null}
import { InputAudio } from "@openrouter/sdk/models";

let value: InputAudio = {
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
  type: "input_audio",
};
```

## Fields

| Field        | Type                                                                                           | Required             | Description |
| ------------ | ---------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `inputAudio` | [models.InputAudioInputAudio](/agent-sdk/typescript/api-reference/models/inputaudioinputaudio) | :heavy\_check\_mark: | N/A         |
| `type`       | *"input\_audio"*                                                                               | :heavy\_check\_mark: | N/A         |
