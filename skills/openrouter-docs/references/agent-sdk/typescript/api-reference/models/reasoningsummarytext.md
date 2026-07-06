> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningSummaryText - TypeScript SDK

> ReasoningSummaryText type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ReasoningSummaryText } from "@openrouter/sdk/models";

let value: ReasoningSummaryText = {
  text: "Analyzed the problem using first principles",
  type: "summary_text",
};
```

## Fields

| Field  | Type                                                                                                   | Required             | Description |
| ------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `text` | *string*                                                                                               | :heavy\_check\_mark: | N/A         |
| `type` | [models.ReasoningSummaryTextType](/agent-sdk/typescript/api-reference/models/reasoningsummarytexttype) | :heavy\_check\_mark: | N/A         |
