---
title: "Grafana Workflows | Grafana Plugins documentation"
description: "Automate incident response and operational tasks with Grafana Workflows using event-driven triggers, scheduled execution, and integration with Grafana IRM, Slack, and Grafana Assistant."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Grafana Workflows

Automate incident response and operational tasks with event-driven workflows in Grafana Cloud.

* * *

> Note
>
> Grafana Workflows is currently in [private preview](/docs/release-life-cycle/). Grafana Labs offers support on a best-effort basis, and breaking changes might occur prior to the feature being made generally available.

## Overview

Grafana Workflows is a workflow engine for Grafana Cloud that automates incident response, operational tasks, and cross-tool orchestration. You define workflows as a series of steps that run in response to events or on a schedule. Each step can call APIs, update incidents, post Slack messages, or run conditional logic.

Workflows connect to the tools you already use in Grafana Cloud. For example, when an incident is created, a workflow can automatically assign responders, create a Slack channel, and post a summary. Scheduled workflows can run recurring checks and send notifications on a regular cadence.

## Explore next steps

[Get started
\
Create your first workflow with a step-by-step walkthrough.](/docs/grafana-cloud/alerting-and-irm/workflows/get-started/)

[Create workflows
\
Build workflows using the visual editor or YAML definitions.](/docs/grafana-cloud/alerting-and-irm/workflows/create-workflows/)

[Configure triggers
\
Start workflows from events, schedules, or manual execution.](/docs/grafana-cloud/alerting-and-irm/workflows/configure-triggers/)

[Use CEL expressions
\
Connect steps with dynamic values, conditions, and data transformations.](/docs/grafana-cloud/alerting-and-irm/workflows/use-expressions/)

[Step and trigger types reference
\
Explore available step and trigger types with their inputs and outputs.](/docs/grafana-cloud/alerting-and-irm/workflows/reference/)
