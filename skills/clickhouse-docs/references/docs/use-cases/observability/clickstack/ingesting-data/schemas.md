---
description: 'Tables and schemas used by ClickStack - The ClickHouse Observability Stack'
title: 'Tables and schemas used by ClickStack'
doc_type: 'reference'
keywords: ['clickstack', 'schema', 'data model', 'table design', 'logs']
---

The ClickStack OpenTelemetry (OTel) collector uses the [ClickHouse exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/clickhouseexporter/README.md) to create tables in ClickHouse and insert data.

The following tables are created for each data type in the `default` database. You can change this target database by modifying the environment variable `HYPERDX_OTEL_EXPORTER_CLICKHOUSE_DATABASE` for the image hosting the OTel collector.

## Logs {#logs}

<OtelLogsSchema />

## Traces {#traces}

<OtelTracesSchema />

## Metrics {#metrics}

### Gauge metrics {#gauge}

<OtelMetricsGaugeSchema />

### Sum metrics {#sum}

<OtelMetricsSumSchema />

### Histogram metrics {#histogram}

<OtelMetricsHistogramSchema />

### Exponential histograms {#exponential-histograms}

> **note**: HyperDX doesn't support fetching/displaying exponential histogram metrics yet. You may configure them in the metrics source but future support is forthcoming.

<OtelMetricsExponentialHistogramSchema />

### Summary table {#summary-table}

<OtelMetricsSummarySchema />

## Sessions {#sessions}

<HyperdxSessionsSchema />
