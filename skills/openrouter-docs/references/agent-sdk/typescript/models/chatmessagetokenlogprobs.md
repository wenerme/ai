> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageTokenLogprobs - TypeScript SDK

> ChatMessageTokenLogprobs method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { ChatMessageTokenLogprobs } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprobs = {
  content: [
    {
      token: "<value>",
      logprob: 2764.68,
      bytes: [
        1199.17,
        6426.57,
      ],
      topLogprobs: [
        {
          token: "<value>",
          logprob: 9715.54,
          bytes: [
            7041.35,
          ],
        },
      ],
    },
  ],
  refusal: [
    {
      token: "<value>",
      logprob: 9280.35,
      bytes: [],
      topLogprobs: [],
    },
  ],
};
```

## Fields

| Field     | Type                                                                                      | Required             | Description |
| --------- | ----------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `content` | [models.ChatMessageTokenLogprob](/docs/agent-sdk/typescript/models/chatmessagetokenlogprob)\[] | :heavy\_check\_mark: | N/A         |
| `refusal` | [models.ChatMessageTokenLogprob](/docs/agent-sdk/typescript/models/chatmessagetokenlogprob)\[] | :heavy\_check\_mark: | N/A         |
