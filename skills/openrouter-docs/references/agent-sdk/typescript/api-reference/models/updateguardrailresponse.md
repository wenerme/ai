> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateGuardrailResponse - TypeScript SDK

> UpdateGuardrailResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateGuardrailResponse } from "@openrouter/sdk/models";

let value: UpdateGuardrailResponse = {
  data: {
    createdAt: "2025-08-24T10:30:00Z",
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Updated Guardrail Name",
    workspaceId: "0df9e665-d932-5740-b2c7-b52af166bc11",
  },
};
```

## Fields

| Field  | Type                                                                     | Required             | Description | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------------------------------------------------------------------------ | -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data` | [models.Guardrail](/agent-sdk/typescript/api-reference/models/guardrail) | :heavy\_check\_mark: | N/A         | `{"allowed_models": null,"allowed_providers": ["openai","anthropic","google"],"content_filter_builtins": [{"action": "redact","label": "[EMAIL]","slug": "email"}`<br />],<br />"content\_filters": null,<br />"created\_at": "2025-08-24T10:30:00Z",<br />"description": "Guardrail for production environment",<br />"enforce\_zdr": null,<br />"enforce\_zdr\_anthropic": true,<br />"enforce\_zdr\_google": false,<br />"enforce\_zdr\_openai": true,<br />"enforce\_zdr\_other": false,<br />"id": "550e8400-e29b-41d4-a716-446655440000",<br />"ignored\_models": null,<br />"ignored\_providers": null,<br />"limit\_usd": 100,<br />"name": "Production Guardrail",<br />"reset\_interval": "monthly",<br />"updated\_at": "2025-08-24T15:45:00Z",<br />"workspace\_id": "0df9e665-d932-5740-b2c7-b52af166bc11"<br />} |
