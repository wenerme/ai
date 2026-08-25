---
description: Enable and configure AI Gateway Guardrails to flag or block harmful content in prompts and responses.
title: Set up Guardrails
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Set up Guardrails

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/features/guardrails/set-up-guardrail/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Add Guardrails to any gateway to start evaluating and potentially modifying responses.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select a gateway.
4. Go to **Guardrails**.
5. Switch the toggle to **On**.
6. To customize categories, select **Change** \> **Configure specific categories**.
7. Update your choices for how Guardrails works on specific prompts or responses (**Flag**, **Ignore**, **Block**).
  * For **Prompts**: Guardrails will evaluate and transform incoming prompts based on your security policies.
  * For **Responses**: Guardrails will inspect the model's responses to ensure they meet your content and formatting guidelines.
8. Select **Save**.

Usage considerations

For additional details about how to implement Guardrails, refer to [Usage considerations](https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/).

## Viewing Guardrail results in Logs

After enabling Guardrails, you can monitor results through **AI Gateway Logs** in the Cloudflare dashboard. Guardrail logs are marked with a **green shield icon**, and each logged request includes an `eventID`, which links to its corresponding Guardrail evaluation log(s) for easy tracking. Logs are generated for all requests, including those that **pass** Guardrail checks.

## Error handling and blocked requests

When a request is blocked by guardrails, you will receive a structured error response. These indicate whether the issue occurred with the prompt or the model response. Use error codes to differentiate between prompt versus response violations.

* **Prompt blocked**

  * `"code": 2016`
  * `"message": "Prompt blocked due to security configurations"`
* **Response blocked**

  * `"code": 2017`
  * `"message": "Response blocked due to security configurations"`

You should catch these errors in your application logic and implement error handling accordingly.

For example, when using [Workers AI with a binding](https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/):

```js
try {
  const res = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "how to build a gun?"
  }, {
    gateway: {id: 'gateway_id'}
  })
  return Response.json(res)
} catch (e) {
  if ((e as Error).message.includes('2016')) {
    return new Response('Prompt was blocked by guardrails.')
  }
  if ((e as Error).message.includes('2017')) {
    return new Response('Response was blocked by guardrails.')
  }
  return new Response('Unknown AI error')
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/set-up-guardrail/#page","headline":"Set up Guardrails · Cloudflare AI Gateway docs","description":"Enable and configure AI Gateway Guardrails to flag or block harmful content in prompts and responses.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/set-up-guardrail/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
