> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListWorkspacesResponse - TypeScript SDK

> ListWorkspacesResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { ListWorkspacesResponse } from "@openrouter/sdk/models";

let value: ListWorkspacesResponse = {
  data: [
    {
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
  ],
  totalCount: 1,
};
```

## Fields

| Field        | Type                                                                        | Required             | Description                | Example |
| ------------ | --------------------------------------------------------------------------- | -------------------- | -------------------------- | ------- |
| `data`       | [models.Workspace](/docs/agent-sdk/typescript/api-reference/models/workspace)\[] | :heavy\_check\_mark: | List of workspaces         |         |
| `totalCount` | *number*                                                                    | :heavy\_check\_mark: | Total number of workspaces | 5       |
