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

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI Gateway allows you to set custom costs at the request level. By using this feature, the cost metrics can accurately reflect your unique pricing, overriding the default or public model costs.

Note

Custom costs will only apply to requests that pass tokens in their response. Requests without token information will not have costs calculated.

## Custom cost

To add custom costs to your API requests, use the `cf-aig-custom-cost` header. This header enables you to specify the cost per token for both input (tokens sent) and output (tokens received).

* **per\_token\_in**: The negotiated input token cost (per token).
* **per\_token\_out**: The negotiated output token cost (per token).

There is no limit to the number of decimal places you can include, ensuring precise cost calculations, regardless of how small the values are.

Custom costs will appear in the logs with an underline, making it easy to identify when custom pricing has been applied.

In this example, if you have a negotiated price of $1 per million input tokens and $2 per million output tokens, include the `cf-aig-custom-cost` header as shown below.

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-custom-cost: {"per_token_in":0.000001,"per_token_out":0.000002}' \
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/#page","headline":"Custom costs · Cloudflare AI Gateway docs","description":"Override default or public model costs on a per-request basis.","url":"https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
