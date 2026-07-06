> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolResponseMessage - TypeScript SDK

> ToolResponseMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ToolResponseMessage } from "@openrouter/sdk/models";

let value: ToolResponseMessage = {
  role: "tool",
  content: [],
  toolCallId: "<id>",
};
```

## Fields

| Field        | Type                                | Required             | Description |
| ------------ | ----------------------------------- | -------------------- | ----------- |
| `role`       | *"tool"*                            | :heavy\_check\_mark: | N/A         |
| `content`    | *models.ToolResponseMessageContent* | :heavy\_check\_mark: | N/A         |
| `toolCallId` | *string*                            | :heavy\_check\_mark: | N/A         |
