> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolTextEditor20250124 - TypeScript SDK

> ToolTextEditor20250124 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolTextEditor20250124 } from "@openrouter/sdk/models";

let value: ToolTextEditor20250124 = {
  name: "str_replace_editor",
  type: "text_editor_20250124",
};
```

## Fields

| Field          | Type                                                                                                               | Required             | Description                                                                                                                                                                                                 | Example                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `cacheControl` | [models.AnthropicCacheControlDirective](/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective) | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `name`         | [models.NameStrReplaceEditor](/agent-sdk/typescript/api-reference/models/namestrreplaceeditor)                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`         | [models.TypeTextEditor20250124](/agent-sdk/typescript/api-reference/models/typetexteditor20250124)                 | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
