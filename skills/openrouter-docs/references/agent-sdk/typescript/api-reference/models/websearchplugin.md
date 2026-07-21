> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSearchPlugin - TypeScript SDK

> WebSearchPlugin type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { WebSearchPlugin } from "@openrouter/sdk/models";

let value: WebSearchPlugin = {
  id: "web",
};
```

## Fields

| Field            | Type                                                                                 | Required             | Description                                                                                                                                    | Example                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `enabled`        | *boolean*                                                                            | :heavy\_minus\_sign: | Set to false to disable the web-search plugin for this request. Defaults to true.                                                              |                                                                                                                            |
| `engine`         | [models.WebSearchEngine](/docs/agent-sdk/typescript/api-reference/models/websearchengine) | :heavy\_minus\_sign: | The search engine to use for web search.                                                                                                       | exa                                                                                                                        |
| `excludeDomains` | *string*\[]                                                                          | :heavy\_minus\_sign: | A list of domains to exclude from web search results. Supports wildcards (e.g. "\*.substack.com") and path filtering (e.g. "openai.com/blog"). | \[<br />"example.com",<br />"\*.substack.com",<br />"openai.com/blog"<br />]                                               |
| `id`             | *"web"*                                                                              | :heavy\_check\_mark: | N/A                                                                                                                                            |                                                                                                                            |
| `includeDomains` | *string*\[]                                                                          | :heavy\_minus\_sign: | A list of domains to restrict web search results to. Supports wildcards (e.g. "\*.substack.com") and path filtering (e.g. "openai.com/blog").  | \[<br />"example.com",<br />"\*.substack.com",<br />"openai.com/blog"<br />]                                               |
| `maxResults`     | *number*                                                                             | :heavy\_minus\_sign: | N/A                                                                                                                                            |                                                                                                                            |
| `maxUses`        | *number*                                                                             | :heavy\_minus\_sign: | Maximum number of times the model can invoke web search in a single turn. Passed through to native providers that support it (e.g. Anthropic). |                                                                                                                            |
| `searchPrompt`   | *string*                                                                             | :heavy\_minus\_sign: | N/A                                                                                                                                            |                                                                                                                            |
| `userLocation`   | [models.UserLocation](/docs/agent-sdk/typescript/api-reference/models/userlocation)       | :heavy\_minus\_sign: | N/A                                                                                                                                            | `{"city": "San Francisco","country": "US","region": "California","timezone": "America/Los_Angeles","type": "approximate"}` |
