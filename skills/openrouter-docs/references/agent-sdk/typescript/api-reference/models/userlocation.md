> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UserLocation - TypeScript SDK

> UserLocation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Approximate user location for location-biased search results. Passed through to native providers that support it (e.g. Anthropic).

## Example Usage

```typescript lines theme={null}
import { UserLocation } from "@openrouter/sdk/models";

let value: UserLocation = {
  type: "approximate",
};
```

## Fields

| Field      | Type                                                                                         | Required             | Description |
| ---------- | -------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `city`     | *string*                                                                                     | :heavy\_minus\_sign: | N/A         |
| `country`  | *string*                                                                                     | :heavy\_minus\_sign: | N/A         |
| `region`   | *string*                                                                                     | :heavy\_minus\_sign: | N/A         |
| `timezone` | *string*                                                                                     | :heavy\_minus\_sign: | N/A         |
| `type`     | [models.WebSearchPluginType](/agent-sdk/typescript/api-reference/models/websearchplugintype) | :heavy\_check\_mark: | N/A         |
