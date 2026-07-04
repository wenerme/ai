In addition to the general instructions for [using an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent),
this page describes features that are specific to [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent).

## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Create an AG2 agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent): to create `agent` as an instance of [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent).
- [User authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) to authenticate as a user for querying the agent.
- [Import and initialize the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#sdk-import) to initialize the client for getting a deployed instance (if needed).

## Get an instance of an agent

To query a [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent), you need to first
[create a new instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-engine) or
[get an existing instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get).

To get the [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent) that corresponds to a specific resource ID:

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

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent#project) under which you [create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents, and
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

- [`agent.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `agent.operation_schemas()` to return the list of operations that the `agent` supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent#supported-operations) for details.
- [`agent.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`agent.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

The rest of this section assumes that you have an `AgentEngine` instance, named as `agent`.

## Supported operations

The following operations are supported for [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent):

- [`query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent#vertexai_agent_engines_AG2Agent_query): for getting a response to a query synchronously.

The `query` method support the arguments:

- `input`: the message to be sent to the agent.
- `max_turns`: the maximum number of conversation turns allowed. When using tools, a minimum of `max_turns=2` is required: one turn to generate tool arguments and a second to execute the tool.

## Query the agent

The `query()` method provides a simplified way to interact with the agent. A typical call looks like this:

    response = agent.query(input="What is the exchange rate from US dollars to Swedish currency?", max_turns=2)

This method handles the underlying communication with the agent and returns the agent's final response as a dictionary. It is equivalent to the following (in full form):

    from autogen import ConversableAgent
    import dataclasses
    import json

    input_message: str = "What is the exchange rate from US dollars to Swedish currency?"
    max_turns: int = 2

    with agent._runnable._create_or_get_executor(
        tools=agent._ag2_tool_objects,            # Use the agent's existing tools
        agent_name="user",                        # Default
        agent_human_input_mode="NEVER",           # query() enforces this
    ) as executor:
        chat_result = executor.initiate_chat(
            agent._runnable,
            message=input_message,
            max_turns=max_turns,
            clear_history=False,                  # Default
            summary_method="last_msg"             # Default
        )

    response = json.loads(
      json.dumps(dataclasses.asdict(chat_result)) # query() does this conversion
    )

You can customize the agent's behavior beyond `input` and `max_turns` by passing additional keyword arguments to `query()`.

    response = agent.query(
        input="What is the exchange rate from US dollars to Swedish currency?",
        max_turns=2,
        msg_to="user"  # Start the conversation with the "user" agent
    )
    print(response)

See the
[`ConversableAgent.run` documentation](https://docs.ag2.ai/latest/docs/api-reference/autogen/ConversableAgent/)
for a complete list of available parameters. However, keep in mind that
`user_input` will always be overridden to `False` by the [`AG2Agent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AG2Agent) template.

## What's next

- [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent).
- [Evaluate an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation).
- [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
- [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support).
