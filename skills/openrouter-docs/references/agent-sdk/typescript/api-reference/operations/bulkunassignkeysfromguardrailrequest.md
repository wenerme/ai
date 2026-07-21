> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignKeysFromGuardrailRequest - TypeScript SDK

> BulkUnassignKeysFromGuardrailRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkUnassignKeysFromGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: BulkUnassignKeysFromGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  bulkUnassignKeysRequest: {
    keyHashes: [
      "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ],
  },
};
```

## Fields

| Field                     | Type                                                                                                 | Required             | Description                                                                                                                                                 | Example                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `httpReferer`             | *string*                                                                                             | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                        |
| `appTitle`                | *string*                                                                                             | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                        |
| `appCategories`           | *string*                                                                                             | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                        |
| `id`                      | *string*                                                                                             | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000                                                   |
| `bulkUnassignKeysRequest` | [models.BulkUnassignKeysRequest](/docs/agent-sdk/typescript/api-reference/models/bulkunassignkeysrequest) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"key_hashes": ["c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"]}` |
