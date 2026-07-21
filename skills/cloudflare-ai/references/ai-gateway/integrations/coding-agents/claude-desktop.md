---
title: Claude Desktop
description: Route Claude Desktop through AI Gateway using third-party inference settings and your Cloudflare gateway token.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Claude Desktop

[Claude Desktop ↗](https://claude.ai/download) can send third-party inference requests to a custom gateway. This configuration sends those requests to AI Gateway's [Anthropic endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/), authenticated with your Cloudflare gateway token. AI Gateway can supply the Anthropic credentials for you through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a [stored provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Prerequisites

Before you start, you need:

* An [authenticated gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) and its [gateway token](https://developers.cloudflare.com/ai-gateway/configuration/authentication/#setting-up-authenticated-gateway-using-the-dashboard). The gateway token must have `Run` permissions.
* Your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* Credentials for Anthropic requests. Use either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or an Anthropic API key stored in AI Gateway as a [provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
* Claude Desktop installed and updated to the latest version.

Note

For the simplest setup, set Claude Desktop's gateway API key to your Cloudflare gateway token. If you set the gateway API key to your own Anthropic API key instead, add `cf-aig-authorization: Bearer <CF_AIG_TOKEN>` as a custom inference header so AI Gateway can authenticate the request.

1. In Claude Desktop, select **Help** \> **Troubleshooting** \> **Enable Developer Mode**.
2. Select **Developer** \> **Configure Third-Party Inference**.
3. In **Connection**, set the connection type to _Gateway_.
4. In **Gateway credentials**, set **Credential kind** to _Static API key_.
5. Set **Gateway API key** to your Cloudflare gateway token.
Replace `<CF_AIG_TOKEN>` with your gateway token.
```txt
<CF_AIG_TOKEN>
```
6. Set **Gateway auth scheme** to _Bearer_.
7. Set the gateway base URL to your gateway's Anthropic endpoint.
Replace `<ACCOUNT_ID>` and `<GATEWAY_ID>` with your values.
```txt
https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic
```
8. In **Models**, add the Claude model you want to use.

| Field        | Value             |
| ------------ | ----------------- |
| Model ID     | claude-sonnet-4-5 |
| Display name | Claude Sonnet 4.5 |
| Tier alias   | sonnet            |
9. In **Gateway credentials**, select **Test connection**.
10. Start a Claude Desktop conversation. Requests now route through AI Gateway.

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/#page","headline":"Claude Desktop · Cloudflare AI Gateway docs","description":"Route Claude Desktop through AI Gateway using third-party inference settings and your Cloudflare gateway token.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/coding-agents/","name":"Coding agents"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/integrations/coding-agents/claude-desktop/","name":"Claude Desktop"}}]}
```
