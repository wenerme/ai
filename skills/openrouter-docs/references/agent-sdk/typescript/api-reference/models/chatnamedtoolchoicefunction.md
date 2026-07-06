> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatNamedToolChoiceFunction - TypeScript SDK

> ChatNamedToolChoiceFunction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatNamedToolChoiceFunction } from "@openrouter/sdk/models";

let value: ChatNamedToolChoiceFunction = {
  name: "get_weather",
};
```

## Fields

| Field  | Type     | Required             | Description           | Example      |
| ------ | -------- | -------------------- | --------------------- | ------------ |
| `name` | *string* | :heavy\_check\_mark: | Function name to call | get\_weather |
