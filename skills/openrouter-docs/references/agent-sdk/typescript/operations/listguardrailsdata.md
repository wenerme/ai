> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailsData - TypeScript SDK

> ListGuardrailsData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListGuardrailsData } from "@openrouter/sdk/models/operations";

let value: ListGuardrailsData = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Production Guardrail",
  createdAt: "2025-08-24T10:30:00Z",
};
```

## Fields

| Field              | Type                                                                                                   | Required             | Description                                                 | Example                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `id`               | *string*                                                                                               | :heavy\_check\_mark: | Unique identifier for the guardrail                         | 550e8400-e29b-41d4-a716-446655440000                                                                                       |
| `name`             | *string*                                                                                               | :heavy\_check\_mark: | Name of the guardrail                                       | Production Guardrail                                                                                                       |
| `description`      | *string*                                                                                               | :heavy\_minus\_sign: | Description of the guardrail                                | Guardrail for production environment                                                                                       |
| `limitUsd`         | *number*                                                                                               | :heavy\_minus\_sign: | Spending limit in USD                                       | 100                                                                                                                        |
| `resetInterval`    | [operations.ListGuardrailsResetInterval](/docs/agent-sdk/typescript/operations/listguardrailsresetinterval) | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly) | monthly                                                                                                                    |
| `allowedProviders` | *string*\[]                                                                                            | :heavy\_minus\_sign: | List of allowed provider IDs                                | \[<br />"openai",<br />"anthropic",<br />"google"<br />]                                                                   |
| `allowedModels`    | *string*\[]                                                                                            | :heavy\_minus\_sign: | Array of model canonical\_slugs (immutable identifiers)     | \[<br />"openai/gpt-5.2-20251211",<br />"anthropic/claude-4.5-opus-20251124",<br />"deepseek/deepseek-r1-0528:free"<br />] |
| `enforceZdr`       | *boolean*                                                                                              | :heavy\_minus\_sign: | Whether to enforce zero data retention                      | false                                                                                                                      |
| `createdAt`        | *string*                                                                                               | :heavy\_check\_mark: | ISO 8601 timestamp of when the guardrail was created        | 2025-08-24T10:30:00Z                                                                                                       |
| `updatedAt`        | *string*                                                                                               | :heavy\_minus\_sign: | ISO 8601 timestamp of when the guardrail was last updated   | 2025-08-24T15:45:00Z                                                                                                       |
