> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityGrafanaDestination - TypeScript SDK

> ObservabilityGrafanaDestination type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityGrafanaDestination } from "@openrouter/sdk/models";

let value: ObservabilityGrafanaDestination = {
  apiKeyHashes: null,
  config: {
    apiKey: "<value>",
    baseUrl: "https://us.cloud.langfuse.com",
    instanceId: "<id>",
  },
  createdAt: "2025-08-24T10:30:00Z",
  enabled: true,
  filterRules: null,
  id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
  name: "Production Langfuse",
  privacyMode: false,
  samplingRate: 1,
  type: "grafana",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field          | Type                                                                                                                             | Required             | Description                                                                                                                              | Example                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `apiKeyHashes` | *string*\[]                                                                                                                      | :heavy\_check\_mark: | Optional allowlist of OpenRouter API key hashes (`api_keys.hash`) whose traffic is forwarded to this destination. `null` means all keys. | `<nil>`                              |
| `config`       | [models.ObservabilityGrafanaDestinationConfig](/docs/agent-sdk/typescript/api-reference/models/observabilitygrafanadestinationconfig) | :heavy\_check\_mark: | N/A                                                                                                                                      |                                      |
| `createdAt`    | *string*                                                                                                                         | :heavy\_check\_mark: | ISO timestamp of when the destination was created.                                                                                       | 2025-08-24T10:30:00Z                 |
| `enabled`      | *boolean*                                                                                                                        | :heavy\_check\_mark: | Whether this destination is currently enabled.                                                                                           | true                                 |
| `filterRules`  | [models.ObservabilityFilterRulesConfig](/docs/agent-sdk/typescript/api-reference/models/observabilityfilterrulesconfig)               | :heavy\_check\_mark: | Optional structured filter rules controlling which events are forwarded.                                                                 | `<nil>`                              |
| `id`           | *string*                                                                                                                         | :heavy\_check\_mark: | Stable public identifier for this destination.                                                                                           | 99999999-aaaa-bbbb-cccc-dddddddddddd |
| `name`         | *string*                                                                                                                         | :heavy\_check\_mark: | Human-readable name for the destination.                                                                                                 | Production Langfuse                  |
| `privacyMode`  | *boolean*                                                                                                                        | :heavy\_check\_mark: | When true, request/response bodies are not forwarded to this destination — only metadata.                                                | false                                |
| `samplingRate` | *number*                                                                                                                         | :heavy\_check\_mark: | Sampling rate for events sent to this destination, between 0.0001 and 1 (1 = 100%).                                                      | 1                                    |
| `type`         | *"grafana"*                                                                                                                      | :heavy\_check\_mark: | N/A                                                                                                                                      |                                      |
| `updatedAt`    | *string*                                                                                                                         | :heavy\_check\_mark: | ISO timestamp of when the destination was last updated.                                                                                  | 2025-08-24T15:45:00Z                 |
| `workspaceId`  | *string*                                                                                                                         | :heavy\_check\_mark: | ID of the workspace this destination belongs to.                                                                                         | 550e8400-e29b-41d4-a716-446655440000 |
