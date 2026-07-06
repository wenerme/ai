> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseOutputTextTopLogprob - TypeScript SDK

> ResponseOutputTextTopLogprob method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponseOutputTextTopLogprob } from "@openrouter/sdk/models";

let value: ResponseOutputTextTopLogprob = {
  token: "<value>",
  bytes: [
    3036.17,
    344.14,
  ],
  logprob: 1976.4,
};
```

## Fields

| Field     | Type        | Required             | Description |
| --------- | ----------- | -------------------- | ----------- |
| `token`   | *string*    | :heavy\_check\_mark: | N/A         |
| `bytes`   | *number*\[] | :heavy\_check\_mark: | N/A         |
| `logprob` | *number*    | :heavy\_check\_mark: | N/A         |
