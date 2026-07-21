> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListOrganizationMembersData - TypeScript SDK

> ListOrganizationMembersData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListOrganizationMembersData } from "@openrouter/sdk/models/operations";

let value: ListOrganizationMembersData = {
  email: "jane.doe@example.com",
  firstName: "Jane",
  id: "user_2dHFtVWx2n56w6HkM0000000000",
  lastName: "Doe",
  role: "org:member",
};
```

## Fields

| Field       | Type                                                                   | Required             | Description                            | Example                                             |
| ----------- | ---------------------------------------------------------------------- | -------------------- | -------------------------------------- | --------------------------------------------------- |
| `email`     | *string*                                                               | :heavy\_check\_mark: | Email address of the member            | [jane.doe@example.com](mailto:jane.doe@example.com) |
| `firstName` | *string*                                                               | :heavy\_check\_mark: | First name of the member               | Jane                                                |
| `id`        | *string*                                                               | :heavy\_check\_mark: | User ID of the organization member     | user\_2dHFtVWx2n56w6HkM0000000000                   |
| `lastName`  | *string*                                                               | :heavy\_check\_mark: | Last name of the member                | Doe                                                 |
| `role`      | [operations.Role](/docs/agent-sdk/typescript/api-reference/operations/role) | :heavy\_check\_mark: | Role of the member in the organization | org:member                                          |
