> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Reasoning - TypeScript SDK

> Reasoning method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Reasoning } from "@openrouter/sdk/models";

let value: Reasoning = {};
```

## Fields

| Field     | Type                                                                                       | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `effort`  | [models.Effort](/docs/agent-sdk/typescript/models/effort)                                       | :heavy\_minus\_sign: | N/A         |
| `summary` | [models.ReasoningSummaryVerbosity](/docs/agent-sdk/typescript/models/reasoningsummaryverbosity) | :heavy\_minus\_sign: | N/A         |
