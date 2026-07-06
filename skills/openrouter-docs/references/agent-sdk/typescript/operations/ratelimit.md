> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ~~RateLimit~~ - TypeScript SDK

> ~~RateLimit~~ method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Legacy rate limit information about a key. Will always return -1.

> :warning: **DEPRECATED**: This will be removed in a future release, please migrate away from it as soon as possible.

## Example Usage

```typescript lines theme={null}
import { RateLimit } from "@openrouter/sdk/models/operations";

let value: RateLimit = {
  requests: 1000,
  interval: "1h",
  note: "This field is deprecated and safe to ignore.",
};
```

## Fields

| Field      | Type     | Required             | Description                             | Example                                      |
| ---------- | -------- | -------------------- | --------------------------------------- | -------------------------------------------- |
| `requests` | *number* | :heavy\_check\_mark: | Number of requests allowed per interval | 1000                                         |
| `interval` | *string* | :heavy\_check\_mark: | Rate limit interval                     | 1h                                           |
| `note`     | *string* | :heavy\_check\_mark: | Note about the rate limit               | This field is deprecated and safe to ignore. |
