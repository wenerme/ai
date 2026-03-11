Auto Exacto is a routing step that automatically optimizes provider ordering for all requests that include tools. It runs by default on every tool-calling request, requiring no configuration.

## How It Works

When your request includes tools, Auto Exacto reorders the available providers for your chosen model using a combination of real-world performance signals:

* **Throughput** -- real-time tokens-per-second metrics (visible on the [Performance tab](https://openrouter.ai/models) of any model page).
* **Tool-calling success rate** -- how reliably each provider completes tool calls (also visible on the Performance tab).
* **Benchmark data** -- internal evaluation results we are actively collecting. This data will be shown publicly soon but is not yet available on the site.

Providers that underperform on these signals are deprioritized, while providers with strong track records are moved to the front of the list.

## Results

We have observed notable improvements in [tau-bench](https://github.com/sierra-research/tau-bench) scores and tool-calling success rates when Auto Exacto is active. More detailed benchmark results will be published as our evaluation data becomes publicly available.

## Opting Out

Without Auto Exacto, OpenRouter's default routing is primarily [price-weighted](/docs/guides/routing/provider-selection#price-based-load-balancing-default-strategy) -- requests are load balanced across providers with a strong preference for lower cost. Auto Exacto changes this for tool-calling requests by reordering providers based on quality signals instead of price.

If you want to restore the previous price-weighted behavior for tool-calling requests, you can opt out by explicitly sorting by price using any of the following methods:

* **`provider.sort` parameter** -- set `sort` to `"price"` in the `provider` object of your request body. See [Provider Sorting](/docs/guides/routing/provider-selection#provider-sorting) for details.
* **`:floor` virtual variant** -- append `:floor` to any model slug (e.g. `openai/gpt-4o:floor`) to sort by price. See [Floor Price Shortcut](/docs/guides/routing/provider-selection#floor-price-shortcut).
* **Default sort in account settings** -- set your default provider sort to price in your [account settings](https://openrouter.ai/settings/preferences) to apply price sorting across all requests.

Any of these will bypass Auto Exacto and return to the standard price-weighted provider ordering.
