> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateObservabilityDestinationRequest - TypeScript SDK

> UpdateObservabilityDestinationRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateObservabilityDestinationRequest } from "@openrouter/sdk/models";

let value: UpdateObservabilityDestinationRequest = {};
```

## Fields

| Field          | Type                                                                                                               | Required             | Description                                                                                                                                                          | Example                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `apiKeyHashes` | *string*\[]                                                                                                        | :heavy\_minus\_sign: | Optional allowlist of OpenRouter API key hashes. `null` clears the filter (all keys). Omitting leaves the current value. Must contain at least one hash if provided. | `<nil>`                                                                                              |
| `config`       | `Record<string, *any*>`                                                                                            | :heavy\_minus\_sign: | Provider-specific configuration fields to update. Masked values are ignored; unset fields keep their current value.                                                  | `{"baseUrl": "https://us.cloud.langfuse.com","publicKey": "pk-l...EfGh","secretKey": "sk-l...AbCd"}` |
| `enabled`      | *boolean*                                                                                                          | :heavy\_minus\_sign: | Whether the destination is enabled.                                                                                                                                  | true                                                                                                 |
| `filterRules`  | [models.ObservabilityFilterRulesConfig](/docs/agent-sdk/typescript/api-reference/models/observabilityfilterrulesconfig) | :heavy\_minus\_sign: | N/A                                                                                                                                                                  | `<nil>`                                                                                              |
| `name`         | *string*                                                                                                           | :heavy\_minus\_sign: | Human-readable name for the destination.                                                                                                                             | Production Langfuse                                                                                  |
| `privacyMode`  | *boolean*                                                                                                          | :heavy\_minus\_sign: | When true, request/response bodies are not forwarded — only metadata.                                                                                                | false                                                                                                |
| `samplingRate` | *number*                                                                                                           | :heavy\_minus\_sign: | Sampling rate between 0.0001 and 1 (1 = 100%).                                                                                                                       | 1                                                                                                    |
