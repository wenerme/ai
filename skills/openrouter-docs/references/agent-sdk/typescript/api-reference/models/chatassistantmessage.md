> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatAssistantMessage - TypeScript SDK

> ChatAssistantMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Assistant message for requests and responses

## Example Usage

```typescript lines theme={null}
import { ChatAssistantMessage } from "@openrouter/sdk/models";

let value: ChatAssistantMessage = {
  role: "assistant",
};
```

## Fields

| Field              | Type                                                                                                   | Required             | Description                                    | Example                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `audio`            | [models.ChatAudioOutput](/docs/agent-sdk/typescript/api-reference/models/chataudiooutput)                   | :heavy\_minus\_sign: | Audio output data or reference                 | `{"data": "UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1f","expires_at": 1677652400,"id": "audio_abc123","transcript": "Hello! How can I help you today?"}` |
| `content`          | *models.ChatAssistantMessageContent*                                                                   | :heavy\_minus\_sign: | Assistant message content                      |                                                                                                                                                                                   |
| `images`           | [models.ChatAssistantImages](/docs/agent-sdk/typescript/api-reference/models/chatassistantimages)\[]        | :heavy\_minus\_sign: | Generated images from image generation models  | \[<br />`{"image_url": {"url": "data:image/png;base64,iVBORw0KGgo..."}`<br />}<br />]                                                                                             |
| `name`             | *string*                                                                                               | :heavy\_minus\_sign: | Optional name for the assistant                |                                                                                                                                                                                   |
| `reasoning`        | *string*                                                                                               | :heavy\_minus\_sign: | Reasoning output                               |                                                                                                                                                                                   |
| `reasoningDetails` | *models.ReasoningDetailUnion*\[]                                                                       | :heavy\_minus\_sign: | Reasoning details for extended thinking models | \[<br />`{"thinking": "Let me work through this step by step...","type": "thinking"}`<br />]                                                                                      |
| `refusal`          | *string*                                                                                               | :heavy\_minus\_sign: | Refusal message if content was refused         |                                                                                                                                                                                   |
| `role`             | [models.ChatAssistantMessageRole](/docs/agent-sdk/typescript/api-reference/models/chatassistantmessagerole) | :heavy\_check\_mark: | N/A                                            |                                                                                                                                                                                   |
| `toolCalls`        | [models.ChatToolCall](/docs/agent-sdk/typescript/api-reference/models/chattoolcall)\[]                      | :heavy\_minus\_sign: | Tool calls made by the assistant               |                                                                                                                                                                                   |
