> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicImageBlockParam - TypeScript SDK

> AnthropicImageBlockParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicImageBlockParam } from "@openrouter/sdk/models";

let value: AnthropicImageBlockParam = {
  source: {
    data: "/9j/4AAQ...",
    mediaType: "image/jpeg",
    type: "base64",
  },
  type: "image",
};
```

## Fields

| Field          | Type                                                                                                               | Required             | Description                                                                                                                                                                                                 | Example                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `cacheControl` | [models.AnthropicCacheControlDirective](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective) | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `source`       | *models.AnthropicImageBlockParamSource*                                                                            | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`         | *"image"*                                                                                                          | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
