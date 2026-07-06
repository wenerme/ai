> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateResponsesResponseBody - TypeScript SDK

> CreateResponsesResponseBody method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Successful response

## Example Usage

```typescript expandable lines theme={null}
import { CreateResponsesResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateResponsesResponseBody = {
  data: {
    type: "response.created",
    response: {
      id: "resp-abc123",
      object: "response",
      createdAt: 1704067200,
      model: "gpt-4",
      status: "in_progress",
      completedAt: 8101.12,
      output: [],
      error: null,
      incompleteDetails: null,
      temperature: null,
      topP: null,
      presencePenalty: 8087.26,
      frequencyPenalty: 4886.88,
      instructions: null,
      metadata: null,
      tools: [],
      toolChoice: "auto",
      parallelToolCalls: true,
    },
    sequenceNumber: 0,
  },
};
```

## Fields

| Field  | Type                              | Required             | Description                                                         | Example                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | --------------------------------- | -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | *models.OpenResponsesStreamEvent* | :heavy\_check\_mark: | Union of all possible event types emitted during response streaming | `{"type": "response.created","response": {"id": "resp-abc123","object": "response","created_at": 1704067200,"model": "gpt-4","status": "in_progress","output": [],"tools": [],"tool_choice": "auto","parallel_tool_calls": true,"error": null,"incomplete_details": null,"metadata": null,"instructions": null,"temperature": null,"top_p": null,"max_output_tokens": null}`,<br />"sequence\_number": `0<br/>`} |
