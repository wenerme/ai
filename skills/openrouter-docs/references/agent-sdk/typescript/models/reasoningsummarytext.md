> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningSummaryText - TypeScript SDK

> ReasoningSummaryText method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ReasoningSummaryText } from "@openrouter/sdk/models";

let value: ReasoningSummaryText = {
  type: "summary_text",
  text: "Analyzed the problem using first principles",
};
```

## Fields

| Field  | Type                                                                                     | Required             | Description |
| ------ | ---------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type` | [models.ReasoningSummaryTextType](/agent-sdk/typescript/models/reasoningsummarytexttype) | :heavy\_check\_mark: | N/A         |
| `text` | *string*                                                                                 | :heavy\_check\_mark: | N/A         |
