> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Free Variant

> Access free models with the :free variant

export const FREE_MODEL_RATE_LIMIT_RPM = 20;

export const FREE_MODEL_NO_CREDITS_RPD = 50;

export const FREE_MODEL_HAS_CREDITS_RPD = 1000;

export const FREE_MODEL_CREDITS_THRESHOLD = 10;

The `:free` variant allows you to access free versions of models on OpenRouter.

## Usage

Append `:free` to any model ID:

```json lines theme={null}
{
  "model": "meta-llama/llama-3.2-3b-instruct:free"
}
```

## Rate limits

Free variants have no per-token cost, but every request against a `:free` model counts toward the account-wide free-model rate limits. The limits apply to your OpenRouter account as a whole — they are **not** per model, and pinning a specific `:free` model does not raise them.

| Credits purchased (all time)             | Requests per minute         | Requests per day             |
| ---------------------------------------- | --------------------------- | ---------------------------- |
| Less than {FREE_MODEL_CREDITS_THRESHOLD} | {FREE_MODEL_RATE_LIMIT_RPM} | {FREE_MODEL_NO_CREDITS_RPD}  |
| At least {FREE_MODEL_CREDITS_THRESHOLD}  | {FREE_MODEL_RATE_LIMIT_RPM} | {FREE_MODEL_HAS_CREDITS_RPD} |

The threshold looks at credits purchased *all time*, so a one-time top-up of at least {FREE_MODEL_CREDITS_THRESHOLD} credits keeps you at the higher daily limit even after your current balance drops back down. See [Rate limits](/docs/api_reference/limits#rate-limits) for the full behavior, including 429 handling.

## Details

Free variants provide access to models without cost, but may have different availability than paid versions — free capacity is contributed by upstream providers and can change or be temporarily unavailable. If you need guaranteed capacity or higher throughput, use the paid variant of the same model (no `:free` suffix), which is not subject to the free-model request cap.

## Related resources

* [Rate limits](/docs/api_reference/limits#rate-limits) - Full details on free-model quotas and 429 handling
* [Free Models Router](/docs/guides/routing/routers/free-router) - Automatically route across all free models
* [Free Models Router in Chat Playground](/docs/cookbook/get-started/free-models-router-playground) - Try the router without writing code
