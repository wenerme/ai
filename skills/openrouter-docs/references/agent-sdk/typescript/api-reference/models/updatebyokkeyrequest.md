> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateBYOKKeyRequest - TypeScript SDK

> UpdateBYOKKeyRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateBYOKKeyRequest } from "@openrouter/sdk/models";

let value: UpdateBYOKKeyRequest = {};
```

## Fields

| Field            | Type        | Required             | Description                                                                                                                                                                                        | Example              |
| ---------------- | ----------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `allowedModels`  | *string*\[] | :heavy\_minus\_sign: | Optional allowlist of model slugs this credential may be used for. `null` means no restriction.                                                                                                    | `<nil>`              |
| `allowedUserIds` | *string*\[] | :heavy\_minus\_sign: | Optional allowlist of user IDs that may use this credential. `null` means no restriction.                                                                                                          | `<nil>`              |
| `disabled`       | *boolean*   | :heavy\_minus\_sign: | Whether this credential is disabled.                                                                                                                                                               | false                |
| `isFallback`     | *boolean*   | :heavy\_minus\_sign: | Whether this credential is treated as a fallback — used only after non-fallback keys for the same provider have been tried.                                                                        | false                |
| `key`            | *string*    | :heavy\_minus\_sign: | A new raw provider API key to rotate the credential in-place. The previous key material is overwritten and the masked label is regenerated. Encrypted at rest and never returned in API responses. | sk-proj-newkey456... |
| `name`           | *string*    | :heavy\_minus\_sign: | Optional human-readable name for the credential.                                                                                                                                                   | Updated OpenAI Key   |
