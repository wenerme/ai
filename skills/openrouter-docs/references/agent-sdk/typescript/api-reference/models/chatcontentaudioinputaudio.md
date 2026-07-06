> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentAudioInputAudio - TypeScript SDK

> ChatContentAudioInputAudio type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatContentAudioInputAudio } from "@openrouter/sdk/models";

let value: ChatContentAudioInputAudio = {
  data: "<value>",
  format: "<value>",
};
```

## Fields

| Field    | Type     | Required             | Description                                                                                                 |
| -------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `data`   | *string* | :heavy\_check\_mark: | Base64 encoded audio data                                                                                   |
| `format` | *string* | :heavy\_check\_mark: | Audio format (e.g., wav, mp3, flac, m4a, ogg, aiff, aac, pcm16, pcm24). Supported formats vary by provider. |
