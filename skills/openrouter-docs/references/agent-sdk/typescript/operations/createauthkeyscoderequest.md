> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateAuthKeysCodeRequest - TypeScript SDK

> CreateAuthKeysCodeRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateAuthKeysCodeRequest } from "@openrouter/sdk/models/operations";

let value: CreateAuthKeysCodeRequest = {
  callbackUrl: "https://myapp.com/auth/callback",
};
```

## Fields

| Field                 | Type                                                                                                                       | Required             | Description                                                                                                   | Example                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `callbackUrl`         | *string*                                                                                                                   | :heavy\_check\_mark: | The callback URL to redirect to after authorization. Note, only https URLs on ports 443 and 3000 are allowed. | [https://myapp.com/auth/callback](https://myapp.com/auth/callback) |
| `codeChallenge`       | *string*                                                                                                                   | :heavy\_minus\_sign: | PKCE code challenge for enhanced security                                                                     | E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM                        |
| `codeChallengeMethod` | [operations.CreateAuthKeysCodeCodeChallengeMethod](/docs/agent-sdk/typescript/operations/createauthkeyscodecodechallengemethod) | :heavy\_minus\_sign: | The method used to generate the code challenge                                                                | S256                                                               |
| `limit`               | *number*                                                                                                                   | :heavy\_minus\_sign: | Credit limit for the API key to be created                                                                    | 100                                                                |
| `expiresAt`           | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                              | :heavy\_minus\_sign: | Optional expiration time for the API key to be created                                                        |                                                                    |
