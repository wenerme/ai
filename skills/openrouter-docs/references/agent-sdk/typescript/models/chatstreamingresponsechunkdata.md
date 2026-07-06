> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamingResponseChunkData - TypeScript SDK

> ChatStreamingResponseChunkData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatStreamingResponseChunkData } from "@openrouter/sdk/models";

let value: ChatStreamingResponseChunkData = {
  id: "<id>",
  choices: [],
  created: 3957.6,
  model: "F-150",
  object: "chat.completion.chunk",
};
```

## Fields

| Field               | Type                                                                                                   | Required             | Description |
| ------------------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `id`                | *string*                                                                                               | :heavy\_check\_mark: | N/A         |
| `choices`           | [models.ChatStreamingChoice](/agent-sdk/typescript/models/chatstreamingchoice)\[]                      | :heavy\_check\_mark: | N/A         |
| `created`           | *number*                                                                                               | :heavy\_check\_mark: | N/A         |
| `model`             | *string*                                                                                               | :heavy\_check\_mark: | N/A         |
| `object`            | *"chat.completion.chunk"*                                                                              | :heavy\_check\_mark: | N/A         |
| `systemFingerprint` | *string*                                                                                               | :heavy\_minus\_sign: | N/A         |
| `error`             | [models.ChatStreamingResponseChunkError](/agent-sdk/typescript/models/chatstreamingresponsechunkerror) | :heavy\_minus\_sign: | N/A         |
| `usage`             | [models.ChatGenerationTokenUsage](/agent-sdk/typescript/models/chatgenerationtokenusage)               | :heavy\_minus\_sign: | N/A         |
