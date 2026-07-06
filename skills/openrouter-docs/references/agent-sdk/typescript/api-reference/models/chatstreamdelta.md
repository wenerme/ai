> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamDelta - TypeScript SDK

> ChatStreamDelta type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Delta changes in streaming response

## Example Usage

```typescript lines theme={null}
import { ChatStreamDelta } from "@openrouter/sdk/models";

let value: ChatStreamDelta = {};
```

## Fields

| Field              | Type                                                                                          | Required             | Description                                    | Example                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `audio`            | [models.ChatAudioOutput](/agent-sdk/typescript/api-reference/models/chataudiooutput)          | :heavy\_minus\_sign: | N/A                                            | `{"data": "UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1f","expires_at": 1677652400,"id": "audio_abc123","transcript": "Hello! How can I help you today?"}` |
| `content`          | *string*                                                                                      | :heavy\_minus\_sign: | Message content delta                          | Hello                                                                                                                                                                             |
| `reasoning`        | *string*                                                                                      | :heavy\_minus\_sign: | Reasoning content delta                        | I need to                                                                                                                                                                         |
| `reasoningDetails` | *models.ReasoningDetailUnion*\[]                                                              | :heavy\_minus\_sign: | Reasoning details for extended thinking models | \[<br />`{"text": "Let me think about this...","type": "text"}`<br />]                                                                                                            |
| `refusal`          | *string*                                                                                      | :heavy\_minus\_sign: | Refusal message delta                          | `<nil>`                                                                                                                                                                           |
| `role`             | [models.ChatStreamDeltaRole](/agent-sdk/typescript/api-reference/models/chatstreamdeltarole)  | :heavy\_minus\_sign: | The role of the message author                 | assistant                                                                                                                                                                         |
| `toolCalls`        | [models.ChatStreamToolCall](/agent-sdk/typescript/api-reference/models/chatstreamtoolcall)\[] | :heavy\_minus\_sign: | Tool calls delta                               |                                                                                                                                                                                   |
