> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AutoRouterPlugin - TypeScript SDK

> AutoRouterPlugin type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AutoRouterPlugin } from "@openrouter/sdk/models";

let value: AutoRouterPlugin = {
  id: "auto-router",
};
```

## Fields

| Field                 | Type            | Required             | Description                                                                                                                                                                                                                        | Example                                                             |
| --------------------- | --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `allowedModels`       | *string*\[]     | :heavy\_minus\_sign: | List of model patterns to filter which models the auto-router can route between. Supports wildcards (e.g., "anthropic/\*" matches all Anthropic models). When not specified, uses the default supported models list.               | \[<br />"anthropic/*",<br />"openai/gpt-4o",<br />"google/*"<br />] |
| `costQualityTradeoff` | *number*        | :heavy\_minus\_sign: | Controls cost vs. quality routing tradeoff (0–10). 0 = pure quality (best model regardless of cost), 10 = maximize for cost (cheapest model wins). Intermediate values blend quality and cost signals continuously. Defaults to 7. | 7                                                                   |
| `enabled`             | *boolean*       | :heavy\_minus\_sign: | Set to false to disable the auto-router plugin for this request. Defaults to true.                                                                                                                                                 |                                                                     |
| `id`                  | *"auto-router"* | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                |                                                                     |
