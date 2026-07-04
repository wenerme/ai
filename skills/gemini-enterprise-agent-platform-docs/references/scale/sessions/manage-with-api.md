This section describes how to use Agent Platform Sessions
to manage sessions using the Google Cloud console or direct API calls. You can use
the Google Cloud console or direct API calls if you don't want to use an ADK agent
to manage sessions.

To manage sessions using the ADK agent, see [Manage sessions with Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-adk).

## Create an Agent Runtime instance

To access Agent Platform Sessions, you first need use an Agent Runtime instance. You don't need to deploy any code to start using Sessions. If you've used Agent Engine before, creating an Agent Runtime instance only takes a few seconds without code deployment. It may take longer if this is the first time you're using Agent Engine.

If you don't have an existing Agent Runtime instance, create one using the following code:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
      project="PROJECT_ID",
      location="LOCATION"
    )
    # If you don't have an Agent Engine instance already, create an instance.
    agent_engine = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.create()

    # Optionally, print out the Agent Engine resource name. You will need the
    # resource name to interact with Sessions later on.
    print(https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.AgentRunConfigDict.html#vertexai__genai_types_AgentRunConfigDict_agent_engine.api_resource.name)

Replace the following:

- <var translate="no">PROJECT_ID</var>: Your project ID.
- <var translate="no">LOCATION</var>: Your region. See the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations) for Sessions.

## List sessions

List sessions associated with your Agent Runtime instance.

### Console

For deployed agents, you can use the Google Cloud console to list sessions associated
with your agent:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Engine instances that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your Agent Engine instance.

3. Click the **Sessions** tab. A list of sessions displays by ID.

### Python

    for session in client.agent_engines.sessions.list(
        name=agent_engine.api_resource.name,  # Required
    ):
        print(session)

    # To list sessions for a specific user:
    for session in client.agent_engines.sessions.list(
        name=agent_engine.api_resource.name,  # Required
        config={"filter": "user_id=USER_ID"},
    ):
        print(session)

- <var translate="no">USER_ID</var>: Choose your own user ID with a character limit of 128. For example, `user-123`.

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where you created your Agent Engine instance.
- <var class="edit" scope="AGENT_ENGINE_ID" translate="no">AGENT_ENGINE_ID</var>: The resource ID of your Agent Engine instance.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions" | Select-Object -Expand Content
```

You should see a list of sessions returned.

Optionally, to list sessions for a specific user, you can add the query parameter `?filter=user_id=\"USER_ID\"`, where <var translate="no">USER_ID</var> is the ID of the user you want to query.

## Create a session

Create a session associated with a user ID.

### Console

For deployed agents, you can use the Google Cloud console to create sessions:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Engine instances that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your Agent Engine instance.

3. Click the **Playground** tab.

4. Click **New session** to create a new session.

### Python

    session = client.agent_engines.sessions.create(
        name=agent_engine.api_resource.name,  # Required
        user_id=USER_ID, # Required
        session_id=SESSION_ID,
    )

where <var translate="no">USER_ID</var> is the user ID you defined. For example,
`user-123`.

For <var translate="no">SESSION_ID</var>, consider the following restrictions to prevent
collisions with system-generated IDs:

