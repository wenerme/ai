## Before you begin

This tutorial assumes that you have read and followed the instructions in:

- [Create an Agent Development Kit agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent): to create `agent` as an instance of [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp).
- [User authentication](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#authentication) to authenticate as a user for querying the agent.
- [Import and initialize the SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#sdk-import) to initialize the client for getting a deployed instance (if needed).

## Get an instance of an agent

To query an [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp), you need to first
[create a new instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-engine) or
[get an existing instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get).

To get the [`AdkApp`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp) that corresponds to a specific resource ID:

### Agent Platform SDK

Run the following code:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

    adk_app = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.get(name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID")

    print(adk_app)

where

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#project) under which you [create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents,
- `LOCATION` is one of the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations), and
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

When using the Agent Platform SDK, the `adk_app` object corresponds to an
[`AgentEngine`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.AgentEngine) class that contains the following:

- [`adk_app.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `adk_app.operation_schemas()` to return the list of operations that the `adk_app` supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#supported-operations) for details.
- [`adk_app.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`adk_app.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

The rest of this section assumes that you have an `AgentEngine` instance, named as `adk_app`.

## Supported operations

The following operations are supported for `AdkApp`:

- [`async_stream_query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#stream-responses): for streaming a response to a query.

- [`async_create_session`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#create-session): for creating a new session.

- [`async_list_sessions`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#list-sessions): for listing the sessions available.

- [`async_get_session`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#get-session): for retrieving a specific session.

- [`async_delete_session`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#delete-session): for deleting a specific session.

- [`async_add_session_to_memory`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#add-session-to-memory): for generating memories of a session.

- [`async_search_memory`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#search-memory): for retrieving memories.

To list all supported operations:

### Agent Platform SDK

Run the following code:

    adk_app.operation_schemas()

### Python requests library

Run the following code:

    import json

    json.loads(response.content).get("spec").get("classMethods")

### REST API

Represented in `spec.class_methods` from the response to the curl request.

## Manage sessions

`AdkApp` uses cloud-based managed sessions after you deploy the agent to Agent Platform. This section describes how to use managed sessions.

> [!NOTE]
> **Note:** These instructions assume that you didn't [customize your database](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent#customize-database) using `session_service_builder` when developing your agent.

### Create a session

To create a session for a user, use the [`AdkApp.async_create_session`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_create_session) method:

### Agent Platform SDK

    session = await adk_app.async_create_session(user_id="USER_ID")

    print(session)

### Python requests library

Run the following code:

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests
    import json

    def get_identity_token():
      credentials, _ = google_auth.default()
      auth_request = google_requests.Request()
      credentials.refresh(auth_request)
      return credentials.token

    response = requests.post(
      f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query",
      headers={
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": f"Bearer {get_identity_token()}",
      },
      data=json.dumps({
        "class_method": "async_create_session",
        "input": {"user_id": "USER_ID"},
      }),
    )
    print(response.content)

### REST API

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query -d '{"class_method": "async_create_session", "input": {"user_id": "USER_ID"},}'

- <var translate="no">USER_ID</var>: Choose your own user ID with a character limit of 128.
  For example, `user-123`.

The session is created as the dictionary representation of an
[ADK session object](https://google.github.io/adk-docs/sessions/session/#the-session-object).

### List sessions

To list the sessions for a user, use the [`AdkApp.async_list_sessions`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_list_sessions) method:

### Agent Platform SDK

    response = await adk_app.async_list_sessions(user_id="USER_ID"):
    for session in response.sessions:
        print(session)

### Python requests library

Run the following code:

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests
    import json

    def get_identity_token():
      credentials, _ = google_auth.default()
      auth_request = google_requests.Request()
      credentials.refresh(auth_request)
      return credentials.token

    response = requests.post(
      f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query",
      headers={
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": f"Bearer {get_identity_token()}",
      },
      data=json.dumps({
        "class_method": "async_list_sessions",
        "input": {"user_id": "USER_ID"},
      }),
    )
    print(response.content)

### REST API

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query -d '{"class_method": "async_list_sessions", "input": {"user_id": "USER_ID"},}'

where <var translate="no">USER_ID</var> is the user ID you defined. For example, `user-123`.

If any sessions are returned, they use the dictionary form of an
[ADK session object](https://google.github.io/adk-docs/sessions/session/#the-session-object).

### Get a session

To get a specific session, use the [`AdkApp.async_get_session`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_get_session) method:

### Agent Platform SDK

    session = await adk_app.async_get_session(user_id="USER_ID", session_id="SESSION_ID")

    print(session)

### Python requests library

Run the following code:

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests
    import json

    def get_identity_token():
      credentials, _ = google_auth.default()
      auth_request = google_requests.Request()
      credentials.refresh(auth_request)
      return credentials.token

    response = requests.post(
      f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query",
      headers={
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": f"Bearer {get_identity_token()}",
      },
      data=json.dumps({
        "class_method": "async_get_session",
        "input": {"user_id": "USER_ID", "session_id": "SESSION_ID"},
      }),
    )
    print(response.content)

### REST API

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query -d '{"class_method": "async_get_session", "input": {"user_id": "USER_ID", "session_id": "SESSION_ID"},}'

The `session` is the dictionary representation of an
[ADK session object](https://google.github.io/adk-docs/sessions/session/#the-session-object).

### Delete a session

To delete a session, use the [`AdkApp.async_delete_session`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_delete_session) method:

### Agent Platform SDK

    await adk_app.async_delete_session(user_id="USER_ID", session_id="SESSION_ID")

### Python requests library

Run the following code:

    from google import auth as google_auth
    from google.auth.transport import requests as google_requests
    import requests
    import json

    def get_identity_token():
      credentials, _ = google_auth.default()
      auth_request = google_requests.Request()
      credentials.refresh(auth_request)
      return credentials.token

    response = requests.post(
      f"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query",
      headers={
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": f"Bearer {get_identity_token()}",
      },
      data=json.dumps({
        "class_method": "async_delete_session",
        "input": {"user_id": "USER_ID", "session_id": "SESSION_ID"},
      }),
    )
    print(response.content)

### REST API

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:query -d '{"class_method": "async_delete_session", "input": {"user_id": "USER_ID", "session_id": "SESSION_ID"},}'

## Stream a response to a query

To stream responses from an agent in a session, use the [`AdkApp.async_stream_query`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_stream_query) method:

### Agent Platform SDK

    async for event in adk_app.async_stream_query(
        user_id="USER_ID",
        session_id="SESSION_ID",  # Optional
        message="What is the exchange rate from US dollars to SEK today?",
    ):
      print(event)

### Python requests library

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
            "class_method": "async_stream_query",
            "input": {
                "user_id": "USER_ID",
                "session_id": "SESSION_ID",
                "message": "What is the exchange rate from US dollars to SEK today?",
            },
        }),
        stream=True,
    )

### REST API

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:streamQuery?alt=sse -d '{
      "class_method": "async_stream_query",
      "input": {
        "user_id": "USER_ID",
        "session_id": "SESSION_ID",
        "message": "What is the exchange rate from US dollars to SEK today?",
      }
    }'

> [!NOTE]
> **Note:** the `session_id=` argument is optional. If it is not specified, a new session is automatically created and used for serving that query.

If you are using the Agent Platform SDK, you should receive a continuation of
the conversation like the following sequence of dictionaries:

    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'function_call': {'args': {'currency_date': '2025-04-03',
                                                       'currency_from': 'USD',
                                                       'currency_to': 'SEK'},
                                              'id': 'adk-2b9230a6-4b92-4a1b-9a65-b708ff6c68b6',
                                              'name': 'get_exchange_rate'}}],
                 'role': 'model'},
     'id': 'bOPHtzji',
     # ...
    }
    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'function_response': {'id': 'adk-2b9230a6-4b92-4a1b-9a65-b708ff6c68b6',
                                                  'name': 'get_exchange_rate',
                                                  'response': {'amount': 1.0,
                                                               'base': 'USD',
                                                               'date': '2025-04-03',
                                                               'rates': {'SEK': 9.6607}}}}],
                 'role': 'user'},
     'id': '9AoDFmiL',
     # ...
    }
    {'author': 'currency_exchange_agent',
     'content': {'parts': [{'text': 'The exchange rate from USD to SEK on '
                                    '2025-04-03 is 1 USD to 9.6607 SEK.'}],
                 'role': 'model'},
     'id': 'hmle7trT',
     # ...
    }

