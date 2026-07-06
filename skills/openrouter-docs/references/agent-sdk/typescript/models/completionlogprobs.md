> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionLogprobs - TypeScript SDK

> CompletionLogprobs method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CompletionLogprobs } from "@openrouter/sdk/models";

let value: CompletionLogprobs = {
  tokens: [
    "<value 1>",
    "<value 2>",
    "<value 3>",
  ],
  tokenLogprobs: [
    2988.44,
    7128.75,
    8377.63,
  ],
  topLogprobs: null,
  textOffset: [
    1144.74,
    3297.78,
  ],
};
```

## Fields

| Field           | Type                          | Required             | Description |
| --------------- | ----------------------------- | -------------------- | ----------- |
| `tokens`        | *string*\[]                   | :heavy\_check\_mark: | N/A         |
| `tokenLogprobs` | *number*\[]                   | :heavy\_check\_mark: | N/A         |
| `topLogprobs`   | `Record<string, *number*>`\[] | :heavy\_check\_mark: | N/A         |
| `textOffset`    | *number*\[]                   | :heavy\_check\_mark: | N/A         |
