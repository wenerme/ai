> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolAdvisor20260301 - TypeScript SDK

> ToolAdvisor20260301 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolAdvisor20260301 } from "@openrouter/sdk/models";

let value: ToolAdvisor20260301 = {
  model: "Fortwo",
  name: "advisor",
  type: "advisor_20260301",
};
```

## Fields

| Field            | Type                                                                                                               | Required             | Description                                                                                                                                                                                                 | Example                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `allowedCallers` | [models.AnthropicAllowedCallers](/docs/agent-sdk/typescript/api-reference/models/anthropicallowedcallers)\[]            | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         | \[<br />"direct"<br />] |
| `cacheControl`   | [models.AnthropicCacheControlDirective](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontroldirective) | :heavy\_minus\_sign: | Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models. | `{"type": "ephemeral"}` |
| `caching`        | [models.Caching](/docs/agent-sdk/typescript/api-reference/models/caching)                                               | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         | `{"type": "ephemeral"}` |
| `deferLoading`   | *boolean*                                                                                                          | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                         |
| `maxUses`        | *number*                                                                                                           | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                         |                         |
| `model`          | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `name`           | [models.NameAdvisor](/docs/agent-sdk/typescript/api-reference/models/nameadvisor)                                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
| `type`           | [models.TypeAdvisor20260301](/docs/agent-sdk/typescript/api-reference/models/typeadvisor20260301)                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                         |                         |
