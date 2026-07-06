> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchServerToolOpenRouter - TypeScript SDK

> WebSearchServerToolOpenRouter type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript lines theme={null}
import { WebSearchServerToolOpenRouter } from "@openrouter/sdk/models";

let value: WebSearchServerToolOpenRouter = {
  type: "openrouter:web_search",
};
```

## Fields

| Field        | Type                                                                                                     | Required             | Description                                              | Example                                              |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| `parameters` | [models.WebSearchServerToolConfig](/agent-sdk/typescript/api-reference/models/websearchservertoolconfig) | :heavy\_minus\_sign: | Configuration for the openrouter:web\_search server tool | `{"max_results": 5,"search_context_size": "medium"}` |
| `type`       | *"openrouter:web\_search"*                                                                               | :heavy\_check\_mark: | N/A                                                      |                                                      |
