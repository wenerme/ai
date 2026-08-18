> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Floor Variant

> Lowest-cost model inference with :floor

The `:floor` variant is an alias for sorting providers by price. When you use `:floor`, OpenRouter will prioritize the cheapest providers for the model.

## Usage

Append `:floor` to any model ID:

```json lines theme={null}
{
  "model": "openai/gpt-5.2:floor"
}
```

This is exactly equivalent to setting `provider.sort` to `"price"` in your request. For more details on provider sorting, see the [Provider Routing documentation](/docs/guides/routing/provider-selection#provider-sorting).
