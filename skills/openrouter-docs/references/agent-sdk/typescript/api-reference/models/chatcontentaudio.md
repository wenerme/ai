> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentAudio - TypeScript SDK

> ChatContentAudio type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Audio input content part. Supported audio formats vary by provider.

## Example Usage

```typescript lines theme={null}
import { ChatContentAudio } from "@openrouter/sdk/models";

let value: ChatContentAudio = {
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
  type: "input_audio",
};
```

## Fields

| Field        | Type                                                                                                       | Required             | Description |
| ------------ | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `inputAudio` | [models.ChatContentAudioInputAudio](/docs/agent-sdk/typescript/api-reference/models/chatcontentaudioinputaudio) | :heavy\_check\_mark: | N/A         |
| `type`       | *"input\_audio"*                                                                                           | :heavy\_check\_mark: | N/A         |
