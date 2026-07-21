> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatChoice - TypeScript SDK

> ChatChoice type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Chat completion choice

## Example Usage

```typescript lines theme={null}
import { ChatChoice } from "@openrouter/sdk/models";

let value: ChatChoice = {
  finishReason: "stop",
  index: 0,
  message: {
    role: "assistant",
  },
};
```

## Fields

| Field          | Type                                                                                           | Required             | Description                                  | Example                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `finishReason` | [models.ChatFinishReasonEnum](/docs/agent-sdk/typescript/api-reference/models/chatfinishreasonenum) | :heavy\_check\_mark: | N/A                                          | stop                                                                                                                          |
| `index`        | *number*                                                                                       | :heavy\_check\_mark: | Choice index                                 | 0                                                                                                                             |
| `logprobs`     | [models.ChatTokenLogprobs](/docs/agent-sdk/typescript/api-reference/models/chattokenlogprobs)       | :heavy\_minus\_sign: | Log probabilities for the completion         | `{"content": [{"bytes": null,"logprob": -0.612345,"token": " Hello","top_logprobs": []}`<br />],<br />"refusal": `null<br/>`} |
| `message`      | [models.ChatAssistantMessage](/docs/agent-sdk/typescript/api-reference/models/chatassistantmessage) | :heavy\_check\_mark: | Assistant message for requests and responses | `{"content": "What is the capital of France?","role": "user"}`                                                                |
