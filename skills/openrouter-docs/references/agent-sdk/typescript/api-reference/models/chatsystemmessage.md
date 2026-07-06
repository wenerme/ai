> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatSystemMessage - TypeScript SDK

> ChatSystemMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

System message for setting behavior

## Example Usage

```typescript lines theme={null}
import { ChatSystemMessage } from "@openrouter/sdk/models";

let value: ChatSystemMessage = {
  content: "What is the capital of France?",
  role: "system",
};
```

## Fields

| Field     | Type                              | Required             | Description                          | Example                      |
| --------- | --------------------------------- | -------------------- | ------------------------------------ | ---------------------------- |
| `content` | *models.ChatSystemMessageContent* | :heavy\_check\_mark: | System message content               | You are a helpful assistant. |
| `name`    | *string*                          | :heavy\_minus\_sign: | Optional name for the system message | Assistant Config             |
| `role`    | *"system"*                        | :heavy\_check\_mark: | N/A                                  |                              |
