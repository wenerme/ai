---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Test and debug Previews with logs, traces, metrics, profiles, Tail Workers, and browser evidence.
title: Test and debug
image: https://developers.cloudflare.com/workers/previews/test-and-debug/og.png?v=192029c950ad4ec5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Test and debug

Previews support the same [Workers Observability](https://developers.cloudflare.com/workers/observability/) features as production — [logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/), [traces](https://developers.cloudflare.com/workers/observability/traces/), [metrics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/), [profiles](https://developers.cloudflare.com/workers/observability/profiling-in-production/), and [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) — configured independently so your Preview telemetry stays separate.

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

You can also query Preview observability data using the [Cloudflare API MCP server](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/#cloudflare-api-mcp-server).

## Profile a Preview

Capture CPU and heap profiles from a Preview to find expensive functions and allocating code before your change reaches production. You can profile a Preview's Worker or a [Durable Object](https://developers.cloudflare.com/durable-objects/) instance running on the Preview.

Profiling a Preview works the same way as [profiling in production](https://developers.cloudflare.com/workers/observability/profiling-in-production/). Before you capture a profile:

- [Enable source maps](https://developers.cloudflare.com/workers/observability/profiling-in-production/#enable-source-maps) so the flamegraph shows readable function names.
- Send traffic to the Preview URL before and during the capture. Capturing a profile does not invoke your code for you.

### Use dashboard

1. In the Cloudflare dashboard, go to **Workers & Pages** and select your Worker: [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Previews**, then select your Preview.
3. Select **Observability**. In the view dropdown, select *Flamegraph*.
4. In **Profile type**, select *CPU* or *Heap*.
5. In **Duration (ms)**, enter a capture duration from 1000 to 50000 milliseconds. The default is 10000 milliseconds.
6. In **Deployment**, select the Preview deployment to profile.
7. Select **Capture profile**.![Flamegraph view for a Preview with Profile type, Duration, and Deployment fields and the Capture profile button](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1929,height=713,format=webp/_astro/profile-capture.BJPUyeRg.png)

When capture completes, the dashboard displays the profile as a flamegraph. Switch to **Table** to sort functions by self or total value, which is CPU time for CPU profiles and allocated memory for Heap profiles. Select **Download profile** to download the raw pprof profile.

![Flamegraph of a Preview CPU profile with the Download profile button and Flamegraph and Table toggle](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1929,height=904,format=webp/_astro/profile-flamegraph.CljVEwJ4.png)

To profile a Durable Object instance on the Preview, go to **Durable Objects**, select the Preview's namespace, select **Observability**, and switch the view to *Flamegraph*. Enter the 64-character object ID in **Instance ID** before you capture.

### Use Cloudflare CLI

[Install `cf` and sign in](https://developers.cloudflare.com/cf/get-started/), then capture a CPU profile for 5 seconds from a Preview deployment. Pass `latest` or a specific deployment ID:

```sh
cf previews deployments profile "$DEPLOYMENT_ID" \
  --worker my-worker \
  --preview my-preview \
  --duration-ms 5000 \
  --profile-type cpu > preview-cpu.pprof
```

To profile a Durable Object instance on the Preview, also pass `--namespace-id` and `--actor-id`.

### Use API

Send a `POST` request to the Preview deployment's `profile` endpoint. Use an API token with the same permissions as the [production profiling API](https://developers.cloudflare.com/workers/observability/profiling-in-production/#use-api): **Workers Scripts Read** or the **Content Read-Only** [Workers role](https://developers.cloudflare.com/workers/authorization/workers/).

Set `$DEPLOYMENT_ID` to `latest` to profile the newest deployment of the Preview. To profile a specific deployment, copy its ID from the Preview's **Deployments** tab.

The request body accepts the same fields as the production profiling API: `duration_ms`, `profile_type`, and, for a Durable Object, `namespace_id` and `actor_id`.

```bash
curl --fail --silent --show-error --request POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/previews/$PREVIEW_ID/deployments/$DEPLOYMENT_ID/profile" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "duration_ms": 10000,
    "profile_type": "cpu"
  }' \
  --output preview-cpu.pprof.gz
```

To read the results, refer to [Inspect the results](https://developers.cloudflare.com/workers/observability/profiling-in-production/#inspect-the-results). For pprof tools, rate limits, and error messages, refer to [Download the capture](https://developers.cloudflare.com/workers/observability/profiling-in-production/#download-the-capture) and [Limits](https://developers.cloudflare.com/workers/observability/profiling-in-production/#limits).

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

For GitHub Actions examples that create a Preview URL, probe it, capture a screenshot, or post it back to a pull request, refer to [Examples](https://developers.cloudflare.com/workers/previews/examples/).

## Exporting data

You can export Preview telemetry to your existing observability stack using [OpenTelemetry-compliant exports](https://developers.cloudflare.com/observability/export/opentelemetry/) or [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/). Configure these in the `previews` block to keep Preview exports separate from production.

## Current limitations

- `wrangler tail` does not support targeting Previews.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/previews/test-and-debug/#page","headline":"Test and debug","description":"Test and debug Previews with logs, traces, metrics, profiles, Tail Workers, and browser evidence.","url":"https://developers.cloudflare.com/workers/previews/test-and-debug/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/previews/test-and-debug/og.png?v=192029c950ad4ec5","dateModified":"2026-11-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
