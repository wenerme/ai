> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkAssignKeysToGuardrailRequest - TypeScript SDK

> BulkAssignKeysToGuardrailRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkAssignKeysToGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: BulkAssignKeysToGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  requestBody: {
    keyHashes: [
      "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ],
  },
};
```

## Fields

| Field         | Type                                                                                                                     | Required             | Description                            | Example                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------- | ------------------------------------ |
| `id`          | *string*                                                                                                                 | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000 |
| `requestBody` | [operations.BulkAssignKeysToGuardrailRequestBody](/agent-sdk/typescript/operations/bulkassignkeystoguardrailrequestbody) | :heavy\_check\_mark: | N/A                                    |                                      |
