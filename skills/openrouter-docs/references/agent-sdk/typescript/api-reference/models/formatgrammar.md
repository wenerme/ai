> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FormatGrammar - TypeScript SDK

> FormatGrammar type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FormatGrammar } from "@openrouter/sdk/models";

let value: FormatGrammar = {
  definition: "<value>",
  syntax: "lark",
  type: "grammar",
};
```

## Fields

| Field        | Type                                                               | Required             | Description |
| ------------ | ------------------------------------------------------------------ | -------------------- | ----------- |
| `definition` | *string*                                                           | :heavy\_check\_mark: | N/A         |
| `syntax`     | [models.Syntax](/agent-sdk/typescript/api-reference/models/syntax) | :heavy\_check\_mark: | N/A         |
| `type`       | *"grammar"*                                                        | :heavy\_check\_mark: | N/A         |
