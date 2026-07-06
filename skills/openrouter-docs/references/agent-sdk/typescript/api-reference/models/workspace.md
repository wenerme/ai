> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspace - TypeScript SDK

> Workspace type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Workspace } from "@openrouter/sdk/models";

let value: Workspace = {
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
};
```

## Fields

| Field                             | Type        | Required             | Description                                                                          | Example                              |
| --------------------------------- | ----------- | -------------------- | ------------------------------------------------------------------------------------ | ------------------------------------ |
| `createdAt`                       | *string*    | :heavy\_check\_mark: | ISO 8601 timestamp of when the workspace was created                                 | 2025-08-24T10:30:00Z                 |
| `createdBy`                       | *string*    | :heavy\_check\_mark: | User ID of the workspace creator                                                     | user\_abc123                         |
| `defaultImageModel`               | *string*    | :heavy\_check\_mark: | Default image model for this workspace                                               | openai/dall-e-3                      |
| `defaultProviderSort`             | *string*    | :heavy\_check\_mark: | Default provider sort preference (price, throughput, latency, exacto)                | price                                |
| `defaultTextModel`                | *string*    | :heavy\_check\_mark: | Default text model for this workspace                                                | openai/gpt-4o                        |
| `description`                     | *string*    | :heavy\_check\_mark: | Description of the workspace                                                         | Production environment workspace     |
| `id`                              | *string*    | :heavy\_check\_mark: | Unique identifier for the workspace                                                  | 550e8400-e29b-41d4-a716-446655440000 |
| `ioLoggingApiKeyIds`              | *number*\[] | :heavy\_check\_mark: | Optional array of API key IDs to filter I/O logging. Null means all keys are logged. | `<nil>`                              |
| `ioLoggingSamplingRate`           | *number*    | :heavy\_check\_mark: | Sampling rate for I/O logging (0.0001-1). 1 means 100% of requests are logged.       | 1                                    |
| `isDataDiscountLoggingEnabled`    | *boolean*   | :heavy\_check\_mark: | Whether data discount logging is enabled for this workspace                          | true                                 |
| `isObservabilityBroadcastEnabled` | *boolean*   | :heavy\_check\_mark: | Whether broadcast is enabled for this workspace                                      | false                                |
| `isObservabilityIoLoggingEnabled` | *boolean*   | :heavy\_check\_mark: | Whether private logging is enabled for this workspace                                | false                                |
| `name`                            | *string*    | :heavy\_check\_mark: | Name of the workspace                                                                | Production                           |
| `slug`                            | *string*    | :heavy\_check\_mark: | URL-friendly slug for the workspace                                                  | production                           |
| `updatedAt`                       | *string*    | :heavy\_check\_mark: | ISO 8601 timestamp of when the workspace was last updated                            | 2025-08-24T15:45:00Z                 |
