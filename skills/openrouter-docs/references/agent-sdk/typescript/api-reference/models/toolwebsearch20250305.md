> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolWebSearch20250305 - TypeScript SDK

> ToolWebSearch20250305 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolWebSearch20250305 } from "@openrouter/sdk/models";

let value: ToolWebSearch20250305 = {
  name: "web_search",
  type: "web_search_20250305",
};
```

## Fields

| Field            | Type                                                                                                                       | Required             | Description                                                                                                                                                                                                 | Example                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `allowedDomains` | *string*\[]                                                                                                                | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                                                                                                                            |
| `blockedDomains` | *string*\[]                                                                                                                | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                                                                                                                            |
| `cacheControl`   | [models.AnthropicCacheControlDirective](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective)         | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}`                                                                                                    |
| `maxUses`        | *number*                                                                                                                   | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                                                                                                                            |
| `name`           | [models.NameWebSearch1](/docs/agent-sdk/typescript/api-reference/models/namewebsearch1)                                         | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                                                                                                                            |
| `type`           | [models.TypeWebSearch20250305](/docs/agent-sdk/typescript/api-reference/models/typewebsearch20250305)                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                                                                                                                            |
| `userLocation`   | [models.AnthropicWebSearchToolUserLocation](/docs/agent-sdk/typescript/api-reference/models/anthropicwebsearchtooluserlocation) | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         | `{"city": "San Francisco","country": "US","region": "California","timezone": "America/Los_Angeles","type": "approximate"}` |
