> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListOrganizationMembersResponse - TypeScript SDK

> ListOrganizationMembersResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListOrganizationMembersResponse } from "@openrouter/sdk/models/operations";

let value: ListOrganizationMembersResponse = {
  result: {
    data: [],
    totalCount: 25,
  },
};
```

## Fields

| Field    | Type                                                                                                                                 | Required             | Description |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `result` | [operations.ListOrganizationMembersResponseBody](/agent-sdk/typescript/api-reference/operations/listorganizationmembersresponsebody) | :heavy\_check\_mark: | N/A         |
