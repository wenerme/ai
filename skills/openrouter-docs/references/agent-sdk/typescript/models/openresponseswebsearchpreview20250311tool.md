> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesWebSearchPreview20250311Tool - TypeScript SDK

> OpenResponsesWebSearchPreview20250311Tool method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Web search preview tool configuration (2025-03-11 version)

## Example Usage

```typescript lines theme={null}
import { OpenResponsesWebSearchPreview20250311Tool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
};
```

## Fields

| Field               | Type                                                                                                     | Required             | Description                                     | Example |
| ------------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------- | ------- |
| `type`              | *"web\_search\_preview\_2025\_03\_11"*                                                                   | :heavy\_check\_mark: | N/A                                             |         |
| `searchContextSize` | [models.ResponsesSearchContextSize](/agent-sdk/typescript/models/responsessearchcontextsize)             | :heavy\_minus\_sign: | Size of the search context for web search tools | medium  |
| `userLocation`      | [models.WebSearchPreviewToolUserLocation](/agent-sdk/typescript/models/websearchpreviewtooluserlocation) | :heavy\_minus\_sign: | N/A                                             |         |
