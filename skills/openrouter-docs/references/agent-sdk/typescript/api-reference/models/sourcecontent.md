> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SourceContent - TypeScript SDK

> SourceContent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { SourceContent } from "@openrouter/sdk/models";

let value: SourceContent = {
  content: "<value>",
  type: "content",
};
```

## Fields

| Field     | Type                                         | Required             | Description |
| --------- | -------------------------------------------- | -------------------- | ----------- |
| `content` | *models.AnthropicDocumentBlockParamContent2* | :heavy\_check\_mark: | N/A         |
| `type`    | *"content"*                                  | :heavy\_check\_mark: | N/A         |
