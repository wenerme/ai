> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicSearchResultBlockParam - TypeScript SDK

> AnthropicSearchResultBlockParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicSearchResultBlockParam } from "@openrouter/sdk/models";

let value: AnthropicSearchResultBlockParam = {
  content: [
    {
      text: "Result content",
      type: "text",
    },
  ],
  source: "example_source",
  title: "Example Result",
  type: "search_result",
};
```

## Fields

| Field          | Type                                                                                                                                   | Required             | Description                                                                                                                                                                                                 | Example                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `cacheControl` | [models.AnthropicCacheControlDirective](/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective)                     | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `citations`    | [models.AnthropicSearchResultBlockParamCitations](/agent-sdk/typescript/api-reference/models/anthropicsearchresultblockparamcitations) | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                         |
| `content`      | [models.AnthropicTextBlockParam](/agent-sdk/typescript/api-reference/models/anthropictextblockparam)\[]                                | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `source`       | *string*                                                                                                                               | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `title`        | *string*                                                                                                                               | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`         | *"search\_result"*                                                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
