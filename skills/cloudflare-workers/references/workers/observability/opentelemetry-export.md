---
description: Configure OpenTelemetry export for Workers logs and traces.
title: OpenTelemetry export
image: https://developers.cloudflare.com/workers/observability/opentelemetry-export/og.png?v=e18175bd867c1f83
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenTelemetry export

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/observability/opentelemetry-export/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Workers can export OpenTelemetry-compliant logs and traces to external destinations. First, [create a destination and configure your provider](https://developers.cloudflare.com/observability/export/opentelemetry/).

## Supported telemetry

You can export these Workers telemetry types:

- **Traces** - Request flows through your Worker and connected services
- **Logs** - Application and system logs, including `console.log()` output

## Configure export

Add your destination names to your Wrangler configuration. Each name must match a destination configured in the dashboard.

```jsonc
{
	"observability": {
		"traces": {
			"enabled": true,
			"destinations": ["tracing-destination-name"],

			// traces sample rate of 5%
			"head_sampling_rate": 0.05,

			// optional: export without storing traces in Cloudflare
			"persist": false
		},
		"logs": {
			"enabled": true,
			"destinations": ["logs-destination-name"],

			// logs sample rate of 60%
			"head_sampling_rate": 0.6,

			// optional: export without storing logs in Cloudflare
			"persist": false
		}
	}
}
```

```toml
[observability.traces]
enabled = true
destinations = [ "tracing-destination-name" ]
head_sampling_rate = 0.05
persist = false

[observability.logs]
enabled = true
destinations = [ "logs-destination-name" ]
head_sampling_rate = 0.6
persist = false
```

\`persist\` and pricing

By default, `persist` is `true`. Logs and traces are exported and stored in Cloudflare. Beginning December 1, 2026, persisted data contributes to [Cloudflare Observability ingestion and storage usage](https://developers.cloudflare.com/observability/pricing/). Set `persist` to `false` if you only need data in your external destination.

Redeploy your Worker after updating its Wrangler configuration. Events may take several minutes to reach your destination.

## Known limitations

Workers infrastructure metrics and custom metrics cannot be exported through OpenTelemetry.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/opentelemetry-export/#page","headline":"OpenTelemetry export","description":"Configure OpenTelemetry export for Workers logs and traces.","url":"https://developers.cloudflare.com/workers/observability/opentelemetry-export/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/observability/opentelemetry-export/og.png?v=e18175bd867c1f83","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
