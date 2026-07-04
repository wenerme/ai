You can create policies to govern agentic communication with services.
Agent Gateway (Private preview) uses Identity-Aware Proxy (IAP) to enforce
policies.

You can use the **Policies** page in the Google Cloud console to create
Agent Gateway IAM allow policies.

You can use the Google Cloud CLI to create IAM allow and deny
policies.

## Before you begin

Before you create an IAM allow policy:

1. Set up a Google Cloud billing project.

2. Know the identity of agent that you want to manage access *from*. To manage
   access from an entire registry using the Google Cloud console, select the
   project that contains the registry.

   - Agent Platform and Gemini Enterprise agents:
     Know the agent identity.

   - DIY agents (Cloud Run): Know the service accounts-based identity.

3. The target agent resources---agents, MCP servers, and endpoints---that you want
   *to* manage access to must be registered in Agent Registry.

4. [Set up an Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway). We recommend that you initially configure
   Agent Gateway in dry run mode.
   To learn about Agent Gateway, see [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview).

## Required roles

To get the permissions that
you need to configure Agent Platform for AI agents,

ask your administrator to grant you the
following IAM roles on your project:

- [IAP Policy Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/iap#iap.admin) (`roles/iap.admin`)
- [Agent Registry Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/agentregistry#agentregistry.viewer) (`roles/agentregistry.viewer`)
- [Project IAM Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcemanager#resourcemanager.projectIamAdmin) (`roles/resourcemanager.projectIamAdmin`)
- [Network Security Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/networksecurity#networksecurity.admin) (`roles/networksecurity.admin`)
- [Service Extensions Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/serviceextensions#serviceextensions.admin) (`roles/serviceextensions.admin`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

## Create an IAM allow policy using IAP

You can define egress policies for the following types of agent interactions:

- [Agent to registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-registry)
- [Agent to agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-agent)
- [Agent to MCP server](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-mcp-server)
- [Agent to endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-endpoint)

### Create an agent-to-registry policy

An agent-to-registry policy lets your agent access all of the agents, MCP
servers, and endpoints in the Agent Registry in the current
project.

### Console

Google Cloud console, do the following:

1. Select the source agent and target registry.
   1.
      In the Google Cloud console, go to the **Policies** page:

      [Go to Policies](https://console.cloud.google.com/agent-platform/policies/iam)
   2. To add an IAM allow policy for Agent Gateway egress, click **Add IAM policy**.
   3. To select your source agents, do the following:
      - To select all agents in the Agent Registry that are in the currently selected project, select **All agents**.
      - To select a specific agent in the current project, do the following:
        - Select **Individual agent** . To find your agent, search for it by using the filter **Filter** field.
        - Select the source agent that you want to grant access to.
        - To select the agent, click **OK**.
   4. In **Access target** , click **Registry**.
   5. To create the IAM allow policy and bind it on the Registry, click **Create**.
2. To create a condition, do the following:
   1. In **Conditions** , click **Add Condition**.
   2. In the **Add condition** dialog, do the following:
      1. In **Title**, enter the name of the condition.
      2. In **Description**, enter the description of the condition.
      3. To add a condition by using the **Condition builder** , do the following:
         1. In **Condition type** select the condition type from the following:
            - **Name**: agent access is restricted based on the name of the resource being accessed.
            - **ReadOnly**: whether agent access is limited to read data, which prevents write operations by the agent.
            - **Destructive**: whether agents can perform actions that are considered harmful or irreversible, such as deleting resources.
            - **Idempotent**: whether agent access can be overridden.
            - **Open World**: whether the agent can interact with an "open world" of external entities (for example, a web search tool). If you set this condition to \`false\`, agent interaction is considered closed.
         2. In **Operator**, select the Boolean operator.
         3. In **Value**, select the value for the condition.
         4. To add another condition, click **Add another condition**.
         5. To save the condition, click **Save**.
      4. To add a condition by using the **Condition editor**, enter the CEL expression in the text field.

### gcloud

To create an agent-to-registry egress policy by using the
gcloud CLI, do the following:

1. Create the IAP policy that contains the IAM
   policy.

   ```json
   {
     "policy": {
       "bindings": [
         {
           "role": "roles/iap.egressor",
           "members": [
             "AGENT_PRINCIPAL"
           ],
           "condition": {
             CONDITION
           }

         }
       ]
     }
   }
   ```

   Replace the following:
   - `AGENT_PRINCIPAL`: the principal for the source agent identity, formatted as follows:
     - Vertex AI Agent Engine and Gemini Enterprise agents: `principal://TRUST_DOMAIN/AGENT_UNIQUE_IDENTIFIER`---for example, `principal://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
     - DIY agents: `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/AGENT_SERVICE_ACCOUNT_IDENTIFIER` ---for example, `principal://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/my-agent-identity/subject/ns/default/sa/my-agent`
   - `CONDITION`:

     the condition parameter, formatted as follows:

     ```json
     "condition": {
       "title": "CONDITION_TITLE",
       "description": "CONDITION_DESCRIPTION",
       "expression": "CEL_EXPRESSION"
     }
     ```

     Replace the following:
     - `CONDITION_TITLE`: the title of the condition
     - `CONDITION_DESCRIPTION`: the description of the condition
     - `CEL_EXPRESSION`: the conditional expression. This expresstion must be a valid CEL expression. It must evaluate to `True` for access to be allowed.

2. Set the IAM allow policy in IAP for
   all resources in the Agent Registry:

   ```bash
   gcloud beta iap web set-iam-policy agents-iap-policy.json \
       --project=PROJECT_ID \
       --resource-type=AgentRegistry \
       --region=REGION
   ```

   Replace the following:
   - `PROJECT_ID`: the project ID of the project that contains the resource. Alternatively, you can bind the policy to a folder or organization, by instead specifying the `--folder` or `--organization` flags, respectively.
   DEFAULT
   - `REGION`: the region where the resource is located

   The following example shows egress access for an agent hierarchy:

   ```json
   {
   "policy": {
     "bindings": [
       {
         "role": "roles/iap.egressor",
         "members": [
           "principalSet://agents.global.org-ORGANIZATION_ID.system.id.goog/attribute.platformContainer/aiplatform/projects/1234"
         ]
       }
     ]
   }
   }
   ```

### Create an agent-to-agent egress policy

### Console

To define an agent-to-agent egress policy by using the Google Cloud console,
do the following:

1.
   In the Google Cloud console, go to the **Policies** page:

   [Go to Policies](https://console.cloud.google.com/agent-platform/policies/iam)
2. To add an IAM allow policy for Agent Gateway egress, click **Add IAM policy**.
3. To select your source agents, do the following:
   - To select all agents in the Agent Registry that are in the currently selected project, select **All agents**.
   - To select a specific agent in the current project, do the following:
     - Select **Individual agent** . To find your agent, search for it by using the filter **Filter** field.
     - Select the source agent that you want to grant access to.
     - To select the agent, click **OK**.
4. In **Access target** , click **Agent**.
5. In **Select Agent** , select the target Agent that you want your source agent to access. To find the Agent, search for it by using the filter **Filter** field.
6. To create the IAM allow policy and bind it on the Agent, click **Create**.

### gcloud

1. Create an IAM allow policy in a JSON-formatted file.

   ```json
   {
     "policy": {
       "bindings": [
         {
           "role": "roles/iap.egressor",
           "members": [
             "AGENT_PRINCIPAL"
           ]
         }
       ]
     }
   }
   ```

   Replace the following:
   - `AGENT_PRINCIPAL`: the principal for the source agent identity, formatted as follows:
     - Vertex AI Agent Engine and Gemini Enterprise agents: `principal://TRUST_DOMAIN/AGENT_UNIQUE_IDENTIFIER`---for example, `principal://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
     - DIY agents: `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/AGENT_SERVICE_ACCOUNT_IDENTIFIER` ---for example, `principal://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/my-agent-identity/subject/ns/default/sa/my-agent`

2. Bind the IAM policy to IAP.

   ```bash
   gcloud beta iap web set-iam-policy agents-iap-policy.json \
       --project=PROJECT_ID \
       --agent=AGENT_ID \
       --region=REGION
   ```

   Replace the following:
   - `PROJECT_ID`: the project ID of the project that contains the resource. Alternatively, you can bind the policy to a folder or organization, by instead specifying the `--folder` or `--organization` flags, respectively.
   - `AGENT_ID`: the ID of the agent
   - `REGION`: the region where the resource is located

### Create an agent-to-MCP server egress policy

### Console

To define an agent-to-MCP server egress policy by using the Google Cloud console,
do the following:

1.
   In the Google Cloud console, go to the **Policies** page:

   [Go to Policies](https://console.cloud.google.com/agent-platform/policies/iam)
2. To add an IAM allow policy for Agent Gateway egress, click **Add IAM policy**.
3. To select your source agents, do the following:
   - To select all agents in the Agent Registry that are in the currently selected project, select **All agents**.
   - To select a specific agent in the current project, do the following:
     - Select **Individual agent** . To find your agent, search for it by using the filter **Filter** field.
     - Select the source agent that you want to grant access to.
     - To select the agent, click **OK**.
4. In **Access target** , click **MCP server**.
5. In **Select MCP server** , select the target MCP server that you want your source agent to access. To find the MCP server, search for it by using the filter **Filter** field.
6. To create the IAM allow policy and bind it on the MCP server, click **Create**.

1. Create a condition:

   1. In **Conditions** , click **Add Condition**.
   2. In the **Add condition** dialog, do the following:
      1. In **Title**, enter the name of the condition.
      2. In **Description**, enter the description of the condition.
      3. To add a condition by using the **Condition builder** , do the following:
         1. In **Condition type** select the condition type from the following:
            - **Name**: agent access is restricted based on the name of the resource being accessed.
            - **ReadOnly**: whether agent access is limited to read data, which prevents write operations by the agent.
            - **Destructive**: whether agents can perform actions that are considered harmful or irreversible, such as deleting resources.
            - **Idempotent**: whether agent access can be overridden.
            - **Open World**: whether the agent can interact with an "open world" of external entities (for example, a web search tool). If you set this condition to \`false\`, agent interaction is considered closed.
         2. In **Operator**, select the Boolean operator.
         3. In **Value**, select the value for the condition.
         4. To add another condition, click **Add another condition**.
         5. To save the condition, click **Save**.
      4. To add a condition by using the **Condition editor**, enter the CEL expression in the text field.

### gcloud

To create an agent-to-MCP server egress policy using the
gcloud CLI, do the following:

1. Include: Create an IAM allow policy in a JSON-formatted file.

   ```json
   {
     "policy": {
       "bindings": [
         {
           "role": "roles/iap.egressor",
           "members": [
             "AGENT_PRINCIPAL"
           ],
           "condition": {
             CONDITION
           }

         }
       ]
     }
   }
   ```

   Replace the following:
   - `AGENT_PRINCIPAL`: the principal for the source agent identity, formatted as follows:
     - Vertex AI Agent Engine and Gemini Enterprise agents: `principal://TRUST_DOMAIN/AGENT_UNIQUE_IDENTIFIER`---for example, `principal://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
     - DIY agents: `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/AGENT_SERVICE_ACCOUNT_IDENTIFIER` ---for example, `principal://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/my-agent-identity/subject/ns/default/sa/my-agent`
   - `CONDITION`:

     the condition parameter, formatted as follows:

     ```json
     "condition": {
       "title": "CONDITION_TITLE",
       "description": "CONDITION_DESCRIPTION",
       "expression": "CEL_EXPRESSION"
     }
     ```

     Replace the following:
     - `CONDITION_TITLE`: the title of the condition
     - `CONDITION_DESCRIPTION`: the description of the condition
     - `CEL_EXPRESSION`: the conditional expression. This expresstion must be a valid CEL expression. It must evaluate to `True` for access to be allowed.

2. Bind the IAM policy to IAP.

   ```bash
   gcloud beta iap web set-iam-policy agents-iap-policy.json \
       --project=PROJECT_ID \
       --mcpServer=MCP_SERVER_ID
       --region=REGION
   ```

   Replace the following:
   - `PROJECT_ID`: the project ID of the project that contains the resource. Alternatively, you can bind the policy to a folder or organization, by instead specifying the `--folder` or `--organization` flags, respectively.
   - `MCP_SERVER_ID`: the ID of the MCP server
   - `REGION`: the region where the resource is located

   The following example shows an IAM allow policy that allows
   a DIY agent read-only access a to a tool called `GitHubTool` using an `MCP`
   authorization type.

   ```json
   {
   "policy": {
     "bindings": [
       {
         "role": "roles/iap.egressor",
         "members": [
           "principal://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/my-pool.svc.id.goog/subject/ns/default/sa/my-ae-agent"
         ],
         "condition": {
           "title": "Allow AE Agent Read-Only Egress to GitHub MCP server",
           "expression": "api.getAttribute('iap.googleapis.com/mcp.toolName', '') == 'GitHubTool' && api.getAttribute('iap.googleapis.com/mcp.tool.isReadOnly', false) == true && api.getAttribute('iap.googleapis.com/request.auth.type', '') == 'MCP'"
         }
       }
     ]
   }
   }
   ```

### Create an agent-to-endpoint egress policy

### Console

To define an agent-to-endpoint egress policy by using the Google Cloud console,
do the following:

1.
   In the Google Cloud console, go to the **Policies** page:

   [Go to Policies](https://console.cloud.google.com/agent-platform/policies/iam)
2. To add an IAM allow policy for Agent Gateway egress, click **Add IAM policy**.
3. To select your source agents, do the following:
   - To select all agents in the Agent Registry that are in the currently selected project, select **All agents**.
   - To select a specific agent in the current project, do the following:
     - Select **Individual agent** . To find your agent, search for it by using the filter **Filter** field.
     - Select the source agent that you want to grant access to.
     - To select the agent, click **OK**.
4. In **Access target** , click **Endpoint**.
5. In **Select Endpoint** , select the target Endpoint that you want your source agent to access. To find the Endpoint, search for it by using the filter **Filter** field.
6. To create the IAM allow policy and bind it on the Endpoint, click **Create**.

1. Create a condition:

   1. In **Conditions** , click **Add Condition**.
   2. In the **Add condition** dialog, do the following:
      1. In **Title**, enter the name of the condition.
      2. In **Description**, enter the description of the condition.
      3. To add a condition by using the **Condition builder** , do the following:
         1. In **Condition type** select the condition type from the following:
            - **Name**: agent access is restricted based on the name of the resource being accessed.
            - **ReadOnly**: whether agent access is limited to read data, which prevents write operations by the agent.
            - **Destructive**: whether agents can perform actions that are considered harmful or irreversible, such as deleting resources.
            - **Idempotent**: whether agent access can be overridden.
            - **Open World**: whether the agent can interact with an "open world" of external entities (for example, a web search tool). If you set this condition to \`false\`, agent interaction is considered closed.
         2. In **Operator**, select the Boolean operator.
         3. In **Value**, select the value for the condition.
         4. To add another condition, click **Add another condition**.
         5. To save the condition, click **Save**.
      4. To add a condition by using the **Condition editor**, enter the CEL expression in the text field.

### gcloud

1. Include: Create an IAM allow policy in a JSON-formatted file.

   ```json
   {
     "policy": {
       "bindings": [
         {
           "role": "roles/iap.egressor",
           "members": [
             "AGENT_PRINCIPAL"
           ]
         }
       ]
     }
   }
   ```

   Replace the following:
   - `AGENT_PRINCIPAL`: the principal for the source agent identity, formatted as follows:
     - Vertex AI Agent Engine and Gemini Enterprise agents: `principal://TRUST_DOMAIN/AGENT_UNIQUE_IDENTIFIER`---for example, `principal://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
     - DIY agents: `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/AGENT_SERVICE_ACCOUNT_IDENTIFIER` ---for example, `principal://iam.googleapis.com/projects/1234567890/locations/global/workloadIdentityPools/my-agent-identity/subject/ns/default/sa/my-agent`

2. Bind the IAM policy to IAP.

   ```bash
   gcloud beta iap web set-iam-policy agents-iap-policy.json \
       --project=PROJECT_ID \
       --endpoint=ENDPOINT_ID \
       --region=REGION
   ```

   Replace the following:
   - `PROJECT_ID`: the project ID of the project that contains the resource. Alternatively, you can bind the policy to a folder or organization, by instead specifying the `--folder` or `--organization` flags, respectively.
   - `ENDPOINT_ID`: the ID of the endpoint
   - `REGION`: the region where the resource is located

## Authenticate your Cloud Run MCP server with IAP

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

To configure IAP-based authentication for MCP servers that you
deploy on Cloud Run, do the following:

1. Enable IAP on Cloud Run.

2. Grant the Invoker role to the IAP service agent:

   ```sh
   gcloud beta run services add-iam-policy-binding SERVICE_NAME \
       --member='serviceAccount:service-PROJECT_NUMBER@gcp-sa-iap.iam.gserviceaccount.com' \
       --role='roles/run.invoker'
   ```

   Replace the following:
   - `SERVICE_NAME`: the service name
   - `PROJECT_NUMBER`: the project number

   1. Enable IAP on a new or existing Cloud Run service.

   ### New service

   To deploy a new service, run the following command:

   ```sh
   gcloud beta run deploy SERVICE_NAME \
     --image=CONTAINER_IMAGE \
     --region=REGION \
     --project=PROJECT_ID \
     --allow-unauthenticated \
     --iap \
     --functional-type=mcp-server
   ```

   Replace the following:
   - `SERVICE_NAME`: the service name
   - `CONTAINER_IMAGE`: your container image
   - `REGION`: the region where you deploy your service
   - `PROJECT_ID`: the ID of the project where Cloud Run is enabled.

   ### Existing service

   To update an existing instance, run the following command:

   ```sh
   gcloud run services update SERVICE_NAME \
     --region=REGION \
     --iap \
     --functional-type=mcp-server
   ```

   Replace the following:
   - `SERVICE_NAME`: The service name.
   - `REGION`: The region.
3. Create and configure an OAuth client.

   Follow the instructions at [Sharing OAuth clients for programmatic access](https://docs.cloud.google.com/iap/docs/sharing-oauth-clients) to
   register your OAuth client's universal client ID for use with
   IAP.

   Make sure to record the following values that you obtain when completing
   this step:
   - OAuth Client ID
   - OAuth Client Secret
   - Redirect URI
4. Configure your client like Gemini CLI or your agent to connect your
   deployed MCP server by editing the `settings.json` file that is located in
   your Gemini home directory (`~/.gemini/`).

   The following is a `settings.json` template:

   ```json
   {
     "mcpServers": {
       "my_mcp_server": {
         "httpUrl": "https://SERVICE_URL",
         "oauth": {
           "enabled": "true",
           "clientId": "OAUTH_CLIENT_ID",
           "clientSecret": "OAUTH_CLIENT_SECRET",
           "scopes": [ "email", "openid" ],
           "redirectUri": "REDIRECT_URI"
         }
       }
     }
   }
   ```

   Replace the following:
   - `SERVICE_URL`: Your Cloud Run service URL.
   - `OAUTH_CLIENT_ID`: Client ID from Step 2.
   - `OAUTH_CLIENT_SECRET`: Client Secret from Step 2.
   - `REDIRECT_URI`: The redirect URI, which must match Step 2.
5. Test that you can connect to the MCP server.

## What's next

Overview

### [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview)

Get an overview of Agent Gateway.

Guide

### [Configure content and business policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance)

Learn how to configure content and business policies.

Guide

### [Test policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/test-policies)

Learn how to test policies.
