> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ShellCallItem - TypeScript SDK

> ShellCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A shell command execution call (newer variant)

## Example Usage

```typescript lines theme={null}
import { ShellCallItem } from "@openrouter/sdk/models";

let value: ShellCallItem = {
  action: {
    commands: [
      "ls",
      "-la",
    ],
  },
  callId: "call-abc123",
  type: "shell_call",
};
```

## Fields

| Field         | Type                                                                                         | Required             | Description | Example   |
| ------------- | -------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `action`      | [models.ShellCallItemAction](/docs/agent-sdk/typescript/api-reference/models/shellcallitemaction) | :heavy\_check\_mark: | N/A         |           |
| `callId`      | *string*                                                                                     | :heavy\_check\_mark: | N/A         |           |
| `environment` | *any*                                                                                        | :heavy\_minus\_sign: | N/A         |           |
| `id`          | *string*                                                                                     | :heavy\_minus\_sign: | N/A         |           |
| `status`      | [models.ShellCallItemStatus](/docs/agent-sdk/typescript/api-reference/models/shellcallitemstatus) | :heavy\_minus\_sign: | N/A         | completed |
| `type`        | [models.ShellCallItemType](/docs/agent-sdk/typescript/api-reference/models/shellcallitemtype)     | :heavy\_check\_mark: | N/A         |           |
