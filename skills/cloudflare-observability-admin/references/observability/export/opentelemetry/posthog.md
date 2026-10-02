---
description: Send Cloudflare logs to PostHog with OpenTelemetry.
title: Export to PostHog
image: https://developers.cloudflare.com/observability/export/opentelemetry/posthog/og.png?v=b04f19c37d80595b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Export to PostHog

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/export/opentelemetry/posthog/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

PostHog provides product analytics, logs, and error tracking. Export Cloudflare logs to correlate them with sessions and events.

![PostHog logs view with attributes expanded and a timeline view at the top](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2580,height=1702,format=webp/_astro/posthog-example.DhJh65s7.png)

This guide configures PostHog to receive Cloudflare logs.

## Prerequisites

Before you begin, you need:

- An active [PostHog account ↗︎](https://app.posthog.com/signup)
- Your PostHog project API key
- Cloudflare logs available for export

## 1. Get your PostHog project API key

1. Log in to your [PostHog account ↗︎](https://app.posthog.com/).
2. Go to [**Project settings** ↗︎](https://app.posthog.com/settings/project).
3. Find **Project API key** in the project details.
4. Copy the project API key.

The project API key starts with `phc_`.

## 2. Select your PostHog endpoint

PostHog uses different endpoints for each data region:

| Region | Logs endpoint |
| --- | --- |
| **US** (default) | `https://us.i.posthog.com/i/v1/logs` |
| **EU** | `https://eu.i.posthog.com/i/v1/logs` |

Find your region in your PostHog project settings. Your PostHog URL also contains `us` or `eu`.

## 3. Configure a Cloudflare Observability destination

Caution

PostHog accepts logs through its OpenTelemetry Protocol (OTLP) endpoint. It does not accept traces through OTLP.

1. In the Cloudflare dashboard, go to **Observability** > **Destinations**. [Go to **OpenTelemetry** ↗](https://dash.cloudflare.com/?to=/:account/observability/destinations)
2. Select **Add destination**.
3. Configure the destination:
   - **Destination name**: `posthog-logs`
   - **Destination type**: *Logs*
   - **OTLP endpoint**: Your PostHog regional logs endpoint
   - **Custom header name**: `Authorization`
   - **Custom header value**: `Bearer <YOUR_PROJECT_API_KEY>`
4. Select **Save**.

![Cloudflare destination configuration for PostHog logs with destination name, type selection, OTLP endpoint, and custom headers](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1194,height=1180,format=webp/_astro/posthog-example-destination-modal.Dkn5CFBP.png)

## 4. Enable export

Creating a destination does not start exporting logs. To export [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/), [configure OpenTelemetry export for your Worker](https://developers.cloudflare.com/workers/observability/opentelemetry-export/). PostHog does not support [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/) or [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/) through OTLP.

## 5. View logs in PostHog

1. Log in to your [PostHog account ↗︎](https://app.posthog.com/).
2. Go to **Logs**.
3. Review exported severity levels, timestamps, and attributes.

You can filter logs by severity, time range, attributes, and keywords.

## Troubleshooting

### Logs do not appear in PostHog

1. Verify that the API key starts with `phc_`.
2. Confirm that the endpoint matches your PostHog region.
3. Check the destination status in the Cloudflare dashboard.
4. Check whether sampling excludes the expected logs.

### Fix authentication errors

Confirm that the `Authorization` value includes the `Bearer` prefix. Also verify that the project API key remains active.

Alternatively, add the token to the endpoint query string: `https://us.i.posthog.com/i/v1/logs?token=<YOUR_PROJECT_API_KEY>`.

## Related resources

- [PostHog logs documentation ↗︎](https://posthog.com/docs/logs)
- [PostHog getting started with logs ↗︎](https://posthog.com/docs/logs/start-here)
- [OpenTelemetry logs specification ↗︎](https://opentelemetry.io/docs/specs/otel/logs/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/export/opentelemetry/posthog/#page","headline":"Export to PostHog","description":"Send Cloudflare logs to PostHog with OpenTelemetry.","url":"https://developers.cloudflare.com/observability/export/opentelemetry/posthog/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/export/opentelemetry/posthog/og.png?v=b04f19c37d80595b","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
