> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RankingsDailyResponse - TypeScript SDK

> RankingsDailyResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { RankingsDailyResponse } from "@openrouter/sdk/models";

let value: RankingsDailyResponse = {
  data: [
    {
      date: "2026-05-11",
      modelPermaslug: "openai/gpt-4o-2024-05-13",
      totalTokens: "12345678",
    },
    {
      date: "2026-05-11",
      modelPermaslug: "anthropic/claude-3.5-sonnet-20241022",
      totalTokens: "9876543",
    },
  ],
  meta: {
    asOf: "2026-05-12T02:00:00Z",
    endDate: "2026-05-11",
    startDate: "2026-04-12",
    version: "v1",
  },
};
```

## Fields

| Field  | Type                                                                                        | Required             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `data` | [models.RankingsDailyItem](/agent-sdk/typescript/api-reference/models/rankingsdailyitem)\[] | :heavy\_check\_mark: | Up to 51 rows per day — the top 50 public models by `total_tokens` for each UTC calendar date in the window, plus one aggregated `other` row summing every model outside that top 50 (omitted when the long tail is empty). Rows are sorted by `date` ascending, then by `total_tokens` descending, with `other` pinned last within its date. Ties between real models break alphabetically on `model_permaslug` so the order is stable across requests. |                                                                                                         |
| `meta` | [models.RankingsDailyMeta](/agent-sdk/typescript/api-reference/models/rankingsdailymeta)    | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `{"as_of": "2026-05-12T02:00:00Z","end_date": "2026-05-11","start_date": "2026-04-12","version": "v1"}` |
