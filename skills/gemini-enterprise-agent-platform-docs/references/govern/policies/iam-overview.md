> [!NOTE]
> **Note:** This feature does not support VPC-SC.

You can create IAM allow and deny policies that
Agent Gateway uses to securely govern agentic communication between
your agents and other services, including other agents, MCP servers, and
endpoints. Agent Gateway uses Identity-Aware Proxy (IAP) to
enforce the policies. IAP also [enforces end-to-end agent identity authentication and authorization security](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview#end-to-end-security).

To create an IAM policy for Agent Gateway, see [Create IAM policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam).

You can also create a principal access boundary (PAB) on the agent identity.
Agent Gateway can use IAP to enforce
principal access boundary.

### Agent Gateway must be enabled

To use agentic communication policies, you must [set up
Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway).

We recommend that you configure Agent Gateway in dry-run mode
(`DRY_RUN`) in a staging environment to ensure that your policies are working as
you expect. In dry-run mode, IAP logs disallowed agentic
communications to Cloud Audit Logs but doesn't block them.

When you are satisfied that the policies are functioning correctly, you can
update the Agent Gateway configuration to set enforcement mode to
`ENFORCE`. In this mode, agentic communications that violate the policy are
disallowed and communications to the resource is blocked.

### Policy components

Policies have the following components:

- **Agents** : In your IAM allow policies, source agents are defined
  by their agent identity (the identity of the agent initiating communication
  with a service). To learn how different types of agents receive identities, see
  [Agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity). Agent identities are represented by [principal identifiers](https://docs.cloud.google.com/iam/docs/principal-identifiers)
  that contain the SPIFFE-formatted identity of the agent. When you use
  the gcloud CLI to configure the IAM policy, the
  agent is the member that you grant access to.

  Gemini Enterprise agents and Agent Runtime instances are
  automatically assigned an Agent Identity and registered in Agent Registry.
- **Agent Registry resource** : The Agent Registry
  service that you're granting allow or deny access on. In IAM
  allow and deny policies, Agent Registry services are referred to as
  *resources*. The resource can be an entire registry within a project or an
  individual service, which can be an MCP server, agent, or endpoint.

  Individual services must be registered in
  Agent Registry to be used in an IAM policy.
  If you regionalize your agent registries, then your IAM
  allow policy applies only to the resources that are in the registry's region.
- **Role** : Agentic communication policies always grant the [IAP-secured Egressor (`roles/iap.egressor`)](https://docs.cloud.google.com/iam/docs/roles-permissions/iap#iap.egressor)
  roles on the service resource.

- **Condition** : You can optionally configure a condition on the IAM
  allow policy to further restrict what the agent can access. In the
  Google Cloud console, you can use the **Condition builder** to create a
  condition by selecting UI elements. Alternatively, you can use
  the **Condition editor** to enter more complex conditions as Common Expression
  Language (CEL) expressions.

  The following table shows the variables that you can use in CEL expressions:

  | Attribute | Description |
  |---|---|
  | `mcp.toolName` | Name of the specific tool being called. Eg: `request.mcp.toolName == 'GetCalendarEvents'` |
  | `mcp.resourceName` | Name of the resource being accessed. |
  | `mcp.promptName` | Prompt name being used. |
  | `mcp.method` | The specific MCP operation (e.g., tools/call, resources/read). |
  | `mcp.tool.isReadOnly` `mcp.tool.isDestructive` `mcp.tool.isIdempotent` `mcp.tool.isOpenWorld` | Boolean flag indicating the type of operation. |
  | `request.auth.type` | Enum indicating the protocol (e.g., 'MCP'). |

### Creating policies

In the **Policies** page in the Google Cloud console, you create
IAM allow policies that Agent Gateway uses to govern
agentic communications.

In the gcloud CLI you can configure both IAM allow and
IAM deny policies that Agent Gateway uses to govern
agentic communications.

#### Policies in the Google Cloud console

To create IAM policies by using the Google Cloud console, see
[Configure IAM policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#create-ag-iam-policy).

#### Policies in the gcloud CLI

To create IAM policies by using the gcloud CLI, see
[Configure IAM policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam#create-ag-iam-policy).

### IAP and Context-Aware Access provide end-to-end security

IAP and Context-Aware Access provide on-by-default, end-to-end
agent identity authentication and authorization by using the following
protocols:

- Mutual TLS (mTLS)
- Demonstrable Proof of Possession (DPoP)

Agent identities are provisioned with an X.509 certificate and a
certificate-bound token. IAP enforces that agent identities use
mutual TLS (mTLS) to authenticate to Agent Gateway. When the
gateway allows the agent to egress and access Google Cloud APIs, MCP
servers, other agents, and endpoints, the agent attempts access outside of the
mTLS boundary. To maintain security, Context-Aware Access enforces a
Google-managed Context-Aware Access policy. The policy requires DPoP to validate
the certificate-bound token that is bound to the agent identity. To learn more
about how Context-Aware Access provides end-to-end mTLS and DPoP security, see
[Context-Aware Access agent security](https://docs.cloud.google.com/access-context-manager/docs/caa-agent-security).

## What's next

Codelab

### [Codelab: Secure cross-cloud agentic AI applications](https://codelabs.developers.google.com/next26/aiinfra-learning-pod/screen1-securing-cross-cloud-agentic)

Learn how to secure your agentic applications in the Securing Cross-Cloud Agentic AI Applications codelab.

Overview

### [Agent Gateway overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview)

Get an overview of Agent Gateway.

Guide

### [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls)

Learn about security controls for Google Agent Platform.
