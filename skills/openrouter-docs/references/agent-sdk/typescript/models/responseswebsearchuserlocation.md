> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesWebSearchUserLocation - TypeScript SDK

> ResponsesWebSearchUserLocation method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

User location information for web search

## Example Usage

```typescript lines theme={null}
import { ResponsesWebSearchUserLocation } from "@openrouter/sdk/models";

let value: ResponsesWebSearchUserLocation = {};
```

## Fields

| Field      | Type                                                                                                         | Required             | Description |
| ---------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`     | [models.ResponsesWebSearchUserLocationType](/docs/agent-sdk/typescript/models/responseswebsearchuserlocationtype) | :heavy\_minus\_sign: | N/A         |
| `city`     | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `country`  | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `region`   | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `timezone` | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
