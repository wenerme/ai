> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailsResponse - TypeScript SDK

> ListGuardrailsResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of guardrails

## Example Usage

```typescript lines theme={null}
import { ListGuardrailsResponse } from "@openrouter/sdk/models/operations";

let value: ListGuardrailsResponse = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Production Guardrail",
      createdAt: "2025-08-24T10:30:00Z",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field        | Type                                                                                    | Required             | Description                | Example |
| ------------ | --------------------------------------------------------------------------------------- | -------------------- | -------------------------- | ------- |
| `data`       | [operations.ListGuardrailsData](/docs/agent-sdk/typescript/operations/listguardrailsdata)\[] | :heavy\_check\_mark: | List of guardrails         |         |
| `totalCount` | *number*                                                                                | :heavy\_check\_mark: | Total number of guardrails | 25      |
