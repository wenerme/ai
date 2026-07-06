> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetWorkspaceResponse - TypeScript SDK

> GetWorkspaceResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { GetWorkspaceResponse } from "@openrouter/sdk/models";

let value: GetWorkspaceResponse = {
  data: {
    createdAt: "2025-08-24T10:30:00Z",
    createdBy: "user_abc123",
    defaultImageModel: "openai/dall-e-3",
    defaultProviderSort: "price",
    defaultTextModel: "openai/gpt-4o",
    description: "Production environment workspace",
    id: "550e8400-e29b-41d4-a716-446655440000",
    ioLoggingApiKeyIds: null,
    ioLoggingSamplingRate: 1,
    isDataDiscountLoggingEnabled: true,
    isObservabilityBroadcastEnabled: false,
    isObservabilityIoLoggingEnabled: false,
    name: "Production",
    slug: "production",
    updatedAt: "2025-08-24T15:45:00Z",
  },
};
```

## Fields

| Field  | Type                                                                     | Required             | Description | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------ | ------------------------------------------------------------------------ | -------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [models.Workspace](/agent-sdk/typescript/api-reference/models/workspace) | :heavy\_check\_mark: | N/A         | `{"created_at": "2025-08-24T10:30:00Z","created_by": "user_abc123","default_image_model": "openai/dall-e-3","default_provider_sort": "price","default_text_model": "openai/gpt-4o","description": "Production environment workspace","id": "550e8400-e29b-41d4-a716-446655440000","io_logging_api_key_ids": null,"io_logging_sampling_rate": 1,"is_data_discount_logging_enabled": true,"is_observability_broadcast_enabled": false,"is_observability_io_logging_enabled": false,"name": "Production","slug": "production","updated_at": "2025-08-24T15:45:00Z"}` |
