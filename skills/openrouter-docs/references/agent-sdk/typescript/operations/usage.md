> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Usage - TypeScript SDK

> Usage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Usage } from "@openrouter/sdk/models/operations";

let value: Usage = {
  promptTokens: 9797.96,
  totalTokens: 7874.4,
};
```

## Fields

| Field          | Type     | Required             | Description |
| -------------- | -------- | -------------------- | ----------- |
| `promptTokens` | *number* | :heavy\_check\_mark: | N/A         |
| `totalTokens`  | *number* | :heavy\_check\_mark: | N/A         |
| `cost`         | *number* | :heavy\_minus\_sign: | N/A         |
