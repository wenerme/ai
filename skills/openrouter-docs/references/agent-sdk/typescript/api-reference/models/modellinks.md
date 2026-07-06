> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ModelLinks - TypeScript SDK

> ModelLinks type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Related API endpoints and resources for this model.

## Example Usage

```typescript lines theme={null}
import { ModelLinks } from "@openrouter/sdk/models";

let value: ModelLinks = {
  details: "/api/v1/models/openai/gpt-5.4/endpoints",
};
```

## Fields

| Field     | Type     | Required             | Description                             | Example                                 |
| --------- | -------- | -------------------- | --------------------------------------- | --------------------------------------- |
| `details` | *string* | :heavy\_check\_mark: | URL for the model details/endpoints API | /api/v1/models/openai/gpt-5.4/endpoints |
