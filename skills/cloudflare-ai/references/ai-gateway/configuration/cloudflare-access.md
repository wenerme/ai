---
description: Add identity-aware controls to AI Gateway so users authenticate with your identity provider before they can call your gateway.
title: Cloudflare Access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Access

Last updated Aug 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Protect your gateway with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/) so users authenticate with your identity provider before they can send requests. Putting AI Gateway behind Access gives you identity-aware control over your AI traffic: you decide who can reach the gateway, tie each request to a verified user, and govern usage per user without building your own authentication layer or passing user IDs from the client application.

To put AI Gateway behind Access, you must first [set a custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) on your gateway and have [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/) enabled on your account.

## How it works

When a request to a custom domain includes a valid Cloudflare Access JWT, AI Gateway accepts the Access JWT as the request credential. The client does not need to send an AI Gateway token for that request.

AI Gateway also adds the verified Access user ID to request metadata as [cf.user\_id](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/#reserved-metadata). This value is the Access JWT `sub` claim, not the user's email address. You can then filter logs, analytics, and spend by the authenticated user.

Before AI Gateway forwards the request to the upstream provider, it removes Cloudflare-only credentials such as the Access JWT and AI Gateway authorization headers.

Once a custom domain is protected by Access, every request to that domain must pass an Access policy. Requests that only include an AI Gateway token, without a valid Access token, are blocked by Access before they reach the gateway. Update existing integrations to authenticate through Access, or keep sending gateway-token traffic to the default `gateway.ai.cloudflare.com` endpoint, which is not protected by Access.

## Set up Access on a gateway

1. [Set up a custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) for the gateway you want to protect.
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **AI** \> **AI Gateway**.
3. Select the gateway you configured with a custom domain.
4. Go to the **Access** tab and set up Cloudflare Access on the gateway.
5. Add Access policies that define which users can call the gateway.

Setting up Access from the **Access** tab configures the Access application for you, so coding agents and other non-browser clients can authenticate by sending the Access token as a bearer token.

After setup, users can make requests to the custom domain after authenticating through Access. Requests with a valid Access user subject include `cf.user_id` in AI Gateway metadata.

## Make a request

After the user authenticates to Access, send requests to the custom domain without the account ID or gateway ID in the path:

```bash
curl -X POST "https://ai.example.com/openai/v1/chat/completions" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

If you call the custom domain from a non-browser client, include the Access token using the header or cookie format supported by Cloudflare Access. For example, [cloudflared access curl](https://developers.cloudflare.com/cloudflare-one/access-controls/authenticate-agents/#make-requests-with-cloudflared-access-curl) can send the Access token for command-line requests.

For coding agents, refer to the per-agent setup under [Coding agents](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/) — for example, [Claude Code](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/#use-with-cloudflare-access) and [OpenAI Codex](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/#use-with-cloudflare-access).

## Limitations

* `cf.user_id` is only added when AI Gateway receives a valid Access JWT with a non-empty user subject.
* Service-token requests do not include `cf.user_id` because they do not represent an individual Access user.
* You may not supply metadata keys that begin with `cf.`. These keys are reserved and are not saved.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/#page","headline":"Cloudflare Access · Cloudflare AI Gateway docs","description":"Add identity-aware controls to AI Gateway so users authenticate with your identity provider before they can call your gateway.","url":"https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
