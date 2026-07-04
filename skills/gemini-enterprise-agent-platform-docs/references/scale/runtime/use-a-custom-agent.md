## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Create a custom agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent): to create a custom `agent`.
- [User authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) to authenticate as a user for querying the agent.
- [Import and initialize the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#sdk-import) to initialize the client for getting a deployed instance (if needed).

## Get an instance of an agent

To query an agent, you first need an instance of an agent. You can either
[create a new instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-engine) or
[get an existing instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get) of an
agent.

To get the agent that corresponds to a specific resource ID:

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

- `PROJECT_ID` is the Google Cloud project ID under which you [create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents, and
- `LOCATION` is one of the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).
- `RESOURCE_ID` is the ID of the deployed agent as a [`reasoningEngine` resource](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines).

### requests

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

### REST

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID

When using the Agent Platform SDK for Python, the `agent` object corresponds to an
[`AgentEngine`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.AgentEngine) class that contains the following:

- [`agent.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `agent.operation_schemas()` to return the list of operations that the `agent` supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#supported-operations) for details.
- [`agent.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`agent.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

The rest of this section assumes that you have an instance, named as `agent`.

## List supported operations

When developing the agent locally, you have access and knowledge of the
operations that it supports. To use a [deployed agent](https://docs.cloud.google.com/agent-builder/agent-engine/deploy), you can enumerate the operations that it supports:

### Agent Platform SDK

Run the following code:

    print(agent.operation_schemas())

### requests

Run the following code:

    import json

    json.loads(response.content).get("spec").get("classMethods")

### REST

Represented in `spec.class_methods` from the response to the curl request.

The schema for each operation is a dictionary that documents the information of
a method for the agent that you can call. The set of supported operations
depends on the framework you used to develop your agent:

- [Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#supported-operations)
- [Agent2Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#supported-operations)
- [LangChain](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#supported-operations)
- [LangGraph](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#supported-operations)
- [AG2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent#supported-operations)
- [LlamaIndex](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-llamaindex-agent#supported-operations)
- [Custom](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#custom-methods)

As an example, the following is the schema for the `query` operation of a
`LangchainAgent`:

    {'api_mode': '',
     'name': 'query',
     'description': """Queries the Agent with the given input and config.
        Args:
            input (Union[str, Mapping[str, Any]]):
                Required. The input to be passed to the Agent.
            config (langchain_core.runnables.RunnableConfig):
                Optional. The config (if any) to be used for invoking the Agent.
        Returns:
            The output of querying the Agent with the given input and config.
    """,            '        ',
     'parameters': {'$defs': {'RunnableConfig': {'description': 'Configuration for a Runnable.',
                                                 'properties': {'configurable': {...},
                                                                'run_id': {...},
                                                                'run_name': {...},
                                                                ...},
                                                 'type': 'object'}},
                    'properties': {'config': {'nullable': True},
                                   'input': {'anyOf': [{'type': 'string'}, {'type': 'object'}]}},
                    'required': ['input'],
                    'type': 'object'}}

where

- `name` is the name of the operation (i.e. `agent.query` for an operation named `query`).
- `api_mode` is the API mode of the operation (`""` for synchronous, `"stream"` for streaming).
- `description` is a description of the operation based on the method's docstring.
- `parameters` is the schema of the input arguments in OpenAPI schema format.

## Query the agent using supported operations

For custom agents, you can use any of the following query or streaming operations you defined when developing your agent:

- [`query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#query-agent)

- [`stream_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#stream-responses)

- [`async_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#async-query-agent)

- [`async_stream_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#async-stream-responses)

Note that certain frameworks only support specific query or streaming operations:

| Framework | Supported query operations |
|---|---|
| Agent Development Kit | `async_stream_query` |
| LangChain | `query`, `stream_query` |
| LangGraph | `query`, `stream_query` |
| AG2 | `query` |
| LlamaIndex | `query` |

### Query the agent

Query the agent using the `query` operation:

### Agent Platform SDK

    agent.query(input="What is the exchange rate from US dollars to Swedish Krona today?")

### requests

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests

    def get_identity_token():
        credentials, _ = google_auth.default()
        auth_request = google_requests.Request()
        credentials.refresh(auth_request)
        return credentials.token

    requests.post(
        f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": f"Bearer {get_identity_token()}",
        },
        data=json.dumps({
            "class_method": "query",
            "input": {
                "input": "What is the exchange rate from US dollars to Swedish Krona today?"
            }
        })
    )

### REST

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query -d '{
      "class_method": "query",
      "input": {
        "input": "What is the exchange rate from US dollars to Swedish Krona today?"
      }
    }'

The query response is a string that is similar to the output of a [local application test](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent#test-async-query):

    {"input": "What is the exchange rate from US dollars to Swedish Krona today?",
     # ...
     "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

### Stream responses from the agent

Stream a response from the agent using the `stream_query` operation:

### Agent Platform SDK

    agent = agent_engines.get("projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

    for response in agent.stream_query(
        input="What is the exchange rate from US dollars to Swedish Krona today?"
    ):
        print(response)

### requests

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests

    def get_identity_token():
        credentials, _ = google_auth.default()
        auth_request = google_requests.Request()
        credentials.refresh(auth_request)
        return credentials.token

    requests.post(
        f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:streamQuery",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {get_identity_token()}",
        },
        data=json.dumps({
            "class_method": "stream_query",
            "input": {
                "input": "What is the exchange rate from US dollars to Swedish Krona today?"
            },
        }),
        stream=True,
    )

### REST

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:streamQuery?alt=sse -d '{
      "class_method": "stream_query",
      "input": {
        "input": "What is the exchange rate from US dollars to Swedish Krona today?"
      }
    }'

Agent Platform streams responses as a sequence of iteratively generated
objects. For example, a set of three responses might look like the following:

    {'actions': [{'tool': 'get_exchange_rate', ...}]}  # first response
    {'steps': [{'action': {'tool': 'get_exchange_rate', ...}}]}  # second response
    {'output': 'The exchange rate is 11.0117 SEK per USD as of 2024-12-03.'}  # final response

### Asynchronously query the agent

If you defined an `async_query` operation when [creating the agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#async-query),
there is support for client-side async querying of the agent in the
Agent Platform SDK for Python:

### Agent Platform SDK for Python

    agent = agent_engines.get("projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

    response = await agent.async_query(
        input="What is the exchange rate from US dollars to Swedish Krona today?"
    )
    print(response)

The query response is a dictionary that is the same as the output of a [local test](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#test-async-query):

    {"input": "What is the exchange rate from US dollars to Swedish Krona today?",
     # ...
     "output": "For 1 US dollar you will get 10.7345 Swedish Krona."}

### Asynchronously stream responses from the agent

If you defined an `async_stream_query` operation when [creating the agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#async-stream-responses),
you can asynchronously stream a response from the agent using one of its
operations (e.g. `async_stream_query`):

### Agent Platform SDK for Python

    agent = agent_engines.get("projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

    async for response in agent.async_stream_query(
        input="What is the exchange rate from US dollars to Swedish Krona today?"
    ):
        print(response)

The `async_stream_query` operation calls the same
[`streamQuery` endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#stream-responses) under-the-hood and asynchronously
stream responses as a sequence of iteratively generated objects. For example, a
set of three responses might look like the following:

    {'actions': [{'tool': 'get_exchange_rate', ...}]}  # first response
    {'steps': [{'action': {'tool': 'get_exchange_rate', ...}}]}  # second response
    {'output': 'The exchange rate is 11.0117 SEK per USD as of 2024-12-03.'}  # final response

The responses should be the same as those generated during [local testing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent#test-async-stream-query).

## Long-running query jobs

For queries that can take a long time to complete (up to seven days), you can run them as long-running jobs.
For more information, see
[Use an ADK agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#long-running-query-jobs).

### Start a long-running query job

To start a long-running query job:

### Agent Platform SDK for Python

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
    )

    response = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.AgentEngines.html#vertexai__genai_agent_engines_AgentEngines_run_query_job(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
        config={
            "query": '{ "input": {"product": "Google"} }',
            "output_gcs_uri": "gs://GCS_BUCKET_NAME/OUTPUT_FILE",
        },
    )
    print(response)

### REST

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:asyncQuery -d \
    '{
      "input_gcs_uri": "gs://GCS_BUCKET_NAME/INPUT_FILE",
      "output_gcs_uri": "gs://GCS_BUCKET_NAME/OUTPUT_FILE"
    }'

### Check the status of a long-running query job

To check the status and retrieve the results of a long-running query job:

### Agent Platform SDK

    response = client.agent_engines.check_query_job(
        name="JOB_NAME",
        config={
            "retrieve_result": True,
        },
    )
    print(response)

## What's next

- [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent).
- [Evaluate an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation).
- [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
- [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support).
