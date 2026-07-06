> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatDebugOptions - TypeScript SDK

> ChatDebugOptions type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Debug options for inspecting request transformations (streaming only)

## Example Usage

```typescript lines theme={null}
import { ChatDebugOptions } from "@openrouter/sdk/models";

let value: ChatDebugOptions = {};
```

## Fields

| Field              | Type      | Required             | Description                                                                                                                          | Example |
| ------------------ | --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `echoUpstreamBody` | *boolean* | :heavy\_minus\_sign: | If true, includes the transformed upstream request body in a debug chunk at the start of the stream. Only works with streaming mode. | true    |
