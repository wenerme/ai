> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreatePresetsResponsesRequest - TypeScript SDK

> CreatePresetsResponsesRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreatePresetsResponsesRequest } from "@openrouter/sdk/models/operations";

let value: CreatePresetsResponsesRequest = {
  slug: "my-preset",
  responsesRequest: {},
};
```

## Fields

| Field              | Type                                                                                   | Required             | Description                                                                                                                                                 | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`      | *string*                                                                               | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `appTitle`         | *string*                                                                               | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `appCategories`    | *string*                                                                               | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `slug`             | *string*                                                                               | :heavy\_check\_mark: | URL-safe slug identifying the preset. Created if it does not exist.                                                                                         | my-preset                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `responsesRequest` | [models.ResponsesRequest](/agent-sdk/typescript/api-reference/models/responsesrequest) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"input": [{"content": "Hello, how are you?","role": "user","type": "message"}`<br />],<br />"model": "anthropic/claude-4.5-sonnet-20250929",<br />"temperature": 0.7,<br />"tools": \[<br />`{"description": "Get the current weather in a given location","name": "get_current_weather","parameters": {"properties": {"location": {"type": "string"}`<br />},<br />"type": "object"<br />},<br />"type": "function"<br />}<br />],<br />"top\_p": 0.9<br />} |
