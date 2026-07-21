> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# DatetimeServerTool - TypeScript SDK

> DatetimeServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

OpenRouter built-in server tool: returns the current date and time

## Example Usage

```typescript lines theme={null}
import { DatetimeServerTool } from "@openrouter/sdk/models";

let value: DatetimeServerTool = {
  type: "openrouter:datetime",
};
```

## Fields

| Field        | Type                                                                                                   | Required             | Description                                           | Example                            |
| ------------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------- | ---------------------------------- |
| `parameters` | [models.DatetimeServerToolConfig](/docs/agent-sdk/typescript/api-reference/models/datetimeservertoolconfig) | :heavy\_minus\_sign: | Configuration for the openrouter:datetime server tool | `{"timezone": "America/New_York"}` |
| `type`       | [models.DatetimeServerToolType](/docs/agent-sdk/typescript/api-reference/models/datetimeservertooltype)     | :heavy\_check\_mark: | N/A                                                   |                                    |
