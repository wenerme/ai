> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BaseInputsMessage - TypeScript SDK

> BaseInputsMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BaseInputsMessage } from "@openrouter/sdk/models";

let value: BaseInputsMessage = {
  content: "<value>",
  role: "user",
};
```

## Fields

| Field     | Type                                                                               | Required             | Description |
| --------- | ---------------------------------------------------------------------------------- | -------------------- | ----------- |
| `content` | *models.BaseInputsContent2*                                                        | :heavy\_check\_mark: | N/A         |
| `phase`   | *models.BaseInputsPhaseUnion*                                                      | :heavy\_minus\_sign: | N/A         |
| `role`    | *models.BaseInputsRoleUnion*                                                       | :heavy\_check\_mark: | N/A         |
| `type`    | [models.BaseInputsType](/docs/agent-sdk/typescript/api-reference/models/baseinputstype) | :heavy\_minus\_sign: | N/A         |
