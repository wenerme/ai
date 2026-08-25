---
description: Route Claude Code through AI Gateway using your Cloudflare gateway token.
title: Claude Code
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude Code

Last updated Aug 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

By pointing [Claude Code ↗](https://docs.anthropic.com/en/docs/claude-code/overview) at AI Gateway instead of a provider directly, you get observability, caching, rate limiting, and centralized credentials for Anthropic, Amazon Bedrock, or Google Vertex AI, without changing how you invoke `claude`. Claude Code reads its endpoint and credentials from environment variables. If your gateway is protected by Cloudflare Access, refer to [Use with Cloudflare Access](#use-with-cloudflare-access). This configuration sends requests to AI Gateway's [Anthropic endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/), authenticated with your Cloudflare gateway token. The Anthropic endpoint exposes the same `/v1/messages` API that Claude Code expects. When AI Gateway supplies the Anthropic credentials for you — using either an Anthropic API key you [store as a provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) or [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits — the `ANTHROPIC_API_KEY` that Claude Code requires can be any placeholder value.

## Prerequisites

Before you start, you need:

* An [authenticated gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) and its [gateway token](https://developers.cloudflare.com/ai-gateway/configuration/authentication/#setting-up-authenticated-gateway-using-the-dashboard). The gateway token must have `Run` permissions.
* Your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* Credentials for the provider you route to:
  * **Anthropic**: Either [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) credits loaded on your Cloudflare account (Cloudflare bills you), or your own Anthropic API key (Anthropic bills you). You can provide your own key either by storing it in AI Gateway as a [provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) or by passing it directly in `ANTHROPIC_API_KEY`.
  * **Amazon Bedrock** or **Google Vertex AI**: your provider credentials stored in AI Gateway as a [provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
* [Claude Code ↗](https://docs.anthropic.com/en/docs/claude-code/setup) installed and updated to the latest version.

Note

The `cf-aig-authorization` header is what authenticates your request to AI Gateway. When AI Gateway already holds the Anthropic credentials — through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a [stored provider key (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) — the `ANTHROPIC_API_KEY` value is ignored. Claude Code still requires the variable to be set, so you can set it to any value (this example reuses the gateway token). Otherwise, set `ANTHROPIC_API_KEY` to your own Anthropic API key and AI Gateway forwards it to Anthropic. AI Gateway provides observability, caching, and rate limiting for the traffic either way. For details on where Claude Code reads credentials from, refer to [Anthropic's authentication documentation ↗](https://docs.anthropic.com/en/docs/claude-code/iam#credential-management).

1. Set the base URL to your gateway's Anthropic endpoint and send your gateway token in the `cf-aig-authorization` header. Set `ANTHROPIC_API_KEY` to the same token, since Claude Code requires the variable to be set. The following commands set these as shell environment variables for the current session. To persist them, add them to your shell profile (for example, `~/.zshrc` or `~/.bashrc`) or to Claude Code's [settings.json ↗](https://docs.anthropic.com/en/docs/claude-code/settings#settings-files) under the `env` key.
Replace `<ACCOUNT_ID>`, `<GATEWAY_ID>`, and `<CF_AIG_TOKEN>` with your values.
```bash
export ANTHROPIC_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic"
export ANTHROPIC_API_KEY="<CF_AIG_TOKEN>"
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```
```powershell
$env:ANTHROPIC_BASE_URL = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic"
$env:ANTHROPIC_API_KEY = "<CF_AIG_TOKEN>"
$env:ANTHROPIC_CUSTOM_HEADERS = "cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```
2. Start Claude Code and send a prompt. Requests now route through AI Gateway.
```bash
claude
```

## Use Amazon Bedrock

To run Claude models through [Amazon Bedrock](https://developers.cloudflare.com/ai-gateway/usage/providers/bedrock/) instead, point Claude Code at your gateway's Amazon Bedrock endpoint. AI Gateway authenticates to Bedrock with the AWS credentials you [store as a provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/), so you can skip Claude Code's own AWS authentication.

1. Replace `<ACCOUNT_ID>`, `<GATEWAY_ID>`, `<AWS_REGION>` (for example, `us-east-1`), and `<CF_AIG_TOKEN>` with your values.
```bash
export CLAUDE_CODE_USE_BEDROCK="1"
export ANTHROPIC_BEDROCK_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/aws-bedrock/bedrock-runtime/<AWS_REGION>/"
export CLAUDE_CODE_SKIP_BEDROCK_AUTH="1"
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```
```powershell
$env:CLAUDE_CODE_USE_BEDROCK = "1"
$env:ANTHROPIC_BEDROCK_BASE_URL = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/aws-bedrock/bedrock-runtime/<AWS_REGION>/"
$env:CLAUDE_CODE_SKIP_BEDROCK_AUTH = "1"
$env:ANTHROPIC_CUSTOM_HEADERS = "cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```
2. Start Claude Code and send a prompt. Requests now route through AI Gateway to Amazon Bedrock.
```bash
claude
```

## Use Google Vertex AI

To run Claude models through [Google Vertex AI](https://developers.cloudflare.com/ai-gateway/usage/providers/vertex/) instead, point Claude Code at your gateway's Google Vertex AI endpoint. AI Gateway authenticates to Vertex AI with the Google Cloud credentials you [store as a provider key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/), so you can skip Claude Code's own Vertex authentication.

1. Replace `<ACCOUNT_ID>`, `<GATEWAY_ID>`, `<GCP_PROJECT_ID>`, `<GCP_REGION>` (for example, `us-east5`), and `<CF_AIG_TOKEN>` with your values.
```bash
export CLAUDE_CODE_USE_VERTEX="1"
export ANTHROPIC_VERTEX_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/google-vertex-ai/v1"
export ANTHROPIC_VERTEX_PROJECT_ID="<GCP_PROJECT_ID>"
export CLOUD_ML_REGION="<GCP_REGION>"
export CLAUDE_CODE_SKIP_VERTEX_AUTH="1"
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```
```powershell
$env:CLAUDE_CODE_USE_VERTEX = "1"
$env:ANTHROPIC_VERTEX_BASE_URL = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/google-vertex-ai/v1"
$env:ANTHROPIC_VERTEX_PROJECT_ID = "<GCP_PROJECT_ID>"
$env:CLOUD_ML_REGION = "<GCP_REGION>"
$env:CLAUDE_CODE_SKIP_VERTEX_AUTH = "1"
$env:ANTHROPIC_CUSTOM_HEADERS = "cf-aig-authorization: Bearer <CF_AIG_TOKEN>"
```
2. Start Claude Code and send a prompt. Requests now route through AI Gateway to Google Vertex AI.
```bash
claude
```

## Use with Cloudflare Access

If your gateway is protected by [Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/), Claude Code can authenticate with a short-lived Access token instead of a gateway token. Point `ANTHROPIC_BASE_URL` at your [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/) and use Claude Code's `apiKeyHelper` to fetch the token with [cloudflared](https://developers.cloudflare.com/cloudflare-one/access-controls/authenticate-agents/#make-requests-with-cloudflared-access-curl). Claude Code sends the token as the API key, and Access verifies it at the edge.

Add the following to Claude Code's [settings.json ↗](https://docs.anthropic.com/en/docs/claude-code/settings#settings-files), replacing `ai-gateway.example.com` with your custom domain:

```json
{
	"apiKeyHelper": "cloudflared access login --no-verbose https://ai-gateway.example.com",
	"env": {
		"ANTHROPIC_BASE_URL": "https://ai-gateway.example.com/anthropic"
	}
}
```

The first request opens your identity provider's login flow. After you authenticate, requests route through AI Gateway with your Access identity attached as [cf.user\_id](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/#reserved-metadata).

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/#page","headline":"Claude Code · Cloudflare AI Gateway docs","description":"Route Claude Code through AI Gateway using your Cloudflare gateway token.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
