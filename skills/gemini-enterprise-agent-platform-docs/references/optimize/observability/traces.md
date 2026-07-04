## Before you begin

Before you can view agent traces, you must meet the following requirements:

- **Enable APIs** : Ensure that the following APIs are enabled for your Google Cloud project:
  - Cloud Trace API
  - Cloud Logging API
  - Telemetry API
- **Configure agent tracing** : Your agent must be configured to send trace data to Google Cloud. For instructions on enabling tracing for different agent types, see [Set up tracing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing).
- **Configure permissions** : To view traces and logs, you need IAM roles that provide the required permissions, such as the **Cloud Trace User** (`roles/cloudtrace.user`) and **Logs Viewer** (`roles/logging.viewer`) roles. For more information, see [Cloud Trace access control](https://docs.cloud.google.com/trace/docs/iam) and [Cloud Logging access control](https://docs.cloud.google.com/logging/docs/access-control).

Distributed tracing is a diagnostic technique that tracks the progression of a
single request as it travels across various distributed services and components
in your architecture. Because generative AI agents employ non-deterministic
reasoning loops to dynamically choose tools and execution paths, conventional
point-in-time metrics are often insufficient for debugging. Traces are essential
for agent observability because they provide a complete, sequential timeline of
these unpredictable interactions, allowing you to see exactly why an agent made
a specific decision.

## Exploring traces

To access detailed execution data for an agent:

1. In the Google Cloud console, navigate to the **Agent Platform \> Agent Registry** page.

   [Go to Agent Registry](https://console.cloud.google.com/agent-platform/agent-registry/agents)

2. Select your specific agent.

3. Click the **Traces** tab.

This interface lets you inspect the step-by-step execution details of your
agent. A **trace** is a factual, immutable record of the agent's behavior,
including model inputs, responses, and tool calls. The trace view includes a
directed acyclic graph (DAG) of its spans, inputs and outputs, and metadata
attributes.

The Traces tab provides three distinct views to explore your telemetry data:

- **Session view:** Groups executions by individual user sessions, allowing you to analyze multi-turn conversations and the agent's behavior over time.
- **Trace view:** Focuses on individual end-to-end request traces, representing a single execution path.
- **Span view:** Provides a granular list of individual operations (spans) executed within your traces, such as a specific foundation model call, an API request, or an external tool execution.

### Single trace view (session context)

When you select a specific session from the **Session view**, a Details pane
opens with a list panel on the left side displaying all the individual traces
contained within that multi-turn session. The main panel aggregates the entire
session's context, displaying the formatted input and assistant messages,
alongside overall session metrics such as duration, total GenAI tokens, and
continuous evaluation scores.

### Single trace view (direct trace or span context)

Alternatively, if you select a specific trace from the **Trace view** or a
distinct span from the **Span view**, the Details pane opens directly to that
specific execution. Because you are viewing a single operation rather than a
grouped session, the left-hand list panel is hidden, allowing for immediate,
focused inspection of that operation's specific latency, attributes, and
potential errors.

## Data storage and access control

To maintain security and compliance, Gemini Enterprise Agent Platform separates operational
metadata from the actual conversational content:

- **Execution Metrics \& Attributes:** Standard telemetry (like latency, status codes, and structural metadata) is stored directly within the trace spans.
- **Prompts \& Responses:** Potentially sensitive data, such as user prompts and model responses, are not stored in the spans. Instead, they are routed to either Cloud Storage (recommended) or Cloud Logging, depending on your organization's configuration. Cloud Storage is recommended because it supports large and multimodal payloads without truncation and provides fine-grained lifecycle management. Cloud Logging supports basic text payloads but has size limits. This separation allows administrators to implement granular Identity and Access Management (IAM) controls over sensitive conversational data.

The Gemini Enterprise Agent Platform UI automatically understands the underlying correlation
between your trace spans and these securely stored prompt-and-response logs. When
you open a trace detail view, the platform seamlessly pieces this data back
together, presenting a unified view of the agent's behavior without
compromising your data governance rules.

For more information on configuring storage destinations for conversational data,
see [Collect and view multimodal prompts and responses](https://docs.cloud.google.com/stackdriver/docs/instrumentation/collect-view-multimodal-prompts-responses).

## What's next

- Learn more about [observability features](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview) in Gemini Enterprise Agent Platform.
- [View agent relationships](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/topology) as a topology graph.
- [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents).
