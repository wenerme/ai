> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DeleteGuardrailRequest - TypeScript SDK

> DeleteGuardrailRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { DeleteGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: DeleteGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field | Type     | Required             | Description                                      | Example                              |
| ----- | -------- | -------------------- | ------------------------------------------------ | ------------------------------------ |
| `id`  | *string* | :heavy\_check\_mark: | The unique identifier of the guardrail to delete | 550e8400-e29b-41d4-a716-446655440000 |
