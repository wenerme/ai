> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StreamEventsResponseFailed - TypeScript SDK

> StreamEventsResponseFailed type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a response has failed

## Example Usage

```typescript expandable lines theme={null}
import { StreamEventsResponseFailed } from "@openrouter/sdk/models";

let value: StreamEventsResponseFailed = {
  response: {
    completedAt: 671654,
    createdAt: 1704067200,
    error: null,
    frequencyPenalty: 7790.29,
    id: "resp-abc123",
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: "gpt-4",
    object: "response",
    output: [],
    parallelToolCalls: true,
    presencePenalty: null,
    status: "in_progress",
    temperature: null,
    toolChoice: "auto",
    tools: [],
    topP: null,
  },
  sequenceNumber: 0,
  type: "response.failed",
};
```

## Fields

| Field            | Type                                                                                         | Required             | Description                                            | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response`       | [models.OpenResponsesResult](/agent-sdk/typescript/api-reference/models/openresponsesresult) | :heavy\_check\_mark: | Complete non-streaming response from the Responses API | `{"created_at": 1704067200,"error": null,"id": "resp-abc123","incomplete_details": null,"instructions": null,"max_output_tokens": null,"metadata": null,"model": "gpt-4","object": "response","output": [{"content": [{"annotations": [],"text": "Hello! How can I help you today?","type": "output_text"}`<br />],<br />"id": "msg-abc123",<br />"role": "assistant",<br />"status": "completed",<br />"type": "message"<br />}<br />],<br />"parallel\_tool\_calls": true,<br />"status": "completed",<br />"temperature": null,<br />"tool\_choice": "auto",<br />"tools": \[],<br />"top\_p": null,<br />"usage": `{"input_tokens": 10,"input_tokens_details": {"cached_tokens": 0}`,<br />"output\_tokens": 25,<br />"output\_tokens\_details": `{"reasoning_tokens": 0}`,<br />"total\_tokens": `35<br/>`}<br />} |
| `sequenceNumber` | *number*                                                                                     | :heavy\_check\_mark: | N/A                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`           | *"response.failed"*                                                                          | :heavy\_check\_mark: | N/A                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
