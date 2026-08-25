---
description: Set up the FlagshipServerProvider to evaluate Flagship feature flags from Python server applications using OpenFeature.
title: Python SDK
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Python SDK

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/flagship/sdk/python/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Python SDK provides an OpenFeature-compatible `FlagshipServerProvider` for server-side Python applications. It evaluates flags over HTTP and does not support the Cloudflare Workers binding.

## Installation

Install with `uv` or `pip`:

```sh
uv add cloudflare-flagship
```

```sh
pip install cloudflare-flagship
```

## Setup

Configure the provider with your Flagship app ID, Cloudflare account ID, and an API token with Flagship Evaluate permission.

```python
from openfeature import api
from openfeature.evaluation_context import EvaluationContext
from flagship import FlagshipServerProvider

api.set_provider(
    FlagshipServerProvider(
        app_id="<APP_ID>",
        account_id="<ACCOUNT_ID>",
        auth_token="<API_TOKEN>",
    )
)

client = api.get_client()
enabled = client.get_boolean_value(
    "new-checkout",
    False,
    EvaluationContext(targeting_key="user-42", attributes={"plan": "enterprise"}),
)
```

## Flag types

The Python SDK supports all OpenFeature flag types. Python's OpenFeature SDK separates numeric values into integer and float methods.

```python
enabled = client.get_boolean_value("new-checkout", False, context)
variant = client.get_string_value("homepage-hero", "control", context)
limit = client.get_integer_value("upload-limit", 10, context)
rate = client.get_float_value("sample-rate", 0.1, context)
config = client.get_object_value("ui-config", {"theme": "light"}, context)
```

Use the `*_details` methods when you need the resolved value, reason, variant, or error code.

## Configuration options

| Option           | Type                               | Default | Description                                                 |
| ---------------- | ---------------------------------- | ------- | ----------------------------------------------------------- |
| app\_id          | str                                | None    | Flagship app ID.                                            |
| account\_id      | str                                | None    | Required with app\_id.                                      |
| auth\_token      | str                                | None    | Bearer token added to every request.                        |
| headers\_factory | Callable\[\[\], dict\[str, str\]\] | None    | Dynamic per-request headers.                                |
| timeout          | float                              | 5.0     | Request timeout in seconds.                                 |
| retries          | int                                | 1       | Retry attempts on transient errors, capped at 10.           |
| retry\_delay     | float                              | 1.0     | Delay between retries in seconds, capped at 30.0.           |
| logging          | bool                               | False   | Enable SDK-level debug output through the SDK logger.       |
| cache\_ttl       | float                              | None    | Cache TTL in seconds. Enables caching when set.             |
| cache\_max\_size | int                                | 1000    | Maximum cached entries before least-recently-used eviction. |

## Response caching

Server-side response caching is off by default. Enable it with `cache_ttl` when you want repeated evaluations for the same flag, type, and evaluation context to reuse a recent result.

```python
FlagshipServerProvider(
    app_id="<APP_ID>",
    account_id="<ACCOUNT_ID>",
    auth_token="<API_TOKEN>",
    cache_ttl=30.0,
    cache_max_size=1000,
)
```

Cached values may be stale until the TTL expires. Keep the TTL short for flags that you expect to change during active rollouts. The provider does not cache disabled flags or errors.

## Evaluation context

Context attributes are sent as URL query parameters. Supported values are strings, integers, floats, booleans, and `datetime` values. Dictionaries, lists, tuples, and other complex values raise `InvalidContextError`.

## Async evaluation

The async API mirrors the sync API:

```python
enabled = await client.get_boolean_value_async("new-checkout", False, context)
details = await client.get_boolean_details_async("new-checkout", False, context)
```

When shutting down in an async context, use `shutdown_async()`:

```python
await api.shutdown_async()
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/sdk/python/#page","headline":"Python SDK · Cloudflare Flagship docs","description":"Set up the FlagshipServerProvider to evaluate Flagship feature flags from Python server applications using OpenFeature.","url":"https://developers.cloudflare.com/flagship/sdk/python/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
