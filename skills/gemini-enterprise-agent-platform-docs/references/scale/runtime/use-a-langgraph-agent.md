## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Create a LangGraph agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent): to create `agent` as an instance of [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent).
- [User authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) to authenticate as a user for querying the agent.
- [Import and initialize the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#sdk-import) to initialize the client for getting a deployed instance (if needed).

## Get an instance of an agent

To query a [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent), you need to first
[create a new instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-engine) or
[get an existing instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get).

To get the [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent) that corresponds to a specific resource ID:

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

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#project) under which you [create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents, and
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

- [`agent.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `agent.operation_schemas()` to return the list of operations that the agent supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#supported-operations) for details.
- [`agent.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`agent.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

The rest of this section assumes that you have an `AgentEngine` instance, named as `agent`.

## Supported operations

The following operations are supported for [`LanggraphAgent`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent):

- [`query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent#vertexai_agent_engines_LanggraphAgent_query): for getting a response to a query synchronously.
- [`stream_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#stream-modes): for streaming a response to a query.
- [`get_state`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#human-in-the-loop-time-travel): for getting a specific checkpoint.
- [`get_state_history`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#human-in-the-loop-history): for listing the checkpoints of a thread.
- [`update_state`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#human-in-the-loop-branch): for creating branches corresponding to different scenarios.

## Stream a response to a query

To stream a response, use the [`LanggraphAgent.stream_query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent#vertexai_agent_engines_LanggraphAgent_stream_query) method.

LangGraph supports multiple streaming modes. The main ones are:

- `values`: This mode streams the full state of the graph after each node is called.
- `updates`: This mode streams updates to the state of the graph after each node is called.

To stream back `values` (corresponding to the full state of the graph):

    for state_values in agent.stream_query(
        input=inputs,
        stream_mode="values",
        config={"configurable": {"thread_id": "streaming-thread-values"}},
    ):
        print(state_values)

To stream back `updates` (corresponding to updates to the graph state):

    for state_updates in agent.stream_query(
        input=inputs,
        stream_mode="updates",
        config={"configurable": {"thread_id": "streaming-thread-updates"}},
    ):
        print(state_updates)

## Human in the loop

In LangGraph, a common aspect of human-in-the-loop is to add breakpoints to
interrupt the sequence of actions by the agent, and have a human resume the flow
at a later point in time.

> [!NOTE]
> **Note:** This step assumes that you are using an agent that is set up to [store checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent#store-checkpoints).

### Review

You can set breakpoints using the `interrupt_before=` or `interrupt_after=`
arguments when calling `.query` or [`.stream_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#stream-modes):

    from langchain.load import load as langchain_load

    response = agent.query(
        input=inputs,
        interrupt_before=["tools"], # after generating the function call, before invoking the function
        interrupt_after=["tools"], # after getting a function response, before moving on
        config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
    )

    langchain_load(response['messages'][-1]).pretty_print()

The output will look similar to the following:

    ================================== Ai Message ==================================
    Tool Calls:
      get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
     Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
      Args:
        currency_from: USD
        currency_to: SEK

### Approval

To approve the generated tool call and resume with the rest of the execution,
you pass in `None` to the input, and specifying the thread or checkpoint inside
the `config`:

    from langchain.load import load as langchain_load

    response = agent.query(
        input=None,  # Continue with the function call
        interrupt_before=["tools"], # after generating the function call, before invoking the function
        interrupt_after=["tools"], # after getting a function response, before moving on
        config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
    )

    langchain_load(response['messages'][-1]).pretty_print()

The output will look similar to the following:

    ================================= Tool Message =================================
    Name: get_exchange_rate

    {"amount": 1.0, "base": "USD", "date": "2024-11-14", "rates": {"SEK": 11.0159}}

### History

To list all the checkpoints of a given thread, use the [`LanggraphAgent.get_state_history`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent#vertexai_agent_engines_LanggraphAgent_get_state_history) method:

    for state_snapshot in agent.get_state_history(
        config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
    ):
        if state_snapshot["metadata"]["step"] >= 0:
            print(f'step {state_snapshot["metadata"]["step"]}: {state_snapshot["config"]}')
            state_snapshot["values"]["messages"][-1].pretty_print()
            print("\n")

The response will be similar to the following sequence of outputs:

    step 3: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-ded5-67e0-8003-2d34e04507f5'}}
    ================================== Ai Message ==================================

    The exchange rate from US dollars to Swedish krona is 1 USD to 11.0159 SEK.

    step 2: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-d189-6a77-8002-5dbe79e2ce58'}}
    ================================= Tool Message =================================
    Name: get_exchange_rate

    {"amount": 1.0, "base": "USD", "date": "2024-11-14", "rates": {"SEK": 11.0159}}

    step 1: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}
    ================================== Ai Message ==================================
    Tool Calls:
      get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
     Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
      Args:
        currency_from: USD
        currency_to: SEK

    step 0: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-c2e4-6f3c-8000-477fd654cb53'}}
    ================================ Human Message =================================

    What is the exchange rate from US dollars to Swedish currency?

#### Get the configuration of a step

To get an earlier checkpoint, specify the `checkpoint_id` (and
`checkpoint_ns`). First, rewind to step 1, when the tool call was generated:

    snapshot_config = {}
    for state_snapshot in agent.get_state_history(
        config={"configurable": {"thread_id": "human-in-the-loop-deepdive"}},
    ):
        if state_snapshot["metadata"]["step"] == 1:
            snapshot_config = state_snapshot["config"]
            break

    print(snapshot_config)

The output will look similar to the following:

    {'configurable': {'thread_id': 'human-in-the-loop-deepdive',
      'checkpoint_ns': '',
      'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}

### Time travel

To get a checkpoint, use the [`LanggraphAgent.get_state`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent#vertexai_agent_engines_LanggraphAgent_get_state_history) method:

    # By default, it gets the latest state [unless (checkpoint_ns, checkpoint_id) is specified]
    state = agent.get_state(config={"configurable": {
        "thread_id": "human-in-the-loop-deepdive",
    }})

    print(f'step {state["metadata"]["step"]}: {state["config"]}')
    state["values"]["messages"][-1].pretty_print()

By default it gets the latest checkpoint (by timestamp). The output will look
similar to the following:

    step 3: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-ded5-67e0-8003-2d34e04507f5'}}
    ================================== Ai Message ==================================

    The exchange rate from US dollars to Swedish krona is 1 USD to 11.0159 SEK.

#### Get the checkpoint of a configuration

For a given configuration (e.g. `snapshot_config` from the [configuration of a step](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#get-step-configuration)),
you can get the corresponding checkpoint:

    state = agent.get_state(config=snapshot_config)
    print(f'step {state["metadata"]["step"]}: {state["config"]}')
    state["values"]["messages"][-1].pretty_print()

The output will look similar to the following:

    step 1: {'configurable': {'thread_id': 'human-in-the-loop-deepdive', 'checkpoint_ns': '', 'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}
    ================================== Ai Message ==================================
    Tool Calls:
      get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
     Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
      Args:
        currency_from: USD
        currency_to: SEK

### Replay

To replay from a given state, pass the state configuration (i.e. `state["config"]`)
to the agent. The state configuration is a dict that looks like the following:

    {'configurable': {'thread_id': 'human-in-the-loop-deepdive',
      'checkpoint_ns': '',
      'checkpoint_id': '1efa2e95-cc7f-6d68-8001-1f6b5e57c456'}}

To replay from `state["config"]` (where a tool call was generated), specify
`None` in the input:

    from langchain.load import load as langchain_load

    for state_values in agent.stream_query(
        input=None, # resume
        stream_mode="values",
        config=state["config"],
    ):
        langchain_load(state_values["messages"][-1]).pretty_print()

It will result in something similar to the following sequence of outputs:

    ================================== Ai Message ==================================
    Tool Calls:
      get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
     Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
      Args:
        currency_from: USD
        currency_to: SEK

    ================================= Tool Message =================================
    Name: get_exchange_rate

    {"amount": 1.0, "base": "USD", "date": "2024-11-14", "rates": {"SEK": 11.0159}}

    ================================== Ai Message ==================================

    The exchange rate from US dollars to Swedish krona is 1 USD to 11.0159 SEK.

### Branching

You can branch off previous checkpoints to try alternate scenarios by using the
[`LanggraphAgent.update_state`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.LanggraphAgent#vertexai_agent_engines_LanggraphAgent_update_state) method:

    branch_config = agent.update_state(
        config=state["config"],
        values={"messages": [last_message]}, # the update we want to make
    )

    print(branch_config)

The output will look similar to the following:

    {'configurable': {'thread_id': 'human-in-the-loop-deepdive',
      'checkpoint_ns': '',
      'checkpoint_id': '1efa2e96-0560-62ce-8002-d1bb48a337bc'}}

> [!NOTE]
> **Note:** `branch_config` has a different checkpoint_id from `state["config"]` due to `.update_state`

We can query the agent with `branch_config` to resume from the checkpoint with
the updated state:

    from langchain.load import load as langchain_load

    for state_values in agent.stream_query(
        input=None, # resume
        stream_mode="values",
        config=branch_config,
    ):
        langchain_load(state_values["messages"][-1]).pretty_print()

It will result in something similar to the following sequence of outputs:

    ================================== Ai Message ==================================
    Tool Calls:
      get_exchange_rate (12610c50-4465-4296-b1f3-d751ec959fd5)
     Call ID: 12610c50-4465-4296-b1f3-d751ec959fd5
      Args:
        currency_date: 2024-09-01
        currency_from: USD
        currency_to: SEK

    ================================= Tool Message =================================
    Name: get_exchange_rate

    {"amount": 1.0, "base": "USD", "date": "2024-08-30", "rates": {"SEK": 10.2241}}

    ================================== Ai Message ==================================

    The exchange rate from US dollars to Swedish krona on 2024-08-30 was 1 USD to 10.2241 SEK.

## What's next

- [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent).
- [Evaluate an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation).
- [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
- [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support).
