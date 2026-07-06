> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseInputText - TypeScript SDK

> ResponseInputText method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text input content item

## Example Usage

```typescript lines theme={null}
import { ResponseInputText } from "@openrouter/sdk/models";

let value: ResponseInputText = {
  type: "input_text",
  text: "Hello, how can I help you?",
};
```

## Fields

| Field  | Type            | Required             | Description |
| ------ | --------------- | -------------------- | ----------- |
| `type` | *"input\_text"* | :heavy\_check\_mark: | N/A         |
| `text` | *string*        | :heavy\_check\_mark: | N/A         |
