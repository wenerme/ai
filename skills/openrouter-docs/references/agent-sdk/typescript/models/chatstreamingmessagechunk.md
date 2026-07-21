> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamingMessageChunk - TypeScript SDK

> ChatStreamingMessageChunk method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatStreamingMessageChunk } from "@openrouter/sdk/models";

let value: ChatStreamingMessageChunk = {};
```

## Fields

| Field              | Type                                                                                                | Required             | Description |
| ------------------ | --------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `role`             | [models.ChatStreamingMessageChunkRole](/docs/agent-sdk/typescript/models/chatstreamingmessagechunkrole)  | :heavy\_minus\_sign: | N/A         |
| `content`          | *string*                                                                                            | :heavy\_minus\_sign: | N/A         |
| `reasoning`        | *string*                                                                                            | :heavy\_minus\_sign: | N/A         |
| `refusal`          | *string*                                                                                            | :heavy\_minus\_sign: | N/A         |
| `toolCalls`        | [models.ChatStreamingMessageToolCall](/docs/agent-sdk/typescript/models/chatstreamingmessagetoolcall)\[] | :heavy\_minus\_sign: | N/A         |
| `reasoningDetails` | *models.Schema2*\[]                                                                                 | :heavy\_minus\_sign: | N/A         |
