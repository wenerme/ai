> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Rule - TypeScript SDK

> Rule type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Rule } from "@openrouter/sdk/models";

let value: Rule = {
  field: "api_key_name",
  operator: "not_contains",
};
```

## Fields

| Field      | Type                                                                   | Required             | Description |
| ---------- | ---------------------------------------------------------------------- | -------------------- | ----------- |
| `field`    | [models.Field](/agent-sdk/typescript/api-reference/models/field)       | :heavy\_check\_mark: | N/A         |
| `operator` | [models.Operator](/agent-sdk/typescript/api-reference/models/operator) | :heavy\_check\_mark: | N/A         |
| `value`    | *models.ObservabilityFilterRulesConfigValue*                           | :heavy\_minus\_sign: | N/A         |
