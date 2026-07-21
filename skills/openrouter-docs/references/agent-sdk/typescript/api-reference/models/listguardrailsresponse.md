> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailsResponse - TypeScript SDK

> ListGuardrailsResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListGuardrailsResponse } from "@openrouter/sdk/models";

let value: ListGuardrailsResponse = {
  data: [
    {
      createdAt: "2025-08-24T10:30:00Z",
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Production Guardrail",
      workspaceId: "0df9e665-d932-5740-b2c7-b52af166bc11",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field        | Type                                                                        | Required             | Description                | Example |
| ------------ | --------------------------------------------------------------------------- | -------------------- | -------------------------- | ------- |
| `data`       | [models.Guardrail](/docs/agent-sdk/typescript/api-reference/models/guardrail)\[] | :heavy\_check\_mark: | List of guardrails         |         |
| `totalCount` | *number*                                                                    | :heavy\_check\_mark: | Total number of guardrails | 25      |
