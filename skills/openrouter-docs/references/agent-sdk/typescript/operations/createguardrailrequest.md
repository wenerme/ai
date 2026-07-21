> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateGuardrailRequest - TypeScript SDK

> CreateGuardrailRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: CreateGuardrailRequest = {
  name: "My New Guardrail",
};
```

## Fields

| Field              | Type                                                                                                                   | Required             | Description                                                   | Example                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`             | *string*                                                                                                               | :heavy\_check\_mark: | Name for the new guardrail                                    | My New Guardrail                                                                                                  |
| `description`      | *string*                                                                                                               | :heavy\_minus\_sign: | Description of the guardrail                                  | A guardrail for limiting API usage                                                                                |
| `limitUsd`         | *number*                                                                                                               | :heavy\_minus\_sign: | Spending limit in USD                                         | 50                                                                                                                |
| `resetInterval`    | [operations.CreateGuardrailResetIntervalRequest](/docs/agent-sdk/typescript/operations/createguardrailresetintervalrequest) | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly)   | monthly                                                                                                           |
| `allowedProviders` | *string*\[]                                                                                                            | :heavy\_minus\_sign: | List of allowed provider IDs                                  | \[<br />"openai",<br />"anthropic",<br />"deepseek"<br />]                                                        |
| `allowedModels`    | *string*\[]                                                                                                            | :heavy\_minus\_sign: | Array of model identifiers (slug or canonical\_slug accepted) | \[<br />"openai/gpt-5.2",<br />"anthropic/claude-4.5-opus-20251124",<br />"deepseek/deepseek-r1-0528:free"<br />] |
| `enforceZdr`       | *boolean*                                                                                                              | :heavy\_minus\_sign: | Whether to enforce zero data retention                        | false                                                                                                             |
