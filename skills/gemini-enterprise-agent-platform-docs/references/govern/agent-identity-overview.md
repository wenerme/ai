Agent Identity provides a strongly attested, cryptographic identity for each agent that is based on the [SPIFFE standard](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#spiffe-identity). With Agent Identity, your agent can securely authenticate to MCP servers, cloud resources, endpoints, and other agents, acting either on its own behalf or on behalf of an end user. Agent Identity uses the [agent's own credential](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#agent-credentials) and [Agent Identity auth manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#agent-auth-manager). You can use the auth manager to create and manage *auth providers*, which are the specific configurations used to acquire, manage, and secure API keys, OAuth client IDs, OAuth client secrets, and delegated end-user OAuth tokens.

Unlike service accounts, agent identities are not shared by multiple workloads
by default, can't be impersonated, and don't allow developers to generate
long-lived service account keys. Access tokens generated for Google Cloud
are cryptographically bound to the agent's unique X.509 certificates to prevent
token theft.

When Agent Identity is used with Agent Gateway and Gemini Enterprise,
end-user credentials, such as those provisioned by Gemini Enterprise connectors,
are encrypted by the auth manager and decrypted at the gateway, ensuring
that the agent can never access the raw credential.

The following services support Agent Identity:

- [Gemini Enterprise Agent Platform Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity) (*Agent Runtime*)
- [Gemini Enterprise](https://docs.cloud.google.com/gemini/enterprise/docs)

## Authentication models

To authenticate with various tools and services, Agent Identity supports several authentication models. The model that an agent uses depends on the authentication method offered by the target resource and whether the agent acts on its own authority or on behalf of an end user.

| Authority | Authentication method | Target resource | Use case and solution |
|---|---|---|---|
| **User-delegated authority** | OAuth 2.0 (3-legged) ([Preview](https://cloud.google.com/products#product-launch-stages)) | External tools and services | When an agent acts on behalf of a specific user (for example, to access a user's Jira tasks or GitHub repositories). You configure a 3-legged OAuth auth provider in Agent Identity auth manager to manage user consent and tokens. For more information, see [Authenticate using 3-legged OAuth with auth manager](https://docs.cloud.google.com/iam/docs/auth-with-3lo). |
| **Agent's own authority** | Cloud-based identity (Agent Identity) | Google Cloud services | When an agent hosted on Google Cloud needs to access other Google Cloud services using its own identity. For more information, see [Authenticate using an agent's own identity](https://docs.cloud.google.com/iam/docs/auth-agent-own-identity). |
| **Agent's own authority** | OAuth 2.0 (2-legged) ([Preview](https://cloud.google.com/products#product-launch-stages)) | External tools and services | Recommended for machine-to-machine authentication with external services that support OAuth. You configure a 2-legged OAuth auth provider in Agent Identity auth manager to handle client credentials and access tokens. For more information, see [Authenticate using 2-legged OAuth with auth manager](https://docs.cloud.google.com/iam/docs/auth-with-2lo). |
| **Agent's own authority** | API key ([Preview](https://cloud.google.com/products#product-launch-stages)) | External tools and services | For external services that require a cryptographic key or password for authentication. You configure an API key auth provider in Agent Identity auth manager to help securely store and manage the keys. For more information, see [Authenticate using API key with auth manager](https://docs.cloud.google.com/iam/docs/auth-with-api-key). |
| **Agent's own authority** | HTTP basic auth | External tools and services | Uses plaintext passwords. This method is **not recommended** . You can store passwords similar to API key. For more information, see [Authenticate using API key with auth manager](https://docs.cloud.google.com/iam/docs/auth-with-api-key). |

## Core components

Agent Identity involves several key components that together help provide
secure authentication and authorization.

### SPIFFE-based identity

Each agent is assigned a unique identity string, or SPIFFE ID, based on the
[SPIFFE standard](https://spiffe.io/). This identity is strongly
attested, tied to the agent's lifecycle, and mapped directly to the resource URI
where the agent is hosted.

The identity follows this format:
> `spiffe://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH`

For example:

- `spiffe://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`

When an agent identity is used in an IAM allow policy, the
principal identifier follows this format:
> `principal://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH`

Examples:

- **Vertex AI Agent Engine:** `principal://agents.global.org-123456789012.system.id.goog/resources/aiplatform/projects/9876543210/locations/us-central1/reasoningEngines/my-test-agent`
- **Gemini Enterprise:** `principal://agents.global.org-123456789012.system.id.goog/resources/discoveryengine/projects/9876543210/locations/global/collections/default_collection/engines/my-test-agent`

The identifiers use the following:

- `TRUST_DOMAIN`: Your organization's trust domain (for example, `agents.global.org-123456789012.system.id.goog`).
- `SERVICE`: The short name of the Google Cloud service (for example, `aiplatform` or `discoveryengine`).
- `RESOURCE_PATH`: The full path to the resource that hosts the agent.

Because the agent itself is the principal, you grant permissions directly to
this identifier to control which resources the agent can access.

### Agent credentials

Agent credentials provide cryptographic proof of an agent's identity. The
system supports X.509 certificates and Google Cloud access tokens. An
X.509 certificate is auto-provisioned and managed on the agent to help support stronger
authentication.

### Agent Identity auth manager

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

Agent Identity auth manager is a centralized credentials vault and
authentication broker that simplifies outbound tool authentication for your
agents. It lets agents authenticate using an API key or OAuth client ID and
secret, or on behalf of a user through OAuth delegation using end-user access
tokens. Within the auth manager, you configure auth providers that define the
authentication type and credentials for specific third-party applications.

Access to Agent Identity auth manager is governed by IAM, and the agent
uses its own Agent SPIFFE ID to authenticate to the auth manager. All end-user
access events are also attributable to the agent's SPIFFE ID, enabling
easy governance.

Agent Identity auth manager automates OAuth credential acquisition, such as
opening a dialog for user sign-in and consent. It also provides visibility into
end-user access and allows for access revocation, ensuring better governance
over user-delegated permissions.

For more information, see the
[Agent Identity auth manager
overview](https://docs.cloud.google.com/iam/docs/auth-manager-overview).

### Security and governance

Agent Identity is fully integrated with Google's policy systems like IAM, Principal Access Boundary (PAB), and VPC Service Controls, which allow for enhanced security and governance. It
also integrates with audit logging to ensure accountability and provide clear
audit logs both when the agent is acting as itself and when it is acting on
behalf of an end user.

- **Context-Aware Access:** By default, a Google-managed Context-Aware Access policy helps to secure Agent Identity credentials. Beyond the Agent Gateway, the policy enforces Demonstrable Proof of Possession (DPoP) by authenticating the agent's access token. The policy also enforces that mTLS is used to access the Agent Gateway. This ensures that certificate-bound tokens can only be used from their intended, trusted runtime environment.
- **IAM integration:** Support for standard IAM allow policies and deny policies.
- **Principal Access Boundary (PAB):** A PAB limits the resources an agent can access, regardless of other permissions.
- **VPC Service Controls:** Support for using agent identities ([Preview](https://cloud.google.com/products#product-launch-stages)) in [ingress and egress rules](https://docs.cloud.google.com/vpc-service-controls/docs/ingress-egress-rules) to allow access to resources protected by a service perimeter.

## How Agent Identity works

Agent Identity authenticates and authorizes agent actions through a workflow
designed to help enhance security:

1. **Identity assignment**: When you deploy an agent, Google Cloud assigns it a unique SPIFFE identity and an X.509 certificate. Each X.509 certificate is valid for 24 hours, and Google Cloud automatically keeps it current to maintain security.
2. **Credential acquisition** : The method that agents use to acquire credentials depends on what they are trying to access. The following are some examples:
   - **Access Google Cloud services** : The agent requests a bound access token. This token is cryptographically bound to the agent's unique X.509 certificate to help prevent token theft. For more information, see [Security and governance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#security-governance).
   - **Access external tools** : The agent uses Agent Identity auth manager to retrieve the required credentials (such as API keys or OAuth tokens) from an auth provider. Auth manager supports both **user-delegated authority** and the **agent's own authority**.

## Benefits of Agent Identity

Agent Identity improves security over standard service accounts.

- **Strong isolation:** Unlike service accounts, agent identities are not shared by multiple workloads by default, can't be impersonated, and don't allow developers to generate long-lived service account keys.
- **Credential security:** Default [Context-Aware Access policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#security-governance) make bound tokens unreplayable, helping to protect against token theft and account takeover. When Agent Identity is used with Agent Gateway and Gemini Enterprise, end-user credentials, such as those provisioned by Gemini Enterprise connectors, are encrypted by the auth manager and decrypted at the gateway, ensuring that the agent can never access the raw credential.
- **Least-privilege approach:** Provides per-agent identities instead of shared service accounts to eliminate over-permissioned agents.
- **Reduced friction:** Automates complex OAuth flows and manages API keys for simpler tool integration.
- **Improved observability:** Provides clear audit logs. When an agent acts on a user's behalf, logs show both the agent's and user's identities.

## Limitations

- **Cloud Storage legacy bucket roles:** You cannot grant agent identities legacy bucket roles (for example, `storage.legacyBucketReader`).

## What's next

- Learn more about [using agent identity with Vertex AI Agent Engine](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity).
- Learn more about [managing agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents).
