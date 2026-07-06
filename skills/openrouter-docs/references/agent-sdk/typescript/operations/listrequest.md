> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListRequest - TypeScript SDK

> ListRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListRequest } from "@openrouter/sdk/models/operations";

let value: ListRequest = {};
```

## Fields

| Field             | Type     | Required             | Description                                          | Example |
| ----------------- | -------- | -------------------- | ---------------------------------------------------- | ------- |
| `includeDisabled` | *string* | :heavy\_minus\_sign: | Whether to include disabled API keys in the response | false   |
| `offset`          | *string* | :heavy\_minus\_sign: | Number of API keys to skip for pagination            | 0       |
