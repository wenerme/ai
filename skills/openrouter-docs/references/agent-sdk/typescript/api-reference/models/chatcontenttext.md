> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentText - TypeScript SDK

> ChatContentText type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text content part

## Example Usage

```typescript lines theme={null}
import { ChatContentText } from "@openrouter/sdk/models";

let value: ChatContentText = {
  text: "Hello, world!",
  type: "text",
};
```

## Fields

| Field          | Type                                                                                                 | Required             | Description                        | Example                             |
| -------------- | ---------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------- | ----------------------------------- |
| `cacheControl` | [models.ChatContentCacheControl](/docs/agent-sdk/typescript/api-reference/models/chatcontentcachecontrol) | :heavy\_minus\_sign: | Cache control for the content part | `{"ttl": "5m","type": "ephemeral"}` |
| `text`         | *string*                                                                                             | :heavy\_check\_mark: | N/A                                |                                     |
| `type`         | [models.ChatContentTextType](/docs/agent-sdk/typescript/api-reference/models/chatcontenttexttype)         | :heavy\_check\_mark: | N/A                                |                                     |
