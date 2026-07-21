---
description: Add security by requiring a valid authorization token for each request.
title: Authenticated Gateway
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

#  Authenticated Gateway

Last updated Jun 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-gateway/configuration/authentication/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

AI Gateway requires a valid Cloudflare API token for each request. This prevents unauthorized access and protects against invalid requests that can inflate log storage usage.

When using the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), pass your Cloudflare API token in the standard `Authorization` header. When using [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) at `gateway.ai.cloudflare.com`, use the `cf-aig-authorization` header instead.

Note

The `cf-aig-authorization` header is used with the `gateway.ai.cloudflare.com` endpoints, which continue to work. For new integrations, we recommend using the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) at `api.cloudflare.com`, which uses the standard `Authorization` header.

## Setting up Authenticated Gateway using the dashboard

1. Go to the Settings for the specific gateway you want to enable authentication for.
2. Select **Create authentication token** to generate a custom token with the required `Run` permissions. Be sure to securely save this token, as it will not be displayed again.
3. Include the API token in each request:
  * If using the REST API (`/ai/run`), include your Cloudflare API token in the standard `Authorization` header.
  * If using [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) at `gateway.ai.cloudflare.com`, use the `cf-aig-authorization` header.
4. Return to the settings page and toggle on Authenticated Gateway.

AI Gateway API tokens are account-scoped

The `AI Gateway Read`, `Run`, and `Edit` permissions cannot be restricted to a single gateway — unlike R2, which supports per-bucket scoping. Any token with `AI Gateway Run` can send requests through every gateway in the account, including any configured with stored provider keys through [Bring Your Own Keys (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/), consuming those credentials.

For isolation between gateways or tenants, use separate Cloudflare accounts or a Worker-side [AI Gateway binding](https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/) rather than relying on token scope.

## Example requests

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"model": "openai/gpt-4.1-mini", "messages": [{"role": "user", "content": "What is Cloudflare?"}]}'
```

Using the OpenAI SDK:

```javascript
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: CLOUDFLARE_API_TOKEN,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`,
});

const response = await openai.chat.completions.create({
	model: "openai/gpt-4.1-mini",
	messages: [{ role: "user", content: "What is Cloudflare?" }],
});
```

Using the Vercel AI SDK:

```javascript
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
	apiKey: CLOUDFLARE_API_TOKEN,
	baseURL: `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/v1`,
});
```

## Expected behavior

Note

When an AI Gateway is accessed from a Cloudflare Worker using a **binding**, the `cf-aig-authorization` header does not need to be manually included.
Requests made through bindings are **pre-authenticated** within the associated Cloudflare account.

The following table outlines gateway behavior based on the authentication settings and header status:

| Authentication Setting | Header Info    | Gateway State           | Response                                   |
| ---------------------- | -------------- | ----------------------- | ------------------------------------------ |
| On                     | Header present | Authenticated gateway   | Request succeeds                           |
| On                     | No header      | Error                   | Request fails due to missing authorization |
| Off                    | Header present | Unauthenticated gateway | Request succeeds                           |
| Off                    | No header      | Unauthenticated gateway | Request succeeds                           |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/authentication/#page","headline":"Authenticated Gateway · Cloudflare AI Gateway docs","description":"Add security by requiring a valid authorization token for each request.","url":"https://developers.cloudflare.com/ai-gateway/configuration/authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
