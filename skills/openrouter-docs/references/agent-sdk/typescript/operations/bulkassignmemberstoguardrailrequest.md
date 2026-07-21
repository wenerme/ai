> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkAssignMembersToGuardrailRequest - TypeScript SDK

> BulkAssignMembersToGuardrailRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkAssignMembersToGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: BulkAssignMembersToGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  requestBody: {
    memberUserIds: [
      "user_abc123",
      "user_def456",
    ],
  },
};
```

## Fields

| Field         | Type                                                                                                                           | Required             | Description                            | Example                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------- | ------------------------------------ |
| `id`          | *string*                                                                                                                       | :heavy\_check\_mark: | The unique identifier of the guardrail | 550e8400-e29b-41d4-a716-446655440000 |
| `requestBody` | [operations.BulkAssignMembersToGuardrailRequestBody](/docs/agent-sdk/typescript/operations/bulkassignmemberstoguardrailrequestbody) | :heavy\_check\_mark: | N/A                                    |                                      |
