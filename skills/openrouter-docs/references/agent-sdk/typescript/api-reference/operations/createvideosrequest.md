> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateVideosRequest - TypeScript SDK

> CreateVideosRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateVideosRequest } from "@openrouter/sdk/models/operations";

let value: CreateVideosRequest = {
  videoGenerationRequest: {
    model: "google/veo-3.1",
    prompt: "A serene mountain landscape at sunset",
  },
};
```

## Fields

| Field                    | Type                                                                                               | Required             | Description                                                                                                                                                 | Example                                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`            | *string*                                                                                           | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                                           |
| `appTitle`               | *string*                                                                                           | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                                           |
| `appCategories`          | *string*                                                                                           | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                                           |
| `videoGenerationRequest` | [models.VideoGenerationRequest](/agent-sdk/typescript/api-reference/models/videogenerationrequest) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"aspect_ratio": "16:9","duration": 8,"model": "google/veo-3.1","prompt": "A serene mountain landscape at sunset","resolution": "720p"}` |
