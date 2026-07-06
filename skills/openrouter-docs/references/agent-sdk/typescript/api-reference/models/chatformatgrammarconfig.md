> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatFormatGrammarConfig - TypeScript SDK

> ChatFormatGrammarConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Custom grammar response format

## Example Usage

```typescript lines theme={null}
import { ChatFormatGrammarConfig } from "@openrouter/sdk/models";

let value: ChatFormatGrammarConfig = {
  grammar: "root ::= \"yes\" | \"no\"",
  type: "grammar",
};
```

## Fields

| Field     | Type        | Required             | Description                        | Example                |
| --------- | ----------- | -------------------- | ---------------------------------- | ---------------------- |
| `grammar` | *string*    | :heavy\_check\_mark: | Custom grammar for text generation | root ::= "yes" \| "no" |
| `type`    | *"grammar"* | :heavy\_check\_mark: | N/A                                |                        |
