> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputWebFetchServerToolItem - TypeScript SDK

> OutputWebFetchServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:web\_fetch server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputWebFetchServerToolItem } from "@openrouter/sdk/models";

let value: OutputWebFetchServerToolItem = {
  status: "completed",
  type: "openrouter:web_fetch",
};
```

## Fields

| Field        | Type                                                                                                                   | Required             | Description                                              | Example   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------- | --------- |
| `content`    | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                                      |           |
| `error`      | *string*                                                                                                               | :heavy\_minus\_sign: | The error message if the fetch failed.                   |           |
| `httpStatus` | *number*                                                                                                               | :heavy\_minus\_sign: | The HTTP status code returned by the upstream URL fetch. |           |
| `id`         | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                                      |           |
| `status`     | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                     | :heavy\_check\_mark: | N/A                                                      | completed |
| `title`      | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                                      |           |
| `type`       | [models.OutputWebFetchServerToolItemType](/agent-sdk/typescript/api-reference/models/outputwebfetchservertoolitemtype) | :heavy\_check\_mark: | N/A                                                      |           |
| `url`        | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                                      |           |
