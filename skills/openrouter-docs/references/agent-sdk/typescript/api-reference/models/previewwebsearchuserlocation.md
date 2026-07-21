> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PreviewWebSearchUserLocation - TypeScript SDK

> PreviewWebSearchUserLocation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { PreviewWebSearchUserLocation } from "@openrouter/sdk/models";

let value: PreviewWebSearchUserLocation = {
  type: "approximate",
};
```

## Fields

| Field      | Type                                                                                                                   | Required             | Description |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `city`     | *string*                                                                                                               | :heavy\_minus\_sign: | N/A         |
| `country`  | *string*                                                                                                               | :heavy\_minus\_sign: | N/A         |
| `region`   | *string*                                                                                                               | :heavy\_minus\_sign: | N/A         |
| `timezone` | *string*                                                                                                               | :heavy\_minus\_sign: | N/A         |
| `type`     | [models.PreviewWebSearchUserLocationType](/docs/agent-sdk/typescript/api-reference/models/previewwebsearchuserlocationtype) | :heavy\_check\_mark: | N/A         |
