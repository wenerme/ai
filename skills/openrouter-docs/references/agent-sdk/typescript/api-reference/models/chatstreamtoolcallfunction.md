> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamToolCallFunction - TypeScript SDK

> ChatStreamToolCallFunction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Function call details

## Example Usage

```typescript lines theme={null}
import { ChatStreamToolCallFunction } from "@openrouter/sdk/models";

let value: ChatStreamToolCallFunction = {};
```

## Fields

| Field       | Type     | Required             | Description                       | Example               |
| ----------- | -------- | -------------------- | --------------------------------- | --------------------- |
| `arguments` | *string* | :heavy\_minus\_sign: | Function arguments as JSON string | `{"location": "..."}` |
| `name`      | *string* | :heavy\_minus\_sign: | Function name                     | get\_weather          |
