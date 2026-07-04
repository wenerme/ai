This page describes how to route Gemini Enterprise traffic
through Agent Gateway. Agent Gateway is a central
networking and security component of the
Gemini Enterprise Agent Platform ecosystem. It provides secure and
governed connectivity for all agentic interactions, whether they occur between
users and agents, agents and tools, or among agents themselves.

## Before you begin

- Make sure you are familiar with [Gemini Enterprise concepts](https://docs.cloud.google.com/gemini/enterprise/docs/concepts)
- Learn about [Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview). Note that Agent Gateway only supports Gemini Enterprise in Agent-to-Anywhere (egress) mode. Ingress traffic isn't supported.
- Deploy a Gemini Enterprise app (also referred to as engine). The procedure on this page assumes that you already have an app deployed. For details, see [Create an app](https://docs.cloud.google.com/gemini/enterprise/docs/create-app).

## Permissions required

Grant the Discovery Engine Service Agent (that is, the Google-managed service
account for your project's Gemini Enterprise instance) the
following permissions so that the Discovery Engine Service Agent can discover
resources and route traffic.

- **For Agent Registry:**

  - `agentregistry.agents.list`
  - `agentregistry.agents.search`
  - `agentregistry.agents.get`
  - `agentregistry.mcpServers.list`
  - `agentregistry.mcpServers.search`
  - `agentregistry.mcpServers.get`
- **For Agent Gateway:**

  - `networkservices.agentGateways.list`
  - `networkservices.agentGateways.get`
  - `networkservices.agentGateways.use`

Use the following steps to grant permissions to the Discovery Engine Service Agent.

1. Create a [custom role](https://docs.cloud.google.com/iam/docs/creating-custom-roles) with these permissions.

   ```
   gcloud iam roles create AGENT_GATEWAY_ROLE_NAME \
   --project=PROJECT_ID \
   --title="Custom Agent Gateway and Agent Registry access role" \
   --description="Custom role for Agent Gateway and Agent Registry access" \
   --permissions="agentregistry.agents.list,agentregistry.agents.search,agentregistry.agents.get,agentregistry.mcpServers.list,agentregistry.mcpServers.search,agentregistry.mcpServers.get,networkservices.agentGateways.list,networkservices.agentGateways.get,networkservices.agentGateways.use"
   ```

   Replace the following:
   - `AGENT_GATEWAY_ROLE_NAME`: The name for the custom role.
   - `PROJECT_ID`: The project ID of the project where you deployed the agent.
2. Assign the role to the Gemini Enterprise service account.

   ```
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com" \
     --role="projects/PROJECT_ID/roles/AGENT_GATEWAY_ROLE_NAME"
   ```

   Replace the following:
   - `PROJECT_ID`: Your project ID.
   - `PROJECT_NUMBER`: Your project number.
   - `AGENT_GATEWAY_ROLE_NAME`: The name of the custom role you created.

## Plan your location and Agent Registry mappings

Before you deploy your Agent Gateway, pick the region where you
deploy the gateway and the Agent Registry where you register
your resources. Note the following requirements:

- **Location mapping:** Deploy the Agent Gateway in the specific
  region that corresponds to your Gemini Enterprise app's
  multi-region setup to ensure proper routing.

- **Registry mapping:** Choose either the global, multi-region, or regional
  registry for your deployment. See [Plan your Agent Gateway
  deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw)
  for more guidance on deployment patterns and registry choices.

> [!CAUTION]
> **Caution:** Multi-region `eu` and `us` registries don't support manual registration of agents, endpoints, and MCP servers.

| Gemini Enterprise app location | Required Agent Gateway region | Supported Agent Registry instances for Agent Gateway |
|---|---|---|
| `global` | `us-central1` | Choose *one* of the following: - `global` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/global)` - `us` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/us`) - `us-central1` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/us-central1`) |
| `us` | `us-central1` | Choose *one* of the following: - `global` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/global)` - `us` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/us`) - `us-central1` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/us-central1`) |
| `eu` | `europe-west1` | Choose *one* of the following: - `global` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/global)` - `eu` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/eu`) - `europe-west1` (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/europe-west1`) |
[**Table:** Gemini Enterprise app location and Agent Registry mappings]

## Route Gemini Enterprise traffic through Agent Gateway

> [!IMPORTANT]
> **Important:** Enabling Agent Gateway routes all Gemini Enterprise traffic, including LLM calls, through the gateway. You can then secure this traffic using authorization policies.

To route Gemini Enterprise traffic through
Agent Gateway, perform the following steps:

1. Create an Agent Gateway resource and ensure that you adhere to
   the region and registry you selected in the previous section. For
   instructions, see [Set up
   Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway).

   Verify your gateway configuration. Use the Network Services API to retrieve your
   Agent Gateway configuration and inspect the settings.

   ```
   curl -X GET \
   -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
   "https://networkservices.googleapis.com/v1alpha1/projects/PROJECT_ID/locations/AGENT_GATEWAY_REGION/agentGateways/AGENT_GATEWAY_NAME"
   ```

   Here is an example output for a properly configured gateway:

       {
         "name": "projects/my-ge-project/locations/us-central1/agentGateways/my-egress-gateway",
         "description": "A full configuration for Agent Gateway for Gemini Enterprise egress",
         "googleManaged": {
           "governedAccessPath": "AGENT_TO_ANYWHERE"
         },
         "protocols": [
           "MCP"
         ],
         "registries": [
           "//agentregistry.googleapis.com/projects/my-ge-project/locations/global"
         ]
       }

2. Bind the gateway to your Gemini Enterprise app by using the
   `UpdateEngine` API. Note that completing this step immediately routes all
   existing agent traffic through the specified Agent Gateway.

   ### Console

   1. In the Google Cloud console, go to the **Gemini Enterprise** page.

      [Gemini Enterprise](https://console.cloud.google.com/gemini-enterprise/)
   2. Click the name of the app that you want to associate with an
      Agent Gateway.

   3. Click **Security**.

   4. On the **Configuration** tab, under **Agent Gateway
      configuration** , enter the full resource name for the gateway. Use the
      format:
      `projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME`.

   5. Click **Save**.

   ### REST

   1. Use the following request to update your app.

      ```python
      curl -X PATCH \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      -H "X-Goog-User-Project: PROJECT_ID" \
      -d '{
        "agentGatewaySetting": {
          "defaultEgressAgentGateway": {
            "name": "projects/PROJECT_ID/locations/AGENT_GATEWAY_REGION/agentGateways/AGENT_GATEWAY_NAME"
          }
        }
      }' \
      "https://discoveryengine.googleapis.com/v1/projects/PROJECT_NUMBER/locations/GE_APP_LOCATION/collections/default_collection/engines/GE_APP_ID?updateMask=agentGatewaySetting.defaultEgressAgentGateway.name"
      ```

      Replace the following:
      - `PROJECT_ID`: The project ID.
      - `AGENT_GATEWAY_REGION`: The region of the Agent Gateway.
      - `AGENT_GATEWAY_NAME`: The name of the Agent Gateway.
      - `PROJECT_NUMBER`: The project number.
      - `GE_APP_LOCATION`: The location of the Gemini Enterprise app (for example, `us` or `global`).
      - `GE_APP_ID`: The ID of the Gemini Enterprise app.
   2. To verify the app configuration, use the following command to retrieve
      your configuration and inspect the settings:

      ```
      curl -s -X GET \
      -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
      -H "X-Goog-User-Project: PROJECT_ID" \
      -H "Content-Type: application/json" \
      "https://discoveryengine.googleapis.com/v1/projects/PROJECT_NUMBER/locations/GE_LOCATION/collections/default_collection/engines/GE_APP_ID" \
      | jq '{name: .name, displayName: .displayName, agentGatewaySetting: .agentGatewaySetting}'
      ```

      Here is an example output for a properly configured app:

      ```
      {
      "name": "projects/PROJECT_NUMBER/locations/GE_LOCATION/collections/default_collection/engines/GE_APP_ID",
      "displayName": "GE_APP_ID",
      "agentGatewaySetting": {
        "defaultEgressAgentGateway": {
          "name": "projects/PROJECT_ID/locations/AGENT_GATEWAY_REGION/agentGateways/AGENT_GATEWAY_NAME"
        }
      }
      }
      ```
3. While egress governance is now enabled for your
   Gemini Enterprise app, your app does not automatically know
   which external resources on the Agent Registry it can interact with.

   You must explicitly import the chosen agents, endpoints, and MCP servers into
   your Gemini Enterprise app. The imported resource must be
   referenced using its exact registry-based resource name. For instructions,
   see the following guides:
   - [Import MCP servers from
     Agent Registry](https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/import-govern-mcp-server-agent-registry)
   - [Import A2A agents from
     Agent Registry](https://docs.cloud.google.com/gemini/enterprise/docs/import-govern-agent-registry).
4. To verify that egress is functioning correctly, perform the following steps:

   1. Open the Gemini Enterprise web application.
   2. Submit a query designed to trigger an external tool (for example, "Give me a list of recent issues from GitHub").
   3. Monitor the execution to ensure the response is successfully retrieved. Behind the scenes, the Gemini Enterprise agent packages the request, routes it through your Agent Gateway (which enforces any configured authorization policies), and retrieves the response from the destination.

## Restrict Gemini Enterprise binding to approved Agent Gateways

You can create custom organization policy constraints to restrict whether
a Gemini Enterprise app can bind to any or all
Agent Gateways.

### Create custom organization policy constraints

This example creates a custom constraint that blocks all bindings between
Gemini Enterprise apps and Agent Gateways.

### Agent-to-Anywhere

1. To define a custom constraint for Agent-to-Anywhere mode (egress), create a
   file named `constraint-agent-gateway-egress.yaml`.

   The following example shows you how to enforce strict network isolation by
   disallowing any bindings. The `condition` field specifies that the
   operation is denied if an Agent Gateway resource is
   specified (field is present and not empty).

   ```yaml
   name: organizations/ORGANIZATION_ID/customConstraints/custom.disallowGeminiEnterpriseAgentGatewayBinding
   resource_types:
   – discoveryengine.googleapis.com/Engine
   condition: >-
   has(resource.agentGatewaySetting.defaultEgressAgentGateway.name) &&
   resource.agentGatewaySetting.defaultEgressAgentGateway.name != ''
   actionType: DENY
   displayName: "Disallow all Agent Gateway Bindings for Discovery Engines"
   description: "To enforce strict network isolation, Discovery Engines are not permitted to bind to any Agent Gateway."
   ```

   Replace the following:
   - <var translate="no">ORGANIZATION_ID</var>: your organization ID.
   - <var translate="no">PROJECT_ID</var>: your project ID.
   - <var translate="no">REGION</var>: the region where the gateway was created.
   - <var translate="no">AGENT_GATEWAY_NAME</var>: your gateway name.
2. Apply the custom constraint.

   ```
   gcloud org-policies set-custom-constraint EGRESS_CONSTRAINT_PATH
   ```

   Replace <var translate="no">EGRESS_CONSTRAINT_PATH</var> with the full path to the custom
   constraint file created in the previous step.
3. Create the organization policy to enforce the constraint. To define the
   organization policy, create a policy YAML file named
   `policy-agent-gateway-egress.yaml`. In this example we enforce this
   constraint at the project level but you might also set this at the
   organization or folder level.

   ```yaml
   name: projects/PROJECT_ID/policies/custom.disallowGeminiEnterpriseAgentGatewayBinding
   spec:
   rules:
   – enforce: true
   ```

   Replace `PROJECT_ID` with your project ID.
4. Enforce the organization policy.

   ```
   gcloud org-policies set-policy EGRESS_POLICY_PATH
   ```

   Replace <var translate="no">EGRESS_POLICY_PATH</var> with the full path to the organization policy
   YAML file created in the previous step. The policy requires up to 15 minutes
   to take effect.

For more information about how to use custom organization policy constraints,
see [Create custom constraints](https://docs.cloud.google.com/organization-policy/create-custom-constraints).

## What's next

Codelab

### [Codelab: Govern agentic workloads with Agent Platform](https://codelabs.developers.google.com/cloudnet-agent-gateway)

Learn how to govern agentic workloads with Agent Gateway on Gemini Enterprise Agent Platform.

Guide

### [Delegate authorization for Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization)

Learn how to delegate authorization for Agent Gateway to IAP, Model Armor, or your own custom authorization service.

Guide

### [Monitor Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway)

Learn how to monitor Agent Gateway.

Troubleshooting

### [Troubleshoot Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/troubleshoot-agent-gateway)

Learn how to troubleshoot Agent Gateway connectivity.
