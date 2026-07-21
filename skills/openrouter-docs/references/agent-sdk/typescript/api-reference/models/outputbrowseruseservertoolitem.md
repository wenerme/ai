> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputBrowserUseServerToolItem - TypeScript SDK

> OutputBrowserUseServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:browser\_use server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputBrowserUseServerToolItem } from "@openrouter/sdk/models";

let value: OutputBrowserUseServerToolItem = {
  status: "completed",
  type: "openrouter:browser_use",
};
```

## Fields

| Field           | Type                                                                                                                       | Required             | Description | Example   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `action`        | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `id`            | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `screenshotB64` | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `status`        | [models.ToolCallStatus](/docs/agent-sdk/typescript/api-reference/models/toolcallstatus)                                         | :heavy\_check\_mark: | N/A         | completed |
| `type`          | [models.OutputBrowserUseServerToolItemType](/docs/agent-sdk/typescript/api-reference/models/outputbrowseruseservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
