---
description: Route Gemini CLI through an Access-protected AI Gateway custom domain.
title: Gemini CLI
image: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/gemini-cli/og.png?v=bfa3016cbc84b6de
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Gemini CLI

Last updated Oct 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/gemini-cli/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Gemini CLI ↗︎](https://github.com/google-gemini/gemini-cli) supports a custom Google Gemini API base URL. Point it at an AI Gateway [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) protected by Cloudflare Access. Use `cloudflared` to generate a short-lived Access token before you start Gemini CLI.

Gemini CLI does not support an API key helper. You must refresh the token when the Access session expires.

## Prerequisites

Before you start, you need:

- An AI Gateway with a [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/).
- Cloudflare Access enabled on the custom domain with a policy that allows your identity.
- Credentials for Google AI Studio. Use [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or store a Google AI Studio key in AI Gateway with [BYOK (Store Keys)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
- [`cloudflared`](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) installed.
- [Gemini CLI ↗︎](https://github.com/google-gemini/gemini-cli) installed and updated to the latest version.

1. Set the Google Gemini base URL to your AI Gateway custom domain. Replace `ai.example.com` with your custom domain.

   ```bash
   export GOOGLE_GEMINI_BASE_URL="https://ai.example.com/google-ai-studio"
   ```


2. Authenticate to Access and store the resulting token in `GEMINI_API_KEY`.

   ```bash
   export GEMINI_API_KEY="$(cloudflared access login -app https://ai.example.com)"
   ```


3. Start Gemini CLI and send a prompt. Requests now route through AI Gateway.

   ```bash
   gemini
   ```



Run the authentication command again when the Access token expires. You can also add these commands to a bootstrap script that starts Gemini CLI.

For more information about these environment variables, refer to [Gemini CLI configuration ↗︎](https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md#environment-variables-and-env-files).

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/gemini-cli/#page","headline":"Gemini CLI","description":"Route Gemini CLI through an Access-protected AI Gateway custom domain.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/gemini-cli/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/gemini-cli/og.png?v=bfa3016cbc84b6de","dateModified":"2026-10-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
