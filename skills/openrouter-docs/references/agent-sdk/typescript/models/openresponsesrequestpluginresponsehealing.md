> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesRequestPluginResponseHealing - TypeScript SDK

> OpenResponsesRequestPluginResponseHealing method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenResponsesRequestPluginResponseHealing } from "@openrouter/sdk/models";

let value: OpenResponsesRequestPluginResponseHealing = {
  id: "response-healing",
};
```

## Fields

| Field     | Type                 | Required             | Description                                                                             |
| --------- | -------------------- | -------------------- | --------------------------------------------------------------------------------------- |
| `id`      | *"response-healing"* | :heavy\_check\_mark: | N/A                                                                                     |
| `enabled` | *boolean*            | :heavy\_minus\_sign: | Set to false to disable the response-healing plugin for this request. Defaults to true. |
