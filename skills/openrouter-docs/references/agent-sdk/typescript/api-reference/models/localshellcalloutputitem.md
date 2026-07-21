> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# LocalShellCallOutputItem - TypeScript SDK

> LocalShellCallOutputItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Output from a local shell command execution

## Example Usage

```typescript lines theme={null}
import { LocalShellCallOutputItem } from "@openrouter/sdk/models";

let value: LocalShellCallOutputItem = {
  id: "output-abc123",
  output: "total 24\ndrwxr-xr-x  5 user  staff  160 Jan  1 12:00 .",
  type: "local_shell_call_output",
};
```

## Fields

| Field    | Type                                                                                                               | Required             | Description | Example   |
| -------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `id`     | *string*                                                                                                           | :heavy\_check\_mark: | N/A         |           |
| `output` | *string*                                                                                                           | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.LocalShellCallOutputItemStatus](/docs/agent-sdk/typescript/api-reference/models/localshellcalloutputitemstatus) | :heavy\_minus\_sign: | N/A         | completed |
| `type`   | [models.LocalShellCallOutputItemType](/docs/agent-sdk/typescript/api-reference/models/localshellcalloutputitemtype)     | :heavy\_check\_mark: | N/A         |           |
