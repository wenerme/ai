> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UserMessage - TypeScript SDK

> UserMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UserMessage } from "@openrouter/sdk/models";

let value: UserMessage = {
  role: "user",
  content: "<value>",
};
```

## Fields

| Field     | Type                        | Required             | Description |
| --------- | --------------------------- | -------------------- | ----------- |
| `role`    | *"user"*                    | :heavy\_check\_mark: | N/A         |
| `content` | *models.UserMessageContent* | :heavy\_check\_mark: | N/A         |
| `name`    | *string*                    | :heavy\_minus\_sign: | N/A         |
