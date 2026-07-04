> [!WARNING]
> This product is a Pre-GA offering, subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1), the "Agentic AI Services" terms in the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1), and the [Additional Terms for Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos). Pre-GA products and features may have limited support, and changes to pre-GA products and features may not be compatible with other pre-GA versions. For more information, see the [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).
>
> These Pre-GA products are in various stages of internal testing and review. As such, **do not use proprietary, sensitive, or other confidential data with these products**. These products are available to Customers solely for limited testing and evaluation, and you may not use them for commercial or production purposes.

Managed Agents API on Agent Platform lets you build managed, autonomous agents
with a single API call. Powered by the **Antigravity** harness, each agent
runs with a sandbox environment where it reasons, plans, uses agent skills,
executes code, searches the web, and reads and writes files.

> [!NOTE]
> **Note:** Model usage during the preview is billed at standard rates. For more information, see the [pricing page](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

## System architecture

Managed Agents API on Agent Platform leverages two key interfaces:

| API | Description |
|---|---|
| **[Agents API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage)** | The **control plane** for managing agents. Use it to create agents from configurations and configure their execution environments, including mounting external data sources and defining network allowlists. The system applies these configurations to the agent's sandbox execution environment. Connecting external data sources and tools requires authentication, with limitations described in [Security and best practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents#security-best-practices). |
| **[Interactions API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/interact-with-agents)** | This is the **data plane**, serving as the primary interface to communicate and interact with your deployed agents at runtime. It connects to the agent created using agents API. |

![Diagram showing the system architecture of Managed Agents API on Agent Platform.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/images/managed-agents-in-gemini-api-architecture.png) **Figure 1.** System architecture of Managed Agents API on Agent Platform.

For enhanced security, each agent operates with an isolated sandbox environment.
When you customize the environment with external sources, such as
Cloud Storage, the system loads these files directly into the
container's file system on demand, and the agent can write results back to
Cloud Storage. For more information, see the
[Managed Agents API on Agent Platform sandbox environment reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/sandbox-environment).

## Security and best practices

> [!NOTE]
> **Note:** The Agents API is in Preview. It is intended for testing and evaluation. Review the agent's actions and outputs before relying on them in any sensitive workflow, and exercise caution when granting the agent access to external systems or data to prevent unintended agentic actions that cannot be undone.

By default, every agent performs actions in a sandbox environment with no access to
external systems, networks, or credentials. The agent can only interact with
the files, packages, and data inside its own sandbox.

This means that out of the box, the agent cannot make network calls, access
databases, or reach any of your production infrastructure.

Any connectivity beyond the sandbox must be explicitly configured by you, the
developer. For more information, see
[Configure network access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#configure-network-access).

### Network access

> [!CAUTION]
> **Caution:** Enabling network access allows the agent to make outbound requests to external services.

Only enable this when your use case requires it, and scope access as narrowly
as possible.

When you enable network access for an environment, the agent can reach external
APIs, clone public repositories, and download packages. Before enabling network
access, consider the following:

- **Avoid exposing sensitive endpoints.** Do not point the agent at internal services, admin panels, or databases unless you have reviewed the risks and are prepared to monitor the agent's activity.
- **Review agent actions.** When network access is enabled, monitor the agent's interactions---especially during initial development---to verify it is only accessing the resources you intended.

### Credential best practices

If your workflow requires the agent to authenticate with external services,
such as MCP servers, you are responsible for provisioning and scoping those
credentials. Follow these guidelines to reduce risk:

- **Use least-privilege credentials.** Create service accounts or API keys with only the permissions your agent needs. Avoid passing credentials with broad or administrative access.
- **Prefer short-lived tokens.** Where possible, use time-limited credentials or tokens that expire rather than long-lived API keys.
- **Never pass credentials you aren't comfortable with the agent using.** The agent may use any credential it has access to in order to complete the task you've given it. Only provide credentials whose full scope of access you are willing to grant.
- **Rotate credentials regularly.** Treat credentials shared with the agent the same way you would treat any programmatic credential---rotate them on a regular schedule.

#### Connecting external tools and APIs

The Agents API supports connecting external tools and APIs (such as MCP servers)
to extend the agent's capabilities. When doing so:

- **Evaluate tool sources carefully.** Only connect tools from sources you trust. A malicious or poorly written tool could expose data or perform unintended actions.
- **Scope tool permissions.** Configure tools with the minimum permissions required for your use case. If a tool supports read-only mode, use that unless write access is necessary.
- **Test in isolation first.** Before connecting a tool to a production data source, test it against sample or synthetic data to verify the agent uses it as expected.

### Human oversight

Agents can reason, plan, and execute multi-step workflows with a high degree of
autonomy. While this is powerful, it also means you should apply appropriate
oversight---particularly for tasks that modify data or interact with external
systems.

Always verify critical outputs---such as generated code, data transformations, or
configuration changes---before deploying them.

## Support and feedback

Email the public discussion group at
`managed-agents-in-agent-platform@google.com` for support and feedback on
Managed Agents API on Agent Platform.

## What's next

Guide

### [Create and manage agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage)

Learn how to create, update, list, get, and delete agents using the REST API.

Reference

### [Managed Agents API on Agent Platform sandbox environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/sandbox-environment)

Learn about the isolated sandbox container, permissions, and pre-installed packages/tools.
