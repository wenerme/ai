---
title: Export to Grafana Cloud
description: Grafana Cloud is a fully managed observability platform that provides visualization, alerting, and analytics for your telemetry data. By exporting your Cloudflare Workers telemetry to Grafana Cloud, you can:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/observability/exporting-opentelemetry-data/grafana-cloud.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Export to Grafana Cloud

Grafana Cloud is a fully managed observability platform that provides visualization, alerting, and analytics for your telemetry data. By exporting your Cloudflare Workers telemetry to Grafana Cloud, you can:

* Visualize distributed traces in **Grafana Tempo** to understand request flows and performance bottlenecks
* Query and analyze logs in **Grafana Loki** alongside your traces

This guide will walk you through configuring Cloudflare Workers to export OpenTelemetry-compliant traces and logs to your Grafana Cloud stack.

![Grafana Tempo trace view showing a distributed trace for a service with multiple spans including fetch requests, durable object subrequests, and queue operations, with timing information displayed on a timeline](https://developers.cloudflare.com/_astro/grafana-traces.CuFntNVO_1VEu9k.webp) 

## Prerequisites

Before you begin, ensure you have:

* An active [Grafana Cloud account ↗](https://grafana.com/auth/sign-up/create-user) (free tier available)
* A deployed Worker that you want to monitor

## Step 1: Access the OpenTelemetry setup guide

1. Log in to your [Grafana Cloud portal ↗](https://grafana.com/)
2. From your organization's home page, navigate to **Connections** → **Add new connection**
3. Search for "OpenTelemetry" and select **OpenTelemetry (OTLP)**
4. Select **Quickstart** then select **JavaScript**
5. Click **Create a new token**
6. Enter a name for your token (e.g., `cloudflare-workers-otel`) and click **create token**
7. Click on **Close** without copying the token
8. Copy and Save the value for `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_EXPORTER_OTLP_HEADERS` in the `Environment variables` code block as the OTel endpoint and as the Auth header value respectively

## Step 2: Set up destination

1. Navigate to your Cloudflare account's [Workers Observability ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability/pipelines) section
2. Click **Add destination** and configure a destination name (e.g. `grafana-tracing`)
3. From Grafana, copy your Otel endpoint, auth header, and auth value
* Your OTEL endpoint will look like `https://otlp-gateway-prod-us-east-2.grafana.net/otlp` (append `/v1/traces` for traces and `/v1/logs` for logs)
* Your custom header should include:  
   * Your auth header name `Authorization`  
   * Your auth header value `Basic MTMxxx...`

## Step 3: Configure your Worker

With your destination created in the Cloudflare dashboard, update your Worker's configuration to enable telemetry export.

* [  wrangler.jsonc ](#tab-panel-7436)
* [  wrangler.toml ](#tab-panel-7437)

```

{

  "observability": {

    "traces": {

      "enabled": true,

      // Must match the destination name in the dashboard

      "destinations": ["grafana-traces"]

    },

    "logs": {

      "enabled": true,

      // Must match the destination name in the dashboard

      "destinations": ["grafana-logs"]

    }

  }

}


```

```

[observability.traces]

enabled = true

destinations = [ "grafana-traces" ]


[observability.logs]

enabled = true

destinations = [ "grafana-logs" ]


```

After updating your configuration, deploy your Worker for the changes to take effect.

Note

It may take a few minutes after deployment for data to appear in Grafana Cloud.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/","name":"Exporting OpenTelemetry Data"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/grafana-cloud/","name":"Export to Grafana Cloud"}}]}
```
