> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouterWebSearchServerTool - TypeScript SDK

> OpenRouterWebSearchServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript lines theme={null}
import { OpenRouterWebSearchServerTool } from "@openrouter/sdk/models";

let value: OpenRouterWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

## Fields

| Field        | Type                                                                                                                     | Required             | Description | Example                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | ---------------------------------------------------- |
| `parameters` | [models.WebSearchConfig](/agent-sdk/typescript/api-reference/models/websearchconfig)                                     | :heavy\_minus\_sign: | N/A         | `{"max_results": 5,"search_context_size": "medium"}` |
| `type`       | [models.OpenRouterWebSearchServerToolType](/agent-sdk/typescript/api-reference/models/openrouterwebsearchservertooltype) | :heavy\_check\_mark: | N/A         |                                                      |
