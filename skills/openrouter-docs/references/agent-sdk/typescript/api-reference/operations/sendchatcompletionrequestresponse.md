> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SendChatCompletionRequestResponse - TypeScript SDK

> SendChatCompletionRequestResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ChatResult`

```typescript lines theme={null}
const value: models.ChatResult = {
  choices: [
    {
      finishReason: "stop",
      index: 0,
      message: {
        role: "assistant",
      },
    },
  ],
  created: 1677652288,
  id: "chatcmpl-123",
  model: "openai/gpt-4",
  object: "chat.completion",
  systemFingerprint: "fp_44709d6fcb",
};
```

### `EventStream<models.ChatStreamingResponse>`
