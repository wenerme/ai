The `:nitro` variant is an alias for sorting providers by throughput. When you use `:nitro`, OpenRouter will prioritize providers with the highest throughput (tokens per second).

## Usage

Append `:nitro` to any model ID:

```json
{
  "model": "openai/gpt-5.2:nitro"
}
```

This is exactly equivalent to setting `provider.sort` to `"throughput"` in your request. For more details on provider sorting, see the [Provider Routing documentation](/docs/features/provider-routing#provider-sorting).
