> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchPreviewToolUserLocation - TypeScript SDK

> WebSearchPreviewToolUserLocation method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { WebSearchPreviewToolUserLocation } from "@openrouter/sdk/models";

let value: WebSearchPreviewToolUserLocation = {
  type: "approximate",
};
```

## Fields

| Field      | Type                                                                                                             | Required             | Description |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`     | [models.WebSearchPreviewToolUserLocationType](/docs/agent-sdk/typescript/models/websearchpreviewtooluserlocationtype) | :heavy\_check\_mark: | N/A         |
| `city`     | *string*                                                                                                         | :heavy\_minus\_sign: | N/A         |
| `country`  | *string*                                                                                                         | :heavy\_minus\_sign: | N/A         |
| `region`   | *string*                                                                                                         | :heavy\_minus\_sign: | N/A         |
| `timezone` | *string*                                                                                                         | :heavy\_minus\_sign: | N/A         |
