---
title: "Introduction to Grafana AI | Grafana Plugins documentation"
description: "Learn about Grafana Cloud AI capabilities, including machine learning, generative AI, and intelligent assistance."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Introduction to Grafana AI

Grafana AI brings together advanced machine learning, generative AI, and intelligent assistance to help you get more value from your observability data in Grafana Cloud. With features that accelerate investigations, automate analysis, and provide actionable insights, Grafana AI empowers teams to be proactive and efficient—whether you’re troubleshooting incidents, forecasting trends, or building smarter dashboards.

## What is Grafana AI?

Grafana AI is a suite of capabilities in Grafana Cloud that leverages both traditional machine learning and the latest advancements in large language models (LLMs).

These features are designed to help you:

- Detect anomalies and outliers in your systems automatically
- Forecast trends and anticipate future states of your infrastructure
- Accelerate incident investigations with AI-powered diagnostics and summaries
- Streamline workflows and reduce manual toil with intelligent assistance

## Key features

### Anomaly detection and forecasting

Grafana AI learns from your historical data to identify unusual patterns and predict what’s likely to happen next. Use these insights to set smarter alerts, plan capacity, and stay ahead of potential issues. [Learn more about anomaly detection and forecasting.](/docs/grafana-cloud/machine-learning/dynamic-alerting/)

### Sift: AI-powered investigations

Sift is your diagnostic assistant in Grafana Cloud, automatically surfacing potential causes of incidents by analyzing metrics, logs, and traces, so you can resolve problems faster and with greater confidence. [Learn more about Sift.](/docs/grafana-cloud/machine-learning/sift/)

### Grafana Assistant

Grafana Assistant is an agentic LLM integration that provides intelligent, context-aware help directly in the Grafana interface. It can streamline common workflows, answer questions, and help you get the most out of your observability data. [Learn more about Grafana Assistant.](/docs/grafana-cloud/machine-learning/assistant/)

## Supported data sources

Grafana Machine Learning (Forecasting and Outlier detection) works with a wide range of data sources:

- Prometheus
- Graphite
- Loki (metric queries only)
- Postgres
- InfluxDB
- Snowflake
- Splunk
- Elasticsearch
- BigQuery
- MongoDB
- Datadog

## Why use Grafana AI?

- **Accurate forecasting:** Learn patterns from historical data to anticipate future states and optimize resources.
- **Confidence in predictions:** Make informed decisions with clear confidence bounds on forecasts.
- **Versatile applications:** Apply AI-driven insights to alerting, capacity planning, and anomaly detection.
- **Open-source extensibility:** Use the [open-source LLM app](https://github.com/grafana/grafana-llm-app) to build and extend LLM-powered features in Grafana.
- **AI-powered tools:** Leverage features like [Sift](/blog/2023/09/14/announcing-sift-automated-system-checks-for-faster-incident-response-times-in-grafana-cloud/), [incident auto-summary](/blog/2023/08/28/generative-ai-at-grafana-labs-whats-new-whats-next-and-our-vision-for-the-open-source-community/), and [generative AI for dashboard metadata](/docs/grafana/latest/dashboards/manage-dashboards/?pg=blog&plcmt=body-txt#set-up-generative-ai-features-for-dashboards) to streamline monitoring and incident response.

Explore the rest of the documentation to learn how to enable and use Grafana AI features in your environment.
