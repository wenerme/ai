> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputDatetimeItem - TypeScript SDK

> OutputDatetimeItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:datetime server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputDatetimeItem } from "@openrouter/sdk/models";

let value: OutputDatetimeItem = {
  datetime: "2026-03-12T14:30:00.000Z",
  status: "completed",
  timezone: "UTC",
  type: "openrouter:datetime",
};
```

## Fields

| Field      | Type                                                                                               | Required             | Description              | Example   |
| ---------- | -------------------------------------------------------------------------------------------------- | -------------------- | ------------------------ | --------- |
| `datetime` | *string*                                                                                           | :heavy\_check\_mark: | ISO 8601 datetime string |           |
| `id`       | *string*                                                                                           | :heavy\_minus\_sign: | N/A                      |           |
| `status`   | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                 | :heavy\_check\_mark: | N/A                      | completed |
| `timezone` | *string*                                                                                           | :heavy\_check\_mark: | IANA timezone name       |           |
| `type`     | [models.OutputDatetimeItemType](/agent-sdk/typescript/api-reference/models/outputdatetimeitemtype) | :heavy\_check\_mark: | N/A                      |           |
