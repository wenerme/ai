> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatDeveloperMessage - TypeScript SDK

> ChatDeveloperMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Developer message

## Example Usage

```typescript lines theme={null}
import { ChatDeveloperMessage } from "@openrouter/sdk/models";

let value: ChatDeveloperMessage = {
  content: "What is the capital of France?",
  role: "developer",
};
```

## Fields

| Field     | Type                                 | Required             | Description                             | Example                               |
| --------- | ------------------------------------ | -------------------- | --------------------------------------- | ------------------------------------- |
| `content` | *models.ChatDeveloperMessageContent* | :heavy\_check\_mark: | Developer message content               | This is a message from the developer. |
| `name`    | *string*                             | :heavy\_minus\_sign: | Optional name for the developer message | Developer                             |
| `role`    | *"developer"*                        | :heavy\_check\_mark: | N/A                                     |                                       |
