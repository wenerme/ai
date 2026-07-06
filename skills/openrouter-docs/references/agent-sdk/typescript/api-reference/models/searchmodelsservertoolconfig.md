> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# SearchModelsServerToolConfig - TypeScript SDK

> SearchModelsServerToolConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration for the openrouter:experimental\_\_search\_models server tool

## Example Usage

```typescript lines theme={null}
import { SearchModelsServerToolConfig } from "@openrouter/sdk/models";

let value: SearchModelsServerToolConfig = {};
```

## Fields

| Field        | Type     | Required             | Description                                                | Example |
| ------------ | -------- | -------------------- | ---------------------------------------------------------- | ------- |
| `maxResults` | *number* | :heavy\_minus\_sign: | Maximum number of models to return. Defaults to 5, max 20. | 5       |
