Before you work with Agent Runtime, you need to make sure your
environment is set up. You need to have a Google Cloud project with billing enabled,
have the required permissions, set up a Cloud Storage bucket, and install the
Agent Platform SDK for Python. Use the following topics to ensure ready to start working
with Agent Runtime.

For a reference Terraform example to streamline Agent Runtime environment setup and deployment, consider exploring the [agent-starter-pack](https://github.com/GoogleCloudPlatform/agent-starter-pack?tab=readme-ov-file#-agent-starter-pack).

## Set up with Google Cloud

You can set up with Google Cloud for Agent Runtime by
creating a Google Cloud project.

### Google Cloud project

Every project can be identified in two ways: the project number or the project
ID. The `PROJECT_NUMBER` is automatically created when you
create the project, whereas the `PROJECT_ID` is created by you,
or whoever created the project. To set up a project:

> [!NOTE]
> **Note:** To enable APIs, you need the `serviceusage.services.enable` permission. If you don't have this permission, ask your administrator to grant you the Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) role.

## Get the required roles

To get the permissions that
you need to use Agent Runtime,

ask your administrator to grant you the
[Agent Platform User](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.user) (`roles/aiplatform.user`) IAM role on your project.

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

## Set up the identity and permissions for your agent

You have the following options when setting up identity and permissions:

- [Agent identity (Recommended)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity)
  Use Identity Access Management (IAM) agent identity to provide
  security and access management features when using agents on
  Agent Runtime Runtime. Agent identity is tied
  to each individual agent. By default, agents have the
  *Agent Platform Agent Default Access* role
  (`roles/aiplatform.agentDefaultAccess`), which only includes basic
  project-wide logging and model calling permissions, and the
  *Agent Platform Agent Context Editor* role
  (`roles/aiplatform.agentContextEditor`), which limits an agent to accessing
  only their own sessions, memories, and sandboxes.

  Note: Some features accessible by this role may be in
  [Preview](https://cloud.google.com/products/#product-launch-stages)
- [Service accounts](https://docs.cloud.google.com/iam/docs/service-account-overview): Service accounts are
  shared across agents you deploy to Agent Runtime.
  You have two options for the service account:

  - **Default Service Agent:** By default, agents use the *AI Platform Reasoning
    Engine Service Agent* . This Google-managed service account has the *Gemini Enterprise Agent Platform Reasoning Engine Service Agent* role (`roles/aiplatform.reasoningEngineServiceAgent`), which includes the default permissions required for deployed agents.
  - **Custom Service Account:** You can specify your own service account for the agents to use. This gives you more granular control over the permissions granted to the agents.

### Agent identity

To set up IAM policies before deploying the agent, you can
create an agent identity without deploying your agent code. To do so, create
an Agent Platform instance with just the `identity_type` field:

    remote_app = client.agent_engines.create(
          config={
              "identity_type": types.IdentityType.AGENT_IDENTITY,
          },
    )

Once you create the Agent Platform instance with the agent identity, you can do
the following:

1. Grant the agent identity additional roles as needed for your use case.

2. Add agent code using
   [`agent_engine.update(...)`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#update).

### Default Service Agent

The *AI Platform Reasoning Engine Service Agent* is used by default. You can view
the full list of default permissions in the
[IAM documentation](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.reasoningEngineServiceAgent).

If your agent requires permissions beyond the default set, you can grant this
Service Agent additional roles:

1. Go to the **IAM** page and check the "Include Google-provided role grants"
   checkbox.

   [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
2. Find the principal which matches
   `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`.

3. Add the required roles to the principal by clicking the edit button and then
   the save button.

### Manually generate the default service agent

While the Reasoning Engine Service Agent is automatically provisioned during
Agent Runtime deployment, there might be scenarios where you need to manually
generate it beforehand. This is particularly important when you need to grant
specific roles to the service agent to ensure the deployment process has the
necessary permissions and avoid potential deployment failures.

Here are the steps to manually generate a Reasoning Engine Service Agent:

1. Generate the Reasoning Engine Service Agent using the Google Cloud CLI.

       gcloud beta services identity create --service=aiplatform.googleapis.com --project=PROJECT-ID-OR-PROJECT-NUMBER

   > [!NOTE]
   > **Note:** The response to the Google Cloud CLI command might display only the Vertex AI Service Agent. However, the Reasoning Engine Service Agent is also created.

2. Go to the **IAM** page and click **Grant Access**.

   [Go to IAM](https://console.cloud.google.com/iam-admin/iam)
3. In **Add principals** section, in the **New principals** field, enter
   `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`.

4. In the **Assign roles** section, find and select the roles you need.

5. Click the **Save** button.

### Custom service account

To use your own service account, you need to grant it the necessary permissions
to run the agent. Your custom service account likely needs the
*Agent Platform User* role (`roles/aiplatform.user`).

1. If you don't have a service account, create one. See
   [Create service accounts](https://docs.cloud.google.com/iam/docs/service-accounts-create).

2. Grant the service account the
   [Agent Platform User](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.user)
   (`roles/aiplatform.user`) role.

3. Grant any other roles required by your agent code to the service account.

4. To deploy your agent with this service account, grant yourself the *Service
   Account User* role (`roles/iam.serviceAccountUser`) on this custom service
   account.

5. When deploying your agent, specify the email address of your custom service
   account. See [Configure a custom service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#service-account)
   for details.

### Cross-project custom service account

If your custom service account is from a different project, you need additional
configurations in both the project where the service account resides and the
project where you deploy the agent.

1. **Disable cross-project service account usage organization policy:** In the
   project where the service account is located, ensure that the
   `iam.disableCrossProjectServiceAccountUsage` organization policy is **NOT**
   enforced. See
   [Disable cross-project service account usage enforcement](https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_cross-project_service_account_usage_enforcement)
   for more details.

2. **Grant permissions to the Agent Platform Service Agent:** In the project where
   the service account is located, grant the *Service Account Token Creator*
   (`roles/iam.serviceAccountTokenCreator`) role to the Agent Platform Service Agent
   (`service-RESOURCE_PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`)
   of the project where you plan to deploy the agent.

3. **Grant permissions to the custom service account:** In the project where
   you plan to deploy the agent, grant the necessary roles to the custom
   service account. This typically includes the *Agent Platform User* role
   (`roles/aiplatform.user`) and any other roles required by your agent code.

## (Optional) Create a Cloud Storage bucket

The need for a Cloud Storage bucket depends on whether the Agent Platform SDK for Python needs a place to stage your agent code before deployment:

- **Deploy from source files**: The agent exists as files. The Agent Platform SDK for Python can bundle and upload these files directly to the deployment service, so no Cloud Storage staging bucket is needed.

- **Deploy from agent object**: The agent exists in memory. The Agent Platform SDK for Python packages this object and uploads it to a Cloud Storage bucket, which acts as a staging area for the deployment service.

### Deploy from source files

If you deploy an agent
[from source files](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-platform-instance),
a Cloud Storage bucket is not required.

### Deploy from object

When you deploy [from an agent object](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent), Agent Runtime stages the artifacts of your deployed agents in a Cloud Storage bucket as part of the deployment process. Make sure the principal that is authenticated to use Gemini Enterprise Agent Platform (either yourself or a service account) has `Storage Admin` access to this bucket. This is needed because Agent Platform SDK for Python writes your code to this bucket.

If you already have a bucket set up, you can skip this step. Otherwise, you can
follow the standard instructions for creating a bucket.

> [!NOTE]
> **Note:** We strongly recommend that you create a Cloud Storage bucket in the same project where you deploy your agents to Agent Runtime. If you use a bucket in a different project, you must manually grant the Agent Platform Service Agent (`service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`) read permissions to your Cloud Storage bucket.

Ask your administrator to grant you the [Storage Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/storage#storage.admin) (`roles/storage.admin`) IAM role on your project.

### Google Cloud console

1. In the Google Cloud console, go to the Cloud Storage **Buckets** page.

   [Go to Buckets](https://console.cloud.google.com/storage/browser)
2. Click **Create**.
3. On the **Create a bucket** page, enter your bucket information. To go to the next step, click **Continue** .
   1. In the **Get started** section, do the following:
      - Enter a globally unique name that meets the [bucket naming requirements](https://docs.cloud.google.com/storage/docs/bucket-naming#requirements).
      - To add a [bucket label](https://docs.cloud.google.com/storage/docs/tags-and-labels#bucket-labels), expand the **Labels** section (), click **Add label** , and specify a `key` and a `value` for your label.
   2. In the **Choose where to store your data** section, do the following:
      1. Select a [Location type](https://docs.cloud.google.com/storage/docs/locations).
      2. Choose a location where your bucket's data is permanently stored from the **[Location type](https://docs.cloud.google.com/storage/docs/locations#available-locations)** drop-down menu.
         - If you select the [dual-region](https://docs.cloud.google.com/storage/docs/locations#location-dr) location type, you can also choose to enable [turbo replication](https://docs.cloud.google.com/storage/docs/availability-durability#turbo-replication) by using the relevant checkbox.
      3. To set up [cross-bucket replication](https://docs.cloud.google.com/storage/docs/availability-durability#cross-bucket-replication), select **Add cross-bucket replication via Storage Transfer Service** and follow these steps:

         #### Set up cross-bucket replication

         1. In the **Bucket** menu, select a bucket.
         2. In the **Replication settings** section,
            click **Configure** to configure settings for the
            replication job.

            The **Configure cross-bucket replication** pane
            appears.
            - To filter objects to replicate by object name prefix, enter a prefix that you want to include or exclude objects from, then click **Add a prefix**.
            - To set a storage class for the replicated objects, select a storage class from the **Storage class** menu. If you skip this step, the replicated objects will use the destination bucket's storage class by default.
            - Click **Done**.
   3. In the **Choose how to store your data** section, do the following:
      1. Select a [default storage class](https://docs.cloud.google.com/storage/docs/storage-classes) for the bucket or [Autoclass](https://docs.cloud.google.com/storage/docs/autoclass) for automatic storage class management of your bucket's data.
      2. To enable [hierarchical namespace](https://docs.cloud.google.com/storage/docs/hns-overview), in the **Optimize storage for data-intensive workloads** section, select **Enable hierarchical namespace on this bucket** . **Note:** You cannot enable hierarchical namespace in existing buckets.
   4. In the **Choose how to control access to objects** section, select whether or not your bucket enforces [public access prevention](https://docs.cloud.google.com/storage/docs/public-access-prevention), and select an [access control method](https://docs.cloud.google.com/storage/docs/access-control) for your bucket's objects. **Note:** You cannot change the **Prevent public access** setting if this setting is enforced at an [organization policy](https://docs.cloud.google.com/storage/docs/org-policy-constraints#public-access-prevention).
   5. In the **Choose how to protect object data** section, do the following:
      - Select any of the options under **Data protection** that you want to set for your bucket.
        - To enable [soft delete](https://docs.cloud.google.com/storage/docs/soft-delete), click the **Soft delete policy (For data recovery)** checkbox, and specify the number of days you want to retain objects after deletion.
        - To set [Object Versioning](https://docs.cloud.google.com/storage/docs/object-versioning), click the **Object versioning (For version control)** checkbox, and specify the maximum number of versions per object and the number of days after which the noncurrent versions expire.
        - To enable the retention policy on objects and buckets, click the **Retention (For compliance)** checkbox, and then do the following:
          - To enable [Object Retention Lock](https://docs.cloud.google.com/storage/docs/object-lock), click the **Enable object retention** checkbox.
          - To enable [Bucket Lock](https://docs.cloud.google.com/storage/docs/bucket-lock), click the **Set bucket retention policy** checkbox, and choose a unit of time and a length of time for your retention period.
      - To choose how your object data will be encrypted, expand the **Data encryption** section (), and select a [**Data encryption** method](https://docs.cloud.google.com/storage/docs/encryption).
4. Click **Create**.

### Command line

Create a Cloud Storage bucket and configure it as follows:
- Replace `STORAGE_CLASS` with your preferred [storage class](https://docs.cloud.google.com/storage/docs/storage-classes).
- Replace `LOCATION` with your preferred location (`ASIA`, `EU`, or `US`)
- Replace `BUCKET_NAME` with a bucket name that meets the [bucket name
  requirements](https://docs.cloud.google.com/storage/docs/buckets#naming).

```bash
gcloud storage buckets create gs://BUCKET_NAME --default-storage-class STORAGE_CLASS --location LOCATION
```

## Install and initialize the Agent Platform SDK for Python

This section presumes that you have [set up a Python development environment](https://docs.cloud.google.com/python/docs/setup),
or are using Colab (or any other suitable runtime that has set it up for you).

### (Optional) Set up a virtual environment

We also recommend [setting up a virtual environment](https://docs.cloud.google.com/python/docs/setup#installing_and_using_virtualenv)
to isolate your dependencies.

### Installation

To minimize the set of dependencies that you have to install, we have separated
out the dependencies into:

- `agent_engines`: the set of packages required for deployment to Agent Runtime.
- `adk`: the set of compatible Agent Development Kit packages.
- `langchain`: the set of compatible LangChain and LangGraph packages.
- `ag2`: the set of compatible AG2 packages.
- `llama_index`: the set of compatible LlamaIndex packages.

When installing the Agent Platform SDK for Python, you can specify the dependencies
required (separated by commas). To install all of them:

    pip install google-cloud-aiplatform[agent_engines,adk,langchain,ag2,llama_index]>=1.112.0

To use [Agent2Agent (A2A)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-a2a-agent) on Agent Platform , you must also install the a2a-sdk package:

    pip install google-adk[a2a]

### Authentication

### Colab

Run the following code:

    from google.colab import auth

    auth.authenticate_user(project_id="PROJECT_ID")

### Cloud Shell

No action required.

### Local Shell

Run the following command:

    gcloud auth application-default login

### Import and initialize the SDK

Run the following code to import and initialize the SDK for Agent Runtime:

### Google Cloud project

    import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
    from vertexai import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.agent_engines.html # For the prebuilt templates

    client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(  # For service interactions via client.agent_engines
        project="PROJECT_ID",
        location="LOCATION",
    )

where

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#project) under which you [develop](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents, and
- `LOCATION` is one of the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).

## (Optional) Bring your own container (BYOC)

> [!NOTE]
> To see an example of Bring your own container (BYOC),
> run the "Deploy your containerized agent on Agent Runtime" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_deploy_your_containerised_agent.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fagent_engine%2Ftutorial_deploy_your_containerised_agent.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/agent_engine/tutorial_deploy_your_containerised_agent.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/agent_engine/tutorial_deploy_your_containerised_agent.ipynb)

By default, Agent Runtime builds a container for you as part of the
deployment process. If you want to build a custom container for
[deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#from-container-image),
follow the instructions in this section.

To deploy your agent with a custom container, complete the following high-level
tasks:

1. Build and push your container image to Artifact Registry.
2. [Set up the identity and permissions for your
   agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions).
3. Grant the Artifact Registry Reader role to Agent Runtime [default service
   agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#default-service-agent).

### Build and push your container image

To build and push your container image, follow the instructions in [Build and
push a Docker image with Cloud Build](https://docs.cloud.google.com/build/docs/build-push-docker-image).

### Set up the identity and permissions for Agent Runtime

The Agent Runtime [default service agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#default-service-agent) is
required to import containers from your Artifact Registry repository.

The service agent is automatically generated in your project by default. If it
doesn't exist, follow [Set up the identity and permissions for your
agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions) to create and configure it.

### Grant Artifact Registry Reader role

Grant the Artifact Registry Reader role (`roles/artifactregistry.reader`)
to the default service agent
(`service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`).

Run the following command to grant the required role to the default service
agent:

    gcloud projects add-iam-policy-binding PROJECT_NUMBER \
      --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com" \
      --role="roles/artifactregistry.reader"

#### (Optional) Grant cross-project permission

Cross-project permission is required if your container images are stored in an Artifact Registry
repository in a different Google Cloud project from where your agents are
deployed.

In this case, grant Artifact Registry Reader role to the Agent Platform
Service Agent (`service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`) in your Artifact Registry
repository project.

    gcloud projects add-iam-policy-binding AR_REPO_PROJECT_NUMBER \
      --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com" \
      --role="roles/artifactregistry.reader"

## What's next

Overview

### [Create an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent)

Learn how to create an agent using Agent Platform Runtime.

Troubleshooting

### [Troubleshoot agent creation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/agent-creation)

Learn how to resolve common errors when creating custom agents.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
