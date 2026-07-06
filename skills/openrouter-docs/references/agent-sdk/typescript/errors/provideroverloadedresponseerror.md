> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ProviderOverloadedResponseError - TypeScript SDK

> ProviderOverloadedResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Provider Overloaded - Provider is temporarily overloaded

## Example Usage

```typescript lines theme={null}
import { ProviderOverloadedResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                                           | Required             | Description                               | Example                                              |
| -------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `error`  | [models.ProviderOverloadedResponseErrorData](/agent-sdk/typescript/models/provideroverloadedresponseerrordata) | :heavy\_check\_mark: | Error data for ProviderOverloadedResponse | `{"code": 529,"message": "Provider returned error"}` |
| `userId` | *string*                                                                                                       | :heavy\_minus\_sign: | N/A                                       |                                                      |
