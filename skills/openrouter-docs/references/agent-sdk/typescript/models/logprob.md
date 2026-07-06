> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Logprob - TypeScript SDK

> Logprob method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Logprob } from "@openrouter/sdk/models";

let value: Logprob = {
  token: "<value>",
  bytes: [
    3226.37,
  ],
  logprob: 2246.86,
  topLogprobs: [],
};
```

## Fields

| Field         | Type                                                                                                | Required             | Description |
| ------------- | --------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `token`       | *string*                                                                                            | :heavy\_check\_mark: | N/A         |
| `bytes`       | *number*\[]                                                                                         | :heavy\_check\_mark: | N/A         |
| `logprob`     | *number*                                                                                            | :heavy\_check\_mark: | N/A         |
| `topLogprobs` | [models.ResponseOutputTextTopLogprob](/agent-sdk/typescript/models/responseoutputtexttoplogprob)\[] | :heavy\_check\_mark: | N/A         |
