> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StopServerToolsWhenHasToolCall - TypeScript SDK

> StopServerToolsWhenHasToolCall type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stop after a tool with this name has been called.

## Example Usage

```typescript lines theme={null}
import { StopServerToolsWhenHasToolCall } from "@openrouter/sdk/models";

let value: StopServerToolsWhenHasToolCall = {
  toolName: "<value>",
  type: "has_tool_call",
};
```

## Fields

| Field      | Type                | Required             | Description |
| ---------- | ------------------- | -------------------- | ----------- |
| `toolName` | *string*            | :heavy\_check\_mark: | N/A         |
| `type`     | *"has\_tool\_call"* | :heavy\_check\_mark: | N/A         |
