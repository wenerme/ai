> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateWorkspaceRequest - TypeScript SDK

> UpdateWorkspaceRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateWorkspaceRequest } from "@openrouter/sdk/models";

let value: UpdateWorkspaceRequest = {};
```

## Fields

| Field                             | Type        | Required             | Description                                                                                                      | Example             |
| --------------------------------- | ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------- |
| `defaultImageModel`               | *string*    | :heavy\_minus\_sign: | Default image model for this workspace                                                                           | openai/dall-e-3     |
| `defaultProviderSort`             | *string*    | :heavy\_minus\_sign: | Default provider sort preference (price, throughput, latency, exacto)                                            | price               |
| `defaultTextModel`                | *string*    | :heavy\_minus\_sign: | Default text model for this workspace                                                                            | openai/gpt-4o       |
| `description`                     | *string*    | :heavy\_minus\_sign: | New description for the workspace                                                                                | Updated description |
| `ioLoggingApiKeyIds`              | *number*\[] | :heavy\_minus\_sign: | Optional array of API key IDs to filter I/O logging                                                              | `<nil>`             |
| `ioLoggingSamplingRate`           | *number*    | :heavy\_minus\_sign: | Sampling rate for I/O logging (0.0001-1)                                                                         | 1                   |
| `isDataDiscountLoggingEnabled`    | *boolean*   | :heavy\_minus\_sign: | Whether data discount logging is enabled                                                                         | true                |
| `isObservabilityBroadcastEnabled` | *boolean*   | :heavy\_minus\_sign: | Whether broadcast is enabled                                                                                     | false               |
| `isObservabilityIoLoggingEnabled` | *boolean*   | :heavy\_minus\_sign: | Whether private logging is enabled                                                                               | false               |
| `name`                            | *string*    | :heavy\_minus\_sign: | New name for the workspace                                                                                       | Updated Workspace   |
| `slug`                            | *string*    | :heavy\_minus\_sign: | New URL-friendly slug (lowercase alphanumeric segments separated by single hyphens, no leading/trailing hyphens) | updated-workspace   |
