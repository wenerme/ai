> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ExchangeAuthCodeForAPIKeyRequest - TypeScript SDK

> ExchangeAuthCodeForAPIKeyRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ExchangeAuthCodeForAPIKeyRequest } from "@openrouter/sdk/models/operations";

let value: ExchangeAuthCodeForAPIKeyRequest = {
  code: "auth_code_abc123def456",
};
```

## Fields

| Field                 | Type                                                                                                                                     | Required             | Description                                                                | Example                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------- | -------------------------------------------- |
| `code`                | *string*                                                                                                                                 | :heavy\_check\_mark: | The authorization code received from the OAuth redirect                    | auth\_code\_abc123def456                     |
| `codeVerifier`        | *string*                                                                                                                                 | :heavy\_minus\_sign: | The code verifier if code\_challenge was used in the authorization request | dBjftJeZ4CVP-mB92K27uhbUJU1p1r\_wW1gFWFOEjXk |
| `codeChallengeMethod` | [operations.ExchangeAuthCodeForAPIKeyCodeChallengeMethod](/agent-sdk/typescript/operations/exchangeauthcodeforapikeycodechallengemethod) | :heavy\_minus\_sign: | The method used to generate the code challenge                             | S256                                         |
