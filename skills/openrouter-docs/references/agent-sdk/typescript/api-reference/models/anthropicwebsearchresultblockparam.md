> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicWebSearchResultBlockParam - TypeScript SDK

> AnthropicWebSearchResultBlockParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicWebSearchResultBlockParam } from "@openrouter/sdk/models";

let value: AnthropicWebSearchResultBlockParam = {
  encryptedContent: "enc_content_0",
  title: "Example Page",
  type: "web_search_result",
  url: "https://example.com",
};
```

## Fields

| Field              | Type                                                                                                                               | Required             | Description |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `encryptedContent` | *string*                                                                                                                           | :heavy\_check\_mark: | N/A         |
| `pageAge`          | *string*                                                                                                                           | :heavy\_minus\_sign: | N/A         |
| `title`            | *string*                                                                                                                           | :heavy\_check\_mark: | N/A         |
| `type`             | [models.AnthropicWebSearchResultBlockParamType](/agent-sdk/typescript/api-reference/models/anthropicwebsearchresultblockparamtype) | :heavy\_check\_mark: | N/A         |
| `url`              | *string*                                                                                                                           | :heavy\_check\_mark: | N/A         |
