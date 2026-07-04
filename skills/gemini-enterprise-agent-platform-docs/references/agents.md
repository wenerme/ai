Build, deploy, and manage AI agents that use reasoning and tools to perform complex enterprise tasks, such as automating workflows, discovering information across multiple systems, and generating content. Agent Platform provides an end-to-end environment for the entire agent lifecycle, including low-code and code-first development tools; a managed runtime; and integrated services for security, governance, and observability.

[Go to Agent Platform](https://console.cloud.google.com/agent-platform/overview)
[Build an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart)

## Choose your development path

Depending on your technical requirements and expertise, you can build agents using the following primary paths:

- **[Agent Studio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio) (Low-code):** A
  collaborative, visual workspace for discovering models, engineering prompts,
  and building agents without writing code. Ideal for rapid prototyping and
  business-centric agents.

- **[Managed Agents API on Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents) (Managed
  code):** A config-driven, REST-first API for building autonomous agents
  inside a fully managed sandbox environment for actions. Create and manage agent configurations and
  sandbox environments with mounted sources, such as skills and artifacts, by
  using the **Agents API** , and interact directly with your deployed agents at
  runtime by using the **Interactions API**.

- **[Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk) (Custom code):**
  A powerful framework for developers to build complex, multi-agent
  orchestrations with granular control over logic, tools, and environment
  simulation.

## Platform architecture

Agent Platform provides an integrated suite of tools and services to support the end-to-end agent lifecycle across four key pillars:

- **[Build](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build)**: Create agents using low-code Studio or the code-first ADK. Access over 200 foundation models in Model Garden.
- **[Scale](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale)**: Deploy agents to a fully managed runtime with integrated session management and long-term Memory Bank.
- **[Govern](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern)**: Secure agents with unique identity, centralize tool access in the Registry, and enforce policies using Agent Gateway.
- **[Optimize](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation)**: Improve quality with Gen AI evaluation and gain deep visibility with Cloud Observability and Topology.

### Build

The Build pillar provides raw intelligence and connectivity (including
Model Garden, ADK, and MCP). Key components include:

- **[Agent Studio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio):** Provides a low-code development environment for agent creation.
- **[Agent Garden](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/agent-garden):** Provides a library of prebuilt agent samples that accelerate agent development for common AI patterns and use cases.
- **[Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk):** Is used for code-first development of complex agents and orchestration logic.
- **[Model Garden](https://console.cloud.google.com/agent-platform/model-garden):** Is a library of over 200 foundation models from Google, partners, and open source communities for discovery and experimentation.

### Scale

The Scale pillar provides managed runtimes, serverless efficiency, and long-term
memory for deploying and running agents. Key components include:

#### Agent Runtime

[Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime) is a fully managed runtime environment
(Agent Runtime) for hosting, deploying, and scaling agents
built with ADK or other tools.

#### Sessions

[Sessions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions) are used to
maintain the history of interactions between a user and an agent over the course
of a single conversation. A session provides the context for an ongoing
interaction and is a source for generating long-term memory.

#### Memory Bank

[Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank) provides agents with long-term memory by extracting, storing,
and retrieving personalized information about a user across multiple sessions,
enabling personalization and cross-session continuity.

### Govern

The Govern pillar provides comprehensive tools to manage Agent Identities
(IAM), Agent Gateway, and Model Armor. Key components include:

#### AI application

An [App Hub](https://docs.cloud.google.com/app-hub/docs/overview) application logically groups the services and workloads that deliver a business function. AI applications extend this concept with specialized features like function calling, proactive planning, and choreographed agent meshes. Agents are automatically mapped to these applications upon deployment.

#### Agent Registry

Once your agents are deployed to Agent Platform, they are automatically registered with the [Agent Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-registry). During deployment, you can link agents to an existing AI application or automatically create a new one.

The registry provides a queryable, centralized store for all your own, Google, and third-party agents and MCP servers. It captures critical metadata, including versions, frameworks (like ADK), and capabilities such as MCP tool names and annotations.

Query the registry for endpoints and configure managed OAuth 2.0 connections for user-delegated authentication using [Agent Identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity). The underlying [Agent Identity Auth Manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#agent-auth-manager) handles the complexity of OAuth and refresh token management, allowing agents to securely invoke tools on behalf of users without requiring developers to manage sensitive credentials.

#### Agent Identity

When deploying agents, agents must be configured with [Agent Identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity)---a unique, SPIFFE-formatted ID that serves as a granular alternative to shared service accounts. Supported directly in IAM, it allows administrators to assign specific permissions (such as to Cloud Storage buckets or BigQuery datasets) directly to the agent. This identity also works with [Agent Identity Auth Manager](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview#agent-auth-manager) for user-delegated tool access, providing a clear audit trail. The Agent Gateway uses this identity to enforce fine-grained access control across all agent interactions.

#### Agent Gateway

Agent traffic is managed by the
[Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview),
a fully managed networking component that governs all traffic from an agent. It
acts as the runtime enforcement point, intercepting calls to tools or other
agents to enforce access control policies and support Model Armor inspection of
tool calls and responses.

#### Application Design Center

[Application Design Center](https://docs.cloud.google.com/application-design-center/docs/overview) helps you
design and provision secure infrastructure templates for AI applications. It
ensures that dependent services---such as the Agent Gateway, Model Armor security
policies, and IAM configurations---are correctly instantiated
within your environment. Application Design Center simplifies ensuring
governance policies are enforced from the moment an agent is deployed.

### Optimize

The Optimize pillar provides forensic observability and evaluation tools to improve
agent performance and quality. Key components include:

#### Cloud Observability

The [Cloud Observability suite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview) (Cloud Trace, Cloud Logging, Cloud Monitoring, and Topology) collects information from your agent by default when you deploy
using ADK, providing deep visibility into agent performance and behavior. It
uses Open Telemetry protocols to collect traces (execution paths), logs (events
and errors), and metrics (latency, token usage) from
Agent Platform, Agent Gateway, and Model Armor. This unified telemetry
lets you debug failures, monitor costs, trace the full path of an agent's
reasoning, and view your application topology.

#### Evaluation

The [GenAI Evaluation Service](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation)
lets you conduct online evaluations of agent quality using Auto SxS.

## Common use cases

Agents can be applied to a wide variety of enterprise scenarios:

- **Customer Support:** Automate responses to common inquiries and resolve tickets by integrating agents with your knowledge base and ticketing systems.
- **Information Discovery:** Enable users to search across fragmented internal systems (like Drive, Jira, and Slack) using natural language to find experts or project status.
- **Business Operations:** Automate repetitive tasks such as scheduling meetings, preparing daily briefings, or processing expense reports.
- **Sales \& Marketing:** Draft personalized outreach, summarize campaign performance, or research prospects using real-time enterprise data.
- **Software Development:** Assist developers in debugging code, navigating complex repositories, or troubleshooting infrastructure issues.

## Admin surfaces

The Agent Platform is the central console for platform and security
administrators to govern the entire agent lifecycle. Gemini
Enterprise Admin manages and adds agents within a Gemini
Enterprise instance. It integrates with the Agent Registry and Agent Gateway.
The Google Workspace Admin Console governs interactions between
Gemini Enterprise agents and Google Workspace services and data.

### Agent Platform

- **[Agent Registry](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-registry)**: View, manage, version, register, and monitor agents.
- **[Agent Gateway Management](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway)**: Configure, manage, and monitor Agent Gateways.
- **[Policy Enforcement](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/overview)**: Define and apply IAM and Model Armor policies.
- **[Observability](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview)**: Monitor agent metrics, traces, and logs, and visualize agent dependencies and interactions.
- **[Identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/assign-identity-iam)**: Manage agent service accounts and permissions.
- **[Security](https://docs.cloud.google.com/gemini-enterprise-agent-platform/security-findings)**: Integrate with Security Command Center for threat detection.
- **[Audit Logging](https://docs.cloud.google.com/gemini-enterprise-agent-platform/security-findings#iam-audit)**: Track agent activities.
- **[Build](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build)** , **[Scale](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale)** , and **[Optimize](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation)** workflows within Agent Platform.

### Gemini Enterprise Admin

- Manage Gemini Enterprise licenses and users.
- Manage Gemini Enterprise instances and data connectors.
- Attach to [Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway) to setup routing for Gemini Enterprise instances.
- Add agents and tools to the Gemini Enterprise instance from Agent and Tool Registry (also support existing paths for BYO-MCP and A2A agents).
- Manage Gemini Enterprise user permissions for agents.
- Enable observability (logs, metrics, traces) using Google Cloud tools for Gemini Enterprise agents.
- Direct to Agent Platform for policy enforcement and additional observability.

### Google Workspace Admin Console

- Enable or disable Gemini Enterprise service for Google Workspace users.
- Manage Google Workspace user permissions for accessing Gemini Enterprise agents.
- Enforce Google Workspace domain policies on agent data access.
- Google Workspace Audit Logging for agent interactions.
- Direct admins to Agent Platform for [Agent Gateway configuration](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway).
- Link to Agent Platform for [comprehensive agent governance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern).

## What's next

Overview

### [Build overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build)

Learn how to build agents in Google Agent Platform.

Overview

### [Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk)

Use the Agent Development Kit (ADK) to create, deploy, and orchestrate agentic architectures that range from simple tasks to complex workflows.

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Codelab

### [Codelab: Secure cross-cloud agentic AI applications](https://codelabs.developers.google.com/next26/aiinfra-learning-pod/screen1-securing-cross-cloud-agentic)

Learn how to secure your agentic applications in the Securing Cross-Cloud Agentic AI Applications codelab.

Overview

### [Policies overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/overview)

Get an overview of policies in Google Agent Platform.

Guide

### [Evaluate your agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents)

Create and deploy a basic agent and use the Gen AI evaluation service to evaluate the agent
