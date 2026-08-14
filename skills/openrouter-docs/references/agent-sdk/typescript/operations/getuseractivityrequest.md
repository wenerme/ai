> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetUserActivityRequest - TypeScript SDK

> GetUserActivityRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { GetUserActivityRequest } from "@openrouter/sdk/models/operations";

let value: GetUserActivityRequest = {};
```

## Fields

| Field  | Type     | Required             | Description                                                          | Example    |
| ------ | -------- | -------------------- | -------------------------------------------------------------------- | ---------- |
| `date` | *string* | :heavy\_minus\_sign: | Filter by a single UTC date in the last 30 days (YYYY-MM-DD format). | 2025-08-24 |
