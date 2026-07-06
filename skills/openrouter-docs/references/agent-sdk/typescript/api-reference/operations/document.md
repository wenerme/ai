> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Document - TypeScript SDK

> Document type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The document object containing the original text

## Example Usage

```typescript lines theme={null}
import { Document } from "@openrouter/sdk/models/operations";

let value: Document = {
  text: "Paris is the capital of France.",
};
```

## Fields

| Field  | Type     | Required             | Description       | Example                         |
| ------ | -------- | -------------------- | ----------------- | ------------------------------- |
| `text` | *string* | :heavy\_check\_mark: | The document text | Paris is the capital of France. |
