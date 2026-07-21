> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ComputerUseServerTool - TypeScript SDK

> ComputerUseServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Computer use preview tool configuration

## Example Usage

```typescript lines theme={null}
import { ComputerUseServerTool } from "@openrouter/sdk/models";

let value: ComputerUseServerTool = {
  displayHeight: 768,
  displayWidth: 1024,
  environment: "linux",
  type: "computer_use_preview",
};
```

## Fields

| Field           | Type                                                                         | Required             | Description |
| --------------- | ---------------------------------------------------------------------------- | -------------------- | ----------- |
| `displayHeight` | *number*                                                                     | :heavy\_check\_mark: | N/A         |
| `displayWidth`  | *number*                                                                     | :heavy\_check\_mark: | N/A         |
| `environment`   | [models.Environment](/docs/agent-sdk/typescript/api-reference/models/environment) | :heavy\_check\_mark: | N/A         |
| `type`          | *"computer\_use\_preview"*                                                   | :heavy\_check\_mark: | N/A         |
