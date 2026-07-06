> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchUserLocation - TypeScript SDK

> WebSearchUserLocation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

User location information for web search

## Example Usage

```typescript lines theme={null}
import { WebSearchUserLocation } from "@openrouter/sdk/models";

let value: WebSearchUserLocation = {};
```

## Fields

| Field      | Type                                                                                                     | Required             | Description |
| ---------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `city`     | *string*                                                                                                 | :heavy\_minus\_sign: | N/A         |
| `country`  | *string*                                                                                                 | :heavy\_minus\_sign: | N/A         |
| `region`   | *string*                                                                                                 | :heavy\_minus\_sign: | N/A         |
| `timezone` | *string*                                                                                                 | :heavy\_minus\_sign: | N/A         |
| `type`     | [models.WebSearchUserLocationType](/agent-sdk/typescript/api-reference/models/websearchuserlocationtype) | :heavy\_minus\_sign: | N/A         |
