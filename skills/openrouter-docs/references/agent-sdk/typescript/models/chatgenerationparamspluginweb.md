> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatGenerationParamsPluginWeb - TypeScript SDK

> ChatGenerationParamsPluginWeb method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatGenerationParamsPluginWeb } from "@openrouter/sdk/models";

let value: ChatGenerationParamsPluginWeb = {
  id: "web",
};
```

## Fields

| Field          | Type                                                 | Required             | Description |
| -------------- | ---------------------------------------------------- | -------------------- | ----------- |
| `id`           | *"web"*                                              | :heavy\_check\_mark: | N/A         |
| `enabled`      | *boolean*                                            | :heavy\_minus\_sign: | N/A         |
| `maxResults`   | *number*                                             | :heavy\_minus\_sign: | N/A         |
| `searchPrompt` | *string*                                             | :heavy\_minus\_sign: | N/A         |
| `engine`       | [models.Engine](/agent-sdk/typescript/models/engine) | :heavy\_minus\_sign: | N/A         |
