---
description: Test and debug Previews with logs, traces, metrics, Tail Workers, and browser evidence.
title: Test and debug
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Test and debug

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/previews/test-and-debug/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Previews support the same [Workers Observability](https://developers.cloudflare.com/workers/observability/) features as production — [logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/), [traces](https://developers.cloudflare.com/workers/observability/traces/), [metrics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/), and [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) — configured independently so your Preview telemetry stays separate.

## Logs and traces

Enable logs and traces for Previews in your `previews` block. These settings are independent from production, so you can run full sampling on a Preview without affecting production telemetry.

```jsonc
{
  "observability": {
    "enabled": true,
    "logs": { "enabled": true, "invocation_logs": true }
  },
  "previews": {
    "observability": {
      "enabled": true,
      "logs": {
        "enabled": true,
        "invocation_logs": true,
        "persist": true
      },
      "traces": {
        "enabled": true,
        "head_sampling_rate": 1,
        "persist": true
      }
    }
  }
}
```

```toml
[observability]
enabled = true

  [observability.logs]
  enabled = true
  invocation_logs = true

[previews.observability]
enabled = true

  [previews.observability.logs]
  enabled = true
  invocation_logs = true
  persist = true

  [previews.observability.traces]
  enabled = true
  head_sampling_rate = 1
  persist = true
```

Once enabled, Preview logs and traces appear in the Cloudflare dashboard under the individual Preview's **Observability** tab. You can also configure these settings per Preview in the dashboard under **Settings > Observability**.

## Tail Workers

[Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) receive execution metadata from your Worker — request URLs, response status codes, console logs, and errors. You can configure a Tail Worker destination for production, for Previews, or both.

```jsonc
{
  "tail_consumers": [
    { "service": "my-tail-sink" }
  ],
  "previews": {
    "tail_consumers": [
      { "service": "my-tail-sink" }
    ]
  }
}
```

```toml
[[tail_consumers]]
service = "my-tail-sink"

[[previews.tail_consumers]]
service = "my-tail-sink"
```

When you deploy a Preview with `npx wrangler preview --json`, the output confirms whether Tail Worker destinations are attached. You can also configure Tail Worker destinations per Preview in the dashboard under **Settings > Observability > Tail Worker**.

Tail Workers vs. \`wrangler tail\`

A **Tail Worker** is a configured destination that receives execution events. [`wrangler tail`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#tail) is a CLI command for live-tailing. `wrangler tail` does not currently support Previews — use a Tail Worker destination or [Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) instead.

## Metrics

Preview invocation metrics are available through the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). Query the `workersInvocationsAdaptive` dataset with `isPreview: 1` to filter for Preview traffic.

```graphql
query PreviewMetrics($accountTag: String!, $since: Time!) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			workersInvocationsAdaptive(
				limit: 100
				filter: { datetime_geq: $since, isPreview: 1 }
			) {
				dimensions {
					datetime
					scriptName
					previewSlug
					status
				}
				sum {
					requests
					errors
				}
			}
		}
	}
}
```

Useful fields include `scriptName` (Worker name), `previewSlug` (Preview name), and `status`.

Per-Preview metrics are also visible in the dashboard under the Preview's **Metrics** tab.

You can also query Preview observability data using the [Workers Observability MCP server ↗](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/workers-observability).

## Browser evidence

Preview observability shows what happened inside the Worker. [Browser Run](https://developers.cloudflare.com/browser-run/) can add the browser-side view of the same change — open the Preview URL, exercise a flow, and capture a screenshot or PDF.

Include a debug ID in the URL or request headers so the browser traffic can be correlated with the Preview's logs and traces in Workers Observability.

```sh
# Deploy the Preview
npx wrangler preview --name my-feature

# Capture a screenshot of the Preview URL
curl "https://YOUR_BROWSER_RUN_WORKER.workers.dev/screenshot?url=https://my-feature-my-worker.subdomain.workers.dev&debugId=review-123"
```

Browser Run is not required — you can also use curl, Playwright, integration tests, or any other tool to send traffic to the Preview URL. Browser Run is useful when you want the review artifact to include what a browser actually rendered.

For GitHub Actions examples that create a Preview URL, probe it, capture a screenshot, or post it back to a pull request, refer to [Examples](https://developers.cloudflare.com/workers/previews/automation-examples/).

## Exporting data

You can export Preview telemetry to your existing observability stack using [OpenTelemetry-compliant exports](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/) or [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/). Configure these in the `previews` block to keep Preview exports separate from production.

## Current limitations

- `wrangler tail` does not support targeting Previews.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/previews/test-and-debug/#page","headline":"Test and debug","description":"Test and debug Previews with logs, traces, metrics, Tail Workers, and browser evidence.","url":"https://developers.cloudflare.com/workers/previews/test-and-debug/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
