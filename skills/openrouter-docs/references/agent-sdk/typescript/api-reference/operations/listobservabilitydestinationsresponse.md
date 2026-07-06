> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListObservabilityDestinationsResponse - TypeScript SDK

> ListObservabilityDestinationsResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { ListObservabilityDestinationsResponse } from "@openrouter/sdk/models/operations";

let value: ListObservabilityDestinationsResponse = {
  result: {
    data: [
      {
        apiKeyHashes: null,
        config: {
          baseUrl: "https://us.cloud.langfuse.com",
          publicKey: "pk-l...EfGh",
          secretKey: "sk-l...AbCd",
        },
        createdAt: "2025-08-24T10:30:00Z",
        enabled: true,
        filterRules: null,
        id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
        name: "Production Langfuse",
        privacyMode: false,
        samplingRate: 1,
        type: "langfuse",
        updatedAt: "2025-08-24T15:45:00Z",
        workspaceId: "550e8400-e29b-41d4-a716-446655440000",
      },
    ],
    totalCount: 1,
  },
};
```

## Fields

| Field    | Type                                                                                                                             | Required             | Description | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `result` | [models.ListObservabilityDestinationsResponse](/agent-sdk/typescript/api-reference/models/listobservabilitydestinationsresponse) | :heavy\_check\_mark: | N/A         | `{"data": [{"api_key_hashes": null,"config": {"baseUrl": "https://us.cloud.langfuse.com","publicKey": "pk-l...EfGh","secretKey": "sk-l...AbCd"}`,<br />"created\_at": "2025-08-24T10:30:00Z",<br />"enabled": true,<br />"filter\_rules": null,<br />"id": "99999999-aaaa-bbbb-cccc-dddddddddddd",<br />"name": "Production Langfuse",<br />"privacy\_mode": false,<br />"sampling\_rate": 1,<br />"type": "langfuse",<br />"updated\_at": "2025-08-24T15:45:00Z",<br />"workspace\_id": "550e8400-e29b-41d4-a716-446655440000"<br />}<br />],<br />"total\_count": `1<br/>`} |
