> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Auto Exacto

Auto Exacto is a routing step that automatically optimizes provider ordering for all requests that include tools. It runs by default on every tool-calling request, requiring no configuration.

## How It Works

When your request includes tools, Auto Exacto reorders the available providers for your chosen model using a combination of real-world performance signals:

* **Throughput** -- real-time tokens-per-second metrics (visible on the [Performance tab](https://openrouter.ai/models) of any model page).
* **Tool-calling success rate** -- how reliably each provider completes tool calls (also visible on the Performance tab).
* **Benchmark data** -- internal evaluation results we are actively collecting. This data will be shown publicly soon but is not yet available on the site.

Providers that underperform on these signals are deprioritized, while providers with strong track records are moved to the front of the list.

## How Tool-Calling Success Rate Is Measured

The tool-calling success rate signal is derived from the **Tool Call Error Rate** metric, which is also visible on the Performance tab of any model page. For each request that includes tools, OpenRouter inspects every tool call the model returned and validates it against the schemas the caller supplied.

### Validator

Tool call `arguments` are validated against the corresponding `tools[].function.parameters` schema using [`@cfworker/json-schema`](https://www.npmjs.com/package/@cfworker/json-schema), pinned to **JSON Schema Draft 7**:

```ts
new Validator(parameters, '7')
```

Tools whose `parameters` schema is absent or fails to compile are treated as having no schema and are always considered valid, so the metric is conservative when caller-side schemas are malformed.

### Regex engine

`@cfworker/json-schema` delegates `pattern` and `patternProperties` to the runtime's built-in regex implementation. In OpenRouter's environment that is the native JavaScript `RegExp` (V8 / ECMA-262). There is no ECMA-262-conformance shim layered on top, so JavaScript regex semantics differ in some edge cases from the regex dialect specified by JSON Schema.

### Per-tool-call classification

Each tool call is bucketed into one of three error categories, or counted as valid:

* **`InvalidJson`** -- `JSON.parse(arguments)` throws.
* **`UnknownName`** -- `function.name` is not present in the request's `tools[]`.
* **`SchemaMismatch`** -- the validator returns `valid: false` against the resolved schema.

### Request-level aggregation

A request is flagged as errored if **any** of its tool calls falls into one of the three buckets above. The Tool Call Error Rate displayed per endpoint per day is then computed at the **request** level -- both the numerator and the denominator are counts of requests, not counts of individual tool calls:

```
requests_with_tool_call_errors / requests_where_finish_reason_is_tool_calls
```

In other words: of all the requests where the model finished by emitting tool calls, what fraction had at least one tool call that hit one of the three error buckets. A request with five tool calls and one invalid call counts as one errored request, not one-out-of-five.

### Caveats

* Keywords introduced only in JSON Schema Draft 2019-09 or 2020-12 (for example `unevaluatedProperties`, `$dynamicRef`) are not enforced under Draft 7.
* JavaScript regex semantics differ from the ECMA-262 regex dialect formally referenced by JSON Schema, so `pattern` checks may behave differently than a strict JSON Schema implementation would.

## Results

We have observed notable improvements in [tau-bench](https://github.com/sierra-research/tau-bench) scores and tool-calling success rates when Auto Exacto is active. More detailed benchmark results will be published as our evaluation data becomes publicly available.

## Opting Out

Without Auto Exacto, OpenRouter's default routing is primarily [price-weighted](/docs/guides/routing/provider-selection#price-based-load-balancing-default-strategy) -- requests are load balanced across providers with a strong preference for lower cost. Auto Exacto changes this for tool-calling requests by reordering providers based on quality signals instead of price.

If you want to restore the previous price-weighted behavior for tool-calling requests, you can opt out by explicitly sorting by price using any of the following methods:

* **`provider.sort` parameter** -- set `sort` to `"price"` in the `provider` object of your request body. See [Provider Sorting](/docs/guides/routing/provider-selection#provider-sorting) for details.
* **`:floor` virtual variant** -- append `:floor` to any model slug (e.g. `openai/gpt-4o:floor`) to sort by price. See [Floor Price Shortcut](/docs/guides/routing/provider-selection#floor-price-shortcut).
* **Default sort in account settings** -- set your default provider sort to price in your [account settings](https://openrouter.ai/settings/preferences) to apply price sorting across all requests.

Any of these will bypass Auto Exacto and return to the standard price-weighted provider ordering.