> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# STTInputAudio - TypeScript SDK

> STTInputAudio type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Base64-encoded audio to transcribe

## Example Usage

```typescript lines theme={null}
import { STTInputAudio } from "@openrouter/sdk/models";

let value: STTInputAudio = {
  data: "UklGRiQA...",
  format: "wav",
};
```

## Fields

| Field    | Type     | Required             | Description                                                                                   |
| -------- | -------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `data`   | *string* | :heavy\_check\_mark: | Base64-encoded audio data (raw bytes, not a data URI)                                         |
| `format` | *string* | :heavy\_check\_mark: | Audio format (e.g., wav, mp3, flac, m4a, ogg, webm, aac). Supported formats vary by provider. |
