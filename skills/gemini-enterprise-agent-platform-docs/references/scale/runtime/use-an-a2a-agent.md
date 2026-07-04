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

## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Create an Agent2Agent (A2A) agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-a2a-agent) to create an agent as an instance of [`A2aAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.A2aAgent).
- [User authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) to authenticate as a user for querying the agent.
- [Import and initialize the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#sdk-import) to initialize the client for getting a deployed instance (if needed).

## Get an instance of an agent

To query an [`A2aAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.A2aAgent), you need to first
[create a new instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-engine) or
[get an existing instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get).

To get the [`A2aAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.preview.reasoning_engines.A2aAgent) that corresponds to a specific resource ID:

### Agent Platform SDK

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.genai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html

    PROJECT_ID = "PROJECT_ID"
    LOCATION = "LOCATION"
    RESOURCE_ID = "RESOURCE_ID"
    RESOURCE_NAME = f"projects/{PROJECT_ID}/locations/{LOCATION}/reasoningEngines/{RESOURCE_ID}"

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project=PROJECT_ID,
        location=LOCATION,
        http_options=https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html.HttpOptions(
            api_version="v1beta1",
        )
    )

    remote_agent = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.get(name=RESOURCE_NAME)

    print(remote_agent)

where

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#project) under which you [create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents, and
- `LOCATION` is one of the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).
- `RESOURCE_ID` is the ID of the deployed agent as a [`reasoningEngine` resource](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines).

### A2A Python SDK

This method uses the official A2A Python SDK, which provides a client
library for interacting with A2A-compliant agents. For more information, see
the [A2A Python SDK
documentation](https://a2a-protocol.org/latest/sdk/python/).

First, install the SDK:

    pip install a2a-sdk>=0.3.4

Then, get the agent's card to create a client instance. The `A2AClient`
handles the discovery and communication for you.

    from google.auth import default
    from google.auth.transport.requests import Request
    from a2a.client import ClientConfig, ClientFactory
    from a2a.types import TransportProtocol
    import httpx

    # We assume 'agent_card' is an existing AgentCard object.

    # Fetch credentials for authentication for demo purpose. Use your own auth
    credentials, _ = default(scopes=['https://www.googleapis.com/auth/cloud-platform'])
    credentials.refresh(Request())

    # Create the client by chaining the factory and config initialization.
    factory = ClientFactory(
        ClientConfig(
            supported_transports=[TransportProtocol.http_json], # only support http_json
            use_client_preference=True,
            httpx_client=httpx.AsyncClient(
                headers={
                    "Authorization": f"Bearer {credentials.token}",
                    "Content-Type": "application/json",
                }
            ),
        )
    )
    a2a_client = factory.create(agent_card)

### Python requests library

The A2A protocol is built on standard HTTP endpoints. You can interact with
these endpoints using any HTTP client.

Retrieve the A2A URL from the agent card and define the request
headers.

    from google.auth import default
    from google.auth.transport.requests import Request

    # We assume 'agent_card' is an existing object
    a2a_url = agent_card.url

    # Get an authentication token for demonstration purposes. Use your own authentication mechanism.
    credentials, _ = default(scopes=['https://www.googleapis.com/auth/cloud-platform'])
    credentials.refresh(Request())

    headers = {
        "Authorization": f"Bearer {credentials.token}",
        "Content-Type": "application/json",
    }

When using the Agent Platform SDK, the `remote_agent` object corresponds to an
[`AgentEngine`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.AgentEngine) class that contains the following:

- [`remote_agent.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `remote_agent.operation_schemas()` to return the list of operations that the `remote_agent` supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#supported-operations) for details.
- [`remote_agent.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`remote_agent.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

The rest of this section assumes that you have an `AgentEngine` instance, named as `remote_agent`.

## Supported operations

An A2A agent hosted on Agent Runtime exposes a set of operations that correspond
directly to the A2A protocol's API endpoints.

- [`on_message_send`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#send_a_message): Sends a new message to the agent to start a task.
- [`on_get_task`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#get_a_task): Retrieves the status and artifacts of an existing task.
- [`on_cancel_task`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#cancel_a_task): Cancels a running task.
- [`handle_authenticated_agent_card`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#retrieve_the_agent_card): Retrieves the agent's full capabilities and skills.

## Retrieve the agent card

Note that Agent Runtime does not serve the public agent card. To retrieve the
authenticated agent card:

### Agent Platform SDK

    response = await remote_agent.handle_authenticated_agent_card()

### A2A Python SDK

    response = await a2a_client.get_card()

### Python requests library

    card_endpoint = f"{a2a_url}/v1/card"
    response = httpx.get(card_endpoint, headers=headers)
    print(json.dumps(response.json(), indent=4))

## Send a message

To send a message:

### Agent Platform SDK

    message_data = {
      "messageId": "remote-agent-message-id",
      "role": "user",
      "parts": [{"kind": "text", "text": "What is the exchange rate from USD to EUR today?"}],
    }

    response = await remote_agent.on_message_send(**message_data)

You can override the timeout used for `on_message_send` by setting the
`timeout` field of `HttpOptions` when creating `vertexai.Client`.

### A2A Python SDK

    from a2a.types import Message, Part, TextPart
    import pprint

    message = Message(
        message_id="remote-agent-message-id",
        role="user",
        parts=[Part(root=TextPart(text="What's the currency rate of USD and EUR"))],
    )

    response_iterator = a2a_client.send_message(message)

    async for chunk in response_iterator:
        pprint.pp(chunk)

### Python requests library

    import httpx
    import json

    endpoint = f"{a2a_url}/v1/message:send"

    payload = {
        "message": {
            "messageId": "remote-agent-message-id",
            "role": "1",
            "content": [{"text": "What is the exchange rate from USD to EUR today?"}],
        },
        "metadata": {"source": "python_script"},
    }

    response = httpx.post(endpoint, json=payload, headers=headers)
    print(json.dumps(response.json(), indent=4))

## Get a task

To get a task and its status

### Agent Platform SDK

    task_data = {
        "id": task_id,
    }

    response = await remote_agent.on_get_task(**task_data)

### A2A Python SDK

    from a2a.types import TaskQueryParams

    task_data ={
        "id":task_id,
    }
    response = await a2a_client.get_task(TaskQueryParams(**task_data))

### Python requests library

    task_end_point = f"{a2a_url}/v1/tasks/{task_id}"
    response = httpx.get(task_end_point, headers=headers)
    print(json.dumps(response.json(), indent=4))

## Cancel a task

To cancel a task:

### Agent Platform SDK

    task_data = {
        "id": task_id,
    }
    response = await remote_agent.on_cancel_task(**task_data)

### A2A Python SDK

    from a2a.types import TaskQueryParams

    task_data = {
        "id":task_id,
    }
    response = await a2a_client.cancel_task(TaskQueryParams(**task_data))

### Python requests library

    task_end_point = f"{a2a_url}/v1/tasks/{task_id}:cancel"
    response = httpx.post(task_end_point, headers=headers)
    print(json.dumps(response.json(), indent=4))

## What's next

- [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent).
- [Evaluate an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation).
- [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
- [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support).
