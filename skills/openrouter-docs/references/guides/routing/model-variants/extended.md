> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Extended Variant

> Extended context windows with :extended

<Warning>
  **Deprecated**

  The `:extended` variant is deprecated and no model on OpenRouter currently offers it. Requests to a `model:extended` slug have no endpoints to route to and will fail.

  Use the base model slug instead and pick a model whose standard context length fits your input. The [models browser](https://openrouter.ai/models) and the [models API](https://openrouter.ai/api/v1/models) list each model's `context_length`, and the static variants a model does support appear as their own entries there.
</Warning>

The `:extended` variant provided access to model versions with larger context windows than the standard version, appended to a model ID as `model:extended`. The models that offered it have since been retired, and no replacement variant exists.
