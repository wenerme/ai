> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicBase64ImageSource - TypeScript SDK

> AnthropicBase64ImageSource type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicBase64ImageSource } from "@openrouter/sdk/models";

let value: AnthropicBase64ImageSource = {
  data: "/9j/4AAQ...",
  mediaType: "image/jpeg",
  type: "base64",
};
```

## Fields

| Field       | Type                                                                                               | Required             | Description | Example    |
| ----------- | -------------------------------------------------------------------------------------------------- | -------------------- | ----------- | ---------- |
| `data`      | *string*                                                                                           | :heavy\_check\_mark: | N/A         |            |
| `mediaType` | [models.AnthropicImageMimeType](/docs/agent-sdk/typescript/api-reference/models/anthropicimagemimetype) | :heavy\_check\_mark: | N/A         | image/jpeg |
| `type`      | *"base64"*                                                                                         | :heavy\_check\_mark: | N/A         |            |
