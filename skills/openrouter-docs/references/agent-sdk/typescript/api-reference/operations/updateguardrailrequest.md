> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateGuardrailRequest - TypeScript SDK

> UpdateGuardrailRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: UpdateGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  updateGuardrailRequest: {},
};
```

## Fields

| Field                    | Type                                                                                               | Required             | Description                                                                                                                                                 | Example                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`            | *string*                                                                                           | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                      |
| `appTitle`               | *string*                                                                                           | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                      |
| `appCategories`          | *string*                                                                                           | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                      |
| `id`                     | *string*                                                                                           | :heavy\_check\_mark: | The unique identifier of the guardrail to update                                                                                                            | 550e8400-e29b-41d4-a716-446655440000                                                                                 |
| `updateGuardrailRequest` | [models.UpdateGuardrailRequest](/docs/agent-sdk/typescript/api-reference/models/updateguardrailrequest) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"description": "Updated description","limit_usd": 75,"name": "Updated Guardrail Name","reset_interval": "weekly"}` |
