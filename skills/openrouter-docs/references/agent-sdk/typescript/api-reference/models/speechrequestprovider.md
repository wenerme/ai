> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SpeechRequestProvider - TypeScript SDK

> SpeechRequestProvider type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Provider-specific passthrough configuration

## Example Usage

```typescript lines theme={null}
import { SpeechRequestProvider } from "@openrouter/sdk/models";

let value: SpeechRequestProvider = {};
```

## Fields

| Field     | Type                                                                                 | Required             | Description                                                                                                                       | Example                                  |
| --------- | ------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `options` | [models.ProviderOptions](/docs/agent-sdk/typescript/api-reference/models/provideroptions) | :heavy\_minus\_sign: | Provider-specific options keyed by provider slug. The options for the matched provider are spread into the upstream request body. | `{"openai": {"max_tokens": 1000}`<br />} |