## Long-running query jobs

For queries that can take a long time to complete (up to seven days), you can run them as long-running jobs. These jobs run asynchronously. You can check the job status and retrieve results later.

> [!NOTE]
> **Note:** You can run long-running jobs only on `reasoningEngine` resources that have been created on April 22, 2026 or later. You cannot update previously created `reasoningEngine` resources to run long-running jobs.

### Deploy an agent for async query

To deploy an agent, follow the general instructions in
[Deploy an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).
For source-based deployment, set the `deploymentSpec.agentFramework` field to
`google-adk`.

If you use a custom API endpoint by building your own container image, you
must add the following environment variables when creating the agent using the SDK:

    "env_vars" = {
        "API_ENDPOINT_PREFIX": "/api/myendpoint"
    }

### Start a long-running query job

As a prerequisite, you must grant the service agent `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com` the `roles/storage.objectCreator` role to the storage bucket for output files.

To start a long-running query job:

### Agent Platform SDK

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
    )

    response = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.AgentEngines.html#vertexai__genai_agent_engines_AgentEngines_run_query_job(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
        config={
            "query": '{"input":{"user_id":"USER_ID", "message":"What is the exchange rate from US dollars to SEK today?"}}',
            "output_gcs_uri": "gs://GCS_BUCKET_NAME/OUTPUT_FILE",
        },
    )
    print(response)

