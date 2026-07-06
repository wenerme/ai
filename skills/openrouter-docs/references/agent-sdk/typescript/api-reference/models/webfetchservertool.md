> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WebFetchServerTool - TypeScript SDK

> WebFetchServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: fetches full content from a URL (web page or PDF)

## Example Usage

```typescript lines theme={null}
import { WebFetchServerTool } from "@openrouter/sdk/models";

let value: WebFetchServerTool = {
  type: "openrouter:web_fetch",
};
```

## Fields

| Field        | Type                                                                                                   | Required             | Description                                             | Example                                         |
| ------------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| `parameters` | [models.WebFetchServerToolConfig](/agent-sdk/typescript/api-reference/models/webfetchservertoolconfig) | :heavy\_minus\_sign: | Configuration for the openrouter:web\_fetch server tool | `{"max_content_tokens": 100000,"max_uses": 10}` |
| `type`       | [models.WebFetchServerToolType](/agent-sdk/typescript/api-reference/models/webfetchservertooltype)     | :heavy\_check\_mark: | N/A                                                     |                                                 |
