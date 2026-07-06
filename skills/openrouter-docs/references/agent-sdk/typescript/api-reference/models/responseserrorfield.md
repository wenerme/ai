> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesErrorField - TypeScript SDK

> ResponsesErrorField type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Error information returned from the API

## Example Usage

```typescript lines theme={null}
import { ResponsesErrorField } from "@openrouter/sdk/models";

let value: ResponsesErrorField = {
  code: "rate_limit_exceeded",
  message: "Rate limit exceeded. Please try again later.",
};
```

## Fields

| Field     | Type                                                           | Required             | Description |
| --------- | -------------------------------------------------------------- | -------------------- | ----------- |
| `code`    | [models.Code](/agent-sdk/typescript/api-reference/models/code) | :heavy\_check\_mark: | N/A         |
| `message` | *string*                                                       | :heavy\_check\_mark: | N/A         |
