> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListOrganizationMembersResponseBody - TypeScript SDK

> ListOrganizationMembersResponseBody type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of organization members

## Example Usage

```typescript lines theme={null}
import { ListOrganizationMembersResponseBody } from "@openrouter/sdk/models/operations";

let value: ListOrganizationMembersResponseBody = {
  data: [],
  totalCount: 25,
};
```

## Fields

| Field        | Type                                                                                                                    | Required             | Description                                 | Example |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------- | ------- |
| `data`       | [operations.ListOrganizationMembersData](/docs/agent-sdk/typescript/api-reference/operations/listorganizationmembersdata)\[] | :heavy\_check\_mark: | List of organization members                |         |
| `totalCount` | *number*                                                                                                                | :heavy\_check\_mark: | Total number of members in the organization | 25      |
