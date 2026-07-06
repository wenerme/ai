> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SystemMessage - TypeScript SDK

> SystemMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { SystemMessage } from "@openrouter/sdk/models";

let value: SystemMessage = {
  role: "system",
  content: [],
};
```

## Fields

| Field     | Type                          | Required             | Description |
| --------- | ----------------------------- | -------------------- | ----------- |
| `role`    | *"system"*                    | :heavy\_check\_mark: | N/A         |
| `content` | *models.SystemMessageContent* | :heavy\_check\_mark: | N/A         |
| `name`    | *string*                      | :heavy\_minus\_sign: | N/A         |
