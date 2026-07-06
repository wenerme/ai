> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ErrorT - TypeScript SDK

> ErrorT type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Error information

## Example Usage

```typescript lines theme={null}
import { ErrorT } from "@openrouter/sdk/models";

let value: ErrorT = {
  code: 429,
  message: "Rate limit exceeded",
};
```

## Fields

| Field     | Type     | Required             | Description   | Example             |
| --------- | -------- | -------------------- | ------------- | ------------------- |
| `code`    | *number* | :heavy\_check\_mark: | Error code    | 429                 |
| `message` | *string* | :heavy\_check\_mark: | Error message | Rate limit exceeded |
