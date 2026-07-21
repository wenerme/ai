> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignKeysFromGuardrailRequest - TypeScript SDK

> BulkUnassignKeysFromGuardrailRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkUnassignKeysFromGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: BulkUnassignKeysFromGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  requestBody: {
    keyHashes: [
      "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ],
  },
};
```

## Fields

| Field         | Type                                                                                                                             | Required             | Description                            | Example                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | ------------------------------------ |
| `id`          | *string*                                                                                                                         | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000 |
| `requestBody` | [operations.BulkUnassignKeysFromGuardrailRequestBody](/docs/agent-sdk/typescript/operations/bulkunassignkeysfromguardrailrequestbody) | :heavy\_check\_mark: | N/A                                    |                                      |
