> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateAuthKeysCodeResponse - TypeScript SDK

> CreateAuthKeysCodeResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Successfully created authorization code

## Example Usage

```typescript lines theme={null}
import { CreateAuthKeysCodeResponse } from "@openrouter/sdk/models/operations";

let value: CreateAuthKeysCodeResponse = {
  data: {
    id: "auth_code_xyz789",
    appId: 12345,
    createdAt: "2025-08-24T10:30:00Z",
  },
};
```

## Fields

| Field  | Type                                                                                         | Required             | Description    | Example                                                                           |
| ------ | -------------------------------------------------------------------------------------------- | -------------------- | -------------- | --------------------------------------------------------------------------------- |
| `data` | [operations.CreateAuthKeysCodeData](/agent-sdk/typescript/operations/createauthkeyscodedata) | :heavy\_check\_mark: | Auth code data | `{"id": "auth_code_xyz789","app_id": 12345,"created_at": "2025-08-24T10:30:00Z"}` |
