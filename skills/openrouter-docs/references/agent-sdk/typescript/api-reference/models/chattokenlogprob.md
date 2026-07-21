> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatTokenLogprob - TypeScript SDK

> ChatTokenLogprob type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Token log probability information

## Example Usage

```typescript lines theme={null}
import { ChatTokenLogprob } from "@openrouter/sdk/models";

let value: ChatTokenLogprob = {
  bytes: null,
  logprob: -0.612345,
  token: " Hello",
  topLogprobs: [
    {
      bytes: null,
      logprob: -0.612345,
      token: " Hello",
    },
  ],
};
```

## Fields

| Field         | Type                                                                                                          | Required             | Description                               |
| ------------- | ------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------- |
| `bytes`       | *number*\[]                                                                                                   | :heavy\_check\_mark: | UTF-8 bytes of the token                  |
| `logprob`     | *number*                                                                                                      | :heavy\_check\_mark: | Log probability of the token              |
| `token`       | *string*                                                                                                      | :heavy\_check\_mark: | The token                                 |
| `topLogprobs` | [models.ChatTokenLogprobTopLogprob](/docs/agent-sdk/typescript/api-reference/models/chattokenlogprobtoplogprob)\[] | :heavy\_check\_mark: | Top alternative tokens with probabilities |
