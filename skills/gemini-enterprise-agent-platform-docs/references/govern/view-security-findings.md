Use the **Security** tab in Gemini Enterprise Agent Platform to
monitor your deployed AI agents, help assess their security posture, and review
related security findings.

## Before you begin

To use the **Security** tab, ensure that you have the required permissions and that
the necessary Security Command Center features are configured.

### Required roles

To get the permission that
you need to view the **Security** tab and findings,

ask your administrator to grant you the
following IAM roles on your organization or project:

- [Security Center Admin Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/securitycenter#securitycenter.adminViewer) (`roles/securitycenter.adminViewer`)
- [Logs Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/logging#logging.viewer) (`roles/logging.viewer`)
- [Observability View Accessor](https://docs.cloud.google.com/iam/docs/roles-permissions/observability#observability.viewAccessor) (`roles/observability.viewAccessor`)
- [Logs View Accessor](https://docs.cloud.google.com/iam/docs/roles-permissions/logging#logging.viewAccessor) (`roles/logging.viewAccessor`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

This predefined role contains the
`serviceusage.services.get`
permission,
which is required to
view the **Security** tab and findings.

You might also be able to get
this permission
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or
other [predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

Alternatively, to adhere to the principle of least privilege, you can create a
custom IAM role that grants only the necessary permissions. For
more information, see [Custom
roles](https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection#custom-roles).

### Configure Security Command Center features

For the **Security** tab to populate with information, you must onboard your
organization or project to Security Command Center Premium or Enterprise to take full
advantage of features like AI Protection, Agent Platform Vulnerability
Assessment, and attack path simulations. For more information, see [Overview of
activating Security Command Center](https://docs.cloud.google.com/security-command-center/docs/activate-scc-overview).

Enable and configure the following Security Command Center features:

- **AI Protection** : Enable the AI Protection service in your Security Command Center settings. For more information, see [Set up AI
  Protection](https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection#enable-ai-protection).
- **Agent Platform Vulnerability Assessment**: Enable this service in your Security Command Center Premium or Enterprise settings to identify vulnerabilities that are specific to AI agents.
- **Compliance monitoring** : Ensure that compliance monitoring is enabled for your organization or project. Compliance monitoring is enabled by default for organizations and projects with Security Command Center Premium or Enterprise, but might be explicitly disabled in some environments. For more information, see [Enable Compliance Manager](https://docs.cloud.google.com/security-command-center/docs/compliance-manager-enable).
- **Sensitive data discovery** : Enable discovery for AI resources to identify if datasets used in training or fine-tuning contain sensitive data. For more information, see [Enable
  discovery](https://docs.cloud.google.com/security-command-center/docs/activate-sensitive-data-discovery).
- **Model Armor** : Enable Model Armor on your Agent Gateway instances and configure at least one template. Because Model Armor widgets use observability spans to aggregate data, ensure that Cloud Trace is enabled for your agent runtimes. If no relevant telemetry data is detected, the dashboard hides the related widgets behind a banner. For more information, see [Configure
  Model Armor](https://docs.cloud.google.com/model-armor/help/configure-model-armor-gateway).
- **AI Discovery** : Ensure that AI Discovery is configured to populate the AI Inventory data, including agents, models, and endpoints. For more information, see [Configure AI Discovery
  service](https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection#configure-ai-discovery).
- **Attack path simulations**: If you're using Security Command Center Premium or Enterprise, attack path simulations are enabled by default and help you identify the most risky findings.

## Access the Security tab

To access the **Security** tab, follow these steps:

1. In the Google Cloud console, go to the Agent Platform **Security** tab.

   [Go to Security](https://console.cloud.google.com/agent-platform/security)
2. Select your project.
3. In the navigation menu, click **Security**.

## Monitor and manage AI security risk

Use the **Security** tab to perform key security tasks and help maintain a
secure AI environment.

### Triage and remediate production fleet risks

Triage your production fleet by using the following
capabilities:

- **Monitor security health**: Review aggregate risk metrics, compliance status, and active threat counts to assess your overall security posture.
- **Investigate issues**: Click any metric to view the filtered findings list in Security Command Center for further investigation.
- **Remediate findings** : For supported findings where the affected Google Cloud resources are managed through Terraform, use **Remediate with
  Gemini** to help fix issues. For other findings, use guided remediation snippets.

### View summary information of your security posture

Monitor project-scoped risks that are summarized from Security Command Center to
identify and address vulnerabilities:

- **Prioritize risks** : Identify vulnerabilities, misconfigurations, and
  [toxic
  combinations](https://docs.cloud.google.com/security-command-center/docs/toxic-combinations-overview) by
  using the **AI risks by severity** widget. For example, this widget can help
  you identify the following:

  - An agent with high privileges and exposed data
  - Vulnerability findings for agent runtimes (such as Cloud Run vulnerabilities) (Preview)
- **Monitor active threats** : Use the **AI threats** widget to review
  threat detections against Agent Platform control
  planes and agent runtimes such as Cloud Run (Preview).

- **Right-size agent access** : Identify agents with overly broad roles using
  the **Agents with excessive permissions** widget.

### Monitor content security and violations

To learn how to track how your deployed agents handle malicious inputs and
sensitive data using Model Armor integration, see [Monitor content
security](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security).

### Onboard and activate advanced security

If you're using the Security Command Center Standard tier, you can start a
Security Command Center Premium trial with a single
click to access further visibility and attack path simulations.

### Assess risk for individual resources

Perform granular risk assessments for specific components in your fleet:

1. In the Google Cloud console, navigate to the details page for an agent, agent gateway, or Model Context Protocol (MCP) server.
2. To view risks, violations, and discovery graphs that are filtered to that specific resource, select the **Security** tab.

## Security tab widgets

To help you manage your AI security posture, the **Security** tab includes
the following widgets.

- **Top security findings**: Review an aggregated breakdown of active security findings across your AI environment. This widget categorizes findings across your deployed agents by finding type to help you identify systemic risks.
- **AI risks by severity** : Identify and prioritize your most critical vulnerabilities, misconfigurations, and [toxic
  combinations](https://docs.cloud.google.com/security-command-center/docs/toxic-combinations-overview)---such as an over-privileged agent exposed to the public internet. To have agents included in toxic combination calculations, you must designate them as high-value resources by adding them to a [high-value resource set](https://docs.cloud.google.com/security-command-center/docs/attack-exposure-learn#high-value-resource-sets). This widget ranks risks by severity and attack exposure score. You're provided with actionable guidance to help securely patch your agentic environment. Vulnerability findings for agent runtimes (such as Cloud Run) are in (Preview).
- **AI threats**: Monitor your agent environment for active, real-time security breaches. This widget highlights critical and high-severity threats against your Gemini Enterprise Agent Platform control planes and runtimes, such as Cloud Run (Preview). The widget tracks malicious activity, such as anomalous IAM grants, crypto-mining malware, or a compromised agent attempting lateral movement, so you can investigate and respond accordingly.
- **Agents with excessive permissions**: Maintain a strict least-privilege security posture by identifying agents that have been granted overly broad or unnecessary access. This widget lists specific agent identities and provides detailed insights into their unused permissions, allowing you to adjust their roles without breaking functionality.
- **Compliance**: Help verify that your AI deployments adhere to industry security standards. Available at the project level for projects with Security Command Center Premium or Enterprise, this widget monitors your environment against predefined security frameworks (including the expanded AI Essentials) and provides a high-level view of your current compliance status, helping you maintain audit readiness and security hygiene.
- **Content violations** : Monitor and manage content-related security issues across your AI environment. This widget aggregates findings for content violations, providing visibility into the volume and types of policy breaches that are detected in your organization.

  To help you identify potential surges or patterns in malicious
  activity, this widget includes **Violations over time** (Preview), which shows a historical view of
  content violation trends.

## What's next

Guide

### [Use IAM agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity)

Learn how to use Identity Access Management (IAM) agent identity to provide security and access management features with Agent Platform.

Codelab

### [Codelab: Secure cross-cloud agentic AI applications](https://codelabs.developers.google.com/next26/aiinfra-learning-pod/screen1-securing-cross-cloud-agentic)

Learn how to secure your agentic applications in the Securing Cross-Cloud Agentic AI Applications codelab.

Overview

### [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview)

Get an overview of Agent Gateway.

Overview

### [Policies overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/overview)

Get an overview of policies in Google Agent Platform.

Overview

### [Google Agent Platform overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview)

Get an overview of Google Agent Platform.
