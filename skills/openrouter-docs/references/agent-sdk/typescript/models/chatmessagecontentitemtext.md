> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItemText - TypeScript SDK

> ChatMessageContentItemText method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageContentItemText } from "@openrouter/sdk/models";

let value: ChatMessageContentItemText = {
  type: "text",
  text: "<value>",
};
```

## Fields

| Field          | Type                                                                                                         | Required             | Description |
| -------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`         | *"text"*                                                                                                     | :heavy\_check\_mark: | N/A         |
| `text`         | *string*                                                                                                     | :heavy\_check\_mark: | N/A         |
| `cacheControl` | [models.ChatMessageContentItemCacheControl](/docs/agent-sdk/typescript/models/chatmessagecontentitemcachecontrol) | :heavy\_minus\_sign: | N/A         |
