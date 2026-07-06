> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateAuthKeysCodeData - TypeScript SDK

> CreateAuthKeysCodeData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Auth code data

## Example Usage

```typescript lines theme={null}
import { CreateAuthKeysCodeData } from "@openrouter/sdk/models/operations";

let value: CreateAuthKeysCodeData = {
  appId: 12345,
  createdAt: "2025-08-24T10:30:00Z",
  id: "auth_code_xyz789",
};
```

## Fields

| Field       | Type     | Required             | Description                                              | Example              |
| ----------- | -------- | -------------------- | -------------------------------------------------------- | -------------------- |
| `appId`     | *number* | :heavy\_check\_mark: | The application ID associated with this auth code        | 12345                |
| `createdAt` | *string* | :heavy\_check\_mark: | ISO 8601 timestamp of when the auth code was created     | 2025-08-24T10:30:00Z |
| `id`        | *string* | :heavy\_check\_mark: | The authorization code ID to use in the exchange request | auth\_code\_xyz789   |
