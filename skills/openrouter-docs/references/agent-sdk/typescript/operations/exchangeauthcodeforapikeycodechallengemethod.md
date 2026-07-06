> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ExchangeAuthCodeForAPIKeyCodeChallengeMethod - TypeScript SDK

> ExchangeAuthCodeForAPIKeyCodeChallengeMethod method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The method used to generate the code challenge

## Example Usage

```typescript lines theme={null}
import { ExchangeAuthCodeForAPIKeyCodeChallengeMethod } from "@openrouter/sdk/models/operations";

let value: ExchangeAuthCodeForAPIKeyCodeChallengeMethod = "S256";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"S256" | "plain" | Unrecognized<string>
```
