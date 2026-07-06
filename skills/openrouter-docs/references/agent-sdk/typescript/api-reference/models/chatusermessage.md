> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatUserMessage - TypeScript SDK

> ChatUserMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

User message

## Example Usage

```typescript lines theme={null}
import { ChatUserMessage } from "@openrouter/sdk/models";

let value: ChatUserMessage = {
  content: "What is the capital of France?",
  role: "user",
};
```

## Fields

| Field     | Type                            | Required             | Description                | Example                        |
| --------- | ------------------------------- | -------------------- | -------------------------- | ------------------------------ |
| `content` | *models.ChatUserMessageContent* | :heavy\_check\_mark: | User message content       | What is the capital of France? |
| `name`    | *string*                        | :heavy\_minus\_sign: | Optional name for the user | User                           |
| `role`    | *"user"*                        | :heavy\_check\_mark: | N/A                        |                                |
