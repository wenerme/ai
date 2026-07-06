> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesStreamingResponse - TypeScript SDK

> ResponsesStreamingResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponsesStreamingResponse } from "@openrouter/sdk/models";

let value: ResponsesStreamingResponse = {
  data: {
    contentIndex: 844013,
    delta: "Hello",
    itemId: "<id>",
    logprobs: [
      {
        logprob: -0.5,
        token: "Hello",
      },
    ],
    outputIndex: 868033,
    sequenceNumber: 359136,
    type: "response.output_text.delta",
  },
};
```

## Fields

| Field  | Type                  | Required             | Description                                                         | Example                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------ | --------------------- | -------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | *models.StreamEvents* | :heavy\_check\_mark: | Union of all possible event types emitted during response streaming | `{"response": {"created_at": 1704067200,"error": null,"id": "resp-abc123","incomplete_details": null,"instructions": null,"max_output_tokens": null,"metadata": null,"model": "gpt-4","object": "response","output": [],"parallel_tool_calls": true,"status": "in_progress","temperature": null,"tool_choice": "auto","tools": [],"top_p": null}`,<br />"sequence\_number": 0,<br />"type": "response.created"<br />} |
