> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesMessageParamContentUnion3 - TypeScript SDK

> MessagesMessageParamContentUnion3 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.AnthropicWebSearchResultBlockParam[]`

```typescript lines theme={null}
const value: models.AnthropicWebSearchResultBlockParam[] = [
  {
    encryptedContent: "enc_content_0",
    title: "Example Page",
    type: "web_search_result",
    url: "https://example.com",
  },
];
```

### `models.ContentWebSearchToolResultError`

```typescript lines theme={null}
const value: models.ContentWebSearchToolResultError = {
  errorCode: "unavailable",
  type: "web_search_tool_result_error",
};
```
