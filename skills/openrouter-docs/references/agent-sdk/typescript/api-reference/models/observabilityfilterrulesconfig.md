> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityFilterRulesConfig - TypeScript SDK

> ObservabilityFilterRulesConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Optional structured filter rules controlling which events are forwarded.

## Example Usage

```typescript lines theme={null}
import { ObservabilityFilterRulesConfig } from "@openrouter/sdk/models";

let value: ObservabilityFilterRulesConfig = {
  groups: [],
};
```

## Fields

| Field     | Type                                                                | Required             | Description |
| --------- | ------------------------------------------------------------------- | -------------------- | ----------- |
| `enabled` | *boolean*                                                           | :heavy\_minus\_sign: | N/A         |
| `groups`  | [models.Group](/docs/agent-sdk/typescript/api-reference/models/group)\[] | :heavy\_check\_mark: | N/A         |
