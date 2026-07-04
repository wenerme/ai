This page describes how to route Agent Runtime traffic through
Agent Gateway. Agent Gateway is a central networking and
security component of the Gemini Enterprise Agent Platform ecosystem.
It provides secure and governed connectivity for all agentic interactions,
whether they occur between users and agents, agents and tools, or among agents
themselves.

## Before you begin

- Make sure you are familiar with [deploying agents on
  Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent).

- Learn about
  [Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview).
  You can use Agent Gateway in Agent-to-Anywhere (egress) mode to
  secure and govern all outbound communications with outbound traffic to tools,
  models, APIs, and other agents. You use the gateway in Client-to-Agent
  (ingress) mode to control which clients can access your agents. The gateway
  lets you choose which IAP policies and
  Model Armor templates must be applied to these interactions.

  A single Runtime instance can bind to both an Agent-to-Anywhere
  (egress) gateway and a Client-to-Agent (ingress) gateway simultaneously.

### Limitations

- An Agent Gateway can't be bound to Runtime Reasoning Engines created before April 29, 2026.
- While a single project and region can host multiple Agent-to-Anywhere (egress)
  and Client-to-Agent (ingress) Agent Gateway instances, all
  Agent Runtime agents deployed within that same project and region must bind
  to the same specific egress and ingress Agent Gateway
  instances.

  For example, if a project and region contains `egress-gateway-X` and
  `egress-gateway-Y`, all agents in that project and region must be configured
  to use the same gateway for egress. That is, either all agents use
  `egress-gateway-X` or all agents use `egress-gateway-Y`. You can't configure
  `agent-A` to use `egress-gateway-X` and `agent-B` to use `egress-gateway-Y`.

  This same binding rule applies to ingress gateways within a project and region
  as well.
