To centralize access control and secure connectivity across your agentic
workflows, you can set up an Agent Gateway resource to manage ingress
or egress traffic.

Before you set up a gateway, review the conceptual basics and core
components in the [Agent Gateway
overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview).

## Required permissions

The following permissions are required to create and manage
Agent Gateways. You can get these permissions either
with [custom roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or by using other
[predefined roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

#### Required permissions

- `compute.networkAttachments.list`
- `compute.regions.list`
- `modelarmor.templates.list`
- `modelarmor.templates.list`
- `networksecurity.authzPolicies.create`
- `networksecurity.authzPolicies.delete`
- `networksecurity.authzPolicies.get`
- `networksecurity.authzPolicies.list`
- `networksecurity.operations.get`
- `networkservices.agentGateways.create`
- `networkservices.agentGateways.delete`
- `networkservices.agentGateways.get`
- `networkservices.agentGateways.list`
- `networkservices.agentGateways.update`
- `networkservices.agentGateways.use`
- `networkservices.authzExtensions.create`
- `networkservices.authzExtensions.delete`
- `networkservices.authzExtensions.get`
- `networkservices.authzExtensions.list`
- `networkservices.authzExtensions.update`
- `networkservices.authzExtensions.use`
- `networkservices.operations.get`

## Required APIs

Enable the following APIs in the Google Cloud project that you are using
for this guide. These APIs let you access the full suite of capabilities offered
by Gemini Enterprise Agent Platform.

#### Required APIs

- Compute Engine API (`compute.googleapis.com`)
- Network Security API (`networksecurity.googleapis.com`)
- Network Services API (`networkservices.googleapis.com`)
- Cloud DNS API (`dns.googleapis.com`)
- Identity and Access Management API (`iam.googleapis.com`)
- Agent Registry API (`agentregistry.googleapis.com`)
- Vertex AI API (`aiplatform.googleapis.com`)
- Discovery Engine API (`discoveryengine.googleapis.com`)
- Cloud Storage API (`storage.googleapis.com`)
- Model Armor API (`modelarmor.googleapis.com`)
- Observability API (`observability.googleapis.com`)
- Telemetry API (`telemetry.googleapis.com`)
- Cloud Monitoring API (`monitoring.googleapis.com`)
- Cloud Trace API (`cloudtrace.googleapis.com`)
- Cloud Logging API (`logging.googleapis.com`)
- App Hub API (`apphub.googleapis.com`)
- App Topology API (`apptopology.googleapis.com`)
- Cloud API Registry (`cloudapiregistry.googleapis.com`)
- Notebooks API (`notebooks.googleapis.com`)
- Text-to-Speech API (`texttospeech.googleapis.com`)
- Dataform API (`dataform.googleapis.com`)

## Plan your Agent Gateway deployment

Use this section to plan your Agent Gateway deployment and
understand the requirements for the setup to work. The following sections
outline the essential components, but they *don't represent a strict order of
steps*. You can register endpoints and MCP servers, and assign roles to the
agent, either during initial setup or on an ongoing basis as more
requirements arise.

### Choose your deployment mode

Agent Gateway supports two deployment modes:

- **Client-to-Agent (ingress)**: Secures communications from clients to your agents running on Google Cloud.
- **Agent-to-Anywhere (egress)**: Secures communications from your agents to external targets, public APIs, and MCP servers.

### Select your runtime and region of deployment

Agent Gateway governs traffic from agents running on
Gemini Enterprise and Runtime. To centralize
governance of agents across Gemini Enterprise and
Runtime, you can use a single Agent Gateway.
Alternatively, you can also deploy independent Agent Gateway
instances for Gemini Enterprise and Runtime.

Note that the Gemini Enterprise app, Runtime
agents, Agent Gateway, and its associated
Agent Registry all need to be in the same Google Cloud
project.

Here are some sample deployment patterns for your consideration:

Pattern 1: Centralized governance for Gemini Enterprise and Runtime agents

:   Your Gemini Enterprise app is deployed as a multi-region
    deployment (in either `us` or `eu`) while all the other resources
    (Runtime, Agent Gateway, and
    Agent Registry) are deployed within a single region
    corresponding to the Gemini Enterprise multi-region setup.

    In such a deployment, both the Gemini Enterprise app and
    Runtime route their traffic through a single, local
    Agent Gateway directly to the final destination.

    | Gemini Enterprise app location | Runtime region | Agent Gateway region | Agent Registry instance^1^ |
    |---|---|---|---|
    | `global` or `us` | `us-central1` | `us-central1` | The single Agent Gateway must be associated with the `us-central1` registry. |
    | `eu` | `europe-west1` | `europe-west1` | The single Agent Gateway must be associated with the `europe-west1` registry. |

    ^1^ For the agent to communicate with endpoints and servers, including Google Cloud MCP servers, you must manually register them with the regional Agent Registry instance.

Pattern 2: Independent governance for Gemini Enterprise (using Google Cloud MCP servers) and Runtime agents

:   Your Gemini Enterprise app is deployed as a multi-region
    deployment (in either `global`, `us`, or `eu`) while Runtime agents
    are deployed in separate regions as needed. Agent Gateway
    instances are deployed in each region where runtimes are located.

    This pattern ensures regional isolation, with each region having a dedicated
    Agent Gateway to monitor and govern agent traffic.

    | Gemini Enterprise app location | Runtime region | Agent Gateway region | Agent Registry instance^1^ |
    |---|---|---|---|
    | `global` | Any region | One Agent Gateway in `us-central1` for Gemini Enterprise An Agent Gateway in each region where you want to govern Runtime agents | The Agent Gateway for Gemini Enterprise must be associated with the `global` registry. The Agent Gateway for Runtime must be associated with the corresponding regional registry. |
    | `us` | Any region | One Agent Gateway in `us-central1` for Gemini Enterprise An Agent Gateway in each region where you want to govern Runtime agents | The Agent Gateway for Gemini Enterprise must be associated with the `global` registry. The Agent Gateway for Runtime must be associated with the corresponding regional registry. |
    | `eu` | Any region | One Agent Gateway in `europe-west1` for Gemini Enterprise An Agent Gateway in each region where you want to govern Runtime agents | The Agent Gateway for Gemini Enterprise must be associated with the `global` registry. The Agent Gateway for Runtime must be associated with the corresponding regional registry. |

    ^1^ You must manually register your Runtime agents with the global Agent Registry instance to be able to govern connectivity between the Gemini Enterprise app and the Runtime agent.

Pattern 3: Independent governance for Gemini Enterprise, Google Workspace, and Runtime agents

:   Your Gemini Enterprise, Google Workspace and
    Runtime agents are deployed as multi-region or regional
    deployments as needed. The Agent Gateway instances are deployed
    in each region where runtimes are located.

    If your Google Workspace agents are multi-region, you'll need to associate
    the multi-region registry with Agent Gateway as shown in the
    following table.

    > [!CAUTION]
    > **Caution:** Multi-region `eu` and `us` registries don't support manual registration of agents, endpoints, and MCP servers.

    | Gemini Enterprise app and Google Workspace location | Runtime region | Agent Gateway region | Agent Registry instance |
    |---|---|---|---|
    | `us` | Any region | One Agent Gateway in `us-central1` for Gemini Enterprise and Google Workspace An Agent Gateway in each region where you want to govern Runtime agents | The Agent Gateway for Gemini Enterprise and Google Workspace must be associated with the `us` registry. The Agent Gateway for Runtime must be associated with the corresponding regional registry. |
    | `eu` | Any region | One Agent Gateway in `europe-west1` for Gemini Enterprise and Google Workspace An Agent Gateway in each region where you want to govern Runtime agents | The Agent Gateway for Gemini Enterprise and Google Workspace must be associated with the `eu` registry. The Agent Gateway for Runtime must be associated with the corresponding regional registry. |

### Register your agents, endpoints, servers, and tools

To enable secure communication, you must identify your
Agent Registry instance and register the resources that your
gateway will govern.

1. Identify the Agent Registry instance that you will be using.

   - For Agent Runtime, you reference the regional registry (`//agentregistry.googleapis.com/projects/PROJECT_ID/locations/REGION`) in the same project and region where the Agent Runtime agents are deployed and where the gateway will be deployed.
   - For Gemini Enterprise, you reference either the global, multi-region, or regional registry in the same project where the Gemini Enterprise agents are deployed and where the gateway will be deployed. See the [Plan your deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw) section for guidance on which registry is suitable for your deployment.
2. Register your agents with Agent Registry. If you haven't
   already created the agent, you must complete this step later. For
   instructions, see [Register agents](https://docs.cloud.google.com/agent-registry/register-agents).

3. Identify and register all tools, MCP servers, and API endpoints your
   agents will call. Registering these resources is required because
   Agent Gateway blocks all outbound traffic to hosts not
   registered in Agent Registry.

   For instructions, see the following guides:
   - [Register MCP servers](https://docs.cloud.google.com/agent-registry/register-mcp-servers)
   - [Register endpoints](https://docs.cloud.google.com/agent-registry/register-endpoints)

### Configure access control mechanisms

Every Agent Gateway requires an associated authorization policy.

IAP

:   By default, Agent Gateway uses
    IAP to authenticate agents, endpoints, and servers by using
    the policies defined in Identity and Access Management (IAM).

    To validate your configuration without blocking traffic, we recommend that
    you deploy IAP in dry-run mode initially.

Model Armor

:   (Optional) If your deployment requires
    safeguarding against prompt injection attacks, jailbreaks, toxic content, or
    sensitive data leakage, you should plan your Model Armor
    guardrail integration and create templates with the safety filters you require.

    For more information, see the following documents:

    - [Configure Model Armor on a
      gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/configure-model-armor)
    - [Delegate authorization using
      Service Extensions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#model-armor)

Semantic Governance Policies

:   (Optional) You can opt to add natural language-based context-aware controls on
    your agents to enable protections against toxic combinations of tools.

    We recommend that you start by deploying Semantic Governance Policies in
    dry-run mode so that you can validate your configuration without blocking
    traffic. For details, see [Configure semantic governance
    policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance).

Custom authorization engines

:   (Optional) If you want to delegate authorization to custom authorization
    engines or third party systems by using Service Extensions, you
    should ensure that the custom authorization engines are available when
    deploying the gateway.

Model Armor, Semantic Governance Policies, and any other custom
authorization engines can be enabled either during initial
Agent Gateway setup or attached post-deployment as an incremental
security policy update.

### Set up agent identity and permissions

The following steps are required to enable communications between the agent
and the registered endpoints and MCP servers:

1. Create an agent identity for your agent. You can do this during
   deployment or after the agent is deployed. For instructions, see [Use
   Agent Identity with
   Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity).

2. Grant the agent identity principal the `roles/iap.egressor` (IAP-secured
   Egressor) role for each of the endpoints and servers you registered in
   Agent Registry.

   You can grant this role at either the registry level or the individual
   resource level. Because registries can be global or regional, ensure that
   any registry-wide binding matches the agent type:
   - For Gemini Enterprise agents, use the global registry.
   - For Agent Runtime agents, use a regional registry.

   Agent Gateway checks specifically for the
   `iap.webServiceVersions.egressViaIAP` permission, which is only granted
   by the `roles/iap.egressor` role. By default, all egress traffic is
   denied unless explicitly allowed by this IAM policy.

   For instructions, see [Create IAM agent
   policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam).

## Configure Agent Gateway in Agent-to-Anywhere (egress) mode

> [!NOTE]
> **Note:** For an end-to-end codelab that explores how to govern communications initiated by an agent on Gemini Enterprise Agent Platform, see [Codelab: Govern agentic workloads with Agent
> Platform](https://codelabs.developers.google.com/cloudnet-agent-gateway).

This section shows you how to set up an Agent Gateway for
[Agent-to-Anywhere](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview#modes) communications.

Use the following steps to create an Agent Gateway resource.

### Google Cloud console

1. In the Google Cloud console, go to the **Agent Gateway** page.

   [Go to Gateways](https://console.cloud.google.com/agent-platform/gateways)
2. Click **Add gateway**.
3. Enter a **Name**.
4. From the **Region** list, select a region.
5. For **Deployment mode** , verify that **Google-managed** is selected.
6. For **Agent Registry** , select a registry from the list. For guidance on which registry to choose for your deployment, see [Plan your
   Agent Gateway deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw).
7. From the **Governed Access Path** list, select **Agent-to-Anywhere (Agent Egress)**.
8. In the **Access Authorization** section, choose how traffic is
   handled by IAP:

   - To deploy the gateway in a dry-run mode where the gateway permits all traffic through and only generates [audit logs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway), select **Audit-only**. Your IAM policies are not enforced by IAP in dry-run mode. Once you gain confidence, you can disable dry-run mode to enforce IAM policies.
   - To block requests that don't have an explicit `Allow` IAM policy, select **Enforce policies**. This option is recommended for production environments.
9. Optional: In the **AI Security** section, configure
   additional security:

   1. To protect AI model interactions with Model Armor, turn on **Enable Model Armor**.
   2. Select a [template](https://docs.cloud.google.com/model-armor/manage-templates) that applies to incoming requests to the gateway from the list.
   3. To use a different template for responses, clear **Use same template for
      requests and responses** and select a template from the list.

      > [!IMPORTANT]
      > **Important:** When you're using Model Armor, you must grant the Agent Gateway service account the permissions required to be able to use the Model Armor templates. For details, see [Delegate authorization to
      > Model Armor](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#configure-authz-ma).

10. Click **Add Gateway**.

### gcloud

You define Agent Gateways declaratively using YAML.

1. Define the resource and save the configuration to a YAML file. For this
   example, we use `my-agent-gateway-egress.yaml`.

       name: AGENT_GATEWAY_NAME
       protocols:
         - MCP
       googleManaged:
         governedAccessPath: AGENT_TO_ANYWHERE
       registries:
         - AGENT_REGISTRY_PATH

   Replace the following:
   - `AGENT_GATEWAY_NAME`: The name of the Agent Gateway resource.
   - `AGENT_REGISTRY_PATH`: The path to the Agent Registry. For guidance on which registry to choose for your deployment, see [Plan your Agent Gateway
     deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw).
2. Run the following command to create an Agent Gateway resource based on the
   YAML specification:

   ```
   gcloud network-services agent-gateways import AGENT_GATEWAY_NAME \
    --source="my-agent-gateway-egress.yaml" \
    --location=LOCATION
   ```

   Replace `LOCATION` with the location where you want
   to create the Agent Gateway resource. For example,
   `us-central1`.

   Note that for Gemini Enterprise, you must deploy
   Agent Gateway in a region that corresponds to your
   multi-region setup. For the supported location mappings, see [Route
   Gemini Enterprise traffic through
   Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-ge-deploy#route-traffic).
3. Create an authorization policy to enforce centralized access control and
   governance policies on traffic passing through the
   Agent Gateway. The following steps show you how to configure
   an authorization policy that uses IAP.

   1. Configure an authorization extension that points to IAP.
      Define the extension in a YAML file, such as
      `iap-request-authz-extension.yaml`.

      To validate the policy configuration and routing without disrupting
      traffic, we recommend that you first deploy the extension in dry-run
      (audit-only) mode. To do this, you specify `DRY_RUN` in the
      `iamEnforcementMode` field as shown in the example.

          cat >iap-request-authz-extension.yaml <<EOF
          name: AUTHORIZATION_EXTENSION_NAME
          service: iap.googleapis.com
          failOpen: true
          timeout: 1s
          metadata:
            iamEnforcementMode: "DRY_RUN"
            iapPolicyVersion: "V1"
          EOF

   2. Import the YAML configuration file to an authorization extension.

      ```
      gcloud beta service-extensions authz-extensions import AUTHORIZATION_EXTENSION_NAME \
        --source=iap-request-authz-extension.yaml \
        --location=LOCATION
      ```

      Replace `AUTHORIZATION_EXTENSION_NAME` with the
      name of the authorization extension---for example,
      `my-iap-request-authz-ext`.
   3. Define an authorization policy in a YAML file, such as
      `iap-request-authz-policy.yaml`, to associate the extension with
      your gateway:

          cat >iap-request-authz-policy.yaml <<EOF
          name: AUTHORIZATION_POLICY_NAME
          target:
            resources:
              - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
          policyProfile: REQUEST_AUTHZ
          action: CUSTOM
          customProvider:
            authzExtension:
              resources:
                - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/AUTHORIZATION_EXTENSION_NAME"
          EOF

      Replace the following:
      - `AUTHORIZATION_POLICY_NAME`: the name of the authorization policy---for example, `my-iap-request-authz-policy`
      - `PROJECT_ID`: the [project
        ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects)
   4. Import the YAML configuration file to an authorization policy.

      ```
      gcloud beta network-security authz-policies import AUTHORIZATION_POLICY_NAME \
        --source=iap-request-authz-policy.yaml \
        --location=LOCATION
      ```
4. Optional: If you want to configure Model Armor guardrails to
   help protect your deployment against prompt injection attacks and sensitive
   data leaks, see [Delegate authorization to
   Model Armor](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#model_armor).

After an Agent Gateway has been created, it serves as the primary
connection point for routing agent traffic within your project and chosen
region. You can now use this endpoint to establish secure, encrypted, and
authenticated communication channels between agents and their destinations
(tools, other agents, or other endpoints).

Next, learn how to [deploy agents and route traffic through
Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#route-traffic).

### Optional: Configure VPC connectivity

To learn how to configure your Agent Gateway so that it can
privately communicate with a VPC network in your organization,
see [Set up VPC connectivity for
Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-vpc-connectivity).

## Configure Agent Gateway in Client-to-Agent (ingress) mode

This section shows you how to set up an Agent Gateway for
[Client-to-Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview#modes) communications.

Use the following steps to create an Agent Gateway resource.

### Google Cloud console

1. In the Google Cloud console, go to the **Agent Gateway** page.

   [Go to Gateways](https://console.cloud.google.com/agent-platform/gateways)
2. Click **Add gateway**.
3. Enter a **Name**.
4. From the **Region** list, select a region.
5. For **Deployment mode** , verify that **Google-managed** is selected.
6. Leave the **Agent registry** setting as is. The registry isn't used for ingress.
7. From the **Governed Access Path** list, select **Client-to-Agent (ingress)**.
8. Optional: In the **AI Security** section, configure
   additional security:

   1. To protect AI model interactions with Model Armor,
      turn on **Enable Model Armor**.

      > [!NOTE]
      > **Note:** If your Model Armor templates are in a different project from the gateway, you'll need to manually grant certain permissions to the Agent Gateway service account. For details, see [Delegate authorization to
      > Model Armor](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#configure-authz-ma).

   2. Select a [template](https://docs.cloud.google.com/model-armor/manage-templates) that applies to
      incoming requests to the gateway from the list.

   3. To use a different template for responses, clear **Use same template for
      requests and responses** and select a template from the list.

9. Click **Add Gateway**.

### gcloud

You define Agent Gateways declaratively using YAML.

1. Define the resource and save the configuration to a YAML file. For this
   example, we use `my-agent-gateway-ingress.yaml`.

       name: AGENT_GATEWAY_NAME
       protocols:
         - MCP
       googleManaged:
         governedAccessPath: CLIENT_TO_AGENT

   Replace <var translate="no">AGENT_GATEWAY_NAME</var> with a name for the
   Agent Gateway resource.
2. Run the following command to create an Agent Gateway resource based on the
   YAML specification:

   ```
   gcloud network-services agent-gateways import AGENT_GATEWAY_NAME \
    --source="my-agent-gateway-ingress.yaml" \
    --location=LOCATION
   ```

   Replace `LOCATION` with the location where you want
   to create the Agent Gateway resource. For example,
   `us-central1`.

After an Agent Gateway has been created, it serves as the primary
connection point for routing traffic to agents in your project and chosen
region.

Next, learn how to deploy agents and route traffic through Agent Gateway.

## Deploy agents and route traffic through Agent Gateway

To deploy a Agent Runtime agent that routes traffic through
Agent Gateway, see [Route traffic through
Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy).

To deploy a Gemini Enterprise agent that routes traffic through
Agent Gateway, see [Route Gemini Enterprise traffic
through Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-ge-deploy).

## What's next

Guide

### [Route Agent Runtime traffic through Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy)

Learn how to route Agent Runtime traffic through Agent Gateway for secure and governed connectivity.

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

Guide

### [Route Gemini Enterprise traffic through Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-ge-deploy)

Learn how to route Gemini Enterprise traffic through Agent Gateway.
