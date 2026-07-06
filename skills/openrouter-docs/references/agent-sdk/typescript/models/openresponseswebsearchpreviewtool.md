> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesWebSearchPreviewTool - TypeScript SDK

> OpenResponsesWebSearchPreviewTool method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search preview tool configuration

## Example Usage

```typescript lines theme={null}
import { OpenResponsesWebSearchPreviewTool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchPreviewTool = {
  type: "web_search_preview",
};
```

## Fields

| Field               | Type                                                                                                     | Required             | Description                                     | Example |
| ------------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------- | ------- |
| `type`              | *"web\_search\_preview"*                                                                                 | :heavy\_check\_mark: | N/A                                             |         |
| `searchContextSize` | [models.ResponsesSearchContextSize](/agent-sdk/typescript/models/responsessearchcontextsize)             | :heavy\_minus\_sign: | Size of the search context for web search tools | medium  |
| `userLocation`      | [models.WebSearchPreviewToolUserLocation](/agent-sdk/typescript/models/websearchpreviewtooluserlocation) | :heavy\_minus\_sign: | N/A                                             |         |
