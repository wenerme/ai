> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessageDeveloper - TypeScript SDK

> MessageDeveloper method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { MessageDeveloper } from "@openrouter/sdk/models";

let value: MessageDeveloper = {
  role: "developer",
  content: [],
};
```

## Fields

| Field     | Type                    | Required             | Description |
| --------- | ----------------------- | -------------------- | ----------- |
| `role`    | *"developer"*           | :heavy\_check\_mark: | N/A         |
| `content` | *models.MessageContent* | :heavy\_check\_mark: | N/A         |
| `name`    | *string*                | :heavy\_minus\_sign: | N/A         |
