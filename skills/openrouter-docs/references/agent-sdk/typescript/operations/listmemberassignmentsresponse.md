> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListMemberAssignmentsResponse - TypeScript SDK

> ListMemberAssignmentsResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of member assignments

## Example Usage

```typescript lines theme={null}
import { ListMemberAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListMemberAssignmentsResponse = {
  data: [],
  totalCount: 10,
};
```

## Fields

| Field        | Type                                                                                                  | Required             | Description                        | Example |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------- | ------- |
| `data`       | [operations.ListMemberAssignmentsData](/docs/agent-sdk/typescript/operations/listmemberassignmentsdata)\[] | :heavy\_check\_mark: | List of member assignments         |         |
| `totalCount` | *number*                                                                                              | :heavy\_check\_mark: | Total number of member assignments | 10      |
