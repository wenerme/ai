> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetUserActivityResponse - TypeScript SDK

> GetUserActivityResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Returns user activity data grouped by endpoint

## Example Usage

```typescript lines theme={null}
import { GetUserActivityResponse } from "@openrouter/sdk/models/operations";

let value: GetUserActivityResponse = {
  data: [
    {
      date: "2025-08-24",
      model: "openai/gpt-4.1",
      modelPermaslug: "openai/gpt-4.1-2025-04-14",
      endpointId: "550e8400-e29b-41d4-a716-446655440000",
      providerName: "OpenAI",
      usage: 0.015,
      byokUsageInference: 0.012,
      requests: 5,
      promptTokens: 50,
      completionTokens: 125,
      reasoningTokens: 25,
    },
  ],
};
```

## Fields

| Field  | Type                                                                | Required             | Description            |
| ------ | ------------------------------------------------------------------- | -------------------- | ---------------------- |
| `data` | [models.ActivityItem](/agent-sdk/typescript/models/activityitem)\[] | :heavy\_check\_mark: | List of activity items |
