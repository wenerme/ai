---
description: Override default or public model costs on a per-request basis.
title: Custom costs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom costs

Last updated Sep 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI Gateway allows you to set custom costs at the request level. Custom costs can reflect your negotiated input, output, cache-read, and cache-write rates. They override the default or public model costs.

Note

Custom costs will only apply to requests that pass tokens in their response. Requests without token information will not have costs calculated.

## Custom cost

To add custom costs to your API requests, use the `cf-aig-custom-cost` header. This header supports the following properties:

* `per_token_in`: Cost per input token.
* `per_token_out`: Cost per output token.
* `per_cache_read_token`: Cost per cache-read token.
* `per_cache_write_token`: Cost per cache-write token.

There is no limit to the number of decimal places you can include, ensuring precise cost calculations, regardless of how small the values are.

Cache-token pricing is optional. To turn it on, specify at least one cache rate. If you specify only one cache rate, the other defaults to `per_token_in`. If you omit both cache rates, AI Gateway ignores cache-token counts and uses the existing input and output calculation.

## Cache-token calculations

Providers report cache usage in different ways. Some include cache-read and cache-write tokens within the input token count. Others report input and cache tokens as separate counts.

AI Gateway automatically accounts for how each provider and model reports cache usage. When cache tokens are included in the input count, AI Gateway subtracts them before applying `per_token_in`. When cache tokens are reported separately, AI Gateway applies their costs in addition to the input cost. This prevents cache tokens from being double-counted.

For example, an inclusive response reports the following usage:

* 1,000 input tokens
* 600 cache-read tokens
* 200 cache-write tokens
* 100 output tokens

AI Gateway calculates 200 fresh input tokens: `1,000 - 600 - 200`. It then applies each custom rate to its corresponding token count.

Custom costs will appear in the logs with an underline, making it easy to identify when custom pricing has been applied.

In this example, the negotiated prices are $1 per million input tokens, $2 per million output tokens, $0.10 per million cache-read tokens, and $0.50 per million cache-write tokens.

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-custom-cost: {"per_token_in":0.000001,"per_token_out":0.000002,"per_cache_read_token":0.0000001,"per_cache_write_token":0.0000005}' \
  --data ' {
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "user",
            "content": "When is Cloudflare’s Birthday Week?"
          }
        ]
      }'
```

Note

If a response is served from cache (cache hit), the cost is always `0`, even if you specified a custom cost. Custom costs only apply when the request reaches the model provider.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/#page","headline":"Custom costs · Cloudflare AI Gateway docs","description":"Override default or public model costs on a per-request basis.","url":"https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
