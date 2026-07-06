> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesRequestPluginWeb - TypeScript SDK

> OpenResponsesRequestPluginWeb method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenResponsesRequestPluginWeb } from "@openrouter/sdk/models";

let value: OpenResponsesRequestPluginWeb = {
  id: "web",
};
```

## Fields

| Field          | Type                                                                   | Required             | Description                                                                       |
| -------------- | ---------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| `id`           | *"web"*                                                                | :heavy\_check\_mark: | N/A                                                                               |
| `enabled`      | *boolean*                                                              | :heavy\_minus\_sign: | Set to false to disable the web-search plugin for this request. Defaults to true. |
| `maxResults`   | *number*                                                               | :heavy\_minus\_sign: | N/A                                                                               |
| `searchPrompt` | *string*                                                               | :heavy\_minus\_sign: | N/A                                                                               |
| `engine`       | [models.WebSearchEngine](/agent-sdk/typescript/models/websearchengine) | :heavy\_minus\_sign: | The search engine to use for web search.                                          |
