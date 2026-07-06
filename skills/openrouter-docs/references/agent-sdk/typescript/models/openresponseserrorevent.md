> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesErrorEvent - TypeScript SDK

> OpenResponsesErrorEvent method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when an error occurs during streaming

## Example Usage

```typescript lines theme={null}
import { OpenResponsesErrorEvent } from "@openrouter/sdk/models";

let value: OpenResponsesErrorEvent = {
  type: "error",
  code: "rate_limit_exceeded",
  message: "Rate limit exceeded. Please try again later.",
  param: null,
  sequenceNumber: 2,
};
```

## Fields

| Field            | Type      | Required             | Description |
| ---------------- | --------- | -------------------- | ----------- |
| `type`           | *"error"* | :heavy\_check\_mark: | N/A         |
| `code`           | *string*  | :heavy\_check\_mark: | N/A         |
| `message`        | *string*  | :heavy\_check\_mark: | N/A         |
| `param`          | *string*  | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*  | :heavy\_check\_mark: | N/A         |
