> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# STTResponse - TypeScript SDK

> STTResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

STT response containing transcribed text and optional usage statistics

## Example Usage

```typescript lines theme={null}
import { STTResponse } from "@openrouter/sdk/models";

let value: STTResponse = {
  text: "Hello, this is a test of OpenAI speech-to-text transcription.",
};
```

## Fields

| Field   | Type                                                                   | Required             | Description                                 | Example                                                                                                                            |
| ------- | ---------------------------------------------------------------------- | -------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `text`  | *string*                                                               | :heavy\_check\_mark: | The transcribed text                        | Hello, this is a test of OpenAI speech-to-text transcription. The weather is sunny today and the temperature is around 72 degrees. |
| `usage` | [models.STTUsage](/agent-sdk/typescript/api-reference/models/sttusage) | :heavy\_minus\_sign: | Aggregated usage statistics for the request | `{"cost": 0.000508,"input_tokens": 83,"output_tokens": 30,"seconds": 9.2,"total_tokens": 113}`                                     |
