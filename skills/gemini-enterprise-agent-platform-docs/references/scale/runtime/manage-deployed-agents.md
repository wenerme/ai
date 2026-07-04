Agent Runtime lets you manage agents that have been deployed to the platform. You can list, get, update, and delete deployed agents using the console, SDK, or REST API.

This document explains how to manage deployed agents on Agent Platform.
If you want to deploy a new agent, see
[Deploy an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).

## List deployed agents

List all deployed agents for a given project and location:

### Console

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

Deployed agents that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.

### Agent Platform SDK

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

    for agent in client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.list():
        print(agent)

To filter the list of by `display_name`:

    for agent in client.agent_engines.list(
        config={
            "filter": 'display_name="DISPLAY_NAME"',
        },
    ):
        print(agent)

### REST

Call the [`reasoningEngines.list`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines/list) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## Get a deployed agent

Each deployed agent has a unique `RESOURCE_ID` identifier.
To learn more, see [Deploy an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).

### Console

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Deployed agents that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of the specified agent. The **Metrics** page for the agent opens.

3. Optional: To view deployment details for the agent, click **Deployment details** . The **Deployment details** pane opens. To close the pane, click **Done**.

4. Optional: To view the `query` and `streamQuery` URLs for the agent, click **API URLs** . The **API URLs** pane opens. To close the pane, click **Done**.

### Agent Platform SDK

The following code lets you get a specific deployed agent:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

    remote_agent = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.get(
        name="projects/PROJECT_ID_OR_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID"
    )

### REST

Call the [`reasoningEngines.get`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines/get) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## Update a deployed agent

You can update one or more fields of the deployed agent at the same time,
but you have to specify at least one of the fields to be updated.

You can update the non-versioned or versioned fields of a deployed agent. If you update versioned fields, you will create a new revision. For more information about versioned fields and managing revisions, see [Manage revisions and traffic](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic).

The amount of time it takes to update the deployed agent depends on the update being
performed, but it generally takes between a few seconds to a few minutes.

### Console

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
2. For your specified agent, click **more actions** menu ().

3. Click **Edit** . The **Edit** pane for the agent opens.

4. Edit the **Display name** or **Description** for the agent.

5. Click **Save**.

### Agent Platform SDK

To update a deployed agent (corresponding to `RESOURCE_NAME`)
to an updated agent (corresponding to `UPDATED_AGENT`):

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

    client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.update(
        name=RESOURCE_NAME,                    # Required.
        agent=UPDATED_AGENT,                   # Optional.
        config={                                                # Optional.
            "requirements": REQUIREMENTS,      # Optional.
            "display_name": "DISPLAY_NAME",    # Optional.
            "description": "DESCRIPTION",      # Optional.
            "extra_packages": EXTRA_PACKAGES,  # Optional.
        },
    )

The arguments are the same as when you are [deploying an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).

### REST

Call the [`reasoningEngines.patch`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines/patch) method and provide an `update_mask` to specify which fields to update.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `update_mask`: a list of comma-separated fields to update

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description"
```

Request JSON body:

```
{
"displayName": "DISPLAY_NAME",
"description": "DESCRIPTION"
}
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description""
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method PATCH `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description"" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## Configure telemetry for your deployed agent

If you [enabled traces](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/tracing#write-traces)
during agent development, you can use the Google Cloud console to configure
telemetry for your deployed agent.

Configure telemetry for deployed agents with telemetry enabled:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Agent Platform instances that are part of the selected project
   appear in the list. You can use the **Filter** field to filter the list by
   your specified column.
2. Find the row for your Agent Platform instance. Under the **Telemetry
   configuration** column, click **Configure** . The **Service configuration**
   panel opens.

3. You can make the following configurations:

   - **Observability**: You can configure the following:

     - **Enable instrumentation of OpenTelemetry traces and logs**: To populate the agent
       observability dashboard and traces pages, click the toggle to the on
       position.

     - **Enable logging of prompt inputs and response outputs**: To collect and
       store the full content of user prompts and responses, click the toggle to
       the on position.

     If telemetry collection is disabled for your agent, you need to redeploy
     your agent and update your Vertex AI SDK version to `>= 1.126.1` in
     order to view configuration options for **Observability**.
   - **Containers**: Configure container settings for your deployed agent:

     - **Scaling** : Enter a **Minimum number of instances** and **Maximum number
       of instances**.

     - **Resources** : Select limits for **Memory** and **CPU** for each container.

     - **Container concurrency** : Enter a **Minimum number of instances** to set
       the concurrency for each container and agent server. The recommended value
       is (2 \* CPU + 1), and the default value is 9.

   - **Access and Permissions** : Click **Manage Permissions in IAM** to manage
     agent permissions on the associated service account.

   - **Deployment details** : View deployment details for the agent, including
     **Resource name** and **Display name**.

   - **Agent Platform Memory Bank** : View [Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank) details for the agent, including **Memory
     Generation** and **Memory Search**.

4. Click **Update** or **Close**.

## View metrics for your deployed agent

For deployed agents, you can use the console to view metrics for your agent:

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)

   Deployed agents that are part of the selected project appear in the list. You can use the **Filter** field to filter the list by your specified column.
2. Click the name of your agent. The **Dashboard** displays for your selected agent.

3. Select one of the following **Dashboard** tabs:

   - **Overview**: View a summary dashboard of metrics for your agent, including
     agent latency, agent request count, and agent error rate.

   - **Models**: View a dashboard of metrics for your agent's model, including
     number of model calls, model error rate, and model token usage.

   - **Tools**: View a dashboard of metrics for your agent's tools, including
     number of tool calls, tool error rate, and tool latency.

   - **Usage**: View a dashboard of metrics for your agent's usage, including
     token usage by input and output, container CPU allocation, and container
     memory allocation.

   - **Logs** : View your agent's logs, if you [enabled
     Cloud Logging](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/logging) for your
     agent.

![Gemini Enterprise Agent Platform dashboard](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/agent-engine-dashboard.png)

## Delete a deployed agent

Delete a deployed agent from the Agent Runtime managed runtime.

### Console

1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
2. For your specified agent, click **more actions** menu ().

3. Click **Delete**.

4. Click **Delete agent**.

### Agent Platform SDK

If you already have [an existing instance of the deployed agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#get)
(as `remote_agent`), you can run the following command:

    remote_agent.delete(
        force=True, # Optional, if the agent has resources (e.g. sessions, memory)
    )

Alternatively, you can call `agent_engines.delete()` to delete the deployed
agent corresponding to `RESOURCE_NAME` in the following way:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

    client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.delete(
        name=RESOURCE_NAME,
        force=True, # Optional, if the agent has resources (e.g. sessions, memory)
    )

### REST

Call the [`reasoningEngines.delete`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines/delete) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your GCP project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent

HTTP method and URL:

```
DELETE https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
```

#### PowerShell (Windows)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method DELETE `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID" | Select-Object -Expand Content
```

You should receive a successful status code (2xx) and an empty response.

## What's next

Guide

### [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent)

Use an agent with Agent Platform Runtime.
