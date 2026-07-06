> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UnprocessableEntityResponseErrorData - TypeScript SDK

> UnprocessableEntityResponseErrorData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Error data for UnprocessableEntityResponse

## Example Usage

```typescript lines theme={null}
import { UnprocessableEntityResponseErrorData } from "@openrouter/sdk/models";

let value: UnprocessableEntityResponseErrorData = {
  code: 422,
  message: "Invalid argument",
};
```

## Fields

| Field      | Type                    | Required             | Description |
| ---------- | ----------------------- | -------------------- | ----------- |
| `code`     | *number*                | :heavy\_check\_mark: | N/A         |
| `message`  | *string*                | :heavy\_check\_mark: | N/A         |
| `metadata` | `Record<string, *any*>` | :heavy\_minus\_sign: | N/A         |
