> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatResult - TypeScript SDK

> ChatResult type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Chat completion response

## Example Usage

```typescript lines theme={null}
import { ChatResult } from "@openrouter/sdk/models";

let value: ChatResult = {
  choices: [
    {
      finishReason: "stop",
      index: 0,
      message: {
        role: "assistant",
      },
    },
  ],
  created: 1677652288,
  id: "chatcmpl-123",
  model: "openai/gpt-4",
  object: "chat.completion",
  systemFingerprint: "fp_44709d6fcb",
};
```

## Fields

| Field                | Type                                                                                       | Required             | Description                                                     | Example                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `choices`            | [models.ChatChoice](/docs/agent-sdk/typescript/api-reference/models/chatchoice)\[]              | :heavy\_check\_mark: | List of completion choices                                      |                                                                                                                                                                                                                                                                                                                                                                                                     |
| `created`            | *number*                                                                                   | :heavy\_check\_mark: | Unix timestamp of creation                                      | 1677652288                                                                                                                                                                                                                                                                                                                                                                                          |
| `id`                 | *string*                                                                                   | :heavy\_check\_mark: | Unique completion identifier                                    | chatcmpl-123                                                                                                                                                                                                                                                                                                                                                                                        |
| `model`              | *string*                                                                                   | :heavy\_check\_mark: | Model used for completion                                       | openai/gpt-4                                                                                                                                                                                                                                                                                                                                                                                        |
| `object`             | [models.ChatResultObject](/docs/agent-sdk/typescript/api-reference/models/chatresultobject)     | :heavy\_check\_mark: | N/A                                                             |                                                                                                                                                                                                                                                                                                                                                                                                     |
| `openrouterMetadata` | [models.OpenRouterMetadata](/docs/agent-sdk/typescript/api-reference/models/openroutermetadata) | :heavy\_minus\_sign: | N/A                                                             | `{"attempt": 1,"endpoints": {"available": [{"model": "openai/gpt-4o","provider": "OpenAI","selected": true}`<br />],<br />"total": `1<br/>`},<br />"is\_byok": false,<br />"region": "iad",<br />"requested": "openai/gpt-4o",<br />"strategy": "direct",<br />"summary": "available=1, selected=OpenAI"<br />}                                                                                     |
| `serviceTier`        | *string*                                                                                   | :heavy\_minus\_sign: | The service tier used by the upstream provider for this request | default                                                                                                                                                                                                                                                                                                                                                                                             |
| `systemFingerprint`  | *string*                                                                                   | :heavy\_check\_mark: | System fingerprint                                              | fp\_44709d6fcb                                                                                                                                                                                                                                                                                                                                                                                      |
| `usage`              | [models.ChatUsage](/docs/agent-sdk/typescript/api-reference/models/chatusage)                   | :heavy\_minus\_sign: | Token usage statistics                                          | `{"completion_tokens": 15,"completion_tokens_details": {"reasoning_tokens": 5}`,<br />"cost": 0.0012,<br />"cost\_details": `{"upstream_inference_completions_cost": 0.0004,"upstream_inference_cost": null,"upstream_inference_prompt_cost": 0.0008}`,<br />"is\_byok": false,<br />"prompt\_tokens": 10,<br />"prompt\_tokens\_details": `{"cached_tokens": 2}`,<br />"total\_tokens": `25<br/>`} |
