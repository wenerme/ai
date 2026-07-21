> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateObservabilityDestinationRequest - TypeScript SDK

> CreateObservabilityDestinationRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateObservabilityDestinationRequest } from "@openrouter/sdk/models";

let value: CreateObservabilityDestinationRequest = {
  config: {
    "baseUrl": "https://us.cloud.langfuse.com",
    "publicKey": "pk-l...EfGh",
    "secretKey": "sk-l...AbCd",
  },
  name: "Production Langfuse",
  type: "langfuse",
};
```

## Fields

| Field          | Type                                                                                                                                     | Required             | Description                                                                                                                                               | Example                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `apiKeyHashes` | *string*\[]                                                                                                                              | :heavy\_minus\_sign: | Optional allowlist of OpenRouter API key hashes whose traffic is forwarded. `null` or omitted means all keys. Must contain at least one hash if provided. | `<nil>`                                                                                              |
| `config`       | `Record<string, *any*>`                                                                                                                  | :heavy\_check\_mark: | Provider-specific configuration. The shape depends on `type` and is validated server-side.                                                                | `{"baseUrl": "https://us.cloud.langfuse.com","publicKey": "pk-l...EfGh","secretKey": "sk-l...AbCd"}` |
| `enabled`      | *boolean*                                                                                                                                | :heavy\_minus\_sign: | Whether this destination should be enabled immediately.                                                                                                   | true                                                                                                 |
| `filterRules`  | [models.ObservabilityFilterRulesConfig](/docs/agent-sdk/typescript/api-reference/models/observabilityfilterrulesconfig)                       | :heavy\_minus\_sign: | Optional structured filter rules controlling which events are forwarded.                                                                                  | `<nil>`                                                                                              |
| `name`         | *string*                                                                                                                                 | :heavy\_check\_mark: | Human-readable name for the destination.                                                                                                                  | Production Langfuse                                                                                  |
| `privacyMode`  | *boolean*                                                                                                                                | :heavy\_minus\_sign: | When true, request/response bodies are not forwarded — only metadata.                                                                                     | false                                                                                                |
| `samplingRate` | *number*                                                                                                                                 | :heavy\_minus\_sign: | Sampling rate between 0.0001 and 1 (1 = 100%).                                                                                                            | 1                                                                                                    |
| `type`         | [models.CreateObservabilityDestinationRequestType](/docs/agent-sdk/typescript/api-reference/models/createobservabilitydestinationrequesttype) | :heavy\_check\_mark: | The destination type. Only stable destination types are accepted.                                                                                         | langfuse                                                                                             |
| `workspaceId`  | *string*                                                                                                                                 | :heavy\_minus\_sign: | Optional workspace ID. Defaults to the authenticated entity's default workspace.                                                                          | 550e8400-e29b-41d4-a716-446655440000                                                                 |
