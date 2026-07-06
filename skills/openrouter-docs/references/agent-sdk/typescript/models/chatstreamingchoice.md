> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamingChoice - TypeScript SDK

> ChatStreamingChoice method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatStreamingChoice } from "@openrouter/sdk/models";

let value: ChatStreamingChoice = {
  delta: {},
  finishReason: "error",
  index: 3511.86,
};
```

## Fields

| Field          | Type                                                                                         | Required             | Description |
| -------------- | -------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `delta`        | [models.ChatStreamingMessageChunk](/agent-sdk/typescript/models/chatstreamingmessagechunk)   | :heavy\_check\_mark: | N/A         |
| `finishReason` | [models.ChatCompletionFinishReason](/agent-sdk/typescript/models/chatcompletionfinishreason) | :heavy\_check\_mark: | N/A         |
| `index`        | *number*                                                                                     | :heavy\_check\_mark: | N/A         |
| `logprobs`     | [models.ChatMessageTokenLogprobs](/agent-sdk/typescript/models/chatmessagetokenlogprobs)     | :heavy\_minus\_sign: | N/A         |
