> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicUrlPdfSource - TypeScript SDK

> AnthropicUrlPdfSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicUrlPdfSource } from "@openrouter/sdk/models";

let value: AnthropicUrlPdfSource = {
  type: "url",
  url: "https://example.com/document.pdf",
};
```

## Fields

| Field  | Type     | Required             | Description |
| ------ | -------- | -------------------- | ----------- |
| `type` | *"url"*  | :heavy\_check\_mark: | N/A         |
| `url`  | *string* | :heavy\_check\_mark: | N/A         |
