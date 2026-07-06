> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailsRequest - TypeScript SDK

> ListGuardrailsRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListGuardrailsRequest } from "@openrouter/sdk/models/operations";

let value: ListGuardrailsRequest = {};
```

## Fields

| Field    | Type     | Required             | Description                                   | Example |
| -------- | -------- | -------------------- | --------------------------------------------- | ------- |
| `offset` | *string* | :heavy\_minus\_sign: | Number of records to skip for pagination      | 0       |
| `limit`  | *string* | :heavy\_minus\_sign: | Maximum number of records to return (max 100) | 50      |
