> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Free Variant

> Access free models with the :free variant

The `:free` variant allows you to access free versions of models on OpenRouter.

## Usage

Append `:free` to the ID of a model that has a free entry. `:free` is a [catalog variant](/docs/guides/routing/model-variants/overview), so the free version appears as its own entry in the [models API](/docs/guides/overview/models) with its own pricing, context length, and endpoints, and only models that list one support it:

```json lines theme={null}
{
  "model": "meta-llama/llama-3.2-3b-instruct:free"
}
```

## Details

Free variants provide access to models without cost, but may have different rate limits or availability compared to paid versions.

## Related Resources

* [Free Models Router](/docs/cookbook/get-started/free-models-router-playground) - Learn how to use the Free Models Router in the Chat Playground for zero-cost inference
