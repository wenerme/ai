> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentCacheControl - TypeScript SDK

> ChatContentCacheControl type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Cache control for the content part

## Example Usage

```typescript lines theme={null}
import { ChatContentCacheControl } from "@openrouter/sdk/models";

let value: ChatContentCacheControl = {
  type: "ephemeral",
};
```

## Fields

| Field  | Type                                                                                                         | Required             | Description | Example |
| ------ | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | ------- |
| `ttl`  | [models.AnthropicCacheControlTtl](/docs/agent-sdk/typescript/api-reference/models/anthropiccachecontrolttl)       | :heavy\_minus\_sign: | N/A         | 5m      |
| `type` | [models.ChatContentCacheControlType](/docs/agent-sdk/typescript/api-reference/models/chatcontentcachecontroltype) | :heavy\_check\_mark: | N/A         |         |
