> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateGuardrailRequestBody - TypeScript SDK

> UpdateGuardrailRequestBody method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateGuardrailRequestBody } from "@openrouter/sdk/models/operations";

let value: UpdateGuardrailRequestBody = {};
```

## Fields

| Field              | Type                                                                                                                   | Required             | Description                                                   | Example                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| `name`             | *string*                                                                                                               | :heavy\_minus\_sign: | New name for the guardrail                                    | Updated Guardrail Name                                     |
| `description`      | *string*                                                                                                               | :heavy\_minus\_sign: | New description for the guardrail                             | Updated description                                        |
| `limitUsd`         | *number*                                                                                                               | :heavy\_minus\_sign: | New spending limit in USD                                     | 75                                                         |
| `resetInterval`    | [operations.UpdateGuardrailResetIntervalRequest](/docs/agent-sdk/typescript/operations/updateguardrailresetintervalrequest) | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly)   | monthly                                                    |
| `allowedProviders` | *string*\[]                                                                                                            | :heavy\_minus\_sign: | New list of allowed provider IDs                              | \[<br />"openai",<br />"anthropic",<br />"deepseek"<br />] |
| `allowedModels`    | *string*\[]                                                                                                            | :heavy\_minus\_sign: | Array of model identifiers (slug or canonical\_slug accepted) | \[<br />"openai/gpt-5.2"<br />]                            |
| `enforceZdr`       | *boolean*                                                                                                              | :heavy\_minus\_sign: | Whether to enforce zero data retention                        | true                                                       |
