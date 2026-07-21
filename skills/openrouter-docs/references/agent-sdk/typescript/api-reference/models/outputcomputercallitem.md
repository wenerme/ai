> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputComputerCallItem - TypeScript SDK

> OutputComputerCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputComputerCallItem } from "@openrouter/sdk/models";

let value: OutputComputerCallItem = {
  callId: "call-abc123",
  pendingSafetyChecks: [],
  status: "completed",
  type: "computer_call",
};
```

## Fields

| Field                 | Type                                                                                                           | Required             | Description |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `action`              | *any*                                                                                                          | :heavy\_minus\_sign: | N/A         |
| `callId`              | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |
| `id`                  | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |
| `pendingSafetyChecks` | [models.PendingSafetyCheck](/docs/agent-sdk/typescript/api-reference/models/pendingsafetycheck)\[]                  | :heavy\_check\_mark: | N/A         |
| `status`              | [models.OutputComputerCallItemStatus](/docs/agent-sdk/typescript/api-reference/models/outputcomputercallitemstatus) | :heavy\_check\_mark: | N/A         |
| `type`                | [models.OutputComputerCallItemType](/docs/agent-sdk/typescript/api-reference/models/outputcomputercallitemtype)     | :heavy\_check\_mark: | N/A         |
