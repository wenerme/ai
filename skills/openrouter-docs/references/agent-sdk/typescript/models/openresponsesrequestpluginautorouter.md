> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesRequestPluginAutoRouter - TypeScript SDK

> OpenResponsesRequestPluginAutoRouter method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenResponsesRequestPluginAutoRouter } from "@openrouter/sdk/models";

let value: OpenResponsesRequestPluginAutoRouter = {
  id: "auto-router",
};
```

## Fields

| Field           | Type            | Required             | Description                                                                                                                                                                                                          | Example                                                             |
| --------------- | --------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `id`            | *"auto-router"* | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                  |                                                                     |
| `enabled`       | *boolean*       | :heavy\_minus\_sign: | Set to false to disable the auto-router plugin for this request. Defaults to true.                                                                                                                                   |                                                                     |
| `allowedModels` | *string*\[]     | :heavy\_minus\_sign: | List of model patterns to filter which models the auto-router can route between. Supports wildcards (e.g., "anthropic/\*" matches all Anthropic models). When not specified, uses the default supported models list. | \[<br />"anthropic/*",<br />"openai/gpt-4o",<br />"google/*"<br />] |
