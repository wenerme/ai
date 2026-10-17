---
description: Route Cursor chat and agent requests through AI Gateway using a custom OpenAI base URL.
title: Cursor
image: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/cursor/og.png?v=fcc31784012b2f01
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Cursor

Last updated Oct 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/cursor/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cursor ↗︎](https://cursor.com/) supports a custom OpenAI base URL for models that use a custom API key. Point it at AI Gateway's [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) to route Cursor chat and agent requests through AI Gateway. Cursor sends requests through its servers, so your AI Gateway endpoint must be publicly reachable.

## Prerequisites

Before you start, you need:

- Your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
- A [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Account** > **Workers AI** > **Read** permission.
- [Credits loaded](https://developers.cloudflare.com/ai-gateway/features/unified-billing/#load-credits) on your account for third-party models.
- [Cursor ↗︎](https://cursor.com/downloads) installed and updated to the latest version.

1. In Cursor, go to **Cursor Settings** > **Models**. Under **API Keys**, enter your Cloudflare API token in the **OpenAI API Key** field, then select **Save**.
2. Turn on **Override OpenAI Base URL**. Enter the following value, replacing `<ACCOUNT_ID>` with your Cloudflare account ID:

   ```txt
   https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1
   ```

   Note

   If Cursor does not show **Override OpenAI Base URL**, this Cursor version or plan does not support routing OpenAI-compatible requests through AI Gateway.
3. Select **+ Add Custom Model**. Enter a model name, then turn on the model.

   Use a Workers AI model for chat, such as `@cf/meta/llama-3.3-70b-instruct-fp8-fast`. For agent mode, use a third-party model that supports the OpenAI Responses API, such as `openai/gpt-4.1-mini`.

   For available models, refer to the [model catalog](https://developers.cloudflare.com/ai/models/).
4. Select the custom model in Cursor and send a prompt. Requests now route through AI Gateway.

Note

Workers AI models work with Cursor chat requests through the OpenAI Chat Completions API. Cursor agent mode uses the OpenAI Responses API. Use a third-party Responses-compatible model, such as `openai/gpt-4.1-mini`, for agent mode.

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/cursor/#page","headline":"Cursor","description":"Route Cursor chat and agent requests through AI Gateway using a custom OpenAI base URL.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/cursor/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/cursor/og.png?v=fcc31784012b2f01","dateModified":"2026-10-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
