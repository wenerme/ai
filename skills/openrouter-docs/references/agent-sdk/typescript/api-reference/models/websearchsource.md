> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchSource - TypeScript SDK

> WebSearchSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { WebSearchSource } from "@openrouter/sdk/models";

let value: WebSearchSource = {
  type: "url",
  url: "https://example.com/article",
};
```

## Fields

| Field  | Type                                                                                         | Required             | Description |
| ------ | -------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type` | [models.WebSearchSourceType](/docs/agent-sdk/typescript/api-reference/models/websearchsourcetype) | :heavy\_check\_mark: | N/A         |
| `url`  | *string*                                                                                     | :heavy\_check\_mark: | N/A         |
