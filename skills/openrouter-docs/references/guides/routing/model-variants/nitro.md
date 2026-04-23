> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/guides/routing/model-variants/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/guides/routing/model-variants/llms-full.txt.

# Nitro Variant

The `:nitro` variant is an alias for sorting providers by throughput. When you use `:nitro`, OpenRouter will prioritize providers with the highest throughput (tokens per second).

## Usage

Append `:nitro` to any model ID:

```json
{
  "model": "openai/gpt-5.2:nitro"
}
```

This is exactly equivalent to setting `provider.sort` to `"throughput"` in your request. For more details on provider sorting, see the [Provider Routing documentation](/docs/guides/routing/provider-selection#provider-sorting).