Agent Gateway is the networking component of the
Gemini Enterprise Agent Platform ecosystem. It secures and
governs connectivity for all agentic interactions, whether they occur between
users and agents, agents and tools, or among agents themselves.

## Integration with the Agent Platform ecosystem

Agent Platform provides
a full suite of capabilities for the complete agentic development lifecycle, to
help agent developers and enterprises Build, Scale, Govern, and Optimize their
agentic applications.

Agent Gateway is a key component of Agent Platform,
acting as the network entry and exit point for all agent interactions. It gives
enterprise security administrators the ability to enforce security and
governance policies for agents as a part of the platform infrastructure.
[![Agent Gateway and Agent Platform ecosystem.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/geap-architecture.png)](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/geap-architecture.png) Agent Gateway and Agent Platform ecosystem (click to enlarge).

Agent Gateway integrates with several other
Agent Platform components to provide
comprehensive governance:

- **Agent Registry**: A central library of approved agents and tools, including third-party Model Context Protocol (MCP) servers. Agent Gateway looks up metadata from the registry to enforce granular access policies.
- **Agent identity** : A unique, trackable persona for every agent that interacts with Google Cloud. Agent Gateway uses these identities as the principal for authorization decisions. Agent identities are secured by default with Context-Aware Access which enforces end-to-end cryptographic authentication by using [mTLS](https://docs.cloud.google.com/access-context-manager/docs/caa-agent-security#mtls). and [DPoP](https://docs.cloud.google.com/access-context-manager/docs/caa-agent-security#dpop).
- **Managed agent runtimes**: Agent Runtime and Gemini Enterprise automatically route agent traffic through Agent Gateway.
- **Agent Platform Policies**: Agent Gateway provides delegated authorization to Agent Platform policies such as IAM, Semantic Governance policies and Model Armor allowing you to implement rich sets of agentic security and governance controls.
- **Agent Observability**: Agent Gateway generates observability telemetry for all agent interactions at the network layer and exports it to Agent Observability to provide you with a comprehensive understanding of agent actions.

## Key benefits

Agent Gateway offers several benefits for both AI developers and
enterprise administrators, addressing the complexities of securing and managing
AI agent interactions at scale.

For AI developers:

- **Simplified innovation:** Developers can focus on building agents without managing complex networking primitives or security overhead.
- **Protocol mediation:** Developers can seamlessly use their choice of agentic protocols such Model Context Protocol (MCP), Agent-to-Agent(A2A), REST, and gRPC while adhering to enterprise security standards.
- **Framework agnostic:** Functionality is available regardless of the development framework or client used.
- **Secure transport and authentication:** Automatically handles mTLS handshakes and termination to ensure encrypted connectivity between agents and tools without developer effort. Integrates with Agent Platform's [Agent identity Auth
  Manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview) to simplify and secure Oauth 2.0 handshakes between their agents and tools.

For enterprise admins and security teams:

- **Centralized governance for all agent interactions:** Configure and enforce consistent access policies across diverse agent runtimes and deployment models, ensuring enforcement of least-privilege permissions for agents at runtime.
- **AI security guardrails:** Protect against novel risks like Model Context Protocol (MCP) prompt injection attacks using integrated services like Model Armor.
- **Comprehensive observability:** Gain deep visibility into agentic interactions through Cloud Logging and Cloud Trace, facilitating security investigations and performance monitoring.

## Deployment modes

Agent Gateway is a networking abstraction that lets you define
rules for agent communication and enforces safety, security, and access control
policies, without requiring you to manage complex networking details.

Agent Gateway facilitates two primary governed access paths:
**Client-to-Agent** interactions and **Agent-to-Anywhere** interactions.
[![Agent Gateway modes of operation.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/agent-gateway-modes.png)](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/agent-gateway-modes.png) Agent Gateway modes of operation (click to enlarge).

- **Client-to-Agent (ingress)** : This mode is used to secure communications
  between clients (such as Cursor, Claude Code, Gemini CLI) and
  agents (and tools) running on Google Cloud. In this mode,
  Agent Gateway acts as a frontend for your agent and lets you
  control which clients can access your agents (and tools) and which security
  policies must be applied to such interactions.

- **Agent-to-Anywhere (egress)**: This mode is used to secure communications
  between agents running on Google Cloud and servers, agents, tools, or
  APIs running anywhere. For example, Agent Gateway can be used
  to enforce access permissions and security guardrails for your agents that
  need to communicate with MCP servers that are either created and hosted by
  your own organization, or remote MCP servers hosted by third-parties.

## Components of an Agent Gateway deployment

To configure an end-to-end deployment that uses Agent Gateway, you need
the resources described in the following sections.

### Agent runtimes

Agent Gateway lets you govern traffic for agents and tools
running on the following runtime platforms:

- **Agent Runtime**: Agent Gateway
  supports both Agent-to-Anywhere (egress) and Client-to-Agent (ingress) modes.

- **Gemini Enterprise**: Agent Gateway supports
  only Agent-to-Anywhere (egress) mode.

Agent Gateway is regional in scope. Each gateway governs agentic
interactions within the scope of the project it is deployed in. For more details
on planning a deployment with these runtimes, see [Plan your
Agent Gateway deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw).

### Agent Registry entries

