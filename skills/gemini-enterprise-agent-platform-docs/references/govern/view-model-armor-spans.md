> [!NOTE]
>
> **Private Preview
> --- Model Armor trace spans**
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

This document describes the Model Armor spans within traces and how to
view their details. For more information about traces, see [View agent
traces](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/traces).

## About Cloud Trace and agent observability

A [*trace*](https://docs.cloud.google.com/trace/docs/traces-and-spans) represents the path of a request
across the parts of your distributed application. That is, each trace represents
a single end-to-end operation. Because traces are composed of *spans*, which are
records for a single function or operation, they let you follow the flow of
requests and examine latency data. This information can help you to
identify the root cause of an issue.

Cloud Trace is the distributed tracing system for Google Cloud, and it
provides features to [explore traces](https://docs.cloud.google.com/trace/docs/finding-traces)
or to [analyze trace data with SQL](https://docs.cloud.google.com/trace/docs/analytics). However, many
Google Cloud services, such as
[Application Monitoring](https://docs.cloud.google.com/stackdriver/docs/observability/about-application-monitoring)
and Agent Registry, can display the data managed by Cloud Trace.
These services let you view trace data in the context of the service that you
are using.

## Before you begin

1.

   Enable the Cloud Trace, Cloud Logging, Telemetry, and Model Armor APIs.

   **Roles required to enable APIs**

   To enable APIs, you need the Service Usage Admin IAM
   role (`roles/serviceusage.serviceUsageAdmin`), which
   contains the `serviceusage.services.enable` permission. [Learn how to grant
   roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

   [Enable the APIs](https://console.cloud.google.com/apis/enableflow?apiid=cloudtrace.googleapis.com,logging.googleapis.com,telemetry.googleapis.com,modelarmor.googleapis.com)
2. [Set up tracing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing) for your agent.
3. [Configure
   Model Armor on a gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor) or on a [Google Cloud
   MCP server](https://docs.cloud.google.com/model-armor/model-armor-mcp-google-cloud-integration).

### Required roles

To get the permissions that
you need to view trace data,

ask your administrator to grant you the
following IAM roles on your project:

- [Cloud Trace User](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtrace#cloudtrace.user) (`roles/cloudtrace.user`)
- [Logs Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/logging#logging.viewer) (`roles/logging.viewer`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

For information about other roles you might need, see [Cloud Trace access
control](https://docs.cloud.google.com/trace/docs/iam) and [Cloud Logging access
control](https://docs.cloud.google.com/logging/docs/access-control).

## Supported payloads

For a list of supported payloads, see [Supported and unsupported
payloads](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor#supported-unsupported-payloads).

For a request that contains an unsupported payload, Model Armor
generates a span with an error.

## Model Armor span names and attributes

The following Model Armor spans are available:

- Parent span: `apply_guardrail "Google Cloud Model Armor"`
- Child span: `Request Path`
- Child span: `Response Path`

The following sections list all possible attributes of a
Model Armor span. Not all attributes are present on every span.
These attribute names are subject to change.

### Parent span attributes

The parent span, `apply_guardrail "Google Cloud Model Armor"`, has the following
attributes:

- `cloud.provider`: the cloud provider associated with the operation.
- `cloud.region`: the Google Cloud region where the operation occurred.
- `gcp.project_id`: the ID of the project where the operation occurred.
- `rpc.system`: the underlying remote procedure call (RPC) framework or protocol that was used for the operation---for example, `grpc`.
- `service.name`: the Google Cloud service associated with the operation. For Model Armor spans, the value of this field is `modelarmor`.

### Request Path attributes

The `Request Path` child span has the following attributes:

- `gen_ai.security.target.type`: the type of content or action the guardrail is applied to. In the `Request Path` span, this is always `input`.
- `gen_ai.security.decision.type`: the verdict or action that Model Armor applied. A value of `modify` indicates that Model Armor redacted (*de-identified*) sensitive data from the content according to the template provided.
- `gen_ai.security.decision.code`: a numeric code for the security decision.
- `gen_ai.security.decision.reason`: a user-readable reason for the decision.
- `gen_ai.security.policy.id`: the full resource name of the Model Armor template in the format `projects/PROJECT_ID/locations/LOCATION/templates/MODEL_ARMOR_TEMPLATE_ID`.
- `gen_ai.security.policy.name`: the name of the Model Armor template that was used for the operation.
- `gcp.modelarmor.filter.match.state`: whether the content violated any of the [Model Armor filters](https://docs.cloud.google.com/model-armor/overview#ma-filters) (also called *detectors*).
- `gcp.modelarmor.violations`: the Model Armor filters that the content violated. A value of `deidentified` indicates that Model Armor redacted sensitive data from the content according to the template provided.
- `gcp.modelarmor.rai.violation`: the responsible AI categories that the content violated. For more information, see [Responsible AI safety
  filter](https://docs.cloud.google.com/model-armor/overview#ma-responsible-ai-safety-categories).
- `error.type`: an identifier for the error encountered.

### Response Path attributes

The `Response Path` child span has the following attributes:

- `gen_ai.security.target.type`: the type of content or action the guardrail is applied to. In the `Response Path` span, this is always `output`.
- `gen_ai.security.decision.type`: the verdict or action that Model Armor applied. A value of `modify` indicates that Model Armor redacted (*de-identified*) sensitive data from the content according to the template provided.
- `gen_ai.security.decision.code`: a numeric code for the security decision.
- `gen_ai.security.decision.reason`: a user-readable reason for the decision.
- `gen_ai.security.policy.id`: the full resource name of the Model Armor template in the format `projects/PROJECT_ID/locations/LOCATION/templates/MODEL_ARMOR_TEMPLATE_ID`.
- `gen_ai.security.policy.name`: the name of the Model Armor template that was used for the operation.
- `gcp.modelarmor.filter.match.state`: whether the content violated any of the [Model Armor filters](https://docs.cloud.google.com/model-armor/overview#ma-filters) (also called *detectors*).
- `gcp.modelarmor.violations`: the Model Armor filters that the content violated. A value of `deidentified` indicates that Model Armor redacted sensitive data from the content according to the template provided.
- `gcp.modelarmor.rai.violation`: the responsible AI categories that the content violated. For more information, see [Responsible AI safety
  filter](https://docs.cloud.google.com/model-armor/overview#ma-responsible-ai-safety-categories).
- `error.type`: an identifier for the error encountered.

## View the details of a Model Armor span

To view a Model Armor span and its details---including its
attributes and DAG---follow these steps:

1. In the Google Cloud console, go to Agent Registry. [Go to Agent Registry](https://console.cloud.google.com/projectselector2/agent-platform/agent-registry?supportedpurview=project)

2. Select your project.
3. Click the name of the agent.
4. Click the **Traces** tab.
5. Click the ID of a trace that you want to view. If the trace involves a Model Armor span, the trace includes the `apply_guardrail "Google Cloud Model Armor"` span.
6. Explore the trace:

   - To view the trace as a directed acyclic graph (DAG), click the **Graph** view. This view represents an agent's execution trace as a node-link diagram. DAGs emphasize the causal relationships and dependencies between different trace spans and show how one operation triggers the next. Each node in the graph is a span.
   - To view the trace as a timeline, click the **Timeline** view. Each bar in the timeline represents a span.
7. Click a span to see its attributes.

Alternatively, click **View in Cloud Trace** to view all spans in your project
through the **Trace explorer** . [Apply span
filters](https://docs.cloud.google.com/trace/docs/finding-traces#apply-span-filters) to search for the
`apply_guardrail "Google Cloud Model Armor"` span.

## What's next

- [Set up tracing for your agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing)
- [Configure Model Armor on a gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor)
- [Monitor content security](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/monitor-content-security)
- [View agent traces](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/traces)
