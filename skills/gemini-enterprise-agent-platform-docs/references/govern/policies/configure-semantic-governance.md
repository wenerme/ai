> [!WARNING]
> **Preview**
>
>
> This feature is subject to the "Pre-GA Offerings Terms" in the General Service
> Terms section of the
> [Service Specific Terms](https://cloud.google.com/terms/service-terms#1)
> and the
> [Generative AI Service Specific Terms](https://cloud.google.com/terms/service-terms#20),
> as well as the
> [Additional Terms
> for Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos?e=48754805).
>
>
> When you use this feature with AI Agents, the terms applicable to AI Agents in the Agreement apply.
>
>
> Pre-GA features are available "as is" and might have limited support. For more
> information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

> [!NOTE]
> **Note:** Semantic Governance Policy is a Generative AI Service that uses an LLM to implement natural language policies. LLMs are probabilistic and can make mistakes. Verdicts may not be accurate.

> [!NOTE]
> **Note:** This feature does not support VPC-SC.

## Configure SGP policies and the SGP engine

This section covers the transition from infrastructure readiness to policy authoring.

### Prerequisites

Before you configure SGP, complete the following steps.

#### Enable required APIs

Before you begin, enable the APIs required for SGP and its networking
components:

    gcloud services enable \
        aiplatform.googleapis.com \
        agentregistry.googleapis.com \
        networkservices.googleapis.com \
        networksecurity.googleapis.com \
        compute.googleapis.com \
        dns.googleapis.com \
        --project=PROJECT_ID

> [!NOTE]
> **Prerequisites:** This guide assumes you have already created an Agent Gateway, including the service identity and required IAM roles. For instructions, see [Set up Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway).

> [!NOTE]
> **Administrative quotas:** SGP management operations---such as creating policies or enabling the SGP engine---consume administrative quotas. For information about rate limits and how to view your quota in the Google Cloud console, see [Semantic Governance Policy quotas](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas#sgp-quotas).

### Supported locations

The Semantic Governance Policy engine and SGP policies are supported in the following regional locations:

| Geography | Available regions |
|---|---|
| **Americas** | `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west4` |
| **Europe** | `europe-central2`, `europe-north1`, `europe-southwest1`, `europe-west1`, `europe-west4`, `europe-west8`, `europe-west9` |

### Provisioning and enablement

Enable the SGP engine. This provisions the necessary runtime environment.
Provisioning can take up to 15-20 minutes to complete. Choose one of the
following options for provisioning:

- [Google-managed binding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#google-managed)
- [Self-managed binding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#self-managed)

After you complete the provisioning, you must [connect the SGP engine to
Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#connect-policy-engine).

#### Google-managed binding

    curl -X PATCH \
        "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/semanticGovernancePolicyEngine?updateMask=SemanticGovernancePolicyEngine" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \
        -d '{ "gatewayConfigs": { \
          "GATEWAY_NAME": { "network": "projects/'${PROJECT_ID}'/global/networks/default", \
          "subnetwork": "projects/'${PROJECT_ID}'/regions/${LOCATION}/subnetworks/default", \
          "dnsZoneName": "DNS_NAME" } } }'

> [!NOTE]
> **Note:** When you specify the `gatewayConfig` parameter, all subsequent updates must include existing gateways to keep and new gateways to add. Exclude gateways that you want to remove.

Replace:

- `GATEWAY_NAME` with a unique gateway name.
- `DNS_NAME` with the name of the DNS to use.

#### Self-managed binding

    curl -X PATCH \
        "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/semanticGovernancePolicyEngine?updateMask=SemanticGovernancePolicyEngine" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \
        -d '{}'

This command returns a long-running operation. You can poll the operation
status by replacing `OPERATION` with
the `name` value from the response:

    curl "https://LOCATION-aiplatform.googleapis.com/v1beta1/OPERATION" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \

Alternatively, check the overall engine status until the `state` field returns
`ACTIVE`:

    curl "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/semanticGovernancePolicyEngine" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \

> [!NOTE]
> **Provisioning requirement:** Wait until the `state` field returns `ACTIVE` before proceeding. Save the `pscServiceAttachment` value from the response --- you'll need it when you [configure the network](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#configuring-the-network).

##### Configuring the network

After the policy engine is provisioned, configure the networking components
required for Agent Gateway to communicate with the policy engine.

**1. Provision VPC network and subnet**

In this step, you create a VPC network, a subnet, and a proxy-only subnet for
agentic traffic. The IP ranges shown (`10.11.12.0/24` and `10.11.13.0/24`) are
examples. You can use any RFC 1918 private range that fits your network design.

> [!NOTE]
> **Subnet requirements:** The subnet range mustn't overlap with ranges reserved by Agent Gateway for internal use (`10.0.0.0/24`, `10.0.1.0/24`, `10.0.2.0/24`). For the full list of subnet requirements, see [Configure VPC connectivity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#psc-interface).

1. Create the VPC network:

       gcloud compute networks create NETWORK_NAME \
           --subnet-mode=auto \
           --project=PROJECT_ID

   Replace `NETWORK_NAME`
   with the name for your VPC network (for example, `agent-network`).
2. Create the subnet:

       gcloud compute networks subnets create SUBNET_NAME \
           --network=NETWORK_NAME \
           --region=LOCATION \
           --range=10.11.12.0/24 \
           --project=PROJECT_ID

   Replace `SUBNET_NAME`
   with the name for your subnet (for example, `agent-subnet`).
3. Create the proxy-only subnet (required for managed load balancers):

       gcloud compute networks subnets create PROXY_SUBNET_NAME \
           --network=NETWORK_NAME \
           --region=LOCATION \
           --range=10.11.13.0/24 \
           --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE \
           --project=PROJECT_ID

   Replace
   `PROXY_SUBNET_NAME`
   with the name for your proxy-only subnet (for example,
   `agent-proxy-subnet`).

**2. Provision private DNS zone**

Create a private DNS zone to allow Agent Gateway to resolve the
policy engine's hostname:

    gcloud dns managed-zones create DNS_ZONE_NAME \
        --description="Private zone for my internal agentic VPC services" \
        --dns-name="internal.example.com." \
        --visibility=private \
        --networks=NETWORK_NAME \
        --project=PROJECT_ID

    Replace the following:

- `DNS_ZONE_NAME`: the name for your DNS zone (for example, `my-private-zone`).
- `internal.example.com.`: the DNS name for your zone, including the trailing dot.

**3. Create network attachment**

Create a network attachment to allow Agent Gateway to connect to
resources in your VPC. The connection preference must be set to
`ACCEPT_AUTOMATIC`.

    gcloud compute network-attachments create NETWORK_ATTACHMENT_NAME \
        --region=LOCATION \
        --subnets=SUBNET_NAME \
        --connection-preference=ACCEPT_AUTOMATIC \
        --project=PROJECT_ID

    Replace the following:

- `NETWORK_ATTACHMENT_NAME`: the name for your network attachment (for example, `sgp-nw-attachment`).
- `SUBNET_NAME`: the subnet you created in step 1.

**4. Create static IP, PSC endpoint, and DNS record**

Reserve a static IP address, create a Private Service Connect (PSC)
endpoint pointing to the policy engine's service attachment, and create a DNS
record to make it reachable.

    # Reserve a static IP address
    gcloud compute addresses create STATIC_IP_NAME \
        --region=LOCATION \
        --subnet=SUBNET_NAME \
        --purpose=GCE_ENDPOINT \
        --project=PROJECT_ID

    # Capture the reserved IP address
    IP=$(gcloud compute addresses describe STATIC_IP_NAME \
        --region=LOCATION \
        --project=PROJECT_ID \
        --format=value(address))

    # Create the PSC endpoint
    gcloud compute forwarding-rules create PSC_ENDPOINT_NAME \
        --region=LOCATION \
        --network=NETWORK_NAME \
        --address=STATIC_IP_NAME \
        --target-service-attachment=PSC_SERVICE_ATTACHMENT \
        --project=PROJECT_ID

    # Create a DNS A record for the policy engine
    gcloud dns record-sets create SGP_DNS_HOSTNAME \
        --zone=DNS_ZONE_NAME \
        --type=A \
        --ttl=300 \
        --rrdatas=$IP \
        --project=PROJECT_ID

Replace the following:

- `STATIC_IP_NAME`: the name for your reserved IP address (for example, `sgp-psc-ip`).
- `PSC_ENDPOINT_NAME`: the name for your PSC endpoint (for example, `sgp-psc-endpoint`).
- `PSC_SERVICE_ATTACHMENT`: the `pscServiceAttachment` value saved from the provisioning response.
- `SGP_DNS_HOSTNAME`: a hostname under your private DNS zone, in the format `LOCATION.DNS_ZONE_SUFFIX`, where `DNS_ZONE_SUFFIX` is the DNS name you specified when creating your private DNS zone. For example, if your location is `us-west1` and your DNS zone suffix is `internal.example.com`, use `us-west1.internal.example.com`.

**5. Configure VPC connectivity on Agent Gateway {:#configure-vpc-connectivity}**

After creating the network resources, you must register the network attachment
and DNS peering on your Agent Gateway so that it can reach the
policy engine over the private network.

For detailed instructions, see
[Configure VPC connectivity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#psc-interface)
in the Agent Gateway setup guide. At a minimum, you must:

- Register the **network attachment** created in step 3 with your Agent Gateway egress configuration.
- Register **DNS peering** so the gateway can resolve the private DNS hostname created in step 4.

> [!CAUTION]
> **Caution:** Without this step, the Agent Gateway cannot resolve the SGP engine's private DNS hostname. Agent sessions will fail with `FAILED_PRECONDITION` errors.

#### Connect the SGP engine to Agent Gateway

After the network is configured, you must create an authorization
extension and an authorization policy so that Agent Gateway can
forward traffic to the SGP engine for evaluation.

1. **Create the authorization extension** : Create an authorization extension
   that points to the policy engine's DNS hostname. Use the same
   `SGP_DNS_HOSTNAME` that you
   created a DNS record for in
   [Configuring the network](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#configuring-the-network) (step 4). This is the
   mechanism by which Agent Gateway sends traffic to the SGP
   engine for evaluation.

       curl -X POST \
           "https://networkservices.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/authzExtensions?authzExtensionId=AUTHZ_EXTENSION_NAME" \
           -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
           -H "Content-Type: application/json" \
           -d '{
             "service": "SGP_DNS_HOSTNAME",
             "authority": "SGP_DNS_HOSTNAME",
             "failOpen": false,
             "loadBalancingScheme": "LOAD_BALANCING_SCHEME_UNSPECIFIED"
           }'

   Replace
   `SGP_DNS_HOSTNAME` with the
   DNS hostname for which you created an A record in
   [Configuring the network](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#configuring-the-network) (step 4).

   This command returns a long-running operation. Wait for the operation to
   complete before proceeding.
2. **Create the authorization policy**: Create an authorization policy that
   binds the extension to your Agent Gateway. This tells
   Agent Gateway to send traffic through the policy engine for
   evaluation.

   > [!NOTE]
   > **Important:** The `httpRules` must include a [CEL expression](https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference) to exclude gRPC traffic. Without this exclusion, the policy engine intercepts gRPC calls (such as Cloud Resource Manager) and causes agent startup failures.

   > [!WARNING]
   > **Important:** The `when` condition in the following command also matches only the model-inference paths---`:generateContent` and `:streamGenerateContent`---so that **only** agent-to-model (LLM) requests are sent to the policy engine. Keep this path match: if you broaden the filter, non-LLM traffic such as MCP tool calls is also routed to the engine, which then processes and rejects it, adding unnecessary latency and policy-engine cost.

       curl -X POST \
           "https://networksecurity.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/authzPolicies?authzPolicyId=AUTHZ_POLICY_NAME" \
           -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
           -H "Content-Type: application/json" \
           -d '{
             "target": {
               "loadBalancingScheme": "LOAD_BALANCING_SCHEME_UNSPECIFIED",
               "resources": ["projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"]
             },
             "httpRules": [{
               "to": {
                 "operations": [{"paths": [{"prefix": "/"}]}]
               },
               "when": "!request.headers['"'"'content-type'"'"'].startsWith('"'"'application/grpc'"'"') && (request.path.endsWith('"'"':generateContent'"'"') || request.path.endsWith('"'"':streamGenerateContent'"'"'))"
             }],
             "action": "CUSTOM",
             "policyProfile": "CONTENT_AUTHZ",
             "customProvider": {
               "authzExtension": {
                 "resources": ["projects/PROJECT_ID/locations/LOCATION/authzExtensions/AUTHZ_EXTENSION_NAME"]
               }
             }
           }'

   This command returns a long-running operation. Wait for the operation to
   complete before proceeding.

### Create a policy

Once the SGP engine is active, you can define the technical and behavioral
guardrails for your agents.

> [!NOTE]
> **Best practice:** SGP uses LLMs as judges, which can make mistakes. We recommend enabling **dry run mode** first before enforcing policies in production. This lets you observe the policy engine's verdicts in [Log Explorer](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#view-logs) and ensure that your natural language constraints behave as expected without blocking real actions. For instructions, see [Enabling dry run mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#enabling-dry-run-mode).

1. **Define the scope**: Determine if the policy applies to all actions taken by an agent or targets a specific tool.
2. **Author the constraints**: Provide your business rules in plain English.

> [!NOTE]
> **Note:** Semantic Governance Policy (SGP) is a protection service for Gemini Enterprise Agent Platform. It provides a smart security and compliance layer designed to ensure that an AI agent's tool calls and skill invocations align with user intent and organizational business rules. Policies are Service Data. Because the policy engine may cite constraints or parameters in the rationale shown to the end user, don't include sensitive or confidential information in your constraints that you don't want to appear to end users.

> [!TIP]
> Tip: Before creating your first policy, ensure you've completed the network configuration described in \[Configure SGP\](#configure-sgp). Otherwise, you can't apply policies to your agent gateway traffic.

### Console

1. In the Google Cloud console, navigate to the **SGP** page.

   [Go to the SGP page](https://console.cloud.google.com/agent-platform/policies/business-policies)
2. Click **+ Add Policy**.
3. In the **Add Policy** side panel, configure the following:
   - **Name**: Enter a unique ID for the policy. The name can contain only lowercase letters, numbers, and hyphens.
   - **Description**: (Optional) Enter a brief description of the policy's purpose.
   - **Agent selection**: Select the specific agent or all agents this rule applies to.
   - **Access targets** :
     - To apply the constraint to every action, select the **Apply
       constraints to all tools** checkbox.
     - To target specific resources, select an **MCP Server** and the individual **Tools** from the drop-down menus.
   - **Constraints**: Enter your business rules in natural language (up to 5,000 characters).
4. Click **Create**.

### gcloud

You can configure a constraint at **agent scope** (applies to all tools) or
**tool scope** using the
[`gcloud beta ai semantic-governance-policies create`](https://docs.cloud.google.com/sdk/gcloud/reference/beta/ai/semantic-governance-policies)
command.

##### Find your agent ID

To create a policy, you need your agent's unique ID from the
[Agent Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-registry).
List agents in your project to find the ID:

    gcloud alpha agent-registry agents list \
        --project=PROJECT_ID \
        --location=LOCATION

The agent ID is the last segment of the `name` field (for example,
`agentregistry-00000000-0000-0000-abcd-012345678901`). Use this value for
the `AGENT_ID` parameter
in the following commands.

Before running SGP policy commands, set the regional API endpoint override:

    gcloud config set api_endpoint_overrides/aiplatform \
        https://LOCATION-aiplatform.googleapis.com/

##### Create an agent-scope policy

    gcloud beta ai semantic-governance-policies create POLICY_ID \
        --location=LOCATION \
        --display-name="SGP for ShippingAgent-1" \
        --description="Applies to all tool calls from the Cymbal shipping assistant agent" \
        --agent=AGENT_ID \
        --natural-language-constraint="Always use UPS as the shipping provider for shipments within the USA. Always use DHL as the shipping provider for shipments within the EU." \
        --project=PROJECT_ID

##### Find your MCP server

    gcloud alpha agent-registry mcp-servers list \
        --project=PROJECT_ID \
        --location=LOCATION

##### Create a tool-scope policy

    gcloud beta ai semantic-governance-policies create POLICY_ID \
        --location=LOCATION \
        --display-name="DISPLAY_NAME" \
        --description="DESCRIPTION" \
        --agent=AGENT_ID \
        --mcp-tools="mcp-server=MCP_SERVER,tools=TOOL_NAME" \
        --natural-language-constraint="NLC_TEXT" \
        --project=PROJECT_ID

### Enabling dry run mode

You can enable **dry run mode** to evaluate policies without enforcing them. In
this mode, the policy engine evaluates all tool calls against your constraints
and logs verdicts, but never blocks actions. This lets you test and validate
your constraints before enabling enforcement.

To enable dry run mode, add `sgpEnforcementMode: DRY_RUN` to the metadata of
your authorization extension:

    curl -X PATCH \
        "https://networkservices.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/authzExtensions/AUTHZ_EXTENSION_NAME?updateMask=metadata" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \
        -d '{
          "metadata": {
            "sgpEnforcementMode": "DRY_RUN"
          }
        }'

In dry run mode:

- All tool calls are **allowed** regardless of the verdict.
- Verdicts and rationales are **logged** for review.
- You can review the logs to identify which actions would have been blocked and refine your constraints before switching to enforcement mode.

To switch back to normal enforcement mode, remove `sgpEnforcementMode` from the
metadata:

    curl -X PATCH \
        "https://networkservices.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/authzExtensions/AUTHZ_EXTENSION_NAME?updateMask=metadata" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \
        -d '{
          "metadata": {}
        }'

### View policy evaluation logs

SGP writes a structured log entry for each evaluation to Cloud Logging in your
project. The entry records an overall `verdict` and an `evaluations` array with a
`verdict` and `rationale` for each tool or action.

1. **From the Console:** On the **Policies** page, select a policy.
2. In the **Details** panel, in the **Observability** section, click **Cloud Logging \> View details**.
3. **In Logs Explorer:** type `semantic-governance-policy` in the query box or
   use the following explicit filter:

   `logName="projects/PROJECT_ID/logs/semantic-governance-policy"`

The following example is a sample log entry:

    {
      "jsonPayload": {
        "token_usage": 1859,
        "verdict": "ALLOW",
        "token_usage_breakdown": {"output": 43, "thinking": 0, "input": 1816, "total": 1859},
        "evaluations": [
          {
            "toolName": "process_refund",
            "verdict": "ALLOW",
            "actionName": "process_refund",
            "rationale": "The action is aligned with the user's request to process a refund and complies with the constraints regarding order ID length."
          }
        ]
      },
      "resource": {"type": "global", "labels": {"project_id": "PROJECT_NUMBER"}},
      "logName": "projects/PROJECT_ID/logs/semantic-governance-policy"
    }

Key fields:

- `verdict`: Overall decision, either `ALLOW` or `DENY`.
- `evaluations[].rationale`: The rationale as to why SGP reached a particular verdict for each tool or action.
- `token_usage`: The number of model tokens the evaluation consumed.

### Enable request tracing

SGP exports a trace for each request it evaluates to Cloud Trace in your
project, so you can inspect per-request latency and policy enforcement. To
receive these traces, enable the Cloud Trace API and grant the Vertex AI
service account (P4SA) permission to write traces.

1. Enable the Cloud Trace API:

       gcloud services enable cloudtrace.googleapis.com \
           --project=PROJECT_ID

2. Grant the Cloud Trace Agent role (`roles/cloudtrace.agent`) to the
   Vertex AI service account. This role grants only the trace-write
   permission (`cloudtrace.traces.patch`):

       export PROJECT_NUM=$(gcloud projects describe PROJECT_ID --format="value(projectNumber)")

       gcloud projects add-iam-policy-binding PROJECT_ID \
           --member="serviceAccount:service-${PROJECT_NUM}@gcp-sa-aiplatform.iam.gserviceaccount.com" \
           --role="roles/cloudtrace.agent"

After both are configured, send a request through your agent and view the
traces in [Trace explorer](https://docs.cloud.google.com/trace/docs/finding-traces) for your project.

> [!NOTE]
> If the Cloud Trace API is disabled or the role is missing, requests are still governed, but their traces aren't exported.

### Manage SGP configuration

After SGP is running, you can delete individual policies or disconnect the
engine from your Agent Gateway.

#### Delete an SGP policy

To remove an individual policy without affecting the overall SGP integration:

    ```bash
    gcloud beta ai semantic-governance-policies delete POLICY_ID \
        --location=LOCATION \
        --project=PROJECT_ID
    ```

Alternatively, use the following `curl` command:

    curl -X DELETE \
        "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/semanticGovernancePolicies/POLICY_ID" \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \

#### De-provision an SGP engine

    gcloud beta ai semantic-governance-policy-engine deprovision \
      --location=LOCATION \
      --project=PROJECT_ID

#### Disconnect SGP from Agent Gateway

You can disconnect the SGP engine from your Agent Gateway to stop
tool calls from being evaluated against your constraints.

Delete the authorization policy that binds SGP enforcement to your
Agent Gateway:

    gcloud network-security authz-policies delete AUTHZ_POLICY_NAME \
        --location=LOCATION \
        --project=PROJECT_ID

To reconnect SGP later, recreate the authorization policy as described in
[Connect the SGP engine to Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#connect-policy-engine).

#### (Optional) Delete the authorization extension

Delete the authorization extension created during setup.

    gcloud network-services authz-extensions delete AUTHZ_EXTENSION_NAME \
        --location=LOCATION \
        --project=PROJECT_ID

#### (Optional) Clean up customer-managed resources

Deprovisioning the engine only tears down the Google-managed backing resources. You must manually delete the resources you created in your own project during setup if they are no longer needed.

##### Remove the private DNS zone

    gcloud dns managed-zones delete DNS_ZONE_NAME \
        --project=PROJECT_ID

##### Remove the subnet and VPC

    gcloud compute networks subnets delete SUBNET_NAME \
        --region=LOCATION \
        --project=PROJECT_ID

    gcloud compute networks delete NETWORK_NAME \
        --project=PROJECT_ID

##### (Optional) Remove the IAM bindings

If you granted permissions to the Vertex AI service account (P4SA), you can remove them:

    export PROJECT_NUM=$(gcloud projects describe PROJECT_ID --format="value(projectNumber)")

    gcloud projects remove-iam-policy-binding PROJECT_ID \
        --member="serviceAccount:service-${PROJECT_NUM}@gcp-sa-aiplatform.iam.gserviceaccount.com" \
        --role="roles/compute.networkAdmin"

    gcloud projects remove-iam-policy-binding PROJECT_ID \
        --member="serviceAccount:service-${PROJECT_NUM}@gcp-sa-aiplatform.iam.gserviceaccount.com" \
        --role="roles/dns.admin"

    gcloud projects remove-iam-policy-binding PROJECT_ID \
        --member="serviceAccount:service-${PROJECT_NUM}@gcp-sa-aiplatform.iam.gserviceaccount.com" \
        --role="roles/cloudtrace.agent"

##### (Optional) Disable the Cloud Trace API

    gcloud services disable cloudtrace.googleapis.com --project=PROJECT_ID

##### (Optional) Disable the Agent Platform API

    gcloud services disable aiplatform.googleapis.com --project=PROJECT_ID

## Debug policy enforcement

| Symptom | Likely cause | What to check |
|---|---|---|
| Tool call **allowed** but expected a block | Policy didn't match scope and agent or constraint too permissive | In the evaluation log, confirm the policy matched and read the verdict; refine the NLC |
| Tool call **denied** but expected allow | Constraint too strict or conflicting rules | Read the `rationale` in the log; tune the NLC; iterate in dry-run mode |
| No verdict at all | Engine not active or gateway not bound | Verify engine `state` is `ACTIVE` and the authorization policy, extension, or both exist |

To debug an unexpected verdict:

1. **Check the verdict and rationale** in [policy evaluation logs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#view-logs).
2. **Trace the request** -- see [Enable request tracing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#enable-request-tracing).
3. **Validate changes safely** with [dry run mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#enabling-dry-run-mode).
4. **Confirm deployment** -- engine state is `ACTIVE` and the gateway binding is established.

## Error catalog

The following table lists errors that you might encounter when managing Semantic Governance Policies, along with steps to resolve them:

| Error name | Description | Suggested action |
|---|---|---|
| `SEMANTIC_GOVERNANCE_POLICY_ALREADY_EXISTS` | The policy ID you specified already exists in this project and location. | Use a unique policy ID, or use a `PATCH` request to update the existing policy. |
| `SEMANTIC_GOVERNANCE_POLICY_ETAG_MISMATCH` | The etag in your request does not match the current version of the resource. | Retrieve the latest version of the policy to get the current etag before attempting your update. |
| `SEMANTIC_GOVERNANCE_POLICY_AGENT_REQUIRED` | The `agent` field is missing from the request. | Specify the resource name of the agent this policy applies to. |
| `SEMANTIC_GOVERNANCE_POLICY_CONSTRAINT_REQUIRED` | The `natural_language_constraint` field is missing. | Provide your business rules in plain English in the constraint field. |
| `SEMANTIC_GOVERNANCE_POLICY_AGENT_INVALID_NAME` | The agent resource name is malformed. | Verify the format: `projects/PROJECT_ID/locations/LOCATION/agents/AGENT_ID`. |
| `SEMANTIC_GOVERNANCE_POLICY_AGENT_UNSUPPORTED_REGION` | The region specified for the agent is not supported by Agent Registry. | Use a region supported by both Agent Registry and SGP. |
| `SEMANTIC_GOVERNANCE_POLICY_AGENT_NOT_FOUND` | The specified agent couldn't be found. | Verify that the agent exists in the Agent Registry for the specified project and location. |
| `SEMANTIC_GOVERNANCE_POLICY_AGENT_NOT_CONFIGURED` | The agent lacks a valid `RuntimeIdentity`. | Configure your agent with a valid runtime identity before applying a policy. |
| `SEMANTIC_GOVERNANCE_POLICY_MCP_SERVER_NOT_FOUND` | The specified MCP server couldn't be found. | Verify that the MCP server is registered in the Agent Registry for the project. |
| `SEMANTIC_GOVERNANCE_POLICY_MCP_SERVER_INVALID_NAME` | The MCP server resource name is malformed. | Verify the format: `projects/PROJECT_ID/locations/LOCATION/mcpServers/SERVER_ID`. |
| `SEMANTIC_GOVERNANCE_POLICY_MCP_SERVER_UNSUPPORTED_REGION` | The region specified for the MCP server is not supported. | Use a supported region for your MCP server. |
| `SEMANTIC_GOVERNANCE_POLICY_REGISTRY_DENIED` | The system cannot query the Agent Registry due to missing permissions. | Enable the Agent Registry API and ensure your account has the `agentregistry.viewer` role. |
| `SEMANTIC_GOVERNANCE_POLICY_ENGINE_NOT_ENABLED_IN_REGION` | The SGP engine is not active in the requested region. | Follow the steps in [Configuring the network](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#configuring-the-network) to enable the engine in your region. |
| `SEMANTIC_GOVERNANCE_POLICY_ENGINE_SERVICE_NOT_AVAILABLE_IN_LOCATION` | The Semantic Governance Policy Engine service is not available in the requested location. | Use one of the [supported locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#supported-locations) for the Semantic Governance Policy Engine service. |

## What's next

- Learn more about [Vertex AI gcloud CLI commands](https://docs.cloud.google.com/sdk/gcloud/reference/beta/ai).
- Monitor policy verdicts in [Log Explorer](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance#view-logs).
