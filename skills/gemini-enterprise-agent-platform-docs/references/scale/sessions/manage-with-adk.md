This page describes how you can connect an Agent Development Kit (ADK) agent with Agent Platform Sessions and use managed sessions in the local and production environment.

> [!NOTE]
> **Note:** If you've already followed the instructions in [Develop an Agent Development Kit agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent), you don't need to follow this guide, since the `AdkApp` template is already connected to Agent Platform Sessions through `session_service`.

> [!IMPORTANT]
> **Important:** ADK primarily uses [asynchronous functions](https://google.github.io/adk-docs/runtime/#async-is-primary-run_async). If you're running code in a notebook like Colab, you can directly `await` async functions because an event loop is already running. If you're running this code as a standard Python script, you need to wrap your async function calls with `asyncio.run()` to create and manage an event loop to execute your async functions. Otherwise, you might get an error like `'await' outside function`.

## Before you begin

These instructions use the following basic project file structure for
defining an ADK agent and its supporting runner and deployment code:

    my_agent/
        agent.py      # main agent code
        runner.py     # code for interacting with the agent
        deploy.py     # code for deploying the agent to Google Cloud

Make sure your environment is set up by following
the [Get the required roles](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#get_the_required_roles) and [Authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) steps in [Set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup).

## Set environment variables

To use the ADK, set your environment variables:

    import os

    os.environ["GOOGLE_GENAI_USE_ENTERPRISE"] = "TRUE"
    os.environ["GOOGLE_CLOUD_PROJECT"] = "PROJECT_ID"
    os.environ["GOOGLE_CLOUD_LOCATION"] = "LOCATION"

Replace the following:

- <var translate="no">PROJECT_ID</var>: Your project ID.
- <var translate="no">LOCATION</var>: Your region. See the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations) for Memory Bank.

## Create a Vertex AI Agent Engine instance

To access Agent Platform Sessions, you first need use an Vertex AI Agent Engine instance. You don't need to deploy any code to start using Sessions. If you've used Agent Engine before, creating a Vertex AI Agent Engine instance only takes a few seconds without code deployment. It may take longer if this is the first time you're using Agent Engine.

### Google Cloud Project

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
      project="PROJECT_ID",
      location="LOCATION"
    )

    # If you don't have an Agent Engine instance already, create an instance.
    agent_engine = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.create(
        config={
          "display_name": "My Session Store",
        }
    )

    # Print the agent engine ID, you will need it in the later steps to initialize
    # the ADK `VertexAiSessionService`.
    print(https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.AgentRunConfigDict.html#vertexai__genai_types_AgentRunConfigDict_agent_engine.api_resource.name.split("/")[-1])

Replace the following:

- <var translate="no">PROJECT_ID</var>: Your project ID.

- <var translate="no">LOCATION</var>: Your region. See the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations) for Sessions.

> [!TIP]
> **Tip:** Always set a display name, so you can distinguish between difference resource instances in the project.

## Develop your ADK agent

> [!NOTE]
> **Note:** Make sure you have installed ADK version **1.0.0** or later. This version is included in `google-cloud-aiplatform[adk,agent_engine]`.

