> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesOutputConfigFormat - TypeScript SDK

> MessagesOutputConfigFormat type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A schema to specify Claude's output format in responses. See [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).

## Example Usage

```typescript lines theme={null}
import { MessagesOutputConfigFormat } from "@openrouter/sdk/models";

let value: MessagesOutputConfigFormat = {
  schema: {},
  type: "json_schema",
};
```

## Fields

| Field    | Type                                                                                                                       | Required             | Description |
| -------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `schema` | `Record<string, *any*>`                                                                                                    | :heavy\_check\_mark: | N/A         |
| `type`   | [models.MessagesOutputConfigTypeJSONSchema](/docs/agent-sdk/typescript/api-reference/models/messagesoutputconfigtypejsonschema) | :heavy\_check\_mark: | N/A         |
