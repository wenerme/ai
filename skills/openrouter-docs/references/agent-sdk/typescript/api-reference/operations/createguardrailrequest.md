> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateGuardrailRequest - TypeScript SDK

> CreateGuardrailRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: CreateGuardrailRequest = {
  createGuardrailRequest: {
    name: "My New Guardrail",
  },
};
```

## Fields

| Field                    | Type                                                                                               | Required             | Description                                                                                                                                                 | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`            | *string*                                                                                           | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `appTitle`               | *string*                                                                                           | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `appCategories`          | *string*                                                                                           | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `createGuardrailRequest` | [models.CreateGuardrailRequest](/docs/agent-sdk/typescript/api-reference/models/createguardrailrequest) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"allowed_models": null,"allowed_providers": ["openai","anthropic","deepseek"],"content_filter_builtins": [{"action": "block","slug": "regex-prompt-injection"}`<br />],<br />"content\_filters": null,<br />"description": "A guardrail for limiting API usage",<br />"enforce\_zdr\_anthropic": true,<br />"enforce\_zdr\_google": false,<br />"enforce\_zdr\_openai": true,<br />"enforce\_zdr\_other": false,<br />"ignored\_models": null,<br />"ignored\_providers": null,<br />"limit\_usd": 50,<br />"name": "My New Guardrail",<br />"reset\_interval": "monthly"<br />} |
