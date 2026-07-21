> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Preview20250311WebSearchServerTool - TypeScript SDK

> Preview20250311WebSearchServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search preview tool configuration (2025-03-11 version)

## Example Usage

```typescript lines theme={null}
import { Preview20250311WebSearchServerTool } from "@openrouter/sdk/models";

let value: Preview20250311WebSearchServerTool = {
  type: "web_search_preview_2025_03_11",
};
```

## Fields

| Field               | Type                                                                                                           | Required             | Description                                                                                                                                                                                                                                                                | Example                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `engine`            | [models.WebSearchEngineEnum](/docs/agent-sdk/typescript/api-reference/models/websearchengineenum)                   | :heavy\_minus\_sign: | Which search engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl (requires BYOK). "parallel" uses the Parallel search API. | auto                                                                                                                        |
| `filters`           | [models.WebSearchDomainFilter](/docs/agent-sdk/typescript/api-reference/models/websearchdomainfilter)               | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                        | `{"allowed_domains": ["example.com"],"excluded_domains": ["spam.com"]}`                                                     |
| `maxResults`        | *number*                                                                                                       | :heavy\_minus\_sign: | Maximum number of search results to return per search call. Defaults to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with native provider search.                                                                                                           | 5                                                                                                                           |
| `searchContextSize` | [models.SearchContextSizeEnum](/docs/agent-sdk/typescript/api-reference/models/searchcontextsizeenum)               | :heavy\_minus\_sign: | Size of the search context for web search tools                                                                                                                                                                                                                            | medium                                                                                                                      |
| `type`              | *"web\_search\_preview\_2025\_03\_11"*                                                                         | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                        |                                                                                                                             |
| `userLocation`      | [models.PreviewWebSearchUserLocation](/docs/agent-sdk/typescript/api-reference/models/previewwebsearchuserlocation) | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                        | `{"city": "San Francisco","country": "USA","region": "California","timezone": "America/Los_Angeles","type": "approximate"}` |
