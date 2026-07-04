This guide helps you debug and troubleshoot connectivity issues with the
Gemini Enterprise Agent Platform, especially when you use
Agent Gateway, agent identity, Identity and Access Management (IAM)
policies, and delegated authorization with Service Extensions.

## Egress request flow

Agent Platform adopts a *default-deny* policy
for all outgoing traffic. For an agent to connect to external resources, you
must explicitly allow access at every network and identity layer. When
Agent Gateway is enabled, the gateway intercepts all requests
from the agent and applies the configured policies.

For a request to succeed, it must meet all of the following conditions:

- **Agent Registry**: The destination must be registered as an endpoint, Model Context Protocol (MCP) server, or agent.
- **Agent Gateway**: The gateway must be associated with an authorization policy that explicitly targets it. By default, the gateway uses IAP and Model Armor to secure requests.
- **Delegated authorization with Service Extensions**: You can delegate authorization decisions to a custom authorization engine by using Service Extensions. Depending on the configured authorization policy, one or more of these authorization engines will allow or deny the request.
- **IAM allow policies** : The *agent identity* assigned to the agent must hold the `roles/iap.egressor` role on the registered destination resource, either directly or through a principal set. For details, see [Create
  IAM agent
  policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam).

## Common issues

Review these common issues and their solutions when troubleshooting
Agent Gateway.

### Errors during Agent Runtime startup

If your Agent Runtime instances fail to start or deploy then it might mean
that either IAP is blocking internal traffic or your agent lacks
the basic roles it needs to initialize.

1. **Confirm that IAP isn't blocking calls to internal services**

   **Symptom** : `403 Forbidden` errors during startup.

   **Cause** : Agent Gateway uses a *default
   deny* policy for all traffic. Therefore, when IAP is in
   enforcement mode, it blocks calls even to internal services (such as
   `aiplatform` or `logging`) unless they are registered and the agent has the
   required IAM permissions.

   **Fix** : Temporarily switch IAP to dry-run mode to see which
   connections are failing without blocking startup. Once you identify the target
   service hostnames, register them in Agent Registry and grant the
   `roles/iap.egressor` role to the agent.

   Common internal services that may require registration during startup include:
   - Resource Manager: `https://cloudresourcemanager.mtls.googleapis.com` and `https://cloudresourcemanager.mtls.googleapis.com/`
   - Cloud Trace (if enabled): `https://telemetry.mtls.googleapis.com/`
   - Cloud Logging (if enabled): `https://logging.googleapis.com/`
2. **Confirm that the agent identity has the required basic roles**

   **Symptoms** : In the `aiplatform.googleapis.com/reasoning_engine_stderr` logs,
   you see errors such as `google.api_core.exceptions.Unknown: None` or `Failed
   to convert project number to project ID`. The error appears during Reasoning
   Engine startup.

   **Cause** . The agent identity lacks the `resourcemanager.projects.get`
   permission required to resolve the project name during initialization.

   **Fix**. Ensure that the agent identity (or its principal set) has the
   permissions required to read its own runtime configuration. The following roles
   are required:
   - `roles/aiplatform.agentDefaultAccess`: Default agent role.
   - `roles/aiplatform.user`: Required to run the agent.
   - `roles/agentregistry.viewer`: Required to view registered resources.
   - `roles/logging.logWriter` and `roles/monitoring.metricWriter`: Required for observability.
   - `roles/browser`: Required to run `resourcemanager.projects.get` during SDK initialization.

   To verify the roles assigned to the agent identity, run the following
   command:

   ```
   gcloud projects get-iam-policy PROJECT_ID \
   --flatten="bindings[].members" \
   --filter="bindings.members:AGENT_IDENTITY_PRINCIPAL"
   ```

   Replace the following:
   - `PROJECT_ID`: Your Google Cloud project ID.
   - `AGENT_IDENTITY_PRINCIPAL`: The agent identity principal. Uses the format: `principal://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH`

   To learn how to grant roles, see [Use Agent Identity with
   Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity).

### `403 Forbidden` errors

If you encounter a `403 Forbidden` error, confirm that it is related to
Agent Gateway egress. Here is a sample egress error message:

```json
{"code": 403, "message": "403 Forbidden. {'message': 'Egress request is not authorized.', 'status': 'Forbidden'}"}
```

Query the agent logs in Logging to find the specific failing
calls:

