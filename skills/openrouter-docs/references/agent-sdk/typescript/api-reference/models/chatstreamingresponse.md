> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamingResponse - TypeScript SDK

> ChatStreamingResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatStreamingResponse } from "@openrouter/sdk/models";

let value: ChatStreamingResponse = {
  data: {
    choices: [
      {
        delta: {},
        finishReason: null,
        index: 0,
      },
    ],
    created: 1677652288,
    id: "chatcmpl-123",
    model: "openai/gpt-4",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field  | Type                                                                                 | Required             | Description                     | Example                                                                                                                                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------ | -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data` | [models.ChatStreamChunk](/docs/agent-sdk/typescript/api-reference/models/chatstreamchunk) | :heavy\_check\_mark: | Streaming chat completion chunk | `{"choices": [{"delta": {"content": "Hello","role": "assistant"}`,<br />"finish\_reason": null,<br />"index": `0<br/>`}<br />],<br />"created": 1677652288,<br />"id": "chatcmpl-123",<br />"model": "openai/gpt-4",<br />"object": "chat.completion.chunk"<br />} |