- The [Security Command Center Agent Engine Threat Detection
  service](https://docs.cloud.google.com/security-command-center/docs/agent-platform-threat-detection-overview)
  isn't available when Agent Gateway is enabled for an agent.

- In Client-to-Agent (ingress) mode, Agent Gateway can only
  govern Agent Runtime's `query` and `streamQuery` methods. To protect other
  unsupported methods (such as `asyncQuery`), you can
  apply Model Armor templates directly from your application or
  agent. See [Sanitize prompts and
  responses](https://docs.cloud.google.com/model-armor/sanitize-prompts-responses) or this codelab on
  [Building a secure agent system with
  Model Armor](https://codelabs.developers.google.com/secure-agent-modelarmor).

## Route Agent Runtime traffic through Agent Gateway

To route Agent Runtime traffic through Agent Gateway, perform
the following steps:

1. Create an Agent Gateway resource and attach any authorization
   policies as needed. You can create a gateway either
   in Agent-to-Anywhere (egress) mode or Client-to-Agent (ingress) mode. Note
   that the agent and the gateway must be created in the same project and
   region. For instructions, see [Set up
   Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway).

   Ensure that the gateway is configured to meet your deployment's needs. For
   example, if your agent requires LLM access, configure the gateway to allow
   this access to prevent potential Agent Runtime deployment failures.
2. Configure your agent to route traffic through Agent Gateway.

   - **For new agents**

     Specify the gateway resource while deploying your agent. For example, to
     deploy the agent on Agent Runtime, use `client.agent_engines.create` to
     pass in the `local_agent` object along with any
     [optional configurations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#configure-agent).

     You must also make sure the Runtime instance is assigned an
     [agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity) by using the
     `identity_type` parameter as shown in this example.

     ```python
     remote_agent = client.agent_engines.create(
       agent=local_agent,
       config={
           "agent_gateway_config": {
             "agent_to_anywhere_config": {"agent_gateway": projects/PROJECT_ID/locations/REGION/agentGateways/AGENT_GATEWAY_TO_ANYWHERE_NAME},
             # "client_to_agent_config": {"agent_gateway": projects/PROJECT_ID/locations/REGION/agentGateways/AGENT_GATEWAY_CLIENT_TO_AGENT_NAME}
           },
           "identity_type": types.IdentityType.AGENT_IDENTITY,
           # Other optional configuration ...
           # "requirements": requirements,
           # "gcs_dir_name": gcs_dir_name,
           # https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity#opt-out-caa
           "env_vars": {
             "GOOGLE_API_PREVENT_AGENT_TOKEN_SHARING_FOR_GCP_SERVICES": False,
           }
       },
     )
     ```

     Replace `AGENT_GATEWAY_TO_ANYWHERE_NAME` with the
     name of the Agent Gateway you created in Agent-to-Anywhere
     (egress) mode.

     If you created a gateway in Client-to-Agent (ingress) mode, use the
     `client_to_agent_config` field instead and replace
     `AGENT_GATEWAY_CLIENT_TO_AGENT_NAME` with the name
     of the Agent Gateway you created for ingress.
   - **For existing agents**

     ### Agent-to-Anywhere

     Use the following REST API request to associate an existing agent with an
     **Agent-to-Anywhere gateway** for egress.

     ```yaml
     curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "spec": {
         "deploymentSpec": {
           "agentGatewayConfig": {
             "agentToAnywhereConfig": {
               "agentGateway": "projects/PROJECT_ID/locations/REGION/agentGateways/AGENT_GATEWAY_TO_ANYWHERE_NAME"
             }
           }
         }
       }
     }' \
     "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/reasoningEngines/RESOURCE_ID?updateMask=spec.deploymentSpec.agentGatewayConfig"
     ```

     Replace the following:
     - `PROJECT_ID`: the project ID
     - `REGION`: the region where the agent is deployed
     - `AGENT_GATEWAY_TO_ANYWHERE_NAME`: the name of the Agent Gateway you created in Agent-to-Anywhere (egress) mode
     - `RESOURCE_ID`: the [resource
       ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#resource-identifier) of the agent

     ### Client-to-Agent

     Use the following REST API request to associate an existing agent with an
     **Client-to-Agent gateway** for ingress.

     ```yaml
     curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
       "spec": {
         "deploymentSpec": {
           "agentGatewayConfig": {
             "clientToAgentConfig": {
               "agentGateway": "projects/PROJECT_ID/locations/REGION/agentGateways/AGENT_GATEWAY_CLIENT_TO_AGENT_NAME"
             }
           }
         }
       }
     }' \
     "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/reasoningEngines/RESOURCE_ID?updateMask=spec.deploymentSpec.agentGatewayConfig"
     ```

     Replace the following:
     - `PROJECT_ID`: the project ID
     - `REGION`: the region where the agent is deployed
     - `AGENT_GATEWAY_CLIENT_TO_AGENT_NAME`: the name of the Agent Gateway you created in Client-to-Agent (ingress)
     - `RESOURCE_ID`: the [resource ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#resource-identifier) of the agent
3. Register with the Agent Registry instance in the same
   project and region as the agent and the gateway.

   ```
   gcloud agent-registry services create SERVICE_NAME \
     --project=PROJECT_ID \
     --location=REGION \
     --display-name="DISPLAY_NAME" \
     --endpoint-spec-type=no-spec \
     --interfaces='[{url="https://REGION-aiplatform.mtls.googleapis.com",protocolBinding="jsonrpc"}]' \
     --format="value(registryResource)"
   ```

   Replace the following:
   - `SERVICE_NAME`: The name you want to give to your resource, for example, `allow-aiplatform-region-eu3`.
   - `PROJECT_ID`: The project ID.
   - `REGION`: The registry region.
   - `DISPLAY_NAME`: The human-readable name of the endpoint.

   For more information, see
   [Register an agent](https://docs.cloud.google.com/agent-registry/register-endpoints).
4. Create an agent-to-registry IAM policy binding for the agent.

   ```
   gcloud iap web add-iam-policy-binding \
     --resource-type=agent-registry \
     --endpoint=ENDPOINT_ID \
     --region=REGION \
     --project=PROJECT_ID \
     --member=MEMBER \
     --role=roles/iap.egressor
   ```

   Replace the following:
   - `ENDPOINT_ID`: The service endpoint ID of the registered agent. You get this from the output of the previous step.
   - `MEMBER`: The agent identity principal to grant the
     role to. The format is typically:
     `principal://TRUST_DOMAIN/resources/aiplatform/projects/PROJECT_ID/locations/REGION/reasoningEngines/ENGINE_ID`.

     > [!NOTE]
     > **Note:** If you want to bind all the agents in a project to a registry (including all Runtime agents, Gemini Enterprise agents, and any other agents created in the future), you can bind the IAM policy to `principal://TRUST_DOMAIN/attribute.container/projects/PROJECT_ID`.

5. At this point your agent traffic will now be directed through the
   Agent Gateway. However, Agent Gateway adopts a
   *default deny* policy. To enable certain
   Agent Platform functions, you must ensure
   that the agent can communicate with the following endpoints:

   - If Cloud Trace is enabled, Agent Gateway must allow
     traffic to endpoint `https://telemetry.googleapis.com/`.

     If the `GOOGLE_API_USE_CLIENT_CERTIFICATE` and
     `GOOGLE_API_USE_MTLS_ENDPOINT` environment variables are set, then ensure
     that traffic to `https://telemetry.mtls.googleapis.com/` is also allowed.
   - If Cloud Logging is enabled, Agent Gateway must allow
     traffic to endpoint `https://logging.googleapis.com/`.

     If the `GOOGLE_API_USE_CLIENT_CERTIFICATE` and
     `GOOGLE_API_USE_MTLS_ENDPOINT` environment variables are set, then ensure
     that traffic to `https://logging.mtls.googleapis.com/` is also allowed.

   Additionally, if your agents are calling LLMs, or use features such as
   [Sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions) and [Memory
   Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank), you must ensure
   that the agents can communicate with the endpoints used by these services.
   For example:
   - For Sessions: `https://REGION-aiplatform.googleapis.com/API_VERSION/projects/PROJECT_ID/locations/REGION/reasoningEngines/RESOURCE_ID/sessions`
   - For Memory Bank: `https://REGION-aiplatform.googleapis.com/API_VERSION/projects/PROJECT_ID/locations/REGION/reasoningEngines/RESOURCE_ID/memories`

   For security reasons, we recommend that you register and allowlist only the
   specific URIs that the agent accesses. Because the gateway matches hostnames
   directly, you must ensure that you register all the variants that the agent
   SDK uses. For example, depending on the SDK version, regional client
   configuration, or mTLS usage, a Google API can resolve through the following
   endpoint hostnames:
   - `https://REGION-aiplatform.googleapis.com`
   - `https://REGION-aiplatform.mtls.googleapis.com`
   - `https://aiplatform.REGION.rep.googleapis.com`

   > [!CAUTION]
   > **Caution:** While you can register a base URI (such as `https://REGION-aiplatform.googleapis.com/`) for convenience, doing so provides a broad access policy that lets the agent access any service under that domain. Note that even if you register a base URI, you are still required to register all its regional and mTLS variants.

   To learn how to register endpoints, see [Register
   endpoints](https://docs.cloud.google.com/agent-registry/register-endpoints). You must also ensure that
   the agent has the IAP Egressor role for these endpoints. For
   instructions, see [Create an agent-to-endpoint egress
   policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-endpoint).
6. Verify your agent configuration.

   ### Console

   1. In the Google Cloud console, go to the Agent Platform **Deployments** page.

      [Go to Deployments](https://console.cloud.google.com/agent-platform/runtimes)
   2. Click the name of the agent you deployed.

   3. Click **Service configuration** . The **Observability** pane for
      the agent opens.

   4. Click **Deployment details** . The Agent Gateway ingress
      and egress configurations are available under the **Deployment
      spec** field.

   ### gcloud

   Use the following REST API request to validate that the agent is now
   associated with the gateway. If the output returned is `null`, that means
   Runtime has failed to bind to the gateway.

   ```yaml
   curl -s -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://REGION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/REGION/reasoningEngines/RESOURCE_ID" \
     | jq '.spec.deploymentSpec.agentGatewayConfig'
   ```

   Replace the following:
   - `PROJECT_ID`: the project ID
   - `REGION`: the region where the agent is deployed
   - `RESOURCE_ID`: the [resource ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#resource-identifier) of the agent

## Restrict Agent Runtime to approved Agent Gateways

You can create custom organization policy constraints to define the set
of eligible Agent Gateway resources that can be used while
deploying agents.

> [!NOTE]
> **Note:** VPC Service Controls are not supported with Agent Gateway. However, if VPC Service Controls are enforced on the project, then these organization policies are required to ensure that agents only use sanctioned egress paths, preventing data exfiltration through unauthorized gateways.

### Create custom organization policy constraints

This example creates custom constraints that only allow traffic to and from a
pre-approved list of gateways.

### Agent-to-Anywhere

1. To define a custom constraint for Agent-to-Anywhere mode (egress), create a
   file named `constraint-agent-gateway-egress.yaml`.

   In the following example, the `condition` field specifies that the operation
   is allowed only if an Agent Gateway resource is specified
   (field is present and not empty) and if the specified gateway is in the
   pre-approved list.

       name: organizations/ORGANIZATION_ID/customConstraints/custom.allowlistedEgressAgentGatewaysForAgentEngine
       resource_types:
       - aiplatform.googleapis.com/ReasoningEngine
       condition: >-
       has(resource.spec.deploymentSpec.agentGatewayConfig.agentToAnywhereConfig.agentGateway) &&
       resource.spec.deploymentSpec.agentGatewayConfig.agentToAnywhereConfig.agentGateway != '' &&
       (resource.spec.deploymentSpec.agentGatewayConfig.agentToAnywhereConfig.agentGateway in [
         'projects/AGENT_PROJECT_ID_1/locations/REGION_1/agentGateways/AGENT_GATEWAY_ID_1',
         'projects/AGENT_PROJECT_ID_2/locations/REGION_2/agentGateways/AGENT_GATEWAY_ID_2',
       ])
       method_types:
       - CREATE
       - UPDATE
       action_type: ALLOW
       display_name: Restrict Reasoning Engine Egress to Approved Agent Gateways
       description: Reasoning Engines can only be bound to a pre-approved list of
       Agent Gateway instances. Binding to any other gateway is denied.

   Replace the following:
   - <var translate="no">ORGANIZATION_ID</var>: your organization ID.
   - <var translate="no">AGENT_PROJECT_ID</var>: your project ID.
   - <var translate="no">REGION</var>: the region where the gateway was created.
   - <var translate="no">AGENT_GATEWAY_ID</var>: your gateway ID.
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

       name: projects/AGENT_PROJECT_ID/policies/custom.allowlistedEgressAgentGatewaysForAgentEngine
       spec:
         rules:
         - enforce: true

   Replace `AGENT_PROJECT_ID` with your project ID.
4. Enforce the organization policy.

   ```
   gcloud org-policies set-policy EGRESS_POLICY_PATH
   ```

   Replace <var translate="no">EGRESS_POLICY_PATH</var> with the full path to the organization policy
   YAML file created in the previous step. The policy requires up to 15 minutes
   to take effect.

### Client-to-Agent

1. To define a custom constraint for Client-to-Agent mode (ingress), create a
   file named `constraint-agent-gateway-ingress.yaml`.

   In the following example, the `condition` field specifies that the operation
   is allowed only if an Agent Gateway resource is specified
   (field is present and not empty) and if the specified gateway is in the
   pre-approved list.

       name: organizations/ORGANIZATION_ID/customConstraints/custom.allowlistedIngressAgentGatewaysForAgentEngine
       resource_types:
       - aiplatform.googleapis.com/ReasoningEngine
       condition: >-
       has(resource.spec.deploymentSpec.agentGatewayConfig.clientToAgentConfig.agentGateway) &&
       resource.spec.deploymentSpec.agentGatewayConfig.clientToAgentConfig.agentGateway != '' &&
       (resource.spec.deploymentSpec.agentGatewayConfig.clientToAgentConfig.agentGateway in [
         'projects/AGENT_PROJECT_ID_1/locations/REGION_1/agentGateways/AGENT_GATEWAY_ID_1',
         'projects/AGENT_PROJECT_ID_2/locations/REGION_2/agentGateways/AGENT_GATEWAY_ID_2',
       ])
       method_types:
       - CREATE
       - UPDATE
       action_type: ALLOW
       display_name: Restrict Reasoning Engine Ingress to Approved Agent Gateways
       description: Reasoning Engines can only be bound to a pre-approved list of
       Agent Gateway instances. Binding to any other gateway is denied.

   Replace the following:
   - <var translate="no">ORGANIZATION_ID</var>: your organization ID.
   - <var translate="no">AGENT_PROJECT_ID</var>: your project ID.
   - <var translate="no">REGION</var>: the region where the gateway was created.
   - <var translate="no">AGENT_GATEWAY_ID</var>: your gateway ID.
2. Apply the custom constraint.

   ```
   gcloud org-policies set-custom-constraint INGRESS_CONSTRAINT_PATH
   ```

   Replace <var translate="no">INGRESS_CONSTRAINT_PATH</var> with the full path to the custom
   constraint file created in the previous step.
3. Create the organization policy to enforce the constraint. To define the
   organization policy, create a policy YAML file named
   `policy-agent-gateway-ingress.yaml`. In this example we enforce this
   constraint at the project level but you might also set this at the
   organization or folder level.

       name: projects/AGENT_PROJECT_ID/policies/custom.allowlistedIngressAgentGatewaysForAgentEngine
       spec:
         rules:
         - enforce: true

   Replace `AGENT_PROJECT_ID` with your project ID.
4. Enforce the organization policy.

   ```
   gcloud org-policies set-policy INGRESS_POLICY_PATH
   ```

   Replace <var translate="no">INGRESS_POLICY_PATH</var> with the full path to the organization policy
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
