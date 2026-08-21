> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Floor Variant

> Lowest-cost model inference with :floor

The `:floor` variant optimizes for cost. When you use `:floor`, OpenRouter sorts the model's providers by price and also makes [flex service tier](/docs/guides/features/service-tiers) endpoints eligible, so a provider's discounted flex tier can serve the request when it is the cheapest option.

## Usage

Append `:floor` to any model ID:

```json lines theme={null}
{
  "model": "openai/gpt-5.2:floor"
}
```

## How it works

`:floor` does two things:

1. **Sorts all eligible endpoints by price**, the same effect as setting [`provider.sort` to `"price"`](/docs/guides/routing/provider-selection#provider-sorting).
2. **Admits flex service tier endpoints** into the eligible pool. Unlike the [`service_tier: "flex"` parameter](/docs/guides/features/service-tiers), which restricts routing to flex endpoints, `:floor` keeps the whole pool: flex endpoints simply compete on price. Since flex pricing is discounted, flex endpoints tend to sort first, with regular endpoints as the next-cheapest fallback if a flex endpoint is unavailable.

Billing follows the tier the provider actually serves: a request served on the flex tier is billed at the flex rate, and if the provider serves it on the default tier instead, you're billed the default rate. See [Service Tiers](/docs/guides/features/service-tiers) for the full comparison of tier-selection options.

If you want price sorting without flex tier eligibility, set `provider.sort` to `"price"` instead of using `:floor`.
