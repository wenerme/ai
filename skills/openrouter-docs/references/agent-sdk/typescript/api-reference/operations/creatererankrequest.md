> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateRerankRequest - TypeScript SDK

> CreateRerankRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateRerankRequest } from "@openrouter/sdk/models/operations";

let value: CreateRerankRequest = {
  requestBody: {
    documents: [
      "Paris is the capital of France.",
      "Berlin is the capital of Germany.",
    ],
    model: "cohere/rerank-v3.5",
    query: "What is the capital of France?",
  },
};
```

## Fields

| Field           | Type                                                                                                         | Required             | Description                                                                                                                                                 | Example                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`   | *string*                                                                                                     | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                                                                             |
| `appTitle`      | *string*                                                                                                     | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                                                                             |
| `appCategories` | *string*                                                                                                     | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                                                                             |
| `requestBody`   | [operations.CreateRerankRequestBody](/docs/agent-sdk/typescript/api-reference/operations/creatererankrequestbody) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"documents": ["Paris is the capital of France.","Berlin is the capital of Germany."],"model": "cohere/rerank-v3.5","query": "What is the capital of France?","top_n": 3}` |
