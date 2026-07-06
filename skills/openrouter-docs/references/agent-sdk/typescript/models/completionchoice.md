> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionChoice - TypeScript SDK

> CompletionChoice method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { CompletionChoice } from "@openrouter/sdk/models";

let value: CompletionChoice = {
  text: "<value>",
  index: 7493.1,
  logprobs: {
    tokens: [
      "<value 1>",
    ],
    tokenLogprobs: [
      7640.5,
      1771.28,
    ],
    topLogprobs: [],
    textOffset: [
      3937.38,
      9605.77,
    ],
  },
  finishReason: "length",
};
```

## Fields

| Field                | Type                                                                                 | Required             | Description |
| -------------------- | ------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `text`               | *string*                                                                             | :heavy\_check\_mark: | N/A         |
| `index`              | *number*                                                                             | :heavy\_check\_mark: | N/A         |
| `logprobs`           | [models.CompletionLogprobs](/agent-sdk/typescript/models/completionlogprobs)         | :heavy\_check\_mark: | N/A         |
| `finishReason`       | [models.CompletionFinishReason](/agent-sdk/typescript/models/completionfinishreason) | :heavy\_check\_mark: | N/A         |
| `nativeFinishReason` | *string*                                                                             | :heavy\_minus\_sign: | N/A         |
| `reasoning`          | *string*                                                                             | :heavy\_minus\_sign: | N/A         |
