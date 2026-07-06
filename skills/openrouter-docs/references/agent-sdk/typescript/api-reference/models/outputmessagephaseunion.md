> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputMessagePhaseUnion - TypeScript SDK

> OutputMessagePhaseUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages.

## Supported Types

### `models.OutputMessagePhaseCommentary`

```typescript lines theme={null}
const value: models.OutputMessagePhaseCommentary = "commentary";
```

### `models.OutputMessagePhaseFinalAnswer`

```typescript lines theme={null}
const value: models.OutputMessagePhaseFinalAnswer = "final_answer";
```

### `any`

```typescript lines theme={null}
const value: any = "<value>";
```
