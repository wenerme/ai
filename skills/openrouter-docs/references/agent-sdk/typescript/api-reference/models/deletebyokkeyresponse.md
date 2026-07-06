> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DeleteBYOKKeyResponse - TypeScript SDK

> DeleteBYOKKeyResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { DeleteBYOKKeyResponse } from "@openrouter/sdk/models";

let value: DeleteBYOKKeyResponse = {
  deleted: true,
};
```

## Fields

| Field     | Type   | Required             | Description                                        | Example |
| --------- | ------ | -------------------- | -------------------------------------------------- | ------- |
| `deleted` | *true* | :heavy\_check\_mark: | Confirmation that the BYOK credential was deleted. | true    |
