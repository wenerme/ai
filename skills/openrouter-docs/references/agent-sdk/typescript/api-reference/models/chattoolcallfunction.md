> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatToolCallFunction - TypeScript SDK

> ChatToolCallFunction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatToolCallFunction } from "@openrouter/sdk/models";

let value: ChatToolCallFunction = {
  arguments: "<value>",
  name: "<value>",
};
```

## Fields

| Field       | Type     | Required             | Description                       |
| ----------- | -------- | -------------------- | --------------------------------- |
| `arguments` | *string* | :heavy\_check\_mark: | Function arguments as JSON string |
| `name`      | *string* | :heavy\_check\_mark: | Function name to call             |
