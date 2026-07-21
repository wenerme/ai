> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatRequestReasoning - TypeScript SDK

> ChatRequestReasoning type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Configuration options for reasoning models

## Example Usage

```typescript lines theme={null}
import { ChatRequestReasoning } from "@openrouter/sdk/models";

let value: ChatRequestReasoning = {};
```

## Fields

| Field     | Type                                                                                                                     | Required             | Description                                         | Example |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------- | ------- |
| `effort`  | [models.ChatRequestEffort](/docs/agent-sdk/typescript/api-reference/models/chatrequesteffort)                                 | :heavy\_minus\_sign: | Constrains effort on reasoning for reasoning models | medium  |
| `summary` | [models.ChatReasoningSummaryVerbosityEnum](/docs/agent-sdk/typescript/api-reference/models/chatreasoningsummaryverbosityenum) | :heavy\_minus\_sign: | N/A                                                 | concise |
