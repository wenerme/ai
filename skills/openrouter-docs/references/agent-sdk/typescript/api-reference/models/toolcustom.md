> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolCustom - TypeScript SDK

> ToolCustom type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolCustom } from "@openrouter/sdk/models";

let value: ToolCustom = {
  inputSchema: {},
  name: "<value>",
};
```

## Fields

| Field          | Type                                                                                                               | Required             | Description                                                                                                                                                                                                 | Example                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `cacheControl` | [models.AnthropicCacheControlDirective](/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective) | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `description`  | *string*                                                                                                           | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                         |
| `inputSchema`  | [models.InputSchema](/agent-sdk/typescript/api-reference/models/inputschema)                                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `name`         | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`         | [models.ToolTypeCustom](/agent-sdk/typescript/api-reference/models/tooltypecustom)                                 | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                         |
