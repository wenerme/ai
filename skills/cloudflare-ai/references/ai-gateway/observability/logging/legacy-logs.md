---
description: Manage logs for AI Gateway customers who created a gateway before September 24, 2026.
title: Legacy Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Legacy Logs

Last updated Sep 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/observability/logging/legacy-logs/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Account eligibility

Legacy Logs applies only to AI Gateway customers who created a gateway before September 24, 2026. Customers who create their first gateway on or after that date use [AI Gateway logging](https://developers.cloudflare.com/ai-gateway/observability/logging/).

Legacy Logs provides an AI Gateway dashboard viewer and Logs API. To configure default collection or per-request headers, refer to [Logging](https://developers.cloudflare.com/ai-gateway/observability/logging/).

## View request details

The dashboard viewer shows individual requests for each gateway. It includes the shared request fields described in [Logging](https://developers.cloudflare.com/ai-gateway/observability/logging/).

## Manage storage

Each gateway has a configurable storage limit based on your plan. Workers Free accounts can store 100,000 logs across all gateways. Workers Paid accounts can store 10 million logs per gateway.

Each stored log can be up to 10 MB. Legacy Logs does not store logs exceeding that size.

Legacy Logs persists stored logs until you delete them.

When you reach a storage limit, Legacy Logs can stop saving logs or automatically delete the oldest logs. If saving stops, delete stored logs before Legacy Logs can save more.

For plan details, refer to [AI Gateway pricing](https://developers.cloudflare.com/ai-gateway/reference/pricing/#accounts-created-before-september-24-2026).

## Delete logs automatically

In your gateway settings, turn on **Automatic Log Deletion**. Legacy Logs deletes the oldest logs when your account reaches its storage limit.

## Delete logs manually

In the dashboard, open the gateway **Logs** tab. Apply filters, and then select **Delete logs**.

The dashboard supports these filters:

| Filter category | Filter options | Description |
| --- | --- | --- |
| Status | Error, status | Matches an error type or status |
| Cache | Cached, not cached | Matches cache status |
| Provider | Specific providers | Matches an AI provider |
| AI models | Specific models | Matches an AI model |
| Cost | Less than, greater than | Compares cost with a threshold |
| Request type | Workers AI Binding, WebSockets | Matches the request type |
| Tokens | Total tokens, Tokens In, Tokens Out | Compares token count with a threshold |
| Duration | Less than, greater than | Compares duration with a threshold |
| Feedback | Equals, does not equal (thumbs up, thumbs down, no feedback) | Matches feedback |
| Metadata key | Equals, does not equal | Matches a metadata key |
| Metadata value | Equals, does not equal | Matches a metadata value |
| Log ID | Equals, does not equal | Matches a log ID |
| Event ID | Equals, does not equal | Matches an event ID |
| DLP action | `FLAG`, `BLOCK` | Matches the DLP action |
| User agent | Equals, does not equal, contains | Matches the requesting client user agent |

## Use the Logs API

The Legacy Logs API lets you [list stored logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/list/). To delete matching logs programmatically, use the [`DELETE` logs endpoint](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/delete/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/logging/legacy-logs/#page","headline":"Legacy Logs","description":"Manage logs for AI Gateway customers who created a gateway before September 24, 2026.","url":"https://developers.cloudflare.com/ai-gateway/observability/logging/legacy-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
