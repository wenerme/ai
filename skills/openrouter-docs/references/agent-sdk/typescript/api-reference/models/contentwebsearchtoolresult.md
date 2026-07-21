> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentWebSearchToolResult - TypeScript SDK

> ContentWebSearchToolResult type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentWebSearchToolResult } from "@openrouter/sdk/models";

let value: ContentWebSearchToolResult = {
  content: [
    {
      encryptedContent: "enc_content_0",
      title: "Example Page",
      type: "web_search_result",
      url: "https://example.com",
    },
  ],
  toolUseId: "<id>",
  type: "web_search_tool_result",
};
```

## Fields

| Field          | Type                                                                                                               | Required             | Description                                                                                                                                                                                                 | Example                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `cacheControl` | [models.AnthropicCacheControlDirective](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective) | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `content`      | *models.MessagesMessageParamContentUnion3*                                                                         | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `toolUseId`    | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`         | *"web\_search\_tool\_result"*                                                                                      | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
