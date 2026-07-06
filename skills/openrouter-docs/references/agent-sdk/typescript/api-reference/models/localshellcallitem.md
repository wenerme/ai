> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# LocalShellCallItem - TypeScript SDK

> LocalShellCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A local shell command execution call

## Example Usage

```typescript lines theme={null}
import { LocalShellCallItem } from "@openrouter/sdk/models";

let value: LocalShellCallItem = {
  action: {
    command: [
      "ls",
      "-la",
    ],
    env: {
      "PATH": "/usr/bin",
    },
    type: "exec",
  },
  callId: "call-abc123",
  id: "shell-abc123",
  status: "completed",
  type: "local_shell_call",
};
```

## Fields

| Field    | Type                                                                                                   | Required             | Description | Example   |
| -------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `action` | [models.LocalShellCallItemAction](/agent-sdk/typescript/api-reference/models/localshellcallitemaction) | :heavy\_check\_mark: | N/A         |           |
| `callId` | *string*                                                                                               | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                               | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                     | :heavy\_check\_mark: | N/A         | completed |
| `type`   | [models.TypeLocalShellCall](/agent-sdk/typescript/api-reference/models/typelocalshellcall)             | :heavy\_check\_mark: | N/A         |           |
