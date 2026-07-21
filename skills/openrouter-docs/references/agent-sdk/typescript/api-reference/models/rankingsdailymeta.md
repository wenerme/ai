> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RankingsDailyMeta - TypeScript SDK

> RankingsDailyMeta type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { RankingsDailyMeta } from "@openrouter/sdk/models";

let value: RankingsDailyMeta = {
  asOf: "2026-05-12T02:00:00Z",
  endDate: "2026-05-11",
  startDate: "2026-04-12",
  version: "v1",
};
```

## Fields

| Field       | Type                                                                 | Required             | Description                                                                                                                                                   | Example              |
| ----------- | -------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `asOf`      | *string*                                                             | :heavy\_check\_mark: | ISO-8601 timestamp of when the response was generated. Reflects data-freshness because the underlying materialized view continuously ingests upstream events. | 2026-05-12T02:00:00Z |
| `endDate`   | *string*                                                             | :heavy\_check\_mark: | Resolved end of the date window (UTC, inclusive).                                                                                                             | 2026-05-11           |
| `startDate` | *string*                                                             | :heavy\_check\_mark: | Resolved start of the date window (UTC, inclusive).                                                                                                           | 2026-04-12           |
| `version`   | [models.Version](/docs/agent-sdk/typescript/api-reference/models/version) | :heavy\_check\_mark: | Dataset version. Field names and grain are stable for the life of `v1`.                                                                                       |                      |
