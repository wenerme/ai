> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DeleteKeysRequest - TypeScript SDK

> DeleteKeysRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { DeleteKeysRequest } from "@openrouter/sdk/models/operations";

let value: DeleteKeysRequest = {
  hash:
    "OPENROUTER_API_KEY_EXAMPLE",
};
```

## Fields

| Field  | Type     | Required             | Description                                  | Example                                                                   |
| ------ | -------- | -------------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `hash` | *string* | :heavy\_check\_mark: | The hash identifier of the API key to delete | OPENROUTER_API_KEY_EXAMPLE |
