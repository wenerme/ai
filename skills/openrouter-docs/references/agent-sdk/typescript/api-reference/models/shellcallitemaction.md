> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ShellCallItemAction - TypeScript SDK

> ShellCallItemAction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ShellCallItemAction } from "@openrouter/sdk/models";

let value: ShellCallItemAction = {
  commands: [],
};
```

## Fields

| Field             | Type        | Required             | Description |
| ----------------- | ----------- | -------------------- | ----------- |
| `commands`        | *string*\[] | :heavy\_check\_mark: | N/A         |
| `maxOutputLength` | *number*    | :heavy\_minus\_sign: | N/A         |
| `timeoutMs`       | *number*    | :heavy\_minus\_sign: | N/A         |
