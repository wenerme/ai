> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesOutputConfig - TypeScript SDK

> MessagesOutputConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for controlling output behavior. Supports the effort parameter and structured output format.

## Example Usage

```typescript lines theme={null}
import { MessagesOutputConfig } from "@openrouter/sdk/models";

let value: MessagesOutputConfig = {};
```

## Fields

| Field        | Type                                                                                                       | Required             | Description                                                                                                                                                                                     | Example                              |
| ------------ | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `effort`     | [models.MessagesOutputConfigEffort](/agent-sdk/typescript/api-reference/models/messagesoutputconfigeffort) | :heavy\_minus\_sign: | How much effort the model should put into its response. Higher effort levels may result in more thorough analysis but take longer. Valid values are `low`, `medium`, `high`, `xhigh`, or `max`. | medium                               |
| `format`     | [models.MessagesOutputConfigFormat](/agent-sdk/typescript/api-reference/models/messagesoutputconfigformat) | :heavy\_minus\_sign: | A schema to specify Claude's output format in responses. See [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).                                    |                                      |
| `taskBudget` | [models.TaskBudget](/agent-sdk/typescript/api-reference/models/taskbudget)                                 | :heavy\_minus\_sign: | Task budget for an agentic turn. The model sees a countdown of remaining tokens and uses it to prioritize work and wind down gracefully. Advisory — does not enforce a hard cap.                | `{"total": 400000,"type": "tokens"}` |