Your agents, and any endpoints or servers you want to connect to, must all be
registered with Agent Registry.

- For Agent Runtime, you must register with the Agent Registry
  instance in the same project and region where your agent and gateway are
  created.

- For Gemini Enterprise, you must register with the project's
  global instance of Agent Registry.

For more details on Agent Registry requirements, see [Plan
your Agent Gateway deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw).

### Access control policies

When agents interact with tools or other agents through the
Agent Gateway, you can apply fine grained access control
policies by using Google Cloud's authorization policies. These
authorization policies integrate with several other Google Cloud services
to let you accomplish the following:

- Create your access control policies in one centralized location and delegate all authorization decisions from different gateways in your project using Identity-Aware Proxy. IAP authenticates agents and tools by using the policies defined within Identity and Access Management (IAM).
- Delegate AI content sanitization decisions to Model Armor. Model Armor lets you extend Agent Gateway's abilities by adding runtime protection against risks such as prompt injection attacks and sensitive data leakage.
- Delegate dynamic agent policies to Agent Platform's Semantic Governance Policies, allowing you to set context-aware controls on your agent's execution such as protections against toxic combinations of tools.
- Delegate authorization to custom authorization engines or third party systems by using Service Extensions.

[![Access control with Agent Gateway.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/agent-gateway-access-control.png)](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/agent-gateway-access-control.png) Access control with Agent Gateway (click to enlarge).

Note the following:

- IAM policies must be configured for any agents, tools, MCP servers, or endpoints that should be governed by the gateway. By default, the gateway only allows traffic for resources that have been explicitly authorized using IAM.
- By default, access to any remote MCP servers, agents, or tools that have not been registered in the local Agent Registry is blocked. You can optionally choose to allow access to unregistered MCP servers and unregistered tools.
- You can grant and deny individual agents or clients access to MCP servers and tools based on the tool name, and whether the tool is read-only or read-write. Permissions can be granted at the organization, folder, or project level.

Note that access control capabilities differ based on the deployment mode. Use
the following table to see which policies can be used for your gateway.

| Google Cloud Product | Agent-to-Anywhere (Egress) | Client-to-Agent (Ingress) |
| **IAM** | Used to define policies that restrict agents to specific tools or methods based on the agent's identity (SPIFFE ID). IAM egress policies operate independently of Agent Gateway but are enforced by IAP at runtime. For more information, see [Policies overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/overview). | IAM policies aren't enforced by the gateway. |
| **Identity-Aware Proxy** | Acts as the default enforcement layer for Agent Gateway. It uses IAM to validate the agent's identity and checks the assigned permissions before allowing calls to other agents or tools. IAP is always enabled by default for Agent Gateway, though you can choose to run it in an audit-only dry-run mode. For more information, see [Create IAM agent policies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam). Implemented on Agent Gateway by using authorization policies and Service Extensions. | IAP isn't supported during ingress. |
| **Model Armor** **(Optional)** | Can be used to ensure the agent isn't leaking any sensitive data or subject to any other type of prompt injection attack. Implemented on Agent Gateway by using authorization policies Service Extensions. | Can be used to protect agents from inbound prompt injection attacks or harmful content sent by clients. Implemented on Agent Gateway by using authorization policies and Service Extensions. |
|---|---|---|

To learn more, see the following pages:

- [Plan your Agent Gateway deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway#plan-agw).
- [Authorization policies
  overview](https://docs.cloud.google.com/load-balancing/docs/auth-policy/auth-policy-overview)
- [Delegate authorization with Service Extensions for
  Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization)

## Supported protocols

Agent Gateway supports all HTTP-based traffic, including
MCP and A2A traffic. At a minimum, the gateway acts as a passthrough that
securely terminates and routes incoming traffic.

For MCP traffic only, Agent Gateway can parse request data to
extract attributes. This lets you create authorization policies with conditions
based on those attributes. For example, you can create policies that restrict
access to specific tools. For details, see [Authorization based on MCP
attributes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#mcp-attributes).

## Limitations

- For Gemini Enterprise, Client-to-Agent mode is not supported by Agent Gateway.
- Agent Gateway doesn't support VPC Service Controls. To ensure that agents are only using the Agent Gateway resources you approve of, you can use custom organization policy constraints to restrict agent and gateway bindings. For details, see [Restrict Agent Runtime to
  approved Agent Gateways
  only](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy#restrict-ae) and [Restrict Gemini Enterprise to approved
  Agent Gateways only](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-ge-deploy#restrict-ge).
- Agent Gateway doesn't support connections to public or private destinations with self-signed certificate chains. Use publicly trusted CA certificates for all destinations.
- Each Agent Gateway instance can govern up to 5,000 resources registered in Agent Registry.
- Review the [limitations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/delegate-authorization#limitations) associated with authorization policies.

## What's next

Codelab

### [Codelab: Govern agentic workloads with Agent Platform](https://codelabs.developers.google.com/cloudnet-agent-gateway)

Learn how to govern agentic workloads with Agent Gateway on Gemini Enterprise Agent Platform.

Guide

### [Set up an Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway)

Learn how to set up an Agent Gateway.

Troubleshooting

### [Troubleshoot Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/troubleshoot-agent-gateway)

Learn how to troubleshoot Agent Gateway connectivity.
