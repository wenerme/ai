> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateAuthKeysCodeRequestBody - TypeScript SDK

> CreateAuthKeysCodeRequestBody type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateAuthKeysCodeRequestBody } from "@openrouter/sdk/models/operations";

let value: CreateAuthKeysCodeRequestBody = {
  callbackUrl: "https://myapp.com/auth/callback",
};
```

## Fields

| Field                 | Type                                                                                                                                     | Required             | Description                                                                                                   | Example                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `callbackUrl`         | *string*                                                                                                                                 | :heavy\_check\_mark: | The callback URL to redirect to after authorization. Note, only https URLs on ports 443 and 3000 are allowed. | [https://myapp.com/auth/callback](https://myapp.com/auth/callback) |
| `codeChallenge`       | *string*                                                                                                                                 | :heavy\_minus\_sign: | PKCE code challenge for enhanced security                                                                     | E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM                        |
| `codeChallengeMethod` | [operations.CreateAuthKeysCodeCodeChallengeMethod](/docs/agent-sdk/typescript/api-reference/operations/createauthkeyscodecodechallengemethod) | :heavy\_minus\_sign: | The method used to generate the code challenge                                                                | S256                                                               |
| `expiresAt`           | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                            | :heavy\_minus\_sign: | Optional expiration time for the API key to be created                                                        | 2027-12-31T23:59:59Z                                               |
| `keyLabel`            | *string*                                                                                                                                 | :heavy\_minus\_sign: | Optional custom label for the API key. Defaults to the app name if not provided.                              | My Custom Key                                                      |
| `limit`               | *number*                                                                                                                                 | :heavy\_minus\_sign: | Credit limit for the API key to be created                                                                    | 100                                                                |
| `usageLimitType`      | [operations.UsageLimitType](/docs/agent-sdk/typescript/api-reference/operations/usagelimittype)                                               | :heavy\_minus\_sign: | Optional credit limit reset interval. When set, the credit limit resets on this interval.                     | monthly                                                            |
