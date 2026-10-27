---
description: Route Claude Desktop through AI Gateway using a gateway token or a Cloudflare Access helper script.
title: Claude Desktop
image: https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/og.png?v=f18a1a6c012ea5f8
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Desktop

Last updated Oct 26, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

By pointing [Claude Desktop ↗︎](https://claude.ai/download) at AI Gateway instead of Anthropic directly, you get observability, caching, and centralized credentials for your Anthropic requests, without changing how you use Claude Desktop. Claude Desktop can send third-party inference requests to a custom gateway; this configuration sends those requests to AI Gateway's [Anthropic endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/), authenticated with your Cloudflare gateway token or Cloudflare Access. AI Gateway can supply the Anthropic credentials for you through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a [stored provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

If your gateway is protected by Cloudflare Access, refer to [Use with Cloudflare Access](#use-with-cloudflare-access).

## Prerequisites

Before you start, you need:

- For gateway-token authentication, an [authenticated gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) and its [gateway token](https://developers.cloudflare.com/ai-gateway/configuration/authentication/#setting-up-authenticated-gateway-using-the-dashboard). The gateway token must have `Run` permissions.
- For gateway-token authentication, your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
- Credentials for Anthropic requests. Use either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits or an Anthropic API key stored in AI Gateway as a [provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
- Claude Desktop installed and updated to the latest version.

## Use with a gateway token

Note

For the simplest setup, set Claude Desktop's gateway API key to your Cloudflare gateway token. If you set the gateway API key to your own Anthropic API key instead, add `cf-aig-authorization: Bearer <CF_AIG_TOKEN>` as a custom inference header so AI Gateway can authenticate the request.

1. In Claude Desktop, select **Help** > **Troubleshooting** > **Enable Developer Mode**.
2. Select **Developer** > **Configure Third-Party Inference**.
3. In **Connection**, set the connection type to *Gateway*.
4. In **Gateway credentials**, set **Credential kind** to *Static API key*.
5. Set **Gateway API key** to your Cloudflare gateway token.

   Replace `<CF_AIG_TOKEN>` with your gateway token.

   ```txt
   <CF_AIG_TOKEN>
   ```

6. Set **Gateway auth scheme** to *Bearer*.
7. Set the gateway base URL to your gateway's Anthropic endpoint.

   Replace `<ACCOUNT_ID>` and `<GATEWAY_ID>` with your values.

   ```txt
   https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic
   ```

8. In **Models**, add the Claude model you want to use.

   | Field | Value |
   | --- | --- |
   | Model ID | `claude-sonnet-4-5` |
   | Display name | `Claude Sonnet 4.5` |
   | Tier alias | `sonnet` |
9. In **Gateway credentials**, select **Test connection**.
10. Start a Claude Desktop conversation. Requests now route through AI Gateway.

## Use with Cloudflare Access

If your gateway is protected by [Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/), Claude Desktop can authenticate with a short-lived Access token instead of a gateway token. Use a local helper script to fetch the token with `cloudflared`.

Before you start, [set up a custom domain protected by Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/#set-up-access-on-a-gateway) with a policy that allows your identity. [Install `cloudflared`](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) on the machine running Claude Desktop.

1. Create a local helper script, replacing `ai-gateway.example.com` with your gateway's custom domain:

   *aig-access.shsh*



   ```sh
   #!/bin/sh
   exec cloudflared access login --no-verbose --app https://ai-gateway.example.com
   ```

   The `--no-verbose` flag prints only the JSON Web Token (JWT) to standard output, as the helper requires. If Claude Desktop cannot find `cloudflared`, replace it in the script with the full path returned by `command -v cloudflared`.
2. Make the script executable:

   ```sh
   chmod +x aig-access.sh
   ```

3. In Claude Desktop, select **Help** > **Troubleshooting** > **Enable Developer Mode**.
4. Select **Developer** > **Configure Third-Party Inference**.
5. In **Connection**, set the connection type to *Gateway*.
6. In **Gateway credentials**, set **Credential kind** to *Helper script* and **Gateway auth scheme** to *Bearer*.
7. Set the gateway base URL to `https://ai-gateway.example.com/anthropic`, replacing `ai-gateway.example.com` with your gateway's custom domain.
8. In **Helper Script**, set the path to your local `aig-access.sh` script. Use the full path to the file.
9. In **Models**, add the Claude model you want to use.
10. In **Gateway credentials**, select **Test connection**. Complete the Access login flow when prompted, then start a Claude Desktop conversation.

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/#page","headline":"Claude Desktop","description":"Route Claude Desktop through AI Gateway using a gateway token or a Cloudflare Access helper script.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-desktop/og.png?v=f18a1a6c012ea5f8","dateModified":"2026-10-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
