Cloud Trace lets you analyze the performance of your agents by tracing the
timeline of operations for each query. You can use traces to identify
bottlenecks and understand interactions with large language models (LLMs) or
tools.

This document explains how to enable Trace for your agents and
how to view and analyze traces in the Google Cloud console.

A [**trace**](https://opentelemetry.io/docs/concepts/signals/traces/)
is a timeline of requests as your agent responds to each query. For example, the following chart shows a sample trace from an Agent Development Kit (ADK) agent:

![Sample trace for a query](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/trace-example.png)

A trace is
composed of individual [**spans**](https://opentelemetry.io/docs/concepts/signals/traces/#spans), which
represent a single unit of work, like a function call or an interaction with an
LLM, with the first span representing the overall
request. Each span provides details about a specific operation, such as the operation's name, start and end times,
and any relevant [attributes](https://opentelemetry.io/docs/concepts/signals/traces/#attributes), within the request. For example, the following JSON shows a single span that represents
a call to a large language model (LLM):

      {
        "name": "llm",
        "context": {
            "trace_id": "ed7b336d-e71a-46f0-a334-5f2e87cb6cfc",
            "span_id": "ad67332a-38bd-428e-9f62-538ba2fa90d4"
        },
        "span_kind": "LLM",
        "parent_id": "f89ebb7c-10f6-4bf8-8a74-57324d2556ef",
        "start_time": "2023-09-07T12:54:47.597121-06:00",
        "end_time": "2023-09-07T12:54:49.321811-06:00",
        "status_code": "OK",
        "status_message": "",
        "attributes": {
            "llm.input_messages": [
                {
                    "message.role": "system",
                    "message.content": "You are an expert Q&A system that is trusted around the world.\nAlways answer the query using the provided context information, and not prior knowledge.\nSome rules to follow:\n1. Never directly reference the given context in your answer.\n2. Avoid statements like 'Based on the context, ...' or 'The context information ...' or anything along those lines."
                },
                {
                    "message.role": "user",
                    "message.content": "Hello?"
                }
            ],
            "output.value": "assistant: Yes I am here",
            "output.mime_type": "text/plain"
        },
        "events": [],
      }

> [!NOTE]
> **Note:** The format of the trace(s) and span(s) depends on the instrumentation option you go with. The example span is experimental and subject to change so you shouldn't rely on the format to be stable for now. For details, see the [Semantic Conventions for Generative AI systems](https://opentelemetry.io/docs/specs/semconv/gen-ai/) being developed in OpenTelemetry.

For details, see the Cloud Trace documentation on
[Traces and spans](https://docs.cloud.google.com/trace/docs/traces-and-spans) and
[Trace context](https://docs.cloud.google.com/trace/docs/trace-context).

## Before you begin

Before you can collect and write traces, you must enable specific APIs and
install dependencies. For more information, see [Collect and view multimodal
prompts and responses](https://docs.cloud.google.com/stackdriver/docs/instrumentation/collect-view-multimodal-prompts-responses#collect)
in the Google Cloud Observability documentation.

## Write traces for an agent

To write traces for an agent:

### ADK

To enable OpenTelemetry for `AdkApp`, set the following
environment variables when you [deploy the
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#environment-variables) to
Agent Runtime:

    env_vars = {
      "GOOGLE_CLOUD_AGENT_ENGINE_ENABLE_TELEMETRY": "true",
      "OTEL_SEMCONV_STABILITY_OPT_IN": "gen_ai_latest_experimental",
      "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "EVENT_ONLY",
    }

Note the following:

- `GOOGLE_CLOUD_AGENT_ENGINE_ENABLE_TELEMETRY` enables the agent traces and
  logs, but doesn't include prompts and response data.

- `OTEL_SEMCONV_STABILITY_OPT_IN` enables use of the latest generative AI
  semantic conventions.

- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` enables the logging of
  input prompts, output responses, and user IDs (the `user.id` field). Capturing these details facilitates agent observability and anomaly detection by tracking usage and interactions over time.

  > [!NOTE]
  > **Note:** Ensure you have any necessary end user consents, notices, and data handling policies in place for your collection of this information.

  > [!IMPORTANT]
  > **Important:** Logging of `user.id` is included when opting in to "Enable logging of prompt inputs and response outputs" effective May 22, 2026, with Agent Development Kit version 2.1. If you opted in prior to May 22, your logging does not include `user.id`. You will need to redeploy your agents and opt-in again for this setting to take effect.

- To use trace ingestion, you need to [enable the Telemetry API](https://console.cloud.google.com/flows/enableapi?apiid=telemetry.googleapis.com). For more information, see [Telemetry (OTLP) API overview](https://docs.cloud.google.com/stackdriver/docs/reference/telemetry/overview).

- To use log ingestion, you need to [enable the Logging API](https://console.cloud.google.com/flows/enableapi?apiid=logging.googleapis.com). For more information, see [Cloud Logging API overview](https://docs.cloud.google.com/logging/docs/reference/api-overview).

> [!NOTE]
> **Note:** If you were previously setting the `enable_tracing` flag, we recommend you use the environment variables instead. For example, set `GOOGLE_CLOUD_AGENT_ENGINE_ENABLE_TELEMETRY=true` instead of `enable_tracing=true`, and set `GOOGLE_CLOUD_AGENT_ENGINE_ENABLE_TELEMETRY=false` instead of `enable_tracing=false`.

### LangchainAgent

To enable tracing for `LangchainAgent`, specify `enable_tracing=True` when you
[develop a LangChain agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langchain-agent).
For example:

    from vertexai.agent_engines import LangchainAgent

    agent = LangchainAgent(
        model=model,                # Required.
        tools=[get_exchange_rate],  # Optional.
        enable_tracing=True,        # [New] Optional.
    )

### LanggraphAgent

To enable tracing for `LanggraphAgent`, specify `enable_tracing=True` when you
[develop a LangGraph agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent).
For example:

    from vertexai.agent_engines import LanggraphAgent

    agent = LanggraphAgent(
        model=model,                # Required.
        tools=[get_exchange_rate],  # Optional.
        enable_tracing=True,        # [New] Optional.
    )

### LlamaIndex

> [!WARNING]
>
> **Preview**
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

To enable tracing for `LlamaIndexQueryPipelineAgent`, specify `enable_tracing=True` when you
[develop a LlamaIndex agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent).
For example:

    from vertexai.preview import reasoning_engines

      def runnable_with_tools_builder(model, runnable_kwargs=None, **kwargs):
          from llama_index.core.query_pipeline import QueryPipeline
          from llama_index.core.tools import FunctionTool
          from llama_index.core.agent import ReActAgent

          llama_index_tools = []
          for tool in runnable_kwargs.get("tools"):
              llama_index_tools.append(FunctionTool.from_defaults(tool))
          agent = ReActAgent.from_tools(llama_index_tools, llm=model, verbose=True)
          return QueryPipeline(modules = {"agent": agent})

      agent = reasoning_engines.LlamaIndexQueryPipelineAgent(
          model="gemini-2.0-flash",
          runnable_kwargs={"tools": [get_exchange_rate]},
          runnable_builder=runnable_with_tools_builder,
          enable_tracing=True,        # Optional
      )

### Custom

To enable tracing for [custom agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent),
visit [Tracing using OpenTelemetry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#tracing)
for details.

This exports traces to Cloud Trace under the project in
[Set up your Google Cloud project](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#project).

## View traces for an agent

For deployed agents, you can use the Google Cloud console to view traces for your agent:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Platform instances that are part of the selected project
   appear in the list. You can use the **Filter** field to filter the list by
   your specified column.
2. Click the name of your Agent Platform instance.

3. Click the **Traces** tab.

4. You can select **Session view** or **Span view**.

   Click a session or span to inspect trace details, including a directed acyclic graph (DAG) of its spans, inputs and outputs, and metadata attributes.

## Quotas and limits

Some attribute values might get truncated when they reach quota limits. For
more information, see [Cloud Trace Quota](https://docs.cloud.google.com/trace/docs/quotas).

## Pricing

Cloud Trace has a free tier. For more information, see
[Cloud Trace Pricing](https://docs.cloud.google.com/trace#pricing).
