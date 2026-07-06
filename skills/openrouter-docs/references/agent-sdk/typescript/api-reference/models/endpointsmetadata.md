> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EndpointsMetadata - TypeScript SDK

> EndpointsMetadata type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { EndpointsMetadata } from "@openrouter/sdk/models";

let value: EndpointsMetadata = {
  available: [
    {
      model: "openai/gpt-4o",
      provider: "OpenAI",
      selected: true,
    },
  ],
  total: 3,
};
```

## Fields

| Field       | Type                                                                              | Required             | Description |
| ----------- | --------------------------------------------------------------------------------- | -------------------- | ----------- |
| `available` | [models.EndpointInfo](/agent-sdk/typescript/api-reference/models/endpointinfo)\[] | :heavy\_check\_mark: | N/A         |
| `total`     | *number*                                                                          | :heavy\_check\_mark: | N/A         |
