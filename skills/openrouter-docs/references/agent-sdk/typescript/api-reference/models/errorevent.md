> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ErrorEvent - TypeScript SDK

> ErrorEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when an error occurs during streaming

## Example Usage

```typescript lines theme={null}
import { ErrorEvent } from "@openrouter/sdk/models";

let value: ErrorEvent = {
  code: "<value>",
  message: "<value>",
  param: "<value>",
  sequenceNumber: 0,
  type: "error",
};
```

## Fields

| Field            | Type      | Required             | Description |
| ---------------- | --------- | -------------------- | ----------- |
| `code`           | *string*  | :heavy\_check\_mark: | N/A         |
| `message`        | *string*  | :heavy\_check\_mark: | N/A         |
| `param`          | *string*  | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*  | :heavy\_check\_mark: | N/A         |
| `type`           | *"error"* | :heavy\_check\_mark: | N/A         |
