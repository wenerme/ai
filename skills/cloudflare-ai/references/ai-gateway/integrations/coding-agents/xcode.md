---
description: Route Xcode chat through an AI Gateway custom domain.
title: Xcode
image: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/xcode/og.png?v=74d8ec766ecacf8a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Xcode

Last updated Oct 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/xcode/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Xcode ↗︎](https://developer.apple.com/xcode/) supports internet-hosted chat providers that use the OpenAI Chat Completions API. Point a chat provider at an AI Gateway [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) protected by Cloudflare Access. Xcode authenticates with an Access service token stored as its API key.

This integration uses static credentials. Xcode cannot use `cloudflared` to generate short-lived Access tokens.

## Prerequisites

Before you start, you need:

- An AI Gateway with a [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/).
- Cloudflare Access enabled on the custom domain.
- An Access [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) allowed by a **Service Auth** policy.
- The Access application configured to [authenticate service tokens with the `Authorization` header](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#authenticate-with-a-single-header).
- [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or a stored [provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) for each model.
- Xcode installed and updated to the latest version.

Note

Service token requests do not include `cf.user_id` because they do not represent an individual Access user. You cannot filter AI Gateway logs by user for these requests.

1. In Xcode, go to **Xcode** > **Settings** > **Intelligence**.
2. Under **Chat**, select **Add a Chat Provider** > **Internet Hosted**.
3. Enter a name for the provider, such as `AI Gateway`.
4. For **URL**, enter your AI Gateway custom domain followed by `/compat`.

   Replace `ai.example.com` with your custom domain.

   ```txt
   https://ai.example.com/compat
   ```

   Xcode appends `/v1/models` to list available models. It sends prompts to `/v1/chat/completions`. AI Gateway accepts both paths under the `compat` endpoint.

   Note

   The `/compat` endpoint is deprecated for standard single-model calls. Xcode requires an endpoint that supports both `/v1/models` and `/v1/chat/completions`. The AI Gateway REST API does not provide a `/v1/models` endpoint.
5. For **API Key**, enter the following single-header service token value. Replace `<CLIENT_ID>` and `<CLIENT_SECRET>` with your Access service token values.

   ```json
   {"cf-access-client-id":"<CLIENT_ID>","cf-access-client-secret":"<CLIENT_SECRET>"}
   ```

6. Set **API Key Header** to `Authorization`.
7. Select **Add**.
8. Enable a model, then select it in the coding assistant and send a prompt. Requests now route through AI Gateway.

For more information about custom chat providers, refer to [Setting up coding intelligence ↗︎](https://developer.apple.com/documentation/xcode/setting-up-coding-intelligence).

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/xcode/#page","headline":"Xcode","description":"Route Xcode chat through an AI Gateway custom domain.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/xcode/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/xcode/og.png?v=74d8ec766ecacf8a","dateModified":"2026-10-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