```
resource.type="aiplatform.googleapis.com/ReasoningEngine"
resource.labels.location="LOCATION"
resource.labels.reasoning_engine_id="AGENT_ID"
textPayload:"403"
```

Replace the following:

- `LOCATION`: The region where the agent is deployed, for example, `us-central1`.
- `AGENT_ID`: The ID of the agent (Reasoning Engine).

Look for the `Egress request is not authorized` message in the log entry's
`textPayload`. If the 403 error contains different text, then the destination
service might be rejecting the call directly, rather than
Agent Gateway.

You can also view egress traffic logs, including `403` denials, by using the
built-in [observability
dashboard](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway#observability-dashboard).

### Self-signed or private CA destinations fail to connect

- **Symptom:** The agent fails to connect to destinations that present self-signed or private CA-issued certificates.
- **Cause:** Agent Gateway does not validate self-signed certificate chains.
- **Mitigation:** Use either publicly trusted CA certificates or use destinations without CA certificates.

## Debugging workflow

If any of the conditions described in the [Egress request flow
section](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/troubleshoot-agent-gateway#request-flow) are missing, your requests might get blocked.

### Review the IAP decision

To narrow your log search to IAP egress decisions, run the
following query in Logging:

```
protoPayload.serviceName="iap.googleapis.com"
protoPayload.authorizationInfo.permission="iap.webServiceVersions.egressViaIAP"
protoPayload.metadata.mcp_attributes.base_protocol_method="true"
```

If you don't see a matching IAP log entry at all, then the
gateway might have denied the request before IAP evaluated it.
Move on to the next step.

> [!NOTE]
> **Note:** You can monitor authorization failures by using the built-in [observability
> dashboard](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway#observability-dashboard).

If you do see a matching log entry, review the following fields:

- `protoPayload.authorizationInfo[].granted`: Indicates whether the request was allowed (`true`) or denied (`false`).
- `protoPayload.authenticationInfo.principalSubject`: The SPIFFE ID or `principal://...` identity of the caller. Verify that this matches your agent's identity.
- `protoPayload.authorizationInfo[].resource`: The registered destination resource that the call resolved to.
- `labels."iap.googleapis.com/audited_resource_name"`: If this value is `unregisteredResource`, the destination hostname isn't registered. Register the destination hostname with Agent Registry and make sure the agent has the `roles/iap.egressor` role for this destination.
- **Enforcement mode** : Review the request's enforcement mode. To filter for dry-run requests, you can add `protoPayload.metadata.iamEnforcementMode="DRY_RUN"` to the query. In `DRY_RUN` mode, IAP logs denials but does not enforce them. So if the agent fails with a `403` error in dry-run mode, the denial likely comes from either the gateway's egress proxy or the destination resource.

### Review the Agent Gateway decision

To review how Agent Gateway evaluated the request, query the
gateway logs in Logging. In this example we're filtering the logs
for `403` errors only:

```
resource.type="networkservices.googleapis.com/Gateway"
resource.labels.gateway_type="SECURE_WEB_GATEWAY"
resource.labels.location="REGION"
resource.labels.gateway_name="AGENT_GATEWAY_NAME"
httpRequest.status=403
-httpRequest.requestMethod="CONNECT"
```

Review the following fields in the matching log entry:

- `jsonPayload.authzPolicyInfo.policies.result`: The overall authorization result, either `ALLOWED` or `DENIED`.
- `httpRequest.requestUrl`: Note the exact destination URL that the agent attempted to reach. In the next step, we check to see whether the hostname used by the destination resource has been registered in Agent Registry.

### Verify that the destination is registered in Agent Registry

Every destination hostname, and any variations of the hostname that the agent
attempts to reach, must be registered in Agent Registry. This is
because a Google API such as `aiplatform.googleapis.com` can resolve through
multiple hostnames depending on the SDK version, regional client configuration,
or mTLS usage. For example, `us-central1-aiplatform.googleapis.com`, or
`us-central1-aiplatform.mtls.googleapis.com`, or `aiplatform.googleapis.com`.

However, the gateway only matches hostnames exactly. Therefore, if you register
`aiplatform.googleapis.com` but the agent calls
`us-central1-aiplatform.googleapis.com`, the gateway denies the request. The
gateway considers it an unregistered resource.

> [!NOTE]
> **Note:** You can view logs for outbound traffic to unregistered destinations by using the built-in [observability
> dashboard](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway#observability-dashboard).

Run the following sample script to list your registry entries based on the
resource type and check the entries for the specific hostname used by the
agent's call:

```bash
HOSTNAME="HOSTNAME"
PROJECT_ID="PROJECT_ID"
LOCATION="REGION"

echo "Checking Endpoints..."
gcloud agent-registry endpoints list \
  --project="$PROJECT_ID" \
  --location="$LOCATION" | grep "$HOSTNAME"

echo "Checking MCP Servers..."
gcloud agent-registry mcp-servers list \
  --project="$PROJECT_ID" \
  --location="$LOCATION" | grep "$HOSTNAME"

echo "Checking Agents..."
gcloud agent-registry agents list \
  --project="$PROJECT_ID" \
  --location="$LOCATION" | grep "$HOSTNAME"
```

Replace the following:

- `HOSTNAME`: The destination hostname that the agent is attempting to reach, for example, `us-central1-aiplatform.mtls.googleapis.com`.
- `PROJECT_ID`: Your Google Cloud project ID.
- `REGION`: The location of your Agent Registry and Agent Gateway resources, for example, `us-central1`.

#### Output 1: Hostname is already registered

If the hostname exists in an Agent Registry entry, you see output
similar to the following example:

```bash
Checking Endpoints...
  url: https://us-central1-aiplatform.mtls.googleapis.com
Checking MCP Servers...
Checking Agents...
```

Move on to the next step.

#### Output 2: Hostname does not exist in the registry

If the hostname does not exist in the registry, you see output similar to the
following example:

```bash
Checking Endpoints...
Checking MCP Servers...
Checking Agents...
```

To fix the issue, register the missing MCP server or endpoint, and then
grant the `roles/iap.egressor` role on the new registry entry to your agent.

- [Register MCP servers](https://docs.cloud.google.com/agent-registry/register-mcp-servers)
  - [Create an agent-to-MCP server egress policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-mcp-server)
- [Register endpoints](https://docs.cloud.google.com/agent-registry/register-endpoints)
  - [Create an agent-to-endpoint egress policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-endpoint)

> [!NOTE]
> **Note:** In a production environment, you should authorize only the exact
> endpoints needed by the agent. To do this:
>
> 1. Run IAP in dry-run mode to record the endpoint combinations that the agent uses.
> 2. Identify the endpoints in the gateway or IAP logs.
> 3. Register those endpoints, authorize the agent to access them, and then enable IAP enforcement.

### Verify IAM bindings on the destination resource

Ensure that the agent identity or its principal set has the `roles/iap.egressor`
role on the destination. Agent Gateway specifically
looks for the `iap.webServiceVersions.egressViaIAP` permission, which is only
granted by the `roles/iap.egressor` role.

You can bind the role at two scopes:

- **Registry-wide**: Access to every agent, MCP server, and endpoint in the registry.
- **Per-resource**: Narrow access. A per-resource binding replaces the registry-wide binding for that specific resource instead of merging with it.

Use one of the following examples to check for bindings:

- To check for **registry-level** IAM policy bindings, run the
  following command:

  ```
  curl -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -d '{}' \
  -X POST "https://iap.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/iap_web/agentRegistry:getIamPolicy" \
  -H "Content-Type: application/json"
  ```
- To check for **per-endpoint** IAM policy bindings, run the
  following command:

  ```bash
  export HOSTNAME=HOSTNAME

  ENDPOINT_ID=$(gcloud agent-registry endpoints list \
  --project="PROJECT_ID" \
  --location="REGION" \
  --filter="interfaces.url:$HOSTNAME" \
  --format="value(name.basename())")

  echo "ENDPOINT_ID=$ENDPOINT_ID"

  curl -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -X POST "https://iap.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/iap_web/agentRegistry/endpoints/${ENDPOINT_ID}:getIamPolicy"
  ```

  Replace `HOSTNAME` with the hostname of the destination
  that the agent is attempting to reach, for example,
  `us-central1-aiplatform.mtls.googleapis.com`.
- To check for **per-MCP server** IAM policy bindings, run the
  following command:

  ```bash
  export MCP_SERVER=MCP_SERVER

  MCP_SERVER_ID=$(gcloud agent-registry mcp-servers list \
  --project="PROJECT_ID" \
  --location="REGION" \
  --filter="interfaces.url:$MCP_SERVER" \
  --format="value(name.basename())")

  echo "MCP_SERVER_ID=$MCP_SERVER_ID"

  curl -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -X POST "https://iap.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/iap_web/agentRegistry/mcpServers/${MCP_SERVER_ID}:getIamPolicy"
  ```

  Replace <var translate="no">MCP_SERVER</var> with the URL of the MCP server (for example,
  `https://example-abc12345-uc.a.run.app/mcp`).

In the returned policy information, look for a binding with the
`roles/iap.egressor` role that matches the agent's identity or principal set. If
the returned output contains an `"etag"` field but no bindings, that means that
no IAM policy exists.

If a binding exists but includes a `condition`, verify that the Common
Expression Language (CEL) expression is not excluding the agent. A condition
that filters by an attribute the agent lacks might be silently excluding the
agent.

If the endpoint or MCP server does not have a matching binding for your agent ID
or principal, grant your agent the role on the resource:

- [Create an agent-to-MCP server egress
  policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-mcp-server)
- [Create an agent-to-endpoint egress
  policy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#agent-to-endpoint)

### Inspect the authorization policy and extension

In this section we make sure that there is an authorization policy that is
explicitly targeting the Agent Gateway associated with the agent.

1. Get the details of the authorization extension associated with the
   gateway and confirm that the extension you're using is configured as expected.

   ```
   gcloud service-extensions authz-extensions describe AUTHORIZATION_EXTENSION_NAME \
     --location=LOCATION \
     --project=PROJECT_ID
   ```

   Replace <var translate="no">AUTHORIZATION_EXTENSION_NAME</var> with the name of the extension
   associated with the gateway. If you don't know the name of the extension, you
   can navigate to the gateway's details page in the Google Cloud
   Google Cloud console and note the value of the **Extension name** field under
   Service Extensions.
2. Verify that an authorization policy explicitly targets the gateway
   resource and links to the same authorization extension. You
   can navigate to the gateway's details page in the Google Cloud
   Google Cloud console and note the value of the **Policy name** field under
   Service Extensions.

   If no policy targets the gateway, or if the gateway-to-policy mapping is
   incorrect, the authorization extension won't be executed.

### Check principal access boundary policies

Principal access boundary policies take precedence over
IAM allow policies. This means even if you have correctly
configured all the IAM bindings, a request will fail if there
is an active principal access boundary policy that excludes the destination
resource from the agent's scope.

To list organization-wide policies run:

```
gcloud iam principal-access-boundary-policies list \
  --organization="ORGANIZATION_ID" \
  --location=global
```

To find policies that are bound to the agent's principal set, run:

```
gcloud iam policy-bindings search-target-policy-bindings \
  --project="PROJECT_ID" \
  --target="PRINCIPAL_SET"
```

Replace the following:

- `ORGANIZATION_ID`: Your Google Cloud organization ID.
- `PROJECT_ID`: Your Google Cloud project ID.
- `PRINCIPAL_SET`: The principal set of the agent identity.

If a binding exists, inspect the `details.rules[].resources[]` field to
verify that the destination is in scope for your agent.

### Test principal versus principal set bindings

If permissions work inconsistently or fail unexpectedly, the issue might relate
to how your agent's group identity (the [principal
set](https://docs.cloud.google.com/iam/docs/principals-overview#crm-principal-sets)) is configured. Principal
set-based permissions might fail for the following reasons:

- **Sync delays**: When you add an identity to a set, it can take a few minutes for IAM to update and recognize the new member.
- **Missing attributes**: If membership in a principal set requires certain attributes, the agent's identity must carry those exact attributes (for example, department or team labels). If the identity is missing these attributes, the agent might be silently excluded from the group.

To test if group membership is the issue, grant permissions directly to the
specific agent by adding a direct `principal://` binding on the affected
resource. If the agent successfully connects with the direct binding, then the
root cause is likely an attribute mismatch or sync delay with the principal set.
To resolve this, verify and correct the agent's identity attributes, or use
direct `principal://` bindings.

## What's next

Codelab

### [Codelab: Govern agentic workloads with Agent Platform](https://codelabs.developers.google.com/cloudnet-agent-gateway)

Learn how to govern agentic workloads with Agent Gateway on Gemini Enterprise Agent Platform.

Guide

### [Monitor Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway)

Learn how to monitor Agent Gateway.
