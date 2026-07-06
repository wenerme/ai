> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Stance - TypeScript SDK

> Stance type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Stance } from "@openrouter/sdk/models";

let value: Stance = {
  model: "Wrangler",
  stance: "<value>",
};
```

## Fields

| Field    | Type     | Required             | Description |
| -------- | -------- | -------------------- | ----------- |
| `model`  | *string* | :heavy\_check\_mark: | N/A         |
| `stance` | *string* | :heavy\_check\_mark: | N/A         |
