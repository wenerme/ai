> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolChoiceTool - TypeScript SDK

> ToolChoiceTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolChoiceTool } from "@openrouter/sdk/models";

let value: ToolChoiceTool = {
  name: "<value>",
  type: "tool",
};
```

## Fields

| Field                    | Type      | Required             | Description |
| ------------------------ | --------- | -------------------- | ----------- |
| `disableParallelToolUse` | *boolean* | :heavy\_minus\_sign: | N/A         |
| `name`                   | *string*  | :heavy\_check\_mark: | N/A         |
| `type`                   | *"tool"*  | :heavy\_check\_mark: | N/A         |
