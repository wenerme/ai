---
description: Route VS Code chat through an AI Gateway custom domain.
title: Visual Studio Code
image: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/vs-code/og.png?v=bb241cad8f248da5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Visual Studio Code

Last updated Oct 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/vs-code/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Visual Studio Code ↗︎](https://code.visualstudio.com/) supports custom endpoint models for chat. Point a custom endpoint at an AI Gateway [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) protected by Cloudflare Access. Visual Studio Code authenticates with an Access service token stored in its secret storage.

This integration uses static credentials. Visual Studio Code cannot use `cloudflared` to generate short-lived Access tokens.

## Prerequisites

Before you start, you need:

- An AI Gateway with a [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/).
- Cloudflare Access enabled on the custom domain.
- An Access [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) allowed by a **Service Auth** policy.
- The Access application configured to [authenticate service tokens with the `Authorization` header](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#authenticate-with-a-single-header).
- [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or a stored [provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) for each model.
- Visual Studio Code installed and updated to the latest version.

Note

Service token requests do not include `cf.user_id` because they do not represent an individual Access user. You cannot filter AI Gateway logs by user for these requests.

1. In Visual Studio Code, open the Command Palette and run **Chat: Manage Language Models**.
2. Select **Add Models** > **Custom Endpoint**.
3. Enter a group name, such as `AI Gateway`.
4. Enter a display name and API key. For the API key, use the following single-header service token value. Replace `<CLIENT_ID>` and `<CLIENT_SECRET>` with your Access service token values.

   ```json
   {"cf-access-client-id":"<CLIENT_ID>","cf-access-client-secret":"<CLIENT_SECRET>"}
   ```

5. Select **Chat Completions** as the API type.
6. In the `chatLanguageModels.json` file that opens, configure your models. Replace `ai.example.com` with your AI Gateway custom domain. Replace the model IDs and token limits with values supported by your models.

   *chatLanguageModels.jsonjson*



   ```json
   [
     {
       "name": "AI Gateway",
       "vendor": "customendpoint",
       "apiKey": "${input:cloudflareAccessServiceToken}",
       "apiType": "chat-completions",
       "models": [
         {
           "id": "openai/gpt-4.1-mini",
           "name": "GPT-4.1 mini",
           "url": "https://ai.example.com/compat/chat/completions",
           "toolCalling": true,
           "vision": true,
           "maxInputTokens": 1000000,
           "maxOutputTokens": 32768,
           "requestHeaders": {
             "Authorization": "${apiKey}"
           }
         }
       ]
     }
   ]
   ```

   Visual Studio Code replaces `${apiKey}` with the service token value stored in secret storage. The `Authorization` override prevents Visual Studio Code's default authentication behavior from adding a `Bearer` prefix.
7. Save the file, then select the model from the chat model picker.
8. Send a prompt. Requests now route through AI Gateway.

For more information about custom endpoint settings, refer to [AI language models in Visual Studio Code ↗︎](https://code.visualstudio.com/docs/copilot/customization/language-models#_add-a-custom-endpoint-model).

## Configure a WAF exception

When you use an AI Gateway custom domain, WAF rule ...851d2f71 (**Command Injection - Common Attack Commands**) can block prompts that contain shell commands.

If the rule blocks Visual Studio Code requests, [create a WAF exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) that skips only this rule for your AI Gateway custom domain. Scope the exception as narrowly as possible.

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/vs-code/#page","headline":"Visual Studio Code","description":"Route VS Code chat through an AI Gateway custom domain.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/vs-code/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/vs-code/og.png?v=bb241cad8f248da5","dateModified":"2026-10-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
