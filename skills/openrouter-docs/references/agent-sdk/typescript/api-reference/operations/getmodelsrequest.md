> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetModelsRequest - TypeScript SDK

> GetModelsRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { GetModelsRequest } from "@openrouter/sdk/models/operations";

let value: GetModelsRequest = {};
```

## Fields

| Field                 | Type                                                                           | Required             | Description                                                                                                                                                         | Example     |
| --------------------- | ------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `httpReferer`         | *string*                                                                       | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />         |             |
| `appTitle`            | *string*                                                                       | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                  |             |
| `appCategories`       | *string*                                                                       | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                         |             |
| `category`            | [operations.Category](/agent-sdk/typescript/api-reference/operations/category) | :heavy\_minus\_sign: | Filter models by use case category                                                                                                                                  | programming |
| `supportedParameters` | *string*                                                                       | :heavy\_minus\_sign: | Filter models by supported parameter (comma-separated)                                                                                                              | temperature |
| `outputModalities`    | *string*                                                                       | :heavy\_minus\_sign: | Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text". | text        |