- If the first character is a letter, the ID can be up to 63 characters long. Valid characters are lower-case letters, numbers, and hyphens (`[a-z0-9-]`). The last character must be a letter or number
- If the first character is a number, the ID can be up to 9 characters long. Valid characters are numbers (`[0-9]`) with no leading zeros.

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where you created your Agent Engine instance.
- <var class="edit" scope="AGENT_ENGINE_ID" translate="no">AGENT_ENGINE_ID</var>: The resource ID of your Agent Engine instance.
- <var class="edit" scope="USER_ID" translate="no">USER_ID</var>: the user ID you defined. For example, `sessions-agent`.
- <var class="edit" scope="SESSION_ID" translate="no">SESSION_ID</var>: the session ID you defined. For example, `my-custom-session`.

  To prevent collisions with system-generated
  IDs, follow these restrictions when you specify a custom session ID:
  - If the first character is a letter, the ID can be up to 63 characters long. Valid characters are lower-case letters, numbers, and hyphens (\`\[a-z0-9-\]\`). The last character must be a letter or number.
  - If the first character is a number, the ID can be up to 9 characters long. Valid characters are numbers (\`\[0-9\]\`) with no leading zeros.

  HTTP method and URL:

  ```
  POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions
  ```

  Request JSON body:

  ```
  {
    "userId": USER_ID
  }

  ```

  To send your request, choose one of these options:

  #### curl

  > [!NOTE]
  > **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

  Save the request body in a file named `request.json`,
  and execute the following command:

  ```
  curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json; charset=utf-8" \
       -d @request.json \
       "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions"
  ```

  #### PowerShell

  > [!NOTE]
  > **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

  Save the request body in a file named `request.json`,
  and execute the following command:

  ```
  $cred = gcloud auth print-access-token
  $headers = @{ "Authorization" = "Bearer $cred" }

  Invoke-WebRequest `
      -Method POST `
      -Headers $headers `
      -ContentType: "application/json; charset=utf-8" `
      -InFile request.json `
      -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions" | Select-Object -Expand Content
  ```

  You should receive a long-running operation that you can query to check the creation status of your session.

### Configure session time to live (TTL)

All sessions must have an expiration time. You can define this expiration time when creating or updating a session. The session and its child events are automatically deleted after the expiration time elapses. You can either set the expiration time (`expire_time`) directly or set the time to live (`ttl`) in seconds. If neither is specified, the system applies a default TTL of 365 days.

### Time to live

If you set the time to live, the server calculates the expiration time as `create_time + ttl` for newly created sessions or `update_time + ttl` for updated sessions.

    client.agent_engines.sessions.create(
        name=agent_engine.api_resource.name,  # Required
        user_id=USER_ID, # Required
        config={
            # Session will be deleted 10 days after creation time.
            "ttl": f"{24 * 60 * 60 * 10}s"
        }
    )

### Expiration time

    import datetime

    client.agent_engines.sessions.create(
        name=agent_engine.api_resource.name,  # Required
        user_id=USER_ID, # Required
        config={
            # Session will be deleted at the provided time (10 days after current time).
            "expire_time": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(seconds=24 * 60 * 60 * 10),
        }
    )

## Get a session

Get a specific session associated with your Agent Platform instance.

### Console

For deployed agents, you can use the Google Cloud console to create sessions:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Engine instances that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your Agent Engine instance.

3. Click the **Playground** tab.

4. Click the **Sessions** tab. A list of sessions displays by ID.

5. Click the session you want to view in more detail.

### Python

    session = client.agent_engines.sessions.get(
        name='projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID',  # Required
        user_id=USER_ID, # Required
    )
    # session.name will correspond to
    #   'projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID'

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where you created your Agent Engine instance.
- <var class="edit" scope="AGENT_ENGINE_ID" translate="no">AGENT_ENGINE_ID</var>: The resource ID of your Agent Engine instance.
- <var class="edit" scope="SESSION_ID" translate="no">SESSION_ID</var>: The resource ID of the session you want to retrieve. You can get the session ID from the response you received when you created the session.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID" | Select-Object -Expand Content
```

In the response, you should see information about your session.

## Delete a session

Delete a session associated with your Agent Platform instance.

### Console

For deployed agents, you can use the Google Cloud console to delete sessions associated
with your agent:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Engine instances that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your Agent Engine instance.

3. Click the **Sessions** tab. A list of sessions displays by ID.

4. Click the **more actions** menu () of the session you want to delete.

5. Click **Delete**.

6. Click **Delete session**.

### Python

    client.agent_engines.sessions.delete(name=session.name)

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where you want to create the Example Store instance.
- <var class="edit" scope="AGENT_ENGINE_ID" translate="no">AGENT_ENGINE_ID</var>: The resource ID of your Agent Engine instance.
- <var class="edit" scope="SESSION_ID" translate="no">SESSION_ID</var>: The resource ID of the session you want to retrieve.

HTTP method and URL:

```
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method DELETE `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## List events in a session

List events in a session associated with your
Agent Platform instance.

### Console

For deployed agents, you can use the Google Cloud console to create sessions:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Engine instances that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your Agent Engine instance.

3. Click the **Playground** tab.

4. Click the **Sessions** tab. A list of sessions displays by ID.

5. Click the session you want to view in more detail.

6. Click the **Events** tab to view the events associated with the session.

### Python

    for session_event in client.agent_engines.list_session_events(
        name=session.name,
    ):
        print(session_event)

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where you created your Agent Engine instance.
- <var class="edit" scope="AGENT_ENGINE_ID" translate="no">AGENT_ENGINE_ID</var>: The resource ID of your Agent Engine instance.
- <var class="edit" scope="SESSION_ID" translate="no">SESSION_ID</var>: The resource ID of the session you want to retrieve.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID/events
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID/events"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions/SESSION_ID/events" | Select-Object -Expand Content
```

In the response, you should see a list of events associated with your session.

## Append an event to a session

Append an event to a session associated with an
Agent Platform instance.

### Console

For deployed agents, you can use the Google Cloud console to create sessions:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Engine instances that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your Agent Engine instance.

3. Click the **Playground** tab.

4. Click the **Sessions** tab. A list of sessions displays by ID.

5. Click the session you want to view in more detail.

6. Click the **Events** tab to view the events associated with the session.

7. **Type a message** and press <kbd>Enter</kbd> to add a new event to the session.

### Python

    import datetime

    client.agent_engines.sessions.events.append(
        name=session.name,
        author="user",                                              # Required.
        invocation_id="1",                                          # Required.
        timestamp=datetime.datetime.now(tz=datetime.timezone.utc),  # Required.
        config={
            "content": {
                "role": "user",
                "parts": [{"text": "hello"}]
            },
        },
    )

Alternatively, you can use the `raw_event` field to include arbitrary
data in session events. This is useful for interoperability with other agent
frameworks or for storing custom event data.

    client.agent_engines.sessions.events.append(
        name=session.name,
        author="user",                                              # Required.
        invocation_id="1",                                          # Required.
        timestamp=datetime.datetime.now(tz=datetime.timezone.utc),  # Required.
        config={
            "raw_event": {
                "content": "hello",
                "custom_field": "custom_value"
            },
        },
    )

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your project ID.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where you created your Agent Engine instance.
- <var class="edit" scope="AGENT_ENGINE_ID" translate="no">AGENT_ENGINE_ID</var>: The resource ID of your Agent Engine instance.
- <var class="edit" scope="USER_ID" translate="no">USER_ID</var>: the user ID you defined. For example, `sessions-agent`.
- <var class="edit" scope="SESSION_ID" translate="no">SESSION_ID</var>: the session ID you defined. For example, `my-custom-session`.

  To prevent collisions with system-generated
  IDs, follow these restrictions when you specify a custom session ID:
  - If the first character is a letter, the ID can be up to 63 characters long. Valid characters are lower-case letters, numbers, and hyphens (\`\[a-z0-9-\]\`). The last character must be a letter or number.
  - If the first character is a number, the ID can be up to 9 characters long. Valid characters are numbers (\`\[0-9\]\`) with no leading zeros.

  HTTP method and URL:

  ```
  POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions
  ```

  Request JSON body:

  ```
  {
    "userId": USER_ID
  }

  ```

  To send your request, choose one of these options:

  #### curl

  > [!NOTE]
  > **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

  Save the request body in a file named `request.json`,
  and execute the following command:

  ```
  curl -X POST \
       -H "Authorization: Bearer $(gcloud auth print-access-token)" \
       -H "Content-Type: application/json; charset=utf-8" \
       -d @request.json \
       "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions"
  ```

  #### PowerShell

  > [!NOTE]
  > **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

  Save the request body in a file named `request.json`,
  and execute the following command:

  ```
  $cred = gcloud auth print-access-token
  $headers = @{ "Authorization" = "Bearer $cred" }

  Invoke-WebRequest `
      -Method POST `
      -Headers $headers `
      -ContentType: "application/json; charset=utf-8" `
      -InFile request.json `
      -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID/sessions" | Select-Object -Expand Content
  ```

  You should receive a long-running operation that you can query to check the creation status of your session.

## Clean up

To clean up all resources used in this project, you can delete the Agent Platform instance along with its child resources:

    agent_engine.delete(force=True)
