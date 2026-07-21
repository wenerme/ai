> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamingResponseChunk - TypeScript SDK

> ChatStreamingResponseChunk method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatStreamingResponseChunk } from "@openrouter/sdk/models";

let value: ChatStreamingResponseChunk = {
  data: {
    id: "<id>",
    choices: [
      {
        delta: {},
        finishReason: "error",
        index: 3793.72,
      },
    ],
    created: 932.78,
    model: "Ranchero",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field  | Type                                                                                                 | Required             | Description |
| ------ | ---------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `data` | [models.ChatStreamingResponseChunkData](/docs/agent-sdk/typescript/models/chatstreamingresponsechunkdata) | :heavy\_check\_mark: | N/A         |
