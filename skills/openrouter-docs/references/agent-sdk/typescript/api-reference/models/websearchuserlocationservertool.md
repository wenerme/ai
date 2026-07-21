> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchUserLocationServerTool - TypeScript SDK

> WebSearchUserLocationServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Approximate user location for location-biased results.

## Example Usage

```typescript lines theme={null}
import { WebSearchUserLocationServerTool } from "@openrouter/sdk/models";

let value: WebSearchUserLocationServerTool = {};
```

## Fields

| Field      | Type                                                                                                                         | Required             | Description |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `city`     | *string*                                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `country`  | *string*                                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `region`   | *string*                                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `timezone` | *string*                                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `type`     | [models.WebSearchUserLocationServerToolType](/docs/agent-sdk/typescript/api-reference/models/websearchuserlocationservertooltype) | :heavy\_minus\_sign: | N/A         |
