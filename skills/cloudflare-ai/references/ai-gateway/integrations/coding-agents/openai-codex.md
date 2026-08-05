---
description: Route OpenAI Codex through AI Gateway using a custom model provider that points at the OpenAI endpoint.
title: OpenAI Codex
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAI Codex

Last updated Aug 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[OpenAI Codex ↗](https://developers.openai.com/codex/) is a coding agent you run in your terminal. It supports [custom model providers ↗](https://developers.openai.com/codex/config-advanced#custom-model-providers) defined in `config.toml`. This configuration adds a provider that points at AI Gateway's [OpenAI endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/), so Codex sends its requests through AI Gateway. AI Gateway authenticates the model provider for you through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), so you pass a Cloudflare API token instead of an OpenAI API key. If your gateway is protected by Cloudflare Access, refer to [Use with Cloudflare Access](#use-with-cloudflare-access).

Note

Codex custom providers only support the OpenAI Responses API (`wire_api = "responses"`). This means you can only use OpenAI models that support the Responses API, such as `gpt-5.5`. Models from other providers (for example, Anthropic or Google) do not use the OpenAI Responses request format, so they do not work with Codex through this configuration.

## Prerequisites

Before you start, you need:

* Your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* An AI Gateway. You can use your account's `default` gateway or [create a gateway](https://developers.cloudflare.com/ai-gateway/get-started/) and use its slug.
* A [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `AI Gateway` permission.
* [Credits loaded](https://developers.cloudflare.com/ai-gateway/features/unified-billing/#load-credits) on your account for third-party models.
* [Codex ↗](https://developers.openai.com/codex/cli/) installed and updated to the latest version.

1. Create a Codex [profile ↗](https://developers.openai.com/codex/config-advanced#profiles) file at `~/.codex/cloudflare-aig.config.toml`. The profile defines a custom model provider that points at your gateway's OpenAI endpoint and reads your Cloudflare API token from an environment variable.
Replace `<ACCOUNT_ID>` and `<GATEWAY_ID>` with your values. You can use `default` for the gateway to route through your account's default gateway, or change it to another gateway slug.
```toml
model_provider = "cloudflare-ai-gateway"
model = "gpt-5.5"
model_reasoning_effort = "medium"
[model_providers.cloudflare-ai-gateway]
name = "Cloudflare AI Gateway"
# Run `wrangler whoami` to get your account ID, then replace <ACCOUNT_ID>.
# Use `default` for <GATEWAY_ID> to route through your account's default gateway.
base_url = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/openai"
env_key = "CLOUDFLARE_API_KEY"
wire_api = "responses"
```
Note
Codex does not expand environment variables inside `base_url`, so the account ID and gateway slug must be literal values. Only `CLOUDFLARE_API_KEY` is read from the environment.
2. Set your Cloudflare API token as the `CLOUDFLARE_API_KEY` environment variable. The following commands set it for the current session. To persist it, add it to your shell profile (for example, `~/.zshrc` or `~/.bashrc`).
Replace `<CLOUDFLARE_API_KEY>` with your value.
```bash
# Run `wrangler auth token` to get an auth token.
export CLOUDFLARE_API_KEY="<CLOUDFLARE_API_KEY>"
```
```powershell
# Run `wrangler auth token` to get an auth token.
$env:CLOUDFLARE_API_KEY = "<CLOUDFLARE_API_KEY>"
```
3. Start Codex with the profile and send a prompt. Requests now route through AI Gateway. The `cloudflare-aig` profile name matches the `cloudflare-aig.config.toml` file you created.
```bash
codex --profile cloudflare-aig
```

## Use with Cloudflare Access

If your gateway is protected by [Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/), Codex can authenticate with a short-lived Access token instead of a Cloudflare API token. Point the provider at your [custom domain](https://developers.cloudflare.com/ai-gateway/configuration/custom-domains/), and configure the provider's `auth` command to fetch the token with [cloudflared](https://developers.cloudflare.com/cloudflare-one/access-controls/authenticate-agents/#make-requests-with-cloudflared-access-curl) instead of passing a token through an environment variable.

Update the same `~/.codex/cloudflare-aig.config.toml` profile from the Unified Billing setup so the provider points at your custom domain and uses `cloudflared` for authentication. The `cloudflare-aig` in `codex --profile cloudflare-aig` refers to this file's name. Replace `ai-gateway.example.com` with your custom domain.

```toml
model_provider = "cloudflare-ai-gateway"
model = "gpt-5.5"
model_reasoning_effort = "medium"

[model_providers.cloudflare-ai-gateway]
name = "Cloudflare AI Gateway"
base_url = "https://ai-gateway.example.com/openai"
wire_api = "responses"

[model_providers.cloudflare-ai-gateway.auth]
command = "cloudflared"
args = ["access", "login", "--no-verbose", "https://ai-gateway.example.com"]
timeout_ms = 30000
refresh_interval_ms = 0
```

Compared to the Unified Billing setup in the previous section, the custom domain replaces the account ID and gateway ID in `base_url`, and the `auth` block replaces `env_key`.

Start Codex with the profile:

```bash
codex --profile cloudflare-aig
```

The first request opens your identity provider's login flow. After you authenticate, requests route through AI Gateway with your Access identity attached as [cf.user\_id](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/#reserved-metadata).

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/#page","headline":"OpenAI Codex · Cloudflare AI Gateway docs","description":"Route OpenAI Codex through AI Gateway using a custom model provider that points at the OpenAI endpoint.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
