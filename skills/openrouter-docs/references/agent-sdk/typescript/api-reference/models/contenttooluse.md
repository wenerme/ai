> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentToolUse - TypeScript SDK

> ContentToolUse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentToolUse } from "@openrouter/sdk/models";

let value: ContentToolUse = {
  id: "<id>",
  name: "<value>",
  type: "tool_use",
};
```

## Fields

| Field          | Type                                                                                                               | Required             | Description                                                                                                                                                                                                 | Example                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `cacheControl` | [models.AnthropicCacheControlDirective](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective) | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `id`           | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `input`        | *any*                                                                                                              | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                         |
| `name`         | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`         | *"tool\_use"*                                                                                                      | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
