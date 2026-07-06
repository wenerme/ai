> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListKeyAssignmentsResponse - TypeScript SDK

> ListKeyAssignmentsResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListKeyAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListKeyAssignmentsResponse = {
  result: {
    data: [
      {
        assignedBy: "user_abc123",
        createdAt: "2025-08-24T10:30:00Z",
        guardrailId: "550e8400-e29b-41d4-a716-446655440001",
        id: "550e8400-e29b-41d4-a716-446655440000",
        keyHash:
          "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
        keyLabel: "prod-key",
        keyName: "Production Key",
      },
    ],
    totalCount: 1,
  },
};
```

## Fields

| Field    | Type                                                                                                       | Required             | Description | Example                                                                                                                                                                                                                                                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | [models.ListKeyAssignmentsResponse](/agent-sdk/typescript/api-reference/models/listkeyassignmentsresponse) | :heavy\_check\_mark: | N/A         | `{"data": [{"assigned_by": "user_abc123","created_at": "2025-08-24T10:30:00Z","guardrail_id": "550e8400-e29b-41d4-a716-446655440001","id": "550e8400-e29b-41d4-a716-446655440000","key_hash": "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93","key_label": "prod-key","key_name": "Production Key"}`<br />],<br />"total\_count": `1<br/>`} |
