> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateBYOKKeyResponse - TypeScript SDK

> UpdateBYOKKeyResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateBYOKKeyResponse } from "@openrouter/sdk/models";

let value: UpdateBYOKKeyResponse = {
  data: {
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
};
```

## Fields

| Field  | Type                                                                 | Required             | Description | Example                                                                                                                                                                                                                                                                                                                                                       |
| ------ | -------------------------------------------------------------------- | -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [models.BYOKKey](/agent-sdk/typescript/api-reference/models/byokkey) | :heavy\_check\_mark: | N/A         | `{"allowed_api_key_hashes": null,"allowed_models": null,"allowed_user_ids": null,"created_at": "2025-08-24T10:30:00Z","disabled": false,"id": "11111111-2222-3333-4444-555555555555","is_fallback": false,"label": "sk-...AbCd","name": "Production OpenAI Key","provider": "openai","sort_order": 0,"workspace_id": "550e8400-e29b-41d4-a716-446655440000"}` |
