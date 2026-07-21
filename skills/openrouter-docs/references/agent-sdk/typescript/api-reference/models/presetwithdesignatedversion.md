> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PresetWithDesignatedVersion - TypeScript SDK

> PresetWithDesignatedVersion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A preset with its currently designated version.

## Example Usage

```typescript expandable lines theme={null}
import { PresetWithDesignatedVersion } from "@openrouter/sdk/models";

let value: PresetWithDesignatedVersion = {
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
};
```

## Fields

| Field                 | Type                                                                                                                     | Required             | Description                                                                   | Example                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createdAt`           | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `creatorUserId`       | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `description`         | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `designatedVersion`   | [models.PresetDesignatedVersion](/docs/agent-sdk/typescript/api-reference/models/presetdesignatedversion)                     | :heavy\_check\_mark: | A specific version of a preset, containing config and optional system prompt. | `{"config": {"model": "openai/gpt-4o","temperature": 0.7}`,<br />"created\_at": "2026-04-20T10:00:00Z",<br />"creator\_id": "user\_2dHFtVWx2n56w6HkM0000000000",<br />"id": "550e8400-e29b-41d4-a716-446655440000",<br />"preset\_id": "650e8400-e29b-41d4-a716-446655440001",<br />"system\_prompt": "You are a helpful assistant.",<br />"updated\_at": "2026-04-20T10:00:00Z",<br />"version": `1<br/>`} |
| `designatedVersionId` | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `id`                  | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `name`                | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `slug`                | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `status`              | [models.PresetWithDesignatedVersionStatus](/docs/agent-sdk/typescript/api-reference/models/presetwithdesignatedversionstatus) | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `statusUpdatedAt`     | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `updatedAt`           | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
| `workspaceId`         | *string*                                                                                                                 | :heavy\_check\_mark: | N/A                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                             |
