> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateKeysRequest - TypeScript SDK

> UpdateKeysRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateKeysRequest } from "@openrouter/sdk/models/operations";

let value: UpdateKeysRequest = {
  hash:
    "OPENROUTER_API_KEY_EXAMPLE",
  requestBody: {},
};
```

## Fields

| Field         | Type                                                                                       | Required             | Description                                  | Example                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `hash`        | *string*                                                                                   | :heavy\_check\_mark: | The hash identifier of the API key to update | OPENROUTER_API_KEY_EXAMPLE                                             |
| `requestBody` | [operations.UpdateKeysRequestBody](/agent-sdk/typescript/operations/updatekeysrequestbody) | :heavy\_check\_mark: | N/A                                          | `{"name": "Updated API Key Name","disabled": false,"limit": 75,"limit_reset": "daily","include_byok_in_limit": true}` |
