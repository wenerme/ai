> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentWebSearchToolResultError - TypeScript SDK

> ContentWebSearchToolResultError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentWebSearchToolResultError } from "@openrouter/sdk/models";

let value: ContentWebSearchToolResultError = {
  errorCode: "unavailable",
  type: "web_search_tool_result_error",
};
```

## Fields

| Field       | Type                                                                                                           | Required             | Description |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `errorCode` | [models.ErrorCode](/docs/agent-sdk/typescript/api-reference/models/errorcode)                                       | :heavy\_check\_mark: | N/A         |
| `type`      | [models.TypeWebSearchToolResultError](/docs/agent-sdk/typescript/api-reference/models/typewebsearchtoolresulterror) | :heavy\_check\_mark: | N/A         |
