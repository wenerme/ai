> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StreamEventsResponseIncomplete - TypeScript SDK

> StreamEventsResponseIncomplete type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a response is incomplete

## Example Usage

```typescript expandable lines theme={null}
import { StreamEventsResponseIncomplete } from "@openrouter/sdk/models";

let value: StreamEventsResponseIncomplete = {
  response: {
    completedAt: 854864,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 7279.68,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: 1969.92,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.incomplete",
};
```

## Fields

| Field            | Type                                                                                         | Required             | Description                                            | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response`       | [models.OpenResponsesResult](/docs/agent-sdk/typescript/api-reference/models/openresponsesresult) | :heavy\_check\_mark: | Complete non-streaming response from the Responses API | `{"created_at": 1704067200,"error": null,"id": "resp-abc123","incomplete_details": null,"instructions": null,"max_output_tokens": null,"metadata": null,"model": "gpt-4","object": "response","output": [{"content": [{"annotations": [],"text": "Hello! How can I help you today?","type": "output_text"}`<br />],<br />"id": "msg-abc123",<br />"role": "assistant",<br />"status": "completed",<br />"type": "message"<br />}<br />],<br />"parallel\_tool\_calls": true,<br />"status": "completed",<br />"temperature": null,<br />"tool\_choice": "auto",<br />"tools": \[],<br />"top\_p": null,<br />"usage": `{"input_tokens": 10,"input_tokens_details": {"cached_tokens": 0}`,<br />"output\_tokens": 25,<br />"output\_tokens\_details": `{"reasoning_tokens": 0}`,<br />"total\_tokens": `35<br/>`}<br />} |
| `sequenceNumber` | *number*                                                                                     | :heavy\_check\_mark: | N/A                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`           | *"response.incomplete"*                                                                      | :heavy\_check\_mark: | N/A                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
