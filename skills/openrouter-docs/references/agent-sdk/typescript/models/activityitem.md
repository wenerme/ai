> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ActivityItem - TypeScript SDK

> ActivityItem method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ActivityItem } from "@openrouter/sdk/models";

let value: ActivityItem = {
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
};
```

## Fields

| Field                | Type     | Required             | Description                                         | Example                              |
| -------------------- | -------- | -------------------- | --------------------------------------------------- | ------------------------------------ |
| `date`               | *string* | :heavy\_check\_mark: | Date of the activity (YYYY-MM-DD format)            | 2025-08-24                           |
| `model`              | *string* | :heavy\_check\_mark: | Model slug (e.g., "openai/gpt-4.1")                 | openai/gpt-4.1                       |
| `modelPermaslug`     | *string* | :heavy\_check\_mark: | Model permaslug (e.g., "openai/gpt-4.1-2025-04-14") | openai/gpt-4.1-2025-04-14            |
| `endpointId`         | *string* | :heavy\_check\_mark: | Unique identifier for the endpoint                  | 550e8400-e29b-41d4-a716-446655440000 |
| `providerName`       | *string* | :heavy\_check\_mark: | Name of the provider serving this endpoint          | OpenAI                               |
| `usage`              | *number* | :heavy\_check\_mark: | Total cost in USD (OpenRouter credits spent)        | 0.015                                |
| `byokUsageInference` | *number* | :heavy\_check\_mark: | BYOK inference cost in USD (external credits spent) | 0.012                                |
| `requests`           | *number* | :heavy\_check\_mark: | Number of requests made                             | 5                                    |
| `promptTokens`       | *number* | :heavy\_check\_mark: | Total prompt tokens used                            | 50                                   |
| `completionTokens`   | *number* | :heavy\_check\_mark: | Total completion tokens generated                   | 125                                  |
| `reasoningTokens`    | *number* | :heavy\_check\_mark: | Total reasoning tokens used                         | 25                                   |
