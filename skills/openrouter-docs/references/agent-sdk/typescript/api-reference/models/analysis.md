> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Analysis - TypeScript SDK

> Analysis type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Structured analysis produced by the fusion judge model.

## Example Usage

```typescript expandable lines theme={null}
import { Analysis } from "@openrouter/sdk/models";

let value: Analysis = {
  blindSpots: [],
  consensus: [
    "<value 1>",
  ],
  contradictions: [
    {
      stances: [
        {
          model: "Roadster",
          stance: "<value>",
        },
      ],
      topic: "<value>",
    },
  ],
  partialCoverage: [],
  uniqueInsights: [],
};
```

## Fields

| Field             | Type                                                                                    | Required             | Description |
| ----------------- | --------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `blindSpots`      | *string*\[]                                                                             | :heavy\_check\_mark: | N/A         |
| `consensus`       | *string*\[]                                                                             | :heavy\_check\_mark: | N/A         |
| `contradictions`  | [models.Contradiction](/docs/agent-sdk/typescript/api-reference/models/contradiction)\[]     | :heavy\_check\_mark: | N/A         |
| `partialCoverage` | [models.PartialCoverage](/docs/agent-sdk/typescript/api-reference/models/partialcoverage)\[] | :heavy\_check\_mark: | N/A         |
| `uniqueInsights`  | [models.UniqueInsight](/docs/agent-sdk/typescript/api-reference/models/uniqueinsight)\[]     | :heavy\_check\_mark: | N/A         |
