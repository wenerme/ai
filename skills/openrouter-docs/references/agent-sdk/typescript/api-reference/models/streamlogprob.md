> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StreamLogprob - TypeScript SDK

> StreamLogprob type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Log probability information for a token

## Example Usage

```typescript lines theme={null}
import { StreamLogprob } from "@openrouter/sdk/models";

let value: StreamLogprob = {
  logprob: -0.5,
  token: "Hello",
};
```

## Fields

| Field         | Type                                                                                                    | Required             | Description |
| ------------- | ------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `bytes`       | *number*\[]                                                                                             | :heavy\_minus\_sign: | N/A         |
| `logprob`     | *number*                                                                                                | :heavy\_check\_mark: | N/A         |
| `token`       | *string*                                                                                                | :heavy\_check\_mark: | N/A         |
| `topLogprobs` | [models.StreamLogprobTopLogprob](/agent-sdk/typescript/api-reference/models/streamlogprobtoplogprob)\[] | :heavy\_minus\_sign: | N/A         |
