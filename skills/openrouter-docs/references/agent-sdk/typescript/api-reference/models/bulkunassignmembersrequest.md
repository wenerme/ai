> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignMembersRequest - TypeScript SDK

> BulkUnassignMembersRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkUnassignMembersRequest } from "@openrouter/sdk/models";

let value: BulkUnassignMembersRequest = {
  memberUserIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field           | Type        | Required             | Description                                             | Example                                            |
| --------------- | ----------- | -------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| `memberUserIds` | *string*\[] | :heavy\_check\_mark: | Array of member user IDs to unassign from the guardrail | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
