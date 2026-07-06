> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseOutputTextTopLogprob - TypeScript SDK

> ResponseOutputTextTopLogprob type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponseOutputTextTopLogprob } from "@openrouter/sdk/models";

let value: ResponseOutputTextTopLogprob = {
  bytes: [
    303617,
    34414,
  ],
  logprob: 1976.4,
  token: "<value>",
};
```

## Fields

| Field     | Type        | Required             | Description |
| --------- | ----------- | -------------------- | ----------- |
| `bytes`   | *number*\[] | :heavy\_check\_mark: | N/A         |
| `logprob` | *number*    | :heavy\_check\_mark: | N/A         |
| `token`   | *string*    | :heavy\_check\_mark: | N/A         |
