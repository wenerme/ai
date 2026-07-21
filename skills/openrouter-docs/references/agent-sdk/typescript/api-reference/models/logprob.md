> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Logprob - TypeScript SDK

> Logprob type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Logprob } from "@openrouter/sdk/models";

let value: Logprob = {
  bytes: [
    322637,
  ],
  logprob: 2246.86,
  token: "<value>",
  topLogprobs: [],
};
```

## Fields

| Field         | Type                                                                                                              | Required             | Description |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `bytes`       | *number*\[]                                                                                                       | :heavy\_check\_mark: | N/A         |
| `logprob`     | *number*                                                                                                          | :heavy\_check\_mark: | N/A         |
| `token`       | *string*                                                                                                          | :heavy\_check\_mark: | N/A         |
| `topLogprobs` | [models.ResponseOutputTextTopLogprob](/docs/agent-sdk/typescript/api-reference/models/responseoutputtexttoplogprob)\[] | :heavy\_check\_mark: | N/A         |
