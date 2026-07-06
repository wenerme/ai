> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListBYOKKeysResponse - TypeScript SDK

> ListBYOKKeysResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListBYOKKeysResponse } from "@openrouter/sdk/models";

let value: ListBYOKKeysResponse = {
  data: [
    {
      allowedApiKeyHashes: null,
      allowedModels: null,
      allowedUserIds: null,
      createdAt: "2025-08-24T10:30:00Z",
      disabled: false,
      id: "11111111-2222-3333-4444-555555555555",
      isFallback: false,
      label: "sk-...AbCd",
      provider: "openai",
      sortOrder: 0,
      workspaceId: "550e8400-e29b-41d4-a716-446655440000",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field        | Type                                                                    | Required             | Description                                            | Example |
| ------------ | ----------------------------------------------------------------------- | -------------------- | ------------------------------------------------------ | ------- |
| `data`       | [models.BYOKKey](/agent-sdk/typescript/api-reference/models/byokkey)\[] | :heavy\_check\_mark: | List of BYOK credentials.                              |         |
| `totalCount` | *number*                                                                | :heavy\_check\_mark: | Total number of BYOK credentials matching the filters. | 1       |
