> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesLogProbs - TypeScript SDK

> OpenResponsesLogProbs method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Log probability information for a token

## Example Usage

```typescript lines theme={null}
import { OpenResponsesLogProbs } from "@openrouter/sdk/models";

let value: OpenResponsesLogProbs = {
  logprob: -0.1,
  token: "world",
};
```

## Fields

| Field         | Type                                                                                        | Required             | Description |
| ------------- | ------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `logprob`     | *number*                                                                                    | :heavy\_check\_mark: | N/A         |
| `token`       | *string*                                                                                    | :heavy\_check\_mark: | N/A         |
| `topLogprobs` | [models.OpenResponsesTopLogprobs](/agent-sdk/typescript/models/openresponsestoplogprobs)\[] | :heavy\_minus\_sign: | N/A         |
