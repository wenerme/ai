> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolChoiceAuto - TypeScript SDK

> ToolChoiceAuto type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolChoiceAuto } from "@openrouter/sdk/models";

let value: ToolChoiceAuto = {
  type: "auto",
};
```

## Fields

| Field                    | Type      | Required             | Description |
| ------------------------ | --------- | -------------------- | ----------- |
| `disableParallelToolUse` | *boolean* | :heavy\_minus\_sign: | N/A         |
| `type`                   | *"auto"*  | :heavy\_check\_mark: | N/A         |
