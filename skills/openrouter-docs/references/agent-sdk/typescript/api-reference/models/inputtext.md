> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputText - TypeScript SDK

> InputText type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text input content item

## Example Usage

```typescript lines theme={null}
import { InputText } from "@openrouter/sdk/models";

let value: InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

## Fields

| Field  | Type            | Required             | Description |
| ------ | --------------- | -------------------- | ----------- |
| `text` | *string*        | :heavy\_check\_mark: | N/A         |
| `type` | *"input\_text"* | :heavy\_check\_mark: | N/A         |
