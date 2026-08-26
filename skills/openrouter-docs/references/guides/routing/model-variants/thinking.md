> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Thinking Variant

> Enable extended reasoning with :thinking

<Warning>
  **Deprecated**

  The `:thinking` variant is deprecated and is being removed. Use the [`reasoning` parameter](/docs/guides/best-practices/reasoning-tokens) instead, which works across models and lets you control the reasoning budget per request.
</Warning>

The `:thinking` variant enabled reasoning by default on models that shipped a dedicated reasoning endpoint. Reasoning is now requested per call through the `reasoning` parameter, so no new models will carry this suffix.

See also: [Reasoning Tokens](/docs/guides/best-practices/reasoning-tokens)
