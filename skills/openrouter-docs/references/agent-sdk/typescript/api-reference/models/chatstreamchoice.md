> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamChoice - TypeScript SDK

> ChatStreamChoice type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Streaming completion choice chunk

## Example Usage

```typescript lines theme={null}
import { ChatStreamChoice } from "@openrouter/sdk/models";

let value: ChatStreamChoice = {
  delta: {},
  finishReason: null,
  index: 0,
};
```

## Fields

| Field          | Type                                                                                           | Required             | Description                          | Example                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `delta`        | [models.ChatStreamDelta](/docs/agent-sdk/typescript/api-reference/models/chatstreamdelta)           | :heavy\_check\_mark: | Delta changes in streaming response  | `{"content": "Hello","role": "assistant"}`                                                                                    |
| `finishReason` | [models.ChatFinishReasonEnum](/docs/agent-sdk/typescript/api-reference/models/chatfinishreasonenum) | :heavy\_check\_mark: | N/A                                  | stop                                                                                                                          |
| `index`        | *number*                                                                                       | :heavy\_check\_mark: | Choice index                         | 0                                                                                                                             |
| `logprobs`     | [models.ChatTokenLogprobs](/docs/agent-sdk/typescript/api-reference/models/chattokenlogprobs)       | :heavy\_minus\_sign: | Log probabilities for the completion | `{"content": [{"bytes": null,"logprob": -0.612345,"token": " Hello","top_logprobs": []}`<br />],<br />"refusal": `null<br/>`} |
