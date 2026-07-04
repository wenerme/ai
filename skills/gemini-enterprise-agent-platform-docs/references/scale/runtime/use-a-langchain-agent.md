## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Create a LangChain agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langchain-agent): to create `agent` as an instance of [`LangchainAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LangchainAgent).
- [User authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) to authenticate as a user for querying the agent.
- [Import and initialize the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#sdk-import) to initialize the client for getting a deployed instance (if needed).

## Get an instance of an agent

To query a [`LangchainAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LangchainAgent), you need to first
[create a new instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-platform-instance) or
[get an existing instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get).

To get the [`LangchainAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LangchainAgent) that corresponds to a specific resource ID:

### Agent Platform SDK

Run the following code:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

    agent = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.get(name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

    print(agent)

where

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#project) under which you [create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents, and
- `LOCATION` is one of the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).
- `RESOURCE_ID` is the ID of the deployed agent as a [`reasoningEngine` resource](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines).

### Python requests library

Run the following code:

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests

    def get_identity_token():
        credentials, _ = google_auth.default()
        auth_request = google_requests.Request()
        credentials.refresh(auth_request)
        return credentials.token

    response = requests.get(
    f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": f"Bearer {get_identity_token()}",
        },
    )

### REST API

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID

When using the Agent Platform SDK, the `agent` object corresponds to an
[`AgentEngine`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.AgentEngine) class that contains the following:

- [`agent.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `agent.operation_schemas()` to return the list of operations that the `agent` supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#supported-operations) for details.
- [`agent.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`agent.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

The rest of this section assumes that you have an `AgentEngine` instance, named as `agent`.

## Supported operations

The following operations are supported:

- [`query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LangchainAgent#vertexai_agent_engines_LangchainAgent_query): for getting a response to a query synchronously.
- [`stream_query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LangchainAgent#vertexai_agent_engines_LangchainAgent_stream_query): for streaming a response to a query.

Both `query` and `stream_query` methods support the same type of arguments:

- [`input`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#input-messages): the messages to be sent to the agent.
- [`config`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#runnable-configuration): the configuration (if applicable) for the context of the query.

## Query the agent

To query the agent with an input, use the [`LangchainAgent.query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LangchainAgent#vertexai_agent_engines_LangchainAgent_query) method:

    agent.query(input="What is the exchange rate from US dollars to SEK today?")

is equivalent to the following (in full form):

    agent.query(input={
        "input": [ # The input is represented as a list of messages (each message as a dict)
            {
                # The role (e.g. "system", "user", "assistant", "tool")
                "role": "user",
                # The type (e.g. "text", "tool_use", "image_url", "media")
                "type": "text",
                # The rest of the message (this varies based on the type)
                "text": "What is the exchange rate from US dollars to Swedish currency?",
            },
        ]
    })

Roles are used to help the model distinguish between different types of [messages](https://python.langchain.com/docs/concepts/messages)
when responding. When the `role` is omitted in the input, it defaults to `"user"`.

| Role | Description |
|---|---|
| `system` | Used to tell the chat model how to behave and provide additional context. Not supported by all chat model providers. |
| `user` | Represents input from a user interacting with the model, usually in the form of text or other interactive input. |
| `assistant` | Represents a response from the model, which can include text or a request to invoke tools. |
| `tool` | A message used to pass the results of a tool invocation back to the model after external data or processing has been retrieved. |

The `type` of the message will also determine how the rest of the message is
interpreted (see [Handle multi-modal content](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#multimodal-content)).

## Query the agent with multi-modal content

We will use the following agent (which forwards the input to the model and does
not use any tools) to illustrate how to pass in multimodal inputs to an agent:

> [!NOTE]
> **Note:** there isn't any known support for multi-modal outputs.

    agent = agent_engines.LangchainAgent(
        model="gemini-2.0-flash",
        runnable_builder=lambda model, **kwargs: model,
    )

Multimodal messages are represented through content blocks that specify a `type`
and corresponding data. In general, for multimodal content, you would specify
the `type` to be `"media"`, the `file_uri` to point to a Cloud Storage URI,
and the `mime_type` for interpreting the file.

### Image

    agent.query(input={"input": [
        {"type": "text", "text": "Describe the attached media in 5 words!"},
        {"type": "media", "mime_type": "image/jpeg", "file_uri": "gs://cloud-samples-data/generative-ai/image/cricket.jpeg"},
    ]})

### Video

    agent.query(input={"input": [
        {"type": "text", "text": "Describe the attached media in 5 words!"},
        {"type": "media", "mime_type": "video/mp4", "file_uri": "gs://cloud-samples-data/generative-ai/video/pixel8.mp4"},
    ]})

### Audio

    agent.query(input={"input": [
        {"type": "text", "text": "Describe the attached media in 5 words!"},
        {"type": "media", "mime_type": "audio/mp3", "file_uri": "gs://cloud-samples-data/generative-ai/audio/pixel.mp3"},
    ]})

For the list of MIME types supported by Gemini, visit the documentation on:

- [Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding#image-requirements)
- [Video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding#video-requirements)
- [Audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/audio-understanding#audio-requirements)

## Query the agent with a runnable configuration

When querying the agent, you can also specify a `config` for the agent (which
follows the schema of a [`RunnableConfig`](https://python.langchain.com/docs/concepts/runnables/#runnableconfig)).
Two common scenarios are:

- Default configuration parameters:
  - `run_id` / `run_name`: identifier for the run.
  - `tags` / `metadata`: classifier for the run when [tracing with OpenTelemetry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#tracing).
- Custom configuration parameters (via `configurable`):
  - `session_id`: the session under which the run is happening (see [Store chat history](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langchain-agent#chat-history)).
  - `thread_id`: the thread under which the run is happening (see [Store Checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#store-checkpoints)).

As an example:

    import uuid

    run_id = uuid.uuid4()  # Generate an ID for tracking the run later.

    response = agent.query(
        input="What is the exchange rate from US dollars to Swedish currency?",
        config={  # Specify the RunnableConfig here.
            "run_id": run_id                               # Optional.
            "tags": ["config-tag"],                        # Optional.
            "metadata": {"config-key": "config-value"},    # Optional.
            "configurable": {"session_id": "SESSION_ID"}   # Optional.
        },
    )

    print(response)

## What's next

- [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent).
- [Evaluate an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation).
- [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
- [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support).
