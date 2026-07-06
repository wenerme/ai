> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicCitationContentBlockLocationParam - TypeScript SDK

> AnthropicCitationContentBlockLocationParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicCitationContentBlockLocationParam } from "@openrouter/sdk/models";

let value: AnthropicCitationContentBlockLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endBlockIndex: 1,
  startBlockIndex: 0,
  type: "content_block_location",
};
```

## Fields

| Field             | Type                         | Required             | Description |
| ----------------- | ---------------------------- | -------------------- | ----------- |
| `citedText`       | *string*                     | :heavy\_check\_mark: | N/A         |
| `documentIndex`   | *number*                     | :heavy\_check\_mark: | N/A         |
| `documentTitle`   | *string*                     | :heavy\_check\_mark: | N/A         |
| `endBlockIndex`   | *number*                     | :heavy\_check\_mark: | N/A         |
| `startBlockIndex` | *number*                     | :heavy\_check\_mark: | N/A         |
| `type`            | *"content\_block\_location"* | :heavy\_check\_mark: | N/A         |
