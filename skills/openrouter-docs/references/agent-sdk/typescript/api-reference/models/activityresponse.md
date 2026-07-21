> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ActivityResponse - TypeScript SDK

> ActivityResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ActivityResponse } from "@openrouter/sdk/models";

let value: ActivityResponse = {
  data: [
    {
      byokUsageInference: 0.012,
      completionTokens: 125,
      date: "2025-08-24",
      endpointId: "550e8400-e29b-41d4-a716-446655440000",
      model: "openai/gpt-4.1",
      modelPermaslug: "openai/gpt-4.1-2025-04-14",
      promptTokens: 50,
      providerName: "OpenAI",
      reasoningTokens: 25,
      requests: 5,
      usage: 0.015,
    },
  ],
};
```

## Fields

| Field  | Type                                                                              | Required             | Description            |
| ------ | --------------------------------------------------------------------------------- | -------------------- | ---------------------- |
| `data` | [models.ActivityItem](/docs/agent-sdk/typescript/api-reference/models/activityitem)\[] | :heavy\_check\_mark: | List of activity items |
