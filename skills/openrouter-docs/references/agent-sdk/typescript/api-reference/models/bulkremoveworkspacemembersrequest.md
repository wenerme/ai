> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkRemoveWorkspaceMembersRequest - TypeScript SDK

> BulkRemoveWorkspaceMembersRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkRemoveWorkspaceMembersRequest } from "@openrouter/sdk/models";

let value: BulkRemoveWorkspaceMembersRequest = {
  userIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field     | Type        | Required             | Description                                   | Example                                            |
| --------- | ----------- | -------------------- | --------------------------------------------- | -------------------------------------------------- |
| `userIds` | *string*\[] | :heavy\_check\_mark: | List of user IDs to remove from the workspace | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
