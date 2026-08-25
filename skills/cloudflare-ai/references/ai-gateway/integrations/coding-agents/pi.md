---
description: Route the Pi coding agent through AI Gateway using its built-in Cloudflare AI Gateway provider.
title: Pi
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Pi

Last updated Jul 2, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Pi ↗](https://pi.dev) is a coding agent you run in your terminal. It has built-in support for AI Gateway, so instead of setting a base URL you select the `cloudflare-ai-gateway` provider and point Pi at your gateway. Pi builds the gateway endpoint from your account ID and gateway slug and routes requests through it.

## Prerequisites

Before you start, you need:

* An [authenticated gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) and its [gateway token](https://developers.cloudflare.com/ai-gateway/configuration/authentication/#setting-up-authenticated-gateway-using-the-dashboard). The gateway token must have `Run` permissions.
* Your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* Pi installed and updated to the latest version.

Note

The token you give Pi is your gateway token, not a model provider key. To pay for model usage, enable [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or store provider keys in AI Gateway with [BYOK (Store Keys)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/). Either way, AI Gateway handles the provider authentication for you.

1. Set your gateway token, account ID, and gateway slug as environment variables. The following commands set them for the current session. To persist them, add them to your shell profile (for example, `~/.zshrc` or `~/.bashrc`).
Replace `<CLOUDFLARE_API_KEY>` and `<CLOUDFLARE_ACCOUNT_ID>` with your values. You can leave `CLOUDFLARE_GATEWAY_ID` as `default` to route through your account's default gateway, or change it to another gateway slug.
```bash
# Run `wrangler auth token` to get an auth token.
export CLOUDFLARE_API_KEY="<CLOUDFLARE_API_KEY>"
# Run `wrangler whoami` to get your account ID.
export CLOUDFLARE_ACCOUNT_ID="<CLOUDFLARE_ACCOUNT_ID>"
# Use `default` to route through your account's default gateway.
export CLOUDFLARE_GATEWAY_ID="default"
```
```powershell
# Run `wrangler auth token` to get an auth token.
$env:CLOUDFLARE_API_KEY = "<CLOUDFLARE_API_KEY>"
# Run `wrangler whoami` to get your account ID.
$env:CLOUDFLARE_ACCOUNT_ID = "<CLOUDFLARE_ACCOUNT_ID>"
# Use `default` to route through your account's default gateway.
$env:CLOUDFLARE_GATEWAY_ID = "default"
```
Alternatively, leave out `CLOUDFLARE_API_KEY` and run `/login` inside Pi to store the token instead.
2. Start a session against a model. Requests now route through AI Gateway.
```bash
pi --provider cloudflare-ai-gateway --model "claude-sonnet-4-6"
```

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/#page","headline":"Pi · Cloudflare AI Gateway docs","description":"Route the Pi coding agent through AI Gateway using its built-in Cloudflare AI Gateway provider.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
