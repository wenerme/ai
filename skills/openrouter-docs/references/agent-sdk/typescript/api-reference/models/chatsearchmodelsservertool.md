> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatSearchModelsServerTool - TypeScript SDK

> ChatSearchModelsServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: searches and filters AI models available on OpenRouter

## Example Usage

```typescript lines theme={null}
import { ChatSearchModelsServerTool } from "@openrouter/sdk/models";

let value: ChatSearchModelsServerTool = {
  type: "openrouter:experimental__search_models",
};
```

## Fields

| Field        | Type                                                                                                               | Required             | Description                                                                 | Example              |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------- | -------------------- |
| `parameters` | [models.SearchModelsServerToolConfig](/agent-sdk/typescript/api-reference/models/searchmodelsservertoolconfig)     | :heavy\_minus\_sign: | Configuration for the openrouter:experimental\_\_search\_models server tool | `{"max_results": 5}` |
| `type`       | [models.ChatSearchModelsServerToolType](/agent-sdk/typescript/api-reference/models/chatsearchmodelsservertooltype) | :heavy\_check\_mark: | N/A                                                                         |                      |
