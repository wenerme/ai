> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ExchangeAuthCodeForAPIKeyResponse - TypeScript SDK

> ExchangeAuthCodeForAPIKeyResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Successfully exchanged code for an API key

## Example Usage

```typescript lines theme={null}
import { ExchangeAuthCodeForAPIKeyResponse } from "@openrouter/sdk/models/operations";

let value: ExchangeAuthCodeForAPIKeyResponse = {
  key:
    "OPENROUTER_API_KEY_EXAMPLE",
  userId: "user_2yOPcMpKoQhcd4bVgSMlELRaIah",
};
```

## Fields

| Field    | Type     | Required             | Description                                | Example                                                                   |
| -------- | -------- | -------------------- | ------------------------------------------ | ------------------------------------------------------------------------- |
| `key`    | *string* | :heavy\_check\_mark: | The API key to use for OpenRouter requests | OPENROUTER_API_KEY_EXAMPLE |
| `userId` | *string* | :heavy\_check\_mark: | User ID associated with the API key        | user\_2yOPcMpKoQhcd4bVgSMlELRaIah                                         |