With the SDK, `output_gcs_uri` can be a directory or a filename. If it is a filename, the system uses this file to store the response. If it is a directory, the system automatically generates a file for the response. In both cases, the input query is stored in the same directory with the same filename prefix as the output file.

### REST

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:asyncQuery -d \
    '{
      "input_gcs_uri": "gs://GCS_BUCKET_NAME/INPUT_FILE",
      "output_gcs_uri": "gs://GCS_BUCKET_NAME/OUTPUT_FILE"
    }'

For the REST API call, the `input_gcs_uri` field must point to a file that contains
the query. The content of the file must be a JSON object with an `input` field
that matches the `input` field of `QueryReasoningEngineRequest` (such as
`{ "input": { "user_id": "hello", "message":"$QUERY"} }`). If this input file is in a
different bucket from the output location, you must also grant the service agent
`service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`
the `roles/storage.objectReader` role to the storage bucket where the input
files are located.

The `output_gcs_uri` must be a filename.

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

### Cancel a long-running query job

To cancel a long-running query job, you must have the LRO resource name that is
returned from the long-running query job.

### Agent Platform SDK

    response = client.agent_engines.cancel_query_job(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
        operation_name="projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
    )

### REST

    curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID:cancelAsyncQuery -d \
    '{
      "name": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
      "operation_name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID"
    }'

## Manage memories

`AdkApp` uses [Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank)
if you include a `PreloadMemoryTool` in [the agent definition](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent#manage-memories)
and deploy the agent to Agent Platform. This section
describes how to use generate and retrieve memories from the agent through
the default implementation of the
[ADK memory service](https://google.github.io/adk-docs/sessions/memory/#vertex-ai-memory-bank).

### Add session to memory

To retain memory of meaningful information in a session (that can be used in future
sessions), use the [`async_add_session_to_memory`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_add_session_to_memory) method:

### Agent Platform SDK

    await adk_app.async_add_session_to_memory(session="SESSION_DICT")

where `SESSION_DICT` is the dictionary form of an
[ADK session object](https://google.github.io/adk-docs/sessions/session/#the-session-object).

### Search for memories

To search through the memories of the agent, you can use the
[`async_search_memory`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.agent_engines.AdkApp#vertexai_agent_engines_AdkApp_async_search_memory) method:

### Agent Platform SDK

    response = await adk_app.async_search_memory(
        user_id="USER_ID",
        query="QUERY",
    )
    print(response)

where

- `USER_ID` is the scope for relevant memories.
- `QUERY` is the query for which to perform similarity search.

## What's next

- [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent).
- [Evaluate an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation).
- [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
- [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support).
