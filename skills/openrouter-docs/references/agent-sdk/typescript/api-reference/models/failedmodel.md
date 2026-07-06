> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FailedModel - TypeScript SDK

> FailedModel type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FailedModel } from "@openrouter/sdk/models";

let value: FailedModel = {
  error: "<value>",
  model: "XTS",
};
```

## Fields

| Field        | Type     | Required             | Description                                                                  |
| ------------ | -------- | -------------------- | ---------------------------------------------------------------------------- |
| `error`      | *string* | :heavy\_check\_mark: | Error message describing why the model failed.                               |
| `model`      | *string* | :heavy\_check\_mark: | Slug of the analysis model that failed.                                      |
| `statusCode` | *number* | :heavy\_minus\_sign: | HTTP status code from the upstream response, when available (e.g. 402, 429). |
