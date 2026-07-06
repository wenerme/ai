> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkAddWorkspaceMembersRequest - TypeScript SDK

> BulkAddWorkspaceMembersRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkAddWorkspaceMembersRequest } from "@openrouter/sdk/models";

let value: BulkAddWorkspaceMembersRequest = {
  userIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field     | Type        | Required             | Description                                                                                                 | Example                                            |
| --------- | ----------- | -------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `userIds` | *string*\[] | :heavy\_check\_mark: | List of user IDs to add to the workspace. Members are assigned the same role they hold in the organization. | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
