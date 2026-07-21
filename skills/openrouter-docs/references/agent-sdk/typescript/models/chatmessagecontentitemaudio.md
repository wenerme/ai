> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItemAudio - TypeScript SDK

> ChatMessageContentItemAudio method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageContentItemAudio } from "@openrouter/sdk/models";

let value: ChatMessageContentItemAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
};
```

## Fields

| Field        | Type                                                                                                               | Required             | Description |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`       | *"input\_audio"*                                                                                                   | :heavy\_check\_mark: | N/A         |
| `inputAudio` | [models.ChatMessageContentItemAudioInputAudio](/docs/agent-sdk/typescript/models/chatmessagecontentitemaudioinputaudio) | :heavy\_check\_mark: | N/A         |
