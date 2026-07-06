> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailKeyAssignmentsData - TypeScript SDK

> ListGuardrailKeyAssignmentsData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListGuardrailKeyAssignmentsData } from "@openrouter/sdk/models/operations";

let value: ListGuardrailKeyAssignmentsData = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  keyHash: "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
  guardrailId: "550e8400-e29b-41d4-a716-446655440001",
  keyName: "Production Key",
  keyLabel: "prod-key",
  assignedBy: "user_abc123",
  createdAt: "2025-08-24T10:30:00Z",
};
```

## Fields

| Field         | Type     | Required             | Description                                           | Example                                                          |
| ------------- | -------- | -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| `id`          | *string* | :heavy\_check\_mark: | Unique identifier for the assignment                  | 550e8400-e29b-41d4-a716-446655440000                             |
| `keyHash`     | *string* | :heavy\_check\_mark: | Hash of the assigned API key                          | c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93 |
| `guardrailId` | *string* | :heavy\_check\_mark: | ID of the guardrail                                   | 550e8400-e29b-41d4-a716-446655440001                             |
| `keyName`     | *string* | :heavy\_check\_mark: | Name of the API key                                   | Production Key                                                   |
| `keyLabel`    | *string* | :heavy\_check\_mark: | Label of the API key                                  | prod-key                                                         |
| `assignedBy`  | *string* | :heavy\_check\_mark: | User ID of who made the assignment                    | user\_abc123                                                     |
| `createdAt`   | *string* | :heavy\_check\_mark: | ISO 8601 timestamp of when the assignment was created | 2025-08-24T10:30:00Z                                             |
