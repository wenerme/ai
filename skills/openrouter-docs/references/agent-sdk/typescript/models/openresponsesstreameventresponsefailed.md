> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesStreamEventResponseFailed - TypeScript SDK

> OpenResponsesStreamEventResponseFailed method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Event emitted when a response has failed

## Example Usage

```typescript expandable lines theme={null}
import { OpenResponsesStreamEventResponseFailed } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseFailed = {
  type: "response.failed",
  response: {
    id: "resp-abc123",
    object: "response",
    createdAt: 1704067200,
    model: "gpt-4",
    status: "failed",
    completedAt: 934.62,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: 5672.21,
    frequencyPenalty: null,
    instructions: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: true,
  },
  sequenceNumber: 3,
};
```

## Fields

| Field            | Type                                                                                                       | Required             | Description                                            | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`           | *"response.failed"*                                                                                        | :heavy\_check\_mark: | N/A                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `response`       | [models.OpenResponsesNonStreamingResponse](/docs/agent-sdk/typescript/models/openresponsesnonstreamingresponse) | :heavy\_check\_mark: | Complete non-streaming response from the Responses API | `{"id": "resp-abc123","object": "response","created_at": 1704067200,"model": "gpt-4","status": "completed","output": [{"type": "message","id": "msg-abc123","status": "completed","role": "assistant","content": [{"type": "output_text","text": "Hello! How can I help you today?","annotations": []}`<br />]<br />}<br />],<br />"usage": `{"input_tokens": 10,"output_tokens": 25,"total_tokens": 35,"input_tokens_details": {"cached_tokens": 0}`,<br />"output\_tokens\_details": `{"reasoning_tokens": 0}`<br />},<br />"tools": \[],<br />"tool\_choice": "auto",<br />"parallel\_tool\_calls": true,<br />"error": null,<br />"incomplete\_details": null,<br />"temperature": null,<br />"top\_p": null,<br />"max\_output\_tokens": null,<br />"metadata": null,<br />"instructions": `null<br/>`} |
| `sequenceNumber` | *number*                                                                                                   | :heavy\_check\_mark: | N/A                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
