> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateRerankUsage - TypeScript SDK

> CreateRerankUsage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Usage statistics

## Example Usage

```typescript lines theme={null}
import { CreateRerankUsage } from "@openrouter/sdk/models/operations";

let value: CreateRerankUsage = {};
```

## Fields

| Field         | Type     | Required             | Description                                      | Example |
| ------------- | -------- | -------------------- | ------------------------------------------------ | ------- |
| `cost`        | *number* | :heavy\_minus\_sign: | Cost of the request in credits                   | 0.001   |
| `searchUnits` | *number* | :heavy\_minus\_sign: | Number of search units consumed (Cohere billing) | 1       |
| `totalTokens` | *number* | :heavy\_minus\_sign: | Total number of tokens used                      | 150     |
