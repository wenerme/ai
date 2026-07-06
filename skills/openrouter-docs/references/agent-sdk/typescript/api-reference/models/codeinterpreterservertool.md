> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CodeInterpreterServerTool - TypeScript SDK

> CodeInterpreterServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Code interpreter tool configuration

## Example Usage

```typescript lines theme={null}
import { CodeInterpreterServerTool } from "@openrouter/sdk/models";

let value: CodeInterpreterServerTool = {
  container: "auto",
  type: "code_interpreter",
};
```

## Fields

| Field       | Type                  | Required             | Description |
| ----------- | --------------------- | -------------------- | ----------- |
| `container` | *models.Container*    | :heavy\_check\_mark: | N/A         |
| `type`      | *"code\_interpreter"* | :heavy\_check\_mark: | N/A         |
