> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateGuardrailResponse - TypeScript SDK

> CreateGuardrailResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Guardrail created successfully

## Example Usage

```typescript lines theme={null}
import { CreateGuardrailResponse } from "@openrouter/sdk/models/operations";

let value: CreateGuardrailResponse = {
  data: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "My New Guardrail",
    createdAt: "2025-08-24T10:30:00Z",
  },
};
```

## Fields

| Field  | Type                                                                                   | Required             | Description           | Example                                                                                                                                                                                                                                                                                                                                                       |
| ------ | -------------------------------------------------------------------------------------- | -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [operations.CreateGuardrailData](/agent-sdk/typescript/operations/createguardraildata) | :heavy\_check\_mark: | The created guardrail | `{"id": "550e8400-e29b-41d4-a716-446655440000","name": "Production Guardrail","description": "Guardrail for production environment","limit_usd": 100,"reset_interval": "monthly","allowed_providers": ["openai","anthropic","google"],"allowed_models": null,"enforce_zdr": false,"created_at": "2025-08-24T10:30:00Z","updated_at": "2025-08-24T15:45:00Z"}` |
