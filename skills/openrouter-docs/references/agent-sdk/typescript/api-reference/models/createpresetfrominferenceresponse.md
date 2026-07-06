> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreatePresetFromInferenceResponse - TypeScript SDK

> CreatePresetFromInferenceResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Response containing the created preset with its designated version.

## Example Usage

```typescript expandable lines theme={null}
import { CreatePresetFromInferenceResponse } from "@openrouter/sdk/models";

let value: CreatePresetFromInferenceResponse = {
  data: {
    createdAt: "2026-04-20T10:00:00Z",
    creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
    description: null,
    designatedVersion: {
      config: {
        "model": "openai/gpt-4o",
        "temperature": 0.7,
      },
      createdAt: "2026-04-20T10:00:00Z",
      creatorId: "user_2dHFtVWx2n56w6HkM0000000000",
      id: "550e8400-e29b-41d4-a716-446655440000",
      presetId: "650e8400-e29b-41d4-a716-446655440001",
      systemPrompt: "You are a helpful assistant.",
      updatedAt: "2026-04-20T10:00:00Z",
      version: 1,
    },
    designatedVersionId: "550e8400-e29b-41d4-a716-446655440000",
    id: "650e8400-e29b-41d4-a716-446655440001",
    name: "my-preset",
    slug: "my-preset",
    status: "active",
    statusUpdatedAt: null,
    updatedAt: "2026-04-20T10:00:00Z",
    workspaceId: "750e8400-e29b-41d4-a716-446655440002",
  },
};
```

## Fields

| Field  | Type                                                                                                         | Required             | Description                                     | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data` | [models.PresetWithDesignatedVersion](/agent-sdk/typescript/api-reference/models/presetwithdesignatedversion) | :heavy\_check\_mark: | A preset with its currently designated version. | `{"created_at": "2026-04-20T10:00:00Z","creator_user_id": "user_2dHFtVWx2n56w6HkM0000000000","description": null,"designated_version": {"config": {"model": "openai/gpt-4o","temperature": 0.7}`,<br />"created\_at": "2026-04-20T10:00:00Z",<br />"creator\_id": "user\_2dHFtVWx2n56w6HkM0000000000",<br />"id": "550e8400-e29b-41d4-a716-446655440000",<br />"preset\_id": "650e8400-e29b-41d4-a716-446655440001",<br />"system\_prompt": "You are a helpful assistant.",<br />"updated\_at": "2026-04-20T10:00:00Z",<br />"version": `1<br/>`},<br />"designated\_version\_id": "550e8400-e29b-41d4-a716-446655440000",<br />"id": "650e8400-e29b-41d4-a716-446655440001",<br />"name": "my-preset",<br />"slug": "my-preset",<br />"status": "active",<br />"status\_updated\_at": null,<br />"updated\_at": "2026-04-20T10:00:00Z",<br />"workspace\_id": "750e8400-e29b-41d4-a716-446655440002"<br />} |
