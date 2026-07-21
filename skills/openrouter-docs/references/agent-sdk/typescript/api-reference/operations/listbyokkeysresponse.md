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

```typescript expandable lines theme={null}
import { ListBYOKKeysResponse } from "@openrouter/sdk/models/operations";

let value: ListBYOKKeysResponse = {
  result: {
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
  },
};
```

## Fields

| Field    | Type                                                                                           | Required             | Description | Example                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------- | -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | [models.ListBYOKKeysResponse](/docs/agent-sdk/typescript/api-reference/models/listbyokkeysresponse) | :heavy\_check\_mark: | N/A         | `{"data": [{"allowed_api_key_hashes": null,"allowed_models": null,"allowed_user_ids": null,"created_at": "2025-08-24T10:30:00Z","disabled": false,"id": "11111111-2222-3333-4444-555555555555","is_fallback": false,"label": "sk-...AbCd","name": "Production OpenAI Key","provider": "openai","sort_order": 0,"workspace_id": "550e8400-e29b-41d4-a716-446655440000"}`<br />],<br />"total\_count": `1<br/>`} |
