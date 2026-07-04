> [!WARNING]
>
> **Preview
> --- Model Armor insights**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

This document describes how to view content security insights from
[Model Armor](https://docs.cloud.google.com/model-armor/overview) for [supported AI
agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#supported-agents).

Model Armor screens the requests and responses for security
risks, such as indirect prompt injection attacks, sensitive data leakage, and
the generation or serving of harmful content. For more information, see
[Model Armor](https://docs.cloud.google.com/model-armor/overview).

You can view the results of Model Armor operations at the
following levels:

- [Top-level view](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-all-agents): insights for all supported AI agents in the project
- [Agent-level view](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-single-agent): insights for a single AI agent

## Before you begin

1. [Configure
   Model Armor on one or more gateways](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor) in your project.
2. To monitor agents that communicate with a Google Cloud MCP server, [configure
   Model Armor with MCP servers](https://docs.cloud.google.com/model-armor/model-armor-mcp-google-cloud-integration).
3. [Set
   up tracing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing) for your agent.

### Required role

To get the permissions that
you need to monitor content security violations,

ask your administrator to grant you the
following IAM roles on the project:

- [Observability View Accessor](https://docs.cloud.google.com/iam/docs/roles-permissions/observability#observability.viewAccessor) (`roles/observability.viewAccessor`)
- [Observability Analytics User](https://docs.cloud.google.com/iam/docs/roles-permissions/observability#observability.analyticsUser) (`roles/observability.analyticsUser`)
- [Logs Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/logging#logging.viewer) (`roles/logging.viewer`)
- [Logs View Accessor](https://docs.cloud.google.com/iam/docs/roles-permissions/logging#logging.viewAccessor) (`roles/logging.viewAccessor`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

These predefined roles contain

the permissions required to monitor content security violations. To see the exact permissions that are
required, expand the **Required permissions** section:

#### Required permissions

The following permissions are required to monitor content security violations:

- `monitoring.monitoredResourceDescriptors.list`
- `monitoring.metricDescriptors.list`

You might also be able to get
these permissions
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Supported agents

The **Security** tab is populated with Model Armor insights
for the following agents only:

- Agents deployed in Agent Runtime and governed by a [gateway where
  Model Armor is
  configured](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor).
- Agents deployed in Agent Runtime and [communicating with a
  Google Cloud MCP
  server](https://docs.cloud.google.com/model-armor/model-armor-mcp-google-cloud-integration).
- Agents deployed in Agent Runtime in a project where [Model Armor
  floor settings are
  configured](https://docs.cloud.google.com/model-armor/configure-floor-settings#configure-floor-settings).

## View content insights for supported AI agents in a project (top-level view)

To view the content security insights for all supported AI agents in a project,
follow these steps:

1. In the Google Cloud console, go to the Gemini Enterprise Agent Platform **Security** tab.

   [Go to Security](https://console.cloud.google.com/projectselector2/agent-platform/security?supportedpurview=project)
2. Select your project.

If you don't see content security insights on the **Security** tab and you
have [supported AI agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#supported-agents) in your project, [make sure you
have set up tracing for your
agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing).

## View content insights for an AI agent (agent-level view)

To view the content security insights for supported agents, follow these
steps:

1. In the Google Cloud console, go to Agent Registry. [Go to Agent Registry](https://console.cloud.google.com/projectselector2/agent-platform/agent-registry?supportedpurview=project)

2. Select your project.
3. Click the name of the agent.
4. Click the **Security** tab.

## View the number of flagged or blocked interactions

Go to the [top-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-all-agents)
or [agent-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-single-agent)
**Security** tab.

On the **Security** tab, view the number of interactions, including flagged and
blocked interactions. The **Security** tab displays the following metrics:

- **Total interactions**: The total number of prompts and responses that are analyzed by Model Armor.
- **Interactions flagged**: The number of interactions that violated a configured policy in your Model Armor template or floor settings.
- **Interactions blocked** : The number of interactions blocked if you configured Model Armor in the [`INSPECT_AND_BLOCK`](https://docs.cloud.google.com/model-armor/manage-templates#templates-metadata) mode. These blocked interactions violated floor settings or templates.

## Monitor content security violations

Go to the [top-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-all-agents)
or [agent-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-single-agent)
**Security** tab.

In the **Violations over time** chart, monitor the number of detected violations
over time.

The violations detected are categorized into the following areas:

- **Prompt injections and jailbreaks** : Content violations indicating the presence of prompts that contain malicious commands or jailbreak attempts. For more information, see [Prompt injection and jailbreak detection](https://docs.cloud.google.com/model-armor/overview#ma-prompt-injection).
- **Malicious URL** : Content violations indicating the presence of malicious URLs. For more information, see [Malicious URL
  detection](https://docs.cloud.google.com/model-armor/overview#ma-malicious-url-detection).
- **Responsible AI** : Content violations that are detected by safety filters, such as harassment and hate speech. For a complete list of responsible AI categories, see [Responsible AI safety
  filter](https://docs.cloud.google.com/model-armor/overview#ma-responsible-ai-safety-categories).
- **Sensitive data** : Content violations involving the presence of [sensitive information types](https://docs.cloud.google.com/sensitive-data-protection/docs/infotypes-reference) or [custom information
  types](https://docs.cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes) that you define. For more information, see [Sensitive Data Protection](https://docs.cloud.google.com/model-armor/overview#ma-sensitive-data-prot).

  > [!NOTE]
  > **Note:** Counts for sensitive data content violations are included in the total violations count but aren't displayed in a separate category.

For more information about these detectors, see [Model
Armor filters](https://docs.cloud.google.com/model-armor/overview#ma-filters).

## Identify the agents with the most violations

Go to the [top-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-all-agents)
**Security** tab.

The **Security** tab displays the top 10 agents with the most violations. The list
shows the agent ID of each agent and the number of violations detected for that agent.

To view the Model Armor insights for a specific agent in the list, go to
Agent Registry to search for the agent by its agent ID. Then, go to the [agent-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-single-agent)
**Security** tab for that agent.

[Go to Agent Registry](https://console.cloud.google.com/projectselector2/agent-platform/agent-registry?supportedpurview=project)

## Query and analyze telemetry data using SQL

To query and analyze telemetry data from Model Armor, use Observability
Analytics, which provides a SQL-based query interface.

1. Go to the [top-level](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security#view-security-insights-all-agents) **Security** tab.
2. For the view that you want to query, click **More chart options \> Explore in Observability
   Analytics**.

For general instructions on how to use Observability Analytics, see
[Query and analyze telemetry with
Observability Analytics](https://docs.cloud.google.com/stackdriver/docs/observability/analytics).

## Download violations data to a PNG or CSV file

To download violations data to a PNG or CSV file, follow these steps:

1. In the **Violations over time** view on the **Security** tab, select the period for which you want to download data.
2. Click **More chart options \>
   Download**.
3. Click **Download PNG** or **Download CSV** to download the data in your preferred format.

## What's next

Guide

### [Model Armor audit logging](https://docs.cloud.google.com/model-armor/audit-logging-model-armor)

Learn about audit logging for Model Armor.

Guide

### [Configure logging for Model Armor](https://docs.cloud.google.com/model-armor/configure-logging)

Learn how to configure logging for Model Armor.

Troubleshooting

### [Troubleshoot Model Armor issues](https://docs.cloud.google.com/model-armor/troubleshooting)

Learn how to troubleshoot issues with Model Armor.
