> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RankingsDailyItem - TypeScript SDK

> RankingsDailyItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { RankingsDailyItem } from "@openrouter/sdk/models";

let value: RankingsDailyItem = {
  date: "2026-05-11",
  modelPermaslug: "openai/gpt-4o-2024-05-13",
  totalTokens: "12345678",
};
```

## Fields

| Field            | Type     | Required             | Description                                                                                                                                                                                                                                                                                                                             | Example                  |
| ---------------- | -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `date`           | *string* | :heavy\_check\_mark: | UTC calendar date the row is aggregated over (YYYY-MM-DD).                                                                                                                                                                                                                                                                              | 2026-05-11               |
| `modelPermaslug` | *string* | :heavy\_check\_mark: | Model variant permaslug (e.g. `openai/gpt-4o-2024-05-13`, `openai/gpt-4o-2024-05-13:free`). Non-default variants include a `:variant` suffix and are ranked as their own entry. The reserved value `other` denotes the aggregated row covering every model outside the daily top 50 for that date — always sorted last within its date. | openai/gpt-4o-2024-05-13 |
| `totalTokens`    | *string* | :heavy\_check\_mark: | Sum of `prompt_tokens + completion_tokens` for the day, returned as a decimal string so 64-bit values are not truncated.                                                                                                                                                                                                                | 12345678                 |
