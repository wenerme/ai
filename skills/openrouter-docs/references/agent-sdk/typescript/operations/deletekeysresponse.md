> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DeleteKeysResponse - TypeScript SDK

> DeleteKeysResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

API key deleted successfully

## Example Usage

```typescript lines theme={null}
import { DeleteKeysResponse } from "@openrouter/sdk/models/operations";

let value: DeleteKeysResponse = {
  deleted: true,
};
```

## Fields

| Field     | Type   | Required             | Description                               | Example |
| --------- | ------ | -------------------- | ----------------------------------------- | ------- |
| `deleted` | *true* | :heavy\_check\_mark: | Confirmation that the API key was deleted | true    |
