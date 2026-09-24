---
description: Store and inspect AI Gateway request logs including prompts, responses, tokens, costs, and DLP actions.
title: Logging
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Logging

Last updated Sep 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/observability/logging/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Logs help you monitor requests and troubleshoot application issues. Each log can include the prompt, response, provider, timestamp, status, token usage, cost, duration, and user agent.

When a request matches a [Data Loss Prevention (DLP)](https://developers.cloudflare.com/ai-gateway/features/dlp/) policy, its log can also include the action and matched policy details.

When [Guardrails](https://developers.cloudflare.com/ai-gateway/features/guardrails/) are turned on, Guardrails evaluation calls are also recorded in your logs.

Logging eligibility

New AI Gateway customers who create their first gateway on or after September 24, 2026 follow [Workers Logs pricing and retention](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#pricing).

AI Gateway customers who created a gateway before September 24, 2026 use [Legacy Logs](https://developers.cloudflare.com/ai-gateway/observability/logging/legacy-logs/).

Use an [authenticated gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) to prevent unauthorized access. Authentication also prevents invalid requests from increasing log volume.

## Default configuration

Logs are enabled by default for each gateway. This setting applies to all requests unless a request overrides it.

You can turn off collection for privacy or compliance requirements.

To change the default log configuration in the dashboard:

1. In the Cloudflare dashboard, go to the **AI Gateway** page. [Go to **AI Gateway** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
2. Select **Settings**.
3. Change the **Logs** setting to your preference.

## Per-request logging

To override the default logging behavior set in the settings tab, you can define headers on a per-request basis.

### Collect logs (`cf-aig-collect-log`)

The `cf-aig-collect-log` header allows you to bypass the default log setting for the gateway. If the gateway is configured to save logs, the header will exclude the log for that specific request. Conversely, if logging is disabled at the gateway level, this header will save the log for that request.

In the example below, we use `cf-aig-collect-log` to bypass the default setting to avoid saving the log.

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-collect-log: false" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is the email address and phone number of user123?"
      }
    ]
  }'
```

### Collect log payload (`cf-aig-collect-log-payload`)

The `cf-aig-collect-log-payload` header allows you to control whether the raw request and response bodies (payloads) are stored for a given request. Unlike `cf-aig-collect-log`, which controls the entire log entry, this header only affects payload storage — metadata such as token counts, model, provider, status code, cost, and duration will still be logged.

This is useful when you want to maintain visibility into usage metrics and request metadata without persisting sensitive prompt or completion data.

| Header value | Behavior |
| --- | --- |
| `true` | Request and response payloads are stored. |
| `false` | Payload storage is skipped. Metadata-only log entries are still saved. |

In the example below, we use `cf-aig-collect-log-payload` to skip storing the request and response bodies while keeping the metadata log.

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-collect-log-payload: false" \
  --data '{
    "model": "openai/gpt-4.1-mini",
    "messages": [
      {
        "role": "user",
        "content": "What is the email address and phone number of user123?"
      }
    ]
  }'
```

Note

If `cf-aig-collect-log` is set to `false`, the entire log entry (including metadata) is skipped regardless of the `cf-aig-collect-log-payload` value. Use `cf-aig-collect-log-payload: false` on its own if you only want to suppress payload storage while retaining metadata logs.

## DLP fields in logs

When [Data Loss Prevention (DLP)](https://developers.cloudflare.com/ai-gateway/features/dlp/) policies are enabled on a gateway, log entries for requests that trigger a DLP policy match include additional fields:

| Field | Description |
| --- | --- |
| DLP Action | The action taken by the DLP policy: `FLAG` or `BLOCK` |
| DLP Policies Matched | The IDs of the DLP policies that matched |
| DLP Profiles Matched | The IDs of the DLP profiles that triggered within each matched policy |
| DLP Entries Matched | The specific detection entry IDs that matched within each profile |
| DLP Check | Whether the match occurred in the `REQUEST`, `RESPONSE`, or both |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/logging/#page","headline":"Logging","description":"Store and inspect AI Gateway request logs including prompts, responses, tokens, costs, and DLP actions.","url":"https://developers.cloudflare.com/ai-gateway/observability/logging/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
