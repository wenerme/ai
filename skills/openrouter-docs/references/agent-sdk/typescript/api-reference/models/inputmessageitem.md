> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputMessageItem - TypeScript SDK

> InputMessageItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { InputMessageItem } from "@openrouter/sdk/models";

let value: InputMessageItem = {
  role: "user",
};
```

## Fields

| Field     | Type                                                                                                         | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `content` | *models.InputMessageItemContentUnion*\[]                                                                     | :heavy\_minus\_sign: | N/A         |
| `id`      | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `role`    | *models.InputMessageItemRoleUnion*                                                                           | :heavy\_check\_mark: | N/A         |
| `type`    | [models.InputMessageItemTypeMessage](/agent-sdk/typescript/api-reference/models/inputmessageitemtypemessage) | :heavy\_minus\_sign: | N/A         |
