For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/guides/routing/model-variants/llms.txt. For full documentation content, see https://openrouter.ai/docs/guides/routing/model-variants/llms-full.txt.

The `:extended` variant provides access to model versions with extended context windows.

## Usage

Append `:extended` to any model ID:

```json
{
  "model": "anthropic/claude-sonnet-4.5:extended"
}
```

## Details

Extended variants offer larger context windows than the standard model versions, allowing you to process longer inputs and maintain more conversation history.