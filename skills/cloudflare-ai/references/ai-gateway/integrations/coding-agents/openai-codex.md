---
title: OpenAI Codex
description: Route OpenAI Codex through AI Gateway using a custom model provider that points at the OpenAI endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# OpenAI Codex

[OpenAI Codex ↗](https://developers.openai.com/codex/) is a coding agent you run in your terminal. It supports [custom model providers ↗](https://developers.openai.com/codex/config-advanced#custom-model-providers) defined in `config.toml`. This configuration adds a provider that points at AI Gateway's [OpenAI endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/), so Codex sends its requests through AI Gateway. AI Gateway authenticates the model provider for you through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), so you pass a Cloudflare API token instead of an OpenAI API key.

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

**\~/.codex/cloudflare-aig.config.toml**
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

  * [ macOS / Linux ](#tab-panel-7144)
  * [ Windows (PowerShell) ](#tab-panel-7145)
```bash
# Run `wrangler auth token` to get an auth token.
export CLOUDFLARE_API_KEY="<CLOUDFLARE_API_KEY>"
```

**PowerShell**
```powershell
# Run `wrangler auth token` to get an auth token.
$env:CLOUDFLARE_API_KEY = "<CLOUDFLARE_API_KEY>"
```
3. Start Codex with the profile and send a prompt. Requests now route through AI Gateway.
```bash
codex --profile cloudflare-aig
```

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/#page","headline":"OpenAI Codex · Cloudflare AI Gateway docs","description":"Route OpenAI Codex through AI Gateway using a custom model provider that points at the OpenAI endpoint.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/openai-codex/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/coding-agents/","name":"Coding agents"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/integrations/coding-agents/openai-codex/","name":"OpenAI Codex"}}]}
```