To create your ADK agent, follow the instructions in [Agent Development Kit](https://google.github.io/adk-docs/), or use the following code to create an agent that greets a user with fixed greetings. Save this code in a file named `agent.py`.

    # file: my_agent/agent.py
    from google import adk

    def greetings(query: str):
      """Tool to greet user."""
      if 'hello' in query.lower():
        return {"greeting": "Hello, world"}
      else:
        return {"greeting": "Goodbye, world"}

    # Define an ADK agent
    root_agent = adk.Agent(
        model="gemini-2.0-flash",
        name='my_agent',
        instruction="You are an Agent that greet users, always use greetings tool to respond.",
        tools=[greetings]
    )

## Set up the ADK runner

The [ADK Runtime](https://google.github.io/adk-docs/runtime/) orchestrates the execution of your agents, tools, and callbacks, and orchestrates calls to read and write sessions. Initialize the Runner with [`VertexAiSessionService`](https://google.github.io/adk-docs/sessions/session/#sessionservice-implementations), which connects with Agent Platform Sessions. Save this code in a file named `runner.py`.

### Google Cloud Project

    # file: my_agent/runner.py
    import agent # Import from your agent.py
    from google.adk import Runner
    from google.adk.sessions import VertexAiSessionService
    from google.genai import types

    app_name="APP_NAME"
    user_id="USER_ID"

    # Create the ADK runner with VertexAiSessionService
    session_service = VertexAiSessionService(
          project="PROJECT_ID",
          location="LOCATION",
          agent_engine_id="AGENT_ENGINE_ID"
    )
    runner = Runner(
        agent=agent.root_agent,
        app_name=app_name,
        session_service=session_service)

    # Helper method to send query to the runner
    async def call_agent(query, session_id, user_id):
      content = types.Content(role='user', parts=[types.Part(text=query)])
      async for event in runner.run_async(
          user_id=user_id, session_id=session_id, new_message=content):
          if event.is_final_response():
              final_response = event.content.parts[0].text
              print("Agent Response: ", final_response)

Replace the following:

- <var translate="no">APP_NAME</var>: The name of your agent application.

- <var translate="no">USER_ID</var>: Choose your own user ID with a character limit of 128.
  For example, `user-123`.

- <var translate="no">AGENT_ENGINE_ID</var>: The resource ID of a Vertex AI Agent Engine instance.

- For deployed agents, the resource ID is listed as the `GOOGLE_CLOUD_AGENT_ENGINE_ID` environment variable

- For local agents, you can retrieve the resource ID using `agent_engine.api_resource.name.split("/")[-1]`.

## Interact with your agent

After defining your agent and setting up Agent Platform Sessions, you can interact with your agent to check that the session history and states persist.

### ADK UI

To test your agent with the ADK user interface and connect to Agent Platform Sessions, run the `adk web` command in your terminal.

While `adk web` typically reads environment variables from a `.env` file, it ignores this file when you use the
`--session_service_uri` flag. Instead, you must set the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` environment
variables in your terminal session before running the command.

    export GOOGLE_CLOUD_PROJECT="PROJECT_ID"
    export GOOGLE_CLOUD_LOCATION="LOCATION"
    adk web --session_service_uri=agentengine://AGENT_ENGINE_ID

    # Sample output
    +---+
    | ADK Web Server started                                                      |
    |                                                                             |
    | For local testing, access at http://localhost:8000.                         |
    +---+

    INFO:     Application startup complete.
    INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)

![ADK UI](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/adk-ui.png)

### Python

Use ADK Python code to manage sessions and states. Add the following code to the end of your `runner.py` file to interact with the agent.

The following snippets contain top-level `await` calls for brevity. To run this code as a Python script, place the snippets inside an `async` function and use `asyncio.run()` to execute it, as shown in this example:

    import asyncio

    async def main():
      # Place one or more snippets here.
      # For example:
      session = await session_service.create_session(
             app_name=app_name,
             user_id=user_id)

      await call_agent("Hello!", session.id, user_id)

    asyncio.run(main())

### Create a session and query the agent

Use the following code to create a session and send a query to your agent.
Specify a custom session ID to organize sessions using your own naming scheme
or to quickly transition from other services. If you don't specify a session
ID, Agent Platform automatically generates one.

    # file: my_agent/runner.py
    # Create a session
    session = await session_service.create_session(
           app_name=app_name,
           user_id=user_id,
           session_id=session_id)

    await call_agent("Hello!", session.id, user_id)
    # Agent response: "Hello, world"

    await call_agent("Thanks!", session.id, user_id)
    # Agent response: "Goodbye, world"

For custom session IDs, consider the following restrictions to prevent
collisions with system-generated IDs:

- If the first character is a letter, the ID can be up to 63 characters long. Valid characters are lower-case letters, numbers, and hyphens (`[a-z0-9-]`). The last character must be a letter or number.
- If the first character is a number, the ID can be up to 9 characters long. Valid characters are numbers (`[0-9]`) with no leading zeros.

After the session is created and passed to the runner, ADK uses the session to
store events from the current interaction. You can also resume a previous
session by providing the ID for that session.

#### Configure session time to live (TTL)

All sessions must have an expiration time. You can define this expiration time when creating or updating a session. The session and its child events are automatically deleted after the expiration time elapses. You can either set the expiration time (`expire_time`) directly or set the time to live (`ttl`) in seconds. If neither is specified, the system applies a default TTL of 365 days.

> [!NOTE]
> **Note:** This document focuses on ADK `VertexAiSessionService`. Other ADK session services may not have support for TTL.

### Time to live

If you set the time to live, the server calculates the expiration time as `create_time + ttl` for newly created sessions or `update_time + ttl` for updated sessions.

      session = await session_service.create_session(
            app_name=app_name,
            user_id=user_id,
            # Session will be deleted 10 days after creation time.
            ttl=f"{24 * 60 * 60 * 10}s"
      )
      ```

### Expiration time

      import datetime

      expire_time = datetime.datetime.now(
            tz=datetime.timezone.utc) + datetime.timedelta(seconds=24 * 60 * 60 * 10)

      session = await session_service.create_session(
            app_name=app_name,
            user_id=user_id,
            # Session will be deleted at the provided time (10 days after current time).
            expire_time=expire_time.isoformat()
      )

### List existing sessions

List all existing sessions associated with a given user ID.

    # List sessions
    sessions = await session_service.list_sessions(app_name=app_name,user_id=user_id)
    print(sessions)
    # ListSessionsResponse(session_ids=['1122334455', '9988776655'])

### Manage session states

States hold information that the agent needs for a conversation. You can provide an initial state as a dictionary when you create a session:

    # Create a session with state
    session = await session_service.create_session(
        app_name=app_name,
        user_id=user_id,
        state={'key': 'value'})

    print(session.state['key'])
    # value

To update the session state outside the runner, append a new event to the session using `state_delta`:

    # file: my_agent/runner.py
    from google.adk.events import Event, EventActions
    import time

    # Define state changes
    state_changes = {'key': 'new_value'}

    # Create event with actions
    actions_with_update = EventActions(state_delta=state_changes)
    system_event = Event(
    invocation_id="invocation_id",
    author="system", # Or 'agent', 'tool' etc.
    actions=actions_with_update,
    timestamp=time.time()
    )

    # Append the event
    await session_service.append_event(session, system_event)

    # Check updated state
    updated_session = await session_service.get_session(
        app_name=app_name,
        user_id=user_id,
        session_id=session.id)
    # State is updated to new value
    print(updated_session.state['key'])
    # new_value

### Custom fields for events

The ADK supports a flexible event schema so that you can include arbitrary
data in session events. This is useful for interoperability
with other agent frameworks or for storing custom event data.

When you append an event with custom fields, the ADK serializes the event data
into the `raw_event` field of the stored session event.

    # Create an event with custom fields
    custom_event = Event(
      invocation_id="invocation_id",
      author="user",
      timestamp=time.time(),
      custom_field="custom_value",
      another_field={"nested_key": "nested_value"}
    )

    # Append the event
    await session_service.append_event(session, custom_event)

When you retrieve the session, the retrieved events retain these custom fields.

### Delete a session

Delete a specific session associated with a user ID:

    await session_service.delete_session(app_name=app_name, user_id=user_id, session_id=session.id)

## Deploy your agent to Agent Platform

After you test your agent locally, you can deploy the agent to production by updating the Agent Platform instance with parameters:

### Google Cloud Project

    client.agent_engines.update(
        resource_name=agent_engine.api_resource.name,
        agent=AGENT,
        config={
          "display_name": DISPLAY_NAME,      # Optional.
          "requirements": REQUIREMENTS,      # Optional.
          "staging_bucket": STAGING_BUCKET,  # Required.
        },
    )

Replace the following:

- <var translate="no">AGENT</var>: The application that implements the `query / stream_query` method (for example, `AdkApp` for an ADK agent).

- <var translate="no">DISPLAY_NAME</var>: A user-friendly name for your agent.

- <var translate="no">REQUIREMENTS</var>: A list of pip packages required by your agent. For example, `["google-cloud-storage", "google-cloud-aiplatform[agent_engines,adk]"]`.

- <var translate="no">STAGING_BUCKET</var>: A Cloud Storage bucket prefixed by `gs://`.

## Clean up

To clean up all resources used in this project, you can delete the Vertex AI Agent Engine instance along with its child resources:

    agent_engine.delete(force=True)

## What's next

- [Manage sessions using API calls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-api).
