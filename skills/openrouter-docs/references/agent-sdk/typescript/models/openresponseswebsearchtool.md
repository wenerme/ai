> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesWebSearchTool - TypeScript SDK

> OpenResponsesWebSearchTool method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search tool configuration

## Example Usage

```typescript lines theme={null}
import { OpenResponsesWebSearchTool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchTool = {
  type: "web_search",
};
```

## Fields

| Field               | Type                                                                                                       | Required             | Description                                     | Example                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `type`              | *"web\_search"*                                                                                            | :heavy\_check\_mark: | N/A                                             |                                                                                                                             |
| `filters`           | [models.OpenResponsesWebSearchToolFilters](/docs/agent-sdk/typescript/models/openresponseswebsearchtoolfilters) | :heavy\_minus\_sign: | N/A                                             |                                                                                                                             |
| `searchContextSize` | [models.ResponsesSearchContextSize](/docs/agent-sdk/typescript/models/responsessearchcontextsize)               | :heavy\_minus\_sign: | Size of the search context for web search tools | medium                                                                                                                      |
| `userLocation`      | [models.ResponsesWebSearchUserLocation](/docs/agent-sdk/typescript/models/responseswebsearchuserlocation)       | :heavy\_minus\_sign: | User location information for web search        | `{"type": "approximate","city": "San Francisco","country": "USA","region": "California","timezone": "America/Los_Angeles"}` |
