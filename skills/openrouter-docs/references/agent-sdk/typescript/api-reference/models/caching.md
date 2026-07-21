> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Caching - TypeScript SDK

> Caching type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Enable automatic prompt caching. When set at the top level, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models.

## Example Usage

```typescript lines theme={null}
import { Caching } from "@openrouter/sdk/models";

let value: Caching = {
  type: "ephemeral",
};
```

## Fields

| Field  | Type                                                                                                   | Required             | Description | Example |
| ------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | ------- |
| `ttl`  | [models.AnthropicCacheControlTtl](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontrolttl) | :heavy\_minus\_sign: | N/A         | 5m      |
| `type` | [models.ToolTypeEphemeral](/docs/agent-sdk/typescript/api-reference/models/tooltypeephemeral)               | :heavy\_check\_mark: | N/A         |         |
