> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouterMetadata - TypeScript SDK

> OpenRouterMetadata type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenRouterMetadata } from "@openrouter/sdk/models";

let value: OpenRouterMetadata = {
  attempt: 1,
  endpoints: {
    available: [
      {
        model: "openai/gpt-4o",
        provider: "OpenAI",
        selected: true,
      },
    ],
    total: 1,
  },
  isByok: false,
  region: "iad",
  requested: "openai/gpt-4o",
  strategy: "direct",
  summary: "available=1, selected=OpenAI",
};
```

## Fields

| Field       | Type                                                                                     | Required             | Description | Example                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------- | -------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `attempt`   | *number*                                                                                 | :heavy\_check\_mark: | N/A         |                                                                                                                   |
| `attempts`  | [models.RouterAttempt](/docs/agent-sdk/typescript/api-reference/models/routerattempt)\[]      | :heavy\_minus\_sign: | N/A         |                                                                                                                   |
| `endpoints` | [models.EndpointsMetadata](/docs/agent-sdk/typescript/api-reference/models/endpointsmetadata) | :heavy\_check\_mark: | N/A         | `{"available": [{"model": "openai/gpt-4o","provider": "OpenAI","selected": true}`<br />],<br />"total": `3<br/>`} |
| `isByok`    | *boolean*                                                                                | :heavy\_check\_mark: | N/A         |                                                                                                                   |
| `params`    | [models.RouterParams](/docs/agent-sdk/typescript/api-reference/models/routerparams)           | :heavy\_minus\_sign: | N/A         | `{"version_group": "anthropic/claude-sonnet-4"}`                                                                  |
| `pipeline`  | [models.PipelineStage](/docs/agent-sdk/typescript/api-reference/models/pipelinestage)\[]      | :heavy\_minus\_sign: | N/A         |                                                                                                                   |
| `region`    | *string*                                                                                 | :heavy\_check\_mark: | N/A         |                                                                                                                   |
| `requested` | *string*                                                                                 | :heavy\_check\_mark: | N/A         |                                                                                                                   |
| `strategy`  | [models.RoutingStrategy](/docs/agent-sdk/typescript/api-reference/models/routingstrategy)     | :heavy\_check\_mark: | N/A         | direct                                                                                                            |
| `summary`   | *string*                                                                                 | :heavy\_check\_mark: | N/A         |                                                                                                                   |
