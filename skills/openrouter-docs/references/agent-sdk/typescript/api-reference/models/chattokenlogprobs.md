> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatTokenLogprobs - TypeScript SDK

> ChatTokenLogprobs type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Log probabilities for the completion

## Example Usage

```typescript lines theme={null}
import { ChatTokenLogprobs } from "@openrouter/sdk/models";

let value: ChatTokenLogprobs = {
  content: [
    {
      bytes: null,
      logprob: -0.612345,
      token: " Hello",
      topLogprobs: [],
    },
  ],
};
```

## Fields

| Field     | Type                                                                                      | Required             | Description                          |
| --------- | ----------------------------------------------------------------------------------------- | -------------------- | ------------------------------------ |
| `content` | [models.ChatTokenLogprob](/docs/agent-sdk/typescript/api-reference/models/chattokenlogprob)\[] | :heavy\_check\_mark: | Log probabilities for content tokens |
| `refusal` | [models.ChatTokenLogprob](/docs/agent-sdk/typescript/api-reference/models/chattokenlogprob)\[] | :heavy\_minus\_sign: | Log probabilities for refusal tokens |
