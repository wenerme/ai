> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SpeechRequest - TypeScript SDK

> SpeechRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text-to-speech request input

## Example Usage

```typescript lines theme={null}
import { SpeechRequest } from "@openrouter/sdk/models";

let value: SpeechRequest = {
  input: "Hello world",
  model: "elevenlabs/eleven-turbo-v2",
  voice: "alloy",
};
```

## Fields

| Field            | Type                                                                                             | Required             | Description                                                                                                   | Example                    |
| ---------------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `input`          | *string*                                                                                         | :heavy\_check\_mark: | Text to synthesize                                                                                            | Hello world                |
| `model`          | *string*                                                                                         | :heavy\_check\_mark: | TTS model identifier                                                                                          | elevenlabs/eleven-turbo-v2 |
| `provider`       | [models.SpeechRequestProvider](/agent-sdk/typescript/api-reference/models/speechrequestprovider) | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                   |                            |
| `responseFormat` | [models.ResponseFormatEnum](/agent-sdk/typescript/api-reference/models/responseformatenum)       | :heavy\_minus\_sign: | Audio output format                                                                                           | pcm                        |
| `speed`          | *number*                                                                                         | :heavy\_minus\_sign: | Playback speed multiplier. Only used by models that support it (e.g. OpenAI TTS). Ignored by other providers. | 1                          |
| `voice`          | *string*                                                                                         | :heavy\_check\_mark: | Voice identifier (provider-specific).                                                                         | alloy                      |
