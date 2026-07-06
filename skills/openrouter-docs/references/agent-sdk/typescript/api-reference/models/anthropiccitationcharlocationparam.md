> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicCitationCharLocationParam - TypeScript SDK

> AnthropicCitationCharLocationParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicCitationCharLocationParam } from "@openrouter/sdk/models";

let value: AnthropicCitationCharLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endCharIndex: 18,
  startCharIndex: 0,
  type: "char_location",
};
```

## Fields

| Field            | Type               | Required             | Description |
| ---------------- | ------------------ | -------------------- | ----------- |
| `citedText`      | *string*           | :heavy\_check\_mark: | N/A         |
| `documentIndex`  | *number*           | :heavy\_check\_mark: | N/A         |
| `documentTitle`  | *string*           | :heavy\_check\_mark: | N/A         |
| `endCharIndex`   | *number*           | :heavy\_check\_mark: | N/A         |
| `startCharIndex` | *number*           | :heavy\_check\_mark: | N/A         |
| `type`           | *"char\_location"* | :heavy\_check\_mark: | N/A         |
