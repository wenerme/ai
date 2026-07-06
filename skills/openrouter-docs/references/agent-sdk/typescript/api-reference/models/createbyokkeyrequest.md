> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateBYOKKeyRequest - TypeScript SDK

> CreateBYOKKeyRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateBYOKKeyRequest } from "@openrouter/sdk/models";

let value: CreateBYOKKeyRequest = {
  key: "sk-proj-abc123...",
  provider: "openai",
};
```

## Fields

| Field            | Type                                                                                   | Required             | Description                                                                                                                      | Example                              |
| ---------------- | -------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `allowedModels`  | *string*\[]                                                                            | :heavy\_minus\_sign: | Optional allowlist of model slugs this credential may be used for. `null` means no restriction.                                  | `<nil>`                              |
| `allowedUserIds` | *string*\[]                                                                            | :heavy\_minus\_sign: | Optional allowlist of user IDs that may use this credential. `null` means no restriction.                                        | `<nil>`                              |
| `disabled`       | *boolean*                                                                              | :heavy\_minus\_sign: | Whether this credential should be created in a disabled state.                                                                   | false                                |
| `isFallback`     | *boolean*                                                                              | :heavy\_minus\_sign: | Whether this credential is treated as a fallback — used only after non-fallback keys for the same provider have been tried.      | false                                |
| `key`            | *string*                                                                               | :heavy\_check\_mark: | The raw provider API key or credential. This value is encrypted at rest and never returned in API responses.                     | sk-proj-abc123...                    |
| `name`           | *string*                                                                               | :heavy\_minus\_sign: | Optional human-readable name for the credential.                                                                                 | Production OpenAI Key                |
| `provider`       | [models.BYOKProviderSlug](/agent-sdk/typescript/api-reference/models/byokproviderslug) | :heavy\_check\_mark: | The upstream provider this credential authenticates against, as a lowercase slug (e.g. `openai`, `anthropic`, `amazon-bedrock`). | openai                               |
| `workspaceId`    | *string*                                                                               | :heavy\_minus\_sign: | Optional workspace ID. Defaults to the authenticated entity's default workspace.                                                 | 550e8400-e29b-41d4-a716-446655440000 |
