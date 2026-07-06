> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Crypto API

> Coinbase Commerce API deprecation

<Warning>
  Coinbase deprecated the APIs used by this flow, so `POST /api/v1/credits/coinbase` has been
  removed and now returns `410 Gone`.
</Warning>

## Status

The old programmatic Coinbase Commerce charge flow is no longer supported because Coinbase
deprecated the underlying APIs it relied on. This includes the legacy flow that returned on-chain
calldata for direct settlement.

## What To Use Instead

Use the web credits purchase flow on your
[credits page](https://openrouter.ai/settings/credits). OpenRouter now uses Coinbase Business
Checkouts for active Coinbase credit purchases.

## Affected Endpoint

```text lines theme={null}
POST /api/v1/credits/coinbase
```

Current behavior:

```json lines theme={null}
{
  "error": {
    "code": 410,
    "message": "The Coinbase APIs used by this endpoint have been deprecated, so the Coinbase Commerce credits API has been removed. Use the web credits purchase flow instead."
  }
}
```

## Notes

* Existing SDK surfaces may still contain the deprecated `createCoinbaseCharge` method until the
  next SDK regeneration.
* New Coinbase webhook handling is for Coinbase Business Checkouts only.
* Legacy Coinbase Commerce environment variables are no longer used.
