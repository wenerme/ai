> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Input - TypeScript SDK

> Input type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Input } from "@openrouter/sdk/models/operations";

let value: Input = {
  content: [],
};
```

## Fields

| Field     | Type                    | Required             | Description |
| --------- | ----------------------- | -------------------- | ----------- |
| `content` | *operations.Content*\[] | :heavy\_check\_mark: | N/A         |
