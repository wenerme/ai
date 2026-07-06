> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DeleteGuardrailResponse - TypeScript SDK

> DeleteGuardrailResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Guardrail deleted successfully

## Example Usage

```typescript lines theme={null}
import { DeleteGuardrailResponse } from "@openrouter/sdk/models/operations";

let value: DeleteGuardrailResponse = {
  deleted: true,
};
```

## Fields

| Field     | Type   | Required             | Description                                 | Example |
| --------- | ------ | -------------------- | ------------------------------------------- | ------- |
| `deleted` | *true* | :heavy\_check\_mark: | Confirmation that the guardrail was deleted | true    |
