> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatResponseChoice - TypeScript SDK

> ChatResponseChoice method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatResponseChoice } from "@openrouter/sdk/models";

let value: ChatResponseChoice = {
  finishReason: "stop",
  index: 2823.76,
  message: {
    role: "assistant",
  },
};
```

## Fields

| Field          | Type                                                                                         | Required             | Description |
| -------------- | -------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `finishReason` | [models.ChatCompletionFinishReason](/agent-sdk/typescript/models/chatcompletionfinishreason) | :heavy\_check\_mark: | N/A         |
| `index`        | *number*                                                                                     | :heavy\_check\_mark: | N/A         |
| `message`      | [models.AssistantMessage](/agent-sdk/typescript/models/assistantmessage)                     | :heavy\_check\_mark: | N/A         |
| `logprobs`     | [models.ChatMessageTokenLogprobs](/agent-sdk/typescript/models/chatmessagetokenlogprobs)     | :heavy\_minus\_sign: | N/A         |
