> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesWebSearch20250826Tool - TypeScript SDK

> OpenResponsesWebSearch20250826Tool method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search tool configuration (2025-08-26 version)

## Example Usage

```typescript lines theme={null}
import { OpenResponsesWebSearch20250826Tool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
};
```

## Fields

| Field               | Type                                                                                                                       | Required             | Description                                     | Example                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `type`              | *"web\_search\_2025\_08\_26"*                                                                                              | :heavy\_check\_mark: | N/A                                             |                                                                                                                             |
| `filters`           | [models.OpenResponsesWebSearch20250826ToolFilters](/docs/agent-sdk/typescript/models/openresponseswebsearch20250826toolfilters) | :heavy\_minus\_sign: | N/A                                             |                                                                                                                             |
| `searchContextSize` | [models.ResponsesSearchContextSize](/docs/agent-sdk/typescript/models/responsessearchcontextsize)                               | :heavy\_minus\_sign: | Size of the search context for web search tools | medium                                                                                                                      |
| `userLocation`      | [models.ResponsesWebSearchUserLocation](/docs/agent-sdk/typescript/models/responseswebsearchuserlocation)                       | :heavy\_minus\_sign: | User location information for web search        | `{"type": "approximate","city": "San Francisco","country": "USA","region": "California","timezone": "America/Los_Angeles"}` |
