> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageTokenLogprob - TypeScript SDK

> ChatMessageTokenLogprob method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageTokenLogprob } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprob = {
  token: "<value>",
  logprob: 8717.76,
  bytes: [],
  topLogprobs: [
    {
      token: "<value>",
      logprob: 9715.54,
      bytes: [
        7041.35,
      ],
    },
  ],
};
```

## Fields

| Field         | Type                                                                                                          | Required             | Description |
| ------------- | ------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `token`       | *string*                                                                                                      | :heavy\_check\_mark: | N/A         |
| `logprob`     | *number*                                                                                                      | :heavy\_check\_mark: | N/A         |
| `bytes`       | *number*\[]                                                                                                   | :heavy\_check\_mark: | N/A         |
| `topLogprobs` | [models.ChatMessageTokenLogprobTopLogprob](/agent-sdk/typescript/models/chatmessagetokenlogprobtoplogprob)\[] | :heavy\_check\_mark: | N/A         |
