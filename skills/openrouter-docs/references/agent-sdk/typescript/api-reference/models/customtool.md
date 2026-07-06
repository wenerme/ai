> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CustomTool - TypeScript SDK

> CustomTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Custom tool configuration

## Example Usage

```typescript lines theme={null}
import { CustomTool } from "@openrouter/sdk/models";

let value: CustomTool = {
  name: "my_tool",
  type: "custom",
};
```

## Fields

| Field         | Type            | Required             | Description |
| ------------- | --------------- | -------------------- | ----------- |
| `description` | *string*        | :heavy\_minus\_sign: | N/A         |
| `format`      | *models.Format* | :heavy\_minus\_sign: | N/A         |
| `name`        | *string*        | :heavy\_check\_mark: | N/A         |
| `type`        | *"custom"*      | :heavy\_check\_mark: | N/A         |
