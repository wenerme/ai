> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicBase64PdfSource - TypeScript SDK

> AnthropicBase64PdfSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicBase64PdfSource } from "@openrouter/sdk/models";

let value: AnthropicBase64PdfSource = {
  data: "JVBERi0x...",
  mediaType: "application/pdf",
  type: "base64",
};
```

## Fields

| Field       | Type                                                                                                                     | Required             | Description |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `data`      | *string*                                                                                                                 | :heavy\_check\_mark: | N/A         |
| `mediaType` | [models.AnthropicBase64PdfSourceMediaType](/docs/agent-sdk/typescript/api-reference/models/anthropicbase64pdfsourcemediatype) | :heavy\_check\_mark: | N/A         |
| `type`      | *"base64"*                                                                                                               | :heavy\_check\_mark: | N/A         |
