> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Message Transforms

To help with prompts that exceed the maximum context size of a model, OpenRouter supports a context compression [plugin](/docs/guides/features/plugins) that can be enabled per-request:

```typescript
{
  plugins: [{ id: "context-compression" }], // Compress prompts that are > context size.
  messages: [...],
  model // Works with any model
}
```

This can be useful for situations where perfect recall is not required. The plugin works by removing or truncating messages from the middle of the prompt, until the prompt fits within the model's context window.

In some cases, the issue is not the token context length, but the actual number of messages. The plugin addresses this as well: For instance, Anthropic's Claude models enforce a maximum of {anthropicMaxMessagesCount} messages. When this limit is exceeded with context compression enabled, the plugin will keep half of the messages from the start and half from the end of the conversation.

When context compression is enabled, OpenRouter will first try to find models whose context length is at least half of your total required tokens (input + completion). For example, if your prompt requires 10,000 tokens total, models with at least 5,000 context length will be considered. If no models meet this criteria, OpenRouter will fall back to using the model with the highest available context length.

The compression will then attempt to fit your content within the chosen model's context window by removing or truncating content from the middle of the prompt. If context compression is disabled and your total tokens exceed the model's context length, the request will fail with an error message suggesting you either reduce the length or enable context compression.

<Note>
  [All OpenRouter endpoints](/models) with 8k (8,192 tokens) or less context
  length will default to using context compression. To disable this, pass
  `plugins: [{"id": "context-compression", "enabled": false}]` in the request body.
</Note>

The middle of the prompt is compressed because [LLMs pay less attention](https://arxiv.org/abs/2307.03172) to the middle of sequences.