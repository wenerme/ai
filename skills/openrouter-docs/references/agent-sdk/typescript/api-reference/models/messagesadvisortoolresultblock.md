> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesAdvisorToolResultBlock - TypeScript SDK

> MessagesAdvisorToolResultBlock type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Advisor tool result from a prior assistant turn, replayed back to the model on the next turn. Mirrors the block Anthropic returns in assistant content when the `advisor_20260301` tool runs.

## Example Usage

```typescript lines theme={null}
import { MessagesAdvisorToolResultBlock } from "@openrouter/sdk/models";

let value: MessagesAdvisorToolResultBlock = {
  content: {
    "text": "Advisor response text",
    "type": "advisor_result",
  },
  toolUseId: "srvtoolu_01abc",
  type: "advisor_tool_result",
};
```

## Fields

| Field       | Type                      | Required             | Description |
| ----------- | ------------------------- | -------------------- | ----------- |
| `content`   | `Record<string, *any*>`   | :heavy\_check\_mark: | N/A         |
| `toolUseId` | *string*                  | :heavy\_check\_mark: | N/A         |
| `type`      | *"advisor\_tool\_result"* | :heavy\_check\_mark: | N/A         |
