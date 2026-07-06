> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentToolReference - TypeScript SDK

> ContentToolReference type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ContentToolReference } from "@openrouter/sdk/models";

let value: ContentToolReference = {
  toolName: "<value>",
  type: "tool_reference",
};
```

## Fields

| Field      | Type                | Required             | Description |
| ---------- | ------------------- | -------------------- | ----------- |
| `toolName` | *string*            | :heavy\_check\_mark: | N/A         |
| `type`     | *"tool\_reference"* | :heavy\_check\_mark: | N/A         |
