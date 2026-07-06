> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatServerToolChoice - TypeScript SDK

> ChatServerToolChoice type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter extension: force a specific server tool by naming it directly in `tool_choice.type` instead of wrapping it in `{ type: "function", function: { name } }`.

## Example Usage

```typescript lines theme={null}
import { ChatServerToolChoice } from "@openrouter/sdk/models";

let value: ChatServerToolChoice = {
  type: "openrouter:web_search",
};
```

## Fields

| Field  | Type     | Required             | Description                                                                                              | Example                |
| ------ | -------- | -------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------- |
| `type` | *string* | :heavy\_check\_mark: | OpenRouter server-tool type to force (e.g. `openrouter:web_search`, `web_search`, `web_search_preview`). | openrouter:web\_search |
