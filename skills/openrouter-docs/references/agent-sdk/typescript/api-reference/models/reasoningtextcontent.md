> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningTextContent - TypeScript SDK

> ReasoningTextContent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ReasoningTextContent } from "@openrouter/sdk/models";

let value: ReasoningTextContent = {
  text: "Let me think step by step about this problem...",
  type: "reasoning_text",
};
```

## Fields

| Field  | Type                                                                                                   | Required             | Description |
| ------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `text` | *string*                                                                                               | :heavy\_check\_mark: | N/A         |
| `type` | [models.ReasoningTextContentType](/agent-sdk/typescript/api-reference/models/reasoningtextcontenttype) | :heavy\_check\_mark: | N/A         |
