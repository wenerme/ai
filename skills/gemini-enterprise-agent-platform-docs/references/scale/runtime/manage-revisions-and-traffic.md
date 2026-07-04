> [!WARNING]
> **Preview**
>
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1) Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).
>
>
> When you use this feature with AI Agents, the terms applicable to AI Agents in the Agreement apply.

In Gemini Enterprise Agent Platform, you can create immutable versions, or *revisions*, of an agent. You can then split traffic between the different active revisions. Traffic splitting lets you test and gradually increase traffic to new revisions and split traffic between revisions for other purposes.

The ability to create revisions is always enabled. You don't need to turn on
the feature. For information on creating revisions, see
[Revisions and states](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#revisions_and_states).

If you haven't created any revisions yet, you will need to
create revisions before you can view revisions and configure traffic between
them, as described on this page.

At this time, revisions and traffic splitting are available through the
[v1beta1 API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rpc/google.cloud.aiplatform.v1beta1).

> [!IMPORTANT]
> **Important:** You should deprecate or delete old revisions to prevent running out of resource quota. Deprecating or deleting old revisions also stops users from querying old revisions with potential errors or security vulnerabilities. See [delete a revision](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#delete) for instructions to delete revisions.

This page describes how to manage agent revisions and traffic splitting.

## Revisions and states

A revision is a snapshot of an agent. When you create an agent or update its [versioned fields](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#versioned_and_unversioned_fields), an immutable revision of the agent is created. A revision can have the following states:

- **Active** : The revision is available for queries. Note that it might not be receiving any queries, depending on the [traffic configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#configure-traffic).
- **Deprecated**: The revision cannot be queried.

You can identify a revision using its resource name, which can be found by [listing the agent revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#list_agent_revisions).

## Versioned and unversioned fields

This section lists the fields in a deployed agent's [ReasoningEngineSpec](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines#ReasoningEngineSpec) definition that you can update to create a revision of the agent.

When you update *versioned fields,* a new revision is created.

When you update *unversioned fields,* or fields in an agent's definition other than the *versioned fields*, the agent is updated across all of its revisions.

These are the *versioned fields*:

- [PackageSpec](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines#PackageSpec)
  - `pickleObjectGcsUri`
  - `dependencyFilesGcsUri`
  - `requirementsGcsUri`
  - `pythonVersion`
- [DeploymentSpec](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines#DeploymentSpec)
  - `env[]`
  - `secretEnv[]`
  - `firstPartyImageOverride`
  - `agentServerMode`
  - `pscInterfaceConfig`
  - `minInstances`
  - `maxInstances`
  - `resourceLimits`
  - `containerConcurrency`
- `classMethods[]`
- `agentFramework`
- [SourceCodeSpec](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines#SourceCodeSpec)
  - `source`
  - `languageSpec`
- `identityType`
- `agentCard[]`

## List agent revisions

You can list all the revisions of a deployed agent---both active and deprecated.

To find the resource ID for your agent, see [Get the agent resource ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#resource-identifier).

### Console

1. In Google Agent Platform, go to **Govern \> Deployments**.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
2. Click the name of the agent.

3. Select the **Revisions** tab.

4. The top of the page shows this information about the revisions:

   1. **Split mode**: This can be either "Manual" or "Latest". See "Manage traffic to revisions" for more information.
   2. **Active revisions**: The number of active revisions compared to the total number of revisions.
   3. **Latest revision**: The name of the latest revision and the percentage of traffic it is receiving.
   4. **Primary revision**: The name of the primary revision, which receives most of the traffic.
5. The list shows all revisions for the agent, and includes this information:

   1. **Name**: The revision name or number.
   2. **State**: Whether the revision is deployed or deprecated.
   3. **Traffic**: The percentage of traffic routed to the revision.
   4. **Created**: The date and time the revision was created.

### Agent Platform SDK

The following code lists the revision history for a specified deployed agent. To list revisions, you must identify your agent's unique [resource ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#resource-identifier).

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.genai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html as genai_types

    http_options = genai_types.HttpOptions(
        api_version="v1beta1",
    )

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
        http_options=http_options,
    )

    revisions = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.runtimes.revisions.list(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
    )

    for revision in revisions:
        print(revision)

Replace the following variables in the code:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent

### REST

Call the [`reasoningEngineRuntimeRevisions.list`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.reasoningEngines.runtimeRevisions/list) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "reasoningEngineRuntimeRevisions": [
      {
        "name": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID",
        "spec": {
          // Revision-specific config attributes (e.g., package specs, requirements)
        },
        "createTime": "2026-05-01T13:26:01Z",
        "state": "ACTIVE"
      }...
    ]
}
```

## Get the details of a revision

You can retrieve the details for a specific revision.

### Agent Platform SDK

The following code retrieves resource details for a specified deployed agent revision:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.genai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html as genai_types

    http_options = genai_types.HttpOptions(
        api_version="v1beta1",
    )

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
        http_options=http_options,
    )

    revision = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.runtimes.revisions.get(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID"
    )

    print(revision)

Replace the following variables in the code:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID`: the unique ID for a specific runtime revision

### REST

Call the [`reasoningEngineRuntimeRevisions.get`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.reasoningEngines.runtimeRevisions/get) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID`: the unique ID for a specific runtime revision

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID",
  "spec": {
    // Revision-specific config attributes (e.g., package specs, requirements)
  },
  "createTime": "2026-05-06T13:05:24Z",
  "state": "ACTIVE"
}
```

## Configure traffic distribution between revisions

You can manage how traffic is distributed across active revisions. Note that only queries directed to the root `reasoningEngine` resource undergo traffic splitting. Directing a query at a specific revision resource path explicitly bypasses traffic rules.

Traffic is distributed using one of two methods:

- **By percentage**: When configuring by percentage, a specified percentage of traffic goes to each agent revision. Each percentage specified must be an integer. The sum of the percentages must equal 100%. Even if there is strictly only 1 revision active, you can still configure traffic splitting (where 100% redirects there).
- **To the most recent revision**: All traffic is directed to the latest revision. When a new agent revision is created, traffic is automatically directed to that new revision.

### Console

To configure traffic management:

1. Go to **Govern \> Deployments**.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
2. Click the name of the agent.

3. Go to the **Revisions** tab.

4. On the revisions detail page, click **Manage traffic**.

5. Under **Split mode**, select one of these options:

   1. **Manual**: Specify the percentage of traffic to go to each revision.
   2. **Always latest**: In this case, 100% of traffic goes to the latest (most recently created) revision.
6. Select **Save** to save your changes.

### Agent Platform SDK

The following code shows an example of configuring percentage-based traffic distribution.

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.genai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html as genai_types

    http_options = genai_types.HttpOptions(
        api_version="v1beta1",
    )

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
        http_options=http_options,
    )

    client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.update(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID",
        config={
            "traffic_config": {
                "trafficSplitManual": {
                    "targets": [
                        {
                            "runtimeRevisionName": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID_1",
                            "percent": 50,
                        },
                        {
                            "runtimeRevisionName": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID_2",
                            "percent": 50,
                        },
                    ]
                }
            }
        },
    )

Replace the following variables in the code:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID_1`: the revision ID for the first revision
- `REVISION_ID_2`: the revision ID for the second revision

### REST

To configure traffic to always go to the latest revision (default), update the `ReasoningEngine` resource with the `traffic_config` field and specify `trafficSplitAlwaysLatest`:

    {
      "trafficConfig": {
        "trafficSplitAlwaysLatest": {}
      }
    }

To split traffic between runtime revisions of an agent, update the `ReasoningEngine` resource with the `traffic_config` field and provide a list of traffic targets with their respective percentages. The following shows how to set manual splitting across two revisions.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID_1`: the revision ID for the first revision
- `REVISION_ID_2`: the revision ID for the second revision
- `TRAFFIC_PERCENTAGE_1`: the percentage traffic flow you want for the first revision
- `TRAFFIC_PERCENTAGE_2`: the percentage traffic flow you want for the second revision

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask=traffic_config
```

Request JSON body:

```
{
  "trafficConfig": {
    "trafficSplitManual": {
      "targets": [
          {
            "runtimeRevisionName": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID_1",
            "percent": TRAFFIC_PERCENTAGE_1
          },
          {
            "runtimeRevisionName": "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID_2",
            "percent": TRAFFIC_PERCENTAGE_2
          }
        ]
      }
    }
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
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask=traffic_config"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask=traffic_config" | Select-Object -Expand Content
```
This request initiates a Long Running Operation (LRO). Initially, you'll receive a standard operation response. Once the configuration changes complete, the response shows `done` and repeats your configuration settings.

```
{
  "name": "projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "done": false
}
```

## Query a specific revision

You can query a specific revision through the SDK or the APIs. The revision must be active to query it. Direct queries to a specific revision bypass the traffic distribution rules.

> [!NOTE]
> **Note:** Possessing permission to query a specific revision (\`reasoningEngineRuntimeRevisions.query\`) does not inherently grant permission to query the root agent itself.

### Agent Platform SDK

The following code queries a specific active revision:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.genai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html as genai_types

    http_options = genai_types.HttpOptions(
        api_version="v1beta1",
    )

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
        http_options=http_options,
    )

    revision = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.runtimes.revisions.get(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID"
    )

    response = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.ReasoningEngineSpecSourceCodeSpecDeveloperConnectConfigDict.html#vertexai__genai_types_ReasoningEngineSpecSourceCodeSpecDeveloperConnectConfigDict_revision.query(
        input={"your_input_key": "your_input_value"},
        config={"class_method": "your_class_method"},
    )

    print(response)

Replace the following variables in the code:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID`: the unique ID for a specific runtime revision

### REST

Call the [`reasoningEngineRuntimeRevisions.query`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.reasoningEngines.runtimeRevisions/query) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID`: the unique ID for a specific runtime revision

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID:query
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID:query"
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
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID:query" | Select-Object -Expand Content
```

## Monitor revisions

Monitor revisions for activity and problems by tracking the revision number as metadata in logs. See [Set up logging](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/logging) for information on setting up logging.

## Update a revision

Update deployed agents following the instructions in [Update a deployed agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#update). You can update[versioned or unversioned fields](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#versioned_and_unversioned_fields). If you update versioned fields, you'll create a new revision.

## Delete an agent revision

You can remove an agent revision by deleting it. You can only delete revisions
that are not active for traffic management because they are either deprecated or
not configured to receive traffic. See
[Configure traffic distribution between revisions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#configure-traffic)
for instructions to configure whether a revision receives traffic.

### Console

To delete a revision for an agent:

1. Go to **Govern \> Deployments**.

   [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
2. Click the name of the agent.

3. Go to the **Revisions** tab.

4. On the revisions detail page, click the **Revision name**.

5. Find the row for the revision to remove.

6. Click the **Delete** (trash) icon.

7. When prompted, confirm deletion of the revision.

### Agent Platform SDK

The following code deletes a specified agent revision:

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from google.genai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.types.html as genai_types

    http_options = genai_types.HttpOptions(
        api_version="v1beta1",
    )

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
        project="PROJECT_ID",
        location="LOCATION",
        http_options=http_options,
    )

    client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html.runtimes.revisions.delete(
        name="projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID"
    )

Replace the following variables in the code:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID`: the unique ID for a specific runtime revision

### REST

Call the [`reasoningEngineRuntimeRevisions.delete`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.reasoningEngines.runtimeRevisions/delete) method.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: your Google Cloud project ID
- `LOCATION`: a supported region
- `RESOURCE_ID`: the resource ID of the deployed agent
- `REVISION_ID`: the unique ID for a specific runtime revision

HTTP method and URL:

```
DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID
```

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID"
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
    -Method DELETE `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID" | Select-Object -Expand Content
```
