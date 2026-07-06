> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# NamedToolChoice - TypeScript SDK

> NamedToolChoice method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { NamedToolChoice } from "@openrouter/sdk/models";

let value: NamedToolChoice = {
  type: "function",
  function: {
    name: "<value>",
  },
};
```

## Fields

| Field      | Type                                                                                   | Required             | Description |
| ---------- | -------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`     | *"function"*                                                                           | :heavy\_check\_mark: | N/A         |
| `function` | [models.NamedToolChoiceFunction](/agent-sdk/typescript/models/namedtoolchoicefunction) | :heavy\_check\_mark: | N/A         |
