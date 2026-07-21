> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# LocalShellCallItemAction - TypeScript SDK

> LocalShellCallItemAction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { LocalShellCallItemAction } from "@openrouter/sdk/models";

let value: LocalShellCallItemAction = {
  command: [
    "<value 1>",
  ],
  env: {},
  type: "exec",
};
```

## Fields

| Field              | Type                                                                   | Required             | Description |
| ------------------ | ---------------------------------------------------------------------- | -------------------- | ----------- |
| `command`          | *string*\[]                                                            | :heavy\_check\_mark: | N/A         |
| `env`              | `Record<string, *string*>`                                             | :heavy\_check\_mark: | N/A         |
| `timeoutMs`        | *number*                                                               | :heavy\_minus\_sign: | N/A         |
| `type`             | [models.TypeExec](/docs/agent-sdk/typescript/api-reference/models/typeexec) | :heavy\_check\_mark: | N/A         |
| `user`             | *string*                                                               | :heavy\_minus\_sign: | N/A         |
| `workingDirectory` | *string*                                                               | :heavy\_minus\_sign: | N/A         |
