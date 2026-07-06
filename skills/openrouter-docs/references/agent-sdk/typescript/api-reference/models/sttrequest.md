> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# STTRequest - TypeScript SDK

> STTRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Speech-to-text request input. Accepts a JSON body with input\_audio containing base64-encoded audio.

## Example Usage

```typescript lines theme={null}
import { STTRequest } from "@openrouter/sdk/models";

let value: STTRequest = {
  inputAudio: {
    data: "UklGRiQA...",
    format: "wav",
  },
  model: "openai/whisper-large-v3",
};
```

## Fields

| Field         | Type                                                                                       | Required             | Description                                                           | Example                                   |
| ------------- | ------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| `inputAudio`  | [models.STTInputAudio](/agent-sdk/typescript/api-reference/models/sttinputaudio)           | :heavy\_check\_mark: | Base64-encoded audio to transcribe                                    | `{"data": "UklGRiQA...","format": "wav"}` |
| `language`    | *string*                                                                                   | :heavy\_minus\_sign: | ISO-639-1 language code (e.g., "en", "ja"). Auto-detected if omitted. | en                                        |
| `model`       | *string*                                                                                   | :heavy\_check\_mark: | STT model identifier                                                  | openai/whisper-large-v3                   |
| `provider`    | [models.STTRequestProvider](/agent-sdk/typescript/api-reference/models/sttrequestprovider) | :heavy\_minus\_sign: | Provider-specific passthrough configuration                           |                                           |
| `temperature` | *number*                                                                                   | :heavy\_minus\_sign: | Sampling temperature for transcription                                | 0                                         |
